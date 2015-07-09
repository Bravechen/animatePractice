/**
 * Created by gxchen on 2014/7/8.
 */
(function(window,undefined){
    var canvas,ctx,segment0,segment1,mouse,segmentList,sum = 36;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            segmentList = [];
            while(sum--){
                var seg = new utils.Segment(50,10,utils.randomColor24());
                segmentList.push(seg);
            }
            sum = segmentList.length;

            mouse = utils.captureMouse(canvas,false);

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        drag:function(seg,tarX,tarY){
            var dx = tarX - seg.x,
                dy = tarY - seg.y;
            seg.rotation = Math.atan2(dy,dx);
            var p = seg.getPin(),
                w = p.x - seg.x,
                h = p.y - seg.y;
            seg.x = tarX - w;
            seg.y = tarY - h;
        },
        draw:function(seg){
            seg.draw(ctx);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            Learn.drag(segmentList[0],mouse.x,mouse.y);
            for(var i=1;i<sum;i++){
                Learn.drag(segmentList[i],segmentList[i-1].x,segmentList[i-1].y);
            }
            segmentList.forEach(Learn.draw);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
