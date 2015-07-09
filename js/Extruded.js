/**
 * Created by gxchen on 2014/7/25.
 */
(function(window,undefined){
    var canvas,ctx,mouse,vpx,vpy,points,triangles,angleX,angleY,light;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            mouse = utils.captureMouse(canvas,false);
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            light = new utils.Light();

            points = [];
            //first set
            points[0]  = new utils.Point3D( -50, -250, -50);
            points[1]  = new utils.Point3D(  50, -250, -50);
            points[2]  = new utils.Point3D( 200,  250, -50);
            points[3]  = new utils.Point3D( 100,  250, -50);
            points[4]  = new utils.Point3D(  50,  100, -50);
            points[5]  = new utils.Point3D( -50,  100, -50);
            points[6]  = new utils.Point3D(-100,  250, -50);
            points[7]  = new utils.Point3D(-200,  250, -50);
            points[8]  = new utils.Point3D(   0, -150, -50);
            points[9]  = new utils.Point3D(  50,    0, -50);
            points[10] = new utils.Point3D( -50,    0, -50);
            //second set
            points[11] = new utils.Point3D( -50, -250,  50);
            points[12] = new utils.Point3D(  50, -250,  50);
            points[13] = new utils.Point3D( 200,  250,  50);
            points[14] = new utils.Point3D( 100,  250,  50);
            points[15] = new utils.Point3D(  50,  100,  50);
            points[16] = new utils.Point3D( -50,  100,  50);
            points[17] = new utils.Point3D(-100,  250,  50);
            points[18] = new utils.Point3D(-200,  250,  50);
            points[19] = new utils.Point3D(   0, -150,  50);
            points[20] = new utils.Point3D(  50,    0,  50);
            points[21] = new utils.Point3D( -50,    0,  50);

            points.forEach(function(point3d){
                point3d.setVanishingPoint(vpx,vpy);
                point3d.setCenter(0,0,200);
            });

            triangles = [];
            triangles[0]  = new utils.Triangle(points[0],  points[1],  points[8],  utils.randomColor24());
            triangles[1]  = new utils.Triangle(points[1],  points[9],  points[8],  utils.randomColor24());
            triangles[2]  = new utils.Triangle(points[1],  points[2],  points[9],  utils.randomColor24());
            triangles[3]  = new utils.Triangle(points[2],  points[4],  points[9],  utils.randomColor24());
            triangles[4]  = new utils.Triangle(points[2],  points[3],  points[4],  utils.randomColor24());
            triangles[5]  = new utils.Triangle(points[4],  points[5],  points[9],  utils.randomColor24());
            triangles[6]  = new utils.Triangle(points[9],  points[5],  points[10], utils.randomColor24());
            triangles[7]  = new utils.Triangle(points[5],  points[6],  points[7],  utils.randomColor24());
            triangles[8]  = new utils.Triangle(points[5],  points[7],  points[10], utils.randomColor24());
            triangles[9]  = new utils.Triangle(points[0],  points[10], points[7],  utils.randomColor24());
            triangles[10] = new utils.Triangle(points[0],  points[8],  points[10], utils.randomColor24());

            triangles[11] = new utils.Triangle(points[11], points[19], points[12], utils.randomColor24());
            triangles[12] = new utils.Triangle(points[12], points[19], points[20], utils.randomColor24());
            triangles[13] = new utils.Triangle(points[12], points[20], points[13], utils.randomColor24());
            triangles[14] = new utils.Triangle(points[13], points[20], points[15], utils.randomColor24());
            triangles[15] = new utils.Triangle(points[13], points[15], points[14], utils.randomColor24());
            triangles[16] = new utils.Triangle(points[15], points[20], points[16], utils.randomColor24());

            triangles[17] = new utils.Triangle(points[20], points[21], points[16], utils.randomColor24());
            triangles[18] = new utils.Triangle(points[16], points[18], points[17], utils.randomColor24());
            triangles[19] = new utils.Triangle(points[16], points[21], points[18], utils.randomColor24());
            triangles[20] = new utils.Triangle(points[11], points[18], points[21], utils.randomColor24());
            triangles[21] = new utils.Triangle(points[11], points[21], points[19], utils.randomColor24());

            triangles[22] = new utils.Triangle(points[0],  points[11], points[1],  utils.randomColor24());
            triangles[23] = new utils.Triangle(points[11], points[12], points[1],  utils.randomColor24());
            triangles[24] = new utils.Triangle(points[1],  points[12], points[2],  utils.randomColor24());
            triangles[25] = new utils.Triangle(points[12], points[13], points[2],  utils.randomColor24());
            triangles[26] = new utils.Triangle(points[3],  points[2],  points[14], utils.randomColor24());
            triangles[27] = new utils.Triangle(points[2],  points[13], points[14], utils.randomColor24());
            triangles[28] = new utils.Triangle(points[4],  points[3],  points[15], utils.randomColor24());
            triangles[29] = new utils.Triangle(points[3],  points[14], points[15], utils.randomColor24());
            triangles[30] = new utils.Triangle(points[5],  points[4],  points[16], utils.randomColor24());
            triangles[31] = new utils.Triangle(points[4],  points[15], points[16], utils.randomColor24());
            triangles[32] = new utils.Triangle(points[6],  points[5],  points[17], utils.randomColor24());
            triangles[33] = new utils.Triangle(points[5],  points[16], points[17], utils.randomColor24());
            triangles[34] = new utils.Triangle(points[7],  points[6],  points[18], utils.randomColor24());
            triangles[35] = new utils.Triangle(points[6],  points[17], points[18], utils.randomColor24());
            triangles[36] = new utils.Triangle(points[0],  points[7],  points[11], utils.randomColor24());
            triangles[37] = new utils.Triangle(points[7],  points[18], points[11], utils.randomColor24());
            triangles[38] = new utils.Triangle(points[8],  points[9],  points[19], utils.randomColor24());
            triangles[39] = new utils.Triangle(points[9],  points[20], points[19], utils.randomColor24());
            triangles[40] = new utils.Triangle(points[9],  points[10], points[20], utils.randomColor24());
            triangles[41] = new utils.Triangle(points[10], points[21], points[20], utils.randomColor24());
            triangles[42] = new utils.Triangle(points[10], points[8],  points[21], utils.randomColor24());
            triangles[43] = new utils.Triangle(points[8],  points[19], points[21], utils.randomColor24());

            triangles.forEach(function(triangle){
                //triangle.alpha = 0.5;
                triangle.light = light;
            });

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
        triangle.draw(ctx);
    }

    function depth(a,b){
        return (b.getDepth() - a.getDepth());
    }

    function onFrameHandler(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        angleX = (mouse.y - vpy)*0.00005;
        angleY = (mouse.x - vpx)*0.00005;

        points.forEach(move);
        triangles.sort(depth);
        triangles.forEach(draw);
    }

})(window);
