import Vue from 'vue'

//引入vue-router
import VueRouter from 'vue-router';

import welcome from "@/page/welcome";
//深度优先搜索
import depthFirstSearchExample from "@/page/algorithm/depthFirstSearchExample";
//迪杰斯特拉算法
import dijkstraExample from "@/page/algorithm/dijkstraExample";
//堆排序
import heapSortExample from "@/page/algorithm/heapSortExample";
//中序遍历
import inOrderTraversalExample from "@/page/algorithm/inOrderTraversalExample";
//后序遍历
import postOrderTraversalExample from "@/page/algorithm/postOrderTraversalExample";
//先序遍历
import preOrderTraversalExample from "@/page/algorithm/preOrderTraversalExample";


//二叉树
import binaryTreeExample from "@/page/data_structure/binaryTreeExample";
//链表
import linkedListExample from "@/page/data_structure/linkedListExample";
//大根堆
import maxHeapExample from "@/page/data_structure/maxHeapExample";
//小根堆
import minHeapExample from "@/page/data_structure/minHeapExample";
//队列
import queueExample from "@/page/data_structure/queueExample";
//顺序表
import sequenceTableExample from "@/page/data_structure/sequenceTableExample";
//栈
import stackExample from "@/page/data_structure/stackExample";

//vue-router
Vue.config.productionTip = false
Vue.use(VueRouter)


//解决嵌套路由报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


//路由配置规则
export default new VueRouter({
    //去掉#号
    mode: 'history',
    // TODO tomcat中需要添加该属性，即项目的名称，可以更改
    // base:'data',
    routes: [
        //默认规则
        {
            path: '/',
            redirect: {
                name: 'sequenceTableExample'
            }
        },
        {
            name: 'welcome',
            path: '/welcome',
            component: welcome
        },
        {
            name: 'depthFirstSearchExample',
            path: '/depthFirstSearchExample',
            component: depthFirstSearchExample
        },
        {
            name: 'dijkstraExample',
            path: '/dijkstraExample',
            component: dijkstraExample
        },
        {
            name: 'heapSortExample',
            path: '/heapSortExample',
            component: heapSortExample
        },
        {
            name: 'inOrderTraversalExample',
            path: '/inOrderTraversalExample',
            component: inOrderTraversalExample
        },
        {
            name: 'postOrderTraversalExample',
            path: '/postOrderTraversalExample',
            component: postOrderTraversalExample
        },
        {
            name: 'preOrderTraversalExample',
            path: '/preOrderTraversalExample',
            component: preOrderTraversalExample
        },
        {
            name: 'binaryTreeExample',
            path: '/binaryTreeExample',
            component: binaryTreeExample
        },
        {
            name: 'linkedListExample',
            path: '/linkedListExample',
            component: linkedListExample
        },
        {
            name: 'maxHeapExample',
            path: '/maxHeapExample',
            component: maxHeapExample
        },
        {
            name: 'minHeapExample',
            path: '/minHeapExample',
            component: minHeapExample
        },
        {
            name: 'queueExample',
            path: '/queueExample',
            component: queueExample
        },
        {
            name: 'sequenceTableExample',
            path: '/sequenceTableExample',
            component: sequenceTableExample
        },
        {
            name: 'stackExample',
            path: '/stackExample',
            component: stackExample
        }
    ]
})
