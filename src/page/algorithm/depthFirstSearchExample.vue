<template>
    <div class="main">
        <div class="control">

            <el-radio-group style="margin-right: 30px" @change="radioChange" v-model="radio" size="mini">
                <el-radio label="1" border>无向图</el-radio>
<!--                <el-radio label="2" border>有向图</el-radio>-->
            </el-radio-group>

            从
            <el-input style="width: 50px"
                      placeholder="请输入内容："
                      v-model.number="startElement"></el-input>
            <el-button style="margin-left: 10px" type="primary" v-on:click="start()">开始</el-button>

            <el-button style="margin-left: 10px" :disabled="lastEnable" type="primary" v-on:click="lastElement()">上一步</el-button>

            <el-button style="margin-left: 10px" :disabled="nextEnable" type="primary" v-on:click="nextElement()">下一步</el-button>

            <div v-if="tipStr.length > 0" style="margin-left: 10px">
                {{ tipStr[cursor-1].description }} {{ tipStr[cursor-1].elem }}
            </div>

        </div>
        <canvas style="border: #000 1px solid" id="canvasTest" :width="canvasWidth" :height="canvasHeight"></canvas>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                radio: '1',
                canvasWidth: 1000,
                canvasHeight: 500,
                startElement: 0,
                highLightElement: 0,
                cursor: 0,
                radius: 30,
                dataList:[[9,11,6,12],[2,16,4,8],[14,1,13,5],[3,10,7,15]],
                pathList:[],
                finalList:[],
                tempList:[],
                finalTempList:[],
                tipStr:[],
                lastEnable: true,
                nextEnable: true,
                type: 1,
                tip: '',
                count:0,
                dataList2:[
                    {
                        head:'A',
                        x: 250,
                        y: 200,
                        next:[
                            'B','C','F'
                        ]
                    },
                    {
                        head:'B',
                        x: 450,
                        y: 200,
                        next:[
                            'F'
                        ]
                    },
                    {
                        head:'C',
                        x: 450,
                        y: 300,
                        next:[
                            'B','D'
                        ]
                    },
                    {
                        head:'D',
                        x: 250,
                        y: 300,
                        next:[

                        ]
                    },
                    {
                        head:'E',
                        x: 650,
                        y: 400,
                        next:[

                        ]
                    },
                    {
                        head:'F',
                        x: 480,
                        y: 100,
                        next:[
                            'H'
                        ]
                    },
                    {
                        head:'G',
                        x: 680,
                        y: 250,
                        next:[
                            'B','C','E'
                        ]
                    },
                    {
                        head:'H',
                        x: 720,
                        y: 100,
                        next:[
                            'G'
                        ]
                    },
                ]
            };
        },
        mounted(){
            this.initCanvas();
        },
        methods:{
            initCanvas(){
                var canvas = document.getElementById('canvasTest');

                if(!canvas.getContext) return;

                var ctx = canvas.getContext("2d");

                //清空画布
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

                if(this.type === 1){
                    //无向图

                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {

                            //画文字
                            if(this.tipStr.length > 0){
                                if(this.tipStr[this.cursor-1].type === 1){
                                    //找到元素
                                    if(this.dataList[j][i] === this.tipStr[this.cursor-1].elem){
                                        ctx.fillStyle="#fe1110";
                                        ctx.strokeStyle = "#fe1110";
                                    }else {
                                        ctx.fillStyle="#000000";
                                        ctx.strokeStyle = "#000000";
                                    }



                                }else {
                                    //回溯元素
                                    if(this.dataList[j][i] === this.tipStr[this.cursor-1].elem){
                                        ctx.fillStyle="#1519fe";
                                        ctx.strokeStyle = "#1519fe";
                                    }else {
                                        ctx.fillStyle="#000000";
                                        ctx.strokeStyle = "#000000";
                                    }
                                }
                            }

                            ctx.font = "20px sans-serif";
                            ctx.textAlign = "center";
                            ctx.fillText(this.dataList[j][i],200 * (i+1),100 * (j+1) + 5);

                            //画圆
                            ctx.beginPath();
                            ctx.arc(200 * (i+1),100 * (j+1),this.radius,
                                0, Math.PI * Math.pow(this.radius,2));
                            ctx.closePath();
                            ctx.stroke();
                            ctx.strokeStyle = "#000000";

                            //画横线
                            ctx.fillStyle="#000000";

                            if(i < 3){
                                ctx.beginPath();
                                ctx.moveTo(200 * (i+1) + this.radius,100 * (j+1));
                                ctx.lineTo(200 * (i+2) - this.radius, 100 * (j+1));
                                ctx.stroke();
                                ctx.closePath();
                            }

                            //画竖线
                            if(j < 3){
                                ctx.beginPath();
                                ctx.moveTo(200 * (i+1),100 * (j+1) + this.radius);
                                ctx.lineTo(200 * (i+1),100 * (j+2) - this.radius);
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                    }
                    //画结果
                    if (this.tipStr.length > 0){
                        //画第一个元素
                        ctx.fillText(this.tipStr[0].elem,50,20);
                        let j = 0;
                        for (let i = 1; i < this.cursor; i++) {
                            if(this.tipStr[i].type === 1){
                                j++;
                                //画横线
                                ctx.beginPath();
                                ctx.moveTo(50 + 50 * (j-1) + 15,12);
                                ctx.lineTo(50 + 50 * j - 15, 12);
                                ctx.stroke();
                                ctx.closePath();
                                //画上箭头
                                ctx.beginPath();
                                ctx.moveTo(50 + 50 * j - 15,12);
                                ctx.lineTo(50 + 50 * j - 20, 7);
                                ctx.stroke();
                                ctx.closePath();
                                //画下箭头
                                ctx.beginPath();
                                ctx.moveTo(50 + 50 * j - 15,12);
                                ctx.lineTo(50 + 50 * j - 20, 17);
                                ctx.stroke();
                                ctx.closePath();

                                ctx.font = "20px sans-serif";
                                ctx.fillText(this.tipStr[i].elem,50 + 50 * j,20);
                            }
                        }
                    }

                }else {
                    //有向图
                    for (let i = 0; i < this.dataList2.length; i++) {
                        //画圆
                        let x = this.dataList2[i].x;
                        let y = this.dataList2[i].y;
                        ctx.beginPath();
                        ctx.arc(x,y ,this.radius,
                            0, Math.PI * Math.pow(this.radius,2));
                        ctx.closePath();
                        ctx.stroke();
                        //画字母
                        ctx.fillText(this.dataList2[i].head,
                            x, y+5);
                        //画连接线
                        console.log("head",this.dataList2[i].head);
                        for (let j = 0; j < this.dataList2[i].next.length; j++) {
                            let next = this.dataList2[i].next[j];
                            console.log("next",next);
                            for (let k = 0; k < this.dataList2.length; k++) {
                                if(this.dataList2[k].head === next){
                                    let nextX = this.dataList2[k].x;
                                    let nextY = this.dataList2[k].y;
                                    //计算斜率
                                    let xielv = (nextY - y)/(nextX - x);
                                    let b = y - xielv * x;
                                    let startX = 0;
                                    let endX = 0;
                                    if(nextX - x > 0){
                                        //右下方
                                        startX = x;
                                        endX = nextX;
                                    }else {
                                        //左下方
                                        startX = x;
                                        endX = nextX;
                                    }
                                    let startY = xielv * x + b;
                                    let endY = xielv * endX + b;
                                    console.log("xielv",xielv);
                                    console.log("b",b);
                                    console.log("startX",startX);
                                    console.log("startY",startY);
                                    console.log("endX",endX);
                                    console.log("endY",endY);
                                    //画横线
                                    ctx.beginPath();
                                    ctx.moveTo(startX, startY);
                                    ctx.lineTo(endX, endY);
                                    ctx.stroke();
                                    ctx.closePath();
                                    // //画上箭头
                                    // ctx.beginPath();
                                    // ctx.moveTo(50 + 50 * j - 15,12);
                                    // ctx.lineTo(50 + 50 * j - 20, 7);
                                    // ctx.stroke();
                                    // ctx.closePath();
                                    // //画下箭头
                                    // ctx.beginPath();
                                    // ctx.moveTo(50 + 50 * j - 15,12);
                                    // ctx.lineTo(50 + 50 * j - 20, 17);
                                    // ctx.stroke();
                                    // ctx.closePath();
                                }
                            }
                        }
                    }
                }


            },

            richNoDirectionMap(){
                //取栈顶元素
                this.count ++;
                //console.log(this.count);
                if(this.finalList.length < 16 && this.count<100){
                    let obj = this.pathList[this.pathList.length - 1];
                    //console.log("obj:");
                    //console.log(obj);

                    let iIndex = obj.i;
                    let jIndex = obj.j;
                    let parentI = obj.parentI;
                    let parentJ = obj.parentJ;
                    let value = obj.value;
                    let search = obj.search;
                    let nextObj = [
                        {
                            i: iIndex, //左
                            j: jIndex-1,
                            parentI: iIndex,
                            parentJ: jIndex,
                            search:[false,false,false,false]
                        },
                        {
                            i: iIndex-1, //上
                            j: jIndex,
                            parentI: iIndex,
                            parentJ: jIndex,
                            search:[false,false,false,false]
                        },
                        {
                            i: iIndex, //右
                            j: jIndex+1,
                            parentI: iIndex,
                            parentJ: jIndex,
                            search:[false,false,false,false]
                        },
                        {
                            i: iIndex+1, //下
                            j: jIndex,
                            parentI: iIndex,
                            parentJ: jIndex,
                            search:[false,false,false,false]
                        }
                    ];
                    let minI = -1;
                    let minJ = -1;
                    let min = 99;
                    let k = 0;
                    let minK = -1;
                    for (k = 0; k < search.length; k++) {
                        //遍历上下左右，比较大小
                        if(!search[k]){
                            let next = nextObj[k];
                            let flag = true;
                            for (let m = 0; m < this.tempList.length; m++) {
                                if(this.tempList[m].i === next.i && this.tempList[m].j === next.j){
                                    flag = false;
                                }
                            }

                            if(next.i >= 0 && next.j >=0 && next.i<=3 && next.j<=3
                                && flag &&
                                !(next.i === parentI && next.j === parentJ ) &&
                                this.dataList[next.i][next.j] < min){

                                min = this.dataList[next.i][next.j];
                                minI = next.i;
                                minJ = next.j;
                                minK = k;
                            }
                        }
                    }
                    if(minK >= 0){
                        //有值，说明没有遍历完，标志已遍历，入栈
                        this.pathList[this.pathList.length - 1].search[minK] = true;
                        this.pathList.push(nextObj[minK]);
                        this.tempList.push(nextObj[minK]);
                        this.tipStr.push({type:1, description: "找到元素：" , elem: min});
                    }else{
                        //否则，回溯
                        console.log("无min值");

                        this.finalList.push(this.pathList.pop());

                        if(this.pathList.length>1){
                            let o = this.pathList[this.pathList.length-1];
                            this.tipStr.push({type:2, description: "回溯到：" , elem: this.dataList[o.i][o.j]});
                        }

                    }
                    if(this.tempList.length !== 16){
                        this.richNoDirectionMap();
                    }


                }else {
                    console.log('开始');
                    for (let i = 0; i < this.tempList.length; i++) {
                        console.log(this.dataList[this.tempList[i].i][this.tempList[i].j])
                        this.finalTempList.push(this.dataList[this.tempList[i].i][this.tempList[i].j]);
                    }

                    for (let i = 0; i < this.tipStr.length; i++) {
                        console.log(this.tipStr[i].description,this.tipStr[i].elem);
                    }
                }

            },

            start(){
                if(this.startElement > 0 && this.startElement <= 16){
                    this.pathList.splice(0,this.pathList.length);
                    this.finalList.splice(0,this.finalList.length);
                    this.tempList.splice(0,this.tempList.length);
                    this.finalTempList.splice(0,this.finalTempList.length);
                    this.cursor = 0;
                    //DFS
                    let iIndex = 0;
                    let jIndex = 0;

                    for (let i = 0; i < this.dataList.length; i++) {
                        for (let j = 0; j < this.dataList[i].length; j++) {
                            if(this.dataList[i][j] === this.startElement){
                                iIndex = i;
                                jIndex = j;
                                break;
                            }
                        }
                    }

                    this.pathList.push({
                        value: this.startElement,
                        i: iIndex,
                        j: jIndex,
                        search: [false,false,false,false]
                    });



                    if(this.type === 1){
                        //无向图
                        this.tipStr.push({type:1, description: "找到元素：" , elem: this.startElement});
                        this.tempList.push({
                            i: iIndex,
                            j: jIndex,
                            search: [false,false,false,false]
                        });
                        this.richNoDirectionMap();
                    }else {
                        //有向图

                    }

                    //DFS END
                    this.highLightElement = this.finalTempList[this.cursor++];
                    console.log("highLightElement",this.highLightElement);
                    this.nextEnable = false;
                    this.initCanvas();
                }
            },

            nextElement(){
                if(this.cursor < this.tipStr.length){
                    this.cursor++;
                    this.lastEnable = false;
                    this.initCanvas();
                }
                if(this.cursor === this.tipStr.length){
                    this.nextEnable = true;
                }

            },

            lastElement(){
                if(this.cursor > 1){
                    this.cursor--;
                    this.nextEnable = false;
                    this.initCanvas();
                }
                if(this.cursor === 1){
                    this.lastEnable = true;
                }
            },

            radioChange(e){
                this.type = parseInt(e);
                this.pathList.splice(0,this.pathList.length);
                this.finalList.splice(0,this.finalList.length);
                this.tempList.splice(0,this.tempList.length);
                this.finalTempList.splice(0,this.finalTempList.length);
                this.tipStr.splice(0,this.tipStr.length);
                this.cursor = 0;
                this.initCanvas();
                console.log(e);
            },
        },
    }
</script>

<style scoped>
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
