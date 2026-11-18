---
title: "用 LangGraph 搭建可暂停和恢复的设计工作流"
date: "2026-11-18 12:00:00"
timezone: Asia/Shanghai
description: "以 Aiyly Studio 的包装设计为例，拆解 LangGraph 的 State、条件边、人工审批恢复，以及外部生图怎样避免重复提交。"
tags:
- AI
- Agent
- 后端开发
---

用户在 Aiyly Studio 里说「给茉莉茶做个包装」，选择先复核方案，再补一句「做成茶罐」。页面显示生成方案，用户关掉网页，十分钟后回来点批准。后台需要继续执行他刚才看到的方案，还要处理供应商已经收到生图请求、网络却在返回任务 ID 前断开的情况。

这两个问题分别落在工作流和外部任务上。用 LangGraph，我可以把执行到哪一步保存下来。每一次可能产生费用的外部调用，还需要业务层记录它已经做到哪一步。

<!-- more -->

## 一次聊天可以有多轮执行

聊天的会话 ID 管用户看到的消息、近期需求和素材上下文。每条提交会创建独立的执行记录，执行 ID 用作 LangGraph 的 `thread_id`。因此，「缺盒型，先追问」和「已生成方案，等用户批准」会进入不同的状态。

| 用户看到的界面 | 后台如何处理 |
| --- | --- |
| 助手问「想做成纸盒还是茶罐」 | 本轮进入 `needs_input` 并结束。下一条消息创建新一轮，从同一会话取回需要的上下文。 |
| 助手显示方案和报价，等用户决定 | 当前轮暂停。批准或取消沿用原来的 `thread_id`，继续处理当时的方案。 |

图的 State 保存当前执行需要的字段，比如原始请求、识别后的需求、方案和执行结果。节点读 State 并返回本次写入的字段。条件边读取这些字段，选择接下来要运行的节点。在 Aiyly Studio 里，模型负责判断这句话是否在续接刚才的设计，并返回结构化需求。程序根据路由字段、用户选择和业务约束，决定追问、回复或进入生成。

## 用一段 Python 跑通暂停和恢复

下面的独立示例用一个条件模拟意图分流，用列表记录一次模拟提交。安装 `langgraph==1.2.20` 后，可以把这段代码存成 Python 文件直接运行。

```python
from typing import Literal, NotRequired, TypedDict

from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, START, StateGraph
from langgraph.types import Command, interrupt


class DesignRun(TypedDict):
    product: str
    container: NotRequired[str]
    preview: NotRequired[str]
    approved: NotRequired[bool]
    stage: NotRequired[str]


submissions: list[str] = []


def draft_preview(state: DesignRun):
    return {"preview": f"{state['product']}的{state['container']}包装方案"}


def ask_for_container(state: DesignRun):
    return {"stage": "needs_input"}


def review_preview(state: DesignRun):
    decision = interrupt({"preview": state["preview"]})
    if not isinstance(decision, dict) or type(decision.get("approved")) is not bool:
        raise ValueError("Expected a boolean approval")
    return {"approved": decision["approved"]}


def queue_render(state: DesignRun):
    submissions.append(state["preview"])
    return {"stage": "queued"}


def cancel_review(state: DesignRun):
    return {"stage": "canceled"}


def route_request(state: DesignRun) -> Literal["ask", "draft"]:
    return "draft" if state.get("container") else "ask"


def route_decision(state: DesignRun) -> Literal["render", "cancel"]:
    return "render" if state["approved"] else "cancel"


builder = StateGraph(DesignRun)
builder.add_node("ask", ask_for_container)
builder.add_node("draft", draft_preview)
builder.add_node("review", review_preview)
builder.add_node("render", queue_render)
builder.add_node("cancel", cancel_review)
builder.add_conditional_edges(START, route_request)
builder.add_edge("draft", "review")
builder.add_conditional_edges("review", route_decision)
for node in ("ask", "render", "cancel"):
    builder.add_edge(node, END)
graph = builder.compile(checkpointer=InMemorySaver())

cfg = {"configurable": {"thread_id": "tea-review-1"}}
graph.invoke({"product": "茉莉茶", "container": "茶罐"}, cfg)
assert graph.get_state(cfg).next == ("review",)
assert submissions == []

result = graph.invoke(Command(resume={"approved": True}), cfg)
assert result["stage"] == "queued"
assert submissions == ["茉莉茶的茶罐包装方案"]
```

首次执行时，有盒型的请求走 `draft → review`。`interrupt()` 把图停在复核节点。此时可以用 `get_state()` 查看下一节点，模拟提交列表依旧为空。第二次用相同配置传入 `Command(resume=...)`，LangGraph 从 `review` 的函数开头重新执行。走到 `interrupt()` 时，它返回刚传入的批准值，条件边据此进入 `render`。拒绝则进入 `cancel`。[LangGraph Interrupts 文档](https://docs.langchain.com/oss/python/langgraph/interrupts#resuming-interrupts)

示例用 `InMemorySaver` 演示调用顺序。Aiyly Studio 使用 PostgreSQL 保存检查点。用户点批准后，接口先核对任务归属和待确认状态，将审批值写入任务记录。后台 Worker 再读这个值，用原来的 `thread_id` 恢复图。它可以在读取检查点后继续已有任务，网页也可以按事件记录读回进度。[LangGraph Persistence 文档](https://docs.langchain.com/oss/python/langgraph/persistence)

恢复会重进节点，所以我把审批提问和外部生图放在不同节点。复核时先生成方案与报价，批准后才预留积分和提交生成。恢复复核节点时，程序只需要重新构造确认问题、读取批准结果并选路。

## 提交成功与收到回执之间的空窗

假设一轮要四个方向。应用把每个方向作为独立任务，以「执行 ID + 方向序号」作为唯一键。发请求前先认领这个方向，收到回执再保存供应商任务 ID 或同步返回的输出。如果进程在两步之间退出，下一次执行发现认领记录，却找不到任务 ID。此时请求可能已经产生费用，应用把提交记为未知，留到后续核对。

| 恢复时读到的记录 | 下一步 |
| --- | --- |
| 已有可查询的供应商任务 ID | 继续查原任务。有已保存的同步输出时，直接进入交付。 |
| 已认领，提交结果未知 | 保留未知状态。能查回执就核对回执。有供应商幂等键支持时，用同一个键重试。 |
| 成图已经入库，结算回包丢失 | 用原交付 ID 重试结算。账本识别已完成的同一笔交付，重复确认增加的扣费为零。 |

如果四个方向只交付三张，三张各自结算，剩下的预留释放。这里有三个不同的记录要查。**检查点告诉我图停在哪个节点，任务记录告诉我外部调用做到了哪一步，账本告诉我交付已经结算了几次。** 当供应商缺少幂等键与查询能力时，本地只能阻止盲目重发，上游是否执行仍可能未知。

## 怎样验证这条链路

我会让测试替身记录每次外部调用的顺序。一条测试可以依次断言批准前提交零次、批准后提交一次、两次查询使用相同的任务 ID、最终交付一次。再分别模拟供应商明确拒绝，以及供应商已接收但客户端收不到回执，检查两种结果如何入库。

上线前还要查两个边界。审批接口重复收到同一个操作时，只有待审批状态能接收新的决定。交付入库后如果结算回包丢失，重新推进时应找回同一份资产与账本记录。已有暂停任务时，改动节点名也要考虑旧检查点仍然引用原来的节点，发布时需要保留兼容入口或迁移任务。

## ReAct 和 Agent 框架是什么关系

ReAct 描述的是模型如何决定下一步。模型先根据已有信息选择一个动作，应用执行工具，把观察结果交回模型，模型再决定要不要继续。在阅读助手里，第一次搜索只找到一篇文章，模型可以根据结果换关键词再找。这个循环可以用普通代码实现，也可以放进 LangGraph 的子图。 [ReAct 论文](https://arxiv.org/abs/2210.03629) · [个人阅读助手示例](/2026/10/16/agent-react-reading-assistant/)

| 名称 | 它提供什么 |
| --- | --- |
| LangGraph | 用节点、边、State 和检查点搭流程。可以写固定审批，也可以写模型根据工具结果决定下一步的循环。 [工作流和 Agent](https://docs.langchain.com/oss/python/langgraph/workflows-agents) |
| LangChain | `create_agent` 提供更高层的 Agent 入口，将模型、工具和中间件组装成工具调用循环，运行在 LangGraph 上。 [LangChain Agents](https://docs.langchain.com/oss/python/langchain/agents) |
| OpenAI Agents SDK | 用 `Agent` 和 `Runner` 管理模型与工具的循环，也支持会话、工具审批和 Agent 之间的交接。 [Agents SDK](https://openai.github.io/openai-agents-python/agents/) |
| CrewAI | 用 Crew 组织不同角色的 Agent 和任务，用 Flow 定义业务步骤和状态。 [CrewAI Crews](https://docs.crewai.com/en/concepts/crews) · [CrewAI Flows](https://docs.crewai.com/en/concepts/flows) |

如果给包装流程增加「先查商品资料，再根据缺失字段继续查」的能力，可以把这段只读探索做成一个循环。生成、审批和结算仍能沿用现有节点。同一个应用可以同时用到固定工作流和模型驱动的循环。
