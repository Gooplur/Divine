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

        //Define All Items

        //Part
        if (name == "Afid01-F1Lasers")
        {
            this.utility = "part";
            this.part = "sideguns";
        }
        else if (name == "Afid01-M1Launcher")
        {
            this.utility = "part";
            this.part = "mainguns";
        }

        //Ammunition
        if (name == "M1Missile")
        {
            this.utility = "ammunition";
        }


        //Construct Items into different Objects based on the type of item they are.
        if (this.utility == "part")
        {
            //Forms a Part type object.
            return {name: this.name, quantity: this.quantity, part: this.part, utility: this.utility};
        }
        else if (this.utility == "ammunition")
        {
            //Forms an Ammunition type object.
            return {name: this.name, quantity: this.quantity, utility: this.utility};
        }

    }