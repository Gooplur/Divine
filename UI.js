/**
 * Created by skyeguy on 4/13/17.
 */

function planetMenu(options) //options is a list of all the possible selections in the planet menu eg. ["shop", "shipYard", ...]
{
    game.state = "DivinePaused";
    game.scale = 1;

    game.x.save();
    game.x.translate(-1/2 * game.c.width, -1/2 * game.c.height);

    //Main Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(50), yyy(100), xxx(650), yyy(800));
    game.x.fill();
    game.x.stroke();

    //Title
    game.x.textAlign = "center";
    game.x.font = fonter(30, "Arial");
    game.x.fillStyle = "white";
    game.x.fillText(game.sceneryList[game.currentPlanetLocator].extra, xxx(453), yyy(70));

    //Description Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(706), yyy(100), xxx(250), yyy(800));
    game.x.fill();
    game.x.stroke();

    for (var i = 0; i < options.length; i++)
    {
        //draw selectable option button
        if (game.mouseX > xxx(160) && game.mouseX < xxx(160 + 430) && game.mouseY > yyy(120 + 80 * i) && game.mouseY < yyy(120 + 80 * i + 60))
        {
            game.x.beginPath();
            game.x.fillStyle = "#18181A";
            game.x.strokeStyle = "orange";
            game.x.lineWidth = 3;
            game.x.rect(xxx(160), yyy(120 + 80 * i), xxx(430), yyy(60));
            game.x.fill();
            game.x.stroke();

            //text for each button
            if (options[i] == "shop")
            {
                game.x.textAlign = "center";
                game.x.font = fonter(26, "Arial");
                game.x.fillStyle = "orange";
                game.x.fillText("Merchandise", xxx(160 + 215), yyy(165 + 80 * i));
            }
            else if (options[i] == "shipyard")
            {
                game.x.textAlign = "center";
                game.x.font = fonter(26, "Arial");
                game.x.fillStyle = "orange";
                game.x.fillText("Shipyard", xxx(160 + 215), yyy(165 + 80 * i));
            }
            else if (options[i] == "docking")
            {
                game.x.textAlign = "center";
                game.x.font = fonter(26, "Arial");
                game.x.fillStyle = "orange";
                game.x.fillText("Docking", xxx(160 + 215), yyy(165 + 80 * i));
            }

            if (game.unclick)
            {
                if (options[i] == "shop")
                {
                    game.interInventory = true;
                    game.interInv1 = game.shipsList[game.userShipLocator].cargoBay;//game.shipsList[i].cargoBay;
                    game.interInv2 = game.sceneryList[game.currentPlanetLocator].shopContents;
                    game.interContext = "Shop";
                    game.interInvCargoMAX1 = game.shipsList[game.userShipLocator].cargoMAX;
                    game.interBuyRate = game.sceneryList[game.currentPlanetLocator].pricing.shop[0]; //what percentage shops will pay for your goods.
                    game.interSellRate = game.sceneryList[game.currentPlanetLocator].pricing.shop[1]; //what percentage shops will sell there goods at.
                }
                else if (options[i] == "shipyard")
                {
                    game.interInventory = true;
                    game.interInv2 = game.sceneryList[game.currentPlanetLocator].shipyardContents;
                    game.interContext = "Shipyard";
                    game.interInvCargoMAX1 = game.shipsList[game.userShipLocator].cargoMAX;
                    game.interBuyRate = game.sceneryList[game.currentPlanetLocator].pricing.shipyard[0]; //what percentage shops will pay for your goods.
                    game.interSellRate = game.sceneryList[game.currentPlanetLocator].pricing.shipyard[1]; //what percentage shops will sell there goods at.
                    game.interCoords = [game.sceneryList[game.currentPlanetLocator].X, game.sceneryList[game.currentPlanetLocator].Y];
                    shipConverter(true);
                    game.interInv1 = game.shipConverterList;
                }
                else if (options[i] == "docking")
                {
                    game.interInventory = true;
                    game.interInv2 = game.sceneryList[game.currentPlanetLocator].dockingContents;
                    game.interContext = "Docking";
                    game.interInvCargoMAX1 = game.shipsList[game.userShipLocator].cargoMAX;
                    game.interDockingFee = game.sceneryList[game.currentPlanetLocator].pricing.docking;
                    game.interCoords = [game.sceneryList[game.currentPlanetLocator].X, game.sceneryList[game.currentPlanetLocator].Y];
                    shipConverter(true);
                    game.interInv1 = game.shipConverterList;
                }
            }
        }
        else
        {
            game.x.beginPath();
            game.x.fillStyle = "#18181A";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 3;
            game.x.rect(xxx(160), yyy(120 + 80 * i), xxx(430), yyy(60));
            game.x.fill();
            game.x.stroke();

            //text for each button
            if (options[i] == "shop")
            {
                game.x.textAlign = "center";
                game.x.font = fonter(24, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText("Merchandise", xxx(160 + 215), yyy(164 + 80 * i));
            }
            else if (options[i] == "shipyard")
            {
                game.x.textAlign = "center";
                game.x.font = fonter(24, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText("Shipyard", xxx(160 + 215), yyy(164 + 80 * i));
            }
            else if (options[i] == "docking")
            {
                game.x.textAlign = "center";
                game.x.font = fonter(24, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText("Docking", xxx(160 + 215), yyy(164 + 80 * i));
            }
        }
    }

    game.x.restore();

    if (game.unclick)
    {
        game.unclick = false;
    }

    if (game.eKey)
    {
        game.eKey = false;
        game.state = "Divine";
        game.merch = "none";
        game.planetMenu = false;
    }
}

function interlistItemTransferMenu(list1, list2, context) //context is what the interlist is used for.
{
    game.state = "DivinePaused";
    game.scale = 1;

    game.x.save();
    game.x.translate(-1/2 * game.c.width, -1/2 * game.c.height);

    //Main Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(50), yyy(100), xxx(650), yyy(800));
    game.x.fill();
    game.x.stroke();

    //Box Title
    if (context == "Upgrade")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        //Upgrades title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Upgrades", xxx(325 + 82.5), yyy(70));
    }
    else if (context == "Transfer")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        //Upgrades title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(325 + 82.5), yyy(70));
    }
    else if (context == "Ammunition")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        //Ammo title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Ammunition", xxx(325 + 82.5), yyy(70));
    }
    else if (context == "Shop")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Checks: " + Math.floor(game.checks), xxx(82.5), yyy(90));
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Merchandise", xxx(325 + 82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Buy ~ " + (Math.floor(100 * game.demand * game.interSellRate)) + "%  Sell ~ " + (Math.floor(100 * game.demand * game.interBuyRate)) + "%", xxx(325 + 82.5), yyy(90));
    }
    else if (context == "Inventory")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
    }
    else if (context == "Docking")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Fleet", xxx(82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Checks: " + Math.floor(game.checks), xxx(82.5), yyy(90));
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Shipyard", xxx(325 + 82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Docking Fee: " + game.interDockingFee, xxx(325 + 82.5), yyy(90));
    }
    else if (context == "Shipyard")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Fleet", xxx(82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Checks: " + Math.floor(game.checks), xxx(82.5), yyy(90));
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Shipyard", xxx(325 + 82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Buy ~ " + (Math.floor(100 * game.interSellRate)) + "%  Sell ~ " + (Math.floor(100 * game.interBuyRate)) + "%", xxx(325 + 82.5), yyy(90));
    }
    else if (context == "Repair")
    {
        var playerShipNum = -1;
        for (var i = 0; i < game.shipsList.length; i++)
        {
            if (game.shipsList[i].player)
            {
                playerShipNum = i;
                break;
            }
        }
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Maintenance", xxx(325 + 82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Power: " + Math.round(game.shipsList[playerShipNum].power) + " / " + Math.round(game.shipsList[playerShipNum].powerMAX) + "  Integrity: " + Math.round(game.shipsList[playerShipNum].integrity) +" / " + Math.round(game.shipsList[playerShipNum].integrityMAX) + "  Shields: " + Math.round(game.shipsList[playerShipNum].shields) +" / " + Math.round(game.shipsList[playerShipNum].getShields()), xxx(325 + 82.5), yyy(90));
    }

    //Dividing Line
    game.x.beginPath();
    game.x.moveTo(xxx(375), yyy(100));
    game.x.lineTo(xxx(375), yyy(900));
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 2;
    game.x.stroke();

    if (game.mouseX <= xxx(750) && game.mouseX >= xxx(50))
    {
        if (game.mouseX < xxx(375))
        {
            if (game.wKey)
            {
                game.wKey = false;
                if (game.interInvScroll1 > 0)
                {
                    game.interInvScroll1 -= 1;
                }
            }
            else if (game.sKey)
            {
                game.sKey = false;
                if (game.interInvScroll1 < list1.length - 1)
                {
                    game.interInvScroll1 += 1;
                }
            }
        }
        else if (game.mouseX > xxx(375))
        {
            if (game.wKey)
            {
                game.wKey = false;
                if (game.interInvScroll2 > 0)
                {
                    game.interInvScroll2 -= 1;
                }
            }
            else if (game.sKey)
            {
                game.sKey = false;
                if (game.interInvScroll2 < list2.length - 1)
                {
                    game.interInvScroll2 += 1;
                }
            }
        }
    }

    //Description Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(706), yyy(100), xxx(250), yyy(800));
    game.x.fill();
    game.x.stroke();

    //Description of Items
    var superList = [];

    for (var j = 0; j < 2; j++)
    {
        if (j == 0)
        {
            superList = list1;
        }
        else if (j == 1)
        {
            superList = list2;
        }

        for (var i = 0; i < superList.length; i++)
        {
            if (superList[i].selected == true)
            {
                //name
                game.x.textAlign = "center";
                game.x.font = fonter(14, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText(superList[i].name, xxx(706 + 125), yyy(136));

                //image
                if (superList[i].image != false)
                {
                    var img = window[superList[i].image[0]];
                    var imgXstart = superList[i].image[1];
                    var imgYstart = superList[i].image[2];
                    var imgXgrab = superList[i].image[3];
                    var imgYgrab = superList[i].image[4];
                    var imgProportion = superList[i].image[5];
                    game.x.drawImage(img, imgXstart, imgYstart, imgXgrab, imgYgrab, xxx(706 + 125) + -1/2 * imgXgrab * imgProportion, yyy(240) + -1/2 * imgYgrab * imgProportion,imgXgrab * imgProportion, imgYgrab * imgProportion);
                }

                //utility specific details
                if (superList[i].utility == "part" || superList[i].utility == "core")
                {
                    game.x.textAlign = "center";
                    game.x.font = fonter(13, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText(superList[i].part, xxx(706 + 125), yyy(350));
                    var doNext = true;

                    //Price
                    game.x.textAlign = "center";
                    game.x.font = fonter(10, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(410));

                    //Price
                    if (context == "Shop")
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.demand * game.interSellRate), xxx(706 + 125), yyy(450));
                        game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.demand * game.interBuyRate), xxx(706 + 125), yyy(490));
                    }
                    else
                    {
                        doNext = false;
                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(470));
                    }

                    if (doNext)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(550));
                    }

                    //Manufacturer
                    if (superList[i].utility != "core")
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(14, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].manufacturer, xxx(706 + 125), yyy(725));

                        //brand logo
                        if (superList[i].brand != false)
                        {
                            var img = window[superList[i].brand[0]];
                            var imgXstart = superList[i].brand[1];
                            var imgYstart = superList[i].brand[2];
                            var imgXgrab = superList[i].brand[3];
                            var imgYgrab = superList[i].brand[4];
                            var imgProportion = superList[i].brand[5];
                            game.x.drawImage(img, imgXstart, imgYstart, imgXgrab, imgYgrab, xxx(706 + 125) + -1/2 * imgXgrab * imgProportion, yyy(800) + -1/2 * imgYgrab * imgProportion,imgXgrab * imgProportion, imgYgrab * imgProportion);
                        }
                    }
                }
                else if (superList[i].utility == "ammunition")
                {
                    game.x.textAlign = "center";
                    game.x.font = fonter(13, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText(superList[i].subUtility, xxx(706 + 125), yyy(350));
                    var doNext = true;

                    //Price
                    game.x.textAlign = "center";
                    game.x.font = fonter(10, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(410));

                    //Price
                    if (context == "Shop")
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.demand * game.interSellRate), xxx(706 + 125), yyy(450));
                        game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.demand * game.interBuyRate), xxx(706 + 125), yyy(490));
                    }
                    else
                    {
                        doNext = false;
                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(470));
                    }

                    if (doNext)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(550));
                    }
                }
                else if (superList[i].utility == "resource")
                {
                    var xPos = 0;
                    var yPos = 0;
                    var thisto = 0;
                    for (var k = 0; k < superList[i].description.length; k++)
                    {
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].description[k], xxx(706 + 8 + xPos), yyy(350 + yPos));
                        thisto = superList[i].description[k];

                        if (thisto == " " || thisto == "f" || thisto == "r")
                        {
                            xPos += 4;
                        }
                        else if (thisto == "t")
                        {
                            xPos += 3.5;
                        }
                        else if (thisto == "i")
                        {
                            xPos += 3;
                        }
                        else if (thisto == "j" || thisto == "l" || thisto == "'" || thisto == "," || thisto == ".")
                        {
                            xPos += 2.7;
                        }
                        else if (thisto == "s")
                        {
                            xPos += 5;
                        }
                        else if (thisto == "m" || thisto == "w" || thisto == "A")
                        {
                            xPos += 8;
                        }
                        else if (thisto == "o" || thisto == "a" || thisto == "t" || thisto == "n" || thisto == "e")
                        {
                            xPos += 5.5
                        }
                        else
                        {
                            xPos += 6;
                        }

                        if (xPos > 232)
                        {
                            if (superList[i].description[k] != "-" && superList[i].description[k] != " " && superList[i].description[k + 1] != " " && superList[i].description[k + 1] != "." && superList[i].description[k + 1] != "!" && superList[i].description[k + 1] != "?" && superList[i].description[k + 1] != ")" && superList[i].description[k + 1] != "," && superList[i].description[k + 1] != ";" && superList[i].description[k + 1] != "'" && superList[i].description[k + 1] != "-")
                            {
                                game.x.textAlign = "left";
                                game.x.font = fonter(10, "Arial");
                                game.x.fillStyle = "white";
                                game.x.fillText("-", xxx(706 + 8 + xPos), yyy(350 + yPos));
                            }
                            xPos = 0;
                            yPos += 19;
                        }
                    }

                    var doNext = true;

                    //Price
                    game.x.textAlign = "center";
                    game.x.font = fonter(10, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(410 + yPos));

                    //Price
                    if (context == "Shop")
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.demand * game.interSellRate), xxx(706 + 125), yyy(450 + yPos));
                        game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.demand * game.interBuyRate), xxx(706 + 125), yyy(490 + yPos));
                    }
                    else
                    {
                        doNext = false;
                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(470 + yPos));
                    }

                    if (doNext)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(550 + yPos));
                    }


                }
                else if (superList[i].utility == "maintenance")
                {
                    if (superList[i].charge > 0 && superList[i].repair > 0)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Applying this to your ship in the maintenance menu", xxx(706 + 125), yyy(350));
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("both restores the ship's power and its physical integrity.", xxx(706 + 4), yyy(369));

                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Charge: " + superList[i].charge, xxx(706 + 125), yyy(429));
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Repair: " + superList[i].repair, xxx(706 + 125), yyy(469));

                        var doNext = true;

                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(529));

                        if (context == "Shop")
                        {
                            game.x.textAlign = "center";
                            game.x.font = fonter(10, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.demand * game.interSellRate), xxx(706 + 125), yyy(569));
                            game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.demand * game.interBuyRate), xxx(706 + 125), yyy(609));
                        }
                        else
                        {
                            //Amount
                            doNext = false;
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(669));
                        }

                        if (doNext)
                        {
                            //Amount
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(589));
                        }
                    }
                    else if (superList[i].repair > 0)
                    {
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Applying this to your ship in the maintenance menu", xxx(706 + 8), yyy(350));
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("recovers the ship's physical integrity.", xxx(706 + 8), yyy(369));
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Repair: " + superList[i].repair, xxx(706 + 125), yyy(429));

                        var doNext = true;

                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(489));

                        if (context == "Shop")
                        {
                            game.x.textAlign = "center";
                            game.x.font = fonter(10, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.demand * game.interSellRate), xxx(706 + 125), yyy(529));
                            game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.demand * game.interBuyRate), xxx(706 + 125), yyy(569));
                        }
                        else
                        {
                            //Amount
                            doNext = false;
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(549));
                        }

                        if (doNext)
                        {
                            //Amount
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(629));
                        }
                    }
                    else if (superList[i].charge > 0)
                    {
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Applying this to your ship in the maintenance menu", xxx(706 + 8), yyy(350));
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("recharges the ship's power.", xxx(706 + 8), yyy(369));
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Charge: " + superList[i].charge, xxx(706 + 125), yyy(429));

                        var doNext = true;

                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(489));

                        if (context == "Shop")
                        {
                            game.x.textAlign = "center";
                            game.x.font = fonter(10, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.demand * game.interSellRate), xxx(706 + 125), yyy(529));
                            game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.demand * game.interBuyRate), xxx(706 + 125), yyy(569));
                        }
                        else
                        {
                            //Amount
                            doNext = false;
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(549));
                        }

                        if (doNext)
                        {
                            //Amount
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(629));
                        }
                    }
                    else if (superList[i].boost > 0)
                    {
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Applying this to your ship in the maintenance menu", xxx(706 + 8), yyy(350));
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("restores lost shielding.", xxx(706 + 8), yyy(369));
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Boost: " + superList[i].boost, xxx(706 + 125), yyy(429));

                        var doNext = true;

                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(489));

                        if (context == "Shop")
                        {
                            game.x.textAlign = "center";
                            game.x.font = fonter(10, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.demand * game.interSellRate), xxx(706 + 125), yyy(529));
                            game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.demand * game.interBuyRate), xxx(706 + 125), yyy(569));
                        }
                        else
                        {
                            //Amount
                            doNext = false;
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(549));
                        }

                        if (doNext)
                        {
                            //Amount
                            game.x.textAlign = "center";
                            game.x.font = fonter(12, "Arial");
                            game.x.fillStyle = "white";
                            game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(629));
                        }
                    }
                }
                else if (superList[i].utility == "ship")
                {
                    game.x.textAlign = "center";
                    game.x.font = fonter(13, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText(superList[i].type, xxx(706 + 125), yyy(350));
                    var doNext = true;

                    //Price
                    game.x.textAlign = "center";
                    game.x.font = fonter(10, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText("Base Value: " + superList[i].price, xxx(706 + 125), yyy(410));

                    //Price
                    if (context == "Shipyard")
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("Buy Price: " + Math.ceil(superList[i].price * game.interSellRate), xxx(706 + 125), yyy(450));
                        game.x.fillText("Sell Price: " + Math.floor(superList[i].price * game.interBuyRate), xxx(706 + 125), yyy(490));
                    }
                    else
                    {
                        doNext = false;
                        //Price
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(470));
                    }

                    if (doNext)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(12, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText(superList[i].quantity + " / " + superList[i].maxStack, xxx(706 + 125), yyy(550));
                    }

                    //Manufacturer
                    game.x.textAlign = "center";
                    game.x.font = fonter(14, "Arial");
                    game.x.fillStyle = "white";
                    game.x.fillText(superList[i].manufacturer, xxx(706 + 125), yyy(725));

                    //brand logo
                    if (superList[i].brand != false)
                    {
                        var img = window[superList[i].brand[0]];
                        var imgXstart = superList[i].brand[1];
                        var imgYstart = superList[i].brand[2];
                        var imgXgrab = superList[i].brand[3];
                        var imgYgrab = superList[i].brand[4];
                        var imgProportion = superList[i].brand[5];
                        game.x.drawImage(img, imgXstart, imgYstart, imgXgrab, imgYgrab, xxx(706 + 125) + -1/2 * imgXgrab * imgProportion, yyy(800) + -1/2 * imgYgrab * imgProportion,imgXgrab * imgProportion, imgYgrab * imgProportion);
                    }
                }
            }
        }
    }

    //Draggable Item Boxes LIST1
    for (var i = game.interInvScroll1; i < list1.length; i++)
    {
        //Item Main Box
        if (list1[i].dragged == false)
        {
            game.x.beginPath();
            game.x.fillStyle = "#18181A";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51), yyy(100 + 32 * (i - game.interInvScroll1)), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();

            //Item Name
            game.x.textAlign = "left";
            game.x.font = fonter(10, "Arial");
            if (list1[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText(list1[i].name, xxx(56), yyy(100 + 21 + 32 * (i - game.interInvScroll1)));

            //Item Quantity
            game.x.textAlign = "right";
            game.x.font = fonter(10, "Arial");
            if (list1[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText("x " + list1[i].quantity, xxx(370), yyy(100 + 21 + 32 * (i - game.interInvScroll1)));
        }
        else //if the item is being dragged original slot looks void.
        {
            game.x.beginPath();
            game.x.fillStyle = "lightGrey";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51), yyy(100 + 32 * (i - game.interInvScroll1)), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();
        }

        if (game.mouseX > xxx(51) && game.mouseX < xxx(51 + 319) && game.mouseY > yyy(100) + yyy(32) * (i - game.interInvScroll1) && game.mouseY < yyy(100 + 32) + yyy(32) * (i - game.interInvScroll1))
        {
            if (game.merch.econo == true)
            {
                var ammount = 0;
                var variationn = 0;
                var focusItm = "none";
                var itmFocus = "none";
                var desireFocus = 1;
                for (var g = 0; g < list1.length; g++)
                {
                    if (list1[g].dragged)
                    {
                        focusItm = list1[g];
                    }
                    else if (list1[g].selected)
                    {
                        itmFocus = list1[g];
                    }
                }
                for (var g = 0; g < game.merch.shopContents.length; g++)
                {
                    if (game.merch.shopContents[g].dragged)
                    {
                        focusItm = game.merch.shopContents[g];
                    }
                    else if (game.merch.shopContents[g].selected)
                    {
                        itmFocus = game.merch.shopContents[g];
                    }
                }

                if (focusItm == "none")
                {
                    if (itmFocus == "none")
                    {
                        for (var g = 0; g < game.merch.shopContents.length; g++)
                        {
                            if (list1[i].name == game.merch.shopContents[g].name)
                            {
                                ammount += game.merch.shopContents[g].quantity;
                            }
                        }

                        for (var g = 0; g < game.merch.desiredStock.length; g++)
                        {
                            if (list1[i].name == game.merch.desiredStock[g][0])
                            {
                                variationn = game.merch.desiredStock[g][1] - ammount;
                                desireFocus = game.merch.desiredStock[g][1] / ammount;
                                break;
                            }
                        }
                    }
                    else
                    {
                        for (var g = 0; g < game.merch.shopContents.length; g++)
                        {
                            if (itmFocus.name == game.merch.shopContents[g].name)
                            {
                                ammount += game.merch.shopContents[g].quantity;
                            }
                        }

                        for (var g = 0; g < game.merch.desiredStock.length; g++)
                        {
                            if (itmFocus.name == game.merch.desiredStock[g][0])
                            {
                                variationn = game.merch.desiredStock[g][1] - ammount;
                                desireFocus = game.merch.desiredStock[g][1] / ammount;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    for (var g = 0; g < game.merch.shopContents.length; g++)
                    {
                        if (focusItm.name == game.merch.shopContents[g].name)
                        {
                            ammount += game.merch.shopContents[g].quantity;
                        }
                    }

                    for (var g = 0; g < game.merch.desiredStock.length; g++)
                    {
                        if (focusItm.name == game.merch.desiredStock[g][0])
                        {
                            variationn = game.merch.desiredStock[g][1] - ammount;
                            desireFocus = game.merch.desiredStock[g][1] / ammount;
                            break;
                        }
                    }
                }

                game.demand = Math.min(1 + ((8/9 * desireFocus / 16) + (1/9 * variationn / 29)), 1.92);
            }
        }

        //Item Selecting
        if (game.shiftKey != true && game.unclick && game.mouseX > xxx(51) && game.mouseX < xxx(51 + 319) && game.mouseY > yyy(100) + yyy(32) * (i - game.interInvScroll1) && game.mouseY < yyy(100 + 32) + yyy(32) * (i - game.interInvScroll1))
        {
            game.unclick = false;
            if (list1[i].selected == false)
            {
                for (var j = 0; j < list1.length; j++)
                {
                    if (list1[j].selected == true)
                    {
                        list1[j].selected = false;
                    }
                }
                for (var j = 0; j < list2.length; j++)
                {
                    if (list2[j].selected == true)
                    {
                        list2[j].selected = false;
                    }
                }
                list1[i].selected = true;
            }
            else
            {
                list1[i].selected = false;
            }
        }

        //Item Click-to-Drag
        if (game.shiftKey == true && game.mouseX > xxx(51) && game.mouseX < xxx(51 + 319) && game.mouseY > yyy(100) + yyy(32) * (i - game.interInvScroll1) && game.mouseY < yyy(100 + 32) + yyy(32) * (i - game.interInvScroll1))
        {
            var isOneAlreadyDragged = false;
            for (j = 0; j < list1.length; j++)
            {
                if (list1[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }
            for (j = 0; j < list2.length; j++)
            {
                if (list2[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }

            if (!isOneAlreadyDragged)
            {
                list1[i].dragged = true;
                game.draggedItem = list1[i];
            }
        }
    }
    //Draggable Item Boxes LIST2
    for (var i = game.interInvScroll2; i < list2.length; i++)
    {
        //Item Main Box
        if (list2[i].dragged == false)
        {
            game.x.beginPath();
            game.x.fillStyle = "#18181A";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51 + 324), yyy(100 + 32 * (i - game.interInvScroll2)), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();

            //Item Name
            game.x.textAlign = "left";
            game.x.font = fonter(10, "Arial");
            if (list2[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText(list2[i].name, xxx(56 + 324), yyy(100 + 21 + 32 * (i - game.interInvScroll2)));

            //Item Quantity
            game.x.textAlign = "right";
            game.x.font = fonter(10, "Arial");
            if (list2[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText("x " + list2[i].quantity, xxx(370 + 324), yyy(100 + 21 + 32 * (i - game.interInvScroll2)));
        }
        else //if the item is being dragged original slot looks void.
        {
            game.x.beginPath();
            game.x.fillStyle = "lightGrey";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51 + 324), yyy(100 + 32 * (i - game.interInvScroll2)), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();
        }

        if (game.mouseX > xxx(51 + 324) && game.mouseX < xxx(51 + 319 + 324) && game.mouseY > yyy(100) + yyy(32) * (i - game.interInvScroll2) && game.mouseY < yyy(100 + 32) + yyy(32) * (i - game.interInvScroll2))
        {
            if (game.merch.econo == true)
            {
                var ammount = 0;
                var variationn = 0;
                var focusItm = "none";
                var itmFocus = "none";
                var desireFocus = 1;
                for (var g = 0; g < list1.length; g++)
                {
                    if (list1[g].dragged)
                    {
                        focusItm = list1[g];
                    }
                    else if (list1[g].selected)
                    {
                        itmFocus = list1[g];
                    }
                }
                for (var g = 0; g < game.merch.shopContents.length; g++)
                {
                    if (game.merch.shopContents[g].dragged)
                    {
                        focusItm = game.merch.shopContents[g];
                    }
                    else if (game.merch.shopContents[g].selected)
                    {
                        itmFocus = game.merch.shopContents[g];
                    }
                }

                if (focusItm == "none")
                {
                    if (itmFocus == "none")
                    {
                        for (var g = 0; g < game.merch.shopContents.length; g++)
                        {
                            if (list2[i].name == game.merch.shopContents[g].name)
                            {
                                ammount += game.merch.shopContents[g].quantity;
                            }
                        }

                        for (var g = 0; g < game.merch.desiredStock.length; g++)
                        {
                            if (list2[i].name == game.merch.desiredStock[g][0])
                            {
                                variationn = game.merch.desiredStock[g][1] - ammount;
                                desireFocus = game.merch.desiredStock[g][1] / ammount;
                                break;
                            }
                        }
                    }
                    else
                    {
                        for (var g = 0; g < game.merch.shopContents.length; g++)
                        {
                            if (itmFocus.name == game.merch.shopContents[g].name)
                            {
                                ammount += game.merch.shopContents[g].quantity;
                            }
                        }

                        for (var g = 0; g < game.merch.desiredStock.length; g++)
                        {
                            if (itmFocus.name == game.merch.desiredStock[g][0])
                            {
                                variationn = game.merch.desiredStock[g][1] - ammount;
                                desireFocus = game.merch.desiredStock[g][1] / ammount;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    for (var g = 0; g < game.merch.shopContents.length; g++)
                    {
                        if (focusItm.name == game.merch.shopContents[g].name)
                        {
                            ammount += game.merch.shopContents[g].quantity;
                        }
                    }

                    for (var g = 0; g < game.merch.desiredStock.length; g++)
                    {
                        if (focusItm.name == game.merch.desiredStock[g][0])
                        {
                            variationn = game.merch.desiredStock[g][1] - ammount;
                            desireFocus = game.merch.desiredStock[g][1] / ammount;
                            break;
                        }
                    }
                }

                game.demand = Math.min(1 + ((8/9 * desireFocus / 16) + (1/9 * variationn / 29)), 1.92);
            }
        }

        //Item Selecting
        if (game.shiftKey != true && game.unclick && game.mouseX > xxx(51 + 324) && game.mouseX < xxx(51 + 319 + 324) && game.mouseY > yyy(100) + yyy(32) * (i - game.interInvScroll2) && game.mouseY < yyy(100 + 32) + yyy(32) * (i - game.interInvScroll2))
        {
            game.unclick = false;
            if (list2[i].selected == false)
            {
                for (var j = 0; j < list2.length; j++)
                {
                    if (list2[j].selected == true)
                    {
                        list2[j].selected = false;
                    }
                }
                for (var j = 0; j < list1.length; j++)
                {
                    if (list1[j].selected == true)
                    {
                        list1[j].selected = false;
                    }
                }
                list2[i].selected = true;
            }
            else
            {
                list2[i].selected = false;
            }
        }

        //Item Click-to-Drag
        if (game.shiftKey == true && game.mouseX > xxx(51 + 324) && game.mouseX < xxx(51 + 319 + 324) && game.mouseY > yyy(100) + yyy(32) * (i - game.interInvScroll2) && game.mouseY < yyy(100 + 32) + yyy(32) * (i - game.interInvScroll2))
        {
            var isOneAlreadyDragged = false;
            for (j = 0; j < list2.length; j++)
            {
                if (list2[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }
            for (j = 0; j < list1.length; j++)
            {
                if (list1[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }

            if (!isOneAlreadyDragged)
            {
                list2[i].dragged = true;
                game.draggedItem = list2[i];
            }
        }
    }

    game.unclick = false;

    //The process of Drag and Drop
    if (game.draggedItem != false)
    {
        //THE DRAGGED ITEM GOES TO THE MOUSE AND FOLLOWS IT
        game.x.beginPath();
        game.x.fillStyle = "#18181A";
        game.x.strokeStyle = "lightGrey";
        game.x.lineWidth = 1;
        game.x.rect(game.mouseX - 1/2 * xxx(324), game.mouseY -1/2 * xxx(30), xxx(324), yyy(30));
        game.x.fill();
        game.x.stroke();

        //Item Name
        game.x.textAlign = "left";
        game.x.font = fonter(10, "Arial");
        if (game.draggedItem.selected == false)
        {
            game.x.fillStyle = "white";
        }
        else
        {
            game.x.fillStyle = "orange";
        }
        game.x.fillText(game.draggedItem.name, game.mouseX - 1/2 * xxx(324) + xxx(5), game.mouseY - yyy(6)); //13.5

        //Item Quantity
        game.x.textAlign = "right";
        game.x.font = fonter(10, "Arial");
        if (game.draggedItem.selected == false)
        {
            game.x.fillStyle = "white";
        }
        else
        {
            game.x.fillStyle = "orange";
        }
        game.x.fillText("x " + game.draggedItem.quantity, game.mouseX - 1/2 * xxx(324) + xxx(319), game.mouseY - yyy(6)); //13.5

        //ONCE THE SHIFT KEY IS RELEASED THE ITEM IS DROPPED
        if (game.shiftKey == false)
        {
            if (game.mouseX > xxx(50) && game.mouseX < xxx(50 + 324) && game.mouseY > yyy(100) && game.mouseY < yyy(900))
            {
                var allowed = true;
                //var listNum = Math.round((game.mouseY - yyy(100)) / yyy(32));
                var listNum = Math.round((game.mouseY - yyy(100)) / yyy(32)) + game.interInvScroll1;
                var listHost = list1;

                //Find out which list the item is from
                for (j = 0; j < list2.length; j++)
                {
                    if (list2[j] === game.draggedItem)
                    {
                        listHost = list2;
                    }
                }

                //The item when placed in an empty part of the list ahead of the rest will go to the end of the list.
                if (listNum > list1.length)
                {
                    listNum = list1.length;
                }

                //Specific Restrictions
                if (listHost == list2 && list1.length >= game.interInvCargoMAX1 && context != "Shipyard" && context != "Docking")
                {
                    allowed = false;
                }
                else if (listHost == list1 && context == "Shop" || listHost == list1 && context == "Shipyard" || game.draggedItem.price > game.checks && context == "Shop" || game.draggedItem.price > game.checks && context == "Shipyard")
                {
                    allowed = false;
                }
                else if (listHost == list2 && context == "Repair")
                {
                    allowed = false;
                }
                else if (game.draggedItem.utility == "core" && context == "Upgrade")
                {
                    allowed = false;
                }
                else if (listHost == list2 && context == "Docking" && game.checks < game.interDockingFee)
                {
                    allowed = false;
                }

                //Middleman Restrictions
                if (context == "Shop" && allowed || context == "Shipyard" && allowed)
                {
                    allowed = false;
                    if (game.draggedItem.selected && (game.draggedItem.price * game.demand * game.draggedItem.quantity) <= game.checks)
                    {
                        game.checks -= game.interSellRate * game.demand * game.draggedItem.price * game.draggedItem.quantity;
                        listHost.splice(listHost.indexOf(game.draggedItem), 1);
                        if (listNum >= list1.length)
                        {
                            list1.splice(listNum, 0, game.draggedItem);
                        }
                        else if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + game.draggedItem.quantity <= list1[listNum].maxStack)
                        {
                            list1[listNum].quantity += game.draggedItem.quantity;
                        }
                        else
                        {
                            list1.splice(listNum, 0, game.draggedItem);
                        }
                    }
                    else
                    {
                        game.checks -= game.interSellRate * game.demand * game.draggedItem.price;
                        if (game.draggedItem.quantity > 1)
                        {
                            game.draggedItem.quantity -= 1;
                            if (listNum >= list1.length)
                            {
                                list1.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                            }
                            else if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + 1 <= list1[listNum].maxStack)
                            {
                                list1[listNum].quantity += 1;
                            }
                            else
                            {
                                list1.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                            }
                        }
                        else
                        {
                            listHost.splice(listHost.indexOf(game.draggedItem), 1);
                            if (listNum >= list1.length)
                            {
                                list1.splice(listNum, 0, game.draggedItem);
                            }
                            else if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + game.draggedItem.quantity <= list1[listNum].maxStack)
                            {
                                list1[listNum].quantity += game.draggedItem.quantity;
                            }
                            else
                            {
                                list1.splice(listNum, 0, game.draggedItem);
                            }
                        }
                    }
                }
                else if (context == "Docking" && listHost == list2 && allowed)
                {
                    game.checks -= game.interDockingFee;
                    if (game.draggedItem.quantity > 1)
                    {
                        game.draggedItem.quantity -= 1;
                        allowed = false;
                        if (listNum >= list1.length)
                        {
                            list1.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                        }
                        else if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + 1 <= list1[listNum].maxStack)
                        {
                            list1[listNum].quantity += 1;
                        }
                        else
                        {
                            list1.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                        }
                    }
                }

                if (allowed)
                {
                    var doMinus = false;

                    if (listNum >= list1.length)
                    {
                        list1.push(game.draggedItem);
                        listHost.splice(listHost.indexOf(game.draggedItem), 1);
                    }
                    else if (list1[listNum].dragged == false)
                    {

                        if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + game.draggedItem.quantity <= list1[listNum].maxStack)
                        {
                            list1[listNum].quantity += game.draggedItem.quantity;
                        }
                        else if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + game.draggedItem.quantity > list1[listNum].maxStack)
                        {
                            doMinus = true;
                        }
                        else
                        {
                            list1.splice(listNum, 0, game.draggedItem);
                        }

                        if (doMinus)
                        {
                            var cauntidadDeRestar = (list1[listNum].maxStack - list1[listNum].quantity);
                            game.draggedItem.quantity -= cauntidadDeRestar;
                            list1[listNum].quantity = list1[listNum].maxStack;
                        }
                        else
                        {
                            listHost.splice(listHost.indexOf(game.draggedItem), 1);
                        }
                    }
                }

                game.draggedItem.dragged = false;
                game.draggedItem = false;
            }
            else if (game.mouseX > xxx(50 + 324) && game.mouseX < xxx(50 + 324 + 324) && game.mouseY > yyy(100) && game.mouseY < yyy(900))
            {
                var allowed = true;
                //var listNum = Math.round((game.mouseY - yyy(100)) / yyy(32));
                var listNum = Math.round((game.mouseY - yyy(100)) / yyy(32)) + game.interInvScroll2;
                var listHost = list2;

                //Find out which list the item is from
                for (j = 0; j < list1.length; j++)
                {
                    if (list1[j] === game.draggedItem)
                    {
                        listHost = list1;
                    }
                }

                //The item when placed in an empty part of the list ahead of the rest will go to the end of the list.
                if (listNum > list2.length)
                {
                    listNum = list2.length;
                }

                //Specific Restrictions
                if (listHost == list1 && game.draggedItem.utility != "part" && context == "Upgrade")
                {
                    allowed = false;
                }
                else if (listHost == list1 && game.draggedItem.utility != "ammunition" && context == "Ammunition")
                {
                    allowed = false;
                }
                else if (listHost == list1 && context == "Upgrade")
                {
                    for (var i = 0; i < list2.length; i++)
                    {
                        if (list2[i].part == game.draggedItem.part)
                        {
                            allowed = false;
                        }
                    }
                }
                else if (listHost == list1 && context == "Ammunition")
                {
                    for (var i = 0; i < list2.length; i++)
                    {
                        if (list2[i].subUtility == game.draggedItem.subUtility && list2[i].name != game.draggedItem.name)
                        {
                            allowed = false;
                        }
                    }
                }
                else if (listHost == list1 && context == "Transfer" && list2.length >= game.interInvCargoMAX2)
                {
                    allowed = false;
                }
                else if (context == "Inventory")
                {
                    allowed = false;
                }
                else if (listHost == list2 && context == "Shop" || listHost == list2 && context == "Shipyard")
                {
                    allowed = false;
                }
                else if (context == "Repair" && game.draggedItem.utility != "maintenance")
                {
                    allowed = false;
                }
                else if (game.draggedItem.utility == "core" && context == "Upgrade")
                {
                    allowed = false;
                }

                //Middleman Restrictions
                if (context == "Shop" && allowed || context == "Shipyard" && allowed) //selling items
                {
                    allowed = false;
                    if (game.draggedItem.selected)
                    {
                        game.checks += game.interBuyRate * game.demand * game.draggedItem.price * game.draggedItem.quantity;

                        listHost.splice(listHost.indexOf(game.draggedItem), 1);
                        if (listNum >= list2.length)
                        {
                            list2.splice(listNum, 0, game.draggedItem);
                        }
                        else if (list2[listNum].name == game.draggedItem.name && list2[listNum].quantity + game.draggedItem.quantity <= list2[listNum].maxStack)
                        {
                            list2[listNum].quantity += game.draggedItem.quantity;
                        }
                        else
                        {
                            list2.splice(listNum, 0, game.draggedItem);
                        }
                    }
                    else
                    {
                        game.checks += game.interBuyRate * game.demand * game.draggedItem.price;
                        if (game.draggedItem.quantity > 1)
                        {
                            game.draggedItem.quantity -= 1;
                            if (listNum >= list2.length)
                            {
                                list2.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                            }
                            else if (list2[listNum].name == game.draggedItem.name && list2[listNum].quantity + 1 <= list2[listNum].maxStack)
                            {
                                list2[listNum].quantity += 1;
                            }
                            else
                            {
                                list2.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                            }
                        }
                        else
                        {
                            listHost.splice(listHost.indexOf(game.draggedItem), 1);
                            if (listNum >= list2.length)
                            {
                                list2.splice(listNum, 0, game.draggedItem);
                            }
                            else if (list2[listNum].name == game.draggedItem.name && list2[listNum].quantity + game.draggedItem.quantity <= list2[listNum].maxStack)
                            {
                                list2[listNum].quantity += game.draggedItem.quantity;
                            }
                            else
                            {
                                list2.splice(listNum, 0, game.draggedItem);
                            }
                        }
                    }
                }
                else if (context == "Repair" && allowed)
                {
                    var playerShipNum = -1;
                    for (var i = 0; i < game.shipsList.length; i++)
                    {
                        if (game.shipsList[i].player)
                        {
                            playerShipNum = i;
                            break;
                        }
                    }
                    if (playerShipNum > -1)
                    {
                        if (game.shipsList[playerShipNum].solar == false) //solar charged ships cannot have power recharged the normal way.
                        {
                            game.shipsList[playerShipNum].power = Math.max(0, Math.min(game.shipsList[playerShipNum].powerMAX, game.shipsList[playerShipNum].power + game.draggedItem.charge));
                        }
                        game.shipsList[playerShipNum].integrity = Math.max(0, Math.min(game.shipsList[playerShipNum].integrityMAX, game.shipsList[playerShipNum].integrity + game.draggedItem.repair));
                        game.shipsList[playerShipNum].shields = Math.max(0, Math.min(game.shipsList[playerShipNum].getShields(), game.shipsList[playerShipNum].shields + game.draggedItem.boost));

                        if (game.draggedItem.quantity > 1)
                        {
                            game.draggedItem.quantity -= 1;
                            allowed = false;
                        }
                        else
                        {
                            listHost.splice(listHost.indexOf(game.draggedItem), 1);
                            allowed = false;
                        }
                    }
                }

                if (allowed)
                {
                    var doMinus = false;
                    if (listNum >= list2.length)
                    {
                        list2.push(game.draggedItem);
                        listHost.splice(listHost.indexOf(game.draggedItem), 1);
                    }
                    else if (list2[listNum].dragged == false)
                    {
                        if (list2[listNum].name == game.draggedItem.name && list2[listNum].quantity + game.draggedItem.quantity <= list2[listNum].maxStack)
                        {
                            list2[listNum].quantity += game.draggedItem.quantity;
                        }
                        else if (list2[listNum].name == game.draggedItem.name && list2[listNum].quantity + game.draggedItem.quantity > list2[listNum].maxStack)
                        {
                            doMinus = true;
                        }
                        else
                        {
                            list2.splice(listNum, 0, game.draggedItem);
                        }

                        if (doMinus)
                        {
                            game.draggedItem.quantity -= (list2[listNum].maxStack - list2[listNum].quantity);
                            list2[listNum].quantity = list2[listNum].maxStack;
                        }
                        else
                        {
                            listHost.splice(listHost.indexOf(game.draggedItem), 1);
                        }
                    }
                }

                game.draggedItem.dragged = false;
                game.draggedItem = false;
            }
            else
            {
                game.draggedItem.dragged = false;
                game.draggedItem = false;
            }
        }
    }
    game.x.restore();

    if (game.eKey)
    {
        game.eKey = false;
        game.state = "Divine";
        game.interInventory = false;
        game.planetMenu = false;
        game.interInvScroll1 = 0;
        game.interInvScroll2 = 0;
        game.merch = "none";
        if (context == "Shipyard" || context == "Docking")
        {
            shipConverter(false);
        }
    }
}

function aiList()
{
    game.state = "DivinePaused";
    game.scale = 1;

    if (game.setAiSelect == true)
    {
        game.setAiSelect = false;

        for (var i = 0; i < game.aiList.length; i++)
        {
            if (game.aiList[i].ai == game.aiSelect)
            {
                game.aiList[i].selected = true;
                break;
            }
        }
    }

    game.x.save();
    game.x.translate(-1/2 * game.c.width, -1/2 * game.c.height);

    //Main Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(50), yyy(100), xxx(650), yyy(800));
    game.x.fill();
    game.x.stroke();

    //Title
    game.x.textAlign = "center";
    game.x.font = fonter(30, "Arial");
    game.x.fillStyle = "white";
    game.x.fillText("Autopilot AI Selector", xxx(453), yyy(70));

    //Description Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(706), yyy(100), xxx(250), yyy(800));
    game.x.fill();
    game.x.stroke();

    //scrollUp
    if (game.mouseX > xxx(51) && game.mouseX < xxx(699) && game.mouseY > yyy(100) && game.mouseY < yyy(160))
    {
        game.x.beginPath();
        game.x.fillStyle = "white";
        game.x.strokeStyle = "#18181A";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(100), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();

        if (game.unclick)
        {
            game.unclick = false;
            if (game.aiListScroll > 0)
            {
                game.aiListScroll -= 1;
            }
        }
    }
    else
    {
        game.x.beginPath();
        game.x.fillStyle = "#18181A";
        game.x.strokeStyle = "lightGrey";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(100), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();
    }

    //scrollDown
    if (game.mouseX > xxx(51) && game.mouseX < xxx(699) && game.mouseY > yyy(840) && game.mouseY < yyy(900))
    {
        game.x.beginPath();
        game.x.fillStyle = "white";
        game.x.strokeStyle = "#18181A";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(840), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();

        if (game.unclick)
        {
            game.unclick = false;
            if (game.aiListScroll < (game.aiList.length - 1))
            {
                game.aiListScroll += 1;
            }
        }
    }
    else
    {
        game.x.beginPath();
        game.x.fillStyle = "#18181A";
        game.x.strokeStyle = "lightGrey";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(840), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();
    }

    for (var i = game.aiListScroll; i < game.aiList.length; i++)
    {
        game.x.beginPath();
        game.x.fillStyle = "#18181A";
        game.x.strokeStyle = "lightGrey";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(160 + (32 * (i - game.aiListScroll))), xxx(649), yyy(30));
        game.x.fill();
        game.x.stroke();

        if (game.mouseX > xxx(51) && game.mouseX < xxx(699) && game.mouseY > yyy(160 + (32 * (i - game.aiListScroll))) && game.mouseY < yyy(160 + 30  + (32 * (i - game.aiListScroll))) && game.unclick)
        {
            game.unclick = false;
            if (game.aiList[i].selected == false)
            {
                for (var j = 0; j < game.aiList.length; j++)
                {
                    game.aiList[j].selected = false;
                }
                game.aiList[i].selected = true;
                game.aiSelect = game.aiList[i].ai;
            }
            else
            {
                game.aiList[i].selected = false;
                game.aiSelect = "none";
            }
        }

        //Item Name
        game.x.textAlign = "left";
        game.x.font = fonter(10, "Arial");
        if (game.aiList[i].selected == false)
        {
            game.x.fillStyle = "white";
        }
        else
        {
            game.x.fillStyle = "orange";
        }
        game.x.fillText(game.aiList[i].name, xxx(56), yyy(160 + 21 + 32 * (i - game.aiListScroll)));

        if (game.aiList[i].selected == true)
        {
            //name
            game.x.textAlign = "center";
            game.x.font = fonter(14, "Arial");
            game.x.fillStyle = "white";
            game.x.fillText(game.aiList[i].name, xxx(706 + 125), yyy(136));

            //ai description
            var xPos = 0;
            var yPos = 0;
            var thisto = 0;
            for (var k = 0; k < game.aiList[i].description.length; k++)
            {
                game.x.textAlign = "left";
                game.x.font = fonter(10, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText(game.aiList[i].description[k], xxx(706 + 8 + xPos), yyy(350 + yPos));
                thisto = game.aiList[i].description[k];

                if (thisto == " " || thisto == "f" || thisto == "r")
                {
                    xPos += 4;
                }
                else if (thisto == "t")
                {
                    xPos += 3.5;
                }
                else if (thisto == "i")
                {
                    xPos += 3;
                }
                else if (thisto == "j" || thisto == "l" || thisto == "'" || thisto == "," || thisto == ".")
                {
                    xPos += 2.7;
                }
                else if (thisto == "s")
                {
                    xPos += 5;
                }
                else if (thisto == "m" || thisto == "w" || thisto == "A")
                {
                    xPos += 8;
                }
                else if (thisto == "o" || thisto == "a" || thisto == "t" || thisto == "n" || thisto == "e")
                {
                    xPos += 5.5
                }
                else
                {
                    xPos += 6;
                }

                if (xPos > 232)
                {
                    if (game.aiList[i].description[k] != "-" && game.aiList[i].description[k] != " " && game.aiList[i].description[k + 1] != " " && game.aiList[i].description[k + 1] != "." && game.aiList[i].description[k + 1] != "!" && game.aiList[i].description[k + 1] != "?" && game.aiList[i].description[k + 1] != ")" && game.aiList[i].description[k + 1] != "," && game.aiList[i].description[k + 1] != ";" && game.aiList[i].description[k + 1] != "'" && game.aiList[i].description[k + 1] != "-")
                    {
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("-", xxx(706 + 8 + xPos), yyy(350 + yPos));
                    }
                    xPos = 0;
                    yPos += 19;
                }
            }
        }
    }

    game.x.restore();

    if (game.eKey)
    {
        for (var i = 0; i < game.aiList.length; i++)
        {
            if (game.aiList[i].selected)
            {
                game.aiList[i].selected = false;
                break;
            }
        }
        game.eKey = false;
        game.state = "Divine";
        game.aiMenu = false;
        for (var i = 0; i < game.shipsList.length; i++)
        {
            if (game.shipsList[i].barcode == game.aiShip)
            {
                game.shipsList[i].brain = game.aiSelect;
                break;
            }
        }
        game.aiShip = -1;
    }
}

//screen positioning out of 1000 as standard for width and height.
function xxx(inputX)
{
    return (inputX / 1000) * game.c.width;
}

function yyy(inputY)
{
    return (inputY / 1000) * game.c.height;
}

function fonter(size, font) //Go with arial font for this games menus.
{
    return (size * 1/1000 * game.c.width) + "px " + font;
}