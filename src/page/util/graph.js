const that = {};

/**
 * 画矩形边框 填充文字
 * @param ctx
 * @param x
 * @param y
 * @param number 数字
 * @param textColor 字体颜色
 */
that.drawRect = function (ctx, x, y, width, height, number, textColor) {
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = textColor;
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    //比圆的圆心向下移动5px
    ctx.fillText(number, x + width / 2, y + 5 + height / 2);
};
/**
 * 任意角度任意长度箭头
 * 调用方法
 * this.graph.drawArrow(ctx, 10, 10, 10, 50, 0)
 * @param ctx canvas context
 * @param sx 开始x
 * @param sy 开始y
 * @param ey 结束y
 * @param angle 旋转角度 0到-360逆时针旋转 0到360顺时针旋转 0不旋转
 */
that.drawArrow = function (ctx, sx, sy, ey, angle) {
    //设置异次元空间
    ctx.save();
    //异次元空间 重置原点,默认是画布的(0,0)点
    ctx.translate(sx, sy);
    //设置旋转角度  参数时弧度 角度0--360 弧度=角度*Math.PI/180
    ctx.rotate(angle * Math.PI / 180);
    //旋转一个线段
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, ey);
    ctx.moveTo(0, ey);
    ctx.lineTo(-5, ey - 10);
    ctx.moveTo(0, ey);
    ctx.lineTo(5, ey - 10);
    ctx.stroke();
    ctx.closePath();
    //将旋转之后的元素返回原画布
    ctx.restore();
};

/**
 * 画圆 填充文字
 * @param ctx
 * @param x 圆心x
 * @param y 圆心y
 * @param radius 半径
 * @param number 中间文本
 * @param circleColor 圆圈背景色
 * @param textColor 文字颜色
 */
that.drawCircle = function (ctx, x, y, radius, number, circleColor, textColor) {
    ctx.fillStyle = circleColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true); // 绘制
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    //比圆的圆心向下移动5px
    ctx.fillText(number, x, y + 5)
};

/**
 * 画字
 * @param ctx
 * @param x 坐标x
 * @param y 坐标y
 * @param text 文本
 * @param textColor 字体颜色
 */
that.drawText = function (ctx, x, y, text, textColor) {
    ctx.fillStyle = textColor;
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.baseline = "alphabetic"
    ctx.fillText(text, x, y)
};

/**
 * 清屏
 * @param ctx
 */
that.clearCanvas = function (ctx) {
    //根据屏幕宽高清空
    ctx.clearRect(0, 0, window.innerWidth - 250, window.innerHeight - 150);
};

/**
 * 创建一个canvas对象
 * @param canvasId canvas id
 * @returns {ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext | CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D}
 */
that.initCanvas = function (canvasId) {
    let canvas;
    let ctx;
    console.log("初始化canvas");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext('2d');
    //获取屏幕宽度
    canvas.width = window.innerWidth - 250;
    //获取屏幕高度，减去上方组件高度，方式出现滚动条
    canvas.height = window.innerHeight - 170;
    return ctx
};


export default that
