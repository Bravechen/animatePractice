/**
 * Created by gxchen on 2014/7/4.
 */
(function(window,undefined){
    var canvas,ctx,segment0,segment1,slider0,slider1;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            segment0 = new utils.Segment(100,20,utils.randomColor24());
            segment0.x = 200;
            segment0.y = 200;
            segment0.draw(ctx);

            var pin = segment0.getPin();
            segment1 = new utils.Segment(100,20,utils.randomColor24());
            segment1.x = pin.x;
            segment1.y = pin.y;
            segment1.draw(ctx);

            slider0 = new utils.Slider(-90,90,0);
            slider0.x = canvas.width - slider0.width - 200;
            slider0.y = 20;
            slider0.captureMouse(canvas);
            slider0.onchange = Learn.onFrameHandler;
            slider0.draw(ctx);

            slider1 = new utils.Slider(-90,90,0);
            slider1.x = canvas.width - slider0.width - 180;
            slider1.y = 20;
            slider1.captureMouse(canvas);
            slider1.onchange = Learn.onFrameHandler;
            slider1.draw(ctx);

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            segment0.rotation = slider0.value*Math.PI/180;
            //segment1.rotation = slider1.value*Math.PI/180;
            segment1.rotation = segment0.rotation + (slider1.value*Math.PI/180);
            var pin = segment0.getPin();
            segment1.x = pin.x;
            segment1.y = pin.y;

            segment0.draw(ctx);
            segment1.draw(ctx);
            slider0.draw(ctx);
            slider1.draw(ctx);

        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;



})(window);
