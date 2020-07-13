/**
 * Created by gxchen on 2014/6/30.
 */
(function(window,undefined){
    var canvas,ctx,ball0,ball1,bounce=-1,p0,p1,p0F,p1F;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            ball0 = new utils.Ball(80,utils.randomColor24());
            ball0.mass = 2;
            ball0.x = canvas.width - 200;
            ball0.y = canvas.height - 200;
            ball0.vx = Math.random()*10-5;
            ball0.vy = Math.random()*10-5;
            ball0.lineWidth = 0;

            ball1 = new utils.Ball(40,utils.randomColor24());
            ball1.mass = 1;
            ball1.x = 100;
            ball1.y = 100;
            ball1.vx = Math.random()*10-5;
            ball1.vy = Math.random()*10-5;
            ball1.lineWidth = 0;

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        rotate:function(x,y,sin,cos,reverse){
            return {
                x:(reverse)?x*cos + y*sin : x*cos - y*sin,
                y:(reverse)?y*cos - x*sin : y*cos + x*sin
            };
        },
        checkCollision:function(ballA,ballB){
            var dx = ballB.x - ballA.x,
                dy = ballB.y - ballA.y,
                dis = Math.sqrt(dx*dx+dy*dy);
            if(dis<ballA.radius+ballB.radius){
                var angle = Math.atan2(dy,dx),
                    cos = Math.cos(angle),
                    sin = Math.sin(angle);
                //ball0 position
                p0 = {x:0,y:0};
                //ball1 position
                p1 = Learn.rotate(dx,dy,sin,cos,true);

                var v0 = Learn.rotate(ballA.vx,ballA.vy,sin,cos,true),
                    v1 = Learn.rotate(ballB.vx,ballB.vy,sin,cos,true),
                    vTotal = v0.x - v1.x;
                v0.x = ((ballA.mass - ballB.mass)*v0.x + 2*ballB.mass*v1.x) / (ballA.mass + ballB.mass);
                v1.x = vTotal+v0.x;

                p0.x+=v0.x;
                p1.x+=v1.x;

                p0F = Learn.rotate(p0.x,p0.y,sin,cos,false);
                p1F = Learn.rotate(p1.x,p1.y,sin,cos,false);
                //rotate back
                ballB.x = ballA.x + p1F.x;
                ballB.y = ballA.y + p1F.y;
                ballA.x = ballA.x + p0F.x;
                ballA.y = ballA.y + p0F.y;
                //rotate v
                var v0F = Learn.rotate(v0.x,v0.y,sin,cos,false),
                    v1F = Learn.rotate(v1.x,v1.y,sin,cos,false);
                ballA.vx = v0F.x;
                ballA.vy = v0F.y;
                ballB.vx = v1F.x;
                ballB.vy = v1F.y;
            }
        },
        checkWalls:function(ball){

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
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            ball0.x+=ball0.vx;
            ball0.y+=ball0.vy;
            ball1.x+=ball1.vx;
            ball1.y+=ball1.vy;

            Learn.checkCollision(ball0,ball1);

            Learn.checkWalls(ball0);
            Learn.checkWalls(ball1);

            ball0.draw(ctx);
            ball1.draw(ctx);

        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
