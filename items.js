/**
 * Created by skyeguy on 12/30/16.
 */
    function itemize(name, quantity, extra)
    {
        this.name = name;
        this.quantity = quantity;
        this.utility = null;
        this.subUtility = null;
        this.part = null;
        this.type = null;
        this.manufacturer = "unknown";
        this.maxStack = 1;
        this.price = 200;
        this.selected = false;
        this.dragged = false;
        this.image = ["divineStarterPack", 132, 23, 7, 9, 4]; //[image, Xgrab, Ygrab, proportion]
        this.brand = ["divineStarterPack", 132, 23, 7, 9, 6]; //[image, Xgrab, Ygrab, proportion]
        this.extra = extra;
        //ship variables
        this.upgrade = "none";
        this.ammo = "none";
        this.AI = "simple-missile";
        //maintenance variables
        this.charge = 0;
        this.repair = 0;
        this.boost = 0;

        //Define All Items

        //Part
        if (this.name == "Afid01-F1Lasers")
        {
            this.utility = "part";
            this.part = "sideguns";
            this.manufacturer = "Eunha"; //은하
            this.price = 200;
            this.image = ["divineStarterPack", 116, 40, 33, 13, 1.9];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Afid01-M1Launcher")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Eunha"; //은하
            this.price = 800;
            this.image = ["divineStarterPack", 62, 75, 12, 14, 2];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Afid01-Boosters")
        {
            this.utility = "part";
            this.part = "boosters";
            this.manufacturer = "Eunha"; //은하
            this.price = 550;
            this.image = ["divineStarterPack", 123, 73, 27, 18, 1.75];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "RedStarShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Grevner Technologies";
            this.price = 5000;
            this.image = ["divineKitC", 101, 302, 37, 37, 1];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }
        else if (this.name == "CosmosShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Grevner Technologies";
            this.price = 5000;
            this.image = ["divineKitC", 101, 302, 37, 37, 1];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }
        else if (this.name == "JadeDragonShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Baquan"; //霸权
            this.price = 6000;
            this.image = ["divineKitC", 101, 302, 37, 37, 1];
            this.brand = ["divineKitC", 306, 148, 144, 128, 1];
        }
        else if (this.name == "Disk01-F1SingleStream")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "Eunha"; //은하
            this.price = 1100;
            this.image = ["divineStarterPack", 200, 7, 20, 19, 2];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Afid01-F1SentryGun")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "Eunha"; //은하
            this.price = 2500;
            this.image = ["divineStarterPack", 122, 102, 30, 15, 2];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Mantis09-PlasmaCannon")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Eunha"; //은하
            this.price = 6000;
            this.image = ["divineKitA", 195, 75, 15, 15, 2.8];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Mantis09-PlasmaBlasters")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Eunha"; //은하
            this.price = 3900;
            this.image = ["divineKitA", 195, 44, 20, 14, 2.2];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Mantis09-PlasmaAccelerator")
        {
            this.utility = "part";
            this.part = "boosters";
            this.manufacturer = "Eunha"; //은하
            this.price = 2000;
            this.image = ["divineKitA", 195, 58, 16, 16, 2.8];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Majestad-TrineumDisseminator")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Alturatec";
            this.price = 35000;
            this.image = ["divineKitB", 119, 118, 14, 21, 2.1];
            this.brand = ["divineKitC", 30, 157, 31, 42, 3.3];
        }
        else if (this.name == "Majestad-TrineumSplicer") //todo not yet added
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Alturatec";
            this.price = 50000;
            this.image = ["divineKitB", 100, 91, 28, 21, 2];
            this.brand = ["divineKitC", 30, 157, 31, 42, 3.3];
        }
        else if (this.name == "Majestad-TrineumRay")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Alturatec";
            this.price = 20000;
            this.image = ["divineKitB", 103, 150, 28, 21, 2];
            this.brand = ["divineKitC", 30, 157, 31, 42, 3.3];
        }
        else if (this.name == "Majestad-TrineumBlasterSentryGuns")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "Alturatec";
            this.price = 20000;
            this.image = ["divineKitB", 0, 75, 18, 22, 2];
            this.brand = ["divineKitC", 30, 157, 31, 42, 3.3];
        }
        else if (this.name == "Majestad-CelesteShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Alturatec";
            this.price = 20000;
            this.image = ["divineKitC", 101, 302, 37, 37, 1];
            this.brand = ["divineKitC", 30, 157, 31, 42, 3.3];
        }
        else if (this.name == "Screecher-F3Lasers")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Void";
            this.price = 2200;
            this.image = ["divineKitC", 281, 315, 68, 32, 1.05];
            this.brand = ["divineKitC", 75, 154, 49, 49, 2.3];
        }
        else if (this.name == "Screecher-EtherBlasters")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Void";
            this.price = 8000;
            this.image = ["divineKitC", 287, 365, 53, 19, 1.1];
            this.brand = ["divineKitC", 75, 154, 49, 49, 2.3];
        }
        else if (this.name == "StabilizingParticleFogShield")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Void";
            this.price = 11000;
            this.image = ["divineKitC", 101, 302, 37, 37, 1];
            this.brand = ["divineKitC", 75, 154, 49, 49, 2.3];
        }
        else if (this.name == "Screecher-F3SentryGuns")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "Void";
            this.price = 8800;
            this.image = ["divineKitC", 0, 215, 69, 32, 1.05];
            this.brand = ["divineKitC", 75, 154, 49, 49, 2.3];
        }
        else if (this.name == "Screecher-EtherSentryGuns")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "Void";
            this.price = 19000;
            this.image = ["divineKitC", 0, 248, 73, 40, 1.05];
            this.brand = ["divineKitC", 75, 154, 49, 49, 2.3];
        }
        else if (this.name == "Harbinger88-FusionLaunchers")
        {
            this.utility = "part";
            this.part = "sideguns";
            this.manufacturer = "Grevner Technologies";
            this.price = 190000;
            this.image = ["divineKitD", 365, 1, 76, 52, 1.2];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }
        else if (this.name == "Harbinger88-FusionCasters")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Grevner Technologies";
            this.price = 240000;
            this.image = ["divineKitD", 747, 720, 69, 63, 1.15];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }
        else if (this.name == "Harbinger88-FusionCompactionCannon")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "Grevner Technologies";
            this.price = 1000000;
            this.image = ["divineKitD", 447, 695, 77, 87, 1.15];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }
        else if (this.name == "MinionC32-FusionSentryGun")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "Grevner Technologies";
            this.price = 6200;
            this.image = ["divineKitD", 605, 714, 68, 49, 0.86];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }

        //Core
        else if (this.name == "CORE")
        {
            this.utility = "core";
            this.part = "core";
            this.price = 0;
            this.image = ["divineKitB", 68, 2, 42, 42, 0.4444];
        }

        //Ammunition
        if (this.name == "M1Missile")
        {
            this.utility = "ammunition";
            this.subUtility = "Missile";
            this.maxStack = 20;
            this.price = 60;
            this.image = ["divineStarterPack", 117, 13, 26, 6, 2];
        }
        else if (this.name == "PlasmaticSeeker")
        {
            this.utility = "ammunition";
            this.subUtility = "Missile";
            this.maxStack = 16;
            this.price = 140;
            this.image = ["divineKitA", 206, 3, 8, 21, 2.25];
        }
        else if (this.name == "PlasmaBomb")
        {
            this.utility = "ammunition";
            this.subUtility = "Bomb";
            this.maxStack = 2;
            this.price = 3600;
            this.image = ["divineKitA", 172, 34, 9, 10, 2.4];
        }
        else if (this.name == "DecoyCore")
        {
            this.utility = "ammunition";
            this.subUtility = "Decoy";
            this.maxStack = 12;
            this.price = 50;
            this.image = ["divineKitA", 206, 34, 6, 10, 2.4];
        }
        else if (this.name == "TrineumSeeker")
        {
            this.utility = "ammunition";
            this.subUtility = "Missile";
            this.maxStack = 10;
            this.price = 1000;
            this.image = ["divineKitB", 131, 86, 8, 29, 2];
        }
        else if (this.name == "FusionSeeker")
        {
            this.utility = "ammunition";
            this.subUtility = "Missile";
            this.maxStack = 4;
            this.price = 40000;
            this.image = ["divineKitD", 875, 472, 19, 93, 0.85];
        }

        //Resource
        if (this.name == "Freshwater")
        {
            this.utility = "resource";
            this.maxStack = 10;
            this.price = 28;
            this.description = "Sealed barrels of clear desalinated purified water.";
            this.image = ["divineKitB", 51, 5, 8, 14, 2];
        }
        else if (this.name == "Petroleum")
        {
            this.utility = "resource";
            this.maxStack = 5;
            this.price = 86;
            this.description = "A large container of combustible petroleum fuel for a world's developing economies' transportation systems.";
            this.image = ["divineKitB", 15, 44, 29, 30, 2];
        }
        else if (this.name == "Scrap")
        {
            this.utility = "resource";
            this.maxStack = 15;
            this.price = 100;
            this.description = "A jumbled mesh of warped, bent, and broken materials from a destroyed ship.";
            this.image = ["divineKitC", 451, 168, 50, 59, 1];
        }
        else if (this.name == "Oxygen Tank")
        {
            this.utility = "resource";
            this.maxStack = 5;
            this.price = 100;
            this.description = "A large highly compressed tank of oxygen.";
            this.image = ["divineKitC", 81, 348, 43, 44, 1.2];
        }

        //Maintenance
        if (this.name == "Power Core")
        {
            this.utility = "maintenance";
            this.maxStack = 30;
            this.price = 165;
            this.charge = 500;
            this.image = ["divineStarterPack", 118, 21, 7, 14, 2];
        }
        else if (this.name == "Repair Kit")
        {
            this.utility = "maintenance";
            this.maxStack = 10;
            this.price = 40;
            this.repair = 100;
            this.image = ["divineKitC", 2, 361, 67, 39, 1];
        }
        else if (this.name == "Shield Jumper")
        {
            this.utility = "maintenance";
            this.maxStack = 4;
            this.price = 250;
            this.boost = 2000;
        }

        //Ship
        if (this.name == "Mantis09")
        {
            this.utility = "ship";
            this.type = "Fighter (large)";
            this.manufacturer = "Eunha"; //은하
            this.price = 24240;
            this.image = ["divineKitA", 7, 13, 59, 60, 1.4];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Afid01")
        {
            this.utility = "ship";
            this.type = "Fighter (small)";
            this.manufacturer = "Eunha"; //은하
            this.price = 1000;
            this.image = ["divineStarterPack", 12, 11, 37, 50, 1.15];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Disk01")
        {
            this.utility = "ship";
            this.type = "Fighter (small)";
            this.manufacturer = "Eunha"; //은하
            this.price = 1200;
            this.AI = "basic";
            this.image = ["divineStarterPack", 124, 165, 32, 31, 1.4];
            this.brand = ["divineKitC", 148, 155, 130, 56, 1.6];
        }
        else if (this.name == "Majestad")
        {
            this.utility = "ship";
            this.type = "Battleship";
            this.manufacturer = "Alturatec";
            this.price = 500000;
            this.image = ["divineKitB", 12, 95, 42, 110, 1.2];
            this.brand = ["divineKitC", 30, 157, 31, 42, 3.3];
        }
        else if (this.name == "Screecher")
        {
            this.utility = "ship";
            this.type = "Fighter (large)";
            this.manufacturer = "Void";
            this.price = 33000;
            this.image = ["divineKitC", 9, 22, 236, 128, 0.75];
            this.brand = ["divineKitC", 75, 154, 49, 49, 2.3];
        }
        else if (this.name == "Harbinger88")
        {
            this.utility = "ship";
            this.type = "Capital Ship";
            this.manufacturer = "Grevner Technologies";
            this.price = 3000000;
            this.image = ["divineKitD", 29, 127, 384, 556, 0.2];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }
        else if (this.name == "MinionC32")
        {
            this.utility = "ship";
            this.type = "Fighter (Medium)";
            this.manufacturer = "Grevner Technologies";
            this.price = 9000;
            this.image = ["divineKitD", 83, 684, 80, 116, 0.45];
            this.brand = ["divineKitD", 16, 0, 44, 47, 2.2];
        }

        //Set the quantity within reasonable bounds
        this.quantity = Math.min(this.quantity, this.maxStack);

        //Construct Items into different Objects based on the type of item they are.
        if (this.utility == "part" || this.utility == "core")
        {
            //Forms a Part type object.
            return {name: this.name, quantity: this.quantity, part: this.part, utility: this.utility, manufacturer: this.manufacturer, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged, image: this.image, brand: this.brand};
        }
        else if (this.utility == "ammunition")
        {
            //Forms an Ammunition type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility, subUtility: this.subUtility, manufacturer: this.manufacturer, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged, image: this.image};
        }
        else if (this.utility == "resource")
        {
            //Forms a Resource type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility, description: this.description, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged, image: this.image};
        }
        else if (this.utility == "maintenance")
        {
            //Forms a Resource type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility, description: this.description, maxStack: this.maxStack, price: this.price, charge: this.charge, repair: this.repair, boost: this.boost, selected: this.selected, dragged: this.dragged, image: this.image};
        }
        else if (this.utility == "ship")
        {
            //Forms an Ammunition type object.
            if (typeof(this.extra) != "undefined")
            {
                return {name: this.name, quantity: this.quantity, utility: this.utility, manufacturer: this.manufacturer, upgrade: this.upgrade, ammo: this.ammo, cargo: this.cargo, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged, extra: this.extra, image: this.image, brand: this.brand, type: this.type};
            }
            else
            {
                return {name: this.name, quantity: this.quantity, utility: this.utility, manufacturer: this.manufacturer, upgrade: this.upgrade, ammo: this.ammo, cargo: this.cargo, maxStack: this.maxStack, price: this.price, selected: this.selected, dragged: this.dragged, extra: false, image: this.image, brand: this.brand, type: this.type};
            }
        }

    }