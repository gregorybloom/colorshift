
LEVELLOADER.level7 = function() {
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:0,y:250});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');
    GW.gamePlayer.charColorNum = 2;



    var TA1 = TextActor.alloc();
    TA1.setFloatText("THAT IS ALL FOR NOW...",{x:-300,y:-100},10000,25);
    TA1.updatePosition({x:-150,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');



    var EX = ExitActor.alloc();
    EX.updatePosition({x:340,y:250});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 8;


/*

    var LB1 = LaserBoxActor.alloc();
    LB1.updatePosition({x:-380,y:0});
    GAMEMODEL.gameSession.gameWorld.addActor(LB1,'act');
    LB1.createLaser(0);
    LB1.facingAngle = 270;


/**/
/**/



};