/**
 * Created by gxchen on 2014/6/30.
 */
(function(window,undefined){
    var gridBox,gridCtx,rectSize;
    var grid = {
        initialize:function(gridSize){
            gridBox = document.getElementById("grid");
            gridCtx = gridBox.getContext("2d");
            rectSize = (gridSize===undefined)?10:gridSize;
            grid.drawGrid();
        },
        drawGrid:function(){
            var row = (gridBox.height%rectSize>0)?((gridBox.height/rectSize)>>0)+1:gridBox.height/rectSize,
                column = (gridBox.width%rectSize>0)?((gridBox.width/rectSize)>>0)+1:gridBox.width/rectSize;
            gridCtx.save();
            gridCtx.strokeStyle="#cccccc";
            gridCtx.lineWidth = 1;
            for(var i=1;i<row;i++){
                var y = i*rectSize;
                gridCtx.beginPath();
                gridCtx.moveTo(0,y);
                gridCtx.lineTo(gridBox.width,y);
                gridCtx.closePath();
                gridCtx.stroke();
            }
            console.log(i,row,column);
            for(var i=1;i<column;i++){
                var x = i*rectSize;
                gridCtx.beginPath();
                gridCtx.moveTo(x,0);
                gridCtx.lineTo(x,gridBox.height);
                gridCtx.closePath();
                gridCtx.stroke();
            }
            console.log(i,row,column);

            gridCtx.restore();
        }

    };
    window.grid = grid;

})(window);
