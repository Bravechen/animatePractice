/**
 * Created by gxchen on 2014/7/9.
 */
(function(window,undefined){
    var canvas,ctx,seg0,seg1,mouse;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            seg0 = new utils.Segment(100,20,"#00ffff");
            seg1 = new utils.Segment(100,20,"#00aa00");
            mouse = utils.captureMouse(canvas,false);

            seg1.x = canvas.width*0.5;
            seg1.y = canvas.height*0.5;

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
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            var targetP = Learn.reach(seg0,mouse.x,mouse.y);
            Learn.reach(seg1,targetP.x,targetP.y);
            Learn.position(seg0,seg1);

            seg0.draw(ctx);
            seg1.draw(ctx);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
