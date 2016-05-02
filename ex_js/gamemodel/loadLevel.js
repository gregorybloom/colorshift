
LEVELLOADER={
};

LEVELLOADER.init = function()
{
};


LEVELLOADER.loadLevel = function(num)
{
    GAMEMODEL.currentLevel = num;
    if(num == 0)        LEVELLOADER.level0();
    if(num == 1)        LEVELLOADER.level1();
    if(num == 2)        LEVELLOADER.level2();
    if(num == 3)        LEVELLOADER.level3();
    if(num == 4)        LEVELLOADER.level4();
    if(num == 5)        LEVELLOADER.level5();
    if(num == 6)        LEVELLOADER.level6();
    if(num == 7)        LEVELLOADER.level7();



    if(num == "test1")        LEVELLOADER.leveltest1();
    if(num == "test2")        LEVELLOADER.leveltest2();

};
