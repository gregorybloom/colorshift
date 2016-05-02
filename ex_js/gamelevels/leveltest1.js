
LEVELLOADER.leveltest1 = function()
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
    LB1.updatePosition({x:0,y:200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(0);

    var D1 = DoorActor.alloc();
    D1.updatePosition({x:-100,y:-100});
    D1.openPos = {x:-100,y:-100};
    D1.closePos = {x:-200,y:-100};
    D1.size.w = 75;
    GAMEMODEL.gameSession.gameWorld.addActor(D1,'obstacle');

    var M1 = MoverActor.alloc();
    M1.updatePosition({x:-100,y:100});
    M1.startPos = {x:-100,y:100};
    M1.endPos = {x:-300,y:100};
    GAMEMODEL.gameSession.gameWorld.addActor(M1,'obstacle');


    var LB2 = LaserBoxActor.alloc();
    LB2.updatePosition({x:-100,y:100});
    GAMEMODEL.gameSession.gameWorld.addActor(LB2,'act');
    LB2.createLaser(2);
    LB2.facingAngle = 180;
    M1.moverTargets.push(LB2);


    var S1 = SwitchActor.alloc();
    S1.updatePosition({x:00,y:-100});
    GAMEMODEL.gameSession.gameWorld.addActor(S1,'act');
    S1.switchTargets.push(D1);
    S1.switchTargets.push(M1);


    var S2 = SwitchActor.alloc();
    S2.updatePosition({x:-150,y:-200});
    S2.switchColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(S2,'act');


    var RB1 = RotatorBoxActor.alloc();
    RB1.updatePosition({x:150,y:200});
    RB1.boxColorNum = 0;
    GAMEMODEL.gameSession.gameWorld.addActor(RB1,'obstacle');
    RB1.laserBoxActor = LB1;



    var B1 = BlockActor.alloc();
    B1.updatePosition({x:100,y:000});
    GAMEMODEL.gameSession.gameWorld.addActor(B1,'obstacle');

    for(var X=-350; X<350;X+=40) {
        var BX1 = BlockActor.alloc();
        BX1.updatePosition({x:X,y:-260});
        GAMEMODEL.gameSession.gameWorld.addActor(BX1,'obstacle');
    }
    for(var Y=-220; Y<250;Y+=40) {
        var BX2 = BlockActor.alloc();
        BX2.updatePosition({x:370,y:Y});
        GAMEMODEL.gameSession.gameWorld.addActor(BX2,'obstacle');
    }



    var LB3 = LaserBoxActor.alloc();
    LB3.updatePosition({x:300,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB3,'act');
    LB3.createLaser(1);
    LB3.facingAngle = 0;
    var RB2 = RotatorBoxActor.alloc();
    RB2.updatePosition({x:-250,y:200});
    RB2.boxColorNum = 1;
    GAMEMODEL.gameSession.gameWorld.addActor(RB2,'obstacle');
    RB2.laserBoxActor = LB3;


    var D2 = DoorActor.alloc();
    D2.updatePosition({x:-350,y:-150});
    D2.openPos = {x:-350,y:-150};
    D2.closePos = {x:-350,y:100};
    D2.size = {w:20,h:50};
    GAMEMODEL.gameSession.gameWorld.addActor(D2,'obstacle');
    D2.doorColorNum = 3;
    D2.updatePosition();

    var S3 = SwitchActor.alloc();
    S3.updatePosition({x:250,y:100});
    S3.switchColorNum = 3;
    GAMEMODEL.gameSession.gameWorld.addActor(S3,'act');
    S3.switchTargets.push(D2);
//    S3.switchTargets.push(M1);


    var LB4 = LaserBoxActor.alloc();
    LB4.updatePosition({x:-300,y:-200});
    GAMEMODEL.gameSession.gameWorld.addActor(LB4,'act');
    LB4.createLaser(3);
    LB4.facingAngle = 90;

    var RB3 = RotatorBoxActor.alloc();
    RB3.updatePosition({x:100,y:-200});
    RB3.boxColorNum = 3;
    GAMEMODEL.gameSession.gameWorld.addActor(RB3,'obstacle');
    RB3.laserBoxActor = LB4;


    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:-250,y:0});
    OB1.orbColorNum = 3;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');

    var OB2 = OrbActor.alloc();
    OB2.updatePosition({x:250,y:-50});
    OB2.orbColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(OB2,'obstacle');



    var EX = ExitActor.alloc();
    EX.updatePosition({x:250,y:275});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = "test2";


            console.log("go "+GW.gameObstacles.length);
            console.log("ga "+GW.gameActors.length);
    for(var j in GW.lists) {
        var actorList = GW.lists[j];
            if(actorList.length>0)    console.log("start "+j+":"+actorList.length);
    }

};
