

LEVELLOADER.level0 = function()
{
    var GW = GAMEMODEL.gameSession.gameWorld;
    GAMEMODEL.gameSession.gameWorld.clear();
//    GW.load();
    GW.size = {w:800,h:600};
    GW.updatePosition({x:0,y:0});

    GW.gamePlayer = CharActor.alloc();
    GW.gamePlayer.updatePosition({x:0,y:50});
    GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');


    var EX = ExitActor.alloc();
    EX.updatePosition({x:0,y:-250});
    GAMEMODEL.gameSession.gameWorld.addActor(EX,'act');
    EX.toLevel = 1;

    var TA1 = TextActor.alloc();
    TA1.setFloatText("COLORSHIFT",{x:0,y:0},10000,25);
    TA1.updatePosition({x:-100,y:-150});
    GAMEMODEL.gameSession.gameWorld.addActor(TA1,'obstacle');


    var TA2 = TextActor.alloc();
    TA2.setFloatText("Developed by",{x:0,y:0},10000,18);
    TA2.updatePosition({x:50,y:50});
    GAMEMODEL.gameSession.gameWorld.addActor(TA2,'obstacle');

    var TA3 = TextActor.alloc();
    TA3.setFloatText("Gregory Bloom",{x:0,y:0},10000,18);
    TA3.updatePosition({x:100,y:100});
    GAMEMODEL.gameSession.gameWorld.addActor(TA3,'obstacle');
    var TA4 = TextActor.alloc();
    TA4.setFloatText("Jeremy Ouillette",{x:0,y:0},10000,18);
    TA4.updatePosition({x:100,y:150});
    GAMEMODEL.gameSession.gameWorld.addActor(TA4,'obstacle');


};

