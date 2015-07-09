/**
 * Created by gxchen on 2014/6/12.
 */
(function(window,undefined){
    var canvas,ctx,ball,bounce = 0.8,left= 0,top= 0,right= 0,bottom=0;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            left = 0;
            right = canvas.width;
            top = 0;
            bottom = canvas.height;

            ball = new utils.Ball();
            ball.vx = Math.random()*10-3;
            ball.vy = Math.random()*10-3;
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;

            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ball.x+=ball.vx;
            ball.y+=ball.vy;
            if(ball.x+ball.radius>right){
                ball.x = right - ball.radius;
                ball.vx *= -bounce;
            }else if(ball.x-ball.radius<left){
                ball.x = left+ball.radius;
                ball.vx *= -bounce;
            }
            if(ball.y+ball.radius>bottom){
                ball.y = bottom - ball.radius;
                ball.vy *= -bounce;
            }else if(ball.y - ball.radius<top){
                ball.y = top+ball.radius;
                ball.vy *= -bounce;
            }
            ball.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
