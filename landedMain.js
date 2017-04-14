/**
 * Created by skyeguy on 4/13/17.
 */

function Person()
{
    //Gameplay
    this.X = 0;
    this.Y = 0;
    this.mode = "player";

    //Leveling
    this.level = 1;
    this.experience = 0;
    this.experienceToLevel = 100;

    //Characteristics
    this.name = "Derrente";
    this.apellido = "Grunwel";
    this.sex = "Male";
    this.race = "White";
    this.hair = "Short-Black";

    //Skills
    this.skillpoints = 0; // 2 are gained per level.

    this.hacking = 0; // All skills cap at 20; This determines your ability to hack into computerized systems as well as robotic entities, also can allow you to program computer viruses.
    this.mechanics = 0; // All skills cap at 20; This determines your ability to repair vehicles your own armor (which is basically like your health), and allows you to build or fix hardware.
    this.heavyGuns = 0; // All skills cap at 20; This improves aim and slightly increases damage while using large guns.
    this.lightGuns = 0; // All skills cap at 20; This improves aim and slightly increases damage while using small to medium sized guns.
    this.influence = 0; // All skills cap at 20; This is primarily a dialogue skill, it allows you access to certain dialogue options that usually reward you better than the alternative. This also determines the levelto which you are able to negotiate good deals for yourself (money wise).
    this.burden = 0; // All skills cap at 20; This determines the amount that you can carry, and whether you can physically move or rid physical barriers.

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

    //Items/Inventory
    this.ammobelt = []; //this is the inventory for ammunition only.
    this.equipped = []; //this is what your character has equipped.
    this.inventory = []; //these are the items and weapons that your character has with them.
    this.weightMAX = 200;
    this.weight = 0;

    this.setStats = function()
    {
        if (this.mode == "player")
        {
            this.healthMAX = this.getHealth();
            this.durabilityMAX = this.getDurability();
            this.armorMAX = this.getArmor();
            this.shieldingMAX = this.getShielding();
            this.speedMAX = this.getSpeed();
            this.sightMAX = this.getSight();
        }
    }

    //todo add the get functions eg. getHealth()
}