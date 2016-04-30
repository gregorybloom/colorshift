
function OrbActor() {
}
OrbActor.prototype = new Actor;
OrbActor.prototype.identity = function() {
	return ('OrbActor (' +this._dom.id+ ')');
};
OrbActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.enemyClass = "BASICENEMY";
	this.enemyType = 0;

	this.scoreValue = 0;

	this.orbColorNum = 0;
	this.orbColor = "#FF0000";
	this.haloColor = "#FF0000";
	this.haloWidth = 5;
	this.haloAlpha = 0.4;

	this.strobeClock = 50;
	this.strobeStart = GAMEMODEL.getTime();
	this.haloRange = [4,7];
	this.alphaRange = [0.1,0.4];


	this.started = false;
	this.startedTime = GAMEMODEL.getTime();

	this.radius = 20;
	this.size = {w:this.radius*2,h:this.radius*2};
	this.position = {x:0,y:0};
	this.updatePosition();

};
OrbActor.prototype.clear = function() {
	Actor.prototype.clear.call(this);
	this.steps = null;
};
OrbActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

OrbActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

	var startRad = this.radius/2;

 	var prop = {fill:true, color:this.haloColor};     
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"circle",radius:(startRad+this.haloWidth)};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);

 	var prop = {fill:true, color:this.haloColor};     
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"circle",radius:(startRad+this.haloWidth/2)};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);


 	var prop = {fill:true, color:this.orbColor, width:1};     
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"circle",radius:startRad};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);



 	var prop = {fill:false, color:"#000000", width:1.5};     
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"circle",radius:this.radius};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);


//	GAMEVIEW.drawBox(this.absBox,"#660000");
};
OrbActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	this.updatePosition();

	var curtime = GAMEMODEL.getTime();


	var curStrobe = GAMEMODEL.getTime();
	var fullStrobeClock = 2*this.strobeClock;
	while(curStrobe > (this.strobeStart+fullStrobeClock))	this.strobeStart += fullStrobeClock;

	var diffStrobe = curStrobe - this.strobeStart;
	var D = (diffStrobe/this.strobeClock);
	if(D >= 1)	D = 1-(D-1);

	this.haloAlpha = D*(this.alphaRange[1]-this.alphaRange[0]) + this.alphaRange[0];
	this.haloWidth = D*(this.haloRange[1]-this.haloRange[0]) + this.haloRange[0];


	this.orbColor = this.getLaserColor(this, this.orbColorNum, 'orb');
	this.haloColor = this.getLaserColor(this, this.orbColorNum, "halo");

};

OrbActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	Actor.prototype.collide.call(this,act);
};

OrbActor.prototype.collideType = function(act) {
	if(act == this)					return false;
	if(act instanceof CharActor)	return true;
	return false;
};
OrbActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
		if(GAMEMODEL.collideMode != "PHYSICAL")			return;
		var colls = GAMEGEOM.CircleContainsPt(this.position,this.radius, act.position);
		if(colls) {
			act.charColorNum = this.orbColorNum;
			this.alive = false;
		}
	}
};

OrbActor.alloc = function() {
	var vc = new OrbActor();
	vc.init();
	return vc;
};
