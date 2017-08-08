var chess = document.getElementById("chess");
var ctx = chess.getContext("2d");

var w = chess.width;
var h = chess.height;

var l = 15;
var bw = 30;

var bl = (w-2*bw)/(l-1);
var r = bl/2-5;

var black = {col1:"#0A0A0A",col2:"#636766"};
var white = {col1:"#CCC",col2:"#fff"}

var me = true;
var rate = chess.width/chess.offsetWidth;

var chessList = [];

for(var i = 0; i<l;i++){
	chessList[i]=[];
	for(var j =0;j<l;j++){
		chessList[i][j]=0;
	}
}

function drawChessBoard(){
	ctx.strokeStyle="#666";
    ctx.lineWidth =1;

	for(var i = 0 ; i< l;i++){
		var x = i*((w-2*bw)/(l-1))+bw;
		var y = w-bw;
		ctx.moveTo(x,bw);
		ctx.lineTo(x,y);
		ctx.stroke();
		ctx.moveTo(bw,x);
		ctx.lineTo(y,x);
		ctx.stroke();
	}

}

function drawChess(i,j,me){
   ctx.beginPath();
   ctx.arc(bw+bl*i,bw+bl*j,r,0,2*Math.PI);
   ctx.closePath();
   var gradient = ctx.createRadialGradient(bw+bl*i,bw+bl*j,r,bw+bl*i,bw+bl*j,r/3);
   gradient.addColorStop(0,me.col1);
   gradient.addColorStop(1,me.col2);
   ctx.fillStyle= gradient;
   ctx.fill();
}

function oneStep(i,j){

     if(!chessList[i][j]){
     	drawChess(i,j,me?black:white);
        me=!me;
        chessList[i][j]=1;
     }
}

function chessInit(){
	drawChessBoard();
}

chess.onclick = function(e){
     var x = e.offsetX;
     var y = e.offsetY;

     var i = Math.floor(rate*x/bl);
     var j = Math.floor(rate*y/bl);
    
     oneStep(i,j);
}