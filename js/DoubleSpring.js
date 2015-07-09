/**
 * Created by gxchen on 2014/6/17.
 */

(function(window,undefined){
    var canvas,ctx,mouse,balls,ballSum = 100,spring = 0.009,friction = 0.5,springLength = 200;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);

            balls = [];
            var i = ballSum;
            while(i--){
                var ball = new utils.Ball(Math.random()*15+5,utils.randomColor24());
                ball.x = Math.random()*canvas.width;
                ball.y = Math.random()*canvas.height;
                balls.push(ball);
                ball.lineWidth = 0;
                //ball.draw(ctx);
            }

            canvas.addEventListener(utils.MouseEvent.MOUSE_DOWN,Learn.onMouseDownHandler,false);
            canvas.addEventListener(utils.MouseEvent.MOUSE_UP,Learn.onMouseUpHandler,false);
            canvas.addEventListener(utils.MouseEvent.MOUSE_MOVE,Learn.onMouseMoveHandler,false);

            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onMouseDownHandler:function(e){
            for(var i=0;i<ballSum;i++){
                if(utils.containsPoint(balls[i].getBounds(),new utils.Point(mouse.x,mouse.y))){
                    balls[i].dragging = true;
                    break;
                }
            }
        },
        onMouseUpHandler:function(e){
            balls.forEach(function(ball){
                ball.dragging = false;
            });
        },
        onMouseMoveHandler:function(e){
            balls.forEach(function(ball){
                if(ball.dragging){
                    ball.x = mouse.x;
                    ball.y = mouse.y;
                }
            });
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            //Learn.springTo(balls[0],balls[1]);
            //Learn.springTo(balls[1],balls[0]);



            balls.forEach(function(ball,i){
                var ballB;
                for(var j=0;j<ballSum;j++){
                   if(j!==i){
                       ballB = balls[j];
                       Learn.springTo(ball,ballB);
                   }
                }

                /*for(j=i+1;j<ballSum;j++){

                    ballB = balls[j];
                    ctx.save();
                    ctx.strokeStyle = "#eeeeee";
                    ctx.beginPath();
                    ctx.moveTo(ball.x,ball.y);
                    ctx.lineTo(ballB.x,ballB.y);
                    ctx.stroke();
                    ctx.restore();
                } */
               ball.draw(ctx);
            });

            balls.forEach(function(ball,i){


            });



            //balls[0].draw(ctx);
            //balls[1].draw(ctx);

        },
        springTo:function(ballA,ballB){
            var dx = ballB.x - ballA.x,
                dy = ballB.y - ballA.y,
                angle = Math.atan2(dy,dx),
                targetX = ballB.x-Math.cos(angle)*springLength,
                targetY = ballB.y-Math.sin(angle)*springLength;
            ballA.ax = (targetX - ballA.x)*spring;
            ballA.ay = (targetY - ballA.y)*spring;
            ballA.vx+=ballA.ax;
            ballA.vy+=ballA.ay;
            ballA.vx*=friction;
            ballA.vy*=friction;
            ballA.x+=ballA.vx;
            ballA.y+=ballA.vy;
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
