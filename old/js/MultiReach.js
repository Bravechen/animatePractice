/**
 * Created by gxchen on 2014/7/9.
 */
(function(window,undefined){
    var canvas,ctx,sum= 5,segList,mouse,target,ball,gravity=0.5,bounce=-0.9;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            segList = [];
            while(sum--){
                segList.push(new utils.Segment(50,10,utils.randomColor24()));
            }
            sum = segList.length;

            mouse = utils.captureMouse(canvas,false);
            ball = new utils.Ball(30,utils.randomColor24());
            ball.vx = 10;

            segList[sum-1].x = canvas.width*0.5;
            segList[sum-1].y = canvas.height*0.5;

            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        reach:function(seg,xpos,ypos){
            var dx = xpos - seg.x,
                dy = ypos - seg.y;
            seg.rotation = Math.atan2(dy,dx);

            var p = seg.getPin(),
                w = p.x - seg.x,
                h = p.y - seg.y;

            return new utils.Point(xpos - w,ypos - h);
        },
        position:function(segA,segB){
            var p = segB.getPin();
            segA.x = p.x;
            segA.y = p.y;
        },
        move:function(seg,i){
            if(i!==0){
                target = Learn.reach(seg,target.x,target.y);
                Learn.position(segList[i-1],seg);
            }
        },
        draw:function(seg){
            seg.draw(ctx);
        },
        moveBall:function(){
            ball.vy+=gravity;
            ball.x+=ball.vx;
            ball.y+=ball.vy;

            if(ball.x - ball.radius<0){
                ball.x = ball.radius;
                ball.vx*=bounce;
            }else if(ball.x+ball.radius>canvas.width){
                ball.x = canvas.width - ball.radius;
                ball.vx*=bounce;
            }

            if(ball.y+ball.radius>canvas.height){
                ball.y = canvas.height - ball.radius;
                ball.vy*=bounce;
            }else if(ball.y - ball.radius<0){
                ball.y = ball.radius;
                ball.vy*=bounce;
            }
        },
        checkHit:function(){
            var seg = segList[0],
                p = seg.getPin(),
                dx = p.x - ball.x,
                dy = p.y - ball.y,
                dis = Math.sqrt(dx*dx+dy*dy);
            if(dis<ball.radius){
                ball.vx = Math.random()*2-1;
                ball.vy -= 1;
            }
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            Learn.moveBall();

            target = Learn.reach(segList[0],ball.x,ball.y);
            segList.forEach(Learn.move);
            Learn.checkHit();
            segList.forEach(Learn.draw);
            ball.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
