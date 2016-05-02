
function LaserActor() {
}
LaserActor.prototype = new Actor;
LaserActor.prototype.identity = function() {
	return ('LaserActor (' +this._dom.id+ ')');
};
LaserActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.enemyClass = "BASICENEMY";
	this.enemyType = 0;

	this.scoreValue = 0;

	this.laserBoxActor = null;

	this.ticksDiff = 0;
	this.facingAngle = 0;
	this.heading = {x:0,y:0};

	this.laserMaxLength = 1500;
	this.laserPoints = [];
	this.facingAngle = 0.04;

	this.laserNumber = 0;
	this.laserColor = "#FF0000";
	this.haloColor = "#FF0000";
	this.haloWidth = 19;
	this.haloAlpha = 0.4;

	this.strobeClock = 50;
	this.strobeStart = GAMEMODEL.getTime();
	this.haloRange = [13,19];
	this.alphaRange = [0.1,0.4];





	this.started = false;
	this.startedTime = GAMEMODEL.getTime();

	this.size = {w:24,h:36};
	this.position = {x:0,y:0};
	this.updatePosition();
};
LaserActor.prototype.clear = function() {
	Actor.prototype.clear.call(this);
	this.steps = null;
};
LaserActor.prototype.addLaserPoint = function(orig,angle) {
	var laserPt = {};
	laserPt.laserImpact = -1;
	laserPt.laserTip = {x:0,y:0};
	laserPt.laserLength = this.laserMaxLength;

	laserPt.laserOrigin = {x:orig.x,y:orig.y};
	laserPt.laserAngle = angle;
	laserPt.laserHeading = this.getHeadingFromAngle(angle);

	laserPt.collidedInto = null;
	laserPt.collidedOff = null;

	this.laserPoints.push(laserPt);
};
LaserActor.prototype.endLaserPoint = function(i,imp,imppt) {
	var laser = this.laserPoints[i];
	laser.laserImpact = imp;
	laser.laserTip = {x:imppt.x,y:imppt.y};

	var Lx = (laser.laserTip.x-laser.laserOrigin.x);
	var Ly = (laser.laserTip.y-laser.laserOrigin.y);
	laser.laserLength = Math.sqrt(Lx*Lx+Ly*Ly);

	while(this.laserPoints.length>(i+1))	this.laserPoints.pop();
//	for(var s=i+1; s<this.laserPoints.length; s++) {
//		delete this.laserPoints[s];
//	}
};
LaserActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

LaserActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

	var laserLayer = -1;

	var lparts = ["halo","spothalo","laser","spot"];
	for(var p in lparts)  {
		var partType = lparts[p]; 
		for(var i in this.laserPoints) {

			var laserPt = this.laserPoints[i];

	 		if(partType=="spot" || partType=="spothalo") {
				if(laserPt.laserImpact < 0)		continue;
	 		}

		 	var prop = {fill:true, color:this.laserColor}; 
		    prop.source = "default";
		    prop.writeTo = laserLayer;
		    prop.width = this.haloWidth;

		 	if(partType=="halo")		prop.color = this.haloColor;
		 	if(partType=="spothalo")	prop.color = this.haloColor;
		 	if(partType=="laser")   	prop.width = 7;

		 	var originPt = laserPt.laserOrigin;
	 		if(partType=="spot" || partType=="spothalo")	originPt = laserPt.laserTip;

		    var transf = {};
		 	var shape = {type:"line",pt1:{x:0,y:0},pt2:{x:0,y:laserPt.laserLength}};

	 		if(partType=="spothalo")	shape = {type:"circle",radius:(this.haloWidth/2+2)};
	 		if(partType=="spot")		shape = {type:"circle",radius:(this.haloWidth/4+1)};
	 		if(partType=="laser" || partType=="halo") 
	 		{
				if(laserPt.laserImpact >= 0) {
					shape.pt2.x = laserPt.laserTip.x - laserPt.laserOrigin.x;
					shape.pt2.y = laserPt.laserTip.y - laserPt.laserOrigin.y;
				}
				else {
				    transf.actions=[{type:'r',angle:laserPt.laserAngle,x:0,y:(-laserPt.laserLength/2)}];
				}	 			
	 		}

	 		GAMEVIEW.drawElement(originPt, shape, prop, transf);
	 	}
	}


 	var prop = {};     
    prop.source = "lighter";
    prop.writeTo = laserLayer;
    prop.applyTo = 1;
 	var shape = {}; 
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);

//	GAMEVIEW.drawBox(this.absBox,"#660000");
};
LaserActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	this.size.w = this.laserMaxLength*2;
	this.size.h = this.laserMaxLength*2;
	this.updatePosition();

	var curtime = GAMEMODEL.getTime();

	this.laserPoints = [];
	this.addLaserPoint(this.position,this.facingAngle);
	this.laserPoints[0].collidedOff = this.laserBoxActor;


	var curStrobe = GAMEMODEL.getTime();
	var fullStrobeClock = 2*this.strobeClock;
	while(curStrobe > (this.strobeStart+fullStrobeClock))	this.strobeStart += fullStrobeClock;

	var diffStrobe = curStrobe - this.strobeStart;
	var D = (diffStrobe/this.strobeClock);
//	if(D < 1)	D = D*D;
//	else		D = 1-(D-1)*(D-1);
	if(D >= 1)	D = 1-(D-1);

	this.haloAlpha = D*(this.alphaRange[1]-this.alphaRange[0]) + this.alphaRange[0];
	this.haloWidth = D*(this.haloRange[1]-this.haloRange[0]) + this.haloRange[0];

	if(this.getLaserColor(this, this.laserNumber, "laser")==false)	this.laserNumber=0;

	if(this.laserBoxActor instanceof LaserBoxActor) {
	    this.updatePosition(this.laserBoxActor.position);
	}

	this.laserColor = this.getLaserColor(this, this.laserNumber, "laser");
	this.haloColor = this.getLaserColor(this, this.laserNumber, "halo");
};

LaserActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	Actor.prototype.collide.call(this,act);
};

LaserActor.prototype.collideType = function(act) {
	if(act == this)					return false;
	if(act == this.laserBoxActor)	return false;
	if(act instanceof LaserBoxActor)	return true;
	if(act instanceof SwitchActor)	return true;
	if(act instanceof BlockActor)	return true;
	if(act instanceof DoorActor)	return true;
	if(act instanceof CharActor)	return true;
	if(act instanceof OrbActor)		return true;
	return false;
};
LaserActor.prototype.collideVs = function(act) {

	var recalcCollides = function(ctx,i,act,laserPt) {
		var gameActors = GAMEMODEL.gameSession.gameWorld.gameActors;
	    for(var j in gameActors)
	    {
            if(gameActors[j] instanceof Actor && gameActors[j] != act)
            {
				if( ctx.collideType(gameActors[j]) ) 
				{
					ctx.collideSegmentVs( gameActors[j],i,laserPt );
            	}
        	}
        }
	};

	if(act instanceof Actor && this.collideType(act))
	{
		var carry = false;
		for(var i in this.laserPoints) {
			var laserPt = this.laserPoints[i];

			var fau = this.collideSegmentVs(act,i,laserPt);
			carry = carry | fau;

			if(carry == true) {
//				recalcCollides(this,i,act,laserPt);
			}

		}
	}
};
LaserActor.prototype.collideSegmentVs = function(act,i,laserPt) {
	var checkIfLaserCrossesCircle = function(laserPt,cpos,R) {
		var P = {x:0,y:0};
		P.x = cpos.x - laserPt.laserOrigin.x;
		P.y = cpos.y - laserPt.laserOrigin.y;

		var D = Math.sqrt( P.x*P.x + P.y*P.y );
		if(D > laserPt.laserLength)		return false;

		var P2 = {x:0,y:0};
		P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*D;
		P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*D;

		var P1t2 = {x:0,y:0};
		P1t2.x = cpos.x - P2.x;
		P1t2.y = cpos.y - P2.y;

		var D1t2 = P1t2.x*P1t2.x + P1t2.y*P1t2.y;
		D1t2 = Math.floor(D1t2);
		if(D1t2 < R) {
			if(D <= laserPt.laserLength)	return {pt2:P2,d:D};
		}
		return false;
	};

//	if( laserPt.collidedInto == act )	return false;
//	if( laserPt.collidedOff == act )	return false;

	if(act instanceof OrbActor)
	{
		if(GAMEMODEL.collideMode != "LASERBLOCK")			return false;

		var R = act.radius;
		var check = checkIfLaserCrossesCircle(laserPt,act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};
			P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*(check.d-R);
			P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*(check.d-R);

			this.endLaserPoint(i,0,P2);
			this.laserPoints[i].collidedInto = act;
		}
		return false;	
	}
	if(act instanceof LaserBoxActor)
	{
		if(GAMEMODEL.collideMode != "LASERBLOCK")			return false;

		var R = act.radius;
		var check = checkIfLaserCrossesCircle(laserPt,act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};
			P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*(check.d-R);
			P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*(check.d-R);

			this.endLaserPoint(i,0,P2);
			this.laserPoints[i].collidedInto = act;

/*			this.addLaserPoint(P2,laserPt.laserAngle+90);
			var newPt = parseInt(i)+1;
			if(this.laserPoints[newPt].collidedOff == null) {
				this.laserPoints[newPt].collidedOff = act;					
			}		/**/
			return true;
		}
	}
	if(act instanceof BlockActor || act instanceof DoorActor)
	{
		if(GAMEMODEL.collideMode != "LASERBLOCK")			return false;

		if(act.solid == false)		return false;
		if(act.transparent == true)	return false;
		var R = Math.max(act.size.w*act.size.w,act.size.h*act.size.h);
		var check = checkIfLaserCrossesCircle(laserPt,act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};

			var check2 = false;
			var L = check.d-2*Math.sqrt(R);
			var mL = check.d+2*Math.sqrt(R);
			for(var F=L; F<mL; F+=5) {
				P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*F;
				P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*F;
				var C = GAMEGEOM.BoxContainsPt(act.absBox,P2);
				if(  C==true  ) {
					P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*(F-10);
					P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*(F-10);
					check2 = true;
					break;
				}
			}
			if(check2 == true) {
				this.endLaserPoint(i,0,P2);
				this.laserPoints[i].collidedInto = act;
				return false;
			}		
		}
	}
	if(act instanceof SwitchActor)
	{
		if(GAMEMODEL.collideMode != "LASERTOUCH")			return false;
 		var R = act.radius;
		var check = checkIfLaserCrossesCircle(laserPt,act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};
			P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*(check.d-R);
			P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*(check.d-R);

			this.endLaserPoint(i,0,P2);
			this.laserPoints[i].collidedInto = act;
			act.addTouchLaser(this.laserNumber);
			return false;
		}
	}
	if(act instanceof CharActor)
	{
		var R = act.radius;
		var check = checkIfLaserCrossesCircle(laserPt,act.position,R*R);
		if(check != false && act.solid) {
			var P2 = {x:0,y:0};
			var P2s = {x:0,y:0};

			if(GAMEMODEL.collideMode == "LASERBLOCK" || GAMEMODEL.collideMode == "EFFECTS") {
				var drop1 = check.d;
				var drop2 = check.d-R;
				P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*drop1;
				P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*drop1;
				if(GAMEMODEL.collideMode != "EFFECTS")	this.endLaserPoint(i,0,P2);
				this.laserPoints[i].collidedInto = act;

				P2s.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*drop2;
				P2s.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*drop2;
				if(GAMEMODEL.collideMode == "EFFECTS")	this.endLaserPoint(i,0,P2s);

				P2.x = laserPt.laserOrigin.x + laserPt.laserHeading.x*(drop1-R/2);
				P2.y = laserPt.laserOrigin.y + laserPt.laserHeading.y*(drop1-R/2);
				if(GAMEMODEL.collideMode == "EFFECTS")	act.laserBurn(this.laserNumber,P2,laserPt.laserAngle);
			}
			return false;
		}
	}
	return false;
};
LaserActor.alloc = function() {
	var vc = new LaserActor();
	vc.init();
	return vc;
};
