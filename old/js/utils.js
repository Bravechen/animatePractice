/**
 * Created by gxchen on 2014/6/5.
 */
this.utils = this.utils || {};
/**
 * 实用工具类
 */
(function (window, undefined) {
    "use strict";

    var PrivateClass = {
        type: "utils"
    };
//==========================公共量================================
    /**鼠标事件常量**/
    var MouseEvent = {
        CLICK: "click",
        MOUSE_MOVE: "mousemove",
        MOUSE_OVER: "mouseover",
        MOUSE_OUT: "mouseout",
        MOUSE_UP: "mouseup",
        MOUSE_DOWN: "mousedown"
    };
    utils.MouseEvent = MouseEvent;
    /**键盘事件常量**/
    var KeyboardEvent = {
        KEY_DOWN: "keydown",
        KEY_UP: "keyup"
    };
    utils.KeyboardEvent = KeyboardEvent;
    /**特殊键盘编码**/
    var Keyboard = {
        DOWN: 40,
        UP: 38,
        LEFT: 37,
        RIGHT: 39,
        SHIFT:16,
        CONTROL:17,
        SPACE:32
    };
    utils.Keyboard = Keyboard;
//=================================帧渲染============================================
    var frameHandler, animateElement, animateRequest;
    utils.frameRate = 60;

    /**
     * 添加帧更新监听
     * @param handler {Function} 处理器回调
     * @param element {HTMLDomElement} 更新主元素
     * **/
    utils.addFrameListener = function (handler, element) {
        if (typeof handler !== "function" || !element instanceof HTMLElement) {
            return;
        }

        frameHandler = handler;
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function (callBack) {
                    setTimeout(callBack, 1000 / utils.frameRate);
                });
        }
        drawFrame();
    };
    /**
     * 移除帧更新监听
     * **/
    utils.removeFrameListener = function () {
        if (!window.cancelRequestAnimationFrame) {
            window.cancelRequestAnimationFrame = (window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.clearTimeout
                );
        }
        window.cancelRequestAnimationFrame(animateRequest);
    };
    /**
     * @private
     * 提交帧更新请求
     * **/
    function drawFrame() {
        animateRequest = window.requestAnimationFrame(drawFrame, animateElement);
        frameHandler();
    }

    //===================================ClassFactory=============================
    /**
     * 类工厂
     * 类工厂提供类的创建以及相关管理
     * **/
    var ClassFactory = {
        /**
         * 使用类名称创建类实例
         * @param className {String} 类全名称字符串
         * @return {Object}
         * **/
        createInstance:function (className){
            var ary = className.split(".");
            var ClassItem = window[ary[0]];
            for(var i= 1,len=ary.length;i<len;i++){
                ClassItem = ClassItem[ary[i]];
            }
            return new ClassItem();
        }
    };

    utils.ClassFactory = ClassFactory;

    //===============================角度相关========================================
    /**
     * 角度转弧度
     *
     * @param degrees {Number} 角度
     * @return {Number} 弧度
     * **/
    utils.degreesToRadius = function (degrees) {
        return degrees * Math.PI / 180;
    };
    /**
     * 弧度转角度
     * @param radius {Number} 弧度
     * @return {Number} 角度
     * **/
    utils.radiusToDegrees = function (radius) {
        return radius * 180 / Math.PI;
    };
    //================================颜色相关=======================================
    /**
     * 色值类型常量
     * **/
    utils.ColorType = {
        RGB: "rgb",
        RGBA: "rgba",
        UINT: "#"
    };
    /**
     * 随机颜色值 24位
     * @param type 返回值类型
     *     filbert.ColorType.RGB====>"rgb(255,255,255)"
     *     filbert.ColorType.UINT===>"#ffffff"
     * @return String
     * **/
    utils.randomColor24 = function (type) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var eType = utils.ColorType;
        return (type === eType.RGB) ? "rgb(" + r + "," + g + "," + b + ")" : "#" + Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16);
    };
    /**
     * 随机颜色值 32位
     * @return String   "rgba(255,255,255,1)"
     * **/
    utils.randomColor32 = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var a = Math.random();
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    /**
     * 将16进制色值转为rgb/rgba形式
     * #ffffff/0xffffff >> rgb(255,255,255)
     * @param color 颜色值
     * @param alpha 透明度
     * @return "rgb(rr,gg,bb)"/"rgba(r,g,b,a)";
     * **/
    utils.colorToRGB = function (color, alpha) {
        var colorUint;
        if (typeof color === "string" && color[0] === "#") {
            colorUint = window.parseInt(color.slice(1), 16);
        }
        var r = colorUint >> 16 & 0xff,
            g = colorUint >> 8 & 0xff,
            b = colorUint & 0xff,
            a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
        if (a === 1) {
            return "rgb(" + r + "," + g + "," + b + ")";
        } else {
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
    };
    /**
     * 在16进制字符串形式和数字形式之间转换，并可返回10进制数值形式
     *
     * @param color 颜色值或者字符串
     * @param toNumber 是否返回数值
     *
     * @return {Number} [{String}]
     * **/
    utils.parseColor = function (color, toNumber) {
        var colorUint;
        if (toNumber === true) {
            if (typeof color === "number") {
                return (color | 0);
            }
            if (typeof color === "string" && color[0] === "#") {
                colorUint = color.slice(1);
            }
            return window.parseInt(colorUint, 16);
        } else {
            if (typeof color === "number") {
                colorUint = "#" + ("00000" + (color | 0).toString(16)).substr(-6);
            }
            return colorUint;
        }
    };
    /**
     * 从16进制的数值中析出三个颜色通道的值(10/16)
     * @param color {Number} 颜色数值
     * @return {Array} [red,green,blue]
     * **/
    utils.separateChannel24 = function (color) {
        if (typeof color === "number") {
            var r = color >> 16 & 0xff,
                g = color >> 8 & 0xff,
                b = color & 0xff;
            return [r, g, b];
        }
    };
    /**
     * 使用16进制数值合成16进制颜色值
     * @param red  红色通道值
     * @param green 绿色通道值
     * @param blue 蓝色通道值
     * @return {Number}
     * **/
    utils.compoundChannel24 = function(red,green,blue){
        return red<<16 | green<<8 | blue;
    };

    //==============================Mouse=========================================
    /**
     * @public
     * 在dom元素上捕捉鼠标坐标,鼠标在dom元素上移动时，可以实时监测鼠标的位置
     * @param element dom元素
     * @param dispose 是否释放对鼠标的监听
     * return mouse{x:0,y:0}
     * **/
    utils.captureMouse = function (element, dispose) {
        if (dispose === true) {
            if (element.addEventListener) {
                element.removeEventListener(MouseEvent.MOUSE_MOVE, handleMouseMove, false);
            } else {
                element.detachEvent(MouseEvent.MOUSE_MOVE, handleMouseMove);
            }
            return null;
        }
        var mouse = {x: 0, y: 0};
        if (element.addEventListener) {
            element.addEventListener(MouseEvent.MOUSE_MOVE, handleMouseMove, false);
        } else {
            element.attachEvent(MouseEvent.MOUSE_MOVE, handleMouseMove);
        }

        /**鼠标移动事件处理器**/
        function handleMouseMove(e) {
            var x, y;
            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            } else {
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            x -= element.offsetLeft;
            y -= element.offsetTop;

            mouse.x = x;
            mouse.y = y;
        }

        return mouse;
    };

//======================Point==================================
    /**
     * 在某个区域中是否包含某个点。
     *
     * @param rectangle 区域对应的矩形对象 utils.Rectangle
     * @param point     点坐标对象       utils.Point
     *
     * @return {Boolean}
     * **/
    utils.containsPoint = function (rectangle, point) {
        return !(point.x < rectangle.x || point.x > rectangle.x + rectangle.width ||
            point.y < rectangle.y || point.y > rectangle.y + rectangle.height);

    };

    /**
     * Point对象
     * 提供点对象的相关信息
     * **/
    var Point = function (x, y) {
        this.x = (x !== undefined) ? x : 0;     //x轴坐标
        this.y = (y !== undefined) ? y : 0;     //y轴坐标
    };
    var pp = Point.prototype;

    pp.toString = function () {
        return "[utils.Point] " + "x:" + this.x + "," + "y:" + this.y;
    };

    utils.Point = Point;

//===============================Matrix===================================
    /**
     * 矩阵类
     * 提供矩阵信息和相关变换方法
     * **/
    var Matrix = function (a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    };
    var maP = Matrix.prototype;
    maP.rotate = function (angle) {

    };
    maP.scale = function (sx, sy) {

    };
    maP.translate = function (dx, dy) {

    };

    maP.toString = function () {
        return "[utils.Matrix] " + "a:" + this.a + "," + "b:" + this.b + "," + "c:" + this.c + "," + "d:" + this.d + "," + "tx:" + this.tx + "," + "ty:" + this.ty;
    };

    utils.Matrix = Matrix;
//===============================Rectangle================================
    /**
     * 矩形区域信息类
     * 提供矩形区域的信息
     * **/
    var Rectangle = function (x, y, width, height) {
        this.x = (x != undefined) ? x : 0;
        this.y = (y != undefined) ? y : 0;
        this.width = (width != undefined) ? width : 0;
        this.height = (height != undefined) ? height : 0;
    };

    var rectP = Rectangle.prototype;

    rectP.toString = function () {
        return "[utils.Rectangle] " + "x:" + this.x + "," + "y:" + this.y + "," + "width:" + this.width + "," + "height:" + this.height;
    };

    utils.Rectangle = Rectangle;

//==================碰撞相关====================
    /**
     * 碰撞检测相关功能类
     *
     * **/
    var Collision = {
        /**
         * 2个矩形区域碰撞检测
         * @param rectA utils.Rectangle
         * @param rectB utils.Rectangle
         **/
        intersects:function(rectA,rectB){
            return !(rectA.x+rectB.width<rectB.x||
                rectB.x+rectB.width<rectA.x||
                rectA.y+rectA.height<rectB.y||
                rectB.y+rectB.height<rectA.y);
        }
    };
    utils.Collision = Collision;
//======================图形集合=======================
    /**
     * Arrow类
     * **/
    var Arrow = function () {
        this.x = 0;
        this.y = 0;
        this.color = "#ffff00";
        this.rotation = 0;

    };
    var ap = Arrow.prototype;
    ap.draw = function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineWidth = 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(-50, -25);
        ctx.lineTo(0, -25);
        ctx.lineTo(0, -50);
        ctx.lineTo(50, 0);
        ctx.lineTo(0, 50);
        ctx.lineTo(0, 25);
        ctx.lineTo(-50, 25);
        ctx.lineTo(-50, -25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    };
    utils.Arrow = Arrow;
//==========================Line=========================
    /**
     * Line类
     *
     * @param x1 起点x
     * @param y1 起点y
     * @param x2 起点x
     * @param y2 起点y
     * **/
     var Line = function (x1,y1,x2,y2){
        this.x = 0;
        this.y = 0;
        this.x1 = (x1===undefined)?0:x1;
        this.y1 = (y1===undefined)?0:y1;
        this.x2 = (x2===undefined)?0:x2;
        this.y2 = (y2===undefined)?0:y2;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.lineWidth = 1;
    };
    var lP = Line.prototype;
    /**
     * 渲染线条
     * **/
    lP.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX,this.scaleY);
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.x1,this.y1);
        ctx.lineTo(this.x2,this.y2);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    };
    /**
     * 线条边界框
     * **/
    lP.getBounds = function(){
        if(this.rotation===0){
            var minX = Math.min(this.x1,this.x2),
                minY = Math.min(this.y1,this.y2),
                maxX = Math.max(this.x1,this.x2),
                maxY = Math.max(this.y1,this.y2);
            return {
                x:this.x + minX,
                y:this.y + minY,
                width: maxX - minX,
                height:maxY - minY
            };
        }else{
            var sin = Math.sin(this.rotation),
                cos = Math.cos(this.rotation),
                x1r = cos*this.x1 + sin*this.y1,
                x2r = cos*this.x2 + sin*this.y2,
                y1r = cos*this.y1 + sin*this.x1,
                y2r = cos*this.y2 + sin*this.x2;
            return {
                x:this.x+Math.min(x1r,x2r),
                y:this.y + Math.min(y1r,y2r),
                width:Math.max(x1r,x2r) - Math.min(x1r,x2r),
                height:Math.max(y1r,y2r) - Math.min(y1r,y2r)
            };
        }
    };

    utils.Line = Line;

//=======================================================
    /**
     * Ball类
     *
     * **/
    var Ball = function (radius, color) {
        this.radius = (radius) ? radius : 40;
        this.color = (color) ? color : "#ff0000";
        this.x = 0;
        this.y = 0;

        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;

        this.oldX = this.x;
        this.oldY = this.y;

        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.lineWidth = 1;

        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.ax = 0;
        this.ay = 0;
        this.az = 0;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

        this.vr = 0;
        this.cos = 0;
        this.sin = 0;

        this.mass = 1;
        this.point = new Point();
        this.pointF = new Point();

        this.bounds = null;

        this.dragging = false;

        this.visible = true;

        this.tx = 0;
        this.ty = 0;
        this.tz = 0;
        this.tr = 0;
        this.canRotate = false;
    };
    var bp = Ball.prototype;
    bp.draw = function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        if (this.lineWidth > 0) {
            ctx.stroke();
        }
        ctx.restore();
    };

    bp.getBounds = function () {
        this.bounds = this.bounds || new utils.Rectangle();
        this.bounds.x = this.x - this.radius;
        this.bounds.y = this.y - this.radius;
        this.bounds.width = this.radius * 2;
        this.bounds.height = this.radius * 2;
        return this.bounds;
    };

    utils.Ball = Ball;
//=======================================================
    var Ship = function () {
        this.x = 0;
        this.y = 0;
        this.width = 25;
        this.height = 20;
        this.rotation = 0;
        this.showFlame = false;

        this.vr = 0;
        this.vx = 0;
        this.vy = 0;
        this.thrust = 0;
        this.ax = 0;
        this.ay = 0;
    };
    var shpp = Ship.prototype;
    shpp.draw = function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#1b97d0";
        ctx.fillStyle = "#2da5da";
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, 10);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, -10);
        ctx.lineTo(10, 0);
        ctx.stroke();
        ctx.fill();
        if (this.showFlame) {
            ctx.fillStyle = "#f6ca7e";
            ctx.beginPath();
            ctx.moveTo(-7.5, -5);
            ctx.lineTo(-25, 0);
            ctx.lineTo(-7.5, 5);
            ctx.fill();
        }
        ctx.restore();
    };

    utils.Ship = Ship;
//==========================图片飞船========================
    var ArrowShip = function (path) {
        this.img = new Image();
        var that = this;
        this.imgready = false;
        this.img.onload = function (e) {
            that.imgready = true;
        };
        this.img.src = path;
    };

    var ashP = ArrowShip.prototype = new Ship();

    ashP.draw = function (ctx) {
        if (!this.imgready)
            return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        if (this.showFlame) {
            ctx.drawImage(this.img, 0, 0, 99, 39, -75, -19, 99, 39);
        } else {
            ctx.drawImage(this.img, 51, 0, 48, 39, -24, -19, 48, 39);
        }
        ctx.restore();
    };

    utils.ArrowShip = ArrowShip;
//===========================Segment==================================
    function Segment(width,height,color){
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.color = (color === undefined)?"#ffffff":(typeof color==="string")?color:utils.parseColor(color);
        this.lineWidth = 1;
        this.pin = new utils.Point();
    }

    var seP = Segment.prototype;
    seP.draw = function(ctx){
        var h = this.height,
            d = this.width+ h,
            cr = h*0.5;

        ctx.save();

        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX,this.scaleY);
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0,-cr);
        ctx.lineTo(d-2*cr,-cr);
        ctx.quadraticCurveTo(-cr+d,-cr,-cr+d,0);
        ctx.lineTo(-cr+d,h-2*cr);
        ctx.quadraticCurveTo(-cr+d,-cr+h,d-2*cr,-cr+h);
        ctx.lineTo(0,-cr+h);
        ctx.quadraticCurveTo(-cr,-cr+h,-cr,h-2*cr);
        ctx.lineTo(-cr,0);
        ctx.quadraticCurveTo(-cr,-cr,0,-cr);
        ctx.closePath();
        ctx.fill();
        if(this.lineWidth>0){
            ctx.stroke();
        }

        ctx.strokeStyle = "#ffff00";
        ctx.beginPath();
        ctx.arc(0,0,2,0,(Math.PI*2),true);
        ctx.closePath();
        ctx.stroke();


        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(this.width,0,2,0,(Math.PI*2),true);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

    };

    seP.getPin = function(){
        this.pin.x = this.x+Math.cos(this.rotation)*this.width;
        this.pin.y = this.y+Math.sin(this.rotation)*this.width;
        return this.pin;
    };

    utils.Segment = Segment;
//======================Slider============================
    function Slider(min,max,value){
        this.min = (min===undefined)?0:min;
        this.max = (max===undefined)?0:max;
        this.value = (value===undefined)?100:value;
        this.onchange = null;
        this.x = 0;
        this.y = 0;
        this.width = 16;
        this.height = 100;
        this.backColor = "#cccccc";
        this.backBorderColor = "#999999";
        this.backWidth = 4;
        this.backX = this.width/2 - this.backWidth/2;
        this.handleColor = "#eeeeee";
        this.handleBorderColor = "#cccccc";
        this.handleHeight = 6;
        this.handleY = 0;
        this.updatePosition();
    }

    var slp = Slider.prototype;
    slp.updatePosition = function(){

    };

    slp.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = this.backColor;
        ctx.beginPath();
        ctx.fillRect(this.backX,0,this.backWidth,this.height);
        ctx.closePath();

        ctx.strokeStyle = this.handleBorderColor;
        ctx.fillStyle = this.handleColor;
        ctx.beginPath();
        ctx.rect(0,this.handleY,this.width,this.handleHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    };

    slp.updateValue = function(){
        var oldValue = this.value,
            handleRange = this.height - this.handleHeight,
            valueRange = this.max - this.min;
        this.value = (handleRange - this.handleY) / handleRange*valueRange + this.min;
        if(typeof this.onchange==='function'&&this.value!=oldValue){
            this.onchange();
        }
    };

    slp.updatePosition = function(){
        var handleRange = this.height - this.handleHeight,
            valueRange = this.max - this.min;
        this.handleY = handleRange - ((this.value - this.min)/valueRange)*handleRange;
    };

    slp.captureMouse = function(element){
        var self = this,
            mouse = utils.captureMouse(element,false),
            bounds = new utils.Rectangle();
        setHandleBounds();

        element.addEventListener(MouseEvent.MOUSE_DOWN,function(){
            if(utils.containsPoint(bounds,new utils.Point(mouse.x,mouse.y))){
                element.addEventListener(MouseEvent.MOUSE_MOVE,onMouseMove,false);
                element.addEventListener(MouseEvent.MOUSE_UP,onMouseUp,false);
            }
        },false);
        function onMouseUp(){
            element.removeEventListener(MouseEvent.MOUSE_MOVE,onMouseMove,false);
            element.removeEventListener(MouseEvent.MOUSE_UP,onMouseUp,false);
            setHandleBounds();
        }
        function onMouseMove(){
            var posY = mouse.y - self.y;
            self.handleY = Math.min(self.height - self.handleHeight,Math.max(posY,0));
            self.updateValue();
        }

        function setHandleBounds(){
            bounds.x = self.x;
            bounds.y = self.y + self.handleY;
            bounds.width = self.width;
            bounds.height = self.handleHeight;
        }

    };
    utils.Slider = Slider;

//===========================Tree=======================================
    function Tree(color){
        this.x = 0;
        this.y = 0;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.color = (color==="undefined")?"00ff00":color;
        this.alpha = 1;
        this.lineWidth = 1;
        this.branch = [];

        this.branch[0] = -140 - Math.random()*20;
        this.branch[1] = -30 - Math.random()*30;
        this.branch[2] = Math.random()*80-40;
        this.branch[3] = -100 - Math.random()*40;
        this.branch[4] = -60 - Math.random()*40;
        this.branch[5] = Math.random()*60-30;
        this.branch[6] = -110 - Math.random()*20;

    }

    var tp = Tree.prototype;

    tp.draw = function(ctx){

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.scale(this.scaleX,this.scaleY);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = utils.colorToRGB(this.color,this.alpha);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,this.branch[0]);
        ctx.moveTo(0,this.branch[1]);
        ctx.lineTo(this.branch[2],this.branch[3]);
        ctx.moveTo(0,this.branch[4]);
        ctx.lineTo(this.branch[5],this.branch[6]);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = utils.colorToRGB(this.color,this.alpha);

        ctx.beginPath();
        ctx.arc(0,this.branch[0],10,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.branch[2],this.branch[3],10,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.branch[5],this.branch[6],10,0,Math.PI*2,false);
        ctx.closePath();

        ctx.fill();

        //ctx.arc(this.branch[2],this.branch[3],10,0,Math.PI*2,false);
        //ctx.arc(this.branch[5],this.branch[6],10,0,Math.PI*2,false);

        ctx.restore();
    };

    utils.Tree = Tree;

//==========================Point3D==========================================
    function Point3D(x,y,z){
        this.x = (x===undefined)?0:x;
        this.y = (y===undefined)?0:y;
        this.z = (z===undefined)?0:z;
        this.fl = 250;
        this.vpX = 0;
        this.vpY = 0;
        this.cX = 0;
        this.cY = 0;
        this.cZ = 0;
    }

    var p3d = Point3D.prototype;

    /**
     * 设置透视消失点
     * @param vpx 点x坐标
     * @param vpy 点y坐标
     * **/
    p3d.setVanishingPoint = function(vpx,vpy){
        this.vpX = vpx;
        this.vpY = vpy;
    };

    /**
     * 设置中心点
     * @param cX
     * @param cY
     * @param cZ
     * **/
    p3d.setCenter = function(cX,cY,cZ){
        this.cX = cX;
        this.cY = cY;
        this.cZ = cZ;
    };

    p3d.rotateX = function(angleX){
        var cosX = Math.cos(angleX),
            sinX = Math.sin(angleX),
            y1 = this.y*cosX - this.z*sinX,
            z1 = this.z*cosX + this.y*sinX;
        this.y = y1;
        this.z = z1;
    };

    p3d.rotateY = function(angleY){
        var cosY = Math.cos(angleY),
            sinY = Math.sin(angleY),
            x1 = this.x*cosY - this.z*sinY,
            z1 = this.z*cosY + this.x*sinY;
        this.x = x1;
        this.z = z1;

    };
    p3d.rotateZ = function(angleZ){
        var cosZ = Math.cos(angleZ),
            sinZ = Math.sin(angleZ),
            x1 = this.x*cosZ - this.y*sinZ,
            y1 = this.y*cosZ + this.x*sinZ;
        this.x = x1;
        this.y = y1;
    };
    p3d.getScreenX = function(){
        var scale = this.fl/(this.fl+this.z+this.cZ);
        return this.vpX + (this.cX + this.x)*scale;

    };
    p3d.getScreenY = function(){
        var scale = this.fl/(this.fl+this.z+this.cZ);
        return this.vpY + (this.cY + this.y)*scale;
    };

    utils.Point3D = Point3D;
//========================Triangle===============================

    /**
     * Triangle类
     * 用于在三维空间中绘制三角形
     * @param a {Point3D} 顶点坐标
     * @param b {Point3D} 顶点坐标
     * @param c {Point3D} 顶点坐标
     * @param color 顶点坐标
     * **/
    function Triangle(a,b,c,color){
        this.pointA = a;
        this.pointB = b;
        this.pointC = c;
        this.color = (color===undefined)?"#ff0000":color;
        this.lineWidth = 1;
        this.alpha = 1;
        this.light = null;
    }

    var trp = Triangle.prototype;

    trp.draw = function(ctx){
        if(this.isBackFace()){
            return;
        }
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        //ctx.fillStyle = utils.colorToRGB(this.color,this.alpha);
        ctx.fillStyle = this.getAdjustedColor();
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(this.pointA.getScreenX(),this.pointA.getScreenY());
        ctx.lineTo(this.pointB.getScreenX(),this.pointB.getScreenY());
        ctx.lineTo(this.pointC.getScreenX(),this.pointC.getScreenY());
        ctx.closePath();
        ctx.fill();
        if(this.lineWidth>0){
            ctx.stroke();
        }
        ctx.restore();
    };
    /**
     * 是否背面，用于背面剔除
     * **/
    trp.isBackFace = function(){
        var cax = this.pointC.getScreenX() - this.pointA.getScreenX();
        var cay = this.pointC.getScreenY() - this.pointA.getScreenY();
        var bcx = this.pointB.getScreenX() - this.pointC.getScreenX();
        var bcy = this.pointB.getScreenY() - this.pointC.getScreenY();
        return (cax*bcy>cay*bcx);
    };
    /**
     * 获取深度，用于深度排序
     * **/
    trp.getDepth = function(){
        return Math.min(this.pointA.z,this.pointB.z,this.pointC.z);
    };

    trp.getAdjustedColor = function(){
        var color = utils.parseColor(this.color,true),
            red = color >> 16,
            green = color >> 8 & 0xff,
            blue = color & 0xff,
            lightFactor = this.getLightFactor();
        red *= lightFactor;
        green *= lightFactor;
        blue *= lightFactor;
        return utils.parseColor(red<<16|green<<8|blue);
    };

    trp.getLightFactor = function(){
        var ab = {
            x:this.pointA.x - this.pointB.x,
            y:this.pointA.y - this.pointB.y,
            z:this.pointA.z - this.pointB.z
        };
        var bc = {
            x:this.pointB.x - this.pointC.x,
            y:this.pointB.y - this.pointC.y,
            z:this.pointB.z - this.pointC.z
        };
        var norm = {
            x:(ab.y*bc.z) - (ab.z*bc.y),
            y:-((ab.x*bc.z)-(ab.z*bc.x)),
            z:(ab.x*bc.y) - (ab.y*bc.x)
        };
        /*if(!norm.x || !norm.y){
            console.log(norm.x,norm.y);
            return;
        }*/
        //console.log(norm.x,this.light , norm.y,this.light , norm.z,this.light);
        //return;
        var dotProd = norm.x*this.light.x + norm.y*this.light.y + norm.z*this.light.z;
        var normMag = Math.sqrt(norm.x*norm.x+norm.y*norm.y+norm.z*norm.z);
        var lightMag = Math.sqrt(this.light.x*this.light.x+this.light.y*this.light.y+this.light.z*this.light.z);
        return (Math.acos(dotProd/(normMag*lightMag))/Math.PI)*this.light.brightness;

    };

    utils.Triangle = Triangle;
//=====================Light==============================
    function Light(x,y,z,brightness){
        this.x = (x===undefined)?-100:x;
        this.y = (y===undefined)?-100:y;
        this.z = (z===undefined)?-100:z;
        this.brightness = (brightness===undefined)?1:brightness;
    }

    var lip = Light.prototype;
    lip.setBrightness = function(b){
        this.brightness = Math.min(Math.max(b,0),1);
    };
    utils.Light = Light;

})(window);
