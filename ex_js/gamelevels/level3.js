
LEVELLOADER.level3 = function() {
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:-200,y:50});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');
    GW.gamePlayer.charColorNum = 1;

    var EX = ExitActor.alloc();
    EX.updatePosition({x:-300,y:-250});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 4;
/*

    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-380,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(0);
    LB1.facingAngle = 270;


/**/
    var LB2 = LaserBoxActor.alloc();
    LB2.updatePosition({x:-380,y:-50});
    GAMEMODEL.gameSession.gameWorld.addActor(LB2,'act');
    LB2.createLaser(0);
    LB2.facingAngle = 270;
    LB2.angleRange = [235,270];
/**/


    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:-100,y:40});
    RB1.boxColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB2;


    var TA1 = TextActor.alloc();
    TA1.setFloatText("HOLD SPACE AND ARROWS",{x:0,y:0},10000,25);
    TA1.updatePosition({x:-300,y:100});
    TA1.lifeTime = 100000;
    TA1.fadeTime = 80000;
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');
    var TA1 = TextActor.alloc();
    TA1.setFloatText("TO TURN THE BEAM",{x:0,y:0},10000,25);
    TA1.updatePosition({x:-300,y:150});
    TA1.lifeTime = 100000;
    TA1.fadeTime = 80000;
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');



    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:150,y:-150});
    OB1.orbColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

    for(var Y=-320; Y<=320;Y+=40) {
        var BX2 = BlockActor.alloc();
        BX2.updatePosition({x:180,y:Y});
        BX2.transparent = false;
        GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    }

/*    for(var Y=-320; Y<=0;Y+=40) {
        var BX2 = BlockActor.alloc();
        BX2.updatePosition({x:0,y:Y});
        BX2.transparent = true;
        GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    }
/**/


};