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

    //functionality
    this.damagedBy = [];

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
    this.aiTimer = 0;
    this.aiEvent = {event1: false, event2: false};
    this.aiTimerStore = new Date().getTime();
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
    //HUD (ship menus)
    this.hudColor = "lightBlue";
    this.hudBGColor = "darkGrey";

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

    //current resistances
    this.distortResistUP = false;

    //base resistances
    this.distortResist = false;

    //Status effects
    this.handlingDebuffTime = 0;
    this.handlingDebuffStore = new Date().getTime();
    this.handlingDebuff = 1;

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
            this.boostSpeed = 34;
            this.boostAccel = 4.5;
            this.boostHandle = 1.05/100 * Math.PI;
            this.boostStrafe = 12;
            this.boostCost = 1;

            if (upgrade == "Standard")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Afid01-F1Lasers", 1), itemize("Afid01-M1Launcher", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Afid01-F1Lasers", 1), itemize("Afid01-M1Launcher", 1), itemize("Afid01-Boosters", 1), itemize("RedStarShields", 1), itemize("Afid01-F1SentryGun", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [itemize("CORE", 1)];
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
                this.upgrades = [itemize("CORE", 1), itemize("Disk01-F1SingleStream", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Disk01-F1SingleStream", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [itemize("CORE", 1)];
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
        else if (this.type == "Mantis09")
        {
            this.size = 48;
            this.integrityMAX = 90; //the amount of damage the physical ship can take before total destruction.
            this.shieldsMAX = 400; //the total capacity of the ships shielding systems.
            this.rechargeMAX = 7; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 6400; //the total power capacity that the ship has.
            this.radarRange = 18000;
            this.cargoMAX = 20; //the total amount of cargo that the ship can carry.
            this.speedMAX = 49; //ships maximum potential speed
            this.accelerationMAX = 7;//max speed up/slow down rate
            this.acceleration = this.accelerationMAX;
            this.handlingMAX = 5/100 * Math.PI; //max turn speed
            this.handling = this.handlingMAX;
            this.strafable = true;
            this.strafeMAX = 23;
            this.shieldingCost = 0.2;
            this.rechargeCost = 0.4;
            this.accelerationCost = 0.25;
            this.handlingCost = 0.05;
            this.weaponCost = 1;
            this.explosionStyle = [35, 22, 30, ["#003300", "#66ff99", "#339966"]];
            this.shieldsColour = "#669900";
            this.boostSpeed = 52;
            this.boostAccel = 8;
            this.boostHandle = 6/100 * Math.PI;
            this.boostStrafe = 25;
            this.boostCost = 0.55;

            if (upgrade == "Standard")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Mantis09-PlasmaBlasters", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Mantis09-PlasmaCannon", 1), itemize("Mantis09-PlasmaAccelerator", 1), itemize("JadeDragonShields", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [itemize("CORE", 1)];
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
                this.ammunition = [itemize("PlasmaticSeeker", 4)];
            }
            else if (ammo == "Some")
            {
                this.ammunition = [itemize("PlasmaticSeeker", 6)];
            }
            else if (ammo == "Good")
            {
                this.ammunition = [itemize("PlasmaticSeeker", 10)];
            }
            else if (ammo == "Stocked")
            {
                this.ammunition = [itemize("PlasmaticSeeker", 16), itemize("PlasmaticSeeker", 4)];
            }
            else if (ammo == "Doom")
            {
                this.ammunition = [itemize("PlasmaticSeeker", 16), itemize("PlasmaticSeeker", 16), itemize("PlasmaticSeeker", 8)];
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
        else if (this.type == "Majestad")
        {
            this.size = 150;
            this.integrityMAX = 1000; //the amount of damage the physical ship can take before total destruction.
            this.shieldsMAX = 9000; //the total capacity of the ships shielding systems.
            this.rechargeMAX = 25; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 90000; //the total power capacity that the ship has.
            this.radarRange = 65000;
            this.cargoMAX = 100; //the total amount of cargo that the ship can carry.
            this.speedMAX = 80; //ships maximum potential speed
            this.accelerationMAX = 4;//max speed up/slow down rate
            this.acceleration = this.accelerationMAX;
            this.handlingMAX = 1/100 * Math.PI; //max turn speed
            this.handling = this.handlingMAX;
            this.strafable = true;
            this.strafeMAX = 6;
            this.shieldingCost = 0.5;
            this.rechargeCost = 1;
            this.accelerationCost = 1;
            this.handlingCost = 0.1;
            this.weaponCost = 15;
            this.explosionStyle = [100, 32, 45, ["#3366cc", "#3399ff", "#66ccff"]];
            this.shieldsColour = "#003399";
            this.boostSpeed = 100;
            this.boostAccel = 10;
            this.boostHandle = 0.5/100 * Math.PI;
            this.boostStrafe = 12;
            this.boostCost = 5;
            this.turretRot1 = 0;
            this.turret1Rate = 1;
            this.turret1StoreTime = new Date().getTime();
            this.turretRot2 = 0;
            this.turret2Rate = 1;
            this.turret2StoreTime = new Date().getTime();
            this.turretRot3 = 0;
            this.turret3Rate = 1;
            this.turret3StoreTime = new Date().getTime();

            if (upgrade == "Standard")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Majestad-TrineumRay", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Majestad-TrineumDisseminator", 1), itemize("Majestad-TrineumBlasterSentryGuns", 1), itemize("Majestad-CelesteShields", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [itemize("CORE", 1)];
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
                this.ammunition = [itemize("TrineumSeeker", 2)];
            }
            else if (ammo == "Some")
            {
                this.ammunition = [itemize("TrineumSeeker", 4)];
            }
            else if (ammo == "Good")
            {
                this.ammunition = [itemize("TrineumSeeker", 8)];
            }
            else if (ammo == "Stocked")
            {
                this.ammunition = [itemize("TrineumSeeker", 10), itemize("TrineumSeeker", 4)];
            }
            else if (ammo == "Doom")
            {
                this.ammunition = [itemize("TrineumSeeker", 10), itemize("TrineumSeeker", 10)];
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
        else if (this.type == "Screecher")
        {
            this.size = 47;
            this.integrityMAX = 150; //the amount of damage the physical ship can take before total destruction.
            this.shieldsMAX = 350; //the total capacity of the ships shielding systems.
            this.rechargeMAX = 8; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 8000; //the total power capacity that the ship has.
            this.radarRange = 27000;
            this.cargoMAX = 10; //the total amount of cargo that the ship can carry.
            this.speedMAX = 60; //ships maximum potential speed
            this.accelerationMAX = 11;//max speed up/slow down rate
            this.acceleration = this.accelerationMAX;
            this.handlingMAX = 7/100 * Math.PI; //max turn speed
            this.handling = this.handlingMAX;
            this.strafable = true;
            this.strafeMAX = 5;
            this.shieldingCost = 0.2;
            this.rechargeCost = 0.4;
            this.accelerationCost = 1;
            this.handlingCost = 0.05;
            this.weaponCost = 0.35;
            this.explosionStyle = [35, 22, 30, ["#B42A01", "#6D0303", "#FF0000"]];
            this.shieldsColour = "#4A2020";
            this.boostSpeed = 90;
            this.boostAccel = 15;
            this.boostHandle = 0.1/100 * Math.PI;
            this.boostStrafe = 1;
            this.boostCost = 3;
            this.turretRot1 = 0;
            this.turret1Rate = 0.55;
            this.turret1StoreTime = new Date().getTime();
            this.turretRot2 = 0;
            this.turret2Rate = 0.55;
            this.turret2StoreTime = new Date().getTime();

            if (upgrade == "Standard")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Screecher-F3Lasers", 1), itemize("Screecher-F3SentryGuns", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Screecher-EtherBlasters", 1), itemize("StabilizingParticleFogShield", 1), itemize("Screecher-EtherSentryGuns", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [itemize("CORE", 1)];
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
                this.ammunition = [];
            }
            else if (ammo == "Some")
            {
                this.ammunition = [];
            }
            else if (ammo == "Good")
            {
                this.ammunition = [];
            }
            else if (ammo == "Stocked")
            {
                this.ammunition = [];
            }
            else if (ammo == "Doom")
            {
                this.ammunition = [];
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
        else if (this.type == "Harbinger88")
        {
            this.size = 1150;
            this.integrityMAX = 30000; //the amount of damage the physical ship can take before total destruction.
            this.shieldsMAX = 210000; //the total capacity of the ships shielding systems.
            this.rechargeMAX = 100; //the rate at which shields recharge in the ships best condition.
            this.recharge = this.rechargeMAX;
            this.powerMAX = 1000000; //the total power capacity that the ship has.
            this.radarRange = 300000;
            this.cargoMAX = 500; //the total amount of cargo that the ship can carry.
            this.speedMAX = 120; //ships maximum potential speed
            this.accelerationMAX = 5;//max speed up/slow down rate
            this.acceleration = this.accelerationMAX;
            this.handlingMAX = 0.1/100 * Math.PI; //max turn speed
            this.handling = this.handlingMAX;
            this.strafable = true;
            this.strafeMAX = 10;
            this.shieldingCost = 0.25;
            this.rechargeCost = 0.5;
            this.accelerationCost = 5;
            this.handlingCost = 0.25;
            this.weaponCost = 50;
            this.explosionStyle = [1000, 10, 100, ["#53116D", "#500296", "#3D0852"]];
            this.shieldsColour = "#34116D";
            this.boostSpeed = 130;
            this.boostAccel = 10;
            this.boostHandle = 0.01/100 * Math.PI;
            this.boostStrafe = 10;
            this.boostCost = 20;

            this.distortResist = true;

            this.turretRot1 = 0;
            this.turret1Rate = 1;
            this.turret1StoreTime = new Date().getTime();
            this.turretRot2 = 0;
            this.turret2Rate = 1;
            this.turret2StoreTime = new Date().getTime();
            this.turretRot3 = 0;
            this.turret3Rate = 1;
            this.turret3StoreTime = new Date().getTime();

            if (upgrade == "Standard")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Harbinger88-FusionLaunchers", 1), itemize("Harbinger88-FusionCasters", 1)];
            }
            else if (upgrade == "Advanced")
            {
                this.upgrades = [itemize("CORE", 1), itemize("Harbinger88-FusionLaunchers", 1), itemize("Harbinger88-FusionCompactionCannon", 1)];
            }
            else if (upgrade == "Basic")
            {
                this.upgrades = [itemize("CORE", 1)];
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
                this.ammunition = [itemize("FusionSeeker", 2)];
            }
            else if (ammo == "Some")
            {
                this.ammunition = [itemize("FusionSeeker", 4)];
            }
            else if (ammo == "Good")
            {
                this.ammunition = [itemize("FusionSeeker", 4), itemize("FusionSeeker", 2)];
            }
            else if (ammo == "Stocked")
            {
                this.ammunition = [itemize("FusionSeeker", 4), itemize("FusionSeeker", 4)];
            }
            else if (ammo == "Doom")
            {
                this.ammunition = [itemize("FusionSeeker", 4), itemize("FusionSeeker", 4), itemize("FusionSeeker", 4)];
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

        //Predetermined Cargo
        if (typeof(cargoHold) != "undefined" && cargoHold != false)
        {
            this.cargoBay = cargoHold;
        }
    };

    this.resetBonuses = function()
    {
        //resistanceReset
        this.distortResistUP = this.distortResist;

        //bonusReset
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
        this.accessUpgrades("bonus");
    };

    this.effects = function()
    {
        //handling debuff
        if (this.handlingDebuffTime > 0)
        {
            if (new Date().getTime() - this.handlingDebuffStore > 100)
            {
                this.handlingDebuffTime -= 0.1;
            }
        }
        else
        {
            this.handlingDebuff = 1;
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
            return (this.boostHandle + this.boostHandleUP) * (this.integrity / this.integrityMAX) * this.handlingDebuff;
        }
        else
        {
            return (this.handlingMAX + this.handlingUP) * (this.integrity / this.integrityMAX) * this.handlingDebuff;
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
        this.cargo = this.cargoBay.length;
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
                else if (this.type == "Disk01")
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
                else if (this.type == "Mantis09")
                {
                    this.accessUpgrades("drawBelow");
                    if (this.speedAlteration == false)
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitA, 7, 11, 60, 64, 60, 64, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 60, 64, this.X, this.Y, 60 * 2, 64 * 2, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitA, 7, 11, 60, 64, this.X, this.Y, 60 * 2, 64 * 2, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitA, 72, 11, 60, 64, 60, 64, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 60, 64, this.X, this.Y, 60 * 2, 64 * 2, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitA, 72, 11, 60, 64, this.X, this.Y, 60 * 2, 64 * 2, this.rotation, false, 1, 0, 0);
                        }
                    }
                    //circle(true, this.X + Math.cos(this.rotation - Math.PI * 6.3 / 16) * 39, this.Y  + Math.sin(this.rotation - Math.PI * 6.3 / 16) * 39, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
                    //circle(true, this.X + Math.cos(this.rotation - Math.PI * 9.7 / 16) * 39, this.Y  + Math.sin(this.rotation - Math.PI * 9.7 / 16) * 39, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
                    this.accessUpgrades("drawAbove");
                }
                else if (this.type == "Majestad")
                {
                    this.accessUpgrades("drawBelow");
                    if (this.speedAlteration == false)
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitB, 11, 95, 43, 108, 43, 108, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 43, 108, this.X, this.Y, 43 * 5.2, 108 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitB, 11, 95, 43, 108, this.X, this.Y, 43 * 5.2, 108 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitB, 56, 95, 43, 108, 43, 108, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 43, 108, this.X, this.Y, 43 * 5.2, 108 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitB, 56, 95, 43, 108, this.X, this.Y, 43 * 5.2, 108 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                    }
                    //circle(true, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1) * 10, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1) * 10, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
                    //circle(true, this.X + Math.cos(this.rotation - Math.PI * 53.5 / 80) * -120, this.Y  + Math.sin(this.rotation - Math.PI * 53.5 / 80) * -120, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
                    this.accessUpgrades("drawAbove");
                }
                else if (this.type == "Screecher")
                {
                    this.accessUpgrades("drawBelow");
                    if (this.speedAlteration == false)
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitC, 9, 22, 236, 128, 236, 128, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 236, 128, this.X, this.Y, 236 * 1, 128 * 1, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitC, 9, 22, 236, 128, this.X, this.Y, 236 * 1, 128 * 1, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitC, 258, 21, 236, 128, 236, 128, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 236, 128, this.X, this.Y, 236 * 1, 128 * 1, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitC, 258, 21, 236, 128, this.X, this.Y, 236 * 1, 128 * 1, this.rotation, false, 1, 0, 0);
                        }
                    }
                    //circle(true, this.X + Math.cos(this.rotation - Math.PI * 0 / 16) * 39.5, this.Y + Math.sin(this.rotation - Math.PI * 0 / 16) * 39.5, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
                    //circle(true, this.X + Math.cos(this.rotation - Math.PI * 53.5 / 80) * -120, this.Y  + Math.sin(this.rotation - Math.PI * 53.5 / 80) * -120, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
                    this.accessUpgrades("drawAbove");
                }
                else if (this.type == "Harbinger88")
                {
                    this.accessUpgrades("drawBelow");
                    if (this.speedAlteration == false)
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitD, 8, 124, 423, 558, 423, 558, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 423, 558, this.X, this.Y, 423 * 5, 558 * 5, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitD, 8, 124, 423, 558, this.X, this.Y, 423 * 5, 558 * 5, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitD, 417, 123, 423, 558, 423, 558, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 423, 558, this.X, this.Y, 423 * 5, 558 * 5, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitD, 417, 123, 423, 558, this.X, this.Y, 423 * 5, 558 * 5, this.rotation, false, 1, 0, 0);
                        }
                    }
                    //circle(true, this.X + Math.cos(this.rotation - Math.PI * 12.5 / 16) * 940, this.Y + Math.sin(this.rotation - Math.PI * 12.5 / 16) * 940, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
                    //circle(true, this.X + Math.cos(this.rotation - Math.PI * 53.5 / 80) * -120, this.Y  + Math.sin(this.rotation - Math.PI * 53.5 / 80) * -120, 2, 0, 2 * Math.PI, "blue", 1, false, false, 0, 1);
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

                    //radar dots that represent planets allies and enemies
                    for (var i = 0; i < game.sceneryList.length; i++)
                    {
                        if (game.sceneryList[i].type == "planet")
                            if (this.distanceTo(game.sceneryList[i]) <= this.radarRange)
                            {
                                circle(true, this.X + Math.cos(Math.atan2(game.sceneryList[i].Y - this.Y, game.sceneryList[i].X - this.X)) * (11 + this.size * 1.4), this.Y + Math.sin(Math.atan2(game.sceneryList[i].Y - this.Y, game.sceneryList[i].X - this.X)) * (11 + this.size * 1.4), 4, 0, 2*Math.PI, "#228B22", false, false, false, false, 0.85);
                            }
                    }
                    for (var i = 0; i < game.shipsList.length; i++)
                    {
                        if (game.shipsList[i] !== this && game.shipsList[i].cloaking != true && game.shipsList[i].destructed != true)
                        {
                            var isAlly = false;
                            if (game.shipsList[i].faction == "Player")
                            {
                                isAlly = true;
                            }
                            else
                            {
                                for (var j = 0; j < this.allies.length; j++)
                                {
                                    if (game.shipsList[i].faction == this.allies[j])
                                    {
                                        isAlly = true;
                                    }
                                }
                            }

                            if (this.distanceTo(game.shipsList[i]) <= this.radarRange)
                            {
                                if (isAlly)
                                {
                                    circle(true, this.X + Math.cos(Math.atan2(game.shipsList[i].Y - this.Y, game.shipsList[i].X - this.X)) * (9 + this.size * 1.4), this.Y + Math.sin(Math.atan2(game.shipsList[i].Y - this.Y, game.shipsList[i].X - this.X)) * (11 + this.size * 1.4), 2, 0, 2*Math.PI, "blue", false, false, false, false, 0.333);
                                }
                                else
                                {
                                    circle(true, this.X + Math.cos(Math.atan2(game.shipsList[i].Y - this.Y, game.shipsList[i].X - this.X)) * (10 + this.size * 1.4), this.Y + Math.sin(Math.atan2(game.shipsList[i].Y - this.Y, game.shipsList[i].X - this.X)) * (11 + this.size * 1.4), 2, 0, 2*Math.PI, "#d63a44", false, false, false, false, 0.425);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    this.rotationSystem = function()
    {
        if (this.directionless != true)
        {
            if (distBetweenAngles(this.targetRotation, this.rotation) > this.getHandling())
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
                    this.rotation = this.rotation + this.getHandling();
                    this.power -= this.handlingCost / 1000000;
                }
                else
                {
                    this.rotation = this.rotation - this.getHandling();
                    this.power -= this.handlingCost / 1000000;
                }
                this.rotation = this.rotation % (2 * Math.PI);
            }
            else if (distBetweenAngles(this.targetRotation, this.rotation) > (1/100 * Math.PI) && this.getHandling() > (1/100 * Math.PI))
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
                    this.rotation = this.rotation + (1/100 * Math.PI);
                    this.power -= this.handlingCost / 100000000;
                }
                else
                {
                    this.rotation = this.rotation - (1/100 * Math.PI);
                    this.power -= this.handlingCost / 100000000;
                }
                this.rotation = this.rotation % (2 * Math.PI);
            }
            else if (distBetweenAngles(this.targetRotation, this.rotation) > (0.1/100 * Math.PI) && this.getHandling() > (0.1/100 * Math.PI))
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
                    this.rotation = this.rotation + (0.1/100 * Math.PI);
                    this.power -= this.handlingCost / 100000000;
                }
                else
                {
                    this.rotation = this.rotation - (0.1/100 * Math.PI);
                    this.power -= this.handlingCost / 100000000;
                }
                this.rotation = this.rotation % (2 * Math.PI);
            }
            else if (this.getHandling() > 0)
            {
                this.rotation = this.targetRotation;
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
            if (game.iKey == true)
            {
                game.iKey = false;
                game.interInventory = true;
                game.interInv1 = this.cargoBay;
                game.interInv2 = game.interEmptyList;
                game.interContext = "Inventory";
                game.interInvCargoMAX1 = this.cargoMAX;
            }
            if (game.uKey == true)
            {
                game.uKey = false;
                game.interInventory = true;
                game.interInv1 = this.cargoBay;
                game.interInv2 = this.upgrades;
                game.interContext = "Upgrade";
                game.interInvCargoMAX1 = this.cargoMAX;
            }
            if (game.yKey == true)
            {
                game.yKey = false;
                game.interInventory = true;
                game.interInv1 = this.cargoBay;
                game.interInv2 = this.ammunition;
                game.interContext = "Ammunition";
                game.interInvCargoMAX1 = this.cargoMAX;
            }
            if (game.kKey == true)
            {
                game.kKey = false;
                game.interInventory = true;
                game.interInv1 = this.cargoBay;
                game.interInv2 = game.interEmptyList;
                game.interContext = "Repair";
                game.interInvCargoMAX1 = this.cargoMAX;
            }

            if (game.tabKey == true)
            {
                game.tabKey = false;
                if (game.coordinates)
                {
                    game.coordinates = false;
                }
                else if (this.power > 0)
                {
                    game.coordinates = true;
                }
            }
            //tell the game my coordinates
            if (this.power > 0)
            {
                game.playerX = this.X;
                game.playerY = this.Y;
                game.playerHUDColor = this.hudColor;
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
                    pauseSound(this.accelSound);
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
                    pauseSound(this.accelSound);
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
            if (this.brain == "basic" || this.brain == "basic-missile" || this.brain == "simple" || this.brain == "simple-missile" || this.brain == "swooper" || this.brain == "swooper-missile" || this.brain == "tank" || this.brain == "tank-missile")
            {
                this.targetClosestEnemy("ship");
            }

            if (new Date().getTime() - this.aiTimerStore > 100)
            {
                this.aiTimerStore = new Date().getTime();
                this.aiTimer += 0.1;
            }

            //AI BRAINS
            if (this.brain == "tank" || this.brain == "tank-missile")
            {
                if (this.target != "none")
                {
                    if (this.integrity / this.integrityMAX < 0.25) //flee if at low health
                    {
                        if (this.brain == "tank-missile")
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
                    else //fight
                    {
                        var dtt = this.distanceTo(this.target);
                        if (dtt < this.radarRange)
                        {
                            if (this.size > 90)
                            {
                                if (this.speed < 0.1 * this.getSpeed() && dtt > 16000)
                                {
                                    this.aiWKey = true;
                                }
                                else
                                {
                                    this.aiWKey = false;
                                }

                                if (dtt <= 16000)
                                {
                                    this.aiSKey = true;
                                }
                                else
                                {
                                    this.aiSKey = false;
                                }

                                if (dtt <= 20000)
                                {
                                    this.aiSpaceKey = true;
                                }
                                else
                                {
                                    this.aiSpaceKey = false;
                                }

                                if (this.brain == "tank-missile" && dtt <= 21000)
                                {
                                    this.aiQKey = true;
                                }
                                else
                                {
                                    this.aiQKey = false;
                                }
                            }
                            else
                            {
                                if (this.speed < 0.1 * this.getSpeed() && dtt > 7000)
                                {
                                    this.aiWKey = true;
                                }
                                else
                                {
                                    this.aiWKey = false;
                                }

                                if (dtt <= 7000)
                                {
                                    this.aiSKey = true;
                                }
                                else
                                {
                                    this.aiSKey = false;
                                }

                                if (dtt <= 8000)
                                {
                                    this.aiSpaceKey = true;
                                }
                                else
                                {
                                    this.aiSpaceKey = false;
                                }

                                if (this.brain == "tank-missile" && dtt <= 8500)
                                {
                                    this.aiQKey = true;
                                }
                                else
                                {
                                    this.aiQKey = false;
                                }
                            }

                            this.targetRotation = Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;
                        }
                    }
                }
                else
                {

                }
            }
            else if (this.brain == "swooper" || this.brain == "swooper-missile")
            {
                if (this.target != "none")
                {
                    if (this.integrity / this.integrityMAX <= 0.7 || this.power / this.powerMAX < 0.2) //run away
                    {
                        this.targetRotation = - Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;

                        if (this.brain == "swooper-missile")
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
                    else //fight
                    {
                        if (this.distanceTo(this.target) < this.radarRange)
                        {
                            this.aiWKey = true;
                            if (this.aiPhase == false)
                            {
                                this.aiShiftKey = true;
                            }
                            else
                            {
                                this.aiShiftKey = false;
                            }
                            this.aiSKey = false;

                            if (this.aiPhase == false || this.aiPhase == "midway")
                            {
                                this.targetRotation = Math.atan2(this.Y - this.target.Y, this.X - this.target.X) - 1/2 * Math.PI;
                            }

                            if (this.distanceTo(this.target) > 2200 && this.aiPhase == true || this.aiTimer > 3 && this.aiPhase == true)
                            {
                                this.aiPhase = "midway";
                            }

                            if (this.aiPhase == "midway")
                            {
                                if (this.brain == "swooper-missile")
                                {
                                    this.aiQKey = true;
                                }

                                if (distBetweenAngles(this.targetRotation, this.rotation) <= this.getHandling())
                                {
                                    this.aiPhase = false;
                                }
                            }

                            if (this.distanceTo(this.target) < 10000 && this.aiPhase == false || this.distanceTo(this.target) < 10000 && this.aiPhase == "pushOn")
                            {
                                if (this.brain == "swooper-missile")
                                {
                                    this.aiQKey = true;
                                }
                                this.aiSpaceKey = true;

                                if (this.distanceTo(this.target) < 500 && this.distanceTo(this.target) > 50 && this.aiEvent.event1 == false)
                                {
                                    this.aiEvent.event1 = true;
                                    this.aiPhase = "pushOn";
                                }
                                else if (this.distanceTo(this.target) < 1000 && this.distanceTo(this.target) > 600 && this.aiEvent.event1 == true)
                                {
                                    this.aiEvent.event1 = false;
                                    this.aiPhase = true;
                                    this.aiSpaceKey = false;
                                    this.aiTimerStore = new Date().getTime();
                                    this.aiTimer = 0;
                                    this.aiQKey = false;
                                    var rnd = Math.random();
                                    if (rnd <= 0.4)
                                    {
                                        this.targetRotation += 1/8 * Math.PI;
                                    }
                                    else if (rnd <= 0.8)
                                    {
                                        this.targetRotation -= 1/8 * Math.PI;
                                    }
                                }
                            }
                            else
                            {
                                this.aiQKey = false;
                                this.aiSpaceKey = false;
                            }
                        }
                    }
                }
                else
                {

                }
            }
            else if (this.brain == "simple" || this.brain == "simple-missile")
            {
                if (this.target != "none")
                {
                    if (this.integrity / this.integrityMAX <= 0.9|| this.power / this.powerMAX < 0.25) //run away
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
                    else //fight
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
                                //this.targetrotation = this.targetRotation;
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
                game.coordinates = false;
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
                //drop cargo upon deletion

                    //insert scrap into cargo upon destruction
                var scrapPotential = (this.size / 15) * 5;
                var scrapp = Math.round(Math.random() * scrapPotential);
                var scrapStack = Math.floor(scrapp / 15);

                if (scrapp % scrapStack != 0 && scrapStack != 0 && scrapp != 0)
                {
                    this.cargoBay.unshift(itemize("Scrap", scrapp % scrapStack));
                }
                else if (scrapp < 15 && scrapp > 0)
                {
                    this.cargoBay.unshift(itemize("Scrap", scrapp));
                }

                for (var ii = 0; ii < scrapStack; ii++)
                {
                    this.cargoBay.unshift(itemize("Scrap", 15));
                }
                    //this part actually creates the cargo hold scenery object.
                game.sceneryList.push(new Scenery(this.X, this.Y, "cargohold", this.cargoBay, this.cargoMAX)); //this.cargoBay
                //delete this ship
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
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("F1Laser", this.X + Math.cos(this.rotation - Math.PI * 16 / 16) * 12.25, this.Y + Math.sin(this.rotation - Math.PI * 16 / 16) * 11.5, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F1Laser", this.X + Math.cos(this.rotation - Math.PI * 0 / 16) * 12.25, this.Y + Math.sin(this.rotation - Math.PI * 0 / 16) * 11.5, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Afid01-Boosters" && this.type == "Afid01" && this.upgrades[i].part == "boosters")
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
                if (this.upgrades[i].name == "RedStarShields" && this.upgrades[i].part == "shielding")
                {
                    if (use == "bonus")
                    {
                        this.shieldsColourUP = "crimson";
                        this.shieldsUP = 250;
                        this.rechargeUP = 5;
                    }
                }
                if (this.upgrades[i].name == "CosmosShields" && this.upgrades[i].part == "shielding")
                {
                    if (use == "bonus")
                    {
                        this.shieldsColourUP = "white";
                        this.shieldsUP = 360;
                        this.rechargeUP = 4;
                    }
                }
                if (this.upgrades[i].name == "JadeDragonShields" && this.upgrades[i].part == "shielding")
                {
                    if (use == "bonus")
                    {
                        this.shieldsColourUP = "#003300";
                        this.shieldsUP = 200;
                        this.rechargeUP = 6;
                    }
                }
                if (this.upgrades[i].name == "Afid01-M1Launcher" && this.type == "Afid01" && this.upgrades[i].part == "mainguns")
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
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("M1Missile", this.X + Math.cos(this.rotation - Math.PI / 2) * 27, this.Y + Math.sin(this.rotation - Math.PI / 2) * 27, this, this.rotation - Math.PI / 2));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Afid01-F1SentryGun" && this.type == "Afid01" && this.upgrades[i].part == "turret")
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
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("F1Laser", this.X  - Math.cos(this.rotation - Math.PI * 7 / 16) * 1.16, this.Y - Math.sin(this.rotation - Math.PI * 7 / 16) * 1.16, this, this.rotation + this.turretRot1));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Disk01-F1SingleStream" && this.type == "Disk01" && this.upgrades[i].part == "turret")
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
                if (this.upgrades[i].name == "CORE" && this.type == "Mantis09")
                {
                    this.sidegunsRate = 4; //these sideguns come with this ship and are inseparable from its base structure.
                    if (use == "playerActivate")
                    {
                        if (this.sidegunsPowered == true && game.qKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            game.qKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "PlasmaticSeeker" && this.ammunition[a].quantity >= 2)
                                {
                                    this.ammunition[a].quantity -= 2;
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
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("PlasmaticSeeker", this.X + Math.cos((this.rotation - Math.PI) - 2.7) * 56, this.Y + Math.sin((this.rotation - Math.PI) -2.7) * 56, this, this.rotation - 1/2 * Math.PI));
                                    game.projectilesList.push(new Projectile("PlasmaticSeeker", this.X + Math.cos((this.rotation - Math.PI) - 0.414) * 43, this.Y + Math.sin((this.rotation - Math.PI) - 0.414) * 43, this, this.rotation - 1/2 * Math.PI));
                                }
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.sidegunsPowered == true && this.aiQKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            this.aiQKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "PlasmaticSeeker" && this.ammunition[a].quantity >= 2)
                                {
                                    this.ammunition[a].quantity -= 2;
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
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("PlasmaticSeeker", this.X + Math.cos((this.rotation - Math.PI) - 2.7) * 56, this.Y + Math.sin((this.rotation - Math.PI) -2.7) * 56, this, this.rotation - 1/2 * Math.PI));
                                    game.projectilesList.push(new Projectile("PlasmaticSeeker", this.X + Math.cos((this.rotation - Math.PI) - 0.414) * 43, this.Y + Math.sin((this.rotation - Math.PI) - 0.414) * 43, this, this.rotation - 1/2 * Math.PI));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Mantis09-PlasmaBlasters" && this.type == "Mantis09" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawAbove")
                    {
                        this.maingunsRate = 0.7;
                        if (this.aiSpaceKey || this.spaceKey)
                        {
                            if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                            {
                                var colorized = colorizedImage(divineKitA, 170, 74, 16, 17, 16, 17, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                                draw(colorized, 0, 0, 16, 17, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 48, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 48, 16 * 2, 17 * 2, this.rotation, false, 1, 0, 0);
                            }
                            else
                            {
                                draw(divineKitA, 170, 74, 16, 17, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 48, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 48, 16 * 2, 17 * 2, this.rotation, false, 1, 0, 0);
                            }
                        }
                        else
                        {
                            if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                            {
                                var colorized = colorizedImage(divineKitA, 145, 74, 16, 17, 16, 17, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                                draw(colorized, 0, 0, 16, 17, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 48, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 48, 16 * 2, 17 * 2, this.rotation, false, 1, 0, 0);
                            }
                            else
                            {
                                draw(divineKitA, 145, 74, 16, 17, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 48, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 48, 16 * 2, 17 * 2, this.rotation, false, 1, 0, 0);
                            }
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 2))
                            {
                                this.power -= (this.weaponCost * 2);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("PlasmaLaser", this.X + Math.cos(this.rotation - Math.PI * 6.3 / 16) * 39, this.Y  + Math.sin(this.rotation - Math.PI * 6.3 / 16) * 39, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("PlasmaLaser", this.X + Math.cos(this.rotation - Math.PI * 9.7 / 16) * 39, this.Y  + Math.sin(this.rotation - Math.PI * 9.7 / 16) * 39, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 2))
                            {
                                this.power -= (this.weaponCost * 2);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("PlasmaLaser", this.X + Math.cos(this.rotation - Math.PI * 6.3 / 16) * 39, this.Y  + Math.sin(this.rotation - Math.PI * 6.3 / 16) * 39, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("PlasmaLaser", this.X + Math.cos(this.rotation - Math.PI * 9.7 / 16) * 39, this.Y  + Math.sin(this.rotation - Math.PI * 9.7 / 16) * 39, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Mantis09-PlasmaCannon" && this.type == "Mantis09" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawAbove")
                    {
                        this.maingunsRate = 2.6;
                        if (this.aiSpaceKey || this.spaceKey)
                        {
                            if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                            {
                                var colorized = colorizedImage(divineKitA, 153, 33, 9, 13, 9, 13, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                                draw(colorized, 0, 0, 9, 13, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 58, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 58, 9 * 2, 13 * 2, this.rotation, false, 1, 0, 0);
                            }
                            else
                            {
                                draw(divineKitA, 153, 33, 9, 13, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 58, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 58, 9 * 2, 13 * 2, this.rotation, false, 1, 0, 0);
                            }
                        }
                        else
                        {
                            if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                            {
                                var colorized = colorizedImage(divineKitA, 144, 33, 9, 13, 9, 13, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                                draw(colorized, 0, 0, 9, 13, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 58, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 58, 9 * 2, 13 * 2, this.rotation, false, 1, 0, 0);
                            }
                            else
                            {
                                draw(divineKitA, 144, 33, 9, 13, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 58, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 58, 9 * 2, 13 * 2, this.rotation, false, 1, 0, 0);
                            }
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 5))
                            {
                                this.power -= (this.weaponCost * 5);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("PlasmaBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 32, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 32, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 5))
                            {
                                this.power -= (this.weaponCost * 5);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("PlasmaBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 32, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 32, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Mantis09-PlasmaAccelerator" && this.type == "Mantis09" && this.upgrades[i].part == "boosters")
                {
                    if (use == "drawAbove")
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitA, 145, 50, 16, 17, 16, 17, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 16, 17, this.X, this.Y, 16 * 2, 17 * 2, this.rotation, false, 1, 0, 19.5);
                        }
                        else
                        {
                            draw(divineKitA, 145, 50, 16, 17, this.X, this.Y, 16 * 2, 17 * 2, this.rotation, false, 1, 0, 19.5);
                        }
                    }
                    if (use == "bonus")
                    {
                        this.boostSpeedUP = 14;
                        this.speedUP = 2;
                        this.accelerationUP = 0.5;
                        this.boostAccelUP = 2.5;
                        this.handlingUP = (0.1 / 100) * Math.PI * 2;
                        this.boostHandleUP = (1 / 100) * Math.PI * 2;
                    }
                }
                if (this.upgrades[i].name == "CORE" && this.type == "Majestad")
                {
                    this.sidegunsRate = 10; //these sideguns come with this ship and are inseparable from its base structure.
                    if (use == "playerActivate")
                    {
                        if (this.sidegunsPowered == true && game.qKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            game.qKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "TrineumSeeker" && this.ammunition[a].quantity >= 2)
                                {
                                    this.ammunition[a].quantity -= 2;
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
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("TrineumSeeker", this.X + Math.cos(this.rotation - Math.PI * 26.5 / 80) * -120, this.Y  + Math.sin(this.rotation - Math.PI * 26.5 / 80) * -120, this, this.rotation - 1/2 * Math.PI));
                                    game.projectilesList.push(new Projectile("TrineumSeeker", this.X + Math.cos(this.rotation - Math.PI * 53.5 / 80) * -120, this.Y  + Math.sin(this.rotation - Math.PI * 53.5 / 80) * -120, this, this.rotation - 1/2 * Math.PI));
                                }
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.sidegunsPowered == true && this.aiQKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            this.aiQKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "TrineumSeeker" && this.ammunition[a].quantity >= 2)
                                {
                                    this.ammunition[a].quantity -= 2;
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
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("TrineumSeeker", this.X + Math.cos(this.rotation - Math.PI * 26.5 / 80) * -120, this.Y  + Math.sin(this.rotation - Math.PI * 26.5 / 80) * -120, this, this.rotation - 1/2 * Math.PI));
                                    game.projectilesList.push(new Projectile("TrineumSeeker", this.X + Math.cos(this.rotation - Math.PI * 53.5 / 80) * -120, this.Y  + Math.sin(this.rotation - Math.PI * 53.5 / 80) * -120, this, this.rotation - 1/2 * Math.PI));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Majestad-TrineumDisseminator" && this.type == "Majestad" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawAbove")
                    {
                        this.maingunsRate = 12;

                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitB, 146, 204, 11, 11, 11, 11, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 11, 11, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 276, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 276, 11 * 5.2, 11 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitB, 146, 204, 11, 11, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 276, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 276, 11 * 5.2, 11 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 8))
                            {
                                this.power -= (this.weaponCost * 8);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.05));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.05));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.1));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.1));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.15));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.15));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.2));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.2));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.25));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.25));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.3));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.3));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.35));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.35));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.4));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.4));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.45));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.45));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.5));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.5));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 8))
                            {
                                this.power -= (this.weaponCost * 8);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.05));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.05));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.1));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.1));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.15));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.15));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.2));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.2));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.25));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.25));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.3));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.3));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.35));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.35));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.4));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.4));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.45));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.45));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 + 0.5));
                                game.projectilesList.push(new Projectile("TrineumBlast", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 270, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 270, this, this.rotation - Math.PI / 2 - 0.5));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Majestad-TrineumRay" && this.type == "Majestad" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawAbove")
                    {
                        this.maingunsRate = 9;

                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitB, 202, 203, 11, 11, 11, 11, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 11, 11, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 294, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 294, 11 * 5.2, 11 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitB, 202, 203, 11, 11, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 294, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 294, 11 * 5.2, 11 * 5.2, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 2))
                            {
                                this.power -= (this.weaponCost * 2);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("TrineumWave", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 290, this.Y  + Math.sin(this.rotation - Math.PI * 8 / 16) * 290, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 2))
                            {
                                this.power -= (this.weaponCost * 2);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("TrineumWave", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 290, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 290, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Majestad-TrineumBlasterSentryGuns" && this.type == "Majestad" && this.upgrades[i].part == "turret")
                {
                    if (use == "drawAbove")
                    {
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            //turret 1
                            var colorized = colorizedImage(divineKitB, 163, 203, 13, 13, 13, 13, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 13, 13, this.X, this.Y, 13 * 2, 13 * 2, this.rotation, false, 1, 50, -185);
                            var colorized2 = colorizedImage(divineKitB, 151, 156, 12, 30, 12, 30, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 12, 30, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378, 12 * 2, 30 * 2, this.rotation + this.turretRot1, false, 1, 0, 0);

                            //turret 2
                            var colorized = colorizedImage(divineKitB, 163, 203, 13, 13, 13, 13, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 13, 13, this.X, this.Y, 13 * 2, 13 * 2, this.rotation, false, 1, -50, -185);
                            var colorized2 = colorizedImage(divineKitB, 151, 156, 12, 30, 12, 30, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 12, 30, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378, 12 * 2, 30 * 2, this.rotation + this.turretRot2, false, 1, 0, 0);

                            //turret 3
                            var colorized = colorizedImage(divineKitB, 163, 203, 13, 13, 13, 13, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 13, 13, this.X, this.Y, 13 * 2, 13 * 2, this.rotation, false, 1, 0, 0);
                            var colorized2 = colorizedImage(divineKitB, 151, 156, 12, 30, 12, 30, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 12, 30, this.X, this.Y, 12 * 2, 30 * 2, this.rotation + this.turretRot3, false, 1, 0, 0);

                        }
                        else
                        {
                            //turret 1
                            draw(divineKitB, 163, 203, 13, 13, this.X, this.Y, 13 * 2, 13 * 2, this.rotation, false, 1, 50, -185);
                            draw(divineKitB, 151, 156, 12, 30, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378, 12 * 2, 30 * 2, this.rotation + this.turretRot1, false, 1, 0, 0);

                            //turret 2
                            draw(divineKitB, 163, 203, 13, 13, this.X, this.Y, 13 * 2, 13 * 2, this.rotation, false, 1, -50, -185);
                            draw(divineKitB, 151, 156, 12, 30, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378, 12 * 2, 30 * 2, this.rotation + this.turretRot2, false, 1, 0, 0);

                            //turret 3
                            draw(divineKitB, 163, 203, 13, 13, this.X, this.Y, 13 * 2, 13 * 2, this.rotation, false, 1, 0, 0);
                            draw(divineKitB, 151, 156, 12, 30, this.X, this.Y, 12 * 2, 30 * 2, this.rotation + this.turretRot3, false, 1, 0, 0);
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
                                this.turretRot1 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot2 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot2 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot3 = Math.atan2(this.Y - this.sentryTarget.Y, this.X - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot3 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 + 1.306) * 24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 + 1.306) * 24, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 - 1.306) * -24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 - 1.306) * -24, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                }
                            }
                            if (new Date().getTime() - this.turret2StoreTime >= this.turret2Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret2StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 + 1.306) * 24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 + 1.306) * 24, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 - 1.306) * -24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 - 1.306) * -24, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
                                }
                            }
                            if (new Date().getTime() - this.turret3StoreTime >= this.turret3Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret3StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X - Math.cos(this.rotation + this.turretRot1 + 1.306) * 24, this.Y - Math.sin(this.rotation + this.turretRot1 + 1.306) * 24, this, this.rotation - 1/2 * Math.PI + this.turretRot3));
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X - Math.cos(this.rotation + this.turretRot1 - 1.306) * -24, this.Y - Math.sin(this.rotation + this.turretRot1 - 1.306) * -24, this, this.rotation - 1/2 * Math.PI + this.turretRot3));
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
                                this.turretRot1 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot2 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot2 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot3 = Math.atan2(this.Y - this.sentryTarget.Y, this.X - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot3 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 + 1.306) * 24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 + 1.306) * 24, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 - 1.306) * -24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 - 1.306) * -24, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                }
                            }
                            if (new Date().getTime() - this.turret2StoreTime >= this.turret2Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret2StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 + 1.306) * 24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 + 1.306) * 24, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.cos(this.rotation + this.turretRot1 - 1.306) * -24, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 0.263963596) * 191.6378 - Math.sin(this.rotation + this.turretRot1 - 1.306) * -24, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
                                }
                            }
                            if (new Date().getTime() - this.turret3StoreTime >= this.turret3Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret3StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X - Math.cos(this.rotation + this.turretRot1 + 1.306) * 24, this.Y - Math.sin(this.rotation + this.turretRot1 + 1.306) * 24, this, this.rotation - 1/2 * Math.PI + this.turretRot3));
                                    game.projectilesList.push(new Projectile("TrineumLaser", this.X - Math.cos(this.rotation + this.turretRot1 - 1.306) * -24, this.Y - Math.sin(this.rotation + this.turretRot1 - 1.306) * -24, this, this.rotation - 1/2 * Math.PI + this.turretRot3));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Majestad-CelesteShields" && this.type == "Majestad" && this.upgrades[i].part == "shielding")
                {
                    if (use == "bonus")
                    {
                        this.shieldsColourUP = "#66ffff";
                        this.shieldsUP = 1000;
                        this.rechargeUP = 5;
                    }
                }
                if (this.upgrades[i].name == "Screecher-F3Lasers" && this.type == "Screecher" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawBelow")
                    {
                        this.maingunsRate = 0.44;

                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitC, 384, 292, 85, 60, 85, 60, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 85, 60, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 34, 85, 60, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitC, 384, 292, 85, 60, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 34, 85, 60, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 4))
                            {
                                this.power -= (this.weaponCost * 4);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 6 / 16) * 54, this.Y + Math.sin(this.rotation - Math.PI * 6 / 16) * 54, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 10 / 16) * 54, this.Y + Math.sin(this.rotation - Math.PI * 10 / 16) * 54, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 1.9 / 16) * 42.5, this.Y + Math.sin(this.rotation - Math.PI * 1.9 / 16) * 42.5, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 14.1 / 16) * 42.5, this.Y + Math.sin(this.rotation - Math.PI * 14.1 / 16) * 42.5, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 4))
                            {
                                this.power -= (this.weaponCost * 4);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 6 / 16) * 54, this.Y + Math.sin(this.rotation - Math.PI * 6 / 16) * 54, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 10 / 16) * 54, this.Y + Math.sin(this.rotation - Math.PI * 10 / 16) * 54, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 1.9 / 16) * 42.5, this.Y + Math.sin(this.rotation - Math.PI * 1.9 / 16) * 42.5, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - Math.PI * 14.1 / 16) * 42.5, this.Y + Math.sin(this.rotation - Math.PI * 14.1 / 16) * 42.5, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Screecher-EtherBlasters" && this.type == "Screecher" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawBelow")
                    {
                        this.maingunsRate = 0.66;

                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitC, 181, 214, 91, 66, 91, 66, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 91, 66, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 34, 91, 66, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitC, 181, 214, 91, 66, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 34, 91, 66, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 19))
                            {
                                this.power -= (this.weaponCost * 19);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 4.6 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 4.6 / 16) * 34, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 11.4 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 11.4 / 16) * 34, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 0 / 16) * 39.5, this.Y + Math.sin(this.rotation - Math.PI * 0 / 16) * 39.5, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 16 / 16) * 39.5, this.Y + Math.sin(this.rotation - Math.PI * 16 / 16) * 39.5, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 19))
                            {
                                this.power -= (this.weaponCost * 19);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 4.6 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 4.6 / 16) * 34, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 11.4 / 16) * 34, this.Y + Math.sin(this.rotation - Math.PI * 11.4 / 16) * 34, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 0 / 16) * 39.5, this.Y + Math.sin(this.rotation - Math.PI * 0 / 16) * 39.5, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - Math.PI * 16 / 16) * 39.5, this.Y + Math.sin(this.rotation - Math.PI * 16 / 16) * 39.5, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "StabilizingParticleFogShield" && this.upgrades[i].part == "shielding")
                {
                    if (use == "bonus")
                    {
                        this.shieldsColourUP = "#B6B6B6";
                        this.shieldsUP = 350;
                        this.rechargeUP = 7;
                        this.distortResistUP = true;
                    }
                }
                if (this.upgrades[i].name == "Screecher-F3SentryGuns" && this.type == "Screecher" && this.upgrades[i].part == "turret")
                {
                    if (use == "drawAbove")
                    {
                        this.turret1Rate = 0.55;
                        this.turret2Rate = 0.55;
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            //turret 1
                            var colorized = colorizedImage(divineKitC, 187, 308, 20, 20, 20, 20, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, -50, 14);
                            var colorized2 = colorizedImage(divineKitC, 156, 339, 86, 21, 86, 21, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);

                            //turret 2
                            var colorized = colorizedImage(divineKitC, 187, 308, 20, 20, 20, 20, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, 50, 14);
                            var colorized2 = colorizedImage(divineKitC, 156, 339, 86, 21, 86, 21, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);
                        }
                        else
                        {
                            //turret 1
                            draw(divineKitC, 187, 308, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, -50, 14);
                            draw(divineKitC, 156, 339, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);

                            //turret 2
                            draw(divineKitC, 187, 308, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, 50, 14);
                            draw(divineKitC, 156, 339, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);
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
                                this.turretRot1 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot2 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot2 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot1 + (7.825/16 * Math.PI)) * 1, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot1 + (7.825/16 * Math.PI)) * 1, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                }
                            }
                            if (new Date().getTime() - this.turret2StoreTime >= this.turret2Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret2StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot2 + (7.825/16 * Math.PI)) * 1, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot2 + (7.825/16 * Math.PI)) * 1, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
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
                                this.turretRot1 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot2 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot2 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot1 + (7.825/16 * Math.PI)) * 1, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot1 + (7.825/16 * Math.PI)) * 1, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                }
                            }
                            if (new Date().getTime() - this.turret2StoreTime >= this.turret2Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret2StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.2))
                                {
                                    this.power -= (this.weaponCost * 0.2);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("F3Laser", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot2 + (7.825/16 * Math.PI)) * 1, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot2 + (7.825/16 * Math.PI)) * 1, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Screecher-EtherSentryGuns" && this.type == "Screecher" && this.upgrades[i].part == "turret")
                {
                    if (use == "drawAbove")
                    {
                        this.turret1Rate = 0.66;
                        this.turret2Rate = 0.66;
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            //turret 1
                            var colorized = colorizedImage(divineKitC, 187, 308, 20, 20, 20, 20, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, -50, 14);
                            var colorized2 = colorizedImage(divineKitC, 156, 370, 86, 21, 86, 21, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);

                            //turret 2
                            var colorized = colorizedImage(divineKitC, 187, 308, 20, 20, 20, 20, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, 50, 14);
                            var colorized2 = colorizedImage(divineKitC, 156, 370, 86, 21, 86, 21, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized2, 0, 0, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);
                        }
                        else
                        {
                            //turret 1
                            draw(divineKitC, 187, 308, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, -50, 14);
                            draw(divineKitC, 156, 370, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);

                            //turret 2
                            draw(divineKitC, 187, 308, 20, 20, this.X, this.Y, 20 * 0.85, 20 * 0.85, this.rotation, false, 1, 50, 14);
                            draw(divineKitC, 156, 370, 86, 21, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232, 86 * 0.75, 21 * 0.75, this.rotation - 1/2 * Math.PI + this.turretRot1, false, 1, 0, 0);
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
                                this.turretRot1 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot2 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot2 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.5))
                                {
                                    this.power -= (this.weaponCost * 0.5);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot1 + (7.95/16 * Math.PI)) * -12, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot1 + (7.95/16 * Math.PI)) * -12, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                }
                            }
                            if (new Date().getTime() - this.turret2StoreTime >= this.turret2Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret2StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.5))
                                {
                                    this.power -= (this.weaponCost * 0.5);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot2 + (7.95/16 * Math.PI)) * -12, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot2 + (7.95/16 * Math.PI)) * -12, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
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
                                this.turretRot1 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot1 += 0.02;
                            }

                            if (this.sentryTarget != "none")
                            {
                                this.turretRot2 = Math.atan2(this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.Y, this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - this.sentryTarget.X) - 1/2 * Math.PI - this.rotation; //this works!
                            }
                            else
                            {
                                this.turretRot2 += 0.02;
                            }

                            if (new Date().getTime() - this.turret1StoreTime >= this.turret1Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret1StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.5))
                                {
                                    this.power -= (this.weaponCost * 0.5);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot1 + (7.95/16 * Math.PI)) * -12, this.Y + Math.sin(this.rotation - 1/2 * Math.PI + 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot1 + (7.95/16 * Math.PI)) * -12, this, this.rotation - 1/2 * Math.PI + this.turretRot1));
                                }
                            }
                            if (new Date().getTime() - this.turret2StoreTime >= this.turret2Rate * 1000 && this.sentryTarget != "none")
                            {
                                this.turret2StoreTime = new Date().getTime();
                                if (this.power >= (this.weaponCost * 0.5))
                                {
                                    this.power -= (this.weaponCost * 0.5);
                                    playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                    game.projectilesList.push(new Projectile("EtherBlast", this.X + Math.cos(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.cos(this.rotation + this.turretRot2 + (7.95/16 * Math.PI)) * -12, this.Y + Math.sin(this.rotation - 1/2 * Math.PI - 1.297788435) * -51.9232 - Math.sin(this.rotation + this.turretRot2 + (7.95/16 * Math.PI)) * -12, this, this.rotation - 1/2 * Math.PI + this.turretRot2));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Harbinger88-FusionLaunchers" && this.type == "Harbinger88" && this.upgrades[i].part == "sideguns")
                {
                    if (use == "drawAbove")
                    {
                        this.sidegunsRate = 14;
                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitD, 483, 3, 312, 44, 312, 44, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 312, 44, this.X + Math.cos(this.rotation - Math.PI * 7.9 / 16) * 570, this.Y + Math.sin(this.rotation - Math.PI * 7.9 / 16) * 570, 312 * 5, 44 * 5, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitD, 483, 3, 312, 44, this.X + Math.cos(this.rotation - Math.PI * 7.9 / 16) * 570, this.Y + Math.sin(this.rotation - Math.PI * 7.9 / 16) * 570, 312 * 5, 44 * 5, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.sidegunsPowered == true && game.qKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            game.qKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "FusionSeeker" && this.ammunition[a].quantity >= 2)
                                {
                                    this.ammunition[a].quantity -= 2;
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
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("FusionSeeker", this.X + Math.cos(this.rotation - Math.PI * 12.6 / 16) * 940, this.Y + Math.sin(this.rotation - Math.PI * 12.6 / 16) * 940, this, this.rotation - 1/2 * Math.PI));
                                    game.projectilesList.push(new Projectile("FusionSeeker", this.X + Math.cos(this.rotation - Math.PI * 3.4 / 16) * 940, this.Y + Math.sin(this.rotation - Math.PI * 3.4 / 16) * 940, this, this.rotation - 1/2 * Math.PI));
                                }
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.sidegunsPowered == true && this.aiQKey && new Date().getTime() - this.sidegunsStoreTime >= this.sidegunsRate * 1000)
                        {
                            this.sidegunsStoreTime = new Date().getTime();
                            this.aiQKey = false;
                            var hasAmmoToShoot = false;
                            for (var a = 0; a < this.ammunition.length; a++)
                            {
                                if (this.ammunition[a].name == "FusionSeeker" && this.ammunition[a].quantity >= 2)
                                {
                                    this.ammunition[a].quantity -= 2;
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
                                    playSound(this.laserSound2, this.laserSound2Time1, this.laserSound2Time2);
                                    game.projectilesList.push(new Projectile("FusionSeeker", this.X + Math.cos(this.rotation - Math.PI * 12.6 / 16) * 940, this.Y + Math.sin(this.rotation - Math.PI * 12.6 / 16) * 940, this, this.rotation - 1/2 * Math.PI));
                                    game.projectilesList.push(new Projectile("FusionSeeker", this.X + Math.cos(this.rotation - Math.PI * 3.4 / 16) * 940, this.Y + Math.sin(this.rotation - Math.PI * 3.4 / 16) * 940, this, this.rotation - 1/2 * Math.PI));
                                }
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Harbinger88-FusionCasters" && this.type == "Harbinger88" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawAbove")
                    {
                        this.maingunsRate = 6;

                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitD, 161, 2, 147, 101, 147, 101, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 147, 101, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1275, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1275, 147 * 5, 101 * 5, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitD, 161, 2, 147, 101, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1275, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1275, 147 * 5, 101 * 5, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 15))
                            {
                                this.power -= (this.weaponCost * 15);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("FusionSlice", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1350, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1350, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("FusionSlice", this.X + Math.cos(this.rotation - Math.PI * 9 / 16) * 1250, this.Y + Math.sin(this.rotation - Math.PI * 9 / 16) * 1250, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("FusionSlice", this.X + Math.cos(this.rotation - Math.PI * 7 / 16) * 1250, this.Y + Math.sin(this.rotation - Math.PI * 7 / 16) * 1250, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 15))
                            {
                                this.power -= (this.weaponCost * 15);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("FusionSlice", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1350, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1350, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("FusionSlice", this.X + Math.cos(this.rotation - Math.PI * 9 / 16) * 1250, this.Y + Math.sin(this.rotation - Math.PI * 9 / 16) * 1250, this, this.rotation - Math.PI / 2));
                                game.projectilesList.push(new Projectile("FusionSlice", this.X + Math.cos(this.rotation - Math.PI * 7 / 16) * 1250, this.Y + Math.sin(this.rotation - Math.PI * 7 / 16) * 1250, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
                if (this.upgrades[i].name == "Harbinger88-FusionCompactionCannon" && this.type == "Harbinger88" && this.upgrades[i].part == "mainguns")
                {
                    if (use == "drawAbove")
                    {
                        this.maingunsRate = 20;

                        if (this.shieldingOnline && this.getShields() > 0 && this.shields > 0)
                        {
                            var colorized = colorizedImage(divineKitD, 548, 716, 39, 75, 39, 75, 0.3 * Math.max(0, this.shields)/this.getShields(), this.getShieldsColour());
                            draw(colorized, 0, 0, 39, 75, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1490, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1490, 39 * 5, 75 * 5, this.rotation, false, 1, 0, 0);
                        }
                        else
                        {
                            draw(divineKitD, 548, 716, 39, 75, this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1490, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1490, 39 * 5, 75 * 5, this.rotation, false, 1, 0, 0);
                        }
                    }
                    else if (use == "playerActivate")
                    {
                        if (this.maingunsPowered == true && game.spaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            game.spaceKey = false;
                            if (this.power >= (this.weaponCost * 55))
                            {
                                this.power -= (this.weaponCost * 55);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("FusionBall", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1550, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1550, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                    else if (use == "aiActivate")
                    {
                        if (this.maingunsPowered == true && this.aiSpaceKey && new Date().getTime() - this.maingunsStoreTime >= this.maingunsRate * 1000)
                        {
                            this.maingunsStoreTime = new Date().getTime();
                            this.aiSpaceKey = false;
                            if (this.power >= (this.weaponCost * 55))
                            {
                                this.power -= (this.weaponCost * 55);
                                playSound(this.laserSound1, this.laserSound1Time1, this.laserSound1Time2);
                                game.projectilesList.push(new Projectile("FusionBall", this.X + Math.cos(this.rotation - Math.PI * 8 / 16) * 1550, this.Y + Math.sin(this.rotation - Math.PI * 8 / 16) * 1550, this, this.rotation - Math.PI / 2));
                            }
                        }
                    }
                }
            }
        }
    };

    //trade gear with teammates
    this.transfer = function()
    {
        for (var i = 0; i < game.shipsList.length; i++)
        {
            if (game.shipsList[i] !== this && game.shipsList[i].player)
            {
                if (distance(this, game.shipsList[i]) <= 110)
                {
                    if (game.eKey)
                    {
                        game.eKey = false;
                        game.interInventory = true;
                        game.interInv1 = game.shipsList[i].cargoBay;
                        game.interInv2 = this.cargoBay;
                        game.interContext = "Transfer";
                        game.interInvCargoMAX1 = game.shipsList[i].cargoMAX;
                        game.interInvCargoMAX2 = this.cargoMAX;
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
            this.effects();
            //this.drawShip();
            this.turnOnOffShip();
            if (this.power > 0 && this.offline == false)
            {
                this.transfer();
                this.rotationSystem();
                this.systemControls();
                this.recharging();
            }
            if (this.player)
            {
                //Exit Ship View
                if (game.tildKey == true)
                {
                    game.coordinates = false;
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