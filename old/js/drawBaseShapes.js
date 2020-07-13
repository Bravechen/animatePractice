/**
 * Created by gxchen on 2015/7/2.
 */
(function (window, undefined) {
    "use strict";
    var stage, sprite, drawArea;
    var Learn = {
        init: function () {
            stage = document.getElementById('stage');
            sprite = document.getElementById('sprite');
            drawArea = sprite.getContext('2d');
            draw();
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;
    /**
     * 绘制
     */
    function draw() {
        drawRect();
        drawCircle();
        drawSector(170,150,50,Math.PI*1.5);   //270度
        drawRound(290,150,50);
        drawBezier2();
        drawBezier3();
        useClip();
    }
    /**
     * 绘制矩形
     */
    function drawRect() {
        //rect方法
        drawArea.strokeStyle = "#12132f";
        drawArea.lineWidth = 2;
        drawArea.rect(10, 10, 100, 50);
        drawArea.stroke();
        //strokeRect方法
        drawArea.strokeStyle = "#e1a837";
        drawArea.lineWidth = 10;
        drawArea.strokeRect(120, 10, 100, 50);
        //lineWidth的增加是以矩形的边界为中心线增加的
        drawArea.strokeStyle = "#000000";
        drawArea.lineWidth = 1;
        drawArea.rect(120, 10, 100, 50);
        drawArea.stroke();
        //fillRect方法
        drawArea.fillStyle = "#7b4253";
        drawArea.fillRect(240, 10, 100, 50);
        //先描边后填充，填充覆盖了部分边框
        drawArea.beginPath();
        drawArea.lineWidth = 10;
        drawArea.strokeStyle = '#da7982';
        drawArea.rect(360, 10, 100, 50);
        drawArea.stroke();
        drawArea.fill();
        drawArea.closePath();
        //先填充后描边，边框覆盖了部分填充
        drawArea.beginPath();
        drawArea.lineWidth = 10;
        drawArea.strokeStyle = '#da7982';
        drawArea.rect(480, 10, 100, 50);
        drawArea.fill();
        drawArea.stroke();
        drawArea.closePath();
    }

    /**
     * 绘制圆形
     */
    function drawCircle(){
        drawArea.beginPath();   //为了区别于上一个方法中的绘制路径
        drawArea.lineWidth = 3;
        drawArea.strokeStyle = '#86222a';
        drawArea.arc(60,150,50,0,Math.PI*2,false);
        drawArea.stroke();
    }

    /**
     * 绘制扇形,使用arc和直线方法
     * @param x {Number}
     * @param y {Number}
     * @param radius {Number} 半径
     * @param angle {Number} 扇形角度，使用弧度单位
     */
    function drawSector(x,y,radius,angle){
        drawArea.beginPath();
        drawArea.lineWidth = 5;
        drawArea.strokeStyle = '#b15971';
        drawArea.moveTo(x,y);
        drawArea.lineTo(x+radius,y);
        drawArea.arc(x,y,radius,0,angle,false);
        drawArea.lineTo(x,y);
        drawArea.closePath();
        drawArea.stroke();
    }

    /**
     * 绘制圆角，使用arcTo和直线方法
     * @param x {Number} 横坐标
     * @param y {Number} 纵坐标
     * @param radius {Number} 半径
     */
    function drawRound(x,y,radius){
        drawArea.beginPath();
        drawArea.lineWidth = 2;
        drawArea.strokeStyle = "#0a0f25";
        drawArea.moveTo(x,y);
        drawArea.lineTo(x-radius,y);
        drawArea.arcTo(x-radius,y-radius,x,y-radius,radius);
        drawArea.lineTo(x,y);
        drawArea.closePath();
        drawArea.stroke();
    }

    /**
     * 绘制二次贝塞尔曲线
     */
    function drawBezier2(){
        drawArea.beginPath();
        drawArea.strokeStyle = "#ba8a62";
        drawArea.lineWidth = 3;
        drawArea.moveTo(360,150);
        drawArea.quadraticCurveTo(450,50,380,200);
        drawArea.stroke();
    }

    /**
     * 绘制三次贝塞尔曲线
     */
    function drawBezier3(){
        drawArea.beginPath();
        drawArea.strokeStyle = '#6c70f8';
        drawArea.lineWidth = 3;
        drawArea.moveTo(420,150);
        drawArea.bezierCurveTo(500,10,400,170,430,220);
        drawArea.stroke();
    }

    /**
     * 使用clip绘制遮罩
     */
    function useClip(){

        //应该有的区域
        drawArea.beginPath();
        drawArea.strokeStyle = "#ff0000";
        drawArea.rect(100,300,200,100);
        drawArea.rect(100,300,120,70);
        drawArea.stroke();
        drawArea.save();
        //遮罩
        drawArea.beginPath();
        drawArea.arc(100,300,50,0,Math.PI*2,false);
        drawArea.rect(120,320,100,50);
        drawArea.clip();

        //底部绘制的区域
        drawArea.beginPath();
        drawArea.fillStyle = "#432142";
        drawArea.rect(100,300,200,100);
        drawArea.fill();
        drawArea.restore();

        //save和restore之后不影响以后操作
        drawArea.beginPath();
        drawArea.strokeStyle = "#00ffff";
        drawArea.rect(120,320,200,100);
        drawArea.stroke();

    }

})(window);
