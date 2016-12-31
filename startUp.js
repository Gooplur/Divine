/**
 * Created by skyeguy on 8/28/16.
 */
//load images and sounds
//IMAGES
function imageSoundLoading()
{
    var divineStarterPack = new Image();
    divineStarterPack.src = ("images/divineStarterPack.png");
    window.divineStarterPack = divineStarterPack;

    divineStarterPack.onload = function()
    {
        startGame();
    };
}

function Game()
{
    var self = this;

    //These are the X and Y coords that represent the center of the screens view into the game world.
    this.viewX = 0;
    this.viewY = 0;

    //Canvas and Context
    this.c = document.getElementById("divinity");
    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight;
    this.x = this.c.getContext("2d");
    this.resize = function()
    {
        //set size of canvas to that of the screen and reset context
        self.c.width = window.innerWidth;
        self.c.height = window.innerHeight;
        self.x = self.c.getContext("2d");
    };
    this.worldToScreen = function(wx, wy)
    {
        return [(wx-this.viewX), (wy-this.viewY)];
    };
    this.screenToWorld = function(sx, sy)
    {
        return [sx + this.viewX, sy + this.viewY];
    };

    //Variables
        //Important Game Variables
    this.mode = "navigator";
            //Navigator variables
    this.scrollSpeed = 10;
    this.scale = 1;
    this.masterVolume = 0.1;

        //Keys
    this.upKey = false;
    this.downKey = false;
    this.leftKey = false;
    this.rightKey = false;
    this.ctrlKey = false;
    this.altKey = false;
    this.wKey = false;
    this.sKey = false;
    this.aKey = false;
    this.dKey = false;
    this.minusKey = false;
    this.plusKey = false;
    this.pKey = false;
    this.oKey = false;
    this.cKey = false;
    this.lKey = false;
    this.tildKey = false;
    this.qKey = false;
    this.hKey = false;
    this.shiftKey = false;
    this.spaceKey = false;
        //Other Sensing Flags
    this.mouseX = 0;
    this.mouseY = 0;
    this.MX = 0;
    this.MY = 0;
    this.gameJustStarted = true;
        //Option Menu Toggles
    this.toggleFleetStatus = true; //show entire fleet power and integrity or none.
    this.toggleSelfStatus = true; //shows player driven ships power and integrity or not.
    this.togglePerformance = false; //Everything off of the screen is paused, or not.

    //Lists
        //Star List
    this.starsList = [];
    for (var j = -250; j < 500; j++)
    {
        for (var i = -250; i < 500; i++)
        {
            this.starsList.push([Math.random() * 400 - 200 * j, Math.random() * 400 - 200 * i, Math.random() * 3 + 1, Math.max(1, Math.random() + 0.15)]);
        }
    }
        //Ships List
    this.shipsList = [];
    this.shipsList.push(new Ship(0, 0, "Afid01", "Player", "basic", true, "Advanced", "Stocked"));

    this.shipsList.push(new Ship(10000, 500, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", false));
    this.shipsList.push(new Ship(9000, -200, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", false));
    this.shipsList.push(new Ship(14000, 1500, "Afid01", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(15500, -1000, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", false));
    this.shipsList.push(new Ship(13000, -900, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", false));
    this.shipsList.push(new Ship(15000, 2000, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", false));
    this.shipsList.push(new Ship(14750, 1700, "Afid01", "Boofeln Widget Corporation", "basic", false, "Standard", false));
    this.shipsList.push(new Ship(1400, 1100, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", false));

    /*this.shipsList.push(new Ship(5400, 0, "Afid01", "Player", "simple-missile", false, "Standard", "Scarce"));
    this.shipsList.push(new Ship(7000, 800, "Afid01", "Player", "simple", false, "Standard", false));
    this.shipsList.push(new Ship(5900, 1400, "Afid01", "Player", "basic", false, "Standard", false));
    this.shipsList.push(new Ship(6000, 1000, "Afid01", "Player", "basic-missile", false, "Standard", "Some"));*/

        //Projectiles List
    this.projectilesList = [];

        //Animations List
    this.animationsList = [];

    //Class List Activators
    this.shipListActivator = function(draw)
    {
        for (var i = 0; i < self.shipsList.length; i++)
        {
            self.shipsList[i].runSystems();
        }
    };
    this.projectileListActivator = function()
    {
        for (var i = 0; i < self.projectilesList.length; i++)
        {
            self.projectilesList[i].process();
        }
    };
    this.animationListActivator = function()
    {
        for (var i = 0; i < self.animationsList.length; i++)
        {
            self.animationsList[i].animate();
        }
    };

    //THE MAIN GAME LOOP
    this.gameLoop = function()
    {
        if (game.gameJustStarted)
        {
            game.gameJustStarted = false;
            //Event Listeners
            document.addEventListener("keydown", keyPressSensing);
            document.addEventListener("keyup", keyReleaseSensing);
            game.c.addEventListener("mousemove", mouseSensing);
        }
        //navigator
        navigator();

        alterGame();

        //GAME WORLD COORD STUFF vvvv
        game.x.save();
        game.x.translate(1/2 * game.c.width, 1/2 * game.c.height);
        game.x.scale(game.scale, game.scale);

        //background
        game.x.clearRect(0, 0, game.c.width, game.c.height);
        background();

        //activators
        self.shipListActivator();
        self.projectileListActivator();
        self.animationListActivator();

        game.x.restore();
        //GAME WORLD COORD STUFF ^^^^

        requestAnimationFrame(self.gameLoop, self.c);
    };
}

var game;
function startGame()
{
    game = new Game();
    game.gameLoop();

}

//ROTATION STUFF
function distBetweenAngles(a1, a2)
{
    var d = (Math.abs(a1 - a2) % (2 * Math.PI));

    if (d < Math.PI)
    {
        return d;
    }
    else
    {
        return (2 * Math.PI) - d;
    }
}

//BASIC DRAWING FUNCTIONS
function draw(img, strtX, strtY, width, height, myX, myY, sizeX, sizeY, rotation, discombobulated, alpha, adjX, adjY)
{
    game.x.save();
    if (discombobulated != true)
    {
        var sxy = game.worldToScreen( myX, myY );
        game.x.translate(sxy[0],sxy[1]);
    }
    if (rotation != false && typeof(rotation) != "undefined")
    {
        game.x.rotate(rotation);
    }
    if (alpha != false && typeof(alpha) != "undefined")
    {
        game.x.globalAlpha = alpha;
    }
    game.x.drawImage(img, strtX, strtY, width, height, (-1/2 * sizeX) + adjX, (-1/2 * sizeY) + adjY, sizeX, sizeY);
    game.x.restore();
}

function rectangle(solid, X, Y, W, H, fillColour, thickness, borderColour, discombobulated, rotation, alpha)
{
    game.x.save();
    if (discombobulated != true && discombobulated != "centered")
    {
        var sxy = game.worldToScreen( X, Y );
        game.x.translate(sxy[0],sxy[1]);
        //game.x.translate(X - game.viewX + 1/2 * game.c.width, Y - game.viewY + 1/2 * game.c.height);
    }
    if (rotation != false && typeof(rotation) != "undefined")
    {
        game.x.rotate(rotation);
    }
    if (alpha != false && typeof(alpha) != "undefined")
    {
        game.x.globalAlpha = alpha;
    }
    game.x.beginPath();
    if (solid == true)
    {
        if (discombobulated != true)
        {
            game.x.rect(0 - 1/2 * W, 0 - 1/2 * H, W, H);
        }
        else
        {
            game.x.rect(X, Y, W, H);
        }

        if (thickness != false)
        {
            game.x.lineWidth = thickness;
            game.x.strokeStyle = borderColour;
            game.x.stroke();
        }
        game.x.fillStyle = fillColour;
        game.x.fill();

    }
    else
    {
        if (discombobulated != true)
        {
            game.x.rect(0 - 1/2 * W, 0 - 1/2 * H, W, H);
        }
        else
        {
            game.x.rect(X, Y, W, H);
        }

        if (thickness != false)
        {
            game.x.lineWidth = thickness;
            game.x.strokeStyle = borderColour;
            game.x.stroke();
        }
        else //default rectangle outline
        {
            game.x.lineWidth = 1;
            game.x.strokeStyle = "black";
            game.x.stroke();
        }
    }
    game.x.restore();
}

function circle(solid, X, Y, radius, start, end, fillColour, thickness, borderColour, discombobulated, rotation, alpha)
{
    game.x.save();
    if (discombobulated != true)
    {
        var sxy = game.worldToScreen( X, Y );
        game.x.translate(sxy[0],sxy[1]);
        //game.x.translate(X - game.viewX + 1/2 * game.c.width, Y -game.viewY + 1/2 * game.c.height);
    }
    if (rotation != false && typeof(rotation) != "undefined")
    {
        game.x.rotate(rotation);
    }
    if (alpha != false && typeof(alpha) != "undefined")
    {
        game.x.globalAlpha = alpha;
    }
    game.x.beginPath();
    if (solid == true)
    {
        game.x.arc(0, 0, radius, start, end);
        if (thickness != false)
        {
            game.x.lineWidth = thickness;
            game.x.strokeStyle = borderColour;
            game.x.stroke();
        }
        game.x.fillStyle = fillColour;
        game.x.fill();

    }
    else
    {
        game.x.arc(0, 0, radius, start, end);
        if (thickness != false)
        {
            game.x.lineWidth = thickness;
            game.x.strokeStyle = borderColour;
            game.x.stroke();
        }
        else //default rectangle outline
        {
            game.x.lineWidth = 1;
            game.x.strokeStyle = "black";
            game.x.stroke();
        }
    }
    game.x.restore();
}

function ifInScreenDraw(x, y, size)
{
    if (x < game.viewX + 2/3 * (game.c.width / game.scale) + size * game.scale && x > game.viewX - 2/3 * (game.c.width / game.scale) - size * game.scale && y < game.viewY + 2/3 * (game.c.height / game.scale) + size * game.scale && y > game.viewY - 2/3 * (game.c.height / game.scale) - size * game.scale)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//PLAY SOUND FUNCTION
function playSound(audio, volume, time1, time2, speed)
{
    if (audio != "none")
    {
        if (typeof(speed) != "undefined" && volume != false && speed != false)
        {
            audio.playbackRate = speed;
        }
        audio.volume = game.masterVolume;
        if (typeof(volume) != "undefined" && volume != false)
        {
            audio.volume = game.masterVolume * volume;
        }
        if (typeof(time2) != "undefined" && time2 != false)
        {
            if (audio.currentTime >= time2)
            {
                audio.pause();
            }
        }
        if (audio.paused == true)
        {
            if (typeof(time1) != "undefined" && time1 != false)
            {
                audio.currentTime = time1;
            }
            else
            {
                audio.currentTime = 0;
            }
            audio.play();
        }
    }
};

function pauseSound(audio)
{
    if (audio != "none")
    {
        audio.pause();
    }
}




