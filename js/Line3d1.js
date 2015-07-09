/**
 * Created by gxchen on 2014/7/21.
 */
(function(window,undefined){
    var canvas,ctx,balls,sum=15,fl=250,vpx,vpy,angleX,angleY,mouse;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            balls = [];
            var ball;
            while(sum--){
                ball = new utils.Ball(5,utils.randomColor24());
                balls.push(ball);
                ball.posX = Math.random()*200-100;
                ball.posY = Math.random()*200-100;
                ball.posZ = Math.random()*200-100;
                ball.draw(ctx);
            }
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;

            mouse = utils.captureMouse(canvas,false);

            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function rotateX(ball,angle){
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            y1 = ball.posY*cos - ball.posZ*sin,
            z1 = ball.posZ*cos + ball.posY*sin;
        ball.posY = y1;
        ball.posZ = z1;
    }

    function rotateY(ball,angle){
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            x1 = ball.posX*cos - ball.posZ*sin,
            z1 = ball.posZ*cos + ball.posX*sin;
        ball.posX = x1;
        ball.posZ = z1;
    }

    function rotateZ(ball,angle){
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            x1 = ball.posX*cos - ball.posY*sin,
            y1 = ball.posY*cos + ball.posX*sin;
        ball.posX = x1;
        ball.posY = y1;
    }

    function move(ball,i){
        rotateX(ball,angleX);
        rotateY(ball,angleY);
        position(ball);
        if(i!==0){
            ctx.lineTo(balls[i].x,balls[i].y);
        }
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

    function draw(ball){
        if(ball.visible){
            ball.draw(ctx);
        }
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        angleX = (mouse.x - vpx)*0.0001;
        angleY = (mouse.y - vpy)*0.0001;

        ctx.beginPath();
        ctx.moveTo(balls[0].x,balls[0].y);
        balls.forEach(move);
        ctx.stroke();
        balls.forEach(draw);
    }

})(window);
