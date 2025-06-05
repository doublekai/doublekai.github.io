# 在项目的单元测试过程中，会遇到：
1、接口的依赖
2、外部接口调用
3、测试环境非常复杂

单元测试应该只针对当前单元进行测试, 所有的内部或外部的依赖应该是稳定的, 已经在别处进行测试过的.使用mock 就可以对外部依赖组件实现进行模拟并且替换掉, 从而使得单元测试将焦点只放在当前的单元功能。


我们要测试A模块，然后A模块依赖于B模块的调用。但是，由于B模块的改变，导致了A模块返回结果的改变，从而使A模块的测试用例失败。其实，对于A模块，以及A模块的用例来说，并没有变化，不应该失败才对。
这个时候就是mock发挥作用的时候了。通过mock模拟掉影响A模块的部分（B模块）。至于mock掉的部分（B模块）应该由其它用例来测试。
```

def B_error(num):
    return "222w"


def B_proper(num):
    return num


def A(num):
    result = B_proper(num)  # B_proper()
    return result + 2


import unittest


class MyTestCase(unittest.TestCase):

    def test_add_and_multiply(self):
        num = 3
        addition = A(num)
        self.assertEqual(5, addition)


if __name__ == "__main__":
    unittest.main()


```


mock.pathc