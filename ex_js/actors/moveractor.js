
function MoverActor() {
}
MoverActor.prototype = new Actor;
MoverActor.prototype.identity = function() {
	return ('MoverActor (' +this._dom.id+ ')');
};
MoverActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.enemyClass = "BASICENEMY";
	this.enemyType = 0;

	this.scoreValue = 0;

	this.doorColorNum = 0;
	this.doorColor = "";
	this.haloAlpha = 0.5;

	this.activated = false;
	this.forward = true;
	this.startPos = {x:0,y:0};
	this.endPos = {x:0,y:0};
	this.moveSpd = 0.09;

	this.moverTargets = [];

	this.pointList = [];
	this.pointLoop = false;

	this.waiting = false;
	this.waitTime = GAMEMODEL.getTime();
	this.waitCycle = 1000;
	this.endWaitCycle = 1000;

	this.started = false;
	this.startedTime = GAMEMODEL.getTime();

	this.size = {w:50,h:50};
	this.position = {x:0,y:0};
	this.updatePosition();
};
MoverActor.prototype.clear = function() {
	Actor.prototype.clear.call(this);
	this.steps = null;
};
MoverActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

MoverActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);


    // Draw Box
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
MoverActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	this.updatePosition();

	var curtime = GAMEMODEL.getTime();




	if(this.activated && this.waiting) {
		var thisTime = GAMEMODEL.getTime();
		if(thisTime > (this.waitCycle + this.waitTime)) {
			this.waiting = false;
			this.forward = !this.forward;
		}
	}
	else if(this.activated && !this.waiting)
	{
		var heading = this.position;
		if(this.forward)		heading = this.startPos;
		else					heading = this.endPos;

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
			for(var x in this.moverTargets) {
				if(this.moverTargets[x] instanceof Actor) {
					this.moverTargets[x].shiftPosition({x:stepX,y:stepY});

					if(this.moverTargets[x] instanceof LaserBoxActor) {
						var laserActor = this.moverTargets[x].laserActor;
						if(laserActor instanceof LaserActor) {
							laserActor.updatePosition(this.moverTargets[x].position);
							if(laserActor.laserPoints.length > 0) {
								laserActor.laserPoints[0].laserOrigin = this.moverTargets[x].position;	
							}
						}
					}

				}
			}
		}
		else {
			if(this.activated && !this.waiting) {
				this.waiting = true;
				this.waitTime = GAMEMODEL.getTime();
			}
		}
	}


	this.doorColor = this.getLaserColor(this, this.doorColorNum, 'door');
};

MoverActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	Actor.prototype.collide.call(this,act);
};

MoverActor.prototype.collideType = function(act) {
	if(act == this)					return false;
	return false;
};
MoverActor.prototype.collideVs = function(act) {

};
MoverActor.alloc = function() {
	var vc = new MoverActor();
	vc.init();
	return vc;
};
