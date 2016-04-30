
LEVELLOADER.level1 = function()
{
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:0,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');


    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-300,y:-100});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(2);
    LB1.facingAngle = 270;

    var EX = ExitActor.alloc();
    EX.updatePosition({x:0,y:-250});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 2;

    var TA1 = TextActor.alloc();
    TA1.setFloatText("COLORSHIFT",{x:0,y:0},10000,25);
    TA1.updatePosition({x:-100,y:-150});
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');



    var OB1 = OrbActor.alloc();
    OB1.updatePosition({x:-250,y:0});
    OB1.orbColorNum = 2;
    GAMEMODEL.gameSession.gameWorld.addActor(OB1,'obstacle');


    for(var X=-400; X<=400;X+=40) {
        if(X > -100 && X < 100)     continue;
        var BX1 = BlockActor.alloc();
        BX1.updatePosition({x:X,y:-60});
        GAMEMODEL.gameSession.gameWorld.addActor(BX1,'obstacle');
    }
};
