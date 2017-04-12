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
                this.damage = 0.25;
                this.phasing = false;
                this.streamFixed = false;
                this.streamType = "normal";
                this.style = "singleStream";
                this.zIndex = 2;
            }
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
                    line(this.X, this.Y, this.target.X, this.target.Y, "red", 3, true, 0, 0.65);
                    this.streamFixed = true;
                }
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
            game.projectilesList.splice(game.projectilesList.indexOf(this), 1);
        }
    };

    this.nearestEnemy = function()
    {
        var nearShip = {Y: who.Y + Math.sin(who.rotation - Math.PI) * 1000000, X: who.X + Math.cos(who.rotation - Math.PI) * 1000000};
        var nearDist = false;
        for (var i = 0; i < game.shipsList.length; i++)
        {
            console.log(game.shipsList[i]);
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
                    if (this.distanceTo(game.shipsList[i]) < game.shipsList[i].size)
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

    this.process = function()
    {
        if (this.tracking && who.faction != "Player" || ifInScreenDraw(this.X, this.Y, 5) || game.togglePerformance == false)
        {
            this.defineProjectileStats();
            this.project();
            //this.drawProjectile();
            this.projectileCollision();
            this.singleStream();
            //console.log(this.distanceTo(game.shipsList[1]));
        }
    };
}