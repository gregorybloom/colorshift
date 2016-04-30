
LEVELLOADER.level6 = function() {


    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:0,y:250});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');
    GW.gamePlayer.charColorNum = 0;



    var TA1 = TextActor.alloc();
    TA1.setFloatText("COMBINE...",{x:-300,y:-100},10000,25);
    TA1.updatePosition({x:-150,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');



    var EX = ExitActor.alloc();
    EX.updatePosition({x:350,y:200});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 7;





    var M1 = MoverActor.alloc();
    M1.updatePosition({x:-200,y:-200});
    M1.startPos = {x:-200,y:-200};
    M1.endPos = {x:200,y:-200};
    GAMEMODEL.gameSession.gameWorld.addActor(M1,'obstacle');

    var LB2 = LaserBoxActor.alloc();
    LB2.updatePosition({x:-200,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB2,'act');
    LB2.createLaser(2);
    LB2.facingAngle = 0;
    M1.moverTargets.push(LB2);

    var LB4 = LaserBoxActor.alloc();
    LB4.updatePosition({x:-180,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB4,'act');
    LB4.facingAngle = 270;
    LB4.createLaser(1);
    M1.moverTargets.push(LB4);



    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-340,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.facingAngle = 180;
    LB1.createLaser(0);

    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:-340,y:200});
    RB1.boxColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB1;

    var S1 = SwitchActor.alloc();
    S1.updatePosition({x:-340,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(S1,'act');
    S1.switchTargets.push(M1);

    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:-340,y:-250});
    OB1.orbColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');


    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:300,y:-280});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.facingAngle = 0;
    LB1.createLaser(1);
    var BX2 = BlockActor.alloc();
    BX2.updatePosition({x:300,y:-280});
    BX2.transparent = true;
    GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    var M2 = MoverActor.alloc();
    M2.updatePosition({x:300,y:-280});
    M2.startPos = {x:300,y:-280};
    M2.endPos = {x:-300,y:-280};
    M2.doorColorNum = 4;
    GAMEMODEL.gameSession.gameWorld.addActor(M2,'obstacle');
    M2.moverTargets.push(LB1);
    M2.moverTargets.push(BX2);


    var S2 = SwitchActor.alloc();
    S2.updatePosition({x:200,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(S2,'act');
    S2.switchColorNum = 4;
    S2.switchTargets.push(M2);

    var BX2 = BlockActor.alloc();
    BX2.updatePosition({x:200,y:60});
    GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');

    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:200,y:-50});
    OB1.orbColorNum = 1;
//    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

/*

    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-380,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(0);
    LB1.facingAngle = 270;


/**/
/**/
/*
    for(var X=-320; X<=220;X+=40) {
        var BX2 = BlockActor.alloc();
        BX2.updatePosition({x:X,y:-200});
        BX2.transparent = true;
        GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    }
/**/



    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:300,y:280});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.facingAngle = 180;
    LB1.createLaser(2);
    var BX2 = BlockActor.alloc();
    BX2.updatePosition({x:300,y:280});
    BX2.transparent = true;
    GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');

};