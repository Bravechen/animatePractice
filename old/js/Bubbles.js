/**
 * Created by gxchen on 2014/6/23.
 */
(function(window,undefined){
    var canvas,ctx,centerBall,balls,ballSum=20,spring=0.03,bounce=-1;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            centerBall = new utils.Ball(100,utils.randomColor24());
            centerBall.x = canvas.width*0.5;
            centerBall.y = canvas.height*0.5;

            balls = [];
            for(var i= 0,ball;i<ballSum;i++){
                ball = new utils.Ball(Math.random()*40+5,utils.randomColor24());
                ball.x = Math.random()*canvas.width*0.5;
                ball.y = Math.random()*canvas.height*0.5;
                ball.vx = Math.random()*6-3;
                ball.vy = Math.random()*6-3;
                balls.push(ball);
            }

            utils.addFrameListener(Learn.onFrameHandler,canvas);


        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            balls.forEach(Learn.move);
            balls.forEach(Learn.draw);
            centerBall.draw(ctx);

        },
        move:function(ball){
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
            var dx = ball.x - centerBall.x,
                dy = ball.y - centerBall.y,
                dis = Math.sqrt(dx*dx+dy*dy),
                minDis = ball.radius+centerBall.radius;
            if(dis<minDis){
                var angle = Math.atan2(dy,dx),
                    tx = centerBall.x+Math.cos(angle)*minDis,
                    ty = centerBall.y+Math.sin(angle)*minDis;
                ball.ax = (tx-ball.x)*spring;
                ball.ay = (ty - ball.y)*spring;
                ball.vx+=ball.ax;
                ball.vy+=ball.ay;
            }
            ball.draw(ctx);

        }



    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
