var chess = document.getElementById("chess");
var ctx = chess.getContext("2d");

var w = chess.width;
var h = chess.height;

var l = 15;  //棋盘维度
var bw = 30;  //棋盘边框

var bl = (w-2*bw)/(l-1); // 棋盘间距
var r = bl/2-5;      //棋子半径

var black = {col1:"#0A0A0A",col2:"#636766"};
var white = {col1:"#CCC",col2:"#fff"}

var me = true;
var rate = chess.width/chess.offsetWidth;

var over = false;

var chessList = [];

for(var i = 0; i<l;i++){
	chessList[i]=[];
	for(var j =0;j<l;j++){
		chessList[i][j]=0;
	}
}


//赢法数组
//
var wins = [];

for(var i = 0 ;i<l ;i++){
  wins[i]=[];
  for(var j =0;j<l;j++){
     wins[i][j]=[];
  }
}

var count = 0;
//横线赢法
for(var i =0;i<l;i++){
   for(var j =0;j<l-4;j++){
     for(var k =0;k<5;k++){
        wins[i][j+k][count] = true;
     }
     count++;
   }
}
//竖线赢法
for(var i =0;i<l-4;i++){
   for(var j =0;j<l;j++){
     for(var k =0;k<5;k++){
        wins[i+k][j][count] = true;
     }
     count++;
   }
}

//反斜线赢法
for(var i =0;i<l-4;i++){
   for(var j =0;j<l-4;j++){
     for(var k =0;k<5;k++){
        wins[i+k][j+k][count] = true;
     }
     count++;
   }
}

for(var i =0;i<l-4;i++){
   for(var j =4;j<l;j++){
     for(var k =0;k<5;k++){
        wins[i+k][j-k][count] = true;
     }
     count++;
   }
}


//console.log(count); 572
//赢法统计数组
//
var myWin = [];
var computerWin = [];
for(var i = 0 ;i<count ;i++){
   myWin[i] = 0;
   computerWin[i]=0;
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

function oneStep(i,j,chess){

       	drawChess(i,j,chess);
       
}

function chessInit(){
	drawChessBoard();
}

chess.onclick = function(e){
     if(over){
      return;
     }
     var x = e.offsetX;
     var y = e.offsetY;

     var i = Math.floor(rate*x/bl);
     var j = Math.floor(rate*y/bl);
    
     if(!chessList[i][j]){
         if(me){
            oneStep(i,j,black);
            chessList[i][j]=1;

            for(var k = 0 ; k<count;k++){
               if(wins[i][j][k]){
                    myWin[k]++;
                    computerWin[k]=6;

                    if(myWin[k]==5){
                      alert("你赢啦！");
                       over = true;
                    }
                 }
             }
         }else{
            oneStep(i,j,white);
            chessList[i][j]=2;
         }

         me = !me;
     }
     
    
}