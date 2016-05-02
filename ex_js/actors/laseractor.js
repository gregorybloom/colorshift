
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
	this.laserChain = null;

	this.ticksDiff = 0;
	this.facingAngle = 0;
	this.heading = {x:0,y:0};

	this.laserMaxLength = 1500;
	this.facingAngle = 0;

	this.laserNumber = 0;
	this.laserImpact = -1;
	this.laserTip = {x:0,y:0};
	this.laserLength = this.laserMaxLength;
	this.laserOrigin = {x:0,y:0};
	this.laserHeading = this.getHeadingFromAngle(0);
	this.laserCollidedInto = null;
	this.laserCollidedOff = null;

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
};
LaserActor.prototype.killLaser = function() {
	this.alive = false;
	if(this.laserChain instanceof LaserActor)	this.laserChain.killLaser();
	else if(this.laserChain instanceof Actor)	this.laserChain.alive = false;
//	if(this.laserBoxActor instanceof LaserActor)	this.laserBoxActor.laserCollidedInto = null;
	this.laserChain = null;
};
LaserActor.prototype.matchOrKillLaser = function(pt,angle) {
	if(this.laserChain instanceof LaserActor) {
		var kill = false;
		if(this.laserChain.laserOrigin.x != pt.x)	kill = true;
		if(this.laserChain.laserOrigin.y != pt.y)	kill = true;
		if(angle != null && this.laserChain.facingAngle != angle)	kill = true;
		if(this.laserChain.laserNumber != this.laserNumber)			kill = true;
/*
		if(this.laserChain.laserOrigin.x != pt.x)	console.log('x');
		if(this.laserChain.laserOrigin.y != pt.y)	console.log('y');
		if(angle != null && this.laserChain.facingAngle != angle)	console.log('a');
		if(this.laserChain.laserNumber != this.laserNumber)			console.log('n');
/**/
		if(kill)	this.laserChain.killLaser();
		else		return false;
		return true;
	}
	return false;
};
LaserActor.prototype.addLaserAtPoint = function(pt,angle) {
	if(this.laserChain instanceof LaserActor) {
		var killed = this.matchOrKillLaser(pt,angle);
		if(!killed)		return;
	}
//	console.log('create laser at: ' +JSON.stringify(pt));

	var LA = LaserActor.alloc();
	LA.updatePosition(pt);
	LA.setLaserPoint(pt,angle);
    LA.laserNumber = this.laserNumber;

	LA.haloAlpha = this.haloAlpha;
	LA.haloWidth = this.haloWidth;
	LA.strobeStart = this.strobeStart;

    LA.laserBoxActor = this;
	this.laserChain = LA;
    GAMEMODEL.gameSession.gameWorld.addActor(LA,'laser');
    GAMEMODEL.gameSession.gameWorld.addedLaser = true;
};
LaserActor.prototype.setLaserPoint = function(orig,angle) {
	this.laserImpact = -1;
	this.laserTip = {x:0,y:0};
	this.laserLength = this.laserMaxLength;

	this.laserOrigin = {x:orig.x,y:orig.y};
	this.facingAngle = angle;
	this.laserHeading = this.getHeadingFromAngle(angle);

	this.laserCollidedInto = null;
	this.laserCollidedOff = null;

	this.laserColor = this.getLaserColor(this, this.laserNumber, "laser");
	this.haloColor = this.getLaserColor(this, this.laserNumber, "halo");
};
LaserActor.prototype.cutLaserPoint = function(imp,imppt) {
	this.laserImpact = imp;
	this.laserTip = {x:imppt.x,y:imppt.y};

	var angdiff = this.getAngleFromPoint(this.laserTip) - this.facingAngle;
	if( Math.abs(angdiff%360) > 15 )	this.laserTip = {x:this.laserOrigin.x,y:this.laserOrigin.y};

	var Lx = (this.laserTip.x-this.laserOrigin.x);
	var Ly = (this.laserTip.y-this.laserOrigin.y);
	this.laserLength = Math.sqrt(Lx*Lx+Ly*Ly);

	if(this.laserChain instanceof LaserActor) {
		var Lx = (this.laserChain.laserOrigin.x - this.laserOrigin.x);
		var Ly = (this.laserChain.laserOrigin.y - this.laserOrigin.y);
		var D = Math.sqrt(Lx*Lx+Ly*Ly);
		if( D > this.laserLength) {
			this.laserChain.killLaser();
		}
	}
};
LaserActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

LaserActor.prototype.draw = function() {
	if(!this.alive)		return;

	Actor.prototype.draw.call(this);

	var laserLayer = -1;

	var lparts = ["halo","spothalo","laser","spot"];
	for(var p in lparts)  {
		var partType = lparts[p]; 


	 		if(partType=="spot" || partType=="spothalo") {
				if(this.laserImpact < 0)		continue;
	 		}

		 	var prop = {fill:true, color:this.laserColor}; 
		    prop.source = "default";
		    prop.writeTo = laserLayer;
		    prop.width = this.haloWidth;

		 	if(partType=="halo")		prop.color = this.haloColor;
		 	if(partType=="spothalo")	prop.color = this.haloColor;
		 	if(partType=="laser")   	prop.width = 7;

		 	var originPt = this.laserOrigin;
	 		if(partType=="spot" || partType=="spothalo")	originPt = this.laserTip;

		    var transf = {};
		 	var shape = {type:"line",pt1:{x:0,y:0},pt2:{x:0,y:this.laserLength}};

	 		if(partType=="spothalo")	shape = {type:"circle",radius:(this.haloWidth/2+2)};
	 		if(partType=="spot")		shape = {type:"circle",radius:(this.haloWidth/4+1)};
	 		if(partType=="laser" || partType=="halo") 
	 		{
				if(this.laserImpact >= 0) {
					shape.pt2.x = this.laserTip.x - this.laserOrigin.x;
					shape.pt2.y = this.laserTip.y - this.laserOrigin.y;
				}
				else {
				    transf.actions=[{type:'r',angle:this.facingAngle,x:0,y:(-this.laserLength/2)}];
				}	 			
	 		}

	 		GAMEVIEW.drawElement(originPt, shape, prop, transf);

	}


 	var prop = {};     
    prop.source = "lighter";
    prop.writeTo = laserLayer;
    prop.applyTo = 1;
 	var shape = {}; 
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);

/*
 	var prop = {fill:false, color:this.laserColor, width:3};     
    prop.source = "default";
    prop.writeTo = 3;
 	var shape = {type:"circle",radius:5};    
    var transf = {};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);
/**/

};
LaserActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	if(this.laserChain instanceof LaserActor) {
		if(this.laserLength==this.laserMaxLength)	this.laserChain.killLaser();
		else	this.matchOrKillLaser(this.laserTip,null);
		if(!this.laserChain.alive)		this.laserChain = null;
	}

	this.size.w = this.laserMaxLength*2;
	this.size.h = this.laserMaxLength*2;
	this.updatePosition();

	var curtime = GAMEMODEL.getTime();

	this.setLaserPoint(this.position,this.facingAngle);
	this.laserCollidedOff = this.laserBoxActor;


	var curStrobe = GAMEMODEL.getTime();
	var fullStrobeClock = 2*this.strobeClock;
	while(curStrobe > (this.strobeStart+fullStrobeClock))	this.strobeStart += fullStrobeClock;

	var diffStrobe = curStrobe - this.strobeStart;
	var D = (diffStrobe/this.strobeClock);
	if(D >= 1)	D = 1-(D-1);

	this.haloAlpha = D*(this.alphaRange[1]-this.alphaRange[0]) + this.alphaRange[0];
	this.haloWidth = D*(this.haloRange[1]-this.haloRange[0]) + this.haloRange[0];
	if(this.laserBoxActor instanceof LaserActor) {
		this.haloAlpha = this.laserBoxActor.haloAlpha;
		this.haloWidth = this.laserBoxActor.haloWidth;
	}


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
					ctx.collideLaserVs( gameActors[j] );
            	}
        	}
        }
	};
	if(act instanceof Actor && this.collideType(act))
	{
		this.collideLaserVs(act);
	}

/*
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
	}		/**/
};
LaserActor.prototype.collideLaserVs = function(act) {
	var ctx = this;
	var checkIfLaserCrossesCircle = function(cpos,R) {
		var P = {x:0,y:0};
		P.x = cpos.x - ctx.laserOrigin.x;
		P.y = cpos.y - ctx.laserOrigin.y;

		var D = Math.sqrt( P.x*P.x + P.y*P.y );
		if(D > ctx.laserLength)		return false;

		var P2 = {x:0,y:0};
		P2.x = ctx.laserOrigin.x + ctx.laserHeading.x*D;
		P2.y = ctx.laserOrigin.y + ctx.laserHeading.y*D;

		var P1t2 = {x:0,y:0};
		P1t2.x = cpos.x - P2.x;
		P1t2.y = cpos.y - P2.y;

		var D1t2 = P1t2.x*P1t2.x + P1t2.y*P1t2.y;
		D1t2 = Math.floor(D1t2);
		if(D1t2 < R) {
			if(D <= ctx.laserLength)	return {pt2:P2,d:D};
		}
		return false;
	};


	if(act instanceof OrbActor)
	{
		if(GAMEMODEL.collideMode != "LASERBLOCK")			return false;

		var R = act.radius;
		var check = checkIfLaserCrossesCircle(act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};
			P2.x = this.laserOrigin.x + this.laserHeading.x*(check.d-R);
			P2.y = this.laserOrigin.y + this.laserHeading.y*(check.d-R);
			this.laserCollidedInto = act;
			this.cutLaserPoint(0,P2);

			this.addLaserAtPoint(P2,this.facingAngle+90);
		}
		return false;	
	}
	if(act instanceof LaserBoxActor)
	{
		if(GAMEMODEL.collideMode != "LASERBLOCK")			return false;

		var R = act.radius;
		var check = checkIfLaserCrossesCircle(act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};
			P2.x = this.laserOrigin.x + this.laserHeading.x*(check.d-R);
			P2.y = this.laserOrigin.y + this.laserHeading.y*(check.d-R);

			this.cutLaserPoint(0,P2);
			this.laserCollidedInto = act;

			return true;
		}
	}
	if(act instanceof BlockActor || act instanceof DoorActor)
	{
		if(GAMEMODEL.collideMode != "LASERBLOCK")			return false;

		if(act.solid == false)		return false;
		if(act.transparent == true)	return false;
		var R = Math.max(act.size.w*act.size.w,act.size.h*act.size.h);
		var check = checkIfLaserCrossesCircle(act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};

			var check2 = false;
			var L = check.d-2*Math.sqrt(R);
			var mL = check.d+2*Math.sqrt(R);
			if(L < 0)	L=0;
//							console.log(L + '<' + mL);
			for(var F=L; F<mL; F+=5) {
				P2.x = this.laserOrigin.x + this.laserHeading.x*F;
				P2.y = this.laserOrigin.y + this.laserHeading.y*F;
				var C = GAMEGEOM.BoxContainsPt(act.absBox,P2);
				if(  C==true  ) {
					P2.x = this.laserOrigin.x + this.laserHeading.x*(F-10);
					P2.y = this.laserOrigin.y + this.laserHeading.y*(F-10);
					check2 = true;
					break;
				}
			}
			if(check2 == true) {
				this.cutLaserPoint(0,P2);
				this.laserCollidedInto = act;
				return false;
			}		
		}
	}
	if(act instanceof SwitchActor)
	{
		if(GAMEMODEL.collideMode != "LASERTOUCH")			return false;
 		var R = act.radius;
		var check = checkIfLaserCrossesCircle(act.position,R*R);
		if(check != false) {
			var P2 = {x:0,y:0};
			P2.x = this.laserOrigin.x + this.laserHeading.x*(check.d-R);
			P2.y = this.laserOrigin.y + this.laserHeading.y*(check.d-R);

			this.cutLaserPoint(0,P2);
			this.laserCollidedInto = act;
			act.addTouchLaser(this.laserNumber);
			return false;
		}
	}
	if(act instanceof CharActor)
	{
		var R = act.radius;
		var check = checkIfLaserCrossesCircle(act.position,R*R);
		if(check != false && act.solid) {
			var P2 = {x:0,y:0};
			var P2s = {x:0,y:0};

			if(GAMEMODEL.collideMode == "LASERBLOCK" || GAMEMODEL.collideMode == "EFFECTS") {
				var drop1 = check.d;
				var drop2 = check.d-R;
				P2.x = this.laserOrigin.x + this.laserHeading.x*drop1;
				P2.y = this.laserOrigin.y + this.laserHeading.y*drop1;
				if(GAMEMODEL.collideMode != "EFFECTS")	this.cutLaserPoint(0,P2);
				this.laserCollidedInto = act;

				P2s.x = this.laserOrigin.x + this.laserHeading.x*drop2;
				P2s.y = this.laserOrigin.y + this.laserHeading.y*drop2;
				if(GAMEMODEL.collideMode == "EFFECTS")	this.cutLaserPoint(0,P2s);

				P2.x = this.laserOrigin.x + this.laserHeading.x*(drop1-R/2);
				P2.y = this.laserOrigin.y + this.laserHeading.y*(drop1-R/2);
				if(GAMEMODEL.collideMode == "EFFECTS")	act.laserBurn(this.laserNumber,P2,this.facingAngle);
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
