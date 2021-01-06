<template>
    <div id="app">
        <el-container class="container_main">
            <!--头部-->
            <el-header class="header">数据结构与算法演示</el-header>
            <el-container>
                <!--左侧导航栏-->
                <el-aside class="aside" :width="navWidth">
                    <el-radio-group v-model="isCollapse">
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>
                    </el-radio-group>
                    <el-menu :collapse="isCollapse" :router="true" :collapse-transition="false" @close="handleClose"
                             @open="handleOpen"
                             class="el-menu-vertical-demo" default-active="2-1">
                        <!--<el-submenu index="1">-->
                        <!--    <template slot="title">-->
                        <!--        <i class="el-icon-s-home"></i>-->
                        <!--        <span slot="title">首页</span>-->
                        <!--    </template>-->
                        <!--    <el-menu-item-group>-->
                        <!--        <el-menu-item :route="{name:'welcome'}" index="1-1">首页</el-menu-item>-->
                        <!--    </el-menu-item-group>-->
                        <!--</el-submenu>-->
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-data-analysis"></i>
                                <span slot="title">数据结构</span>
                            </template>
                            <el-menu-item-group title="线性表">
                                <el-menu-item :route="{name:'sequenceTableExample'}" index="2-1">顺序表</el-menu-item>
                                <el-menu-item :route="{name:'linkedListExample'}" index="2-2">链表</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="栈与队列">
                                <el-menu-item :route="{name:'stackExample'}" index="2-3">栈</el-menu-item>
                                <el-menu-item :route="{name:'queueExample'}" index="2-4">队列</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="树">
                                <el-menu-item :route="{name:'binaryTreeExample'}" index="2-5">二叉树</el-menu-item>
                                <el-menu-item :route="{name:'maxHeapExample'}" index="2-6">大根堆</el-menu-item>
                                <el-menu-item :route="{name:'minHeapExample'}" index="2-7">小根堆</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-ship"></i>
                                <span slot="title">算法</span>
                            </template>
                            <el-menu-item-group title="树">
                                <el-menu-item :route="{name:'preOrderTraversalExample'}" index="3-1">前序遍历</el-menu-item>
                                <el-menu-item :route="{name:'inOrderTraversalExample'}" index="3-2">中序遍历</el-menu-item>
                                <el-menu-item :route="{name:'postOrderTraversalExample'}" index="3-3">后续遍历
                                </el-menu-item>
                                <el-menu-item :route="{name:'heapSortExample'}" index="3-4">堆排序</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="图">

                                <el-menu-item :route="{name:'depthFirstSearchExample'}" index="3-5">深度优先</el-menu-item>
                                <el-menu-item :route="{name:'dijkstraExample'}" index="3-6">迪杰斯特拉算法</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!--中部展示效果-->
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isCollapse: false,
                navWidth: '201xp'
            };
        },
        watch: {
            isCollapse(val) {
                if (val) {
                    this.navWidth = '64px'
                } else {
                    this.navWidth = '201px'
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="less" scoped>
    /*100vh 为屏幕高度 100wh为屏幕宽度*/
    @asideHeight: calc(100vh - 60px);
    @navHeight: calc(100vh - 102px);
    .container_main {
        height: 100vh;
        .header {
            background-color: #ecedf0;
            font-size: 30px;
            text-align: center;
            line-height: 60px;
        }

        .aside {
            /*导航栏背景色*/
            height: @asideHeight;
            overflow: scroll;
            overflow-x: hidden;
            border-right: solid 1px #e6e6e6;
            /*隐藏滚动条*/
            -ms-overflow-style: none; /* IE 10+ */
            scrollbar-width: none; /* Firefox */
            &::-webkit-scrollbar {
                display: none; /* Chrome Safari */
            }

            .el-menu-vertical-demo:not(.el-menu--collapse) {
                /*菜单栏宽度*/
                width: 200px;
                min-height: 400px;
            }

            .el-menu-vertical-demo {
                height: @navHeight;

            }

            /deep/ .el-radio-button__inner {
                padding: 15px 17px !important;
                border-radius: 0px;
            }

            /deep/ .el-menu {
                border-right: solid 0px #e6e6e6;
            }
        }

    }


</style>
