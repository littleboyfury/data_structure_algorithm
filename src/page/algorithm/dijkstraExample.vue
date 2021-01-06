<template>
    <div>
        <div>
            <el-row>
                <!--<el-col :span="3">-->
                <!--    <el-input v-model.number="pushData" placeholder="加入数据"></el-input>-->
                <!--</el-col>-->
                <!--<el-col :span="3">-->
                <!--    <el-button type="primary" @click="push">加入</el-button>-->
                <!--</el-col>-->
                <el-col :span="3">
                    <el-button type="primary" @click="dijkstra">直接输出结果</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="resetGraph">重置</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="everyStep">逐步查找</el-button>
                </el-col>
                <el-col :span="3">
                    <div>迪杰斯特拉算法</div>
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
                data: [
                    [0, -1, 10, -1, 30, 100],
                    [-1, 0, 5, -1, -1, -1],
                    [-1, -1, 0, 50, -1, -1],
                    [-1, -1, -1, 0, -1, 10],
                    [-1, -1, -1, 20, 0, 60],
                    [-1, -1, -1, -1, -1, 0]
                ],
                pushData: '',
                dis: [],
                mark: [],
                loc: -1,
                isMin: true,
                j: 0,
                location: [
                    [300, 150], [500, 150],
                    [200, 250], [600, 250],
                    [300, 350], [500, 350],
                ]
            }
        },
        methods: {
            push() {
                if (this.data.length === 31) {
                    return
                }
                if (this.pushData === '') {
                    return
                }
                this.data.push(this.pushData)
                this.graph.clearCanvas(ctx)
                this.initTree()
                this.pushData = ''
            },
            pop() {
                if (this.data.length === 0) {
                    return
                }
                let popData = this.data.pop()
                console.log(popData)
                this.graph.clearCanvas(ctx)
                this.initTree()
                this.graph.drawCircle(ctx, 60, 100, 20, popData, '#ccc', '#000');
                this.graph.drawText(ctx, 60, 150, '删除的数据', '#000')

            },
            resetGraph() {
                this.dis = [];
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[0][i] < 0) {
                        this.dis.push(100000000);
                    } else {
                        this.dis.push(this.data[0][i]);
                    }
                    this.mark.push(false)

                }
                this.graph.clearCanvas(ctx);
                this.drawGraph();
                this.initRect();

            },
            /**
             * 画顶部矩形
             */
            initRect() {
                for (let i = 0; i < this.dis.length; i++) {
                    if (this.loc === i) {
                        this.graph.drawText(ctx, 10 + 120 * i + 60, 20, i, '#ff00ff');
                        this.graph.drawText(ctx, 10 + 120 * i + 60, 100, this.mark[i], '#ff00ff');
                        this.graph.drawRect(ctx, 10 + 120 * i, 40, 120, 40, this.dis[i], '#ff00ff');
                    } else {
                        this.graph.drawText(ctx, 10 + 120 * i + 60, 20, i, '#000');
                        this.graph.drawRect(ctx, 10 + 120 * i, 40, 120, 40, this.dis[i], '#000');
                        this.graph.drawText(ctx, 10 + 120 * i + 60, 100, this.mark[i], '#000');
                    }

                }
                this.graph.drawText(ctx, 50, 150, 'dis数组', '#000');

            },
            /**
             * 画二叉树
             */
            initTree() {
                this.initRect()
                let angles = [75, 62, 45, 30];
                let ey = [228, 116, 70, 55];
                let baseX = 490;
                let zIndex = 48;
                let radius = 20;
                let baseY = 110;
                let j = 0;
                for (let i = 0; i < this.data.length; i++) {
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
                    this.graph.drawCircle(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY, radius, this.data[i], "#fe1110", '#fff');
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
            everyStep() {
                console.log(this.isMin, 'min');
                if (this.isMin) {
                    this.loc = -1;
                    let min = 1000000000;
                    for (let i = 0; i < this.dis.length; i++) {
                        if (!this.mark[i] && this.dis[i] < min) {
                            min = this.dis[i];
                            this.loc = i;
                        }
                    }
                    if (this.loc === -1) {
                        console.log('结束了');
                        this.graph.drawText(ctx, 300, 400, '已完成从0开始到其他点的最短路径', '#000');
                        return;
                    }
                    this.mark[this.loc] = true;
                    this.isMin = false;
                    this.j = 0;
                    this.graph.clearCanvas(ctx);
                    this.drawGraph();
                    this.initRect();
                } else {
                    if (this.j === this.dis.length) {
                        this.isMin = true;
                        this.graph.clearCanvas(ctx);
                        this.drawGraph();
                        this.initRect();
                        return;
                    } else if (this.data[this.loc][this.j] !== -1 && (this.dis[this.loc] + this.data[this.loc][this.j] < this.dis[this.j])) {
                        this.dis[this.j] = this.dis[this.loc] + this.data[this.loc][this.j];
                    }
                    this.j++;

                    this.graph.clearCanvas(ctx);
                    this.drawGraph();
                    this.initRect();
                }


            },
            drawGraph() {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.loc === i) {
                        this.graph.drawCircle(ctx, this.location[i][0], this.location[i][1], 20, i, "#ff00ff", '#fff');
                    } else {
                        this.graph.drawCircle(ctx, this.location[i][0], this.location[i][1], 20, i, "#fe1110", '#fff');
                    }
                }
                this.graph.drawArrow(ctx, this.location[0][0] - 13, this.location[0][1] + 13, this.sqrtDouble(this.location[0][0], this.location[0][1], this.location[2][0], this.location[2][1]), 45);
                this.graph.drawArrow(ctx, this.location[0][0], this.location[0][1] + 20, this.sqrtDouble(this.location[0][0], this.location[0][1], this.location[4][0], this.location[4][1]), 0);
                this.graph.drawArrow(ctx, this.location[0][0] + 13, this.location[0][1] + 13, this.sqrtDouble(this.location[0][0], this.location[0][1], this.location[5][0], this.location[5][1]), -45);
                this.graph.drawArrow(ctx, this.location[1][0] - 17, this.location[1][1] + 10, this.sqrtDouble(this.location[1][0], this.location[1][1], this.location[2][0], this.location[2][1]), 72);
                this.graph.drawArrow(ctx, this.location[2][0] + 20, this.location[2][1], this.sqrtDouble(this.location[2][0], this.location[2][1], this.location[3][0], this.location[3][1]), -90);
                this.graph.drawArrow(ctx, this.location[3][0] - 13, this.location[3][1] + 13, this.sqrtDouble(this.location[3][0], this.location[3][1], this.location[5][0], this.location[5][1]), 45);
                this.graph.drawArrow(ctx, this.location[4][0] + 17, this.location[4][1] - 10, this.sqrtDouble(this.location[4][0], this.location[4][1], this.location[3][0], this.location[3][1]), -108);
                this.graph.drawArrow(ctx, this.location[4][0] + 20, this.location[4][1], this.sqrtDouble(this.location[4][0], this.location[4][1], this.location[5][0], this.location[5][1]), -90);

                this.graph.drawText(ctx, this.getHalf(this.location[0][0], this.location[2][0]), this.getHalf(this.location[0][1], this.location[2][1]), this.data[0][2], "#000");
                this.graph.drawText(ctx, this.getHalf(this.location[0][0], this.location[4][0]), this.getHalf(this.location[0][1], this.location[4][1]) + 30, this.data[0][4], "#000");
                this.graph.drawText(ctx, this.getHalf(this.location[0][0], this.location[5][0]), this.getHalf(this.location[0][1], this.location[5][1]) - 20, this.data[0][5], "#000");
                this.graph.drawText(ctx, this.getHalf(this.location[1][0], this.location[2][0]) + 100, this.getHalf(this.location[1][1], this.location[2][1]), this.data[1][2], "#000");
                this.graph.drawText(ctx, this.getHalf(this.location[2][0], this.location[3][0]) + 100, this.getHalf(this.location[2][1], this.location[3][1]), this.data[2][3], "#000");
                this.graph.drawText(ctx, this.getHalf(this.location[3][0], this.location[5][0]), this.getHalf(this.location[3][1], this.location[5][1]), this.data[3][5], "#000");
                this.graph.drawText(ctx, this.getHalf(this.location[4][0], this.location[3][0]) - 100, this.getHalf(this.location[4][1], this.location[3][1]) + 20, this.data[4][3], "#000");
                this.graph.drawText(ctx, this.getHalf(this.location[4][0], this.location[5][0]), this.getHalf(this.location[4][1], this.location[5][1]), this.data[4][5], "#000");


            },
            getHalf(x, x1) {
                return Math.floor((x + x1) / 2);
            },
            sqrtDouble(x, y, x1, y1) {
                let b = (x - x1) * (x - x1) + (y - y1) * (y - y1);
                return Math.floor(Math.sqrt(b)) - 40;
            },

            /**
             * 迪杰斯特拉算法
             * @param x 起点
             * @param n 个数
             */
            dijkstra(x, n) {
                x = 0;
                n = this.dis.length;
                //标记是否走过
                let mark = [];
                for (let i = 0; i < n; i++) {
                    mark.push(false)
                }
                // 标记起点已经走过
                mark[x] = true;
                //到自己的位置长度为0
                this.dis[x] = 0;
                //遍历每一个点
                for (let i = 0; i < n; i++) {
                    let loc = 0;
                    let min = 10000000;
                    //采用贪心算法求解，局部最短推导出全局最短
                    //求解dis数组里面的最小值，可以考虑使用小根堆
                    for (let j = 0; j < n; j++) {
                        if (!mark[j] && this.dis[j] < min) {
                            min = this.dis[j];
                            loc = j;
                        }
                    }
                    //已经遍历完所有的点
                    if (loc === 0) {
                        break;
                    }
                    //标记下一个点已经查找
                    mark[loc] = true;
                    //判断下一个点到该点连接的其他各个点的最短路径
                    for (let j = 0; j < n; j++) {
                        if (this.data[loc][j] !== -1 && (this.dis[loc] + this.data[loc][j] < this.dis[j])) {
                            this.dis[j] = this.dis[loc] + this.data[loc][j];
                        }
                    }
                }
                //输出起点到其他点的最短路径
                for (let i = 0; i < n; i++) {
                    this.mark[i] = true;
                    console.log(x + " to " + i + " min path = " + this.dis[i])
                }

                this.graph.clearCanvas(ctx);
                this.drawGraph();
                this.initRect();
            }
        },
        mounted() {

            // this.dijkstra(0, this.data.length);
            ctx = this.graph.initCanvas('canvas');
            // 当调整窗口大小时重绘canvas
            window.onresize = () => {
                this.graph.initCanvas('canvas');
            }

            this.resetGraph();
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
