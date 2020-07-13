/**
 * Created by gxchen on 2014/7/30.
 */
(function(window,undefined){
    var canvas,ctx,points,triangles,mouse,vpx,vpy,sumFaces=20,radius=200,angleX,angleY;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;

            points = [];
            var angle,xpos,ypos,idx=0;
            for(var i=0;i<sumFaces;i++){
                angle = Math.PI*2/sumFaces*i;
                xpos = Math.cos(angle)*radius;
                ypos = Math.sin(angle)*radius;
                points[idx] = new utils.Point3D(xpos,ypos,-100);
                points[idx+1] = new utils.Point3D(xpos,ypos,100);
                idx += 2;
            }
            points.forEach(function(point3d){
                point3d.setVanishingPoint(vpx,vpy);
                point3d.setCenter(0,0,200);
            });

            triangles = [];
            idx = 0;
            for(i=0;i<sumFaces - 1;i++){
                triangles[idx] = new utils.Triangle(points[idx],points[idx+3],points[idx+1],utils.randomColor24());
                triangles[idx+1] = new utils.Triangle(points[idx],points[idx+2],points[idx+3],utils.randomColor24());
                idx+=2;
            }

            triangles[idx] = new utils.Triangle(points[idx],points[1],points[idx+1],utils.randomColor24());
            triangles[idx+1] = new utils.Triangle(points[idx],points[0],points[1],utils.randomColor24());

            triangles.forEach(function(triangle){
               triangle.alpha = 0.5;
            });


            //points.forEach(move);
            //triangles.forEach(draw);
            //console.log(points);
            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function move(point3d){
        //point3d.rotateX(angleX);
        point3d.rotateY(angleY);
    }

    function draw(triangle){
        //console.log("111111111");
        triangle.draw(ctx);
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        angleX = (mouse.y - vpy)*0.00005;
        angleY = (mouse.x - vpx)*0.00005;

        points.forEach(move);
        triangles.forEach(draw);
    }
})(window);
