var score,time,t,blin,img,loc,start=false,firstload=true,ani=false;

function preload(){
	img=new Image();
	img.src="source/pic.jpg";
	blin=setInterval("blinker();",300);
}
function blinker(){
	if (document.getElementById("start").innerHTML=="开始")
		{document.getElementById("start").innerHTML="";}
	else {document.getElementById("start").innerHTML="开始";}
		
}

function init(){
	clearInterval(t);
	clearInterval(blin);
	document.getElementById("start").innerHTML="开始";
	time = 0;
	score = 0;
	start = true;
	t = setInterval("showtime();",100);
	imageList = new Array(16);
	loc = new Array(16);
	for (var i=0;i<16;i++)loc[i]=0;
	loc[createNum()]=twoOrFour();
	loc[createNum()]=twoOrFour();
	paint();
}
function keydn(e) {
		var keycode;
		if (!e)
			e=window.event;
		if (document.all)
			keycode=e.keyCode;
		else
			keycode=e.which;
		if (keycode==37||keycode==65)
			lfmv();
		else if (keycode==38||keycode==87)
			upmv();
		else if (keycode==39||keycode==68)
			rtmv();
		else if (keycode==40||keycode==83)
			dnmv();
		else if (keycode==32)
			init();
	}
function upmv(){
	$('.box').css('animation','none');
	ani=!ani;
	if(check()){
		for (var i =0;i<4;i++){
			var row = [loc[i],loc[i+4],loc[i+8],loc[i+12]];
			row=move(row,0,i)
			for(var j=0;j<4;j++)
				loc[i+j*4]=row[j];
		}
	}
	judge();
}
function rtmv(){
	$('.box').css('animation','none');
	ani=!ani;
	if(check()){
		for (var i =0;i<4;i++){
			var row = [loc[i*4+3],loc[i*4+2],loc[i*4+1],loc[i*4]];
			row=move(row,1,i)
			for(var j=0;j<4;j++)
				loc[i*4+3-j]=row[j];
		}
	}
	judge();
}
function dnmv(){
	$('.box').css('animation','none');
	ani=!ani;
	if(check()){
		for (var i =0;i<4;i++){
			var row = [loc[i+12],loc[i+8],loc[i+4],loc[i]];
			row=move(row,2,i)
			for(var j=0;j<4;j++)
				loc[i+(12-j*4)]=row[j];
		}
	}
	judge();
}
function lfmv(){
	$('.box').css('animation','none');
	ani=!ani;
	if(check()){
		for (var i =0;i<4;i++){
			var row = [loc[i*4],loc[i*4+1],loc[i*4+2],loc[i*4+3]];
			row=move(row,3,i)
			for(var j=0;j<4;j++)
				loc[i*4+j]=row[j];
		}
	}
	judge();
}

function judge(){
	if(loc.indexOf(0)!=-1){
		loc[createNum()]=twoOrFour();
		paint();
	}
	else{
		gameover();
	}
}

function move(r,x,y){
	if(!isZero(r)){
		for (var i=0;i<4;i++)
		for (var j=0;j<3;j++){
			if (r[j]==0){
				r[j]=r[j+1];
				r[j+1]=0;
			}
		}
		for (var i=0;i<3;i++)
			if (r[i]==r[i+1]&&r[i]!=0){
				r[i]++;
				var change;
				switch (x)
				{
				case 0:
					change=y+4*i;
					break;
				case 1:
					change=y*4+3-i;
					break;
				case 2:
					change=y+12-4*i
					break;
				case 3:
					change=y*4+i;
					break;
				}
				if(ani){$("#box"+change).css("animation","change1 1s");}
				else{$("#box"+change).css("animation","change2 1s");}
				score+=Math.pow(2,r[i])				
				for(var j=i+1;j<3;j++){
					r[j]=r[j+1];
				}
				r[3]=0;					
			}
	}
	return r;	
}


function check(){
	if (start == false){
		window.alert("还没开始游戏呢！");
		return (false);
	}
	else
	return (true);
}

function isZero(q){
	return(q[0]==0 &&q[1]==0 &&q[2]==0 &&q[3]==0);
}

function showtime(){
	time+=0.1;
	$("#timetxt").text("用时 ："+time.toFixed(1)+" s");
	$("#tip").text(cishu);

}

function paint(){
	$("#scoretxt").text("分数 ：" + score);
	for (var i=0;i<16;i++){
		var c=document.getElementById("box"+i);
		var cxt=c.getContext("2d");
		cxt.drawImage(img,loc[i]*92+1,0,91,93,0,0,100,100);
	}
}
function createNum(){
	var num;
	do{
		num=Math.floor(Math.random()*16);
	}while(loc[num]!= 0);
	if(ani){$("#box"+num).css("animation","occur1 1s");}
	else{$("#box"+num).css("animation","occur2 1s");}
	return(num);
	}
function twoOrFour(){
	return((Math.random()>0.8) ? 2:1)
}
function gameover(){
	blin=setInterval("blinker();",300);
	clearTimeout(t);
	setRank(window.prompt("游戏结束啦！\n得分: " + score + ";\n用时: " + time.toFixed(1) + "s \n请输入尊姓大名：","无名英雄"),score,time);
	if (window.confirm("是否开始新的游戏?")) {
		init();
	} 
	else {
		for (var i=0;i<16;i++){
			loc[i]=16;
		}	
			score="555,你不好好玩~！";
			$("#timetxt").text("用时 ："+"555,你不陪我玩~！");
			paint();
	}
}

function setRank(userName,score,time){
	if (userName == null)return;
	if (userName == "")userName="无名英雄";
	if (userName.length>100){setRank(window.prompt("名字太长啦","无名英雄"),score,time);}
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
  		{
  			if (xmlhttp.readyState==4 && xmlhttp.status==200){
   				document.getElementById("tip").innerHTML=xmlhttp.responseText;
			}
  		}
	xmlhttp.open("POST","source/setrank.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"); 
	var date=new Date();
	xmlhttp.send("name="+userName+"&date="+date+"&score="+score+"&time="+time.toFixed(1));
}	

function showRank(){
	var Nm=new Array();
	var Sc=new Array();
	var backdata,backdataArr;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
  	{						
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			document.getElementById("rankList").innerHTML=xmlhttp.responseText;
			var date= new Date() 
			$("#tip").text("The ranking list has been refreshed at "+date.getHours()+":"+date.getMinutes())
   		}
	}
	xmlhttp.open("POST","source/getrank.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"); 
	xmlhttp.send();
}
