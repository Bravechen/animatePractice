/**
 * Created by gxchen on 2014/7/15.
 */
(function(window,undefined){
    var canvas,ctx,ball,fl=250,xpos= 0,ypos= 0,zpos= 0,vpx= 0,vpy= 0,mouse;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            ball = new utils.Ball(30,utils.randomColor24());
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            mouse = utils.captureMouse(canvas,false);

            window.addEventListener(utils.KeyboardEvent.KEY_DOWN,Learn.onKeyDownHandler,false);
            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        onKeyDownHandler:function(event){

            switch(event.keyCode){
                case utils.Keyboard.UP:
                    zpos+=5;
                    break;
                case utils.Keyboard.DOWN:
                    zpos-=5;
                    break;
                case utils.Keyboard.LEFT:
                    fl+=5;
                    break;
                case utils.Keyboard.RIGHT:
                    fl-=5;
                    break;
            }

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            if(zpos>-fl){
                var scale = fl/(fl+zpos);
                xpos = mouse.x - vpx;
                ypos = mouse.y - vpy;
                ball.scaleX = ball.scaleY = scale;
                ball.x = vpx+xpos*scale;
                ball.y = vpy+ypos*scale;
                ball.visible = true;
            }else{
                ball.visible = false;
            }

            if(ball.visible)
                ball.draw(ctx);

        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;


})(window);
