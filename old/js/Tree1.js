/**
 * Created by gxchen on 2014/7/16.
 */
(function(window,undefined){
    var canvas,ctx,fl=250,vpx,vpy,floor=200,vz= 0,friction=0.98,sum=100,trees,
        ax= 0,ay= 0,az= 0,vx= 0,vy= 0,gravity=0.5;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            trees = [];
            var tree;
            while(sum--){
                tree = new utils.Tree(utils.randomColor24());
                trees.push(tree);
                tree.posX = Math.random()*2000-1000;
                tree.posY = floor;
                tree.posZ = Math.random()*10000;
                tree.lineWidth = 5;
            }

            window.addEventListener(utils.KeyboardEvent.KEY_DOWN,onKeyDownHandler,false);
            window.addEventListener(utils.KeyboardEvent.KEY_UP,onKeyUpHandler,false);
            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function onKeyDownHandler(event){
        console.log(event.keyCode);
        switch (event.keyCode){
            case utils.Keyboard.UP:
                //vz-=1;
                az = -1;
                break;
            case utils.Keyboard.DOWN:
                //vz+=1;
                az = 1;
                break;
            case utils.Keyboard.LEFT:
                ax = 1;
                break;
            case utils.Keyboard.RIGHT:
                ax = -1;
                break;
            case utils.Keyboard.SPACE:
                ay = 5;
                break;
        }
    }

    function onKeyUpHandler(e){
        switch (e.keyCode){
            case utils.Keyboard.UP:
            case utils.Keyboard.DOWN:
                az = 0;
                break;
            case utils.Keyboard.LEFT:
            case utils.Keyboard.RIGHT:
                ax = 0;
                break;
            case utils.Keyboard.SPACE:
                ay = 0;
                break;

        }

    }

    function move(tree){
        tree.posX += vx;
        tree.posY += vy;
        tree.posZ += vz;

        if(tree.posY < floor){
            tree.posY = floor;
        }

        if(tree.posZ<-fl){
            tree.posZ+=10000;
        }else if(tree.posZ>10000 - fl){
            tree.posZ-=10000;
        }

        var scale = fl/(fl+tree.posZ);
        //console.log(tree.posZ);
        tree.scaleX = tree.scaleY = scale;
        tree.x = vpx+tree.posX*scale;
        tree.y = vpy+tree.posY*scale;
        tree.alpha = scale*0.7+0.3;
    }

    function zSort(a,b){
        return (b.posZ - a.posZ);
    }

    function draw(tree){
       // console.log("111111",tree.x);
        tree.draw(ctx);
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        vx+=ax;
        vy+=ay;
        vz+=az;
        vy-=gravity;

        trees.forEach(move);
        vx*=friction;
        vy*=friction;
        vz*=friction;
        vz*=friction;
        trees.sort(zSort);
        trees.forEach(draw);

        /*ctx.save();
        ctx.strokeStyle = "#cccccc";
        ctx.beginPath();
        ctx.moveTo(0,vpy);
        ctx.lineTo(canvas.width,vpy);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();  */
    }


})(window);
