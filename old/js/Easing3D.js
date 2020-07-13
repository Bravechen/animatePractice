/**
 * Created by gxchen on 2014/7/17.
 */
(function(window,undefined){
    var canvas,ctx,balls,sum=10,fl=250,vpx,vpy,easing=0.1;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;

            balls = [];
            var ball;
            while(sum--){
                ball = new utils.Ball(20,utils.randomColor24());
                ball.x = vpx;
                ball.y = vpy;
                randomTarget(ball);
                balls.push(ball);
            }
            sum = balls.length;

            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function randomTarget(ball){
        ball.tx = Math.random()*canvas.width-canvas.width*0.5;
        ball.ty = Math.random()*canvas.height-canvas.height*0.5;
        ball.tz = Math.random()*canvas.width*0.5;
    }

    function move(ball){
        var dx = ball.tx - ball.posX,
            dy = ball.ty - ball.posY,
            dz = ball.tz - ball.posZ,
            dis = Math.sqrt(dx*dx+dy*dy+dz*dz);

        ball.posX += dx*easing;
        ball.posY += dy*easing;
        ball.posZ += dz*easing;

        if(dis<1){
            randomTarget(ball);
        }

        if(ball.posZ>-fl){
            var scale = fl/(fl+ball.posZ);
            ball.x = vpx+ball.posX*scale;
            ball.y = vpy+ball.posY*scale;
            ball.scaleX = ball.scaleY = scale;
            ball.visible = true;
        }else{
            ball.visible = false;
        }
    }

    function zSort(a,b){
        return (b.posZ - a.posZ);
    }

    function draw(ball){
        if(ball.visible){
            ball.draw(ctx);
        }
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        balls.forEach(move);
        balls.sort(zSort);
        balls.forEach(draw);
    }

})(window);
