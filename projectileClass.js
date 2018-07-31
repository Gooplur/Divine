/**
 * Created by skyeguy on 9/2/16.
 */
function Projectile(type, x, y, who, rotation, adX, adY)
{
    var self = this;
    this.barcode = Math.random() * Math.random() * Math.random() + 4.545;
    this.zIndex = 0;
    this.X = x;
    this.Y = y;
    this.quien = who;
    this.type = type;
    this.activateProjectile = true;
    this.rotation = rotation;
    this.speed = 1;
    this.range = 500;
    this.distanceTraveled = 0;
    this.damage = 1;
    this.EMP = 0;
    this.phasing = false;
    this.style = "normal";
    this.radius = 0.1;
    this.shipInteract = true; //determines if this projectile can affect ships
    this.rapidDamaging = false; //if false the attack only hits once
    //destructable projectiles
    this.integrity = 10;
    this.destructible = false;
    //Projectile effects on other projectiles
    this.projectilePhasing = true; //does a projectile delete upon interaction with another projectile
    this.projectileInteract = false; //determines if this projectile can affect other projectiles
    this.projectileDistortion = false; //does the projectile alter the rotation of other projectiles
    this.field = 0.1; //this is like radius but against projectiles
    //rotating projectiles only
    this.targetRotation = this.rotation;
    this.turnSpeed = 1/9 * Math.PI;
    //spinning projectiles only
    this.spin = 0;
    //single-stream only
    this.streamFixed = false;
    this.streamType = "normal";
    //tracking projectiles only
    this.targetProjectile = false; //if true this makes it so that the tracking projectile only targets destructible enemy projectiles. Otherwise ship targeting is enabled.
    this.tracking = false;
    this.launchTime = new Date().getTime();
    this.trackWait = 0.3;
    this.trackSpeed = 14;
    this.tracked = false;
    this.targetSizeMin = 0;
    //exploding projectiles only
    this.explodes = false;
    this.explosionStyle = [5, "red", "orange", "yellow"];
    this.explosionSound = new Audio("sounds/heavyXPL.wav");
    this.volume = 0.75;
    this.explosionSoundTime1 = 0;
    this.explosionSoundTime2 = this.explosionSound.duration;
    //growing projectiles
    this.grower = false;
    this.growth = 1;
    this.growthRate = 0.1;
    this.growthMAX = 10;
    //distortion projectiles
    this.distortResist = false;
    this.distortion = false;
    this.distort = 0;
    this.distortTime = 0;
    //On-Death-Do-Something variables
    this.doOnProjectEnd = false; //when the projectile reaches the end of its project range it does something.
    this.doOnContact = false;

    //effects
    this.distorted = false;

    //Animate function variables
    this.anim = 0; //the tics that count up that progress an animation.
    this.animLoop = 0; //the number of times each animation completes itself.

    this.defineProjectileStats = function()
    {
        if (this.activateProjectile)
        {
            this.activateProjectile = false;

            if (this.type == "F1Laser")
            {
                this.speed = who.speed + 30;
                this.range = 4000;
                this.damage = 5;
                this.phasing = false;
            }
            else if (this.type == "F2Laser")
            {
                this.speed = who.speed + 35;
                this.range = 4750;
                this.damage = 12;
                this.phasing = false;
                this.radius = 4;
            }
            else if (this.type == "F3Laser")
            {
                this.speed = who.speed + 40;
                this.range = 5500;
                this.damage = 19;
                this.phasing = false;
                this.radius = 8;
            }
            else if (this.type == "M1Missile")
            {
                this.trackSpeed = 22;
                this.speed = who.speed + this.trackSpeed;
                this.range = 5000;
                this.damage = 105;
                this.phasing = false;
                this.tracking = true;
                this.explodes = true;
                this.explosionSound = new Audio("sounds/missileXPL.wav");
                this.explosionStyle = [11, 5, 9, ["crimson", "orange", "red"]];
                this.turnSpeed = 1/29 * Math.PI;
                this.radius = 7;
                this.integrity = 2;
                this.destructible = true;
            }
            else if (this.type == "F1SingleStream")
            {
                this.speed = 0;
                this.range = 1000;
                this.damage = 0.5;
                this.phasing = false;
                this.streamFixed = false;
                this.streamType = "normal";
                this.style = "singleStream";
                this.zIndex = 0;
            }
            else if (this.type == "PlasmaticSeeker")
            {
                this.trackSpeed = 45;
                this.speed = who.speed + this.trackSpeed;
                this.range = 9000;
                this.damage = 840;
                this.phasing = false;
                this.tracking = true;
                this.explodes = true;
                this.explosionSound = new Audio("sounds/missileXPL.wav");
                this.explosionStyle = [14, 6, 10, ["#00ff00", "#99ff33", "#99ff99"]];
                this.turnSpeed = 4/100 * Math.PI;
                this.trackWait = 1.4;
                this.radius = 12;
                this.integrity = 8;
                this.destructible = true;
            }
            else if (this.type == "PlasmaLaser")
            {
                this.speed = who.speed + 45;
                this.range = 2000;
                this.damage = 45;
                this.phasing = false;
                this.radius = 3;
            }
            else if (this.type == "PlasmaBlast")
            {
                this.speed = who.speed + 49;
                this.range = 2600;
                this.damage = 490;
                this.phasing = false;
                this.radius = 12;
            }
            else if (this.type == "TrineumSeeker")
            {
                this.targetSizeMin = 40;
                this.trackSpeed = 75;
                this.speed = who.speed + this.trackSpeed;
                this.range = 25000;
                this.damage = 1800;
                this.phasing = false;
                this.tracking = true;
                this.explodes = true;
                this.explosionSound = new Audio("sounds/missileXPL.wav");
                this.explosionStyle = [20, 8, 12, ["#3366cc", "#3399ff", "#66ccff"]];
                this.turnSpeed = 10/100 * Math.PI;
                this.trackWait = 1.4;
                this.radius = 22;
                this.integrity = 20;
                this.destructible = true;
            }
            else if (this.type == "TrineumBlast")
            {
                this.speed = who.speed + 66;
                this.range = 5000;
                this.damage = 140;
                this.phasing = true;
                this.radius = 16;
            }
            else if (this.type == "TrineumWave")
            {
                this.grower = true;
                this.speed = who.speed + 29;
                this.range = 2500;
                this.damage = 22;
                this.phasing = true;
                this.growth = 5;
                this.radius = 5;
                this.growthRate = 10;
                this.growthMAX = 840;
            }
            else if (this.type == "TrineumLaser")
            {
                this.speed = who.speed + 40;
                this.range = 3600;
                this.damage = 14;
                this.phasing = true;
                this.radius = 3;
                this.zIndex = 1;
            }
            else if (this.type == "EtherBlast")
            {
                this.speed = this.speed = who.speed + 51;
                this.range = 4000;
                this.damage = 22;
                this.phasing = false;
                this.radius = 5;
                this.zIndex = 1;
                this.distortion = true;
                this.projectileInteract = true;
                this.projectileDistortion = true;
                this.distortTime = 6;
                this.distortResist = true;
                this.field = 80;

                this.distort = -(250 + Math.random() * 300) / 100 * Math.PI;
            }
            else if (this.type == "FusionSeeker")
            {
                this.targetSizeMin = 140;
                this.trackSpeed = 110;
                this.speed = who.speed + this.trackSpeed;
                this.range = 110000;
                this.damage = 60000;
                this.phasing = false;
                this.tracking = true;
                this.explodes = true;
                this.explosionSound = new Audio("sounds/missileXPL.wav");
                this.explosionStyle = [400, 9, 75, ["#53116D", "#500296", "#3D0852"]];
                this.turnSpeed = 1/8 * Math.PI;
                this.trackWait = 1.2;
                this.radius = 90;
                this.integrity = 100;
                this.destructible = true;
            }
            else if (this.type == "FusionSlice")
            {
                this.speed = who.speed + 100;
                this.range = 13130;
                this.damage = 6000;
                this.phasing = true;
                this.zIndex = 1;
                this.radius = 150;
                this.turnSpeed = 1/4 * Math.PI;
                this.distortResist = true;
                this.spin = Math.random() * 2 * Math.PI;
            }
            else if (this.type == "FusionBall")
            {
                this.speed = who.speed + 110;
                this.range = 5500;
                this.damage = 2600;
                this.phasing = true;
                this.zIndex = 1;
                this.radius = 45;
                this.distortResist = true;
                this.spin = Math.random() * 2 * Math.PI;
                this.doOnProjectEnd = "fusionExplosion";
                this.explosionSound = new Audio("sounds/missileXPL.wav");
                this.explosionStyle = [2000, 10, 100, ["#53116D", "#500296", "#3D0852"]];
            }
            else if (this.type == "FusionSpike")
            {
                this.speed = who.speed + 120;
                this.range = 2000;
                this.damage = 3000;
                this.phasing = true;
                this.zIndex = 1;
                this.radius = 130;
                this.distortResist = true;
                this.doOnProjectEnd = "fusionExplosion2";
                this.explosionSound = new Audio("sounds/missileXPL.wav");
                this.explosionStyle = [660, 5, 70, ["#53116D", "#500296", "#3D0852"]];
            }
            else if (this.type == "FusionSpike2")
            {
                this.speed = who.speed + 120;
                this.range = 4000;
                this.damage = 2200;
                this.phasing = true;
                this.zIndex = 1;
                this.radius = 100;
                this.distortResist = true;
            }
        }
    };

    this.agenda = function() //This is for projectile types that constantly regulate action based on preset projectile specific conditions.
    {
        //general
            //GROWER - if a projectile is supposed to grow or shrink in size throughout its lifespan
        if (this.grower)
        {
            this.growth += this.growthRate;
            this.radius = Math.min(this.growth, this.growthMAX);
        }

        //type specific
        if (this.type == "F1SingleStream")
        {
            this.target = this.nearestEnemy();
            if (this.distanceTo(this.target) <= this.range)
            {
                playSound(who.laserSound1, who.laserSound1Time2 * 3/8, who.laserSound1Time2 * 6/8);
                this.streamFixed = true;
            }
            else
            {
                who.laserSound1.pause();
            }
            this.singleStream();
        }
    };

    this.drawProjectile = function(z)
    {
        if (z == this.zIndex)
        {
            if (this.type == "F1Laser")
            {
                circle(true, this.X, this.Y, 2, 0, 2*Math.PI, "red", false, false, false, 0, 0.65);
            }
            else if (this.type == "F2Laser")
            {
                line(this.X, this.Y, this.X + Math.cos(this.rotation) * -9, this.Y + Math.sin(this.rotation) * -9, "#BA3B04", 2, false, 0, 0.65);
            }
            else if (this.type == "F3Laser")
            {
                line(this.X, this.Y, this.X + Math.cos(this.rotation) * -17, this.Y + Math.sin(this.rotation) * -17, "#8A1919", 2.5, false, 0, 0.65);
            }
            else if (this.type == "M1Missile")
            {
                draw(divineStarterPack, 117, 12, 26, 7, this.X, this.Y, 26, 7, this.rotation, false, 1, 0, 0);
            }
            else if (this.type == "F1SingleStream")
            {
                this.target = this.nearestEnemy();
                if (this.distanceTo(this.target) <= this.range)
                {
                    line(this.X, this.Y, this.target.X, this.target.Y, "red", 3, false, 0, 0.65);
                }
                game.projectilesList.splice(game.projectilesList.indexOf(this), 1);
            }
            else if (this.type == "PlasmaticSeeker")
            {
                draw(divineKitA, 207, 3, 6, 21, this.X, this.Y, 6 * 1.6, 21 * 1.6, this.rotation - 1/2 * Math.PI, false, 1, 0, 0);
            }
            else if (this.type == "PlasmaLaser")
            {
                //draw(); //the list should contain the fields in the draw function in the same order.
                this.animate(0.10, [[divineKitA, 170, 53, 6, 10, this.X, this.Y, 6 * 1.7, 10 * 1.7, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 178, 53, 6, 10, this.X, this.Y, 6 * 1.7, 10 * 1.7, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 184, 53, 6, 10, this.X, this.Y, 6 * 1.7, 10 * 1.7, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0]]);
            }
            else if (this.type == "PlasmaBlast")
            {
                //draw(); //the list should contain the fields in the draw function in the same order.
                this.animate(0.10, [[divineKitA, 144, 7, 15, 15, this.X, this.Y, 15 * 1.8, 15 * 1.8, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 161, 7, 15, 15, this.X, this.Y, 15 * 1.8, 15 * 1.8, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 179, 8, 15, 15, this.X, this.Y, 15 * 1.8, 15 * 1.8, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0]]);
            }
            else if (this.type == "TrineumSeeker")
            {
                draw(divineKitB, 130, 87, 10, 28, this.X, this.Y, 10 * 3.6, 28 * 3.6, this.rotation + 1/2 * Math.PI, false, 1, 0, 0);
            }
            else if (this.type == "TrineumBlast")
            {
                //draw(); //the list should contain the fields in the draw function in the same order.
                draw(divineKitB, 184, 198, 8, 21, this.X, this.Y, 8 * 3.4, 21 * 3.4, this.rotation + 1/2 * Math.PI, false, 1, 0, 0);
            }
            else if (this.type == "TrineumWave")
            {
                circle(true, this.X, this.Y, this.radius, 0, 2*Math.PI, "#66ccff", false, false, false, 0, 0.4);
            }
            else if (this.type == "TrineumLaser")
            {
                //draw(); //the list should contain the fields in the draw function in the same order.
                draw(divineKitB, 140, 157, 5, 13, this.X, this.Y, 5 * 1.4, 13 * 1.4, this.rotation + 1/2 * Math.PI, false, 1, 0, 0);
            }
            else if (this.type == "EtherBlast")
            {
                //draw(); //the list should contain the fields in the draw function in the same order.
                draw(divineKitC, 380, 365, 32, 31, this.X, this.Y, 32 * 0.25, 31 * 0.25, this.rotation + 1/2 * Math.PI, false, 0.44, 0, 0);
            }
            else if (this.type == "FusionSeeker")
            {
                draw(divineKitD, 877, 471, 17, 112, this.X, this.Y, 17 * 2.5, 112 * 2.5, this.rotation + 1/2 * Math.PI, false, 1, 0, 0);
            }
            else if (this.type == "FusionSlice")
            {
                this.spin += this.turnSpeed;
                draw(divineKitD, 93, 12, 38, 35, this.X, this.Y, 38 * 4.5, 35 * 4.5, this.rotation + 1/2 * Math.PI + this.spin, false, 1, 0, 0);
            }
            else if (this.type == "FusionBall")
            {
                draw(divineKitD, 407, 757, 23, 22, this.X, this.Y, 23 * 4, 22 * 4, this.rotation + 1/2 * Math.PI + this.spin, false, 0.85, 0, 0);
            }
            else if (this.type == "FusionSpike")
            {
                draw(divineKitD, 355, 739, 10, 46, this.X, this.Y, 10 * 4.5, 46 * 4.5, this.rotation + 1/2 * Math.PI, false, 0.75, 0, 0);
            }
            else if (this.type == "FusionSpike2")
            {
                draw(divineKitD, 355, 739, 10, 46, this.X, this.Y, 10 * 3.8, 46 * 3.8, this.rotation + 1/2 * Math.PI, false, 0.65, 0, 0);
            }
        }
    };

    this.singleStream = function()
    {
        if (this.style == "singleStream")
        {
            if (this.streamFixed)
            {
                if (this.streamType == "normal")
                {
                    this.dealDamageTo(this.target);
                }
                if (this.streamType == "emp")
                {
                    this.empTo(this.target);
                }

                who.power -= who.weaponCost;
            }
        }
    };

    this.nearestEnemy = function()
    {
        var nearShip = {Y: who.Y + Math.sin(who.rotation - Math.PI) * 1000000, X: who.X + Math.cos(who.rotation - Math.PI) * 1000000};
        var nearDist = false;
        for (var i = 0; i < game.shipsList.length; i++)
        {
            if (this.targetSizeMin <= game.shipsList[i].size)
            {
                //console.log(game.shipsList[i]);
                if (game.shipsList[i].faction != who.faction && this.distanceTo(game.shipsList[i]) <= who.radarRange)
                {
                    if (nearDist == false)
                    {
                        nearShip = game.shipsList[i];
                        nearDist = this.distanceTo(game.shipsList[i])
                    }
                    else if (nearDist > this.distanceTo(game.shipsList[i]))
                    {
                        nearShip = game.shipsList[i];
                        nearDist = this.distanceTo(game.shipsList[i])
                    }
                }
            }
        }

        return nearShip;
    };

    this.nearestEnemyProjectile = function()
    {
        var nearShip = {Y: who.Y + Math.sin(who.rotation - Math.PI) * 1000000, X: who.X + Math.cos(who.rotation - Math.PI) * 1000000};
        var nearDist = false;
        for (var i = 0; i < game.projectilesList.length; i++)
        {
            //console.log(game.shipsList[i]);
            if (game.projectilesList[i].quien.faction != who.faction && this.distanceTo(game.projectilesList[i]) <= who.radarRange && game.projectilesList[i].destructible)
            {
                if (nearDist == false)
                {
                    nearShip = game.projectilesList[i];
                    nearDist = this.distanceTo(game.projectilesList[i])
                }
                else if (nearDist > this.distanceTo(game.projectilesList[i]))
                {
                    nearShip = game.projectilesList[i];
                    nearDist = this.distanceTo(game.projectilesList[i])
                }
            }
        }

        return nearShip;
    };

    this.project = function()
    {
        if (this.tracking == true && this.launchTime + this.trackWait * 1000 <= new Date().getTime())
        {
            this.speed = this.trackSpeed;
            if (this.targetProjectile)
            {
                this.tracked = this.nearestEnemyProjectile();
            }
            else
            {
                this.tracked = this.nearestEnemy();
            }
            self.targetRotation = Math.atan2(self.Y - this.tracked.Y, self.X - this.tracked.X) - Math.PI;
            this.projectileRotation();
        }

        self.X += Math.cos(self.rotation) * self.speed;
        self.Y += Math.sin(self.rotation) * self.speed;

        self.distanceTraveled += Math.max(0, self.speed - who.speed);

        if (this.range != false)
        {
            if (this.distanceTraveled >= this.range)
            {
                if (this.doOnProjectEnd == "fusionExplosion")
                {
                    playSound(this.explosionSound, this.volume, this.explosionSoundTime1, this.explosionSoundTime2);
                    explosion(this.X, this.Y, this.explosionStyle[0], this.explosionStyle[1], this.explosionStyle[2], this.explosionStyle[3]);
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 0/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 1.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 3/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 4.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 6/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 7.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 9/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 10.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 12/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 13.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 15/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 16.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike",this.X, this.Y, this.quien, 18/18 * 2 * Math.PI, 0, 0));
                }
                else if (this.doOnProjectEnd == "fusionExplosion2")
                {
                    playSound(this.explosionSound, this.volume, this.explosionSoundTime1, this.explosionSoundTime2);
                    explosion(this.X, this.Y, this.explosionStyle[0], this.explosionStyle[1], this.explosionStyle[2], this.explosionStyle[3]);
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 0/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 1.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 3/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 4.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 6/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 7.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 9/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 10.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 12/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 13.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 15/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 16.5/18 * 2 * Math.PI, 0, 0));
                    game.projectilesList.push(new Projectile("FusionSpike2",this.X, this.Y, this.quien, 18/18 * 2 * Math.PI, 0, 0));
                }
                for (var i = 0; i < game.projectilesList.length; i++)
                {
                    if (game.projectilesList[i] === this)
                    {
                        game.projectilesList.splice(i, 1);
                    }
                }
            }
        }
    };

    this.distanceTo = function(target)
    {
        return Math.sqrt((this.X - target.X)*(this.X - target.X) + (this.Y - target.Y)*(this.Y - target.Y));
    };

    this.dealDamageTo = function(target)
    {
        var amt = this.damage;

        target.rechargeBlockedTime = new Date().getTime();
        if (target.shields - amt >= 0)
        {
            target.shields -= amt;
        }
        else
        {
            amt -= target.shields;
            target.integrity -= amt;
        }
    };

    this.empTo = function(target)
    {
        var amt = this.EMP;

        target.rechargeBlockedTime = new Date().getTime() - 27000;
        if (target.shields - amt >= 0)
        {
            target.shields -= amt;
        }
        else
        {
            amt -= target.shields;
            target.shields = 0;
            target.energy -= amt;
        }
    };

    this.projectileRotation = function()
    {
        if (distBetweenAngles(this.targetRotation, this.rotation) > this.turnSpeed)
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
                this.rotation += this.turnSpeed;
            }
            else
            {
                this.rotation -= this.turnSpeed;
            }
            this.rotation = this.rotation % (2 * Math.PI);
        }
    };

    this.projectileInteraction = function()
    {
        for (var i = 0; i < game.projectilesList.length; i++)
        {
            if (game.projectilesList[i].quien.faction != who.faction)
            {
                if (this.distanceTo(game.projectilesList[i]) - this.field < game.projectilesList[i].radius)
                {

                    if (this.projectileDistortion)
                    {
                        if (!game.projectilesList[i].distortResist && !game.projectilesList[i].distorted)
                        {
                            game.projectilesList[i].rotation = Math.atan2(this.Y - game.projectilesList[i].Y, this.X - game.projectilesList[i].X) + Math.PI;
                            game.projectilesList[i].turnSpeed = 0;
                            game.projectilesList[i].distorted = true;
                        }
                    }
                    if (this.projectilePhasing == false)
                    {
                        if (this.explodes)
                        {
                            playSound(this.explosionSound, this.volume, this.explosionSoundTime1, this.explosionSoundTime2);
                            explosion(this.X, this.Y, this.explosionStyle[0], this.explosionStyle[1], this.explosionStyle[2], this.explosionStyle[3]);
                        }
                        for (var j = 0; j < game.projectilesList.length; j++)
                        {
                            if (game.projectilesList[j] === this)
                            {
                                game.projectilesList.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }
    };

    this.projectileCollision = function()
    {
        if (this.style == "normal")
        {
            for (var i = 0; i < game.shipsList.length; i++)
            {
                if (game.shipsList[i].faction != who.faction)
                {
                    if (this.distanceTo(game.shipsList[i]) - this.radius < game.shipsList[i].size)
                    {
                        var doDamage = true;
                        if (this.rapidDamaging == false && this.phasing) //this is so that phasing projectiles will not affect a target more than once
                        {
                            for (var l = 0; l < game.shipsList[i].damagedBy.length; l++)
                            {
                                if (game.shipsList[i].damagedBy[l] == this.barcode)
                                {
                                    doDamage = false;
                                }
                            }
                        }

                        if (doDamage)
                        {
                            this.dealDamageTo(game.shipsList[i]); //DAMAGE DEALT HERE

                            if (this.rapidDamaging == false && this.phasing)
                            {
                                game.shipsList[i].damagedBy.push(this.barcode);
                            }
                        }

                        if (this.distortion)
                        {
                            if (!game.shipsList[i].distortResistUP)
                            {
                                game.shipsList[i].rotation += (this.distort / game.shipsList[i].size);
                                game.shipsList[i].handlingDebuffTime = this.distortTime;
                                game.shipsList[i].handlingDebuffStore = new Date().getTime();
                                game.shipsList[i].handlingDebuff = 0.01;
                            }
                        }
                        if (this.phasing == false)
                        {
                            if (this.explodes)
                            {
                                playSound(this.explosionSound, this.volume, this.explosionSoundTime1, this.explosionSoundTime2);
                                explosion(this.X, this.Y, this.explosionStyle[0], this.explosionStyle[1], this.explosionStyle[2], this.explosionStyle[3]);
                            }
                            for (var j = 0; j < game.projectilesList.length; j++)
                            {
                                if (game.projectilesList[j] === this)
                                {
                                    game.projectilesList.splice(j, 1);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    this.animate = function(rate, list)
    {
        this.anim += rate;
        if (Math.floor(this.anim) >= list.length)
        {
            this.anim = 0;
            this.animLoop += 1;
        }

        var i = Math.floor(this.anim);
        draw(list[i][0], list[i][1], list[i][2], list[i][3], list[i][4], list[i][5], list[i][6], list[i][7], list[i][8], list[i][9], list[i][10], list[i][11], list[i][12], list[i][13]);
    };

    this.process = function()
    {
        if (this.tracking && who.faction != "Player" || ifInScreenDraw(this.X, this.Y, this.radius * 2) || game.togglePerformance == false)
        {
            this.defineProjectileStats();
            this.project();
            //this.drawProjectile();
            if (this.projectileInteract)
            {
                this.projectileInteraction();
            }
            if (this.shipInteract)
            {
                this.projectileCollision();
            }
            this.agenda();
            //console.log(this.distanceTo(game.shipsList[1]));
        }
    };
}