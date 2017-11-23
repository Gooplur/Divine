/**
 * Created by skyeguy on 9/2/16.
 */
function Projectile(type, x, y, who, rotation, adX, adY)
{
    var self = this;
    this.zIndex = 0;
    this.X = x;
    this.Y = y;
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
    this.radius = 0;
    //rotating projectiles only
    this.targetRotation = this.rotation;
    this.turnSpeed = 1/9 * Math.PI;
    //single-stream only
    this.streamFixed = false;
    this.streamType = "normal";
    //tracking projectiles only
    this.tracking = false;
    this.launchTime = new Date().getTime();
    this.trackWait = 0.15;
    this.trackSpeed = 14;
    this.tracked = false;
    //exploding projectiles only
    this.explodes = false;
    this.explosionStyle = [5, "red", "orange", "yellow"];
    this.explosionSound = new Audio("sounds/heavyXPL.wav");
    this.volume = 0.75;
    this.explosionSoundTime1 = 0;
    this.explosionSoundTime2 = this.explosionSound.duration;

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
                this.explosionStyle = [11, 5, 9, ["#00ff00", "#99ff33", "#99ff99"]];
                this.turnSpeed = 4/100 * Math.PI;
                this.trackWait = 1.4;
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
        }
    };

    this.agenda = function() //This is for projectile types that constantly regulate action based on preset projectile specific conditions.
    {
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
            else if (this.type == "M1Missile")
            {
                draw(divineStarterPack, 117, 12, 26, 7, this.X - 1/2 * 12, this.Y - 1/2 * 26, 26, 7, this.rotation, false, 1, 0, 0);
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
                draw(divineKitA, 207, 3, 6, 21, this.X - 1/2 * 6 * 1.6, this.Y - 1/2 * 21 * 1.6, 6 * 1.6, 21 * 1.6, this.rotation - 1/2 * Math.PI, false, 1, 0, 0);
            }
            else if (this.type == "PlasmaLaser")
            {
                //draw(); //the list should contain the fields in the draw function in the same order.
                this.animate(0.10, [[divineKitA, 170, 53, 6, 10, this.X - 1/2 * 6 * 1.7, this.Y - 1/2 * 10 * 1.7, 6 * 1.7, 10 * 1.7, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 178, 53, 6, 10, this.X - 1/2 * 6 * 1.7, this.Y - 1/2 * 10 * 1.7, 6 * 1.7, 10 * 1.7, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 184, 53, 6, 10, this.X - 1/2 * 6 * 1.7, this.Y - 1/2 * 10 * 1.7, 6 * 1.7, 10 * 1.7, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0]]);
            }
            else if (this.type == "PlasmaBlast")
            {
                //draw(); //the list should contain the fields in the draw function in the same order.
                this.animate(0.10, [[divineKitA, 144, 7, 15, 15, this.X - 1/2 * 15 * 1.8, this.Y - 1/2 * 15 * 1.8, 15 * 1.8, 15 * 1.8, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 161, 7, 15, 15, this.X - 1/2 * 15 * 1.8, this.Y - 1/2 * 15 * 1.8, 15 * 1.8, 15 * 1.8, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0], [divineKitA, 179, 8, 15, 15, this.X - 1/2 * 15 * 1.8, this.Y - 1/2 * 15 * 1.8, 15 * 1.8, 15 * 1.8, this.rotation - 1/2 * Math.PI, false, 0.85, 0, 0]]);
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

        return nearShip;
    };

    this.project = function()
    {
        if (this.tracking == true && this.launchTime + this.trackWait * 1000 <= new Date().getTime())
        {
            this.speed = this.trackSpeed;
            this.tracked = this.nearestEnemy();
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
                        this.dealDamageTo(game.shipsList[i]);
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
        if (this.tracking && who.faction != "Player" || ifInScreenDraw(this.X, this.Y, 5) || game.togglePerformance == false)
        {
            this.defineProjectileStats();
            this.project();
            //this.drawProjectile();
            this.projectileCollision();
            this.agenda();
            //console.log(this.distanceTo(game.shipsList[1]));
        }
    };
}