/**
 * Created by skyeguy on 8/28/16.
 */
//This is for all enemies and allies... Ships are the life of this game.

//SHIP CLASS
function Ship(xx, yy, type, faction, AI, drive)
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
    this.aiWKey = false;
    this.aiSKey = false;
    this.aiAKey = false;
    this.aiDKey = false;
    //SHIP STATS (stats that all ships have)
    this.ID = "The Cyrilean";
    this.type = type;
    this.integrityMAX = 50; //the amount of damage the physical ship can take before total destruction.
    this.integrity = this.integrityMAX; //the current level of damage the ship can still withstand before destruction. damage to the ship affects the quality of all other functions the ship depends on.
    this.shieldsMAX = 150; //the total capacity of the ships shielding systems.
    this.shields = this.shieldsMAX; //the current status of the ships shielding systems.
    this.rechargeMAX = 5; //the rate at which shields recharge in the ships best condition.
    this.recharge = this.rechargeMAX; //the rate at which shields recharge, may be reduced if ship is damaged.
    this.powerMAX = 500; //the total power capacity that the ship has.
    this.power = this.powerMAX; //the current amount of power that the ship has left to run all of its functions with.
    this.cargoMAX = 25; //the total amount of cargo that the ship can carry.
    this.cargo = 0; //ships total cargo by volume.
    this.speedMAX = 30; //ships maximum potential speed
    this.speed = 0; //ships current speed
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
    this.upgrades = []; //equipment that is used to enhance the ship.
    this.ammunition = []; //all of the ammunitions that are in store in the ship.
    this.faction = faction; //This is the faction that the ship belongs to.
    this.shieldsColour = "blue";
    //Attack rate
    this.sidegunsRate = 0.2;
    this.sidegunsStoreTime = new Date().getTime();
    //turning off individual parts of the ship
    this.sidegunsPowered = true;

    //upgrade bonuses to default stats
    this.shieldsUP = 0;
    this.shieldsColourUP = "none";

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

    //SOUND DETAIL VARIABLES
    this.accelSoundTime1 = false;
    this.accelSoundTime2 = false;
    this.explosionSoundTime1 = false;
    this.explosionSoundTime2 = false;
    this.laserSound1Time1 = false;
    this.laserSound1Time2 = false;

    //SHIP STAT SETUP
    this.setShipStats = function()
    {
        if (this.type == "Afid01")
        {
            this.size = 34;
            this.integrityMAX = 50; //the amount of damage the physical ship can take before total destruction.
            this.integrity = this.integrityMAX;
            this.shieldsMAX = 150; //the total capacity of the ships shielding systems.
            this.shields = this.shieldsMAX;
            this.rechargeMAX = 5; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 1000; //the total power capacity that the ship has.
            this.power = this.powerMAX;
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
            this.upgrades = [{name: "F1Lasers", type: "Afid01", part: "sideguns"}];

            //sounds
            this.explosionSound = new Audio("sounds/heavyXPL.wav");
            this.accelSound = new Audio("sounds/accl.mp3");
            this.accelSoundTime1 = 0.2;
            this.accelSoundTime2 = 1.1;
            this.laserSound1 = new Audio("sounds/lightLas.wav");
        }
        else if (this.type == "Disk01")
        {
            this.size = 16;
            this.directionless = true;
            this.cloakable = true;
            this.integrityMAX = 20; //the amount of damage the physical ship can take before total destruction.
            this.integrity = this.integrityMAX;
            this.shieldsMAX = 90; //the total capacity of the ships shielding systems.
            this.shields = this.shieldsMAX;
            this.rechargeMAX = 3; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 500; //the total power capacity that the ship has.
            this.power = this.powerMAX;
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
            this.weaponCost = 0.35;
            this.explosionStyle = [25, 22, 30, ["Green", "Blue", "lightGreen"]];
            this.explosionSound = new Audio("sounds/muffledXPL.wav");
            this.idleSound = new Audio("sounds/hover.wav");
            this.destructDuration = 0.5;
            this.shieldsColour = "darkgreen";
            this.cloakingCost = 0.5;
        }
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
            return this.shieldsMAX + this.shieldsUP * (this.integrity / this.integrityMAX);
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
            return this.rechargeMAX * (this.integrity / this.integrityMAX);
        }
        else
        {
            return 0;
        }
    };

    this.getSpeed = function()
    {
        return this.speedMAX * (this.integrity / this.integrityMAX);
    };

    this.getAcceleration = function()
    {
        return this.accelerationMAX * (this.integrity / this.integrityMAX);
    };

    this.getHandling = function()
    {
        return this.handlingMAX * (this.integrity / this.integrityMAX);
    };

    this.getStrafe = function()
    {
        return this.strafeMAX * (this.integrity / this.integrityMAX);
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
        }

        //To Do with stats
        if (this.integrity > this.integrityMAX)
        {
            this.integrity = this.integrityMAX;
        }
        else if (this.integrity < 0)
        {
            this.destructed = true;
        }

        if (this.shields > this.shieldsMAX)
        {
            this.shields = this.shieldsMAX;
        }
        else if (this.shields < 0)
        {
            this.shields = 0;
        }

        if (this.recharge > this.rechargeMAX)
        {
            this.recharge = this.rechargeMAX;
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

        if (this.acceleration > this.accelerationMAX)
        {
            this.acceleration = this.accelerationMAX;
        }
        else if (this.acceleration < 0)
        {
            this.acceleration = 0;
        }

        if (this.handling > this.handlingMAX)
        {
            this.handling = this.handlingMAX;
        }
        else if (this.handling < 0)
        {
            this.handling = 0;
        }
    };

    //DRAW SHIPS

    this.drawShip = function()
    {
        if (ifInScreenDraw(this.X, this.Y, this.size))
        {
            //DRAW SHIPS
            if (this.type == "Afid01")
            {
                this.accessUpgrades("drawBelow");
                if (this.speedAlteration == false)
                {
                    if (this.shieldingOnline && this.shieldsMAX > 0 && this.shields > 0)
                    {
                        var colorized = colorizedImage(divineStarterPack, 13, 11, 36, 51, 36, 51, 0.3 * this.shields/this.getShields(), this.getShieldsColour());
                        draw(colorized, 0, 0, 36, 51, this.X, this.Y, 36, 51, this.rotation, false, 1, 0, -5);
                    }
                    else
                    {
                        draw(divineStarterPack, 13, 11, 36, 51, this.X, this.Y, 36, 51, this.rotation, false, 1, 0, -5);
                    }
                }
                else
                {
                    if (this.shieldingOnline && this.shieldsMAX > 0 && this.shields > 0)
                    {
                        var colorized = colorizedImage(divineStarterPack, 65, 11, 36, 51, 36, 51, 0.3 * this.shields/this.shieldsMAX, this.shieldsColour);
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
                    if (this.shieldingOnline && this.shieldsMAX > 0 && this.shields > 0)
                    {
                        var colorized = colorizedImage(divineStarterPack, 124, 165, 32, 32, 32, 32, 0.65 * this.shields/this.getShields(), this.getShieldsColour());
                        draw(colorized, 0, 0, 32, 32, this.X, this.Y, 32, 32, this.rotation, false, 1, 0, 0);
                    }
                    else
                    {
                        draw(divineStarterPack, 124, 165, 32, 32, this.X, this.Y, 32, 32, 0, false, 1, 0, 0);
                    }
                }
                else
                {
                    if (this.shieldingOnline && this.shieldsMAX > 0 && this.shields > 0)
                    {
                        var colorized = colorizedImage(divineStarterPack, 183, 163, 32, 32, 32, 32, 0.65 * this.shields/this.getShields(), "black");
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
            this.X += Math.cos(this.targetRotation) * this.speed;
            this.Y += Math.sin(this.targetRotation) * this.speed;
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
            this.X += Math.cos(this.targetRotation + Math.PI/2) * this.strafe;
            this.Y += Math.sin(this.targetRotation + Math.PI/2) * this.strafe;
        }
        else
        {
            this.X += Math.cos(this.rotation) * this.strafe;
            this.Y += Math.sin(this.rotation) * this.strafe;
        }
    };

    this.systemControls = function()
    {
        if (this.player == true)
        {
            //activate upgrade effects
            this.accessUpgrades("playerActivate");

            //Exit Ship View
            if (game.tildKey == true)
            {
                game.tildKey = false;
                this.player = false;
                game.mode = "navigator";
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
                    this.shieldingOnline = true;
                }
                else if (this.shieldingOnline)
                {
                    this.shieldingOnline = false;
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
            }
            //Movement
            if (this.directionless == true)
            {
                if (game.wKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.min(this.getSpeed(), this.speed + (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
                }
                else if (game.sKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
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
                    this.power -= this.accelerationCost / 100;
                }
                else if (game.sKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
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
                    this.power -= this.accelerationCost / 100;
                }
                else if (game.dKey == true)
                {
                    playSound(this.accelSound, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.strafe = Math.min(this.getStrafe(), this.strafe + (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
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
                if (game.wKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.min(this.getSpeed(), this.speed + (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
                }
                else if (game.sKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
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
                    this.power -= this.accelerationCost / 100;
                }
                else if (this.aiSKey == true)
                {
                    playSound(this.accelSound, false, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.speed = Math.max(0, this.speed - (this.acceleration / 25));
                    this.strafe = Math.max(0, this.strafe - (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
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
                    this.power -= this.accelerationCost / 100;
                }
                else if (this.aiDKey == true)
                {
                    playSound(this.accelSound, this.accelSoundTime1, this.accelSoundTime2);
                    this.speedAlteration = true;
                    this.strafe = Math.min(this.getStrafe(), this.strafe + (this.acceleration / 25));
                    this.power -= this.accelerationCost / 100;
                }
            }

            if (this.brain == "basic")
            {
                this.target = "none";
                var closest = "none";
                //attack nearby ships of differing faction
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    if (game.shipsList[i].faction != this.faction && game.shipsList[i].cloaking == false) //todo also make it so that it will not target allies.
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
                    this.offline = false;
                }
                else if (this.offline == false)
                {
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

    this.accessUpgrades = function(use) //draw: "drawBelow"/"drawAbove" activate upgrade's functions: "activate"/"playerActivate"
    {
        if (this.upgrades.length > 0)
        {
            for (var i = 0; i < this.upgrades.length; i++)
            {
                if (this.upgrades[i].name == "F1Lasers" && this.upgrades[i].type == "Afid01" && this.upgrades[i].part == "sideguns")
                {
                    if (use == "drawAbove")
                    {
                        if (this.shieldingOnline && this.shieldsMAX > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineStarterPack, 16, 74, 30, 14, 30, 14, 0.3 * this.shields/this.getShields(), this.getShieldsColour());
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
                                game.projectilesList.push(new Projectile("f1Laser", this.X + Math.cos(this.rotation - Math.PI * 11 / 16) * 20, this.Y + Math.sin(this.rotation - Math.PI * 11 / 16) * 20, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("f1Laser", this.X + Math.cos(this.rotation - Math.PI * 5 / 16) * 20, this.Y + Math.sin(this.rotation - Math.PI * 5 / 16) * 20, this, this.rotation - Math.PI / 2));
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
                                game.projectilesList.push(new Projectile("f1Laser", this.X + Math.cos(this.rotation - Math.PI * 11 / 16) * 20, this.Y + Math.sin(this.rotation - Math.PI * 11 / 16) * 20, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("f1Laser", this.X + Math.cos(this.rotation - Math.PI * 5 / 16) * 20, this.Y + Math.sin(this.rotation - Math.PI * 5 / 16) * 20, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
            }
        }
    };

    this.runSystems = function()
    {
        this.destruct();
        if (this.activateThisShip)
        {
            this.setShipStats();
            this.activateThisShip = false;
        }
        this.mandateStats();
        this.drawShip();
        this.turnOnOffShip();
        if (this.power > 0 && this.offline == false)
        {
            this.rotationSystem();
            this.systemControls();
        }
        this.movementSystem();
        this.strafing();
        //console.log("Power: [ " + this.power + " / " + this.powerMAX + " ];");

        //SET PLAYER TO SHIP IF DRIVING
        if (this.player == true)
        {
            game.mode = "driving";
            game.viewX = this.X;
            game.viewY = this.Y;
        }
    };
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