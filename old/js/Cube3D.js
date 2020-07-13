/**
 * Created by gxchen on 2014/7/23.
 */
(function(window,undefined){
    var canvas,ctx,points,triangles,mouse,vpx,vpy,angleX,angleY,offsetX= 0,offsetY= 0,fl=500,light;
    var rw = 200,
        rh =200,
        rz = 200;
    var rwh = rw*0.5,
        rhh = rh*0.5,
        rzh = rz*0.5;
    var angleW,angleH,angleZH;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            vpx = canvas.width*0.5;
            vpy = canvas.height*0.5;
            points = [];
            triangles = [];
            mouse = utils.captureMouse(canvas,false);

            points[0] = new utils.Point3D(-rwh,-rhh,-rzh);
            points[1] = new utils.Point3D(rwh,-rhh,-rzh);
            points[2] = new utils.Point3D(rwh,rhh,-rzh);
            points[3] = new utils.Point3D(-rwh,rhh,-rzh);

            points[4] = new utils.Point3D(-rwh,-rhh,rzh);
            points[5] = new utils.Point3D(rwh,-rhh,rzh);
            points[6] = new utils.Point3D(rwh,rhh,rzh);
            points[7] = new utils.Point3D(-rwh,rhh,rzh);

            points.forEach(function(point3d){
                point3d.fl = fl;
                point3d.setVanishingPoint(vpx,vpy);
                point3d.setCenter(0,0,200);
            });

            //front
            triangles[0] = new utils.Triangle(points[0],points[1],points[2],utils.randomColor24());
            triangles[1] = new utils.Triangle(points[0],points[2],points[3],utils.randomColor24());
            //top
            triangles[2] = new utils.Triangle(points[0],points[4],points[5],utils.randomColor24());
            triangles[3] = new utils.Triangle(points[0],points[5],points[1],utils.randomColor24());
            //back
            triangles[4] = new utils.Triangle(points[4],points[6],points[5],utils.randomColor24());
            triangles[5] = new utils.Triangle(points[4],points[7],points[6],utils.randomColor24());
            //bottom
            triangles[6] = new utils.Triangle(points[3],points[2],points[6],utils.randomColor24());
            triangles[7] = new utils.Triangle(points[3],points[6],points[7],utils.randomColor24());
            //right
            triangles[8] = new utils.Triangle(points[1],points[5],points[6],utils.randomColor24());
            triangles[9] = new utils.Triangle(points[1],points[6],points[2],utils.randomColor24());
            //left
            triangles[10] = new utils.Triangle(points[4],points[0],points[3],utils.randomColor24());
            triangles[11] = new utils.Triangle(points[4],points[3],points[7],utils.randomColor24());

            light = new utils.Light();
            triangles.forEach(function(triangle){
                triangle.alpha = 0.5;
                triangle.light = light;
            });

            window.addEventListener(utils.KeyboardEvent.KEY_DOWN,onKeyDownHanlder,false);
            utils.addFrameListener(onFrameHandler,canvas);
        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function onKeyDownHanlder(event){
        switch(event.keyCode){
            case utils.Keyboard.LEFT:
                offsetX -= 5;
                break;
            case utils.Keyboard.RIGHT:
                offsetX += 5;
                break;
            case utils.Keyboard.UP:
                offsetY -= 5;
                break;
            case utils.Keyboard.DOWN:
                offsetY += 5;
                break;
            default :
                break;
        }

        points.forEach(function(point3d){
            point3d.setCenter(offsetX,offsetY,200);
        });
    }

    function draw(triangle){
        triangle.draw(ctx);
    }

    function move(point3d){
        //point3d.rotateX(angleX);
        point3d.rotateY(angleY);
        //point3d.rotateZ(angleX);
    }

    function change(point3d){
        point3d.x = (point3d.x>=0)?rwh:-1*rwh;
        point3d.y = (point3d.y>=0)?rhh:-1*rhh;
        point3d.z = (point3d.z>=0)?rzh:-1*rzh;
    }

    function onFrameHandler(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        angleX = (mouse.y - vpy)*0.00005;
        angleY = (mouse.x - vpx)*0.00005;

        //rwh = Math.cos(angleW)*rw*0.5;
        //rhh = Math.sin(angleW)*rh*0.5;
        //points.forEach(change);

        //angleW+=0.2;



        points.forEach(move);
        triangles.forEach(draw);
    }

})(window);
