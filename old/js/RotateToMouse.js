/**
 * Created by gxchen on 2014/6/5.
 */
(function(window,undefined){
    "use strict";

    var sprite,ctx,arrow,mouse,rootWidth,rootHeight;
    var Learn = {
        init:function(){
            sprite = document.getElementById("sprite");
            ctx = sprite.getContext("2d");
            rootWidth = sprite.width;
            rootHeight = sprite.height;

            mouse = utils.captureMouse(sprite,false);

            arrow = new utils.Arrow();
            arrow.x = rootWidth*0.5;
            arrow.y = rootHeight*0.5;

            utils.addFrameListener(onFrameHandler,sprite);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;
    /**
     * 帧事件处理器
     */
    function onFrameHandler(){
        ctx.clearRect(0,0,rootWidth,rootHeight);

        var dx = mouse.x - arrow.x,
            dy = mouse.y - arrow.y;

        arrow.rotation = Math.atan2(dy,dx);
        arrow.x+=dx*0.08;
        arrow.y+=dy*0.08;
        arrow.draw(ctx);
    }

})(window);

