/**
 * Created by gxchen on 2014/7/5.
 */
(function(window,undefined){
    var canvas,ctx,segment0,segment1,segment2,segment3,cycle= 0,offset=-1.7,speed=0.05;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            segment0 = new utils.Segment(100,20,utils.randomColor24());
            segment1 = new utils.Segment(100,20,utils.randomColor24());
            segment2 = new utils.Segment(100,20,utils.randomColor24());
            segment3 = new utils.Segment(100,20,utils.randomColor24());

            segment0.x = 200;
            segment0.y = 200;
            segment2.x = segment0.x;
            segment2.y = segment0.y;

            var p = segment0.getPin();
            segment1.x = p.x;
            segment1.y = p.y;
            var p1 = segment2.getPin();
            segment3.x = p1.x;
            segment3.y = p1.y;

            segment0.draw(ctx);
            segment1.draw(ctx);
            segment2.draw(ctx);
            segment3.draw(ctx);

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            cycle+=speed;
            Learn.walk(segment0,segment1,cycle);
            Learn.walk(segment2,segment3,cycle+Math.PI);

            segment0.draw(ctx);
            segment1.draw(ctx);
            segment2.draw(ctx);
            segment3.draw(ctx);
        },
        walk:function(segA,segB,cyc){
            var angle0 = (Math.sin(cyc)*45+90)*Math.PI/180,
                angle1 = (Math.sin(cyc+offset)*45+45)*Math.PI/180;
            segA.rotation = angle0;
            segB.rotation = segA.rotation + angle1;
            var p = segA.getPin();
            segB.x = p.x;
            segB.y = p.y;
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
