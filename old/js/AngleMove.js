/**
 * Created by gxchen on 2014/6/6.
 */
(function(window,undefined){
    var canvas,ctx,mouse,ball,angle=0;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            ball = new utils.Ball();
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            ball.y = canvas.height*0.5 + Math.sin(angle)*100;
            angle += 0.1;
            ball.draw(ctx);


        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
