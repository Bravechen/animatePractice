/**
 * Created by gxchen on 2015/7/2.
 */
(function(window,undefined){
    'use strict';
    var stage,test,drawArea;
    var Learn = {
        init:function(){
            stage = document.getElementById('stage');
            test = document.getElementById('test');
            drawArea = test.getContext('2d');
            draw();
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function draw(){
        drawLines();
    }
    /**
     * 绘制线条
     *
     * **/
    function drawLines(){
        //可是试试注释掉一些语句，观察绘制的效果
        drawArea.beginPath();
        drawArea.lineWidth = 20;
        drawArea.strokeStyle = "#ff0000";
        drawArea.lineCap = "butt";
        drawArea.moveTo(100,100);
        drawArea.lineTo(300,100);
        drawArea.stroke();
        drawArea.closePath();

        drawArea.beginPath();
        drawArea.lineWidth = 10;
        drawArea.strokeStyle = "#00ffff";
        drawArea.lineCap = "round";
        drawArea.moveTo(100,150);
        drawArea.lineTo(300,150);
        drawArea.stroke();
        drawArea.closePath();

        drawArea.beginPath();
        drawArea.lineWidth = 5;
        drawArea.strokeStyle = "#CCff00";
        drawArea.lineCap = "square";
        drawArea.moveTo(100,200);
        drawArea.lineTo(300,200);
        drawArea.stroke();
        drawArea.closePath();

        drawArea.beginPath();
        drawArea.lineWidth = 10;
        drawArea.strokeStyle = "#33cc00";
        drawArea.moveTo(200,200);
        drawArea.lineTo(300,250);
        drawArea.lineTo(400,50);
        drawArea.closePath();
        drawArea.stroke();
    }

})(window);
