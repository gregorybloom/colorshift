
function BlockActor() {
}
BlockActor.prototype = new Actor;
BlockActor.prototype.identity = function() {
	return ('BlockActor (' +this._dom.id+ ')');
};
BlockActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.enemyClass = "BASICENEMY";
	this.enemyType = 0;

	this.scoreValue = 0;

	this.activated = false;
	this.solid = true;
	this.transparent = false;

	this.started = false;
	this.startedTime = GAMEMODEL.getTime();

	this.size = {w:40,h:40};
	this.position = {x:0,y:0};
	this.updatePosition();
};
BlockActor.prototype.clear = function() {
	Actor.prototype.clear.call(this);
	this.steps = null;
};
BlockActor.prototype.loadingData = function(data)
{
	if(data.class)		this.enemyClass = data.class;
	if(data.classtype)	this.enemyType = data.classtype;
};

BlockActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);


    // Draw Box
    if(this.solid && !this.transparent)
    {
	 	var prop = {fill:true, color:"#999999"};     
	    prop.source = "default";
	    prop.writeTo = 2;
	 	var shape = {type:"box",width:this.size.w,height:this.size.h};    
	    var transf = {};
	    GAMEVIEW.drawElement(this.position, shape, prop, transf);
	}

	 	var prop = {fill:false, color:"#666666",width:4};
	    prop.source = "default";
	    prop.writeTo = 2;
	 	var shape = {type:"box",width:this.size.w,height:this.size.h};    
	    var transf = {};
	    GAMEVIEW.drawElement(this.position, shape, prop, transf);
	
	if(this.solid)
	{
	 	var prop = {fill:false, color:"#000000",width:1};
	    prop.source = "default";
	    prop.writeTo = 2;
	 	var shape = {type:"box",width:this.size.w+1,height:this.size.h+1};    
	    var transf = {};
	    GAMEVIEW.drawElement(this.position, shape, prop, transf);
	}


//	GAMEVIEW.drawBox(this.absBox,"#660000");
};
BlockActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	this.updatePosition();

	var curtime = GAMEMODEL.getTime();

	this.solid = !this.activated;

};
BlockActor.prototype.mouseClickAt = function(kInput) {

//    var screenPt = GAMEVIEW.PtToDrawCoords(this.position);
//    var d1 = kInput.pos.x-screenPt.x;
//    var d2 = kInput.pos.y-screenPt.y;
	var screenPt = GAMEVIEW.DrawPtToWorldCoords(kInput.pos);
    var clicked = GAMEGEOM.BoxContainsPt(this.absBox,screenPt);

    if(clicked) {
        if(kInput.bpress) {
            this.activated = !this.activated;
        }
    }
};

BlockActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	Actor.prototype.collide.call(this,act);
};

BlockActor.prototype.collideType = function(act) {
	if(act == this)					return false;
	return false;
};
BlockActor.prototype.collideVs = function(act) {

};
BlockActor.alloc = function() {
	var vc = new BlockActor();
	vc.init();
	return vc;
};
