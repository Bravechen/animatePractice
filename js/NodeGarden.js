/**
 * Created by gxchen on 2014/7/2.
 */
(function(window,undefined){
    var canvas,ctx,particles,minDist = 100,springAmount = 0.0001,sum=100;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            canvas.style.backgroundColor = "#000000";
            particles = [];
            for(var i=0;i<sum;i++){
                var ball = new utils.Ball(Math.random()*10+5,utils.randomColor24());
                ball.x = Math.random()*canvas.width;
                ball.y = Math.random()*canvas.height;
                ball.vx = Math.random()*10-5;
                ball.vy = Math.random()*10-5;
                ball.mass = ball.radius;
                ball.lineWidth = 0;
                particles.push(ball);
            }
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            particles.forEach(Learn.move);
            particles.forEach(Learn.draw);
        },

        spring:function(ballA,ballB){
            var dx = ballB.x - ballA.x,
                dy = ballB.y - ballA.y,
                dist = Math.sqrt(dx*dx+dy*dy);
            if(dist<minDist){
                ctx.save();
                ctx.strokeStyle = utils.colorToRGB(ballA.color,1-dist/minDist);
                ctx.beginPath();
                ctx.moveTo(ballA.x,ballA.y);
                ctx.lineTo(ballB.x,ballB.y);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();

                var ax = dx*springAmount,
                    ay = dy*springAmount;
                ballA.vx+=ax/ballA.mass;
                ballA.vy+=ay/ballA.mass;
                ballB.vx-=ax/ballB.mass;
                ballB.vy-=ay/ballB.mass;
            }
        },
        move:function(ballA,i){
            ballA.x+=ballA.vx;
            ballA.y+=ballA.vy;

            if(ballA.x>canvas.width){
                ballA.x = 0;
            }else if(ballA.x<0){
                ballA.x = canvas.width;
            }

            if(ballA.y>canvas.height){
                ballA.y = 0;
            }else if(ballA.y<0){
                ballA.y = canvas.height;
            }

            for(var j=i+1;j<sum;j++){
                var ballB = particles[j];
                Learn.spring(ballA,ballB);
            }

        },
        draw:function(ball){
            ball.draw(ctx);
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);