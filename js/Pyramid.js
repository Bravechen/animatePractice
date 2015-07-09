/**
 * Created by gxchen on 2014/7/24.
 */

(function(window,undefined){
    var canvas,ctx,angleX,angleY,vpx,vpy,points,triangles,mouse,light;
    var w = 300, h=300,l=300,hw,hh,hl;

    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            mouse = utils.captureMouse(canvas,false);

            hw = w*0.5;
            hh = h*0.5;
            hl = l*0.5;

            points = [];
            points[0] = new utils.Point3D(0,-hl,0);
            points[1] = new utils.Point3D(hw,hl,-hh);
            points[2] = new utils.Point3D(hw,hl,hh);
            points[3] = new utils.Point3D(-hw,hl,hh);
            points[4] = new utils.Point3D(-hw,hl,-hh);
            points.forEach(function (point3d) {
                point3d.setVanishingPoint(vpx,vpy);
                point3d.setCenter(0,0,200);
            });

            triangles = [];
            triangles[0] = new utils.Triangle(points[0],points[2],points[1],utils.randomColor24());
            triangles[1] = new utils.Triangle(points[0],points[3],points[2],utils.randomColor24());
            triangles[2] = new utils.Triangle(points[0],points[4],points[3],utils.randomColor24());
            triangles[3] = new utils.Triangle(points[0],points[1],points[4],utils.randomColor24());
            triangles[4] = new utils.Triangle(points[1],points[2],points[3],utils.randomColor24());
            triangles[5] = new utils.Triangle(points[1],points[3],points[4],utils.randomColor24());

            light = new utils.Light();
            triangles.forEach(function(triangle){
                triangle.alpha = 0.5;
                triangle.light = light;
            });

//            triangles.forEach(function(triangle){
//                triangle.alpha = 0.5;
//            });

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

        angleX = (mouse.y - vpy)*0.0005;
        angleY = (mouse.x - vpx)*0.0005;

        points.forEach(move);
        triangles.forEach(draw);
    }

})(window);
