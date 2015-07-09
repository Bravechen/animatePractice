/**
 * Created by gxchen on 2014/6/9.
 */
(function(window,undefined){
    var canvas,ctx,speed=3,arrow,mouse;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            arrow = new utils.Arrow();
            arrow.x = canvas.width*0.5;
            arrow.y = canvas.height*0.5;
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var dx = mouse.x - arrow.x,
                dy = mouse.y - arrow.y,
                angle = Math.atan2(dy,dx),
                vx = Math.cos(angle)*speed,
                vy = Math.sin(angle)*speed;
            arrow.rotation = angle;
            arrow.x+=vx;
            arrow.y+=vy;
            arrow.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
