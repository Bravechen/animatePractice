/**
 * Created by gxchen on 2014/6/16.
 */
(function(window,undefined){
    var canvas,ctx,spring=0.1,ball,mouse,friction=0.95,gravity=9;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            mouse = utils.captureMouse(canvas,false);

            ball = new utils.Ball(20);
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;

            ball.vx = 1;

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            var dx = mouse.x - ball.x,
                dy = mouse.y - ball.y;
            ball.ax = dx*spring;
            ball.ay = dy*spring;
            ball.vx+=ball.ax;
            ball.vy+=ball.ay;
            ball.vy+=gravity;
            ball.vx*=friction;
            ball.vy*=friction;
            ball.x+=ball.vx;
            ball.y+=ball.vy;
            ball.draw(ctx);

            ctx.beginPath();
            ctx.moveTo(ball.x,ball.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();

        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
