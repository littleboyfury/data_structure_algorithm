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
                    <el-button type="primary" @click="stateData">默认数据</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="allClear">清空二叉树</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="everyStepPostOrder">逐步获取结果</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="oncePostOder">直接获取结果</el-button>
                </el-col>
                <el-col :span="3">
                    <div>后序遍历演示</div>
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
                lay:2,
                goright:true,
                goleft:true,
                parentIndex:0,
                traverRes:[],//中序遍历返回结果
                data: [],
                pushData: '',
                hasTraNum:0,
                sons:[],//一个节点的所有孩子
            }
        },

        methods: {
            stateData() {
                this.data = [7, 1, 5, 9, 4, 3,0,4,9,7,3,6];
                this.graph.clearCanvas(ctx);
                this.drawPostOrder(this.data,-1,[],[]);
            },

            push() {
                if (this.data.length === 15) {
                    return
                }
                if (this.pushData === '') {
                    return
                }
                this.data.push(this.pushData)
                this.graph.clearCanvas(ctx)
                this.drawPostOrder(this.data,-1,[],[]);
                this.pushData = ''
            },
            pop() {
                if (this.data.length === 0) {
                    return
                }
                let popData = this.data.pop()
                this.clear();
                this.drawPostOrder(this.data,-1,[],[]);
                this.graph.drawCircle(ctx, 60, 100, 20, popData, '#ccc', '#000');
                this.graph.drawText(ctx, 60, 150, '删除的数据', '#000')

            },
            clear() {
                this.graph.clearCanvas(ctx)
                this.goleft=true
                this.parentIndex=0
                this.traverRes=[]
                this.lay=2
                this.goright=true
                this.goleft=true

            },
            allClear(){
                this.data = []
                this.clear()
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
             * 遍历结果
             */
            postOrderRes() {
                for (let i = 0; i < this.traverRes.length; i++) {
                    this.graph.drawRect(ctx, 10 + 32 * i, 460, 32, 40, this.traverRes[i], '#000');
                }
            },

            /**
             * 得到一个节点的所有孩子下标
             * @param index
             */
            getSons(index){
                let leftSonIndex = index*2+1;
                let rightSonIndex = leftSonIndex+1;
                //如果有左孩子
                if(leftSonIndex < this.data.length){
                    this.sons.push(leftSonIndex)
                    //继续寻找左孩子的孩子
                    this.getSons(leftSonIndex);
                }
                //如果有右孩子
                if(rightSonIndex < this.data.length){
                    this.sons.push(rightSonIndex);
                    //继续寻找右孩子的孩子
                    this.getSons(rightSonIndex);
                }
            },
            getLeftSons(index){
                let leftSonIndex = index*2+1;
                this.sons=[];
                this.sons.push(leftSonIndex);
                this.getSons(leftSonIndex);
                return this.sons;
            },
            getRightSons(index){
                let rightSonIndex = index*2+2;
                this.sons = [];
                this.sons.push(rightSonIndex);
                this.getSons(rightSonIndex);
                return this.sons;
            },

            /**
             * 画父子节点的二叉树，更换不同颜色
             * @param data
             * @param parent
             * @param leftSon
             * @param rightSon
             */
            drawPostOrder(data,parent, leftSon, rightSon) {
                this.initRect();
                this.postOrderRes();
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
                    } else if (leftSon.find(item => item === i)) {
                        this.graph.drawCircle(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY, radius, data[i], "#97FFFF", '#fff');
                    } else if (rightSon.find(item => item === i)) {
                        this.graph.drawCircle(ctx, baseX + (i - Math.pow(2, j) + 1) * zIndex * radius, baseY, radius, data[i], "#f0ff11", '#fff');
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
             * 一次性得到遍历结果
             */
            oncePostOder(){
                let data = this.data;
                let dataIndex = 0;
                this.postOrder(data,dataIndex);
            },

            /**
             * 递归遍历
             */
            postOrder(data,dataIndex){
                if(this.traverRes.length===data.length){
                    this.graph.clearCanvas(ctx)
                    this.drawPostOrder(data,-1,[],[]);
                }
                if(dataIndex<data.length){
                    //前
                    let leftIndex = dataIndex*2+1;
                    this.postOrder(data,leftIndex);
                    //后
                    let rightIndex = dataIndex*2+2;
                    this.postOrder(data,rightIndex);
                    //中
                    this.traverRes.push(data[dataIndex]);
                }
            },

            /**
             * 分部获取遍历结果
             */
            everyStepPostOrder() {
                let leftSonIndex = this.parentIndex*2+1;
                let rightSonIndex = leftSonIndex + 1;
                let leftSon = this.getLeftSons( this.parentIndex);
                let rightSon = this.getRightSons( this.parentIndex);
                //判断是否全部遍历完
                if (this.traverRes.length >= this.data.length) {
                    //进行最后一次渲染
                    this.graph.clearCanvas(ctx);
                    this.drawPostOrder(this.data, this.parentIndex,[],[]);
                    console.log('结束了')
                    return;
                }
                //清空画布
                this.graph.clearCanvas(ctx);
                //画二叉树
                this.drawPostOrder(this.data,  this.parentIndex, leftSon, rightSon);
                console.log(this.parentIndex);
                //如果若左孩子仍然是树,则以左子树作为跟节点，继续查询//
                if(this.goleft){
                    if(( this.parentIndex*2+1)*2+1 < this.data.length){
                        this.lay++;
                        this.parentIndex =  this.parentIndex*2+1;
                        console.log('111');
                    }
                    //不存在左子树，/
                    else{
                        leftSonIndex = this.parentIndex*2+1;
                        rightSonIndex = leftSonIndex + 1;
                        if(leftSonIndex < this.data.length){
                            let leftValue = this.data[leftSonIndex]
                            //前
                            this.traverRes.push(leftValue)
                        }
                        if(rightSonIndex < this.data.length){
                            let rightValue = this.data[rightSonIndex]
                            //后
                            this.traverRes.push(rightValue)
                        }
                        //中
                        this.traverRes.push(this.data[this.parentIndex])
                        this.parentIndex = (this.parentIndex-1)/2;
                        this.goleft = false;
                        console.log('222');
                        return;
                    }
                }
                if(this.lay===3 && !this.goleft && this.goright){

                    this.parentIndex = 2*this.parentIndex+2;
                    console.log('333');
                    this.goright = false;
                    return;
                }
                if(this.lay===3&&!this.goleft &&!this.goright){
                    if(leftSonIndex < this.data.length){
                        let leftValue = this.data[leftSonIndex]
                        //前
                        this.traverRes.push(leftValue)
                    }

                    if(rightSonIndex < this.data.length){
                        let rightValue = this.data[rightSonIndex]
                        //后
                        this.traverRes.push(rightValue)

                    }
                    //中
                    this.traverRes.push(this.data[this.parentIndex])
                    if(this.parentIndex === 6){
                        this.traverRes.push(this.data[2]);
                        this.traverRes.push(this.data[0]);
                        this.parentIndex = 0;
                    }else{
                        this.traverRes.push(this.data[0]);
                        this.parentIndex = 0;
                    }
                    console.log('444');
                }
                if(this.lay===4&&this.parentIndex===0){
                    this.parentIndex  = 2*this.parentIndex+2;
                    this.lay=2;
                    this.goleft=true;
                    this.goright=true;
                    console.log('777');
                    return;
                }
                if(this.lay===4&&!this.goleft && this.goright){

                    this.parentIndex = 2*this.parentIndex+2;
                    this.goright = false;
                    console.log('555');
                    return;
                }
                if(this.lay===4&&!this.goleft&&!this.goright){
                    if((this.parentIndex*2+2)*2+2){
                        if(leftSonIndex < this.data.length){
                            let leftValue = this.data[leftSonIndex]
                            //前
                            this.traverRes.push(leftValue)

                        }
                        if(rightSonIndex < this.data.length){
                            let rightValue = this.data[rightSonIndex]
                            //后
                            this.traverRes.push(rightValue)
                        }
                        //中
                        this.traverRes.push(this.data[this.parentIndex])
                        this.traverRes.push(this.data[1])
                        this.parentIndex = 0;
                        console.log('666');
                    }
                    else{
                        //后
                        let rightValue = this.data[rightSonIndex]
                        this.traverRes.push(rightValue)
                        this.parentIndex = 0;
                        this.goright = true;
                    }
                    return;
                }
            },


        },
        mounted() {

            ctx = this.graph.initCanvas('canvas');
            // 当调整窗口大小时重绘canvas
            window.onresize = () => {
                this.graph.initCanvas('canvas');
            }

        },
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
