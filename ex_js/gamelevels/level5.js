
LEVELLOADER.level5 = function() {
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:0,y:250});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');
    GW.gamePlayer.charColorNum = 2;

    var EX = ExitActor.alloc();
    EX.updatePosition({x:340,y:250});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 6;


/*
    var TA1 = TextActor.alloc();
    TA1.setFloatText("GET ACROSS",{x:-300,y:-100},10000,25);
    TA1.updatePosition({x:-350,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');

/*

    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-380,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(0);
    LB1.facingAngle = 270;


/**/
/**/



    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-300,y:200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(2);
    LB1.facingAngle = 260;
    LB1.angleRange = [180,270];

    var LB2 = LaserBoxActor.alloc();
    LB2.updatePosition({x:-100,y:-100});
    GAMEMODEL.gameSession.gameWorld.addActor(LB2,'act');
    LB2.createLaser(0);
    LB2.facingAngle = 270;
    LB2.angleRange = [270,450];

    var LB3 = LaserBoxActor.alloc();
    LB3.updatePosition({x:150,y:200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB3,'act');
    LB3.createLaser(1);
    LB3.facingAngle = 180;
    LB3.angleRange = [90,270];


    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:-200,y:-200});
    OB1.orbColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:50,y:-200});
    OB1.orbColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:250,y:0});
    OB1.orbColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');


    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:-300,y:-200});
    RB1.boxColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB2;


    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:300,y:-200});
    RB1.boxColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB3;

    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:300,y:200});
    RB1.boxColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB1;



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
    for(var X=-380; X<=-340;X+=40) {
        for(var Y=240; Y<=280;Y+=40) {
        var BX1 = BlockActor.alloc();
        BX1.updatePosition({x:X,y:Y});
        GAMEMODEL.gameSession.gameWorld.addActor(BX1,'obstacle');
        }
    }
    for(var Y=200; Y<=300;Y+=40) {
        var BX2 = BlockActor.alloc();
        BX2.updatePosition({x:150,y:Y});
        BX2.transparent = true;
        GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    }

    for(var Y=-100; Y>=-300;Y-=40) {
        var BX2 = BlockActor.alloc();
        BX2.updatePosition({x:-100,y:Y});
        BX2.transparent = true;
        GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    }


};