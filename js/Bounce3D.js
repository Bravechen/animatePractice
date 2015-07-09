/**
 * Created by gxchen on 2014/7/16.
 */
(function(window,undefined){
    var canvas,ctx,balls,sum=100,fl=300,bounce=-0.6,
        top=-200,bottom=200,left=-200,right=200,front=-200,back=200,
        vpx,vpy,gravity=0.2,floor=200;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            balls = [];
            while(sum--){
                var ball = new utils.Ball(3,utils.randomColor24());
                balls.push(ball);
                ball.vx = Math.random()*10-5;
                ball.vy = Math.random()*10-5;
                ball.vz = Math.random()*10-5;
            }
            sum = balls.length;

            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;

            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function move(ball){
        ball.vy += gravity;
        ball.posX += ball.vx;
        ball.posY += ball.vy;
        ball.posZ += ball.vz;

        if(ball.posY>floor){
            ball.posY = floor;
            ball.vy *= bounce;
        }

        checkWalls(ball);

        if(ball.posZ>-fl){
            var scale = fl/(fl+ball.posZ);
            ball.scaleX = ball.scaleY = scale;
            ball.x = vpx+ball.posX*scale;
            ball.y = vpy+ball.posY*scale;
            ball.visible = true;
        }else{
            ball.visible = false;
        }
    }

    function draw(ball){
       if(ball.visible){
           ball.draw(ctx);
       }
    }

    function zSort(a,b){
        return (b.posZ - a.posZ);
    }

    function checkWalls(ball)
    {
        if(ball.posX+ball.radius>right){
            ball.posX = right - ball.radius;
            ball.vx*=bounce;
        }else if(ball.posX - ball.radius<left){
            ball.posX = left + ball.radius;
            ball.vx*=bounce;
        }

        if(ball.posY+ball.radius>bottom){
            ball.posY = bottom - ball.radius;
            ball.vy*=bounce;
        }else if(ball.posY - ball.radius<top){
            ball.posY = top+ball.radius;
            ball.vy*=bounce;
        }

        if(ball.posZ+ball.radius>back){
            ball.posZ = back - ball.radius;
            ball.vz*=bounce;
        }else if(ball.posZ - ball.radius<front){
            ball.posZ = front+ball.radius;
            ball.vz*=bounce;
        }
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        balls.forEach(move);
        balls.sort(zSort);
        balls.forEach(draw);
    }


})(window);
