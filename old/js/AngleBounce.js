/**
 * Created by gxchen on 2014/6/25.
 */
(function(window,undefined){
    var canvas,ctx,ball,lines,gravity = 0.2,bounce = -0.6,mouse;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            grid.initialize();

            mouse = utils.captureMouse(canvas,false);

            ball = new utils.Ball(20,utils.randomColor24());
            ball.x = 100;
            ball.y = 50;

            lines = [];

            lines[0] = new utils.Line(-50,0,50,0);
            lines[0].x = 100;
            lines[0].y = 100;
            lines[0].rotation = 30*Math.PI/180;

            lines[1] = new utils.Line(-50,0,50,0);
            lines[1].x = 100;
            lines[1].y = 200;
            lines[1].rotation = 45*Math.PI/180;

            lines[2] = new utils.Line(-50,0,50,0);
            lines[2].x = 220;
            lines[2].y = 150;
            lines[2].rotation = -20*Math.PI/180;

            lines[3] = new utils.Line(-50,0,50,0);
            lines[3].x = 150;
            lines[3].y = 330;
            lines[3].rotation = 10*Math.PI/180;

            lines[4] = new utils.Line(-50,0,50,0);
            lines[4].x = 230;
            lines[4].y = 250;
            lines[4].rotation = -30*Math.PI/180;

            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        checkLine:function(line){
            var bounds = line.getBounds();
            if(ball.x+ball.radius>bounds.x&&ball.x - ball.radius < bounds.x+bounds.width){
                ball.cos = Math.cos(line.rotation);
                ball.sin = Math.sin(line.rotation);

                var x1 = ball.x - line.x,
                    y1 = ball.y - line.y,
                    y2 = y1*ball.cos - x1*ball.sin,
                    vy1 = ball.vy*ball.cos - ball.vx*ball.sin;

                if(y2>-ball.radius&&y2<vy1){

                    var x2 = x1*ball.cos + y1*ball.sin,
                        vx1 = ball.vx*ball.cos + ball.vy*ball.sin;

                    y2 = -ball.radius;
                    vy1*=bounce;

                    x1 = x2*ball.cos - y2*ball.sin;
                    y1 = y2*ball.cos + x2*ball.sin;

                    ball.vx = vx1*ball.cos - vy1*ball.sin;
                    ball.vy = vy1*ball.cos + vx1*ball.sin;

                    ball.x = line.x+x1;
                    ball.y = line.y+y1;
                }
            }
        },
        drawLine:function(line){
            Learn.checkLine(line);
            line.draw(ctx);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            ball.vy+=gravity;
            ball.x+=ball.vx;
            ball.y+=ball.vy;

            if (ball.x + ball.radius > canvas.width) {
                ball.x = canvas.width - ball.radius;
                ball.vx *= bounce;
            } else if (ball.x - ball.radius < 0) {
                ball.x = ball.radius;
                ball.vx *= bounce;
            }
            if (ball.y + ball.radius > canvas.height) {
                ball.y = canvas.height - ball.radius;
                ball.vy *= bounce;
            } else if (ball.y - ball.radius < 0) {
                ball.y = ball.radius;
                ball.vy *= bounce;
            }

            lines.forEach(Learn.drawLine);
            ball.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;
})(window);
