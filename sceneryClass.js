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
                                //shop
                                if (game.eKey)
                                {
                                    game.eKey = false;
                                    game.interInventory = true;
                                    game.interInv1 = game.shipsList[i].cargoBay;//game.shipsList[i].cargoBay;
                                    game.interInv2 = this.contents;
                                    game.interContext = "Shop";
                                    game.interInvCargoMAX1 = game.shipsList[i].cargoMAX;
                                    game.interBuyRate = 0.6; //what percentage shops will pay for your goods.
                                    game.interSellRate = 1.2; //what percentage shops will sell there goods at.
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
                                //shop
                                if (game.eKey)
                                {
                                    shipConverter(true);
                                    game.eKey = false;
                                    game.interInventory = true;
                                    game.interInv1 = game.shipConverterList;
                                    game.interInv2 = this.contents;
                                    game.interContext = "Shipyard";
                                    game.interInvCargoMAX1 = game.shipsList[i].cargoMAX;
                                    game.interBuyRate = 0.5; //what percentage shops will pay for your goods.
                                    game.interSellRate = 1; //what percentage shops will sell there goods at.
                                    game.interCoords = [this.X, this.Y];
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
            //keeps the cargohold's menu open while it is in use

        }
    };
}