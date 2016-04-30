
function DoorActor() {
}
DoorActor.prototype = new Actor;
DoorActor.prototype.identity = function() {
	return ('DoorActor (' +this._dom.id+ ')');
};
DoorActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.enemyClass = "BASICENEMY";
	this.enemyType = 0;

	this.scoreValue = 0;

	this.solid = true;
	this.transparent = false;

	this.doorColorNum = 0;
	this.doorColor = "";
	this.haloAlpha = 0.5;

	this.activated = false;
	this.openPos = {x:0,y:0};
	this.closePos = {x:0,y:0};

	this.moveSpd = 0.09;

	this.started = false;
	this.startedTime = GAMEMODEL.getTime();

	this.size = {w:100,h:20};
	this.position = {x:0,y:0};
	this.updatePosition();
};
DoorActor.prototype.clear = function() {
	Actor.prototype.clear.call(this);
	this.steps = null;
};
DoorActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

DoorActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);


    // Draw Box
 	var prop = {fill:true, color:"#999999"};     
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"box",width:this.size.w,height:this.size.h};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);

 	var prop = {fill:false, color:this.doorColor,width:4};
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"box",width:this.size.w-2,height:this.size.h-2};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);

 	var prop = {fill:false, color:"#000000",width:1};
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"box",width:this.size.w+1,height:this.size.h+1};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);



//	GAMEVIEW.drawBox(this.absBox,"#660000");
};
DoorActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	this.updatePosition();

	var curtime = GAMEMODEL.getTime();

	var heading = this.position;
	if(this.activated)		heading = this.openPos;
	else					heading = this.closePos;

	var distX = heading.x - this.position.x;
	var distY = heading.y - this.position.y;

	heading = this.getHeadingAt({x:heading.x,y:heading.y});
	if( !isNaN(heading.x) && !isNaN(heading.y) )
	{
		var stepX = heading.x * this.ticksDiff * this.moveSpd;
		var stepY = heading.y * this.ticksDiff * this.moveSpd;
		if( Math.abs(stepX) > Math.abs(distX))	stepX = distX;
		if( Math.abs(stepY) > Math.abs(distY))	stepY = distY;
		this.shiftPosition({x:stepX,y:stepY});
	}

	this.doorColor = this.getLaserColor(this, this.doorColorNum, 'door');
};
DoorActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	Actor.prototype.collide.call(this,act);
};

DoorActor.prototype.collideType = function(act) {
	if(act == this)					return false;
	return false;
};
DoorActor.prototype.collideVs = function(act) {

};
DoorActor.alloc = function() {
	var vc = new DoorActor();
	vc.init();
	return vc;
};
