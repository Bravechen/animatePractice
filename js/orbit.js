/**
 * Created by gxchen on 2014/7/2.
 */
(function(window,undefined){
    var canvas,ctx,particles,sum= 2,sun;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            particles = [];
            sun = new utils.Ball(50,"#ffff00");
            sun.x = canvas.width*0.5;
            sun.y = canvas.height*0.5;
            sun.mass = 20000;
            particles.push(sun);

            for(var i=1;i<sum;i++)
            {
                var planet = new utils.Ball((Math.random()*10+5)>>0,utils.randomColor24());
                planet.x = canvas.width*0.5+200+i*10;
                planet.y = canvas.height*0.5;
                planet.vy = 10;
                planet.mass = planet.radius;
                particles.push(planet);
            }
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            sun.x = canvas.width*0.5;
            sun.y = canvas.height*0.5;
            particles.forEach(Learn.move);
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
                force = (ballA.mass*ballB.mass)/disQ,
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
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
