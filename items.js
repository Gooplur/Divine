/**
 * Created by skyeguy on 12/30/16.
 */
    function itemize(name, quantity, extra)
    {
        this.name = name;
        this.quantity = quantity;
        this.utility = null;
        this.part = null;
        this.type = null;
        this.manufacturer = "unknown";
        this.maxStack = 1;
        this.price = 200;
        this.selected = false;
        this.dragged = false;
        this.image = []; //image, startX, startY, W, H... etc.
        this.extra = extra;
        //ship variables
        this.upgrade = "none";
        this.ammo = "none";
        this.AI = "simple-missile";
        //maintenance variables
        this.charge = 0;
        this.repair = 0;

        //Define All Items

        //Part
        if (this.name == "Afid01-F1Lasers")
        {
            this.utility = "part";
            this.part = "sideguns";
            this.manufacturer = "은하";
            this.price = 500;
        }
        else if (this.name == "Afid01-M1Launcher")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "은하";
            this.price = 1500;
        }
        else if (this.name == "Afid01-Boosters")
        {
            this.utility = "part";
            this.part = "boosters";
            this.manufacturer = "은하";
            this.price = 750;
        }
        else if (this.name == "RedStarShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Grevner Technologies";
            this.price = 5000;
        }
        else if (this.name == "CosmosShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Grevner Technologies";
            this.price = 5000;
        }
        else if (this.name == "JadeDragonShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "霸权";
            this.price = 6000;
        }
        else if (this.name == "Disk01-F1SingleStream")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "은하";
            this.price = 1100;
        }
        else if (this.name == "Afid01-F1SentryGun")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "은하";
            this.price = 3500;
        }
        else if (this.name == "Mantis09-PlasmaCannon")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "은하";
            this.price = 9200;
        }
        else if (this.name == "Mantis09-PlasmaBlasters")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "은하";
            this.price = 3900;
        }
        else if (this.name == "Mantis09-PlasmaAccelerator")
        {
            this.utility = "part";
            this.part = "boosters";
            this.manufacturer = "은하";
            this.price = 2550;
        }
        else if (this.name == "Majestad-TrineumDisseminator") //Majestad-TrineumRay
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Alturatec";
            this.price = 100000;
        }
        else if (this.name == "Majestad-TrineumRay")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Alturatec";
            this.price = 25000;
        }

        //Core
        else if (this.name == "CORE")
        {
            this.utility = "core";
            this.part = "core";
            this.price = 0;
        }

        //Ammunition
        if (this.name == "M1Missile")
        {
            this.utility = "ammunition";
            this.maxStack = 20;
            this.price = 60;
        }
        else if (this.name == "PlasmaticSeeker")
        {
            this.utility = "ammunition";
            this.maxStack = 10;
            this.price = 140;
        }
        else if (this.name == "PlasmaBomb")
        {
            this.utility = "ammunition";
            this.maxStack = 2;
            this.price = 3600;
        }
        else if (this.name == "DecoyCore")
        {
            this.utility = "ammunition";
            this.maxStack = 12;
            this.price = 50;
        }
        else if (this.name == "TrineumSeeker")
        {
            this.utility = "ammunition";
            this.maxStack = 24;
            this.price = 1000;
        }

        //Resource
        if (this.name == "Freshwater")
        {
            this.utility = "resource";
            this.maxStack = 10;
            this.price = 28;
            this.description = "Sealed barrels of clear desalinated purified water."
        }
        else if (this.name == "Petroleum")
        {
            this.utility = "resource";
            this.maxStack = 5;
            this.price = 86;
            this.description = "A large container of combustible petroleum fuel for a world's developing economies' transportation systems."
        }

        //Maintenance
        if (this.name == "Power Core")
        {
            this.utility = "maintenance";
            this.maxStack = 4;
            this.price = 65;
            this.charge = 500;
        }
        else if (this.name == "Repair Kit")
        {
            this.utility = "maintenance";
            this.maxStack = 5;
            this.price = 40;
            this.repair = 100;
        }

        //Ship
        if (this.name == "Mantis09")
        {
            this.utility = "ship";
            this.type = "Fighter";
            this.manufacturer = "은하";
            this.price = 24240;
        }
        else if (this.name == "Afid01")
        {
            this.utility = "ship";
            this.type = "Fighter";
            this.manufacturer = "은하";
            this.price = 1000;
        }
        else if (this.name == "Disk01")
        {
            this.utility = "ship";
            this.type = "Fighter";
            this.manufacturer = "은하";
            this.price = 1200;
            this.AI = "basic";
        }
        else if (this.name == "Majestad")
        {
            this.utility = "ship";
            this.type = "Battleship";
            this.manufacturer = "Alturatec";
            this.price = 500000;
        }


        //Construct Items into different Objects based on the type of item they are.
        if (this.utility == "part" || this.utility == "core")
        {
            //Forms a Part type object.
            return {name: this.name, quantity: this.quantity, part: this.part, utility: this.utility, manufacturer: this.manufacturer, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged};
        }
        else if (this.utility == "ammunition")
        {
            //Forms an Ammunition type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility, manufacturer: this.manufacturer, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged};
        }
        else if (this.utility == "resource")
        {
            //Forms a Resource type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility, description: this.description, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged};
        }
        else if (this.utility == "maintenance")
        {
            //Forms a Resource type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility, description: this.description, maxStack: this.maxStack, price: this.price, charge: this.charge, repair: this.repair, selected: this.selected, dragged: this.dragged};
        }
        else if (this.utility == "ship")
        {
            //Forms an Ammunition type object.
            if (typeof(this.extra) != "undefined")
            {
                return {name: this.name, quantity: this.quantity, utility: this.utility, manufacturer: this.manufacturer, upgrade: this.upgrade, ammo: this.ammo, cargo: this.cargo, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged, extra: this.extra};
            }
            else
            {
                return {name: this.name, quantity: this.quantity, utility: this.utility, manufacturer: this.manufacturer, upgrade: this.upgrade, ammo: this.ammo, cargo: this.cargo, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged, extra: false};
            }
        }

    }