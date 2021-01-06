<template>
    <div>
        <div>
            <el-row>
                <el-col :span="3">
                    <el-input v-model.number="pushData" placeholder="加入数据"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="push">加入</el-button>
                </el-col>
                <!--<el-col :span="3">-->
                <!--    <el-button type="primary" @click="pop">删除</el-button>-->
                <!--</el-col>-->
                <el-col :span="3">
                    <el-button type="primary" @click="stateData">默认数据</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="clear">清空二叉树</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="everyStepHeap">逐步堆化</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="heap">直接堆化</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="resetHeap">重置</el-button>
                </el-col>
                <el-col :span="3">
                    <div>小根堆演示</div>
                </el-col>
            </el-row>
        </div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    let ctx;
    export default {
        data() {
            return {
                data: [],
                dataInt: [],
                pushData: '',
                startIndex: -1,
                parentIndex: 0,
                leftSonIndex: 0,
                rightSonIndex: 0,
                isOver: false
            }
        },
        methods: {
            stateData() {
                this.data = [7, 1, 5, 9, 4, 3, 2, 6, 4];
                this.graph.clearCanvas(ctx);
                this.drawMinHeap(this.data);
            },
            push() {
                if (this.data.length === 31) {
                    return
                }
                if (this.pushData === '') {
                    return
                }
                this.data.push(this.pushData);
                this.graph.clearCanvas(ctx);
                this.drawMinHeap(this.data);
                this.pushData = '';
            },
            pop() {
                if (this.data.length === 0) {
                    return
                }
                let popData = this.data.pop();
                console.log(popData);
                this.graph.clearCanvas(ctx);
                this.drawMinHeap(this.data);
                this.graph.drawCircle(ctx, 60, 100, 20, popData, '#ccc', '#000');
                this.graph.drawText(ctx, 60, 150, '删除的数据', '#000')

            },
            clear() {
                this.data = [];
                this.graph.clearCanvas(ctx)
            },
            /**
             * 画顶部矩形
             */
            initRect() {
                for (let i = 0; i < this.data.length; i++) {
                    this.graph.drawRect(ctx, 10 + 32 * i, 30, 32, 40, this.data[i], '#000');
                }
            },
            /**
             * 画父子节点的二叉树，更换不同颜色
             * @param data
             * @param parent
             * @param leftSon
             * @param rightSon
             */
            drawMinHeap(data, parent, leftSon, rightSon) {
                this.initRect();
                let angles = [75, 62, 45, 30];
                let ey = [228, 116, 70, 55];
                let baseX = 490;
                let zIndex = 48;
                let radius = 20;
                let baseY = 110;
                let j = 0;
                for (let i = 0; i < data.length; i++) {
                    let changeData = false;
                    // 计算层数
                    if (i === 0) {
                        j = 0;
                    } else if (i === 1) {
                        j = 1;
                        changeData = true
                    } else if (i === 3) {
                        j = 2;
                        changeData = true
                    } else if (i === 7) {
                        j = 3;
                        changeData = true
                    } else if (i === 15) {
                        j = 4;
                        changeData = true
                    }
                    if (changeData) {
                        baseX = baseX - (240 / Math.pow(2, j - 1));
                        zIndex = zIndex / 2;
                        baseY += 90;
                    }
                    //画圆
                    if (i === parent) {

                        this.graph.drawCircle(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY, radius, data[i], "#912CEE", '#fff');
                        this.graph.drawArrow(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY - radius - 40, 40, 0);
                    } else if (i === leftSon) {
                        this.graph.drawCircle(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY, radius, data[i], "#97FFFF", '#fff');
                        this.graph.drawArrow(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY - radius - 40, 40, 0);
                    } else if (i === rightSon) {
                        this.graph.drawCircle(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY, radius, data[i], "#f0ff11", '#fff');
                        this.graph.drawArrow(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY - radius - 40, 40, 0);
                    } else {
                        this.graph.drawCircle(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY, radius, data[i], "#fe1110", '#fff');
                    }
                    if (i !== 0) {
                        if (i % 2 === 0) {
                            //偶数节点的箭头
                            this.graph.drawArrow(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius - zIndex / 2 * radius,
                                baseY - 90 + radius, ey[j - 1], -angles[j - 1]);
                        } else {
                            //奇数节点的箭头
                            this.graph.drawArrow(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius + zIndex / 2 * radius,
                                baseY - 90 + radius, ey[j - 1], angles[j - 1]);
                        }
                    }

                }
            },
            /**
             * 每一步
             */
            everyStepHeap() {
                //判断是否结束
                if (this.isOver) {
                    console.log('结束了')
                    return;
                }
                //初始操作
                if (this.startIndex === -1) {
                    this.dataInt = [];
                    for (let i = 0; i < this.data.length; i++) {
                        this.dataInt.push(parseInt(this.data[i]));
                    }
                    // 从第一个非叶子节点开始
                    this.startIndex = Math.floor(this.dataInt.length / 2 - 1);
                    this.parent = this.startIndex;
                    this.leftSon = this.parent * 2 + 1;
                } else {
                    // 赋值子节点
                    this.leftSon = this.parent * 2 + 1;
                }
                //清空画布
                this.graph.clearCanvas(ctx);
                //画二叉树
                this.drawMinHeap(this.dataInt, this.parent, this.leftSon, this.leftSon + 1);
                let temp = this.leftSon;
                //判断右节点是否比左节点小
                if (this.leftSon + 1 < this.dataInt.length && this.dataInt[this.leftSon] > this.dataInt[this.leftSon + 1]) {
                    temp = this.leftSon + 1;
                }
                //判断最小的子节点是否比父节点小
                if (this.dataInt[temp] > this.dataInt[this.parent]) {
                    //该子树已经完成堆化，继续堆化
                    this.next(true);
                    return;
                } else {
                    //如果小于父节点，则交换值，继续堆化子节点
                    this.dataInt[temp] = this.dataInt[temp] ^ this.dataInt[this.parent];
                    this.dataInt[this.parent] = this.dataInt[temp] ^ this.dataInt[this.parent];
                    this.dataInt[temp] = this.dataInt[temp] ^ this.dataInt[this.parent];
                    this.parent = temp;
                    this.leftSon = this.parent * 2 + 1;
                }
                //判断是否子树还能堆化
                this.next();
            },
            /**
             * 下一步
             * @param isNext
             */
            next(isNext) {
                //判断是否还存在子树
                if (this.leftSon >= this.dataInt.length || isNext) {
                    //继续堆化
                    this.startIndex--;
                    if (this.startIndex < 0) {
                        //结束标志
                        this.isOver = true;
                        //清空画布
                        this.graph.clearCanvas(ctx);
                        //画二叉树
                        this.drawMinHeap(this.dataInt, -1, -1, -1);
                        this.graph.drawText(ctx, 100, 100, '已经堆化完成', '#000000');
                        this.$message.success('已经堆化完成');
                        return;
                    }
                    //继续堆化
                    this.parent = this.startIndex;
                }
            },
            /**
             * 重置
             */
            resetHeap() {
                this.startIndex = -1;
                this.dataInt = [];
                this.graph.clearCanvas(ctx);
                this.drawMinHeap(this.data);
                this.isOver = false;
            },
            /**
             * 小根堆调用该方法
             */
            heap() {
                this.dataInt = [];
                for (let i = 0; i < this.data.length; i++) {
                    this.dataInt.push(parseInt(this.data[i]));
                }
                let len = this.dataInt.length;
                let i = Math.floor(len / 2 - 1);
                for (; i >= 0; i--) {
                    this.minHeap(i, len);
                }
                this.graph.clearCanvas(ctx);
                this.drawMinHeap(this.dataInt);
            },
            /**
             * 一次堆化
             * @param start
             * @param end
             */
            minHeap(start, end) {
                let parent = start;
                let son = start * 2 + 1;
                while (son < end) {
                    let temp = son;
                    if (son + 1 < end && this.dataInt[son] > this.dataInt[son + 1]) {
                        temp = son + 1;
                    }
                    if (this.dataInt[temp] > this.dataInt[parent]) {
                        return;
                    } else {
                        this.dataInt[temp] = this.dataInt[temp] ^ this.dataInt[parent];
                        this.dataInt[parent] = this.dataInt[temp] ^ this.dataInt[parent];
                        this.dataInt[temp] = this.dataInt[temp] ^ this.dataInt[parent];
                        parent = temp;
                        son = parent * 2 + 1;
                    }
                }
            }
        },
        mounted() {
            ctx = this.graph.initCanvas('canvas');
            // this.initTree(this.data);
            // 当调整窗口大小时重绘canvas
            window.onresize = () => {
                this.graph.initCanvas('canvas');
            }
        }
    }
</script>

<style scoped>
    canvas {
        /*边框*/
        border: 1px solid #c8c9cc;
        /*上边距离*/
        margin-top: 10px;
    }
</style>
