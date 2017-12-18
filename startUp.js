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

    var divineKitA = new Image();
    divineKitA.src = ("images/divineKitA.png");
    window.divineKitA = divineKitA;

    var divineKitB = new Image();
    divineKitB.src = ("images/divineKitB.png");
    window.divineKitB = divineKitB;

    var divineKitC = new Image();
    divineKitC.src = ("images/divineKitC.png");
    window.divineKitC = divineKitC;

    divineStarterPack.onload = function()
    {
        divineKitA.onload = function()
        {
            divineKitB.onload = function()
            {
                divineKitC.onload = function()
                {
                    startGame();
                };
            };
        };
    };
}

function Game()
{
    var self = this;
    this.state = "Divine"; //This determines which game is playing and what is paused.

    //These are the X and Y coords that represent the center of the screens view into the game world.
    this.viewX = 0;
    this.viewY = 0;

    //Player Focused Public Variables
    this.checks = 10000;
    this.playerX = 0;
    this.playerY = 0;
    this.playerHUDColor = "white";
    //Navigator Variables
    this.navToggle = 0;

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
    this.coordinates = false;
            //Navigator variables
    this.scrollSpeed = 10;
    this.scale = 1;
    this.masterVolume = 0.1;

        //UI variables
    this.planetMenu = false;
    this.planetMenuList = [];
    this.userShipLocator = -1; //this locates the position of the user's ship in the shipList at the time of activating the menu.
    this.currentPlanetLocator = -1; //this stores a copy of the object that is the planet the player ship is presently interacting with.
    this.interInventory = false;
    this.interInv1 = [];
    this.interInv2 = [];
    this.interContext = "none";
    this.interInvCargoMAX1 = 1;
    this.interInvCargoMAX2 = 1;
    this.interEmptyList = []; //Nothing goes in this list. Its soul purpose is to be empty for the inventory context.
    this.interBuyRate = 0.5; //what percentage shops will pay for your goods.
    this.interSellRate = 1; //what percentage shops will sell there goods at.
    this.interDockingFee = 55;
    this.interCoords = [0, 0];

    //shipItem to Ship Converter List (changes ship items into real ships)
    this.shipConverterList = [];

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
    this.rKey = false;
    this.eKey = false;
    this.iKey = false;
    this.uKey = false;
    this.yKey = false;
    this.kKey = false;
    this.shiftKey = false;
    this.spaceKey = false;
    this.tabKey = false;
        //Other Sensing Flags
    this.click = false;
    this.unclick = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.MX = 0;
    this.MY = 0;
    this.gameJustStarted = true;
        //Menu Variables
    this.draggedItem = false;
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
        //Scenery List (asteroids, cargo holds, etc.)
    this.sceneryList = [];
    this.sceneryList.push(new Scenery(25000, -25000, "planet", [], "Aztlan"));
    this.sceneryList.push(new Scenery(-13266, -41523, "planet", [], "Kurm"));
    this.sceneryList.push(new Scenery(-19898, -37713, "planet", [], "Dorshun"));

        //Ships List
    this.shipsList = [];
    this.shipsList.push(new Ship(25000, -25000, "Afid01", "Player", "basic", false, "Advanced", "Stocked"));
    this.shipsList.push(new Ship(25000, -25000, "Disk01", "Player", "basic", false, "Advanced", "Stocked"));
    this.shipsList.push(new Ship(25000, -25000, "Mantis09", "Player", "swooper-missile", false, "Advanced", "Stocked"));
    this.shipsList.push(new Ship(25000, -25000, "Mantis09", "Player", "swooper-missile", false, "Standard", "Scarce"));
    this.shipsList.push(new Ship(25000, -25000, "Screecher", "Player", "swooper", false, "Standard", "Good"));
    this.shipsList.push(new Ship(25000, -25000, "Screecher", "Player", "swooper", false, "Advanced", "Good"));
    this.shipsList.push(new Ship(25000, -25000, "Majestad", "Player", "simple", false, "Standard", "Stocked"));
    this.shipsList.push(new Ship(25000, -25000, "Majestad", "Player", "simple-missile", true, "Advanced", "Stocked"));

    this.shipsList.push(new Ship(-8000, 4000, "Majestad", "Boofeln Widget Corporation", "simple", false, "Advanced", "Stocked"));
    this.shipsList.push(new Ship(-1300, -500, "Disk01", "Boofeln Widget Corporation", "basic", false, "Advanced", "Stocked"));
    this.shipsList.push(new Ship(7560, -250, "Mantis09", "Boofeln Widget Corporation", "simple-missile", false, "Advanced", "Doom"));
    this.shipsList.push(new Ship(-1000, 500, "Disk01", "Boofeln Widget Corporation", "basic", false, "Advanced", "Stocked"));
    this.shipsList.push(new Ship(500, 100, "Afid01", "Boofeln Widget Corporation", "simple", false, "Advanced", "Good"));
    this.shipsList.push(new Ship(300, -200, "Afid01", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(100, 1500, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
    this.shipsList.push(new Ship(-250, -500, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
    this.shipsList.push(new Ship(900, -900, "Afid01", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(9000, -1000, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
    this.shipsList.push(new Ship(7750, 1700, "Afid01", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(1400, 1100, "Afid01", "Boofeln Widget Corporation", "basic-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(8200, 2000, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
    this.shipsList.push(new Ship(4750, 1700, "Afid01", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(6000, -3000, "Afid01", "Boofeln Widget Corporation", "basic", false, "Standard", "Good"));
    //this.shipsList.push(new Ship(4783, -58269, "Afid01", "Korlax Toothpick Agency", "none", false, "Standard", "Good"));

    this.shipsList.push(new Ship(-2500, 5500, "Screecher", "Boofeln Widget Corporation", "swooper", false, "Standard", "Good"));
    this.shipsList.push(new Ship(2000, 2000, "Screecher", "Boofeln Widget Corporation", "swooper", false, "Standard", "Good"));
    this.shipsList.push(new Ship(-2000, -2000, "Screecher", "Boofeln Widget Corporation", "swooper", false, "Advanced", "Good"));
    this.shipsList.push(new Ship(-2000, 2000, "Mantis09", "Boofeln Widget Corporation", "basic-missile", false, "Advanced", "Good"));
    this.shipsList.push(new Ship(300, -200, "Mantis09", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(100, 1500, "Mantis09", "Boofeln Widget Corporation", "basic-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(-250, -500, "Mantis09", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));
    this.shipsList.push(new Ship(900, -900, "Mantis09", "Boofeln Widget Corporation", "simple-missile", false, "Standard", "Good"));

        //Projectiles List
    this.projectilesList = [];

        //Animations List
    this.animationsList = [];

    //Class List Activators

    this.drawAll = function()
    {
        for (var z = 0; z < 4; z++)
        {
            for (var i = 0; i < self.sceneryList.length; i++)
            {
                self.sceneryList[i].drawScene(z);
            }
            for (var i = 0; i < self.shipsList.length; i++)
            {
                self.shipsList[i].drawShip(z);
            }
            for (var i = 0; i < self.projectilesList.length; i++)
            {
                self.projectilesList[i].drawProjectile(z);
            }
            for (var i = 0; i < self.animationsList.length; i++)
            {
                self.animationsList[i].animate(z);
            }
        }
    };

    this.shipListActivator = function()
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
    this.sceneryListActivator = function()
    {
        for (var i = 0; i < self.sceneryList.length; i++)
        {
            self.sceneryList[i].process();
        }
    };

    //THE MAIN GAME LOOP
    this.gameLoop = function()
    {
        //On start do:
        if (game.gameJustStarted)
        {
            game.gameJustStarted = false;
            //Event Listeners
            document.addEventListener("keydown", keyPressSensing);
            document.addEventListener("keyup", keyReleaseSensing);
            game.c.addEventListener("mousemove", mouseSensing);
            document.addEventListener("click", mouseClick);
            document.addEventListener("mouseup", mouseRelease);
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
        if (self.state == "Divine")
        {
            self.shipListActivator();
            self.projectileListActivator();
            self.sceneryListActivator();
        }
        self.drawAll();

        //Alternate Menus
        if (self.interInventory)
        {
            interlistItemTransferMenu(self.interInv1, self.interInv2, self.interContext);
        }
        else if (self.planetMenu)
        {
            planetMenu(self.planetMenuList);
        }

        game.x.restore();
        //GAME WORLD COORD STUFF ^^^^

        //Display Player HUD
        if (game.coordinates && self.state == "Divine")
        {
            game.x.textAlign = "center";
            game.x.font = "bold 30px Arial";//fonter(30, "Arial");
            game.x.fillStyle = self.playerHUDColor;
            game.x.fillText("X: " + Math.round(self.playerX) + " | Y: " + Math.round(self.playerY), 1/2 * game.c.width, 1/10 * game.c.height); //-440
        }

        if (self.state == "Divine" || self.state == "DivinePaused" || self.state == "DivinePausedByPlayer")
        {
            requestAnimationFrame(self.gameLoop, self.c);
        }
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

function line(X, Y, X2, Y2, Colour, thickness, discombobulated, rotation, alpha)
{
    game.x.save();
    if (rotation != false && typeof(rotation) != "undefined")
    {
        game.x.rotate(rotation);
    }
    if (alpha != false && typeof(alpha) != "undefined")
    {
        game.x.globalAlpha = alpha;
    }
    game.x.beginPath();
    game.x.strokeStyle = Colour;
    game.x.lineWidth = thickness;
    if (discombobulated != true)
    {
        game.x.moveTo( X - game.viewX, Y - game.viewY);
        game.x.lineTo( X2 - game.viewX, Y2 - game.viewY);
    }
    else
    {
        game.x.moveTo(X, Y);
        game.x.lineTo(X2, Y2);
    }

    game.x.stroke();
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

function distance(esto, eso)
{
    return Math.sqrt((eso.X - esto.X) * (eso.X - esto.X) + (eso.Y - esto.Y) * (eso.Y - esto.Y));
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
    /*if (audio != "none")
    {
        if (audio.readyState)
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

            //if (audio.paused == true)
            //{
                if (typeof(time1) != "undefined" && time1 != false)
                {
                    audio.currentTime = time1;
                }
                else
                {
                    audio.currentTime = 0;
                }
                audio.play().then(function ()
                {
                    // ok to pause now
                    audio.okToPause = true;
                    // stop audio at time2, if requested
                    if (typeof(time2) != "undefined" && time2 != false)
                        setTimeout(function ()
                        {
                            audio.pause();
                        }, time2 - time1);
                });
            //}
        }
    }*/
}

function pauseSound(audio)
{
    /*if (audio != "none")
    {
        if (audio.readyState)
        {
            if (audio.okToPause)
                audio.pause();
            else
                setTimeout(function ()
                {
                    if (audio.okToPause)
                        audio.pause();
                }, 100);
        }
    }*/
}



