
function RotatorBoxActor() {
}
RotatorBoxActor.prototype = new Actor;
RotatorBoxActor.prototype.identity = function() {
	return ('RotatorBoxActor (' +this._dom.id+ ')');
};
RotatorBoxActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.enemyClass = "BASICENEMY";
	this.enemyType = 0;

	this.scoreValue = 0;


	this.laserBoxActor = null;
	this.turnedOn = false;
	this.steppedOn = false;
	this.turnDirection = 0;

	this.boxColorNum = 0;
	this.boxColor = "#FF0000";
	this.haloAlpha = 0.4;

	this.started = false;
	this.startedTime = GAMEMODEL.getTime();

	this.size = {w:32,h:32};
	this.position = {x:0,y:0};
	this.updatePosition();

	this.radius = 24;
};
RotatorBoxActor.prototype.clear = function() {
	Actor.prototype.clear.call(this);
	this.steps = null;
};
RotatorBoxActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

RotatorBoxActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

	if(typeof this.laserBoxActor !== "undefined") {
    	var actor = this.laserBoxActor;
	 	var prop = {fill:false, color:this.boxColor}; 
	    if(this.turnedOn == false)	prop.color = this.getLaserColor(this,this.boxColorNum,'halo');
	    prop.source = "lighter";
	    prop.writeTo = -1;
	    prop.width = 2;
	    var transf = {};
	 	var shape = {type:"line",pt1:{x:0,y:0},pt2:{x:0,y:0}};
		shape.pt2.x = actor.position.x - this.position.x;
		shape.pt2.y = actor.position.y - this.position.y;
	
	    GAMEVIEW.drawElement(this.position, shape, prop, transf);
    }
 	var prop = {};     
    prop.source = "default";
    prop.writeTo = -1;
    prop.applyTo = 2;
 	var shape = {}; 
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);


    // Draw Box
 	var prop = {fill:false, color:"#999999", width:2};
 	if(this.steppedOn)		prop.color = "#666666";
 	if(this.turnedOn)		prop.fill = true;
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"box",width:this.size.w,height:this.size.h};    
    var transf = {actions:[{type:'r',angle:this.facingAngle,center:true}]};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);


 	var prop = {fill:false, color:this.boxColor, width:1};     
 	if(this.steppedOn)		prop.width = 2;
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"circle",radius:this.radius};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);


//	GAMEVIEW.drawBox(this.absBox,"#660000");
};
RotatorBoxActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	this.updatePosition();

	var curtime = GAMEMODEL.getTime();

	if(this.turnedOn && typeof this.laserBoxActor !== "undefined") {
		if(this.laserBoxActor instanceof LaserBoxActor) {
			this.laserBoxActor.changeDirection = this.turnDirection;
		}
	}
	if(!this.turnedOn && typeof this.laserBoxActor !== "undefined") {
		if(this.laserBoxActor instanceof LaserBoxActor) {
			this.laserBoxActor.changeDirection = 0;
		}
	}
/**/
	this.boxColor = this.getLaserColor(this, this.boxColorNum, 'rotator');

	this.turnedOn = false;
	this.steppedOn = false;
	this.turnDirection = 0;
};

RotatorBoxActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	Actor.prototype.collide.call(this,act);
};

RotatorBoxActor.prototype.collideType = function(act) {
	if(act == this)					return false;
	if(act instanceof CharActor)	return true;
	return false;
};
RotatorBoxActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
		if(GAMEMODEL.collideMode != "EFFECTS")			return;
		var colls = GAMEGEOM.CircleContainsPt(this.position,this.radius, act.position);
		if(colls) {
			this.steppedOn = true;
			if(act.spaceHeld) {
				this.turnedOn = true;
				this.turnDirection = act.heading.x;
				if(this.laserBoxActor instanceof LaserBoxActor) {
					this.laserBoxActor.linkedOn = true;
				}
			}
		}
	}
};

RotatorBoxActor.alloc = function() {
	var vc = new RotatorBoxActor();
	vc.init();
	return vc;
};
