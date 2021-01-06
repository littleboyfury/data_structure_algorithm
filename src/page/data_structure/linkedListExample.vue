<template>
    <div class="main">
        <div class="control">
            <!--            数组大小：-->
            <!--            <el-input style="width: 60px"-->
            <!--                      placeholder="数组大小"-->
            <!--                      v-model.number="listSize"></el-input>-->
            <!--            <el-button type="primary" v-on:click="initList()">确定</el-button>-->
            添加元素：
            <el-input style="width: 60px"
                      placeholder="值"
                      v-model="textAdd"></el-input>
            <el-button type="primary" v-on:click="addItem()">确定</el-button>
            删除指定index：
            <el-input style="width: 60px"
                      placeholder="索引"
                      v-model="indexDel"></el-input>
            <el-button type="primary" v-on:click="spliceItem()">确定</el-button>
            查找元素的index：
            <el-input style="width: 60px"
                      placeholder="值"
                      v-model="textFind"></el-input>
            <el-button type="primary" v-on:click="findItem()">确定</el-button>
            <el-button type="primary" v-on:click="initList()">清空</el-button>
        </div>

        <canvas style="border: #000 1px solid" id="canvasTest" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
</template>

<script>
    export default {
        data(){
            return{

                textShow:'',
                textShowIndex:'',
                textAdd:'',
                textFind:'',
                indexFind:-1,
                indexDel:0,
                listSize: 40,
                dataList:[],
                cursor:0,
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
            this.initList();
        },
        methods:{
            addItem(){
                if(this.textAdd === ''){
                    return;
                }
                this.dataList.push(this.textAdd);
                this.textShow = this.textAdd;
                this.textShowIndex = this.dataList.length-2 + '';
                this.initCanvas();
                this.textAdd = '';

            },
            spliceItem(){
                if(this.indexDel <= this.dataList.length){
                    let index = parseInt(this.indexDel) + 1;

                    this.textShow = this.dataList[index];

                    console.log(this.textShow);

                    this.dataList.splice(index, 1);
                    //
                     this.textShowIndex = this.indexDel + '';
                    //
                     this.indexDel = '';

                    this.initCanvas();

                }else {
                    alert("越界");
                }

            },
            findItem(){
                console.log(this.textFind);
                if(this.textFind === ''){
                    return;
                }

                for (let i = 1; i < this.dataList.length; i++) {
                    if(this.textFind === this.dataList[i]){
                        this.indexFind = i;
                        break;
                    }
                }

                if(this.indexFind >= 0){
                    console.log("at",this.indexFind);
                    this.textShow = this.textFind;
                    this.textShowIndex = (this.indexFind-1) + '';
                    this.initCanvas();

                    this.indexFind = -1;
                }else {
                    alert("未找到");

                }
                this.indexFind = -1;
            },
            initList(){
                this.dataList.splice(0, this.dataList.length);
                this.dataList.push('');
                // for (let i = 0; i < parseInt(this.listSize); i++) {
                //     this.dataList.push('');
                // }
                this.initCanvas();
            },
            initCanvas(){
                var canvas = document.getElementById('canvasTest');

                if(!canvas.getContext) return;

                var ctx = canvas.getContext("2d");

                //清空画布
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);


                //值接收框
                ctx.strokeRect(40, 40, 40, 40);
                ctx.font = "16px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText('值', 40 + 40 / 2, 40-10);
                ctx.fillText(this.textShow, 40 + 40 / 2, 40 + 40/2 + 5);

                //下标接收框
                ctx.strokeRect(100, 40, 40, 40);
                ctx.font = "16px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText('下标', 100 + 40 / 2, 40-10);
                ctx.fillText(this.textShowIndex, 100 + 40 / 2, 40 + 40/2 + 5);

                //画数组框
                let j = 0;
                let coloum = 10;
                for (let i = 0; i < this.dataList.length; i++) {

                    if(this.indexFind >= 0 && i === this.indexFind){
                        ctx.fillStyle="#ff0000";
                    }else {
                        ctx.fillStyle="#000000";
                    }

                    if((i) % coloum === 0){
                        j++;
                    }

                    //换行
                    ctx.strokeRect(40 * (1 + i % coloum) + 50*(i % coloum), 40 * (1+j*2), 40, 40);
                    ctx.strokeRect(40 * (1 + i % coloum) + 50*(i % coloum)-10, 40 * (1+j*2), 10, 40);
                    //箭头
                    if(i>0){
                        if((i) % coloum === 0){
                            ctx.beginPath();
                            ctx.moveTo(10, 40 * (1+j*2)+20);
                            ctx.lineTo(30, 40 * (1+j*2)+20);
                            ctx.stroke();
                            ctx.closePath();
                        }else {
                            ctx.beginPath();
                            ctx.moveTo(40 * (1 + (i-1) % coloum) + 50*((i-1) % coloum) + 40, 40 * (1+j*2)+20);
                            ctx.lineTo(40 * (1 + i % coloum) + 50*(i % coloum)-10, 40 * (1+j*2)+20);
                            ctx.stroke();
                            ctx.closePath();
                        }


                        //上箭头
                        ctx.beginPath();
                        ctx.moveTo(40 * (1 + i % coloum) + 50*(i % coloum)-10, 40 * (1+j*2)+20);
                        ctx.lineTo(40 * (1 + i % coloum) + 50*(i % coloum)-10 - 10, 40 * (1+j*2)+20 - 8);
                        ctx.stroke();
                        ctx.closePath();

                        //下箭头
                        ctx.beginPath();
                        ctx.moveTo(40 * (1 + i % coloum) + 50*(i % coloum)-10, 40 * (1+j*2)+20);
                        ctx.lineTo(40 * (1 + i % coloum) + 50*(i % coloum)-10 - 10, 40 * (1+j*2)+20+8);
                        ctx.stroke();
                        ctx.closePath();

                        //下标
                        ctx.fillText((i-1)+'', 40 * (1 + i % coloum) + 50*(i % coloum) + 20, 40 * (1+j*2) + 55);

                    }


                    //数值
                    ctx.fillText(this.dataList[i], 40 * (1 + i % coloum) + 50*(i % coloum) + 20, 40 * (1+j*2) + 25);

                }

            },


            drawCanvas(){
                var canvas = document.getElementById('canvasTest');

                if(!canvas.getContext) return;

                var ctx = canvas.getContext("2d");

                //清空画布
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);




            },



        }
    }
</script>

<style scoped>
    button{
        margin-left: 10px;
        margin-right: 11px;
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
