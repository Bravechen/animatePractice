/**
 * Created by gxchen on 2014/6/18.
 */
(function(window,undefined){
    var canvas,ctx,mouse,centerBall,balls=[],ballSum= 20,spring=0.02,friction=0.9,springLength=200,gravity= 0.002,bounce=-0.2;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            centerBall = new utils.Ball(30,utils.randomColor24());
            centerBall.x = canvas.width*0.5;
            centerBall.y = canvas.height*0.5;
            centerBall.vx = Math.random()*2;
            centerBall.vy = Math.random()*2;
            //centerBall.draw(ctx);
            var i = ballSum,angleInter = Math.PI*2/ballSum,angle=0;
            while(i--){
                angle+=angleInter;
                var ball = new utils.Ball(10,utils.randomColor24());
                balls.push(ball);
                ball.x = centerBall.x+Math.cos(angle)*springLength;
                ball.y = centerBall.y+Math.sin(angle)*springLength;
                //ball.draw(ctx);
            }

            canvas.addEventListener(utils.MouseEvent.MOUSE_DOWN,Learn.onMouseDownHandler,false);
            canvas.addEventListener(utils.MouseEvent.MOUSE_UP,Learn.onMouseUpHandler,false);


            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onMouseDownHandler:function(e){
            if(utils.containsPoint(centerBall.getBounds(),new utils.Point(mouse.x,mouse.y))){
                centerBall.dragging = true;
                canvas.addEventListener(utils.MouseEvent.MOUSE_MOVE,Learn.onMouseMoveHandler,false);
            }
        },
        onMouseUpHandler:function(e){
            if(centerBall.dragging){
                centerBall.dragging = false;
                canvas.removeEventListener(utils.MouseEvent.MOUSE_MOVE,Learn.onMouseMoveHandler,false);
            }
        },
        onMouseMoveHandler:function(e){
            if(centerBall.dragging){
                centerBall.x = mouse.x;
                centerBall.y = mouse.y;
            }

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            var i=ballSum;
            while(i--){
                Learn.springTo(balls[i],centerBall);

            }

            for(i=0;i<ballSum;i++){
                var ballA = balls[i];
                for(var j=0;j<ballSum;j++){
                    if(j!==i){
                        var ballB = balls[j];
                        Learn.springTo(ballA,ballB);

                    }
                }

                //ballA.vy+=gravity;
                //ballA.x+=ballA.vx;
                //ballA.y+=ballA.vy;

                if(ballA.x+ballA.radius>canvas.width){
                    ballA.x = canvas.width - ballA.radius;
                    ballA.vx*=bounce;
                }else if(ballA.x - ballA.radius<0){
                    ballA.x = ballA.radius;
                    ballA.vx*=bounce;
                }

                if(ballA.y+ballA.radius>canvas.height){
                    ballA.y = canvas.height - ballA.radius;
                    ballA.vy*=bounce;
                }else if(ballA.y - ballA.radius<0){
                    ballA.y = ballA.radius;
                    ballA.vy*=bounce;
                }

                ballA.draw(ctx);
            }

            if(!centerBall.dragging){
                centerBall.vy+=gravity;
                centerBall.x+=centerBall.vx;
                centerBall.y+=centerBall.vy;

                if(centerBall.x+centerBall.radius>canvas.width){
                    centerBall.x = canvas.width - centerBall.radius;
                    centerBall.vx*=bounce;
                }else if(centerBall.x - centerBall.radius<0){
                    centerBall.x = centerBall.radius;
                    centerBall.vx*=bounce;
                }

                if(centerBall.y+centerBall.radius>canvas.height){
                    centerBall.y = canvas.height - centerBall.radius;
                    centerBall.vy*=bounce;
                }else if(centerBall.y - centerBall.radius<0){
                    centerBall.y = centerBall.radius;
                    centerBall.vy*=bounce;
                }
            }


            centerBall.draw(ctx);

        },
        springTo:function(ballA,ballB){
            var dx = ballB.x - ballA.x,
                dy = ballB.y - ballA.y,
                angle = Math.atan2(dy,dx),
                targetX = ballB.x - Math.cos(angle)*springLength,
                targetY = ballB.y - Math.sin(angle)*springLength;
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
