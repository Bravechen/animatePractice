/**
 * Created by gxchen on 2014/6/16.
 */
(function(window,undefined){
    var canvas,ctx,ball,handleList,spring = 0.03,friction = 0.9,handleSum = 10,movingHandle = null,mouse;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);

            ball = new utils.Ball(30,utils.randomColor24());
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;

            handleList = [];
            var i = handleSum;
            while(i--){
                var handle = new utils.Ball(10,utils.randomColor24());
                handle.x = Math.random()*canvas.width;
                handle.y = Math.random()*canvas.height;
                handleList.push(handle);
            }


            canvas.addEventListener(utils.MouseEvent.MOUSE_DOWN,Learn.onMouseDownHandler,false);
            canvas.addEventListener(utils.MouseEvent.MOUSE_UP,Learn.onMouseUpHandler,false);
            canvas.addEventListener(utils.MouseEvent.MOUSE_MOVE,Learn.onMouseMoveHandler,false);

            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onMouseDownHandler:function(e){

            handleList.forEach(function(handle){
                if(utils.containsPoint(handle.getBounds(),new utils.Point(mouse.x,mouse.y))){
                    movingHandle = handle;
                }
            });
        },
        onMouseUpHandler:function(e){
            if(movingHandle){
                movingHandle = null;
            }
        },
        onMouseMoveHandler:function(e){
            if(movingHandle){
                movingHandle.x = mouse.x;
                movingHandle.y = mouse.y;
            }

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            handleList.forEach(Learn.applyHandle);
            ball.vx*=friction;
            ball.vy*=friction;
            ball.x+=ball.vx;
            ball.y+=ball.vy;

            ctx.beginPath();
            handleList.forEach(Learn.drawHandle);
            ball.draw(ctx);
        },
        applyHandle:function(handle){
            var dx = handle.x - ball.x,
                dy = handle.y - ball.y;
            ball.vx += dx*spring;
            ball.vy += dy*spring;
        },
        drawHandle:function(handle){
            ctx.moveTo(ball.x,ball.y);
            ctx.lineTo(handle.x,handle.y);
            ctx.stroke();
            handle.draw(ctx);
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
