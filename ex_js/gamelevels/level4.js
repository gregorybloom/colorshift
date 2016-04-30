
LEVELLOADER.level4 = function() {
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:-200,y:-150});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');
    GW.gamePlayer.charColorNum = 2;



    var TA1 = TextActor.alloc();
    TA1.setFloatText("GET ACROSS",{x:-300,y:-100},10000,25);
    TA1.updatePosition({x:-350,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');


    var EX = ExitActor.alloc();
    EX.updatePosition({x:300,y:100});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 5;


    var S1 = SwitchActor.alloc();
    S1.updatePosition({x:300,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(S1,'act');
    S1.switchColorNum = 2;


    var M1 = MoverActor.alloc();
    M1.updatePosition({x:300,y:-150});
    M1.startPos = {x:300,y:-150};
    M1.endPos = {x:-200,y:-150};
    GAMEMODEL.gameSession.gameWorld.addActor(M1,'obstacle');
    S1.switchTargets.push(M1);
    M1.doorColorNum = 2;

    var BX2 = BlockActor.alloc();
    BX2.updatePosition({x:300,y:-150});
    GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    M1.moverTargets.push(BX2);
    var BX2 = BlockActor.alloc();
    BX2.updatePosition({x:260,y:-150});
    GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    M1.moverTargets.push(BX2);
    var BX2 = BlockActor.alloc();
    BX2.updatePosition({x:340,y:-150});
    GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    M1.moverTargets.push(BX2);


/*

    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-380,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(0);
    LB1.facingAngle = 270;


/**/
    var LB2 = LaserBoxActor.alloc();
    LB2.updatePosition({x:-300,y:200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB2,'act');
    LB2.createLaser(2);
    LB2.facingAngle = 270;
    LB2.angleRange = [235,270];
/**/
    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:-300,y:-100});
    RB1.boxColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB2;



/*
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
    for(var X=-420; X<=400;X+=40) {
        var BX1 = BlockActor.alloc();
        BX1.updatePosition({x:X,y:280});
        BX1.transparent = true;
        GAMEMODEL.gameSession.gameWorld.addActor(BX1,'obstacle');
    }

    var C = 0;
    for(var X=-100; X<=140;X+=40) {
        var LB2 = LaserBoxActor.alloc();
        LB2.updatePosition({x:X,y:280});
        GAMEMODEL.gameSession.gameWorld.addActor(LB2,'act');
        LB2.createLaser( (C%2) );
        LB2.facingAngle = 180;
        C++;
    }

};