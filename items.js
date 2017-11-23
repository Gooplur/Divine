/**
 * Created by skyeguy on 12/30/16.
 */
    function itemize(name, quantity)
    {
        this.name = name;
        this.quantity = quantity;
        this.utility = null;
        this.part = null;
        this.type = null;
        this.manufacturer = "unknown";
        this.maxStack = 1;
        this.selected = false;
        this.dragged = false;

        //Define All Items

        //Part
        if (name == "Afid01-F1Lasers")
        {
            this.utility = "part";
            this.part = "sideguns";
            this.manufacturer = "은하";
        }
        else if (name == "Afid01-M1Launcher")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "은하";
        }
        else if (name == "Afid01-Boosters")
        {
            this.utility = "part";
            this.part = "boosters";
            this.manufacturer = "은하";
        }
        else if (name == "RedStarShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Grevner Technologies";
        }
        else if (name == "CosmosShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "Grevner Technologies";
        }
        else if (name == "JadeDragonShields")
        {
            this.utility = "part";
            this.part = "shielding";
            this.manufacturer = "霸权";
        }
        else if (name == "Disk01-F1SingleStream")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "은하";
        }
        else if (name == "Afid01-F1SentryGun")
        {
            this.utility = "part";
            this.part = "turret";
            this.manufacturer = "은하";
        }
        else if (name == "Mantis09-PlasmaCannon")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "은하";
        }
        else if (name == "Mantis09-PlasmaBlasters")
        {
            this.utility = "part";
            this.part = "mainguns";
            this.manufacturer = "은하";
        }
        else if (name == "Mantis09-PlasmaAccelerator")
        {
            this.utility = "part";
            this.part = "boosters";
            this.manufacturer = "은하";
        }

        //Ammunition
        if (name == "M1Missile")
        {
            this.utility = "ammunition";
            this.maxStack = 20;
        }
        else if (name == "PlasmaticSeeker")
        {
            this.utility = "ammunition";
            this.maxStack = 10;
        }
        else if (name == "PlasmaBomb")
        {
            this.utility = "ammunition";
            this.maxStack = 2;
        }
        else if (name == "DecoyCore")
        {
            this.utility = "ammunition";
            this.maxStack = 12;
        }


        //Construct Items into different Objects based on the type of item they are.
        if (this.utility == "part")
        {
            //Forms a Part type object.
            return {name: this.name, quantity: this.quantity, part: this.part, utility: this.utility, manufacturer: this.manufacturer, maxStack: this.maxStack, selected: this.selected, dragged: this.dragged};
        }
        else if (this.utility == "ammunition")
        {
            //Forms an Ammunition type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility, manufacturer: this.manufacturer, maxStack: this.maxStack, selected: this.selected, dragged: this.dragged};
        }

    }