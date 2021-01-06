<template>
    <div>
        <div>
            <el-row>
                <el-col :span="3">
                    <el-input v-model.number="pushData" placeholder="加入数据"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="push">入队</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="pop">出队</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="clear">清空队列</el-button>
                </el-col>
                <el-col :span="3">
                    <div>队列演示</div>
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
                //输入的数据
                pushData: '',
                //数据数组
                data: [],
                //默认圆心距离
                initX: 150,
                initY: 300,
                //圆的半径
                radius: 20
            }
        },
        methods: {
            pop() {
                //删除数组第一个元素
                if (this.data.length === 0) {
                    return
                }
                let popData = this.data[0]
                this.data.splice(0, 1)
                //清空画布
                this.graph.clearCanvas(ctx)
                //画箭头
                this.drawArrow()
                this.graph.drawCircle(ctx, this.initX, this.initY + 100, this.radius, popData,
                    "#ccc", "#000");
                // this.drawCircle(this.initX, this.initY + 100, popData,"#ccc")
                this.graph.drawText(ctx, this.initX, this.initY + this.radius * 3 + 100, '出队数据', '#000');
                //画圆和数据
                for (let i = 0; i < this.data.length; i++) {
                    //圆心间隔一个直径
                    this.graph.drawCircle(ctx, this.initX + i * this.radius * 2, this.initY, this.radius,
                        this.data[i], '#fe1110', "#ffffff");
                }
            },
            push() {
                //在队尾添加一个数据
                if (this.pushData === '') {
                    return
                } else if (this.data.length > 20) {
                    return
                }
                this.data.push(this.pushData)
                //清空画布
                // this.clearCanvas()
                this.graph.clearCanvas(ctx)
                //画箭头
                this.drawArrow()
                //画数据
                for (let i = 0; i < this.data.length; i++) {
                    this.graph.drawCircle(ctx, this.initX + i * this.radius * 2, this.initY, this.radius,
                        this.data[i], "#fe1110", "#fff");
                }
                console.log(this.pushData)
                this.pushData = ''
            },
            clear() {
                this.data = []
                //清空画布
                this.graph.clearCanvas(ctx)
                //画箭头
                this.drawArrow()
            },
            /**
             * 画箭头
             */
            drawArrow() {
                ctx.beginPath()
                //将画笔移动到该坐标
                ctx.moveTo(50, 300)
                //从moveTo的坐标画线到lineTo坐标
                ctx.lineTo(1000, 300)
                ctx.moveTo(50, 300)
                ctx.lineTo(75, 275)
                ctx.moveTo(50, 300)
                ctx.lineTo(75, 325)
                ctx.closePath()
                //结束
                ctx.stroke();
            }
        },
        mounted() {
            ctx = this.graph.initCanvas('canvas')
            this.drawArrow()
            // 当调整窗口大小时重绘canvas
            window.onresize = () => {
                this.graph.initCanvas('canvas')
                this.drawArrow()
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
