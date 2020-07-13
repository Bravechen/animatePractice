/**
 * Created by gxchen on 2014/7/22.
 */
(function(window,undefined){
    var canvas,ctx,fl=250,vpx,vpy,pointList,sum= 10,angleX,angleY,mouse;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;

            pointList = [];
            pointList[0] = new utils.Point3D(-150,-250,100);
            pointList[1] = new utils.Point3D(150,-250,100);
            pointList[2] = new utils.Point3D(150,-150,100);
            pointList[3] = new utils.Point3D(-50,-150,100);
            pointList[4] = new utils.Point3D(-50,-50,100);
            pointList[5] = new utils.Point3D(50,-50,100);
            pointList[6] = new utils.Point3D(50,50,100);
            pointList[7] = new utils.Point3D(-50,50,100);
            pointList[8] = new utils.Point3D(-50,150,100);
            pointList[9] = new utils.Point3D(150,150,100);
            pointList[10] = new utils.Point3D(150,250,100);
            pointList[11] = new utils.Point3D(-150,250,100);

           /* while(sum--){
                var point3d = new utils.Point3D(Math.random()*200-100,Math.random()*200-100,100);
                pointList.push(point3d);
            }
            sum = pointList.length;*/

            pointList.forEach(function(point3d){
                point3d.setVanishingPoint(vpx,vpy);
                point3d.setCenter(0,0,200);
            });
            ctx.fillStyle = utils.randomColor24();
            mouse = utils.captureMouse(canvas,false);
            utils.addFrameListener(onFrameHandler,canvas);

        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function move(point3d){
        point3d.rotateX(angleX);
        point3d.rotateY(angleY);
    }

    function draw(point3d,i){
        if(i!==0){
            ctx.lineTo(point3d.getScreenX(),point3d.getScreenY());
        }
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        angleX = (mouse.y - vpy)*0.0001;
        angleY = (mouse.x - vpx)*0.0001;

        pointList.forEach(move);

        ctx.beginPath();
        ctx.moveTo(pointList[0].getScreenX(),pointList[0].getScreenY());
        pointList.forEach(draw);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

    }

})(window);

