/**
 * Created by skyeguy on 12/17/17.
 */

function Person(x, y)
{
    //Gameplay
    this.X = x;
    this.Y = y;
    this.rotation = 0;
    this.player = false;
    this.team = "Neutral";
    this.mode = "player";
    this.time = 1; //the rate at which all draw animations and movements operate at.

    //Leveling
    this.level = 1;
    this.experience = 0;
    this.experienceToLevel = 100;

    //Characteristics
    this.name = "Derrente";
    this.apellido = "Grunwel";
    this.sex = "Male";
    this.race = "Caucasian";
    this.hair = "Ginger";

    //worn
    this.outfit = "none";

    //Skills
    this.skillpoints = 0; // 2 are gained per level.

    this.hacking = 0; // All skills cap at 20; This determines your ability to hack into computerized systems as well as robotic entities, also can allow you to program computer viruses.
    this.mechanics = 0; // All skills cap at 20; This determines your ability to repair vehicles your own armor (which is basically like your health), and allows you to build or fix hardware.
    this.heavyGuns = 0; // All skills cap at 20; This improves aim and slightly increases damage while using large guns.
    this.lightGuns = 0; // All skills cap at 20; This improves aim and slightly increases damage while using small to medium sized guns.
    this.influence = 0; // All skills cap at 20; This is primarily a dialogue skill, it allows you access to certain dialogue options that usually reward you better than the alternative. This also determines the level to which you are able to negotiate good deals for yourself (money wise). This also determines the maxcap for allies that the player can have at once.
    this.fitness = 0; // All skills cap at 20; This determines the amount that you can carry, and whether you can physically move or rid physical barriers, it also increases general movement speed slightly.

    //Abilities
    this.abilitypoints = 0;

    this.abilities = []; //abilities are significant effects that enhance or weaken the character, they are effective on their own and they do not stack. Eg. Super Soldier (press a special key to make all enemies go in slow motion for some time) Eg. Hustle (increases player speed by 25%) Eg. Spoiled Brat (gain one extra skill point every level but levels are 65% harder to achieve) Eg. Expert (raises max cap for all skills but light and heavy guns by 5)

    //Stats
    this.healthMAX = 5;
    this.health = 5;
    this.durabilityMAX = 300;
    this.durability = 300;
    this.armorMAX = 5;
    this.armor = 5;
    this.shieldingMAX = 100;
    this.shielding = 100;
    this.speedMAX = 6;
    this.speed = 6;
    this.sightMAX = 900;
    this.sight = 900;
    this.mult = 1;
    this.size = 12 * this.mult;

    this.durabilityUP = 0;
    this.armorUP = 0;
    this.shieldingUP = 0;
    this.speedUP = 0;
    this.sightUP = 0;

    //Items/Inventory
    this.ammobelt = []; //this is the inventory for ammunition only.
    this.equipped = []; //this is what your character has equipped.
    this.inventory = []; //these are the items and weapons that your character has with them.
    this.weightMAX = 200;
    this.weight = 0;

    this.setStats = function ()
    {
        if (this.mode == "player")
        {
            this.healthMAX = this.getHealth();
            this.durabilityMAX = this.getDurability();
            this.armorMAX = this.getArmor();
            this.shieldingMAX = this.getShielding();
            this.speedMAX = this.getSpeed();
            this.sightMAX = this.getSight();
            this.mult = this.getMult();
            this.size = 12 * this.mult;
        }
    };

    this.getMult = function ()
    {
        return 1 + 0.015 * this.fitness;
    };

    this.getHealth = function ()
    {
        return 5;
    };

    this.getDurability = function ()
    {
        return 0 + this.durabilityUP;
    };

    this.getArmor = function ()
    {
        return 0 + this.armorUP;
    };

    this.getShielding = function ()
    {
        return 0 + this.shieldingUP;
    };

    this.getSpeed = function ()
    {
        return (6 + 1 / 5 * this.fitness) + this.speedUP;
    };

    this.getSight = function ()
    {
        return 900 + this.sightUP;
    };


    this.worn = function ()
    {
        if (this.mode == "player")
        {
            this.outfit = "none";

            for (var i = 0; i < this.equipped.length; i++) //TODO add object-type items to this game {type: "outfit", name: "desolater" ...}
            {
                if (this.equipped[i].type == "outfit")
                {
                    this.outfit = this.equipped[i].name;
                }
            }
        }
    };

    this.drawSelf = function()
    {
        if (this.mode == "player")
        {
            landed.cx.save();
            landed.cx.translate(this.X, this.Y);
            landed.cx.rotate(this.rotation);
            //legs

            //arms

            if (this.outfit == "none")
            {
                //body
                if (this.race == "Caucasian")
                {
                    landed.cx.drawImage(landedA, 188, 5, 20, 19, - 1/2 * 20 * this.mult, - 1/2 * 19 * this.mult, 20 * this.mult, 19 * this.mult);
                }
                else if (this.race == "Asian")
                {
                    landed.cx.drawImage(landedA, 222, 5, 20, 19, - 1/2 * 20 * this.mult, - 1/2 * 19 * this.mult, 20 * this.mult, 19 * this.mult);
                }
                else if (this.race == "African")
                {
                    landed.cx.drawImage(landedA, 156, 5, 20, 19, - 1/2 * 20 * this.mult, - 1/2 * 19 * this.mult, 20 * this.mult, 19 * this.mult);
                }
                else if (this.race == "Arabic")
                {
                    landed.cx.drawImage(landedA, 254, 5, 20, 19, - 1/2 * 20 * this.mult, - 1/2 * 19 * this.mult, 20 * this.mult, 19 * this.mult);
                }
                else if (this.race == "Hispanic")
                {
                    landed.cx.drawImage(landedA, 284, 5, 20, 19, - 1/2 * 20 * this.mult, - 1/2 * 19 * this.mult, 20 * this.mult, 19 * this.mult);
                }
                else if (this.race == "Nordic")
                {
                    landed.cx.drawImage(landedA, 313, 5, 20, 19, - 1/2 * 20 * this.mult, - 1/2 * 19 * this.mult, 20 * this.mult, 19 * this.mult);
                }
                //hair
                if (this.hair == "Black")
                {
                    landed.cx.drawImage(landedA, 343, 4, 20, 19, - 1/2 * 20 * this.mult + 1, - 1/2 * 19 * this.mult - 1, 20 * this.mult, 19 * this.mult);
                }
                else if (this.hair == "Brown")
                {
                    landed.cx.drawImage(landedA, 374, 4, 20, 19, - 1/2 * 20 * this.mult + 0, - 1/2 * 19 * this.mult - 1, 20 * this.mult, 19 * this.mult);
                }
                else if (this.hair == "Blonde")
                {
                    landed.cx.drawImage(landedA, 402, 5, 20, 19, - 1/2 * 20 * this.mult + 1.1, - 1/2 * 19 * this.mult - 1, 20 * this.mult, 19 * this.mult);
                }
                else if (this.hair == "Black-Curly")
                {
                    landed.cx.drawImage(landedA, 451, 4, 20, 19, - 1/2 * 20 * this.mult + 0.6, - 1/2 * 19 * this.mult - 0.6, 20 * this.mult, 19 * this.mult);
                }
                else if (this.hair == "Brown-Curly")
                {
                    landed.cx.drawImage(landedA, 477, 3, 20, 19, - 1/2 * 20 * this.mult + 0.6, - 1/2 * 19 * this.mult - 0.6, 20 * this.mult, 19 * this.mult);
                }
                else if (this.hair == "Ginger")
                {
                    landed.cx.drawImage(landedA, 314, 30, 20, 19, - 1/2 * 20 * this.mult + 0.6, - 1/2 * 19 * this.mult - 0.6, 20 * this.mult, 19 * this.mult);
                }
            }
            else
            {
                //helmet

            }
            landed.cx.restore();
        }
    };

    this.operation = function()
    {
        this.setStats();

        this.worn();
    };
    //todo add the get functions eg. getHealth()
}