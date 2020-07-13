/**
 * Created by gxchen on 2014/7/18.
 */
(function(window,undefined){
    var canvas,ctx,balls,sum=100,fl=250,vpx,vpy,
        top = -200,bottom=200,left=-200,right=200,front=-200,back=200,bounce=-1;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;

            balls = [];
            var ball;
            while(sum--){
                ball = new utils.Ball(5,utils.randomColor24());
                ball.posX = Math.random()*400 - 200;
                ball.posY = Math.random()*400 - 200;
                ball.posZ = Math.random()*400 - 200;
                ball.vx = Math.random()*5-1;
                ball.vy = Math.random()*5-1;
                ball.vz = Math.random()*5-1;
                balls.push(ball);
            }
            sum = balls.length;

            utils.addFrameListener(onFrameHandler,canvas);

        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function checkCollision(ballA,i){
        var ballB,dx,dy,dz,dis;
        for(var j=i+ 1;j<sum;j++){
            ballB = balls[j];
            dx = ballA.posX - ballB.posX;
            dy = ballA.posY - ballB.posY;
            dz = ballA.posZ - ballB.posZ;
            dis = Math.sqrt(dx*dx+dy*dy+dz*dz);

            if(dis<ballA.radius+ballB.radius){
                ballA.color = "#00ffff";
                ballB.color = "#00ffff";
            }
        }
    }

    function move(ball){
        ball.posX+=ball.vx;
        ball.posY+=ball.vy;
        ball.posZ+=ball.vz;

        if(ball.posX - ball.radius<left){
            ball.posX = left+ball.radius;
            ball.vx*=bounce;
        }else if(ball.posX + ball.radius>right){
            ball.posX = right - ball.radius;
            ball.vx*=bounce;
        }

        if(ball.posY - ball.radius<top){
            ball.posY = top+ball.radius;
            ball.vy*=bounce;
        }else if(ball.posY + ball.radius>bottom){
            ball.posY = bottom - ball.radius;
            ball.vy*=bounce;
        }

        if(ball.posZ - ball.radius<front){
            ball.posZ = front + ball.radius;
            ball.vz*=bounce;
        }else if(ball.posZ+ball.radius>back){
            ball.posZ = back - ball.radius;
            ball.vz*=bounce;
        }

        position(ball);
    }

    function position(ball){
        if(ball.posZ>-fl){
            var scale = fl/(fl+ball.posZ);
            ball.scaleX = ball.scaleY = scale;
            ball.x = vpx + ball.posX*scale;
            ball.y = vpy + ball.posY*scale;
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
        balls.forEach(checkCollision);
        balls.sort(zSort);
        balls.forEach(draw);
    }


})(window);
