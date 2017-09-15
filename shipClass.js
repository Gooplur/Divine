/**
 * Created by skyeguy on 8/28/16.
 */
//This is for all enemies and allies... Ships are the life of this game.

//SHIP CLASS
function Ship(xx, yy, type, faction, AI, drive, upgrade, ammo, cargoHold)
{
    //IMPORTANT GAME INFO
    this.X = xx;
    this.Y = yy;
    this.size = 100;
    this.rotation = 0;
    this.targetRotation = 0;
    this.activateThisShip = true;
    this.destructionTime = 0;

    //AI
    this.brain = AI;
    this.target = "none";
    this.radarRange = 10000;

    //AI controls
    this.aiSpaceKey = false;
    this.aiShiftKey = false;
    this.aiWKey = false;
    this.aiSKey = false;
    this.aiAKey = false;
    this.aiDKey = false;
    this.aiQKey = false;
    this.aiPhase = false; //what phase of the ai brain is this ship in?
    this.aiTimer = new Date().getTime();

    //FACTION VARIABLES
    this.faction = faction; //This is the faction that the ship belongs to.
    this.allies = [];

    //SHIP STATS (stats that all ships have)
    this.zIndex = 1;
    this.ID = "The Cyrilean";
    this.type = type;
    this.integrityMAX = 50; //the amount of damage the physical ship can take before total destruction.
    this.integrity = 10000000000000; //the current level of damage the ship can still withstand before destruction. damage to the ship affects the quality of all other functions the ship depends on.
    this.shieldsMAX = 150; //the total capacity of the ships shielding systems.
    this.shields = 10000000000000; //the current status of the ships shielding systems.
    this.rechargeMAX = 5; //the rate at which shields recharge in the ships best condition.
    this.recharge = this.rechargeMAX; //the rate at which shields recharge, may be reduced if ship is damaged.
    this.powerMAX = 500; //the total power capacity that the ship has.
    this.power = 10000000000000; //the current amount of power that the ship has left to run all of its functions with.
    this.cargoMAX = 25; //the total amount of cargo that the ship can carry.
    this.cargo = 0; //ships total cargo by volume.
    this.speedMAX = 30; //ships maximum potential speed
    this.speed = 0; //ships current speed
    this.boostSpeed = 40;
    this.boostAccel = 6;
    this.boostHandle = 1/100 * Math.PI;
    this.boostStrafe = 15;
    this.accelerationMAX = 4.5;//max speed up/slow down rate
    this.acceleration = this.accelerationMAX; //speed up/slow down rate
    this.handlingMAX = 1/100 * Math.PI; //max turn speed
    this.handling = this.handlingMAX; //turn speed
    this.shieldingCost = 0.1;
    this.rechargeCost = 0.25;
    this.accelerationCost = 0.2;
    this.handlingCost = 0.01;
    this.weaponCost = 0.25;
    this.cloakingCost = 0.65;
    this.boostCost = 1;
    this.upgrades = []; //equipment that is used to enhance the ship.
    this.ammunition = []; //all of the ammunitions that are in store in the ship.
    this.cargoBay = []; //all of the non-equipped weapons and ammo, and raw materials for trade.
    this.shieldsColour = "blue";
    this.rechargeShield = true;
    this.rechargeTime = new Date().getTime();
    this.rechargeBlocked = false;
    this.rechargeBlockedTime = 0;
    //Attack rate
    this.sidegunsRate = 0.2;
    this.sidegunsStoreTime = new Date().getTime();
    this.maingunsRate = 5;
    this.maingunsStoreTime = new Date().getTime();
    this.turret1Rate = 0.45;
    this.turret1StoreTime = new Date().getTime();
    //turning off individual parts of the ship
    this.sidegunsPowered = true;
    this.maingunsPowered = true;
    this.turretPowered = true;

    //upgrade bonuses to default stats
    this.shieldsUP = 0;
    this.shieldsColourUP = "none";
    this.rechargeUP = 0;
    this.boostSpeedUP = 0;
    this.speedUP = 0;
    this.accelerationUP = 0;
    this.boostAccelUP = 0;
    this.boostHandleUP = 0;
    this.handlingUP = 0;
    this.strafeUP = 0;
    this.boostStrafeUP = 0;
    this.canRechargeInCombat = false;

    //UNIQUE SHIP STATS (stats that only some ships have)
    this.player = drive; //if this is true that means that the player is currently driving the ship.
    this.strafable = true; //if this is true that means that the ship can fly side to side with A and D.
    this.strafeMAX = 10;
    this.strafe = 0;
    this.cloakable = false; //if a ship is cloakable it can use cloaking to avoid enemy radar and missile targeting while still being able to access its systems.
    this.cloaking = false;
    this.directionless = false; //this negates the need for handling because the ship does not have a front and can move through space in any direction without turning.
    this.shop = []; //this is the equipment that a ship has for sale... it is at discount price if you own the trade station.
    //ACTION VARIABLES (like moving attacking etc.)
    this.speedAlteration = false;
    this.offline = false; //if a ship is powered offline it can not be discovered by long range trackers but it also cannot change its acceleration use its shielding systems, nor attack with its weapon systems.
    this.shieldingOnline = true;
    this.destructed = false; //this signifies whether or not the ship is destroyed or not. If this is true it will blow up.
    this.destructDuration = 3;

    //ANIMATION VARIABLES
    this.explosionStyle = []; // a list with the details in how to construct the ships explosion when it dies. looks like this: [x, y, size, quantity, spread, colourList]

    //SOUND VARIABLES
    this.volume = 1;

    this.explosionSound = "none";
    this.laserSound1 = "none";
    this.laserSound2 = "none";
    this.laserSound3 = "none";
    this.accelSound = "none";
    this.idleSound = "none";
    this.rechargeSound = "none";
    this.shieldingSound = "none";
    this.poweringSound = "none";

    //SOUND DETAIL VARIABLES
    this.accelSoundTime1 = false;
    this.accelSoundTime2 = false;
    this.explosionSoundTime1 = false;
    this.explosionSoundTime2 = false;
    this.laserSound1Time1 = false;
    this.laserSound1Time2 = false;
    this.laserSound2Time1 = false;
    this.laserSound2Time2 = false;

    //Ship Part Operation Variables
    this.turretRot1 = 0;
    this.sentryTarget = "none";

    //SHIP STAT SETUP
    this.setShipStats = function()
    {
        if (this.type == "Afid01")
        {
            this.size = 34;
            this.integrityMAX = 50; //the amount of damage the physical ship can take before total destruction.
            this.shieldsMAX = 150; //the total capacity of the ships shielding systems.
            this.rechargeMAX = 5; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 3000; //the total power capacity that the ship has.
            this.radarRange = 12000;
            this.cargoMAX = 25; //the total amount of cargo that the ship can carry.
            this.speedMAX = 30; //ships maximum potential speed
            this.accelerationMAX = 4;//max speed up/slow down rate
            this.acceleration = this.accelerationMAX;
            this.handlingMAX = 2/100 * Math.PI; //max turn speed
            this.handling = this.handlingMAX;
            this.strafable = true;
            this.strafeMAX = 10;
            this.shieldingCost = 0.1;
            this.rechargeCost = 0.25;
            this.accelerationCost = 0.2;
            this.handlingCost = 0.01;
            this.weaponCost = 0.25;
            this.explosionStyle = [25, 22, 30, ["red", "yellow", "orange"]];
            this.shieldsColour = "blue";
            this.boostSpeed = 31;
            this.boostAccel = 4.25;
            this.boostHandle = 1.05/100 * Math.PI;
            this.boostStrafe = 11;
            this.boostCost = 1;

            if (upgrade == "Standard")
            {
                this.upgrades = [itemize("Afid01-F1Lasers", 1), itemize("Afid01-M1Launcher", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("Afid01-F1Lasers", 1), itemize("Afid01-M1Launcher", 1), itemize("Afid01-Boosters", 1), itemize("RedStarShields", 1), itemize("Afid01-F1SentryGun", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [];
            }
            else
            {
                if (typeof(upgrade) != "undefined" && upgrade != false)
                {
                    this.upgrades = upgrade;
                }
            }

            if (ammo == "Scarce")
            {
                this.ammunition = [itemize("M1Missile", 1)]
            }
            else if (ammo == "Some")
            {
                this.ammunition = [itemize("M1Missile", 2)]
            }
            else if (ammo == "Good")
            {
                this.ammunition = [itemize("M1Missile", 3)]
            }
            else if (ammo == "Stocked")
            {
                this.ammunition = [itemize("M1Missile", 5)]
            }
            else if (ammo == "Doom")
            {
                this.ammunition = [itemize("M1Missile", 10)]
            }

            //sounds
            this.shieldingSound = new Audio("sounds/shieldsUp.wav");
            this.poweringSound = new Audio("sounds/powerOn.wav");
            this.explosionSound = new Audio("sounds/heavyXPL.wav");
            this.accelSound = new Audio("sounds/accl.mp3");
            this.accelSoundTime1 = 0.2;
            this.accelSoundTime2 = 1.1;
            this.laserSound1 = new Audio("sounds/lightLas.wav");
            this.laserSound2 = new Audio("sounds/missileLaunch.wav");
        }
        else if (this.type == "Disk01")
        {
            this.size = 16;
            this.directionless = true;
            this.cloakable = true;
            this.integrityMAX = 20; //the amount of damage the physical ship can take before total destruction.
            this.shieldsMAX = 90; //the total capacity of the ships shielding systems.
            this.rechargeMAX = 3; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 500; //the total power capacity that the ship has.
            this.radarRange = 8000;
            this.cargoMAX = 10; //the total amount of cargo that the ship can carry.
            this.speedMAX = 25; //ships maximum potential speed
            this.accelerationMAX = 25;//max speed up/slow down rate
            this.acceleration = this.accelerationMAX;
            this.strafable = true;
            this.strafeMAX = 25;
            this.shieldingCost = 0.05;
            this.rechargeCost = 0.15;
            this.accelerationCost = 0.3;
            this.handlingCost = 0;
            this.weaponCost = 0.1;
            this.explosionStyle = [25, 22, 30, ["Green", "Blue", "lightGreen"]];
            this.destructDuration = 0.5;
            this.shieldsColour = "darkgreen";
            this.cloakingCost = 0.5;

            if (upgrade == "Standard")
            {
                this.upgrades = [itemize("Disk01-F1SingleStream", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("Disk01-F1SingleStream", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [];
            }
            else
            {
                if (typeof(upgrade) != "undefined" && upgrade != false)
                {
                    this.upgrades = upgrade;
                }
            }

            if (ammo == "Scarce")
            {
                this.ammunition = []
            }
            else if (ammo == "Some")
            {
                this.ammunition = []
            }
            else if (ammo == "Good")
            {
                this.ammunition = []
            }
            else if (ammo == "Stocked")
            {
                this.ammunition = []
            }

            //sounds
            this.shieldingSound = new Audio("sounds/shieldsUp.wav");
            this.poweringSound = new Audio("sounds/powerOn.wav");
            this.explosionSound = new Audio("sounds/muffledXPL.wav");
            this.idleSound = new Audio("sounds/hover.wav");
            this.laserSound1 = new Audio("sounds/singleStream.wav");
        }

        //Predetermined Cargo
        if (typeof(cargoHold) != "undefined" && cargoHold != false)
        {
            this.cargoBay = cargoHold;
        }
    };

    this.resetBonuses = function()
    {
        this.shieldsUP = 0;
        this.shieldsColourUP = "none";
        this.rechargeUP = 0;
        this.boostSpeedUP = 0;
        this.speedUP = 0;
        this.accelerationUP = 0;
        this.boostAccelUP = 0;
        this.boostHandleUP = 0;
        this.handlingUP = 0;
        this.strafeUP = 0;
        this.boostStrafeUP = 0;
        this.accessUpgrades("bonus");
    };

    //GET SHIP STATS STATUS
    this.getShieldsColour = function()
    {
        if (this.shieldsColourUP == "none")
        {
            return this.shieldsColour;
        }
        else
        {
            return this.shieldsColourUP
        }
    };

    this.getShields = function()
    {
        if (this.shieldingOnline)
        {
            return (this.shieldsMAX + this.shieldsUP) * (this.integrity / this.integrityMAX);
        }
        else
        {
            return 0;
        }
    };

    this.getRecharge = function()
    {
        if (this.shieldingOnline)
        {
            return (this.rechargeMAX + this.rechargeUP) * (this.integrity / this.integrityMAX);
        }
        else
        {
            return 0;
        }
    };

    this.getSpeed = function()
    {
        if (game.shiftKey)
        {
            return (this.boostSpeed + this.boostSpeedUP) * (this.integrity / this.integrityMAX);
        }
        else
        {
            return (this.speedMAX + this.speedUP) * (this.integrity / this.integrityMAX);
        }
    };

    this.getAcceleration = function()
    {
        if (game.shiftKey)
        {
            return (this.boostAccel + this.boostAccelUP) * (this.integrity / this.integrityMAX);
        }
        else
        {
            return (this.accelerationMAX + this.accelerationUP) * (this.integrity / this.integrityMAX);
        }
    };

    this.getHandling = function()
    {
        if (game.shiftKey)
        {
            return (this.boostHandle + this.boostHandleUP) * (this.integrity / this.integrityMAX);
        }
        else
        {
            return (this.handlingMAX + this.handlingUP) * (this.integrity / this.integrityMAX);
        }
    };

    this.getStrafe = function()
    {
        if (game.shiftKey)
        {
            return (this.boostStrafe + this.boostStrafeUP) * (this.integrity / this.integrityMAX);
        }
        else
        {
            return (this.strafeMAX + this.strafeUP)* (this.integrity / this.integrityMAX);
        }
    };

    //MANDATE SHIP STATS
    this.mandateStats = function()
    {
        //To Do with off Line
        if (this.offline == true)
        {
            this.shieldingOnline = false;
            this.cloaking = false;
            //turns off all parts of the ship
            this.sidegunsPowered = false;
            this.maingunsPowered = false;
            this.turretPowered = false;
        }

        //To Do with stats
        if (this.integrity > this.integrityMAX)
        {
            this.integrity = this.integrityMAX;
        }
        else if (this.integrity <= 0)
        {
            this.integrity = 0;
            this.destructed = true;
        }

        if (this.shields > this.getShields())
        {
            this.shields = this.getShields();
        }
        else if (this.shields < 0)
        {
            this.shields = 0;
        }

        if (this.recharge > this.getRecharge())
        {
            this.recharge = this.getRecharge();
        }
        else if (this.recharge < 0)
        {
            this.recharge = 0;
        }

        if (this.power > this.powerMAX)
        {
            this.power = this.powerMAX;
        }
        else if (this.power < 0)
        {
            this.power = 0;
        }

        if (this.acceleration > this.getAcceleration())
        {
            this.acceleration = this.getAcceleration();
        }
        else if (this.acceleration < 0)
        {
            this.acceleration = 0;
        }

        if (this.handling > this.getHandling())
        {
            this.handling = this.getHandling();
        }
        else if (this.handling < 0)
        {
            this.handling = 0;
        }
    };

    //DRAW SHIPS

    this.drawShip = function(z)
    {
        if (z == this.zIndex)
        {
            if (ifInScreenDraw(this.X, this.Y, this.size))
            {
                //DRAW SHIPS
                if (this.type == "Afid01")
                {
                    this.accessUpgrades("drawBelow");
                    if (this.speedAlteration == false)
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 13, 11, 36, 51, 36, 51, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 36, 51, this.X, this.Y, 36, 51, this.rotation, false, 1, 0, -5);
                        }
                        else
                        {
                            draw(divineStarterPack, 13, 11, 36, 51, this.X, this.Y, 36, 51, this.rotation, false, 1, 0, -5);
                        }
                    }
                    else
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 65, 11, 36, 51, 36, 51, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 36, 51, this.X, this.Y, 36, 51, this.rotation, false, 1, -1, -5);
                        }
                        else
                        {
                            draw(divineStarterPack, 65, 11, 36, 51, this.X, this.Y, 36, 51, this.rotation, false, 1, -1, -5);
                        }
                    }
                    this.accessUpgrades("drawAbove");
                }
                if (this.type == "Disk01")
                {
                    this.accessUpgrades("drawBelow");
                    if (this.cloaking == false)
                    {
                        if (!this.destructed && this.offline == false && this.power > 0)
                        {
                            playSound(this.idleSound, this.volume);
                        }
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 124, 165, 32, 32, 32, 32, 0.65 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 32, 32, this.X, this.Y, 32, 32, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineStarterPack, 124, 165, 32, 32, this.X, this.Y, 32, 32, 0, false, 1, 0, 0);
                        }
                    }
                    else
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 183, 163, 32, 32, 32, 32, 0.65 * Math.max(0, this.shields)/this.getShields(), "black");
                            draw(colorized, 0, 0, 32, 32, this.X, this.Y, 32, 32, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineStarterPack, 183, 163, 32, 32, this.X, this.Y, 32, 32, 0, false, 1, 0, 0);
                        }
                    }
                    this.accessUpgrades("drawAbove");
                }
            }
            //Draw Power and Integrity Bars for teammates.
            if (this.faction == "Player" && game.toggleFleetStatus && this.offline != true && this.power > 0)
            {
                if (!this.player)
                {
                    circle(false, this.X, this.Y, this.size * 1.4, 2 * Math.PI - ((Math.max(0, this.integrity) / this.integrityMAX) * 2 * Math.PI), 2*Math.PI, false, 2, "lightGreen", false, false, 0.85);
                    circle(false, this.X, this.Y, 3 + this.size * 1.4, 2 * Math.PI - ((Math.max(0, this.power) / this.powerMAX) * 2 * Math.PI), 2*Math.PI, false, 2, "yellow", false, false, 0.85);
                    circle(false, this.X, this.Y, 6 + this.size * 1.4, 2 * Math.PI - ((Math.max(0, this.shields) / this.getShields()) * 2 * Math.PI), 2*Math.PI, false, 2, this.getShieldsColour(), false, false, 0.85);
                }
                else if (game.toggleSelfStatus)
                {
                    circle(false, this.X, this.Y, this.size * 1.4, 2 * Math.PI - ((Math.max(0, this.integrity) / this.integrityMAX) * 2 * Math.PI), 2*Math.PI, false, 2, "lightGreen", false, false, 0.85);
                    circle(false, this.X, this.Y, 3 + this.size * 1.4, 2 * Math.PI - ((Math.max(0, this.power) / this.powerMAX) * 2 * Math.PI), 2*Math.PI, false, 2, "yellow", false, false, 0.85);
                    circle(false, this.X, this.Y, 6 + this.size * 1.4, 2 * Math.PI - ((Math.max(0, this.shields) / this.getShields()) * 2 * Math.PI), 2*Math.PI, false, 2, this.getShieldsColour(), false, false, 0.85);
                }
            }
        }
    };

    this.rotationSystem = function()
    {
        if (this.directionless != true)
        {
            if (distBetweenAngles(this.targetRotation, this.rotation) > this.handling)
            {
                var d = (this.targetRotation - this.rotation) % (2 * Math.PI);
                if (d > Math.PI)
                {
                    d -= 2*Math.PI;
                }
                if (d < -Math.PI)
                {
                    d += 2*Math.PI;
                }
                if (d > 0)
                {
                    this.rotation = this.rotation + this.handling;
                    this.power -= this.handlingCost / 1000000;
                }
                else
                {
                    this.rotation = this.rotation - this.handling;
                    this.power -= this.handlingCost / 1000000;
                }
                this.rotation = this.rotation % (2 * Math.PI);
            }
        }
    };

    this.movementSystem = function()
    {
        if (this.directionless == true)
        {
            var sxy = game.screenToWorld((game.mouseX - 1/2 * game.c.width) / game.scale, (game.mouseY - 1/2 * game.c.height) / game.scale);
            if (this.offline == false && this.power > 0 && this.player)
            {
                this.targetRotation = Math.atan2(sxy[1] - this.Y, sxy[0] - this.X);
            }
            if (this.player == true)
            {
                this.X += Math.cos(this.targetRotation) * this.speed;
                this.Y += Math.sin(this.targetRotation) * this.speed;
            }
            else
            {
                this.X += Math.cos(this.targetRotation - 1/2 * Math.PI) * this.speed;
                this.Y += Math.sin(this.targetRotation - 1/2 * Math.PI) * this.speed;
            }
        }
        else
        {
            this.X += Math.cos(this.rotation - 1/2 * Math.PI) * this.speed;
            this.Y += Math.sin(this.rotation - 1/2 * Math.PI) * this.speed;
        }
    };

    this.strafing = function()
    {
        if (this.directionless == true)
        {
            var sxy = game.screenToWorld((game.mouseX - 1/2 * game.c.width) / game.scale, (game.mouseY - 1/2 * game.c.height) / game.scale);
            if (this.offline == false && this.power > 0 && this.player)
            {
                this.targetRotation = Math.atan2(sxy[1] - this.Y, sxy[0] - this.X);
            }
            if (this.player == true)
            {
                this.X += Math.cos(this.targetRotation + Math.PI / 2) * this.strafe;
                this.Y += Math.sin(this.targetRotation + Math.PI / 2) * this.strafe;
            }
            else
            {
                this.X += Math.cos(this.targetRotation) * this.strafe;
                this.Y += Math.sin(this.targetRotation) * this.strafe;
            }
        }
        else
        {
            this.X += Math.cos(this.rotation) * this.strafe;
            this.Y += Math.sin(this.rotation) * this.strafe;
        }
    };

    this.recharging = function()
    {
        if (this.rechargeBlockedTime + 3000 > new Date().getTime())
        {
            this.rechargeBlocked = true;
        }
        else
        {
            this.rechargeBlocked = false;
        }

        if (this.rechargeShield && this.shields < this.getShields() && this.power >= this.rechargeCost / 10 && !this.rechargeBlocked || this.rechargeShield && this.shields < this.getShields() && this.power >= this.rechargeCost / 10 && this.canRechargeInCombat)
        {
            if (this.rechargeTime + 100 <= new Date().getTime())
            {
                this.rechargeTime = new Date().getTime();
                this.shields += this.getRecharge() / 10;
                this.power -= this.rechargeCost / 10;
            }
        }
    };

    this.systemControls = function()
    {
        if (this.player == true)
        {
            //activate upgrade effects
            this.accessUpgrades("playerActivate");

            //Toggle Hud playerOff/fleetOff/allOn
            if (game.hKey == true)
            {
                game.hKey = false;
                if (game.toggleSelfStatus == true)
                {
                    game.toggleSelfStatus = false;
                }
                else if (game.toggleSelfStatus == false && game.toggleFleetStatus == true)
                {
                    game.toggleFleetStatus = false;
                }
                else if (game.toggleFleetStatus == false)
                {
                    game.toggleSelfStatus = true;
                    game.toggleFleetStatus = true;
                }
            }
            //Toggle Cloaking on/off
            if (game.cKey == true && this.cloakable == true)
            {
                game.cKey = false;
                if (this.cloaking == false && this.power > this.cloakingCost)
                {
                    this.cloaking = true;
                }
                else if (this.cloaking)
                {
                    this.cloaking = false;
                }
            }
            //Toggle Shields on/off
            if (game.oKey == true)
            {
                game.oKey = false;
                if (this.shieldingOnline == false && this.power > (this.rechargeCost + this.shieldingCost) * 10)
                {
                    this.shieldingSound.play();
                    playSound(this.shieldingSound, 1, 0, this.shieldingSound.duration);
                    this.shieldingOnline = true;
                }
                else if (this.shieldingOnline)
                {
                    playSound(this.shieldingSound, this.volume, 0, this.shieldingSound.duration, -1);
                    this.shieldingOnline = false;
                }
            }
            if (game.rKey == true)
            {
                if (this.rechargeShield)
                {
                    this.rechargeShield = false;
                }
                else if (!this.rechargeShield)
                {
                    this.rechargeShield = true;
                }
            }

            //Toggle Power to Weapons on/off
            if (game.lKey == true)
            {
                game.lKey = false;
                if (this.sidegunsPowered == false)
                {
                    this.sidegunsPowered = true;
                }
                else
                {
                    this.sidegunsPowered = false;
                }
                if (this.maingunsPowered == false)
                {
                    this.maingunsPowered = true;
                }
                else
                {
                    this.maingunsPowered = false;
                }
                if (this.turretPowered == false)
                {
                    this.turretPowered = true;
                }
                else
                {
                    this.turretPowered = false;
                }
            }
            //Movement
            if (this.directionless == true)
            {
                if (game.wKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.min(this.getSpeed(), this.speed + (this.acceleration / 25));
                    if (game.shiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (game.sKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    if (game.shiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else
                {
                    this.speedAlteration = false;
                }
            }
            else
            {
                //POINT TOWARDS THE MOUSE
                var sxy = game.screenToWorld((game.mouseX - 1/2 * game.c.width) / game.scale, (game.mouseY - 1/2 * game.c.height) / game.scale);
                this.targetRotation = Math.atan2(sxy[1] - this.Y, sxy[0] - this.X) + Math.PI / 2;

                if (game.wKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.min(this.getSpeed(), this.speed + (this.acceleration / 25));
                    if (game.shiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (game.sKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    if (game.shiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (game.aKey == false && game.dKey == false)
                {
                    this.speedAlteration = false;
                    this.accelSound.pause();
                }
            }

            if (this.strafable == true)
            {
                if (game.aKey == true)
                {
                    playSound(this.accelSound, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.strafe = Math.max(-this.getStrafe(), this.strafe - (this.acceleration / 25));
                    if (game.shiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (game.dKey == true)
                {
                    playSound(this.accelSound, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.strafe = Math.min(this.getStrafe(), this.strafe + (this.acceleration / 25));
                    if (game.shiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
            }
        }
        else //If you are not operating the ship the AI is.
        {
            //activate upgrade effects
            this.accessUpgrades("aiActivate");

            //Movement
            if (this.directionless == true)
            {
                if (this.aiWKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.min(this.getSpeed(), this.speed + (this.acceleration / 25));
                    if (this.aiShiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (this.aiSKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    if (this.aiShiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else
                {
                    this.speedAlteration = false;
                }
            }
            else
            {
                if (this.aiWKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.min(this.getSpeed(), this.speed + (this.acceleration / 25));
                    if (this.aiShiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (this.aiSKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    if (this.aiShiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (this.aiAKey == false && this.aiDKey == false)
                {
                    this.speedAlteration = false;
                    this.accelSound.pause();
                }
            }

            if (this.strafable == true)
            {
                if (this.aiAKey == true)
                {
                    playSound(this.accelSound, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.strafe = Math.max(-this.getStrafe(), this.strafe - (this.acceleration / 25));
                    if (this.aiShiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
                else if (this.aiDKey == true)
                {
                    playSound(this.accelSound, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.strafe = Math.min(this.getStrafe(), this.strafe + (this.acceleration / 25));
                    if (this.aiShiftKey)
                    {
                        this.power -= this.boostCost / 100;
                    }
                    else
                    {
                        this.power -= this.accelerationCost / 100;
                    }
                }
            }

            //TARGETING FOR AI
            if (this.brain == "basic" || this.brain == "basic-missile" || this.brain == "simple" || this.brain == "simple-missile")
            {
                this.targetClosestEnemy("ship");
            }

            //AI BRAINS
            if (this.brain == "simple" || this.brain == "simple-missile")
            {
                if (this.target != "none")
                {
                    if (this.integrity / this.integrityMAX <= 0.9|| this.power / this.powerMAX < 0.25)
                    {
                        this.targetRotation = - Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;

                        if (this.brain == "simple-missile")
                        {
                            this.aiQKey = true;
                        }

                        if (this.distanceTo(this.target) < this.target.radarRange)
                        {
                            this.aiWKey = true;
                            if (this.strafable)
                            {
                                this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                            }
                        }
                        else
                        {
                            this.aiSKey = true;
                        }
                    }
                    else
                    {
                        if (this.aiPhase == false)
                        {

                            this.targetRotation = Math.atan2(this.Y - (this.target.Y + Math.sin(this.target.rotation) * this.target.speed), this.X - (this.target.X + Math.cos(this.target.rotation) * this.target.speed)) - 1/2 * Math.PI;

                            this.aiWKey = true;
                            this.aiSKey = false;
                            this.aiQKey = false;
                            this.aiSpaceKey = false;

                            if (this.distanceTo(this.target) <= 5000 && this.distanceTo(this.target) >= 2500)
                            {
                                this.rotation = this.targetRotation;
                                if (this.brain == "simple-missile")
                                {
                                    this.aiQKey = true;
                                }
                                //console.log(this.aiQKey);
                                this.aiSpaceKey = true;
                            }

                            if (this.distanceTo(this.target) <= 626)
                            {
                                this.aiPhase = 1;
                            }
                        }
                        else if (this.aiPhase == 1)
                        {
                            this.aiSpaceKey = false;
                            this.aiQKey = false;
                            this.aiWKey = false;
                            this.aiSKey = true;

                            if (this.speed == 0)
                            {
                                this.aiPhase = 2;
                            }
                        }
                        else if (this.aiPhase == 2)
                        {
                            this.aiSKey = false;

                            this.targetRotation = Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;

                            this.aiSpaceKey = false;

                            if (this.aiTimer + 4000 < new Date().getTime())
                            {
                                this.aiTimer = new Date().getTime();
                                this.aiPhase = 3;
                            }
                        }
                        else if (this.aiPhase == 3)
                        {
                            this.targetRotation = Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;

                            if (this.rotation - this.handling < this.targetRotation && this.rotation + this.handling > this.targetRotation)
                            {
                                this.rotation = Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI; //while in shooting mode the ship has perfect rotation so that it can actually be a challenge.
                            }

                            this.aiSpaceKey = true;

                            if (this.aiTimer + 3000 < new Date().getTime())
                            {
                                this.aiTimer = new Date().getTime();
                                if (this.distanceTo(this.target) >= 1100)
                                {
                                    this.aiPhase = false;
                                }
                                else
                                {
                                    this.aiPhase = 2;
                                }
                            }
                        }
                    }
                }
                else
                {

                }
            }
            else if (this.brain == "basic" || this.brain == "basic-missile")
            {
                if (this.target != "none")
                {
                    if (this.integrity / this.integrityMAX <= 0.15 || this.power / this.powerMAX <= 0.10) //run away
                    {
                        this.targetRotation = - Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;
                        if (this.distanceTo(this.target) < this.target.radarRange)
                        {
                            this.aiWKey = true;
                            if (this.strafable)
                            {
                                this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                            }
                        }
                    }
                    else //fight
                    {
                        if (this.directionless)
                        {
                            this.targetRotation = Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;
                        }
                        else
                        {
                            if (Math.random() > 0.74)
                            {
                                this.targetRotation = Math.atan2(this.Y - (this.target.Y + Math.sin(this.target.rotation) * this.target.strafe), this.X - this.target.X + (Math.cos(this.rotation) * this.target.strafe)) - 1/2 * Math.PI;
                            }
                            else
                            {
                                this.targetRotation = Math.atan2(this.Y - (this.target.Y + Math.sin(this.target.rotation) * this.target.strafe * 5), this.X - this.target.X + (Math.cos(this.rotation) * this.target.strafe * 5)) - 1/2 * Math.PI;
                            }
                        }
                        if (this.distanceTo(this.target) > 900)
                        {
                            this.aiWKey = true;
                            this.aiQKey = false;
                            if (this.strafable)
                            {
                                this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                            }
                            if (this.cloakable)
                            {
                                this.cloaking = true;
                            }
                        }
                        else if (this.distanceTo(this.target) <= 900 && this.speed > 0)
                        {
                            this.aiWKey = false;
                            this.aiSKey = true;
                            if (this.brain == "basic-missile")
                            {
                                this.aiQKey = true;
                            }
                            if (this.strafable)
                            {
                                this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                            }
                            if (this.cloakable)
                            {
                                this.cloaking = false;
                            }
                            this.aiSpaceKey = true;
                        }
                        else if (this.distanceTo(this.target) <= 900)
                        {
                            this.aiWKey = false;
                            this.aiSKey = false;
                            this.aiQKey = false;
                            if (this.strafable)
                            {
                                this.aiAKey = true;
                            }
                            if (this.cloakable)
                            {
                                this.cloaking = false;
                            }
                            this.aiSpaceKey = true;
                        }
                    }
                }
                else
                {
                    this.aiWKey = false;
                    this.aiSKey = true;
                    if (this.strafable)
                    {
                        this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    }
                    if (this.cloakable)
                    {
                        this.cloaking = true;
                    }
                }
            }
        }
    };

    this.distanceTo = function(target)
    {
        return Math.sqrt((this.X - target.X)*(this.X - target.X) + (this.Y - target.Y)*(this.Y - target.Y));
    };

    this.turnOnOffShip = function()
    {
        if (this.player == true)
        {
            //Turn ship on/off
            if (game.pKey == true)
            {
                game.pKey = false;
                if (this.offline == true && this.power > 0)
                {
                    playSound(this.poweringSound, this.volume, 0, this.poweringSound.duration);
                    this.offline = false;

                }
                else if (this.offline == false)
                {
                    playSound(this.poweringSound, this.volume, false, false, -1);
                    this.offline = true;
                }
            }
        }
    };
    this.destruct = function()
    {
        if (this.destructed)
        {
            if (this.destructionTime == 0)
            {
                pauseSound(this.laserSound1);
                pauseSound(this.laserSound2);
                pauseSound(this.laserSound3);
                pauseSound(this.accelSound);
                pauseSound(this.idleSound);
                playSound(this.explosionSound, this.volume, this.explosionSoundTime1, this.explosionSoundTime2);
                this.destructionTime = new Date().getTime();
            }
            if (this.player)
            {
                this.player = false;
                game.mode = "navigator";
            }
            explosion(this.X, this.Y, this.explosionStyle[0], this.explosionStyle[1], this.explosionStyle[2], this.explosionStyle[3]);
            this.offline = true;
            if (new Date().getTime() - this.destructionTime > this.destructDuration * 1000 && this.destructionTime != 0)
            {
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    if (game.shipsList[i] === this)
                    {
                        game.shipsList.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

    //function draw //img, strtX, strtY, width, height, myX, myY, sizeX, sizeY, rotation, discombobulated, alpha, adjX, adjY
    this.accessUpgrades = function(use) //draw: "drawBelow"/"drawAbove" activate upgrade's functions: "activate"/"playerActivate"
    {
        if (this.upgrades.length > 0)
        {
            for (var i = 0; i < this.upgrades.length; i++)
            {
                if (this.upgrades[i].name == "Afid01-F1Lasers" && this.type == "Afid01" && this.upgrades[i].part == "sideguns")
                {
                    if (use == "drawAbove")
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 16, 74, 30, 14, 30, 14, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 30, 14, this.X, this.Y, 30, 14, this.rotation, false, 1, -1, -18.5);
                        }
                        else
                        {
                            draw(divineStarterPack, 16, 74, 30, 14, this.X, this.Y, 30, 14, this.rotation, false, 1, -1, -18.5);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.sidegunsPowered == true && game.spaceKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 2))
                            {
                                this.power -= (this.weaponCost * 2);
                                this.laserSound1.currentTime = 0;
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("F1Laser", this.X + Math.cos(this.rotation - Math.PI * 16 / 16) * 12.25, this.Y + Math.sin(this.rotation - Math.PI * 16 / 16) * 11.5, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F1Laser", this.X + Math.cos(this.rotation - Math.PI * 0 / 16) * 12.25, this.Y + Math.sin(this.rotation - Math.PI * 0 / 16) * 11.5, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.sidegunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 2))
                            {
                                this.power -= (this.weaponCost * 2);
                                this.laserSound1.currentTime = 0;
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("F1Laser", this.X + Math.cos(this.rotation - Math.PI * 16 / 16) * 12.25, this.Y + Math.sin(this.rotation - Math.PI * 16 / 16) * 11.5, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F1Laser", this.X + Math.cos(this.rotation - Math.PI * 0 / 16) * 12.25, this.Y + Math.sin(this.rotation - Math.PI * 0 / 16) * 11.5, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                else if (this.upgrades[i].name == "Afid01-Boosters" && this.type == "Afid01" && this.upgrades[i].part == "boosters")
                {
                    if (use == "drawAbove")
                    {
                        if (!this.speedAlteration)
                        {
                            if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                            {
                                var colorized = colorizedImage(divineStarterPack, 82, 76, 15, 15, 15, 15, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                                draw(colorized, 0, 0, 15, 15, this.X, this.Y, 15, 15, this.rotation, false, 1, -0.5, 19.5);
                            }
                            else
                            {
                                draw(divineStarterPack, 82, 76, 15, 15, this.X, this.Y, 15, 15, this.rotation, false, 1, -0.5, 19.5);
                            }
                        }
                        else
                        {
                            if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                            {
                                var colorized = colorizedImage(divineStarterPack, 97, 76, 15, 15, 15, 15, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                                draw(colorized, 0, 0, 15, 15, this.X, this.Y, 15, 15, this.rotation, false, 1, -0.5, 19.5);
                            }
                            else
                            {
                                draw(divineStarterPack, 97, 76, 15, 15, this.X, this.Y, 15, 15, this.rotation, false, 1, -0.5, 19.5);
                            }
                        }
                    }
                    if (use == "bonus")
                    {
                        this.boostSpeedUP = 12;
                        this.speedUP = 3;
                        this.accelerationUP = 0.5;
                        this.boostAccelUP = 6;
                        this.handlingUP = (0.25 / 100) * Math.PI * 2;
                        this.boostHandleUP = (0.5 / 100) * Math.PI * 2;
                    }
                }
                else if (this.upgrades[i].name == "RedStarShields" && this.upgrades[i].part == "shielding")
                {
                    if (use == "bonus")
                    {
                        this.shieldsColourUP = "crimson";
                        this.shieldsUP = 250;
                        this.rechargeUP = 5;
                    }
                }
                else if (this.upgrades[i].name == "Afid01-M1Launcher" && this.type == "Afid01" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawAbove")
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 62, 75, 12, 14, 12, 14, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 12, 14, this.X, this.Y, 12, 14, this.rotation, false, 1, -0.5, -32);
                        }
                        else
                        {
                            draw(divineStarterPack, 62, 75, 12, 14, this.X, this.Y, 12, 14, this.rotation, false, 1, -0.5, -32);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.qKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.qKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "M1Missile" && this.ammunition[a].quantity >= 1)
                                {
                                    this.ammunition[a].quantity -= 1;
                                    if (this.ammunition[a].quantity <= 0)
                                    {
                                        this.ammunition.splice(a, 1);
                                    }
                                    hasAmmoToShoot = true;
                                    break;
                                }
                            }
                            if (hasAmmoToShoot)
                            {
                                if (this.power >= this.weaponCost)
                                {
                                    this.power -= this.weaponCost;
                                    this.laserSound1.currentTime = 0;
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("M1Missile", this.X + Math.cos(this.rotation - Math.PI / 1.95) * 27, this.Y + Math.sin(this.rotation - Math.PI / 1.95) * 27, this, this.rotation - Math.PI / 2));
                                }
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiQKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiQKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "M1Missile" && this.ammunition[a].quantity >= 1)
                                {
                                    this.ammunition[a].quantity -= 1;
                                    if (this.ammunition[a].quantity <= 0)
                                    {
                                        this.ammunition.splice(a, 1);
                                    }
                                    hasAmmoToShoot = true;
                                    break;
                                }
                            }
                            if (hasAmmoToShoot)
                            {
                                if (this.power >= this.weaponCost)
                                {
                                    this.power -= this.weaponCost;
                                    this.laserSound1.currentTime = 0;
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("M1Missile", this.X + Math.cos(this.rotation - Math.PI / 2) * 27, this.Y + Math.sin(this.rotation - Math.PI / 2) * 27, this, this.rotation - Math.PI / 2));
                                }
                            }
                        }
                    }
                }
                else if (this.upgrades[i].name == "Afid01-F1SentryGun" && this.type == "Afid01" && this.upgrades[i].part == "turret")
                {
                    if (use == "drawAbove")
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 13, 98, 14, 14, 14, 14, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 14, 14, this.X, this.Y, 14, 14, this.rotation, false, 1, -0.5, 2.5);
                            var colorized2 = colorizedImage(divineStarterPack, 34.5, 97, 30, 16, 30, 16, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 30, 16, this.X - Math.cos(this.rotation - Math.PI * 7 / 16) * 1.16, this.Y - Math.sin(this.rotation - Math.PI * 7 / 16) * 1.16, 30 * 0.9, 16 * 0.9, this.rotation + this.turretRot1, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineStarterPack, 13, 98, 14, 14, this.X, this.Y, 14, 14, this.rotation, false, 1, -0.5, 2.5);
                            draw(divineStarterPack, 34.5, 97, 30, 16, this.X - Math.cos(this.rotation - Math.PI * 7 / 16) * 1.16, this.Y - Math.sin(this.rotation - Math.PI * 7 / 16) * 1.16, 30 * 0.9, 16 * 0.9, this.rotation + this.turretRot1, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.turretPowered == true )
                        {
                            //Point to nearest enemy
                            this.targetClosestEnemy("sentry");
                            if (this.sentryTarget != "none")
                            {
                                this.turretRot1 = Math.atan2(this.Y - Math.sin(this.rotation - Math.PI * 7 / 16) * 1.16 - this.sentryTarget.Y, this.X - Math.cos(this.rotation - Math.PI * 7 / 16) * 1.16 - this.sentryTarget.X) - 1 * Math.PI - this.rotation; //TODO not exactly oriented properly at all...
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 2))
                                {
                                    this.power -= (this.weaponCost * 2);
                                    this.laserSound1.currentTime = 0;
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("F1Laser", this.X  - Math.cos(this.rotation - Math.PI * 7 / 16) * 1.16 - Math.cos(this.rotation + this.turretRot1 - Math.PI * 0 / 16) * 10, this.Y - Math.sin(this.rotation - Math.PI * 7 / 16) * 1.16 - Math.sin(this.rotation + this.turretRot1 - Math.PI * 0 / 16) * 10, this, this.rotation + this.turretRot1));
                                }
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.turretPowered == true )
                        {
                            //Point to nearest enemy
                            this.targetClosestEnemy("sentry");
                            if (this.sentryTarget != "none")
                            {
                                this.turretRot1 = Math.atan2(this.Y - Math.sin(this.rotation - Math.PI * 7 / 16) * 1.16 - this.sentryTarget.Y, this.X - Math.cos(this.rotation - Math.PI * 7 / 16) * 1.16 - this.sentryTarget.X) - 1 * Math.PI - this.rotation; //TODO not exactly oriented properly at all...
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 2))
                                {
                                    this.power -= (this.weaponCost * 2);
                                    this.laserSound1.currentTime = 0;
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("F1Laser", this.X  - Math.cos(this.rotation - Math.PI * 7 / 16) * 1.16, this.Y - Math.sin(this.rotation - Math.PI * 7 / 16) * 1.16, this, this.rotation + this.turretRot1));
                                }
                            }
                        }
                    }
                }
                else if (this.upgrades[i].name == "Disk01-F1SingleStream" && this.type == "Disk01" && this.upgrades[i].part == "turret")
                {
                    if (use == "playerActivate" || use == "aiActivate")
                    {
                        if (this.turretPowered == true)
                        {
                            if (this.power >= this.weaponCost)
                            {
                                //sound for this type of laser is played by the projectile itself.
                                game.projectilesList.push(new Projectile("F1SingleStream", this.X, this.Y, this, 0, 0, 0));
                            }
                        }
                    }
                }
            }
        }
    };

    this.runSystems = function()
    {
        if (ifInScreenDraw(this.X, this.Y, this.size) || game.togglePerformance == false)
        {
            this.destruct();
            if (this.activateThisShip)
            {
                this.setShipStats();
                this.activateThisShip = false;
            }
            this.resetBonuses();
            this.mandateStats();
            //this.drawShip();
            this.turnOnOffShip();
            if (this.power > 0 && this.offline == false)
            {
                this.rotationSystem();
                this.systemControls();
                this.recharging();
            }
            if (this.player)
            {
                //Exit Ship View
                if (game.tildKey == true)
                {
                    game.tildKey = false;
                    this.player = false;
                    game.mode = "navigator";
                }
            }
            this.movementSystem();
            this.strafing();
            //console.log("Power: [ " + this.power + " / " + this.powerMAX + " ];");
        }
        //SET PLAYER TO SHIP IF DRIVING
        if (this.player == true)
        {
            game.mode = "driving";
            game.viewX = this.X;
            game.viewY = this.Y;
        }
    };

    //AI FUNCTIONS
    this.targetClosestEnemy = function(type)
    {
        if (type == "ship")
        {
            this.target = "none";
            var closest = "none";
            //attack nearby ships of differing faction
            for (var i = 0; i < game.shipsList.length; i++)
            {
                var isAlly = false;
                for (var al = 0; al < this.allies.length; al++)
                {
                    if (game.shipsList.faction == this.allies[al])
                    {
                        isAlly = true;
                    }
                }

                if (game.shipsList[i].faction != this.faction && game.shipsList[i].cloaking == false && isAlly == false)
                {
                    if (closest == "none" && this.distanceTo(game.shipsList[i]) <= this.radarRange)
                    {
                        this.target = game.shipsList[i];
                        closest = this.distanceTo(game.shipsList[i]);
                    }
                    else if (closest > this.distanceTo(game.shipsList[i]) && this.distanceTo(game.shipsList[i]) <= this.radarRange)
                    {
                        closest = this.distanceTo(game.shipsList[i]);
                        this.target = game.shipsList[i];
                    }
                }
            }
        }
        if (type == "sentry")
        {
            this.sentryTarget = "none";
            var closest = "none";
            //attack nearby ships of differing faction
            for (var i = 0; i < game.shipsList.length; i++)
            {
                var isAlly = false;
                for (var al = 0; al < this.allies.length; al++)
                {
                    if (game.shipsList.faction == this.allies[al])
                    {
                        isAlly = true;
                    }
                }

                if (game.shipsList[i].faction != this.faction && game.shipsList[i].cloaking == false && isAlly == false)
                {
                    if (closest == "none" && this.distanceTo(game.shipsList[i]) <= this.radarRange)
                    {
                        this.sentryTarget = game.shipsList[i];
                        closest = this.distanceTo(game.shipsList[i]);
                    }
                    else if (closest > this.distanceTo(game.shipsList[i]) && this.distanceTo(game.shipsList[i]) <= this.radarRange)
                    {
                        closest = this.distanceTo(game.shipsList[i]);
                        this.sentryTarget = game.shipsList[i];
                    }
                }
            }
        }

    }
}

function colorizedImage(img, sx, sy, w, h, szX, szY, a, colour)
{
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, sx, sy, w, h, 0, 0, szX, szY);
    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = a;
    ctx.fillStyle = colour;
    ctx.fillRect(0,0,w,h);
    return canvas;
}