/**
 * Created by gxchen on 2014/7/2.
 */
(function(window,undefined){

    var canvas,ctx,particles,sum=30;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            particles = [];
            var i = sum;
            while(i--){
                var ball = new utils.Ball(Math.floor(Math.random()*20+5),utils.randomColor24());
                ball.x = canvas.width*Math.random();
                ball.y = Math.random()*canvas.height;
                ball.mass = ball.radius;
                //ball.vx = Math.random()*10-5;
                //ball.vy = Math.random()*10-5;
                //ball.lineWidth = 0;
                particles.push(ball);
                ball.draw(ctx);
            }
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            particles.forEach(Learn.move);
            particles.forEach(Learn.checkWalls);
            particles.forEach(Learn.draw);

        },
        draw:function(ball){
            ball.draw(ctx);
        },
        move:function(ballA,i){
            ballA.x+=ballA.vx;
            ballA.y+=ballA.vy;
            for(var j=i+1;j<sum;j++){
                var ballB = particles[j];
                //Learn.checkCollision(ballA,ballB);
                Learn.gravitate(ballA,ballB);
            }
        },
        gravitate:function(ballA,ballB){
            var dx = ballB.x - ballA.x,
                dy = ballB.y - ballA.y,
                disQ = dx*dx + dy*dy,
                dis = Math.sqrt(disQ),
                force = ballA.mass*ballB.mass/disQ,
                ax = force*dx/dis,
                ay = force*dy/dis;
            ballA.vx += ax/ballA.mass;
            ballA.vy += ay/ballA.mass;
            ballB.vx -= ax/ballB.mass;
            ballB.vy -= ay/ballB.mass;
        },
        checkCollision:function(ballA,ballB){
            var dx = ballB.x - ballA.x,
                dy = ballB.y - ballA.y,
                dis = Math.sqrt(dx*dx+dy*dy);
            if(dis<ballA.radius+ballB.radius){
                //console.log(dx,dy,ballA.vx,ballA.vy,ballB.vx,ballB.vy);

                var angle = Math.atan2(dy,dx),
                sin = Math.sin(angle),
                cos = Math.cos(angle),
                p0 = new utils.Point(0,0),
                p1 = Learn.rotate(dx,dy,sin,cos,true),
                v0 = Learn.rotate(ballA.vx,ballA.vy,sin,cos,true),
                v1 = Learn.rotate(ballB.vx,ballB.vy,sin,cos,true);

                var vTotal = v0.x - v1.x;
                v0.x = ((ballA.mass - ballB.mass)*v0.x+2*ballB.mass*v1.x) / (ballA.mass + ballB.mass);
                v1.x = vTotal+v0.x;

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
       //     console.log(x,y,sin,cos,reverse);
            if(reverse){
                p.x = x*cos + y*sin;
                p.y = y*cos - x*sin;
            }else{
                p.x = x*cos - y*sin;
                p.y = y*cos + x*sin;
            }
            return p;
        },
        checkWalls:function(ball){
            if(ball.x + ball.radius>canvas.width){
                ball.x = canvas.width - ball.radius;
                ball.vx*=-1;
            }else if(ball.x-ball.radius<0){
                ball.x = ball.radius;
                ball.vx*=-1
            }

            if(ball.y+ball.radius>canvas.height){
                ball.y = canvas.height - ball.radius;
                ball.vy*=-0.2;
            }else if(ball.y - ball.radius<0){
                ball.y = ball.radius;
                ball.vy*=-0.2;
            }
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
