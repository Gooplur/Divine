/**
 * Created by skyeguy on 9/2/16.
 */
function Projectile(type, x, y, who, rotation, adX, adY)
{
    var self = this;
    this.X = x;
    this.Y = y;
    this.type = type;
    this.activateProjectile = true;
    this.rotation = rotation;
    this.speed = 1;
    this.range = 500;
    this.distanceTraveled = 0;
    this.tracking = false;
    this.damage = 1;
    this.phasing = false;

    this.defineProjectileStats = function()
    {
        if (this.activateProjectile)
        {
            this.activateProjectile = false;

            if (this.type == "f1Laser")
            {
                this.speed = who.speed + 10;
                this.range = 4000;
                this.damage = 5;
                this.phasing = false;
            }
        }
    };

    this.drawProjectile = function()
    {
        if (this.type == "f1Laser")
        {
            circle(true, this.X, this.Y, 2, 0, 2*Math.PI, "red", false, false, false, 0, 0.65);
        }
    };


    this.project = function()
    {
        if (this.tracking == true)
        {
            var sxy = game.screenToWorld((game.mouseX - 1/2 * game.c.width) / game.scale, (game.mouseY - 1/2 * game.c.height) / game.scale);
            self.rotation = Math.atan2(sxy[1] - self.Y, sxy[0] - self.X) - Math.PI / 2;
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

    this.projectileCollision = function()
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

    this.process = function()
    {
        this.defineProjectileStats();
        this.project();
        this.drawProjectile();
        this.projectileCollision();
        //console.log(this.distanceTo(game.shipsList[1]));
    };
}