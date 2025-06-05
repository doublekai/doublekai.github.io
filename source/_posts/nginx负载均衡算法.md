---
title: nginx负载均衡算法
date: 2021-08-18 14:10:05
tags:
---
####    Nginx的背景
Nginx和Apache一样都是一种WEB服务器。基于REST架构风格，以URI（Uniform Resources Identifier，统一资源描述符）或URL（Uniform Resources Locator，统一资源定位符）作为沟通依据，通过HTTP协议提供各种网络服务。WEB服务器的设计受网络规模、网络带宽、产品特点等因素局限，且各自的定位和发展不同，因此各种WEB服务器有着各自的鲜明特点。

Apache的发展时期很长，而且是毫无争议的世界第一大服务器。它有着很多特点：稳定、开源、跨平台等。它出现的时间太长了，它兴起的年代，互联网产业远远比不上现在，所以它被设计为一个重量级的WEB服务器，不支持高并发。在Apache上运行数以万计的并发访问，会导致服务器消耗大量内存。操作系统对其进行进程或线程间的切换也消耗了大量的CPU资源，导致HTTP请求的平均响应速度降低。这些因素都决定了Apache不可能称为高性能的WEB服务器，因此轻量级的高并发服务器Nginx就登上了舞台。
####    反向代理
代理：在访问google的时候会请求失败，而国外的服务器能访问,所以访问google方式为
> User -> 国外服务器 ->google

国外服务器就是代理这个过程也称为正向代理
反向代理：
简单的在拨打110的时候你会发现打到的是离你最近的一个派出所，简单理解就是
> User -> 110 ->  很多服务器

当我们请求 www.baidu.com 的时候，就像拨打110一样，背后可能有成千上万台服务器为我们服务，但具体是哪一台，你不知道，也不需要知道，你只需要知道反向代理服务器是谁就好了，www.baidu.com 就是我们的反向代理服务器，反向代理服务器会帮我们把请求转发到真实的服务器那里去。Nginx就是性能非常好的反向代理服务器，用来做负载均衡。
#### 负载均衡算法
初始化代码
```
private static Map<String, Integer> serviceWeightMap = new HashMap<String, Integer>();
static {
    serviceWeightMap.put("192.168.1.100", 1);
    serviceWeightMap.put("192.168.1.101", 1); 
    serviceWeightMap.put("192.168.1.102", 5);//权重为5
    serviceWeightMap.put("192.168.1.103", 1);
    serviceWeightMap.put("192.168.1.104", 1);       
    serviceWeightMap.put("192.168.1.105", 4);//权重为4
    serviceWeightMap.put("192.168.1.106", 1);      
    serviceWeightMap.put("192.168.1.107", 2);//权重为2
    serviceWeightMap.put("192.168.1.108", 1);
    serviceWeightMap.put("192.168.1.109", 1);
    serviceWeightMap.put("192.168.1.110", 1);
}
```
这里通过实例化一个serviceWeightMap的Map变量来服务器地址和权重的映射，以此来模拟轮询算法的实现，其中设置的权重值在以后的加权算法中会使用到，这里先不做过多介绍，该变量初始化如下：
1. 随机：负载均衡方法随机的把负载分配到各个可用的服务器上，通过随机数生成算法选取一个服务器，然后把连接发送给它。虽然许多均衡产品都支持该算法，但是它的有效性一直受到质疑，除非把服务器的可运行时间看的很重。
```
public static String testRandom() {
 
    // 重新创建一个map，避免出现由于服务器上线和下线导致的并发问题
    Map<String, Integer> serverMap = new HashMap<String, Integer>();
    serverMap.putAll(serviceWeightMap);
 
    //取得IP地址list
    Set<String> keySet = serverMap.keySet();
    ArrayList<String> keyList = new ArrayList<String>();
    keyList.addAll(keySet);
 
    Random random = new Random();
    int randomPos = random.nextInt(keyList.size());
     
    String server = keyList.get(randomPos);
     
    return server;
}
```
2. 轮询：将请求按顺序轮流分配到后台服务器上，均衡的对待每一台服务器，而不关心服务器实际的连接数和当前的系统负载。

    ```
    private static Integer pos = 0;
     
    public static String testRoundRobin() {
         
        // 重新创建一个map，避免出现由于服务器上线和下线导致的并发问题
        Map<String, Integer> serverMap = new HashMap<String, Integer>();
        serverMap.putAll(serviceWeightMap);
         
        //取得IP地址list
        Set<String> keySet = serverMap.keySet();
        ArrayList<String> keyList = new ArrayList<String>();
        keyList.addAll(keySet);
         
        String server = null;
         
        synchronized (pos) {
            if (pos > keySet.size()) {
                pos = 0;
            }
             
            server = keyList.get(pos);
             
            pos++;
        }
         
        return server;
    }
    ```
3. 加权轮询：该算法中，每个机器接受的连接数量是按权重比例分配的。这是对普通轮询算法的改进，比如你可以设定：第三台机器的处理能力是第一台机器的两倍，那么负载均衡器会把两倍的连接数量分配给第3台机器。
```
public static String testWeightRoundRobin() {
 
    // 重新创建一个map，避免出现由于服务器上线和下线导致的并发问题
    Map<String, Integer> serverMap = new HashMap<String, Integer>();
    serverMap.putAll(serviceWeightMap);
 
    //取得IP地址list
    Set<String> keySet = serverMap.keySet();
    Iterator<String> it = keySet.iterator();
 
    List<String> serverList = new ArrayList<String>();
 
    while (it.hasNext()) {
        String server = it.next();
        Integer weight = serverMap.get(server);
        for (int i=0; i<weight; i++) {
            serverList.add(server);
        }
    }
 
    String server = null;
 
    synchronized (pos) {
        if (pos > serverList.size()) {
            pos = 0;
        }
         
        server = serverList.get(pos);
        pos++;
    }
     
    return server;
}
```





4.  源地址哈希(Hash)法：源地址哈希的思想是获取客户端访问的ip地址值，通过哈希函数计算得到一个数值，用该数值对服务器列表的大小进行取模运算，得到的结果便是要访问的服务器的序号。采用哈希法进行负载均衡，同一ip地址的客户端，当后端服务器列表不变的时候，它每次都会被映射到同一台后端服务器进行访问。
```
public static String testConsumerHash(String remoteIp) {
 
    // 重新创建一个map，避免出现由于服务器上线和下线导致的并发问题
    Map<String, Integer> serverMap = new HashMap<String, Integer>();
    serverMap.putAll(serviceWeightMap);
 
    //取得IP地址list
    Set<String> keySet = serverMap.keySet();
    ArrayList<String> keyList = new ArrayList<String>();
    keyList.addAll(keySet);
     
    int hashCode = remoteIp.hashCode();
    int pos = hashCode % keyList.size();
     
    return keyList.get(pos);
}
```
5. 最快算法：最快算法基于所有服务器中的最快响应时间分配连接。该算法在服务器跨不同网络的环境中特别有用。

6. 最少连接：系统把新连接分配给当前连接数目最少的服务器。该算法在各个服务器运算能力基本相似的环境中非常有效。

7. 观察算法：该算法同时利用最小连接算法和最快算法来实施负载均衡。服务器根据当前的连接数和响应时间得到一个分数，分数较高代表性能较好，会得到更多的连接。
8. 预判算法：该算法使用观察算法来计算分数，但是预判算法会分析分数的变化趋势来判断某台服务器的性能正在改善还是降低。具有改善趋势的服务器会得到更多的连接。该算法适用于大多数环境。
