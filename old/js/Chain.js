/**
 * Created by gxchen on 2014/6/16.
 */
(function(window,undefined){
    var canvas,ctx,balls=[],ballSum= 10,mouse,spring=0.05,friction=0.8,gravity=2;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            var i = ballSum;
            while(i--){
                var ball = new utils.Ball((Math.random()*20+10)>>0,utils.randomColor24());
                balls.push(ball);
            }

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.beginPath();
            balls.forEach(draw);

            function draw(ballA,i){
                if(i===0){
                    Learn.moveBall(ballA,mouse.x,mouse.y);
                    ctx.moveTo(mouse.x,mouse.y);
                }else{
                    var ballB = balls[i-1];
                    Learn.moveBall(ballA,ballB.x,ballB.y);
                    ctx.moveTo(ballB.x,ballB.y);
                }
                ctx.lineTo(ballA.x,ballA.y);
                ctx.stroke();
                ballA.draw(ctx);
            }

        },
        moveBall:function(ball,targetX,targetY){
            ball.vx += (targetX - ball.x)*spring;
            ball.vy += (targetY - ball.y)*spring;
            ball.vx += gravity;
            ball.vx *= friction;
            ball.vy *= friction;
            ball.x += ball.vx;
            ball.y += ball.vy;
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
