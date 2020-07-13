/**
 * Created by gxchen on 2014/6/11.
 */
(function(window,undefined){
    var canvas,ctx,balls,ballSum=100,gravity = 0.3,wind = 0.1,mouse;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);

            balls = [];
            for(var i=0;i<ballSum;i++){
                var ball = new utils.Ball(Math.random()*10+5,utils.randomColor24(utils.ColorType.UINT));
                balls[i] = ball;
                ball.x = canvas.width*0.5;
                ball.y = canvas.height;
                ball.vx = Math.random()*2-1;
                ball.vy = Math.random()*-10-10;
                ball.lineWidth = 0;
            }
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            wind = (canvas.width*0.5 - mouse.x)*0.001;
            gravity = (canvas.height*0.5 - mouse.y)*0.001;
            balls.forEach(Learn.draw);
        },
        draw:function(ball){
            ball.vy+=gravity;
            ball.vx+=wind;
            ball.x += ball.vx;
            ball.y += ball.vy;
            if(ball.x - ball.radius>canvas.width||
                ball.x + ball.radius<0||
                ball.y - ball.radius > canvas.height||
                ball.y + ball.radius < 0){
                ball.x = canvas.width*0.5;
                ball.y = canvas.height;
                ball.vx = Math.random()*2-1;
                ball.vy = Math.random()*-10-10;
            }
            ball.draw(ctx);
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
