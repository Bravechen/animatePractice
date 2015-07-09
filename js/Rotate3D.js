/**
 * Created by gxchen on 2014/7/17.
 */
(function(window,undefined){
    var canvas,ctx,balls,sum= 50,fl=250,angleY,angleX,angleZ,vpx,vpy,mouse,rotateEasing=0.001;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            balls = [];
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            mouse = utils.captureMouse(canvas,false);
            var ball;
            while(sum--){
                ball = new utils.Ball(Math.random()*10+5,utils.randomColor24());
                var angle = Math.random()*Math.PI*2;
                ball.tr = Math.random()*300-150;
                ball.tx = Math.cos(angle)*(ball.tr+Math.random()*20);
                ball.ty = Math.sin(angle)*(ball.tr+Math.random()*20);
               // ball.posX = Math.random()*300 - 150;
               // ball.posY = Math.random()*200 - 100;
                ball.posZ = Math.random()*300 - 150;

                ball.x = vpx;
                ball.y = vpy;
                balls.push(ball);

                /*ball.rotationX = (ball.posX - vpx)*rotateEasing/ball.radius;
                ball.rotationY = (ball.posY - vpy)*rotateEasing/ball.radius;
                ball.rotationZ = ball.posZ*rotateEasing/ball.radius;*/
            }
            sum = balls.length;
           /* angleY = vpx*0.00008;
            angleX = vpy*0.00008;
            angleZ = 0.02; */

            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function draw(ball){
        if(ball.visible){
            ball.draw(ctx);
        }
    }

    function zSort(a,b){
        return (b.posZ - a.posZ);
    }

    function move(ball){
        if(ball.canRotate){
            setRotation(ball);
            rotateY(ball,ball.rotationY);
            rotateX(ball,ball.rotationX);
            rotateZ(ball,ball.rotationZ);
        }else{
            var dx = ball.tx - ball.posX,
                dy = ball.ty - ball.posY,
                dis = Math.sqrt(dx*dx+dy*dy);
            if(dis<1){

                ball.canRotate = true;
                ball.posX = ball.tx;
                ball.posY = ball.ty;

            }else{
                ball.posX += dx*0.2;
                ball.posY += dy*0.2;
            }
        }
        position(ball);
    }

    function rotateY(ball,angle){
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            x1 = cos*ball.posX - sin*ball.posZ,
            z1 = cos*ball.posZ + sin*ball.posX;
        ball.posX = x1;
        ball.posZ = z1;
    }

    function rotateX(ball,angle){
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            y1 = cos*ball.posY - sin*ball.posZ,
            z1 = cos*ball.posZ + sin*ball.posY;
        ball.posY = y1;
        ball.posZ = z1;
    }

    function rotateZ(ball,angle){
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            x1 = cos*ball.posX - sin*ball.posY,
            y1 = cos*ball.posY + sin*ball.posX;
        ball.posX = x1;
        ball.posY = y1;
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

    function setRotation(ball){
        ball.rotationX = (mouse.x - vpx)*rotateEasing/ball.radius;
        ball.rotationY = (mouse.y - vpy)*rotateEasing/ball.radius;
        //ball.rotationX = vpx*rotateEasing/ball.radius;
        //ball.rotationY = vpy*rotateEasing/ball.radius;
        ball.rotationZ = ball.posZ*rotateEasing/ball.radius;
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        balls.forEach(move);
        balls.sort(zSort);
        balls.forEach(draw);
    }

})(window);
