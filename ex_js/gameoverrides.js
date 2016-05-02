GameWorld.prototype.readInput = function(kInput) {
    var used = false;

    if(typeof kInput.buttonID !== "undefined") {
        return;
        for(var j in this.lists) {
            var actorList = this.lists[j];
            for(var i in actorList) {
                var actor = actorList[i];
                if(actor instanceof LaserBoxActor)     actor.mouseClickAt(kInput);
                if(actor instanceof BlockActor)        actor.mouseClickAt(kInput);
            }

        }
    }

    return used;
};

GAMEVIEW.drawAll = function()
{
    for(var i in this.contextArr) {
        if( this.contextArr[i].drawnOn == true || i==0) {
            this.contextArr[i].context.clearRect(0,0,800,600);
            delete this.contextArr[i].drawnOn;
        }
    }



    GAMEVIEW.drawJunk();



  if(GAMEMODEL.gameMode !== "GAME_INIT")      GAMEMODEL.drawAll();
  
//    GAMEVIEW.drawCircle({x:200,y:49500},15,"#9900ff",2);
    
    var fps = 1000 / this.avgTick;
    fps = Math.floor( fps );
    
    if(GAMEMODEL.gameMode === "GAME_MUSICPAUSE" || GAMEMODEL.gameMode === "GAME_INIT")
    {
        this.context.fillStyle = "rgba(155,155,255,0.35)";
        this.context.fillRect( 0, 0, this.screen.w, this.screen.h );

        var ScreenPt = {x:10,y:555};
        var str = "MUSIC LOADING...";
        this.context.lineWidth = "3";
        this.context.strokeStyle = "#FFFFFF";
        this.context.font = "10pt Arial";
        this.context.strokeText(str,ScreenPt.x,ScreenPt.y);
        this.context.fillStyle = "#000000";
        this.context.fillText(str,ScreenPt.x,ScreenPt.y);
    }
    else if(GAMEMODEL.gameMode === "GAME_PAUSE")
    {
        this.context.fillStyle = "rgba(255,255,255,0.35)";
        this.context.fillRect( 0, 0, this.screen.w, this.screen.h );

        var ScreenPt = {x:10,y:555};
        var str = "GAME PAUSED";
        this.context.lineWidth = "3";
        this.context.strokeStyle = "#FFFFFF";
        this.context.font = "10pt Arial";
        this.context.strokeText(str,ScreenPt.x,ScreenPt.y);
        this.context.fillStyle = "#000000";
        this.context.fillText(str,ScreenPt.x,ScreenPt.y);
    }
    /*
    var ScreenPt = {x:710,y:585};
    this.context.lineWidth = "3";
    this.context.strokeStyle = "#FFFFFF";
    this.context.font = "10pt Arial";
    this.context.strokeText(fps+" fps",ScreenPt.x,ScreenPt.y);
    this.context.fillStyle = "#000000";
    this.context.fillText(fps+" fps",ScreenPt.x,ScreenPt.y);

    var ScreenPt = {x:10,y:585};
    var str = GAMEMODEL.playerScore+" pts";
    this.context.lineWidth = "3";
    this.context.strokeStyle = "#FFFFFF";
    this.context.font = "10pt Arial";
    this.context.strokeText(str,ScreenPt.x,ScreenPt.y);
    this.context.fillStyle = "#000000";
    this.context.fillText(str,ScreenPt.x,ScreenPt.y);
/**/
    var ScreenPt = {x:110,y:585};
    var str = "";

    this.context.lineWidth = "3";
    this.context.strokeStyle = "#FFFFFF";
    this.context.font = "10pt Arial";
    this.context.strokeText(str,ScreenPt.x,ScreenPt.y);
    this.context.fillStyle = "#000000";
    this.context.fillText(str,ScreenPt.x,ScreenPt.y);
};
GAMEMODEL.update = function() {
    if(this.gameCamera != null && this.gameCamera.target instanceof Actor) {

        this.gameCamera.updatePosition( this.gameCamera.target.position );
    }
};
GAMEMODEL.readInput = function(inputobj)
{
    if(this.gameCamera != null)
    {
        var keyids = GAMECONTROL.keyIDs;    

        if(keyids['KEY_1'] == inputobj.keyID) {
//            if(!inputobj.keypress)    GAMEMODEL.goToLevel = 5;
        }
        if(keyids['KEY_2'] == inputobj.keyID) {
//            if(!inputobj.keypress)    GAMEMODEL.goToLevel = 6;
        }
        if(keyids['KEY_9'] == inputobj.keyID) {
            if(!inputobj.keypress)    GAMEMODEL.goToLevel = 6;
        }
        if(keyids['KEY_0'] == inputobj.keyID) {
            if(!inputobj.keypress)    GAMEMODEL.goToLevel = "test2";
        }

        if(keyids['KEY_DASH'] == inputobj.keyID)
        {
            keyused = true;
//            if(!inputobj.keypress)      this.gameCamera.zoomOut();
        }
        if(keyids['KEY_EQUALS'] == inputobj.keyID)
        {
            keyused = true;
//            if(!inputobj.keypress)      this.gameCamera.zoomIn();           
        }

        if(keyids['KEY_O'] == inputobj.keyID)
        {
            keyused = true;
//            if(!inputobj.keypress)      GAMEMUSIC.toggleAudio();            
        }
        if(keyids['KEY_N'] == inputobj.keyID)
        {
            keyused = true;
//            if(!inputobj.keypress)      GAMEMUSIC.nextAudio();          
        }
        if(keyids['KEY_R'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      GAMEMODEL.currentLevel = -1;          
        }
        if(keyids['KEY_SQUAREBR_RIGHT'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      GAMEMUSIC.volumeUp();           
        }
        if(keyids['KEY_SQUAREBR_LEFT'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      GAMEMUSIC.volumeDown();         
        }        
        if(keyids['KEY_M'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      
            {
                if(GAMEMUSIC.mute)    GAMEMUSIC.mute=false;
                else {
                    GAMEMUSIC.mute=true;
                }
            }
        }

        if(keyids['KEY_P'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      
            {
                GAMEMODEL.togglePause();

                if(GAMEMUSIC.musicOn)
                {
                    if(this.gameMode === "GAME_PAUSE" && GAMEMUSIC.playing)     GAMEMUSIC.pauseAudio();
                    else if(this.gameMode === "GAME_RUN" && !GAMEMUSIC.playing) GAMEMUSIC.pauseAudio();
                }

            }
        }
    }
};
GAMEVIEW.drawJunk = function()
{    
/*    var transf = {};
    var P = {x:0,y:20};     var prop = {fill:true,color:"#CC0000"};
    prop.source = "lighter";
    prop.writeTo = 1;
    var shape = {type:"circle",radius:30};
    GAMEVIEW.drawElement(P, shape, prop, transf);
    prop.color="#00CC00";    transf = {};
    transf = {actions:[{type:'t',x:20,y:35}]};      
    GAMEVIEW.drawElement(P, shape, prop, transf);
    prop.color="#0000CC";    transf = {};
    transf = {actions:[{type:'t',x:-20,y:35}]};      
    GAMEVIEW.drawElement(P, shape, prop, transf);
    prop.source = "default";        /**/

    var P = {x:0,y:20};     
    var prop = {fill:true,color:"#CC0000"};
    prop.source = "lighter";
    prop.writeTo = 1;
    var shape = {};
    var transf = {};
    GAMEVIEW.drawElement(P, shape, prop, transf);
    prop.source = "default";
};
GAMEMODEL.loadGame = function()
{
    GAMEMODEL.activeObjs = 0;

    this.gameSession.gameWorld = GameWorld.alloc();
    var GW = this.gameSession.gameWorld;
    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});


    LEVELLOADER.level0();

/**/
    console.log('loaded game');


    GAMEMUSIC.currSong=0;
    GAMEMUSIC.playAudio();
};
