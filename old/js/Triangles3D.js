/**
 * Created by gxchen on 2014/7/23.
 */
(function(window,undefined){
    var canvas,ctx,triangles,sum,points,angleX,angleY,mouse,vpx,vpy;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;

            triangles = [];
            points = [];

            points[0] = new utils.Point3D(-50,-250,100);
            points[1] = new utils.Point3D(50,-250,100);
            points[2] = new utils.Point3D(200,250,100);
            points[3] = new utils.Point3D(100,250,100);
            points[4] = new utils.Point3D(50,100,100);
            points[5] = new utils.Point3D(-50,100,100);
            points[6] = new utils.Point3D(-100,250,100);
            points[7] = new utils.Point3D(-200,250,100);
            points[8] = new utils.Point3D(0,-150,100);
            points[9] = new utils.Point3D(50,0,100);
            points[10] = new utils.Point3D(-50,0,100);

            points.forEach(function(point3d){
                point3d.setVanishingPoint(vpx,vpy);
                point3d.setCenter(0,0,200);
            });

            triangles[0] = new utils.Triangle(points[0],points[1],points[8],utils.randomColor24());
            triangles[1] = new utils.Triangle(points[1],points[9],points[8],utils.randomColor24());
            triangles[2] = new utils.Triangle(points[1],points[2],points[9],utils.randomColor24());
            triangles[3] = new utils.Triangle(points[2],points[4],points[9],utils.randomColor24());
            triangles[4] = new utils.Triangle(points[2],points[3],points[4],utils.randomColor24());
            triangles[5] = new utils.Triangle(points[4],points[5],points[9],utils.randomColor24());
            triangles[6] = new utils.Triangle(points[9],points[5],points[10],utils.randomColor24());
            triangles[7] = new utils.Triangle(points[5],points[6],points[7],utils.randomColor24());
            triangles[8] = new utils.Triangle(points[5],points[7],points[10],utils.randomColor24());
            triangles[9] = new utils.Triangle(points[0],points[10],points[7],utils.randomColor24());
            triangles[10] = new utils.Triangle(points[0],points[8],points[10],utils.randomColor24());

            triangles.forEach(function(triangle){
                triangle.alpha = Math.random()*0.8+0.2;

            });

            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function draw(triangle){
        triangle.draw(ctx);
    }

    function move(point3d){
        point3d.rotateX(angleX);
        point3d.rotateY(angleY);
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        angleX = (mouse.x - vpx)*0.0005;
        angleY = (mouse.y - vpy)*0.0005;

        points.forEach(move);
        triangles.forEach(draw);
    }

})(window);
