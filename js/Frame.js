//global variables
//objects in canvas & frames
var dude,dudecopy,skycopy,sky,sky2,sun,suncopy,gate,guard,darksky,bubble,W,H;
var frame=[],text=[];
var dudewidth,sunwidth,control=1,forward=true,lineno=0;
var maxX=20,minX,talkinitiated=false,timecounter=0;
var orgW=1000,orgH=600;
// initialise loaders for each frame, work on loading meter
function init() {
	while(window.matchMedia("(orientation: portrait)").matches) {
		alert("Please switch to Landscape View");
		if(window.matchMedia("(orientation: landscape)").matches){
			break;
		}
	}

	if (window.matchMedia("(orientation: landscape)").matches) {
   
	window.addEventListener("resize", resize);
	frame.push(new createjs.Stage("intro1"));
     frame.push(new createjs.Stage("intro2"));
	// grab canvas width and height for later calculations:
	W = frame[0].canvas.width;  //constant for all frames
	H = frame[0].canvas.height;
	//resize();
	positionFrame();
     // loading every graphic before hand
	manifest = [
     {src: "../resources/images/skybg_1.png", id: "sky"},
     {src:"../resources/images/skybg2.png",id:"darksky"},
	{src:"../resources/images/moon.png",id:"sun"},
	{src:"../resources/images/mainavatar.png",id:"dude"},
	{src:"../resources/images/guard.png",id:"guard"},
	{src:"../resources/images/gates.png",id:"gates"},
	{src:"../resources/images/talk.png",id:"bubble"}
	];
     loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
	createjs.Ticker.addEventListener("tick", counter);
	createjs.Ticker.interval=2000; //in ms
	}
}

//initialise each frame
function handleComplete() {
     initFrameElements();
	frame[0].addChild(sky,dude,sun);
	dudecopy=frame[0].getChildAt(1).clone(true);
	dudecopy.x-=W;
	suncopy=frame[0].getChildAt(2).clone(true);
	suncopy.x-=W;
	frame[1].addChild(sky2,dudecopy,suncopy,guard,gate);
	updateAll(event);
}

function initFrameElements()
{
     //=======================================background-sky==================================
     var skyimg=loader.getResult("sky");
     sky = new createjs.Shape();
     sky.graphics.beginBitmapFill(skyimg).drawRect(0, 0, W, H);
     sky.x=0;
     sky.y=0;
     sky.scaleX=W/skyimg.width;
     sky.scaleY=(H)/skyimg.height;

	//=======================================================================================
	var darkskyimg=loader.getResult("darksky");
     sky2 = new createjs.Shape();
     sky2.graphics.beginBitmapFill(darkskyimg).drawRect(0, 0, darkskyimg.width, darkskyimg.height);
     sky2.x=0;
     sky2.y=0;
     sky2.scaleX=W/darkskyimg.width;
     sky2.scaleY=(H)/(darkskyimg.height);


	//=====================================background-sun====================================
	var sunimg=loader.getResult("sun");
     sun = new createjs.Shape();
     sun.graphics.beginBitmapFill(sunimg).drawCircle(87, 89, 89);
	sunwidth=sunimg.width;
     sun.setTransform(W-W/30-sunwidth,H/30,W/(10*sunimg.width),W/(10*sunimg.width));

	//=====================================gate=====================================




	var gateimg=loader.getResult("gates");
     var gatesheet = new createjs.SpriteSheet({
     framerate: 10,
     images: [gateimg],
     frames: {width:400, height:700, count:5, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
	"pool":[0,4,"pool",0.1],
     }
     });
	gate = new createjs.Sprite(gatesheet, "pool");
	gatewidth=gate.getBounds().width;
	gate.setTransform(W-gatewidth+100 , H/5, W/(4*gatewidth),H/(1.3*gate.getBounds().height));

	//=====================================guard=====================================
	var guardimg=loader.getResult("guard");
     var guardsheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [guardimg],
     frames: {width:175, height:190, count:4, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
	"stand":[0,0,"stand"],
     "point":[0,3,"pointpos",0.1],
	"pointpos":[3,3,"pointpos"]
     }
     });
	guard = new createjs.Sprite(guardsheet, "stand");
	guardwidth=guard.getBounds().width; //equal in every frame
	guard.y=H-250;
	guard.x=W-guardwidth-300;

     //======================================main-Avatar=======================================

     var dudeimg=loader.getResult("dude");
     var dudeSheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [dudeimg],
     frames: {width:250, height:190, count:7, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "stand":[6,6,"stand"],
     "runf": [0, 6,"runf",0.2],
     "runb":{
		frames:[6,5,4,3,2,1,0],
		next:"runb",
		speed:0.2
	}
     }
     });
	dude = new createjs.Sprite(dudeSheet, "runf");
	dudewidth=dude.getBounds().width; //equal in every frame
	dude.y=H-250;
	dude.x=-dudewidth;
	//=============================bubble and text================================
	var bubbleimg=loader.getResult("bubble");
     bubble = new createjs.Shape();
     bubble.graphics.beginBitmapFill(bubbleimg).drawRect(0, 0, 206, 150);
	bubble.x=W/10;
	bubble.y=H/4;
	bubble.scaleX=W/(2*bubbleimg.width);
	bubble.scaleY=W/(4*bubbleimg.height);
	text.push("Its seems like you are Lost kid");
	text.push("        I am The Guardian of this\n                    PORTAL.");
 	text.push("        This portal will materialize\n                you straight to \n                        J.I.I.T.");
	text.push("            J.I.I.T's technical fest,\n             CYBER SRISHTI \n            is around the corner.");
	text.push("  The portal is under construction,\n                See Yaa Soon !!");
	text.push("                    Back off !!...\n                            ;[ ");
}
var x=0;
function markThe(event)
{
	if(dudecopy.x<(W/10-100)||(scrolldelta<0 && !talkinitiated))
	{
		play1(event,dude,sun);
		play1(event,dudecopy,suncopy);
		movecontainerbackward=dude.x>W/4?true:false;
		setanimation(guard,"stand",guard.currentAnimation);
		lineno=0;
		talkinitiated=false;
		frame[1].removeChildAt(5,6);
	}
	else
	{
		if(parseInt(document.getElementById("mymain_container").style.left)<=minX)
			movecontainerbackward=false;
		setanimation(dudecopy,"stand",dudecopy.currentAnimation);
		if(guard.currentAnimation!="pointpos")
			setanimation(guard,"point",guard.currentAnimation);

		if(dudecopy.currentAnimation=="stand"&&guard.currentAnimation=="pointpos")
		{
			//initiate talk
			talkinitiated=true;
			if(x!=timecounter && lineno<text.length)
			{
				var mytext=text[ lineno ];
	  			var writetext = new createjs.Text(mytext, "30px Book Antiqua bold", "rgba(0,0,0,1)");
				writetext.x=W/7;
				writetext.y=H/3;
				frame[1].removeChildAt(5,6);
				frame[1].addChild(bubble,writetext);
				lineno++;
				x=timecounter;
			}
		}
		if(scrolldelta<0 && talkinitiated)
			lineno--;

		if(lineno<0||lineno>=text.length-1)
			talkinitiated=false;

	}
	updateAll(event);
}

function updateAll(event)
{
	frame[0].update(event);
	frame[1].update(event);
}

function play1(event,dudeobj,sunobj)
{
	var pos=dudeobj.x+(scrollsenstivity*scrolldelta);
	if(dude.x>=-dudewidth)
	{
		dudeobj.x=pos;
		if(scrolldelta>0)
			{setanimation(dudeobj,"runf",dudeobj.currentAnimation);}
		else
			{setanimation(dudeobj,"runb",dudeobj.currentAnimation);}
	}
	else
		dude.x=-dudewidth;
	sunobj.x=dudeobj.x+(W-W/30-sunwidth);
}

function setanimation(obj,set,old)
{
	if(set!=old)
	{
		obj.gotoAndPlay(set);
	}
}

function positionFrame()
{
	var x=(window.innerHeight-H)/2;
	document.getElementById("mymain_container").style.top = x+"px";
	document.getElementById("mymain_container").style.width = W+"px";
	document.getElementById("mymain_container").style.height = H+"px";
	//intro image
	document.getElementById("introimg").style.width =(window.innerWidth)+"px";
	document.getElementById("introimg").style.height =(window.innerHeight) +"px";
	minX=($(window).width()-(2*(W+maxX)));
}

//resize event
function resize() {

    W = $(window).width()*0.9;
    H= $(window).height()*0.9;
    positionFrame();
    //alert("coming "+W+" "+H+" "+window.innerWidth+" "+$(window).width());

}

function counter()
{
	timecounter++;
}
