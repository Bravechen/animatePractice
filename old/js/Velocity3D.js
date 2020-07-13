/**
 * Created by gxchen on 2014/7/15.
 */
(function(window,undefined){
    var canvas,ctx,ball,fl=250,xpos= 0,ypos= 0,zpos= 0,vx= 0,vy= 0,vz= 0,friction=0.98,vpx,vpy;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            ball = new utils.Ball(30,utils.randomColor24());
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            window.addEventListener(utils.KeyboardEvent.KEY_DOWN,Learn.onKeyDownHandler,false);
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onKeyDownHandler:function(event){
            switch (event.keyCode){
                case utils.Keyboard.UP:
                    vy-=1;
                    break;
                case utils.Keyboard.DOWN:
                    vy+=1;
                    break;
                case utils.Keyboard.LEFT:
                    vx-=1;
                    break;
                case utils.Keyboard.RIGHT:
                    vx+=1;
                    break;
                case utils.Keyboard.SHIFT:
                    vz+=1;
                    break;
                case utils.Keyboard.CONTROL:
                    vz-=1;
                    break;
            }

        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            xpos+=vx;
            ypos+=vy;
            zpos+=vz;
            vx*=friction;
            vy*=friction;
            vz*=friction;

            if(zpos>-fl){
                var scale = fl/(fl+zpos);
                ball.scaleX = ball.scaleY = scale;
                ball.x = vpx+xpos*scale;
                ball.y = vpy+ypos*scale;
                ball.visible = true;
            }else{
                ball.visible = false;
            }

            if(ball.visible){
                ball.draw(ctx);
            }
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
