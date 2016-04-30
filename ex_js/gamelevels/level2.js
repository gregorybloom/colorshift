
LEVELLOADER.level2 = function() {
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:-100,y:50});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');


    var EX = ExitActor.alloc();
    EX.updatePosition({x:0,y:-250});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 3;


    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-380,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(0);
    LB1.facingAngle = 270;
/*
    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:-150,y:0});
    OB1.orbColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');
/**/
    var LB2 = LaserBoxActor.alloc();
    LB2.updatePosition({x:-380,y:220});
    GAMEMODEL.gameSession.gameWorld.addActor(LB2,'act');
    LB2.createLaser(1);
    LB2.facingAngle = 270;
/**/


    var TA1 = TextActor.alloc();
    TA1.setFloatText("SHIFT RUNS",{x:0,y:0},10000,25);
    TA1.updatePosition({x:-200,y:100});
    TA1.lifeTime = 100000;
    TA1.fadeTime = 80000;
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');


    var D1 = DoorActor.alloc();
    D1.openPos = {x:-180,y:-160};
    D1.closePos = {x:-280,y:-160};
    D1.updatePosition({x:-180,y:-160});
    D1.doorColorNum = 0;
    D1.moveSpd = 0.075;
    GAMEMODEL.gameSession.gameWorld.addActor(D1,'obstacle');



    var S1 = SwitchActor.alloc();
    S1.updatePosition({x:100,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(S1,'act');
    S1.switchColorNum = 0;
    S1.switchTargets.push(D1);


    for(var X=-320; X<=120;X+=40) {
        if(X > -220 && X < -140)        continue;
        var BX1 = BlockActor.alloc();
        BX1.updatePosition({x:X,y:-160});
        BX1.transparent = true;
        GAMEMODEL.gameSession.gameWorld.addActor(BX1,'obstacle');
    }

    for(var Y=-320; Y<=320;Y+=40) {
        var BX1 = BlockActor.alloc();
        BX1.updatePosition({x:-360,y:Y});
        BX1.transparent = true;
        GAMEMODEL.gameSession.gameWorld.addActor(BX1,'obstacle');
    }

    for(var Y=-320; Y<=320;Y+=40) {
        var BX2 = BlockActor.alloc();
        BX2.updatePosition({x:160,y:Y});
        BX2.transparent = false;
        GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    }


};