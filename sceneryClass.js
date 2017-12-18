/**
 * Created by skyeguy on 11/23/17.
 */

function Scenery(X, Y, type, list, extra)
{
    this.X = X;
    this.Y = Y;
    this.type = type;
    this.radius = 1;
    this.spin = 0;
    this.rotation = Math.random() * 2*Math.PI;
    this.random = Math.random();
    this.extra = extra;
    this.flag = false;
    //planet variables
    this.pricing = {shop: [1, 1], shipyard: [1, 1], docking: 55};
    this.shopContents = [];
    this.shipyardContents = [];
    this.dockingContents = [];
    this.resetContentsTime = 0; //used in reseting shop contents after an elsewhere defined period of time.

    //cargohold variables
    this.contents = list;

    this.drawScene = function(z)
    {
        if (this.type == "cargohold")
        {
            if (z == 0)
            {
                //box shape with diamond in center
                //box
                if (this.random > 0.5)
                {
                    this.spin += 0.015;
                }
                else
                {
                    this.spin -= 0.015;
                }
                if (ifInScreenDraw(this.X, this.Y, 14.15))
                {
                    rectangle(true, this.X, this.Y, 20, 20, "grey", 2, "darkGrey", false, this.rotation + this.spin, 1);
                    rectangle(true, this.X, this.Y, 9, 9, "darkGrey", 2, "black", false, this.rotation + 2*this.spin, 1/4*Math.PI, 1);
                }
            }
        }
        else if (this.type == "planet")
        {
            if (z == 0)
            {
                if (this.extra == "Aztlan")
                {
                    //draw the planet twice so that it does not appear transparent
                    draw(divineKitB, 4, 3, 37, 35, this.X, this.Y, 37 * 12, 35 * 12, 0, false, 1, false, false);
                    draw(divineKitB, 4, 3, 37, 35, this.X, this.Y, 37 * 12, 35 * 12, 0, false, 1, false, false);
                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Kurm")
                {
                    //draw the planet
                    draw(divineKitB, 135, 119, 34, 33, this.X, this.Y, 34 * 8, 33 * 8, 0, false, 1, false, false);

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Dorshun")
                {
                    //draw the planet
                        draw(divineKitB, 117, 2, 51, 48, this.X, this.Y, 51 * 17, 48 * 17, 2, false, 1, false, false);

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
            }
        }
    };

    this.process = function()
    {
        if (this.type == "cargohold")
        {
            if (ifInScreenDraw(this.X, this.Y, 14.15))
            {
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    if (game.shipsList[i].player)
                    {
                        if (distance(this, game.shipsList[i]) <= 80)
                        {
                            if (game.eKey)
                            {
                                game.eKey = false;
                                game.interInventory = true;
                                game.interInv1 = game.shipsList[i].cargoBay;//game.shipsList[i].cargoBay;
                                game.interInv2 = this.contents;
                                game.interContext = "Transfer";
                                game.interInvCargoMAX1 = game.shipsList[i].cargoMAX;
                                game.interInvCargoMAX2 = this.extra;
                            }
                        }
                    }
                }
            }
            //keeps the cargohold's menu open while it is in use

        }
        else if (this.type == "planet")
        {
            if (ifInScreenDraw(this.X, this.Y, 14.15))
            {
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    if (game.shipsList[i].player)
                    {
                        if (this.extra == "Aztlan")
                        {
                            if (distance(this, game.shipsList[i]) <= 190)
                            {
                                this.flag = true;
                                //menu
                                if (game.eKey)
                                {
                                    game.eKey = false;
                                    game.planetMenu = true;
                                    game.planetMenuList = ["shop", "shipyard", "docking"];
                                    game.userShipLocator = i;
                                    game.currentPlanetLocator = game.sceneryList.indexOf(this);
                                    this.pricing = {shop: [0.6, 1.2], shipyard: [0.4, 1.1], docking: 55};

                                    //Resets the contents of the shop and shipyard every hour
                                    if (new Date().getTime() - this.resetContentsTime > 60 * (1000 * 60)) //the first number is a measurement of minutes
                                    {
                                        this.resetContentsTime = new Date().getTime();
                                        this.shopContents = [itemize("Freshwater", 999), itemize("Freshwater", 999), itemize("Petroleum", 999), itemize("Petroleum", 999), itemize("Petroleum", 999), itemize("Petroleum", 2), itemize("Oxygen Tank", 999), itemize("Oxygen Tank", 4), itemize("Power Core", 999), itemize("Power Core", 3), itemize("Repair Kit", 999), itemize("Repair Kit", 999), itemize("Repair Kit", 999), itemize("Repair Kit", 1), itemize("M1Missile", 999), itemize("M1Missile", 15), itemize("PlasmaticSeeker", 6), itemize("TrineumSeeker", 999)];
                                        this.shipyardContents = [itemize("Majestad", 1, false), itemize("Majestad", 1, false), itemize("Majestad", 1, false)];
                                    }
                                }
                            }
                            else
                            {
                                this.flag = false;
                            }
                        }
                        else if (this.extra == "Kurm")
                        {
                            if (distance(this, game.shipsList[i]) <= 100)
                            {
                                this.flag = true;
                                //menu
                                if (game.eKey)
                                {
                                    game.eKey = false;
                                    game.planetMenu = true;
                                    game.planetMenuList = ["shipyard"];
                                    game.userShipLocator = i;
                                    game.currentPlanetLocator = game.sceneryList.indexOf(this);
                                    this.pricing = {shop: [1, 1], shipyard: [0.5, 1], docking: 55};

                                    //Resets the contents of the shop and shipyard every hour
                                    if (new Date().getTime() - this.resetContentsTime > 60 * (1000 * 60)) //the first number is a measurement of minutes
                                    {
                                        this.resetContentsTime = new Date().getTime();
                                        this.shipyardContents = [itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Disk01", 1, false), itemize("Disk01", 1, false), itemize("Disk01", 1, false), itemize("Mantis09", 1, false)];
                                    }
                                }
                            }
                            else
                            {
                                this.flag = false;
                            }
                        }
                        else if (this.extra == "Dorshun")
                        {
                            if (distance(this, game.shipsList[i]) <= 380)
                            {
                                this.flag = true;
                            }
                            else
                            {
                                this.flag = false;
                            }
                        }
                    }
                }
            }
            else
            {
                this.flag = false;
            }
        }
    };
}