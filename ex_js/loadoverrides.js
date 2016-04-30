
GAMESOUNDS.load = function() {
    this.gameSFX = [];
//    this.gameSFX[0] = 'sounds/effects/Beep_Low_07.ogg';
//    this.gameSFX[1] = 'sounds/effects/Beep_Tech_01.ogg';
//    this.gameSFX[2] = 'sounds/effects/Explosion_Pulse.ogg';
};
GAMEMUSIC.load = function(domain) {
    this.gameSongs[0] = "sounds/music/Prizm.mp3";
//    this.gameSongs[1] = "sounds/music/08_from_the_legend_of_zelda_-_triforce_of_the_gods_legend_of_zelda_theme.ogg";
};
GAMEVIEW.loadTextures = function()
{
    this.loadImg(10, "images/Link.png");
    this.loadImg(11, "images/monsters.png");
    this.loadImg(13, "images/tinyset-landtiles-buf.png");
    this.loadImg(100, "images/uVQ0X.jpg");
    this.loadImg(101, "images/aTQuf.png");
    return true;
};
GAMEANIMATIONS.loadTextureFrames = function()
{
//  GAMEANIMATIONS.loadTextureFrameFromGrid = function(imgNum, size, xmax, ymax, w, h, imgW, imgH, keyPt, pixelBuffer)
    var X;  var Y;  var W;  var H;  var keypt = {};

//    this.loadTextureFrameFromGrid(10,  Math.ceil((16000/25)*(1575/25)),  (16000/25),(1575/25),  25,25,  16000,1575, {x:12.5,y:12.5}, {x:0,y:0});
/*
    var frame;
    this.loadTextureFrameFromGrid(10,  21+15+12,  21,1,  24,32,  504,104, {x:12,y:14}, {x:0,y:0});

    var frame;
    for(var a=0; a<15; a++)
    {
        frame = ImageFrame.alloc();
        X = 32*a;
        Y = 32;
        W = 32;
        H = 32;
        if(a == 5)  W = 40;
        if(a > 5)   X = 32*a + 8;
        switch(a)
        {
            case 0:
                keypt = {x:17,y:14};
                break;
            case 1:
                keypt = {x:17,y:15.5};
                break;
            case 2:
                keypt = {x:17,y:17};
                break;
            case 3:
                keypt = {x:17,y:18};
                break;
            case 4:
                keypt = {x:17,y:16.5};
                break;
            case 5:
                keypt = {x:23,y:16.5};
                break;

            case 10:
                keypt = {x:18.5,y:14};
                break;
            case 11:
                keypt = {x:20,y:14};
                break;
            case 13:
                keypt = {x:18,y:15};
                break;
            case 14:
                keypt = {x:16.5,y:16.5};
                break;
            default:
                if(a < 6)
                {
                    keypt = {x:17,y:16};
                }
                else
                {
                    keypt = {x:18,y:14};
                }
                break;
        }
        
        frame.setImageFrame(X,Y,W,H,504,104,keypt);
        this.imageSets[10].addFrame(frame, a+21);
    }
    for(var b=0; b<12; b++)
    {
        frame = ImageFrame.alloc();
        X = 32*b;
        Y = 64;
        W = 32;
        H = 40;
        switch(b)
        {
            case 7:
                keypt = {x:15.5,y:17};
                break;
            case 8:
                keypt = {x:14,y:17};
                break;
            default:
                if(b < 7)
                {
                    keypt = {x:16,y:17};
                }
                else
                {
                    keypt = {x:8,y:16};
                }
                break;
        }
        
        frame.setImageFrame(X,Y,W,H,504,104,keypt);
        this.imageSets[10].addFrame(frame, b+21+15);
    }
    
    this.loadTextureFrameFromGrid(11,  10*4,   10,4,    32,32,   10*32,4*32,   {x:16,y:16},   {x:0,y:0});
    this.imageSets[11].frameSet[12].baseKeypt = {x:16,y:18};
    this.loadTextureFrameFromGrid(12,  4*2,   4,2,    16,16,   4*16,2*16,   {x:8,y:8},   {x:0,y:0});
    this.loadTextureFrameFromGrid(13,  4*2,   4,2,    16,16,   4*(16+2),2*(16+2),   {x:8,y:8},   {x:1,y:1});
    

    this.loadTextureFrameFromGrid(100,  1,   1,1,    500,313,   500,313,   {x:250,y:157},   {x:0,y:0});
    this.loadTextureFrameFromGrid(101,  1,   1,1,    600,222,   600,222,   {x:300,y:111},   {x:0,y:0});

/*
    loadTextureFrameFromGrid(int imgNum, int size, int xmax, int ymax, int w, int h, int imgW, int imgH, Vector2D keypoint, Vector2D pixelBuffer);
    addToTextureFrameFromGrid(int imgNum, int start, int end, int xstart, int xmax, int ystart, int ymax, int w, int h, int imgW, int imgH, Vector2D pixelBuffer);
/**/
    return true;
};
GAMEANIMATIONS.loadAnimations = function()
{
    this.collections[0] = AnimationCollection.alloc();

/*
    loadSequenceForCollection(int collNum,   int SeqNum, int frameCount, 
      int imgNum, int ticksPerFrame,   int imgFrameStart, int imgFrameStep=1, Vector2D scale ); 
/**/
/*
    this.loadSequenceForCollection(0,  0,1,  11,  600,  1,1, {w:1,h:1});
    this.loadSequenceForCollection(0,  1,1,  11,  600,  2,1, {w:1,h:1});
    this.loadSequenceForCollection(0,  2,1,  11,  600,  0,1, {w:1,h:1});
    this.loadSequenceForCollection(0,  3,1,  11,  600,  2,1, {w:1,h:1});

    this.loadSequenceForCollection(0,  4,2,  11,  80,  4,1, {w:1,h:1});
        this.collections[0].sequenceSet[4].frameSet[1].imgFrameNum = 1;
    this.loadSequenceForCollection(0,  5,2,  11,  80,  5,1, {w:1,h:1});
        this.collections[0].sequenceSet[5].frameSet[1].imgFrameNum = 2;
    this.loadSequenceForCollection(0,  6,2,  11,  80,  3,1, {w:1,h:1});
        this.collections[0].sequenceSet[6].frameSet[1].imgFrameNum = 0;
    this.loadSequenceForCollection(0,  7,2,  11,  80,  5,1, {w:1,h:1});
        this.collections[0].sequenceSet[7].frameSet[1].imgFrameNum = 2;

    this.loadSequenceForCollection(0,  8,3,  11,  240,  1,1, {w:1,h:1});
        this.collections[0].sequenceSet[8].frameSet[1].imgFrameNum = 4;
        this.collections[0].sequenceSet[8].frameSet[2].imgFrameNum = 7;
    this.loadSequenceForCollection(0,  9,3,  11,  240,  5,1, {w:1,h:1});
        this.collections[0].sequenceSet[9].frameSet[1].imgFrameNum = 8;
        this.collections[0].sequenceSet[9].frameSet[2].imgFrameNum = 11;
    this.loadSequenceForCollection(0,  10,3,  11,  240,  6,1, {w:1,h:1});
        this.collections[0].sequenceSet[10].frameSet[1].imgFrameNum = 9;
        this.collections[0].sequenceSet[10].frameSet[2].imgFrameNum = 10;
    this.loadSequenceForCollection(0,  11,3,  11,  240,  5,1, {w:1,h:1});
        this.collections[0].sequenceSet[11].frameSet[1].imgFrameNum = 8;
        this.collections[0].sequenceSet[11].frameSet[2].imgFrameNum = 11;

    this.loadSequenceForCollection(0,  12,4,  11,  30,  1,1, {w:1,h:1});
        this.collections[0].sequenceSet[12].frameSet[1].imgFrameNum = 2;
        this.collections[0].sequenceSet[12].frameSet[1].scale = {w:1.5,h:1.5};
        this.collections[0].sequenceSet[12].frameSet[2].imgFrameNum = 0;
        this.collections[0].sequenceSet[12].frameSet[3].imgFrameNum = 2;

    this.loadSequenceForCollection(0,  13,1,  11,  600,  12,1, {w:1,h:1});
    
    
//  this.collections[1] = AnimationCollection.alloc();
//  this.loadSequenceForCollection(1,  0,2*4,  12,  600,  0,1, {w:1,h:1});

    this.collections[2] = AnimationCollection.alloc();
    this.loadSequenceForCollection(2,  0,2*4,  13,  600,  0,1, {w:1,h:1});

    this.collections[3] = AnimationCollection.alloc();
    this.loadSequenceForCollection(3,  0,1,  10,  6000,  17,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  1,1,  10,  6000,  10,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  2,1,  10,  6000,  3,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  3,1,  10,  6000,  10,1, {w:1,h:1});

    this.loadSequenceForCollection(3,  4,7,  10,  150,  14,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  5,7,  10,  150,  7,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  6,7,  10,  150,  0,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  7,7,  10,  150,  7,1, {w:1,h:1});

    this.loadSequenceForCollection(3,  8,9,  10,  75,  36,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  9,9,  10,  75,  27,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  10,6,  10,  100,  21,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  11,9,  10,  75,  27,1, {w:1,h:1});
    

    this.collections[300] = AnimationCollection.alloc();
    this.collections[301] = AnimationCollection.alloc();
    this.loadSequenceForCollection(300,  0,1,  100,  75,  0,1, {w:1,h:1});
    this.loadSequenceForCollection(301,  0,1,  101,  75,  0,1, {w:1,h:1});
/**/
    return true;
};

Actor.prototype.getLaserParts = function(ctx, num) {
    if(num == 0)    return [0];
    if(num == 1)    return [1];
    if(num == 2)    return [2];
    if(num == 3)    return [0,1];
    if(num == 4)    return [0,2];
    if(num == 5)    return [1,2];
    if(num == 6)    return [0,1,2];
    return false;
};
Actor.prototype.getLaserColor = function(ctx, num, type) {
    var a = 1;
    if(type == "halo")  a = ctx.haloAlpha;
    if(num == 0)    return ("rgba(255,0,0,"+a+")");
    if(num == 1)    return ("rgba(0,255,0,"+a+")");
    if(num == 2)    return ("rgba(0,0,255,"+a+")");
    if(num == 3)    return ("rgba(255,255,0,"+a+")");
    if(num == 4)    return ("rgba(255,0,255,"+a+")");
    if(num == 5)    return ("rgba(0,255,255,"+a+")");
    if(num == 6)    return ("rgba(255,255,255,"+a+")");
    return false;
};

Actor.prototype.getHeadingFromAngle = function(a) {
    var P = {x:0,y:1};
    var angle = a*Math.PI/180;
    var PX = P.x;

/*  // Clockwise rotation
    P.x = P.x*Math.cos(angle) + P.y*Math.sin(angle);
    P.y = -P.x*Math.sin(angle) + P.y*Math.cos(angle);
/**/
    // Counter-clockwise rotation
    P.x = PX*Math.cos(angle) - P.y*Math.sin(angle);
    P.y = PX*Math.sin(angle) + P.y*Math.cos(angle);
    return P;
};
Actor.prototype.getHeadingAt = function(pt) {
    var P = {x:0,y:0};
    P.x = pt.x - this.absPosition.x;
    P.y = pt.y - this.absPosition.y;
    var d = Math.sqrt(P.x*P.x + P.y*P.y);
    P.x /= d;
    P.y /= d;
    return P;
};
Actor.prototype.getAngleFromHeading = function(pt) {
    var P = {x:0,y:1};
    var angle = a*Math.PI/180;
    var PX = P.x;

/*  // Clockwise rotation
    P.x = P.x*Math.cos(angle) + P.y*Math.sin(angle);
    P.y = -P.x*Math.sin(angle) + P.y*Math.cos(angle);
/**/
    // Counter-clockwise rotation
    P.x = PX*Math.cos(angle) - P.y*Math.sin(angle);
    P.y = PX*Math.sin(angle) + P.y*Math.cos(angle);
    return P;
};
