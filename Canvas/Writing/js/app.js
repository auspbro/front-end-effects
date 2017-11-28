/**
 * Created by H_VK on 2017/2/9.
 */
var canvas = document.getElementById("canvas"), context;
canvas.width = canvas.height = 800;
var dragging = false,downLoc,downTime = 0,curLineWidth = -1;

window.onload = function () {
    //判断浏览器是否支持 Canvas
    if(canvas.getContext("2d")){
        context = canvas.getContext("2d");
        initCanvasBorder();
        //鼠标按下事件
        canvas.onmousedown = function (e) {
            e.preventDefault();
            dragging = true;
            downLoc = canvasByWindowPoint(e.clientX,e.clientY);
            downTime = new Date().getTime();
        }

        //鼠标移动事件
        canvas.onmousemove = function (e) {
            e.preventDefault();
            if(dragging){
                var loc = canvasByWindowPoint(e.clientX,e.clientY);
                var t = new Date().getTime() - downTime;
                var lineWidth = setDrawPenLineWidth(downLoc,loc,t);
                context.save();
                context.lineWidth = lineWidth ;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.beginPath();
                context.moveTo(downLoc.x,downLoc.y);
                context.lineTo(loc.x,loc.y);
                context.stroke();
                downLoc = loc;
                curLineWidth = lineWidth;
                context.restore();
            }
        }
        //鼠标抬起事件
        canvas.onmouseup = function (e) {
            e.preventDefault();
            dragging = false;
        }
        //鼠标移出事件
        canvas.onmouseout = function (e) {
            e.preventDefault()
            dragging = false;
        }
    }
}

//初始化 Canvas 边框
var initCanvasBorder = function () {
    context.save();
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.moveTo(0,0);
    context.lineTo(canvas.width,0);
    context.lineTo(canvas.width,canvas.height);
    context.lineTo(0,canvas.height);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvas.width,canvas.height);
    context.lineTo(canvas.width,0);
    context.lineTo(0,canvas.height);
    context.lineTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.moveTo(canvas.width/2,0);
    context.lineTo(canvas.width/2,canvas.height);
    context.setLineDash([10]);
    context.stroke();
    context.restore();
}

var minV = 0.1,maxV = 10,minLineWidth = 10,maxLineWidth = 30;
var setDrawPenLineWidth = function (beginPoint,endPoint,time) {
    var s  = Math.floor(Math.sqrt(Math.pow(endPoint.x - beginPoint.x,2) + Math.pow(endPoint.y - beginPoint.y,2))),
        v = s / time,
        linWidth = 0;
    if(v <=  minV){
        linWidth =  maxLineWidth;
    }else if(v >= maxV){
        linWidth =  minLineWidth;
    }else{
        linWidth =  maxLineWidth - ( v - minV) /( maxV - minV) *(maxLineWidth - minLineWidth);
    }
    if(curLineWidth === -1){
        return linWidth;
    }else{
        return curLineWidth * 4/5 + linWidth * 1/5;
    }
}

//获取鼠标在canvas中的真实坐标
var canvasByWindowPoint = function ( clientX,clientY) {
    var canvasByRect = canvas.getBoundingClientRect();
    return {
        x: clientX - canvasByRect.left * (canvas.width / canvasByRect.width),
        y: clientY - canvasByRect.top * (canvas.height / canvasByRect.height)
    }
}



