/**
 * Created by gxchen on 2014/6/6.
 */

(function(window,undefined){
    var canvas,ctx,ball,angle= 0,radius1=200,radius2=100,oldX=0,oldY=0;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            ball = new utils.Ball();
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            oldX = ball.x;
            oldY = ball.y;

            ball.x = canvas.width*0.5+Math.cos(angle)*radius1;
            ball.y = canvas.height*0.5+Math.sin(angle)*radius2;
            angle+=0.05;

           /* ctx.beginPath();
            ctx.moveTo(oldX,oldY);
            ctx.lineTo(ball.x,ball.y);
            ctx.closePath();
            ctx.stroke(); */


            ball.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
