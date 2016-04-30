
function TextActor() {
}
TextActor.prototype = new Actor;
TextActor.prototype.identity = function() {
	return ('TextActor ()');
};

TextActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.deadLength = 50;
	
	this.entered = false;
	this.enterTime = 0;
	this.intoTime = 3000;
	this.fadeTime = 3000;

	this.heading = {x:0,y:1};
	this.unitSpeed = 0.03;

	this.size={w:1,h:1};	
	this.text = "";
	
	this.fontSize = 24;
	this.fontCenter = false;
	
	this.startTime = 0;
	this.lifeTime = 3000;
};
TextActor.prototype.loadingData = function(data)
{
	Actor.prototype.loadingData.call(this,data);	

		this.enemyClass = "TEXTACTOR";
		this.enemyType=0;

		this.setFloatText(data.text,this.position,10000,data.fsize);

		this.stepNum=0;
};

TextActor.prototype.setFloatText = function(_txt,_pos,life,fsize) {
	this.text = _txt;

	this.updatePosition(_pos);
	
	this.lifeTime = life;
	this.fontSize = fsize;

};
TextActor.prototype.update = function() {
	Actor.prototype.update.call(this);
	this.updatePosition();
	
//	if(this.startTime == 0)		this.startTime = GAMEMODEL.gameClock.elapsedMS();		
	if(this.startTime == 0)		this.startTime = GAMEMODEL.getTime();		

	if(!this.entered) {
		var CF = GAMEMODEL.gameSession.gameWorld;
		if(GAMEGEOM.BoxContainsPt(CF.absBox, this.position)) {
			this.entered = true;
//			this.enterTime = GAMEMODEL.gameClock.elapsedMS();
			this.enterTime = GAMEMODEL.getTime();
		}
	}

};

TextActor.prototype.draw = function() {
/*
	GAMEVIEW.clearDrawMods();
	
    
        GAMEVIEW.context.globalAlpha=1.0;
        GAMEVIEW.drawModifiers.color = "#0099FF";
/**/
//		var curtime = GAMEMODEL.gameClock.elapsedMS();		
		var curtime = GAMEMODEL.getTime();		

		  var font = this.fontSize + "pt Arial";
/*      
		GAMEVIEW.fillText(this.absPosition, this.text, font,"#999999");
/**/

 		var prop = {fill:true, color:"#999999",width:2};
	    prop.source = "default";
	    prop.writeTo = -1;
	    prop.font = font;
	 	var shape = {type:"text",text:this.text};
   		var transf = {};

     	var ediff = (curtime-this.enterTime);
        if(this.entered && ediff > this.intoTime) {
        	ediff = (ediff-this.intoTime) / this.fadeTime;
//	        GAMEVIEW.context.globalAlpha=Math.max(1.0-ediff,0);
			transf = {actions:[{type:'a',alpha:Math.max(1.0-ediff,0)}]};
        }

	    GAMEVIEW.drawElement(this.position, shape, prop, transf);

		 	var prop = {};     
		    prop.source = "default";
		    prop.writeTo = -1;
		    prop.applyTo = 2;
		 	var shape = {}; 
		    var transf = {};
		    GAMEVIEW.drawElement(this.position, shape, prop, transf);
//	GAMEVIEW.context.globalAlpha=1.0;
//	GAMEVIEW.clearDrawMods();
};



TextActor.prototype.collideType = function(act) {
	return false;
};
TextActor.prototype.collideVs = function(act) {
};



TextActor.alloc = function() {
	var vc = new TextActor();
	vc.init();
	return vc;
};