/**
 * Created by gxchen on 2015/7/8.
 */
(function(window,undefined){
    "use strict";
    var stage,sprite,drawArea,img;
    var Learn = {
        init:function(){
            stage = document.getElementById('stage');
            sprite = document.getElementById('sprite');
            drawArea = sprite.getContext('2d');
            img = new Image();
            console.log(img);
            img.src = 'img/alice.jpg';
            img.onload = function(){
                img.width = 640;
                img.height = 900;
                document.body.appendChild(img);
                draw();
            };

        }
    };
    window.Learn = Learn;
    window.onload = Learn.init;

    function draw(){
        drawImg1();
        drawImg2();
        drawImg3();
        handlePixels();
    }

    /**
     * 绘制图片到指定的坐标
     */
    function drawImg1(){
        drawArea.drawImage(img,700,300);
    }

    /**
     * 从指定坐标点绘制一个指定宽高的图片
     */
    function drawImg2(){
        drawArea.drawImage(img,10,10,200,500);
    }

    /**
     * 从源图像上截取一部分，绘制到一个指定坐标和宽高的区域中
     */
    function drawImg3(){
        drawArea.drawImage(img,500,300,20,150,220,10,50,100);
        drawArea.drawImage(img,600,800,50,250,220,130,50,100);     //截取源图像的区域超出源图像的边界，然后绘制到canvas上，多余的部分不显示。
    }

    /**
     * 操作像素
     */
    function handlePixels(){
        var imgData = drawArea.getImageData(700,300,200,300);      //取得像素数据
        drawArea.putImageData(imgData,220,300);                   //将像素数据从指定位置绘制
        drawArea.putImageData(imgData,400,300,100,100,100,100);   //将像素数据从指定位置绘制，但是只显示指定坐标和指定宽高的区域。

        drawArea.putImageData(imgData,720,10,0,0,100,100);
        var imgData2 = drawArea.createImageData(200,200);         //根据宽高创建一份像素数据
        var list = imgData2.data;
        for(var i= 0,len=list.length;i<len;i+=4){
            var j = i;
            list[j] = 255-imgData.data[j];        //red
            list[j+1] = 255-imgData.data[j+1];    //green
            list[j+2] = 255-imgData.data[j+2];    //blue
            list[j+3] = 255;
        }
        console.log(imgData2.data.length);
        drawArea.putImageData(imgData2,300,10);

        var imgData3 = drawArea.createImageData(imgData2);          //根据另个数据的宽高创建一份新的像素数据。
        list = imgData3.data;
        for(i=0,len=list.length;i<len;i+=4){
            list[i] = imgData2.data[i]*2;
            list[i+1] = imgData2.data[i+1]*2;
            list[i+2] = imgData2.data[i+2]*2;
            list[i+3] = 255;
        }
        drawArea.putImageData(imgData3,510,10);
    }
})(window);
