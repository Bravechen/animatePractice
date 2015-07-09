/**
 * Created by gxchen on 2014/6/10.
 */
(function(window,undefined){
    var canvas,ctx,ship,ballSum=100,starList=[],starSpeed=0.5,canvas2,ctx2;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            canvas2 = document.getElementById("back");
            ctx2 = canvas2.getContext("2d");

            //ship = new utils.Ship();
            ship = new utils.ArrowShip("img/ship.png");
            ship.x = canvas.width*0.5;
            ship.y = canvas.height*0.5;



            for(var i=0;i<ballSum;i++){
                var ball = new utils.Ball(3,"#ffffff");
                ball.x = Math.random()*canvas.width;
                ball.y = Math.random()*canvas.height;
                var r = Math.random();
                ball.scaleX = r;
                ball.scaleY = r;
                starList[i] = ball;
            }

            window.addEventListener(utils.KeyboardEvent.KEY_DOWN,Learn.onKeydownHandler,false);
            window.addEventListener(utils.KeyboardEvent.KEY_UP,Learn.onKeyupHandler,false);
            utils.addFrameListener(Learn.onFrameHandler,canvas);
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ship.rotation += utils.degreesToRadius(ship.vr);
            ship.ax = Math.cos(ship.rotation)*ship.thrust;
            ship.ay = Math.sin(ship.rotation)*ship.thrust;
            ship.vx += ship.ax;
            ship.vy += ship.ay;
            ship.x += ship.vx;
            ship.y += ship.vy;

            if(ship.x+ship.width*0.5<0){
                ship.x = canvas.width-ship.width*0.5;
            }else if(ship.x-ship.width*0.5>canvas.width){
                ship.x = ship.width*0.5;
            }

            if(ship.y+ship.height*0.5<0){
                ship.y = canvas.height-ship.height*0.5;
            }else if(ship.y-ship.height*0.5>canvas.height){
                ship.y = ship.height*0.5;
            }
            ship.draw(ctx);
            ctx2.clearRect(0,0,canvas2.width,canvas2.height);
            for(var i=0;i<ballSum;i++){
                var star = starList[i];
                if(star.x>0){
                    star.x-=starSpeed/star.scaleX;
                }else{
                    star.x = canvas2.width;
                }
                star.draw(ctx2);
            }

        },
        onKeydownHandler:function(e){
            switch(e.keyCode){
                case utils.Keyboard.LEFT:
                    ship.vr = -3;
                    break;
                case utils.Keyboard.RIGHT:
                    ship.vr = 3;
                    break;
                case utils.Keyboard.UP:
                    ship.thrust = 0.05;
                    ship.showFlame = true;
                    break;
                case utils.Keyboard.DOWN:
                    break;
                default:
                    break;
            }
        },
        onKeyupHandler: function(e) {
            ship.vr = 0;
            ship.thrust = 0;
            ship.showFlame = false;
            
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
