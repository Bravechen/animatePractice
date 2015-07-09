/**
 * Created by gxchen on 2014/7/1.
 */
(function(window,undefined){
    var canvas,ctx,bounce = -1,balls=[],ballSum=15;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            for(var i=0;i<ballSum;i++){
                var ball = new utils.Ball(Math.random()*30+10,utils.randomColor24());
                ball.x = Math.random()*canvas.width;
                ball.y = Math.random()*canvas.height;
                ball.vx = Math.random()*10-5;
                ball.vy = Math.random()*10-5;
                ball.mass = ball.radius;
                balls[i] = ball;
                ball.draw(ctx);
            }

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(var i=0;i<ballSum;i++){
                var ball = balls[i];
                ball.x+=ball.vx;
                ball.y+=ball.vy;
                Learn.checkWall(ball);
            }

            for(i=0;i<ballSum-1;i++){
                var ballA = balls[i];
                for(var j=i+ 1;j<ballSum;j++){
                    var ballB = balls[j];
                    Learn.checkCollision(ballA,ballB);
                }
            }

            balls.forEach(Learn.draw);
        },
        checkCollision:function(ballA,ballB){
            var dx = ballB.x - ballA.x,
                dy = ballB.y - ballA.y,
                dis = Math.sqrt(dx*dx+dy*dy);
            if(dis<ballA.radius+ballB.radius){
                var angle = Math.atan2(dy,dx),
                    sin = Math.sin(angle),
                    cos = Math.cos(angle),
                    p0 = new utils.Point(0,0),
                    p1 = Learn.rotate(dx,dy,sin,cos,true),
                    v0 = Learn.rotate(ballA.vx,ballA.vy,sin,cos,true),
                    v1 = Learn.rotate(ballB.vx,ballB.vy,sin,cos,true);

                var vTotal = v0.x - v1.x;
                v0.x = ((ballA.mass - ballB.mass)*v0.x + 2*ballB.mass*v1.x) / (ballA.mass + ballB.mass);
                v1.x = vTotal + v0.x;

                var absV = Math.abs(v0.x)+Math.abs(v1.x),
                    overlap = (ballA.radius + ballB.radius) - Math.abs(p0.x - p1.x);
                p0.x+=v0.x/absV*overlap;
                p1.x+=v1.x/absV*overlap;

                var p0F = Learn.rotate(p0.x,p0.y,sin,cos,false),
                    p1F = Learn.rotate(p1.x,p1.y,sin,cos,false),
                    v0F = Learn.rotate(v0.x,v0.y,sin,cos,false),
                    v1F = Learn.rotate(v1.x,v1.y,sin,cos,false);
                ballA.x = ballA.x + p0F.x;
                ballA.y = ballA.y + p0F.y;
                ballB.x = ballA.x + p1F.x;
                ballB.y = ballA.y + p1F.y;

                ballA.vx = v0F.x;
                ballA.vy = v0F.y;
                ballB.vx = v1F.x;
                ballB.vy = v1F.y;

            }

        },
        rotate:function(x,y,sin,cos,reverse){
            var p = new utils.Point();
            if(reverse){
                p.x = x*cos + y*sin;
                p.y = y*cos - x*sin;
            }else{
                p.x = x*cos - y*sin;
                p.y = y*cos + x*sin;
            }
            return p;
        },
        checkWall:function(ball){
            if(ball.x+ball.radius>canvas.width){
                ball.x = canvas.width - ball.radius;
                ball.vx *= bounce;
            }else if(ball.x - ball.radius<0){
                ball.x = ball.radius;
                ball.vx *= bounce;
            }

            if(ball.y+ball.radius>canvas.height){
                ball.y = canvas.height - ball.radius;
                ball.vy *= bounce;
            }else if(ball.y - ball.radius<0){
                ball.y = ball.radius;
                ball.vy *= bounce;
            }
        },
        draw:function(ball){
            ball.draw(ctx);
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
