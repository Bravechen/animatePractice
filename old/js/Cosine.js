/**
 * Created by gxchen on 2014/7/10.
 */
(function(window,undefined){
    var canvas,ctx,seg0,seg1,mouse;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            seg0 = new utils.Segment(100,20,utils.randomColor24());
            seg1 = new utils.Segment(100,20,utils.randomColor24());
            mouse = utils.captureMouse(canvas,false);

            seg1.x = canvas.width*0.5;
            seg1.y = canvas.height*0.5;

            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var dx = mouse.x - seg1.x,
                dy = mouse.y - seg1.y,
                dis = Math.sqrt(dx*dx+dy*dy),
                a = 100,
                b = 100,
                c = Math.min(dis,a+b),
                B = Math.acos((a*a+c*c-b*b)/(2*a*c)),
                C = Math.acos((a*a+b*b-c*c)/(2*a*b)),
                D = Math.atan2(dy,dx),
                E = D+B+Math.PI+C;
                //E = D - B + Math.PI - C;
            seg1.rotation = (D+B);
            //seg1.rotation = (D-B);

            var target = seg1.getPin();
            seg0.x = target.x;
            seg0.y = target.y;
            seg0.rotation = E;

            seg0.draw(ctx);
            seg1.draw(ctx);

        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
