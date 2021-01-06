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
                <el-col :span="3">
                    <el-button type="primary" @click="pop">删除</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="clear">清空二叉树</el-button>
                </el-col>
                <el-col :span="3">
                    <div>满二叉树演示</div>
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
                pushData: ''
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
            clear() {
                this.data = []
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
            }
        },
        mounted() {
            ctx = this.graph.initCanvas('canvas');
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
