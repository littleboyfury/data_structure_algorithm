<template>
    <div class="main">
        <div class="control">
            <el-input style="width: 120px"
                      placeholder="请输入内容："
                      v-model.number="userInput"></el-input>
            <el-button type="primary" v-on:click="pushInput()">入栈</el-button>
            <el-button type="primary" v-on:click="popItem()">出栈</el-button>
            <el-button type="primary" v-on:click="initCanvas()">清空</el-button>
        </div>

        <canvas style="border: #000 1px solid" id="canvasTest" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
</template>

<script>
    export default {
        data(){
            return{

                userInput:'',
                stack:[],
                canvasWidth: 1000,
                canvasHeight: 500,
                x:0,
                y:0,
                radius: 20,
            }
        },
        created(){

        },
        mounted(){
            this.initCanvas();
        },
        methods:{
            initCanvas(){
                this.stack.splice(0,this.stack.length);

                var canvas = document.getElementById('canvasTest');

                if(!canvas.getContext) return;

                var ctx = canvas.getContext("2d");

                //清空画布
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

                //画椭圆
                ctx.beginPath();
                ctx.ellipse(this.canvasWidth - 20,this.canvasHeight / 2,
                    5,30,0,0,Math.PI*2);

                ctx.fillStyle="#c6cdd6";
                ctx.strokeStyle="rgba(0,0,0,0.98)";
                ctx.fill();
                ctx.stroke();
                ctx.closePath();

                //画横线
                ctx.beginPath();
                ctx.moveTo(100, this.canvasHeight / 2);
                ctx.lineTo(this.canvasWidth - 20, this.canvasHeight / 2);

                ctx.stroke();
                ctx.closePath();
            },

            drawCanvas(){
                var canvas = document.getElementById('canvasTest');

                if(!canvas.getContext) return;

                var ctx = canvas.getContext("2d");

                //清空画布
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

                //画椭圆
                ctx.beginPath();
                ctx.ellipse(this.canvasWidth - 20,this.canvasHeight / 2,
                    5,30,0,0,Math.PI*2);

                ctx.fillStyle="#c6cdd6";
                ctx.strokeStyle="rgba(0,0,0,0.98)";
                ctx.fill();
                ctx.stroke();
                ctx.closePath();

                //画横线
                ctx.beginPath();
                ctx.moveTo(100, this.canvasHeight / 2);
                ctx.lineTo(this.canvasWidth - 20, this.canvasHeight / 2);
                ctx.stroke();
                ctx.closePath();

                for (let i = this.stack.length - 1; i >=0 ; i--) {
                    ctx.fillStyle="#fe1110";
                    ctx.beginPath();
                    ctx.arc(this.canvasWidth - 20 - (this.radius * 2 + 3) * (i+1)
                        , this.canvasHeight / 2, this.radius,
                        0, Math.PI * Math.pow(this.radius,2));
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle="#000000";
                    ctx.font = "20px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(this.stack[i],
                        this.canvasWidth - 20 - (this.radius * 2 + 3) * (i+1),
                        this.canvasHeight / 2 + 3);     ctx.fillStyle="#fe1110";
                    ctx.beginPath();
                    ctx.arc(this.canvasWidth - 20 - (this.radius * 2 + 3) * (i+1)
                        , this.canvasHeight / 2, this.radius,
                        0, Math.PI * Math.pow(this.radius,2));
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle="#000000";
                    ctx.font = "20px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(this.stack[i],
                        this.canvasWidth - 20 - (this.radius * 2 + 3) * (i+1),
                        this.canvasHeight / 2 + 3);
                }

            },

            pushInput(){

                this.stack.push(this.userInput);

                this.userInput = '';

                this.drawCanvas();

            },
            popItem(){

                const item = this.stack.pop();

                console.log(item);
                this.drawCanvas();

                var canvas = document.getElementById('canvasTest');

                if(!canvas.getContext) return;

                var ctx = canvas.getContext("2d");

                //画出栈的
                ctx.fillStyle="#c6cdd6";
                ctx.beginPath();
                ctx.arc(100, this.canvasHeight / 2 + 50, this.radius,
                    0, Math.PI * Math.pow(this.radius, 2));
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle="#000000";
                ctx.font = "20px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(item,
                    100, this.canvasHeight / 2 + 53);

            },

            drawBorder(){
                console.log(123);
                var canvas = document.getElementById('canvasTest');
                if(!canvas.getContext) return;
                var ctx = canvas.getContext("2d");

                ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
                ctx.strokeRect (0, 0,this.canvasWidth, this.canvasHeight);
            }
        }
    }
</script>

<style scoped>
    button{
        margin-left: 30px;
    }
    .main{
        display: flex;
        flex-direction: column;
    }
    .control{
        align-items: center;
        display: flex;
        flex-direction: row;
        background: #DDEEDD;
        padding: 10px;
    }
</style>
