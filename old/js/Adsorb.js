/**
 * Created by gxchen on 2014/6/16.
 */
(function(window,undefined){
    var canvas,ctx,balls=[],ballSum= 20,disOffset=50,mouse,friction=0.9,spring=0.2,contralX,contralY;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            var i = ballSum;
            while(i--){
                var ball = new utils.Ball((Math.random()*15+10)>>0,utils.randomColor24());
                balls.push(ball);
                ball.x = (canvas.width-200)*Math.random()+50;
                ball.y = (canvas.height-200)*Math.random()+50;
                ball.oldX = ball.x;
                ball.oldY = ball.y;
                ball.lineWidth = 0;
            }
            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var tx = mouse.x,
                ty = mouse.y;

            for(var i=0;i<ballSum;i++){
                var ball = balls[i];
                var dx = tx - ball.oldX,
                    dy = ty - ball.oldY;
                var dis = Math.sqrt(dx*dx+dy*dy);
                if(dis<disOffset){
                    ball.ax = (tx - ball.x)*spring;
                    ball.ay = (ty - ball.y)*spring;
                }else{
                    ball.ax = (ball.oldX - ball.x)*spring;
                    ball.ay = (ball.oldY - ball.y)*spring;
                }
                ball.vx+=ball.ax;
                ball.vy+=ball.ay;
                ball.vx*=friction;
                ball.vy*=friction;
                ball.x+=ball.vx;
                ball.y+=ball.vy;

                ctx.save();
                ctx.strokeStyle = ball.color;
                ctx.beginPath();
                ctx.moveTo(canvas.width*0.5,canvas.height);
                ctx.quadraticCurveTo(canvas.width*0.5,canvas.height*0.5,ball.x,ball.y);
                ctx.stroke();
                ctx.restore();

                ball.draw(ctx);
            }
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;
})(window);
