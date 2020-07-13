/**
 * Created by gxchen on 2014/6/17.
 */
(function(window,undefined){
    var canvas,ctx,ball,spring=0.03,friction=0.9,springLength = 100,mouse,gravity = 2;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            ball = new utils.Ball(20);
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            var dx = ball.x - mouse.x,
                dy = ball.y - mouse.y,
                angle = Math.atan2(dy,dx),
                targetX = mouse.x+Math.cos(angle)*springLength,
                targetY = mouse.y+Math.sin(angle)*springLength;
            ball.ax = (targetX - ball.x)*spring;
            ball.ay = (targetY - ball.y)*spring;
            ball.vx+=ball.ax;
            ball.vy+=ball.ay;
            ball.vy+=gravity;
            ball.vx*=friction;
            ball.vy*=friction;
            ball.x+=ball.vx;
            ball.y+=ball.vy;

            ctx.beginPath();
            ctx.moveTo(mouse.x,mouse.y);
            ctx.lineTo(ball.x,ball.y);
            ctx.stroke();
            ctx.closePath();

            ball.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
