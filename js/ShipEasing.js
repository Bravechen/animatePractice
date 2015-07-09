/**
 * Created by gxchen on 2014/6/12.
 */
(function(window,undefined){
    var canvas,ctx,ball,easing = 0.1,mouse,oldC=0,tarC=0;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            ball = new utils.Ball(20);
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;

            oldC = utils.parseColor(ball.color,true);
            tarC = Math.random()*0xffffff;

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            //console.log(mouse.x,mouse.y);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var dx = mouse.x - ball.x;
            var dy = mouse.y - ball.y;
            //var dis = Math.sqrt(dx*dx+dy*dy);
            var angle = Math.atan2(dy,dx);
            ball.rotation = angle;
            ball.x+=dx*easing;
            ball.y+=dy*easing;
            //console.log(Math.abs(tarC - oldC).toString(16));

            Learn.checkColor();

            ball.draw(ctx);
        },
        checkColor:function(){
            var oldAry = utils.separateChannel24(oldC);
            var tarAry = utils.separateChannel24(tarC);
            var r = oldAry[0],g = oldAry[1],b=oldAry[2];
            var tr = tarAry[0],tg = tarAry[1],tb = tarAry[2];
            var bd = Math.floor(10);
            if(Math.abs(tr-r)<bd&&Math.abs(tg-g)<bd&&Math.abs(tb-b)<bd){
                oldC = tarC;
                ball.color = utils.parseColor(oldC,false);
                tarC = Math.random()*0xffffff;
                return;
            }
            //console.log(tr,r,Math.abs(tr-r));
            r += (tr -r)*easing;
            g += (tg -g)*easing;
            b += (tb -b)*easing;
            oldC = utils.compoundChannel24(r,g,b);
            ball.color = utils.parseColor(oldC,false);
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
