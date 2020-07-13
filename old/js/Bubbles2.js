/**
 * Created by gxchen on 2014/6/23.
 */
(function(window,undefined){
    var canvas,ctx,balls,ballSum= 6,spring = 0.03,bounce=-0.5,gravity=0.1;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            balls = [];
            var i=ballSum;
            while(i--){
                var ball = new utils.Ball(Math.random()*20+10,utils.randomColor24());
                ball.x = Math.random()*canvas.width;
                ball.y = Math.random()*canvas.height;
                ball.vx = Math.random()*6-3;
                ball.vy = Math.random()*6-3;
                balls.push(ball);
            }

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            balls.forEach(Learn.checkCollision);
            balls.forEach(Learn.move);
            balls.forEach(Learn.draw);
        },
        checkCollision:function(ballA,i){
            var ballB,dx,dy,dis,minDis,j;
            for(j=i+ 1;j<ballSum;j++){
                ballB = balls[j];
                //console.log(ballB);
                dx = ballB.x - ballA.x;
                dy = ballB.y - ballA.y;
                dis = Math.sqrt(dx*dx+dy*dy);
                minDis = ballA.radius+ballB.radius;

                if(dis<minDis){
                    var angle = Math.atan2(dy,dx),
                        tx = ballA.x + Math.cos(angle)*minDis,
                        ty = ballA.y + Math.sin(angle)*minDis,
                        ax = (tx - ballB.x)*spring*0.5,
                        ay = (ty - ballB.y)*spring*0.5;

                    ballA.vx -= ay;
                    ballA.vy -= ay;
                    ballB.vx += ax;
                    ballB.vy += ay;
                }
            }
        },
        move:function(ball){
            ball.vy+=gravity;
            ball.x+=ball.vx;
            ball.y+=ball.vy;
            if(ball.x+ball.radius>canvas.width){
                ball.x = canvas.width - ball.radius;
                ball.vx*=bounce;
            }else if(ball.x - ball.radius<0){
                ball.x = ball.radius;
                ball.vx*=bounce;
            }

            if(ball.y+ball.radius>canvas.height){
                ball.y = canvas.height - ball.radius;
                ball.vy*=bounce;
            }else if(ball.y - ball.radius<0){
                ball.y = ball.radius;
                ball.vy*=bounce;
            }
        },
        draw:function(ball){
            ball.draw(ctx);
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
