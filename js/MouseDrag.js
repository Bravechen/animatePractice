/**
 * Created by gxchen on 2014/6/12.
 */
(function(window,undefined){
    var canvas,ctx,mouse,ball,gravity=0.5,bounce=-0.8,left,right,top,bottom,isMouseDown = false,oldX,oldY;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            ball = new utils.Ball();
            ball.x = canvas.width*0.5;
            ball.y = canvas.height*0.5;
            ball.vx = Math.random()*10-5;
            ball.vy = Math.random()*10-5;

            left = 0;
            right = canvas.width;
            top = 0;
            bottom = canvas.height;

            canvas.addEventListener(utils.MouseEvent.MOUSE_DOWN,Learn.onMouseDownHandler,false);
            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onMouseDownHandler:function(e){
            if(utils.containsPoint(ball.getBounds(),new utils.Point(mouse.x,mouse.y))){
                isMouseDown = true;
                ball.vx = 0;
                ball.vy = 0;
                oldX = ball.x;
                oldY = ball.y;
                canvas.addEventListener(utils.MouseEvent.MOUSE_UP,Learn.onMouseUpHandler,false);
                canvas.addEventListener(utils.MouseEvent.MOUSE_MOVE,Learn.onMouseMoveHandler,false);

            }

        },
        onMouseUpHandler:function(e){
            canvas.removeEventListener(utils.MouseEvent.MOUSE_UP,Learn.onMouseUpHandler,false);
            canvas.removeEventListener(utils.MouseEvent.MOUSE_MOVE,Learn.onMouseMoveHandler,false);
            isMouseDown = false;


        },
        onMouseMoveHandler:function(e){
            ball.x = mouse.x;
            ball.y = mouse.y;
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            if(!isMouseDown){
                Learn.checkWalls();
            }else{
                Learn.trackVelocity();
            }
            ball.draw(ctx);
        },
        checkWalls:function(){
            ball.vy += gravity;
            ball.x += ball.vx;
            ball.y += ball.vy;

            if(ball.x+ball.radius>right){
                ball.x = right - ball.radius;
                ball.vx*=bounce;
            }else if(ball.x - ball.radius<left){
                ball.x = left + ball.radius;
                ball.vx*=bounce;
            }
            if(ball.y+ball.radius>bottom){
                ball.y = bottom - ball.radius;
                ball.vy *= bounce;
            }else if(ball.y - ball.radius<top){
                ball.y = top + ball.radius;
                ball.vy *= bounce;
            }
        },
        trackVelocity:function(){
            ball.vx = ball.x - oldX;
            ball.vy = ball.y - oldY;
            oldX = ball.x;
            oldY = ball.y;
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
