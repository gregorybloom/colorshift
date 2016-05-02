
LEVELLOADER.leveltest2 = function()
{
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:0,y:250});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');


    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-150,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.facingAngle = 0;
    LB1.createLaser(0);

    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:-150,y:200});
    RB1.boxColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB1;



    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:50,y:-200});
    OB1.orbColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:150,y:-180});
    OB1.orbColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:-350,y:-180});
    OB1.orbColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');
    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:150,y:180});
    OB1.orbColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');
    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:100,y:-100});
    OB1.orbColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');
    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:100,y:100});
    OB1.orbColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');
    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:300,y:150});
    OB1.orbColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');
    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:200,y:0});
    OB1.orbColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:0,y:200});
    OB1.orbColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');
    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:-50,y:150});
    OB1.orbColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');






    var B1 = BlockActor.alloc();
    B1.updatePosition({x:-150,y:-200});
    B1.transparent = true;
    GAMEMODEL.gameSession.gameWorld.addActor(B1,'obstacle');

    var B2 = BlockActor.alloc();
    B2.updatePosition({x:-150,y:-240});
    GAMEMODEL.gameSession.gameWorld.addActor(B2,'obstacle');

    var B2 = BlockActor.alloc();
    B2.updatePosition({x:150,y:0});
//    GAMEMODEL.gameSession.gameWorld.addActor(B2,'obstacle');



        for(var Y=-160; Y<=280;Y+=40) {
        var BX1 = BlockActor.alloc();
        BX1.updatePosition({x:380,y:Y});
        GAMEMODEL.gameSession.gameWorld.addActor(BX1,'obstacle');
        }

            console.log("go "+GW.gameObstacles.length);
            console.log("ga "+GW.gameActors.length);
    for(var j in GW.lists) {
        var actorList = GW.lists[j];
            if(actorList.length>0)    console.log("start "+j+":"+actorList.length);
    }

};
