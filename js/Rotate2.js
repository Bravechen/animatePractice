/**
 * Created by gxchen on 2014/6/24.
 */
(function(window,undefined){
    var canvas,ctx,centerBall,balls,ballSum = 9,vr=0.02,cos,sin,centerX,centerY,mouse,
        radiusList = [3,4,6,5,20,40,10,6];

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);

            centerX = canvas.width*0.5;
            centerY = canvas.height*0.5;

            centerBall = new utils.Ball(30,"#ffff00");
            centerBall.x = centerX;
            centerBall.y = centerY;

            balls = [];

            var i=ballSum;
            while(i--){
                var ball = new utils.Ball(radiusList[i],utils.randomColor24());
                ball.vr = Math.random()*0.05;
                ball.cos = Math.cos(ball.vr); //vr决定旋转速度
                ball.sin = Math.sin(ball.vr);
                ball.x = centerX+ball.cos*(i*60+10);   //决定最初的半径和位置
                ball.y = centerY+ball.sin*(i*60+10);
                balls.push(ball);

            }

            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onFrameHandler:function(){

            ctx.clearRect(0,0,canvas.width,canvas.height);

            balls.forEach(Learn.move);
            balls.forEach(Learn.draw);

            centerBall.draw(ctx);

        },
        move:function(ball){
            var x1 = ball.x - centerX,
                y1 = ball.y - centerY,
                //+-决定旋转方向
                x2 = x1*ball.cos - y1*ball.sin,
                y2 = y1*ball.cos + x1*ball.sin;


            ball.x = centerX + x2;
            ball.y = centerY + y2;
        },
        draw:function(ball){
            ball.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
