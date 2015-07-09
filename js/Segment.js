/**
 * Created by gxchen on 2014/7/4.
 */
(function(window,undefined){

    var canvas,ctx,segment0,segment1,segment2,slider;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            segment0 = new utils.Segment(100,20);
            segment1 = new utils.Segment(200,10);
            segment2 = new utils.Segment(80,40);

            segment0.x = 100;
            segment0.y = 50;
            segment0.draw(ctx);

            segment1.x = 100;
            segment1.y = 80;
            segment1.draw(ctx);

            segment2.x = 100;
            segment2.y = 120;
            segment2.draw(ctx);

            slider = new utils.Slider(-90,90,0);
            slider.x = canvas.width*0.5;
            slider.y = canvas.height*0.5 - slider.height*0.5;
            slider.captureMouse(canvas);
            slider.draw(ctx);

            slider.onchange = Learn.onFrameHandler;

           // utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            segment2.rotation = slider.value*Math.PI/180;

            segment0.draw(ctx);
            segment1.draw(ctx);
            segment2.draw(ctx);
            slider.draw(ctx);

        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;



})(window);
