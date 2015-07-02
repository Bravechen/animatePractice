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

})(window);
