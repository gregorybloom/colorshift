
function SelectorActor() {
}
SelectorActor.prototype = new Actor;
SelectorActor.prototype.identity = function() {
	return ('SelectorActor (' +this._dom.id+ ')');
};
SelectorActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.enemyClass = "BASICENEMY";
	this.enemyType = 0;

	this.scoreValue = 0;

	this.ticksDiff = 0;
	this.facingAngle = 0;
	this.heading = {x:0,y:0};

	this.target = null;

	this.size = {w:24,h:36};
	this.position = {x:0,y:0};
	this.updatePosition();
};
SelectorActor.prototype.clear = function() {
	Actor.prototype.clear.call(this);
	this.steps = null;
};

SelectorActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

SelectorActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

 	var prop = {fill:true, color:"#000099"};     
    prop.source = "default";
    prop.writeTo = 2;
 	var shape = {type:"circle",width:this.absBox.w,height:this.absBox.h};    
    var transf = {actions:[{type:'r',angle:this.facingAngle,center:true}]};
    GAMEVIEW.drawElement(this.position, shape, prop, transf);

//	GAMEVIEW.drawBox(this.absBox,"#660000");
};
SelectorActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	var curtime = GAMEMODEL.getTime();

	this.facingAngle += this.angleChange*this.ticksDiff;
	if(this.facingAngle > 360)		this.facingAngle-=360;

};

SelectorActor.prototype.getHeadingAt = function(pt) {
	var P = {x:0,y:0};
	P.x = pt.x - this.absPosition.x;
	P.y = pt.y - this.absPosition.y;
	var d = Math.sqrt(P.x*P.x + P.y*P.y);
	P.x /= d;
	P.y /= d;
	return P;
};
SelectorActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	Actor.prototype.collide.call(this,act);
};

SelectorActor.alloc = function() {
	var vc = new SelectorActor();
	vc.init();
	return vc;
};
