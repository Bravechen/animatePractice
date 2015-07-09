/**
 * Created by gxchen on 2014/7/22.
 */
(function(window,undefined){
    var canvas,ctx,pointList,sum=50,fl=250,vpx,vpy,mouse,angleX,angleY,colorList;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");

            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            colorList = [];
            pointList = [];
            var point3d;
            while(sum--){
                point3d = new utils.Point3D(
                        Math.random()*300-150,
                        Math.random()*300-150,
                        Math.random()*200-100
                );
                point3d.setVanishingPoint(vpx,vpy);
                pointList.push(point3d);
                colorList.push(utils.randomColor24());
            }
            sum = pointList.length;
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
        ctx.stroke();
        ctx.closePath();
    }

})(window);
