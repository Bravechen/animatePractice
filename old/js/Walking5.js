/**
 * Created by gxchen on 2014/7/5.
 */
(function(window,undefined){
    var canvas,ctx,speedSlider,thighRangeSlider,thighBaseSlider,calfRangeSlider,calfOffsetSlider,bodySpeedSlider,
        gravitySlider,
        head,segmentNeck,segmentBody,segmentArm0,segmentArm1,segmentArm2,segmentArm3,
        segment0,segment1,segment2,segment3,segment4,segment5,cycle=0;
    var Learn = {
        init:function(){
            canvas = document.getElementById("sprite");
            ctx = canvas.getContext("2d");
            //控制整体速度
            speedSlider = new utils.Slider(0,0.2,0.08);
            //控制大腿前后范围
            thighRangeSlider = new utils.Slider(0,90,45);
            //控制大腿基础角度
            thighBaseSlider = new utils.Slider(0,180,90);
            //小腿范围
            calfRangeSlider = new utils.Slider(0,90,45);
            //小腿偏移
            calfOffsetSlider = new utils.Slider(-3.14,3.14,-1.57);
            //身体移动
            bodySpeedSlider = new utils.Slider(0,10,1);
            //重力范围
            gravitySlider = new utils.Slider(0,1,0);

            head = new utils.Ball(28,utils.randomColor24());
            segmentNeck = new utils.Segment(50,20,utils.randomColor24());
            segmentBody = new utils.Segment(125,30,utils.randomColor24());

            segment0 = new utils.Segment(100,30,utils.randomColor24());
            segment1 = new utils.Segment(100,20,utils.randomColor24());
            segment2 = new utils.Segment(100,30,utils.randomColor24());
            segment3 = new utils.Segment(100,20,utils.randomColor24());
            segment4 = new utils.Segment(30,15,utils.randomColor24());
            segment5 = new utils.Segment(30,15,utils.randomColor24());
            segmentArm0 = new utils.Segment(80,25,utils.randomColor24());
            segmentArm1 = new utils.Segment(70,20,utils.randomColor24());
            segmentArm2 = new utils.Segment(80,25,utils.randomColor24());
            segmentArm3 = new utils.Segment(50,20,utils.randomColor24());

            segmentBody.x = canvas.width*0.5;
            segmentBody.y = (canvas.height - segmentBody.width)*0.5;
            segmentBody.rotation = Math.PI/2+utils.degreesToRadius(15);

           // Learn.setVelocity();

            Learn.bonesPosition();

            speedSlider.x = 10;
            speedSlider.y = 10;
            speedSlider.captureMouse(canvas);

            thighRangeSlider.x = 30;
            thighRangeSlider.y = 10;
            thighRangeSlider.captureMouse(canvas);

            thighBaseSlider.x = 50;
            thighBaseSlider.y = 10;
            thighBaseSlider.captureMouse(canvas);

            calfRangeSlider.x = 70;
            calfRangeSlider.y = 10;
            calfRangeSlider.captureMouse(canvas);

            calfOffsetSlider.x = 90;
            calfOffsetSlider.y = 10;
            calfOffsetSlider.captureMouse(canvas);

            bodySpeedSlider.x = 110;
            bodySpeedSlider.y = 10;
            bodySpeedSlider.captureMouse(canvas);

            gravitySlider.x = 130;
            gravitySlider.y = 10;
            gravitySlider.captureMouse(canvas);

            utils.addFrameListener(Learn.onFrameHandler,canvas);

        },
        bonesPosition:function(){


            segmentNeck.x = segmentBody.x+segmentNeck.height*0.5;
            segmentNeck.y = segmentBody.y - segmentNeck.width;
            segmentNeck.rotation = segmentBody.rotation;

            head.x = segmentNeck.x;
            head.y = segmentNeck.y;

            var p = segmentBody.getPin();
            //大腿1
            segment0.x = p.x;
            segment0.y = p.y;

            //大腿2
            segment2.x = segment0.x;
            segment2.y = segment0.y;

            //手臂1
            segmentArm0.x = segmentBody.x;
            segmentArm0.y = segmentBody.y;

            //手臂2
            segmentArm2.x = segmentBody.x;
            segmentArm2.y = segmentBody.y;
        },
        walk:function(segA,segB,cyc,segC){
            var angle0 = (Math.sin(cyc)*thighRangeSlider.value+thighBaseSlider.value)*Math.PI/180,
                angle1 = (Math.sin(cyc+calfOffsetSlider.value)*calfRangeSlider.value+calfRangeSlider.value)*Math.PI/180;
            var foot = segB.getPin();
            segA.rotation = angle0;
            segB.rotation = segA.rotation + angle1;
            var p = segA.getPin();
            segB.x = p.x;
            segB.y = p.y;

            if(segC){
                var angle2 = (Math.sin(cyc-calfOffsetSlider.value)*45+45)*Math.PI/180;
                segC.rotation = segB.rotation - angle2;
                p = segB.getPin();
                segC.x = p.x;
                segC.y = p.y;
                segB.vx = p.x - foot.x;
                segB.vy = p.y - foot.y;
            }
        },
        swing:function(segA,segB,cyc,segC){
            var angle0 = (Math.sin(cyc)*thighRangeSlider.value+thighBaseSlider.value)*Math.PI/180,
                angle1 = (Math.sin(cyc+calfOffsetSlider.value)*calfRangeSlider.value+calfRangeSlider.value)*Math.PI/180;
            segA.rotation = angle0;
            segB.rotation = segA.rotation - angle1;
            var p = segA.getPin();
            segB.x = p.x;
            segB.y = p.y;
            if(segC){
                var angle2 = (Math.sin(cyc-calfOffsetSlider.value)*45+45)*Math.PI/180;
                segC.rotation = segB.rotation - angle2;
                p = segB.getPin();
                segC.x = p.x;
                segC.y = p.y;
            }
        },
        checkWalls:function(seg){
            var w = canvas.width + 200;
            if(seg.x>canvas.width+100){
                seg.x = -w;

            }

        },
        setVelocity:function(seg,vx,vy,ax,ay){
            seg.vx = vx;
            seg.vy = vy;
            seg.vx+=(ax===undefined)?0:ax;
            seg.vy+=(ay===undefined)?0:ay;
            seg.x += seg.vx;
            seg.y += seg.vy;
        },
        checkFloor:function(seg){
            var p = seg.getPin(),
                yMax = p.y + seg.height*0.5;
            if(yMax>canvas.height){
                var dy = yMax - canvas.height;
                segmentBody.y -= dy;
                segmentBody.vx -= seg.vx;
                segmentBody.vy -= seg.vy;
            }
        },
        onFrameHandler:function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);

            Learn.setVelocity(segmentBody,bodySpeedSlider.value,0,0,gravitySlider.value);

            Learn.checkWalls(segmentBody);

            Learn.bonesPosition();

            cycle+=speedSlider.value;
            Learn.swing(segmentArm0,segmentArm1,cycle);
            Learn.swing(segmentArm2,segmentArm3,cycle+Math.PI);
            Learn.walk(segment0,segment1,cycle,segment4);
            Learn.walk(segment2,segment3,cycle+Math.PI,segment5);

            Learn.checkFloor(segment1);
            Learn.checkFloor(segment3);

            segment0.draw(ctx);
            segment1.draw(ctx);
            segment4.draw(ctx);

            segmentArm2.draw(ctx);
            segmentArm3.draw(ctx);

            segmentNeck.draw(ctx);
            segmentBody.draw(ctx);

            segment2.draw(ctx);
            segment3.draw(ctx);
            segment5.draw(ctx);

            segmentArm0.draw(ctx);
            segmentArm1.draw(ctx);

            head.draw(ctx);

            speedSlider.draw(ctx);
            thighRangeSlider.draw(ctx);
            thighBaseSlider.draw(ctx);
            calfRangeSlider.draw(ctx);
            calfOffsetSlider.draw(ctx);
            bodySpeedSlider.draw(ctx);
            gravitySlider.draw(ctx);
        }

    };
    window.Learn = Learn;
    window.onload = Learn.init;

})(window);
