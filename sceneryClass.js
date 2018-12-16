/**
 * Created by skyeguy on 11/23/17.
 */

function Scenery(X, Y, type, list, extra, size)
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
    this.isSetup = false;
    this.faction = false;
    if (typeof(size) != "undefined")
    {
        if (size == false)
        {
            this.size = 14.15;
        }
        else
        {
            this.size = size;
        }
    }
    //planet variables
    this.pricing = {shop: [1, 1], shipyard: [1, 1], docking: 55};
    this.desiredStock = [];
    this.production = [];
    this.shopContents = [];
    this.shipyardContents = [];
    this.dockingContents = [];
    this.resetContentsTime = 0; //used in reseting shop contents after an elsewhere defined period of time.
    this.econo = false; //does this participate in the in-game economy
    this.star = false;
    this.faction = false;
    this.system = false;

    //cargohold variables
    this.contents = list;

    this.setup = function(type)
    {
        if (this.isSetup == false)
        {
            this.isSetup = true;

            if (type == "planet")
            {
                if (this.extra == "Aztlan")
                {
                    this.system = "Safir";
                    this.econo = true;
                    this.faction = "UIR";
                    this.shopContents = [itemize("Freshwater", 999), itemize("Freshwater", 999), itemize("Petroleum", 999), itemize("Petroleum", 999), itemize("Petroleum", 999), itemize("Petroleum", 2), itemize("Oxygen Tank", 999), itemize("Oxygen Tank", 4), itemize("Power Core", 7), itemize("Repair Kit", 999), itemize("Repair Kit", 6), itemize("Shield Jumper", 3), itemize("RedStarShields", 3), itemize("JadeDragonShields", 1), itemize("M1Missile", 999), itemize("M1Missile", 15), itemize("PlasmaticSeeker", 6), itemize("TrineumSeeker", 999), itemize("Technology", 6)];
                    this.desiredStock = [["Freshwater", 40], ["Petroleum", 38], ["Power Core", 21], ["Repair Kit", 18], ["Shield Jumper", 5], ["RedStarShields", 2], ["JadeDragonShields", 1], ["M1Missile", 25], ["PlasmaticSeeker", 9], ["TrineumSeeker", 14], ["Technology", 14], ["Majestad-TrineumDisseminator", 2], ["Majestad-CelesteShields", 1], ["Majestad-TrineumBlasterSentryGuns", 1], ["Majestad-TrineumSplicer", 1], ["Oxygen Tank", 2]];
                    this.production = [["Freshwater", 22], ["Petroleum", 15], ["Oxygen Tank", 8], ["Power Core", 3], ["Repair Kit", 2], ["Shield Jumper", 1], ["TrineumSeeker", 8], ["Technology", 5], ["Packaged Food", 3], ["Majestad-CelesteShields", 1], ["Majestad-TrineumBlasterSentryGuns", 1], ["Majestad-TrineumRay", 1], ["Majestad-TrineumSplicer", 1], ["Majestad-TrineumDisseminator", 2]];
                }
                else if (this.extra == "Kurm")
                {
                    this.system = "Safir";
                    this.econo = true;
                    this.faction = "UIR";
                    this.shopContents = [itemize("Freshwater", 6), itemize("Petroleum", 999), itemize("Petroleum", 999), itemize("Petroleum", 3), itemize("Oxygen Tank", 999), itemize("Oxygen Tank", 1), itemize("Power Core", 2), itemize("Repair Kit", 3), itemize("M1Missile", 999), itemize("M1Missile", 14), itemize("PlasmaticSeeker", 6), itemize("Afid01-F1Lasers", 1), itemize("Afid01-F1Lasers", 1), itemize("Afid01-F1Lasers", 1), itemize("Afid01-F1Lasers", 1), itemize("Afid01-M1Launcher", 1), itemize("Afid01-M1Launcher", 1), itemize("Afid01-M1Launcher", 1), itemize("Afid01-Boosters", 1), itemize("Afid01-Boosters", 1), itemize("Afid01-F1SentryGun", 1), itemize("Afid01-F1SentryGun", 1), itemize("Afid01-F1SentryGun", 1), itemize("Disk01-F1SingleStream", 1), itemize("Disk01-F1SingleStream", 1), itemize("Disk01-F1SingleStream", 1), itemize("Mantis09-PlasmaCannon", 1), itemize("Mantis09-PlasmaBlasters", 1), itemize("Mantis09-PlasmaBlasters", 1), itemize("Mantis09-PlasmaAccelerator", 1), itemize("Mantis09-PlasmaAccelerator", 1), itemize("Mantis09-PlasmaAccelerator", 1), itemize("Packaged Food", 8)];
                    this.desiredStock = [["Scrap", 3], ["Oxygen Tank", 20], ["Freshwater", 10], ["Petroleum", 12], ["Power Core", 4], ["Repair Kit", 6], ["Shield Jumper", 1], ["RedStarShields", 1], ["JadeDragonShields", 2], ["StabilizingParticleFogShield", 1], ["M1Missile", 40], ["PlasmaticSeeker", 11], ["Technology", 6], ["Afid01-F1Lasers", 6], ["Afid01-M1Launcher", 5], ["Afid01-Boosters", 3], ["Afid01-F1SentryGun", 4], ["Disk01-F1SingleStream", 5], ["Mantis09-PlasmaCannon", 1], ["Mantis09-PlasmaBlasters", 3], ["Mantis09-PlasmaAccelerator", 2], ["Packaged Food", 13]];
                    this.production = [["Power Core", 1], ["Repair Kit", 1], ["Technology", 1], ["M1Missile", 12], ["PlasmaticSeeker", 5], ["Afid01-F1Lasers", 2], ["Afid01-M1Launcher", 2], ["Afid01-Boosters", 1], ["Afid01-F1SentryGun", 2], ["Disk01-F1SingleStream", 3], ["Mantis09-PlasmaCannon", 1], ["Mantis09-PlasmaBlasters", 1], ["Mantis09-PlasmaAccelerator", 1]];
                }
                else if (this.extra == "Dorshun")
                {
                    this.system = "Safir";
                }
                else if (this.extra == "Safir")
                {
                    this.system = "Safir";
                    this.star = true;
                }
                else if (this.extra == "Malakai")
                {
                    this.system = "Malakai";
                    this.star = true;
                }
                else if (this.extra == "Haber")
                {
                    this.system = "Malakai";
                    this.econo = true;
                    this.faction = "UIR";
                    this.shopContents = [itemize("Freshwater", 8), itemize("Oxygen Tank", 10), itemize("Power Core", 2), itemize("Repair Kit", 5), itemize("Shield Jumper", 2), itemize("RedStarShields", 2), itemize("Technology", 4), itemize("Stem Cells", 13), itemize("Packaged Food", 14)];
                    this.desiredStock = [["Repair Kit", 2], ["Freshwater", 60], ["Shield Jumper", 2], ["RedStarShields", 4], ["Technology", 10], ["Stem Cells", 30], ["Oxygen Tank", 19], ["Packaged Food", 15]];
                    this.production = [["Repair Kit", 1], ["Technology", 2], ["Shield Jumper", 1], ["RedStarShields", 1]];
                }
                else if (this.extra == "Akigma")
                {
                    this.system = "Malakai";
                    this.econo = true;
                    this.faction = "UIR";
                    this.shopContents = [itemize("Petroleum", 999), itemize("Petroleum", 7), itemize("StabilizingParticleFogShield", 1), itemize("Freshwater", 999), itemize("Freshwater", 13), itemize("Oxygen Tank", 10), itemize("Oxygen Tank", 3), itemize("Power Core", 9), itemize("Repair Kit", 8), itemize("Shield Jumper", 6), itemize("JadeDragonShields", 1), itemize("JadeDragonShields", 1), itemize("RedStarShields", 1), itemize("VorcadiumBomb", 2), itemize("Technology", 38), itemize("Stem Cells", 999), itemize("Stem Cells", 999), itemize("Packaged Food", 14)];
                    this.desiredStock = [["Petroleum", 55], ["Freshwater", 59], ["Shield Jumper", 4], ["RedStarShields", 2], ["Technology", 17], ["Stem Cells", 8], ["Oxygen Tank", 32], ["Packaged Food", 42], ["M1Missile", 46], ["PlasmaticSeeker", 26], ["Afid01-F1Lasers", 1], ["Afid01-M1Launcher", 1], ["Afid01-Boosters", 1], ["Afid01-F1SentryGun", 1], ["Disk01-F1SingleStream", 2], ["Mantis09-PlasmaCannon", 1], ["Mantis09-PlasmaBlasters", 1], ["Mantis09-PlasmaAccelerator", 1], ["JadeDragonShields", 2], ["VorcadiumBomb", 2]];
                    this.production = [["Petroleum", 7], ["Freshwater", 3], ["Oxygen Tank", 1], ["Repair Kit", 5], ["Power Core", 8], ["PlasmaticSeeker", 3], ["M1Missile", 11], ["Technology", 8], ["Shield Jumper", 2], ["RedStarShields", 6], ["Afid01-F1Lasers", 1], ["Afid01-M1Launcher", 1], ["Afid01-Boosters", 1], ["Afid01-F1SentryGun", 1], ["Disk01-F1SingleStream", 4], ["Mantis09-PlasmaCannon", 2], ["Mantis09-PlasmaBlasters", 3], ["Mantis09-PlasmaAccelerator", 4], ["JadeDragonShields", 3], ["Stem Cells", 13], ["MinionC32-FusionSentryGun", 1]];
                }
                else if (this.extra == "Kalishkya")
                {
                    this.system = "Malakai";
                    this.faction = "UIR";
                    this.desiredStock = [];
                }
                else if (this.extra == "Artemis")
                {
                    this.system = "Artemis";
                    this.star = true;
                }
            }
        }

    };

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
                if (ifInScreenDraw(this.X, this.Y, this.size))
                {
                    rectangle(true, this.X, this.Y, 20, 20, "grey", 2, "darkGrey", false, this.rotation + this.spin, 1);
                    rectangle(true, this.X, this.Y, 9, 9, "darkGrey", 2, "black", false, this.rotation + 2*this.spin, 1/4*Math.PI, 1);
                }
            }
        }
        else if (this.type == "wormhole" || this.type == "wormholeExit")
        {
            if (z == 0)
            {
                if (this.type == "wormholeExit")
                {
                    this.spin += 0.1;
                }
                else
                {
                    this.spin -= 0.1;
                }

                if (ifInScreenDraw(this.X, this.Y, this.size * 14))
                {
                    draw(vortex, 0, 0, vortex.width, vortex.height, this.X, this.Y, vortex.width * 9, vortex.height * 9, this.spin, false, 1, false, false);

                    if (this.type == "wormhole")
                    {
                        if (this.flag && this.extra != false)
                        {
                            game.x.textAlign = "center";
                            game.x.font = fonter(16, "Arial");
                            game.x.fillStyle = game.playerHUDColor;
                            game.x.fillText("Wormhole to " + this.extra.destination + " System", xxx(0), yyy(-200));
                        }
                    }
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
                    if (ifInScreenDraw(this.X, this.Y, this.size))
                    {
                        draw(divineKitB, 4, 3, 37, 35, this.X, this.Y, 37 * 12, 35 * 12, 0, false, 1, false, false);
                        draw(divineKitB, 4, 3, 37, 35, this.X, this.Y, 37 * 12, 35 * 12, 0, false, 1, false, false);
                    }
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
                    if (ifInScreenDraw(this.X, this.Y, this.size))
                    {
                        draw(divineKitB, 135, 119, 34, 33, this.X, this.Y, 34 * 8, 33 * 8, 0, false, 1, false, false);
                    }

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
                    if (ifInScreenDraw(this.X, this.Y, this.size))
                    {
                        draw(divineKitB, 117, 2, 51, 48, this.X, this.Y, 51 * 17, 48 * 17, 2, false, 1, false, false);
                    }

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Safir")
                {
                    //draw the planet
                    if (ifInScreenDraw(this.X, this.Y, this.size * 2.9))
                    {
                        draw(sun3, 0, 0, sun3.width, sun3.height, this.X, this.Y, sun3.width * 14, sun3.height * 14, 0, false, 1, false, false);
                    }

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Malakai")
                {
                    //draw the planet
                    if (ifInScreenDraw(this.X, this.Y, this.size * 8.65))
                    {
                        draw(sun2, 0, 0, sun2.width, sun2.height, this.X, this.Y, sun2.width * 18, sun2.height * 18, 0, false, 1, false, false);
                    }

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Haber")
                {
                    //draw the planet
                    if (ifInScreenDraw(this.X, this.Y, this.size))
                    {
                        draw(divineKitE, 963, 516, 107, 103, this.X, this.Y, 107 * 3.53, 103 * 3.53, -5.35, false, 1, false, false);
                    }

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Akigma")
                {
                    //draw the planet
                    if (ifInScreenDraw(this.X, this.Y, this.size))
                    {
                        draw(divineKitE, 279, 449, 159, 158, this.X, this.Y, 159 * 8.888, 158 * 8.888, 8, false, 1, false, false);
                    }

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Kalishkya")
                {
                    //draw the planet
                    if (ifInScreenDraw(this.X, this.Y, this.size))
                    {
                        var KalishkyaOverlay = colorizedImage(divineKitB, 135, 119, 34, 33, 34, 33, 0.18, "red");
                        draw(KalishkyaOverlay, 0, 0, 34, 33, this.X, this.Y, 34 * 5.3, 33 * 5.3, -3.74218, false, 1, false, false);
                    }

                    if (this.flag)
                    {
                        game.x.textAlign = "center";
                        game.x.font = fonter(16, "Arial");
                        game.x.fillStyle = game.playerHUDColor;
                        game.x.fillText(this.extra, xxx(0), yyy(-200));
                    }
                }
                else if (this.extra == "Artemis")
                {
                    //draw the planet
                    if (ifInScreenDraw(this.X, this.Y, this.size * 8))
                    {
                        draw(sun1, 0, 0, sun1.width, sun1.height, this.X, this.Y, sun1.width * 15.5, sun1.height * 15.5, 0, false, 1, false, false);
                    }

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
            //delete when emptied
            if (this.contents.length < 1)
            {
                game.sceneryList.splice(game.sceneryList.indexOf(this), 1);
            }

            if (ifInScreenDraw(this.X, this.Y, this.size))
            {
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    if (game.shipsList[i].player)
                    {
                        if (distance(this, game.shipsList[i]) <= this.size)
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
        else if (this.type == "wormhole")
        {
            if (ifInScreenDraw(this.X, this.Y, this.size * 17))
            {
                for (var i = 0; i < game.projectilesList.length; i++)
                {
                    var dist = distance(this, game.projectilesList[i]);
                    if (dist <= this.size * 17)
                    {
                        if (dist > 0)
                        {
                            if (game.projectilesList[i].tugResist == false && game.projectilesList[i].sticker == "none")
                            {
                                game.projectilesList[i].X += Math.cos(Math.atan2(this.Y - game.projectilesList[i].Y, this.X - game.projectilesList[i].X)) * 900 / (game.projectilesList[i].radius + (dist / 800));
                                game.projectilesList[i].Y += Math.sin(Math.atan2(this.Y - game.projectilesList[i].Y, this.X - game.projectilesList[i].X)) * 900 / (game.projectilesList[i].radius + (dist / 800));
                            }
                        }
                    }
                }
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    var dist = distance(this, game.shipsList[i]);
                    if (dist <= this.size * 17)
                    {
                        if (dist > 0)
                        {
                            if (game.shipsList[i].wormholeResistUP == false)
                            {
                                game.shipsList[i].X += Math.cos(Math.atan2(this.Y - game.shipsList[i].Y, this.X - game.shipsList[i].X)) * 900 / (game.shipsList[i].size + (dist / 16000));
                                game.shipsList[i].Y += Math.sin(Math.atan2(this.Y - game.shipsList[i].Y, this.X - game.shipsList[i].X)) * 900 / (game.shipsList[i].size + (dist / 16000));
                            }
                        }
                    }
                    if (game.shipsList[i].player)
                    {
                        if (dist <= this.size && game.shipsList[i].wormholeResistUP == true || dist <= (this.size / 4))
                        {
                            this.flag = true;

                            if (this.extra != false)
                            {
                                if (game.eKey || game.ctrlKey && game.scale >= 1.65)
                                {
                                    game.eKey = false;

                                    // {destination: "Malakai", desX: 0, desY: 0}
                                    for (var j = 0; j < game.shipsList.length; j++)
                                    {
                                        if (game.shipsList[j].faction == "Player")
                                        {
                                            game.shipsList[j].X = this.extra.desX;
                                            game.shipsList[j].Y = this.extra.desY;
                                        }
                                    }
                                    game.system = this.extra.destination;
                                }
                            }
                        }
                        else
                        {
                            this.flag = false;
                        }
                    }
                }
            }
        }
        else if (this.type == "wormholeExit")
        {
            if (ifInScreenDraw(this.X, this.Y, this.size * 17))
            {
                for (var i = 0; i < game.projectilesList.length; i++)
                {
                    var dist = distance(this, game.projectilesList[i]);
                    if (dist <= this.size * 17)
                    {
                        if (dist > 0)
                        {
                            if (game.projectilesList[i].tugResist == false && game.projectilesList[i].sticker == "none")
                            {
                                game.projectilesList[i].X += Math.cos(Math.atan2(this.Y - game.projectilesList[i].Y, this.X - game.projectilesList[i].X) - Math.PI) * 900 / (game.projectilesList[i].radius + (dist / 800));
                                game.projectilesList[i].Y += Math.sin(Math.atan2(this.Y - game.projectilesList[i].Y, this.X - game.projectilesList[i].X) - Math.PI) * 900 / (game.projectilesList[i].radius + (dist / 800));
                            }
                        }
                    }
                }
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    var dist = distance(this, game.shipsList[i]);
                    if (dist <= this.size * 17)
                    {
                        if (dist > 0)
                        {
                            if (game.shipsList[i].wormholeResistUP == false)
                            {
                                game.shipsList[i].X += Math.cos(Math.atan2(this.Y - game.shipsList[i].Y, this.X - game.shipsList[i].X) - Math.PI) * 900 / (game.shipsList[i].size + (dist / 16000));
                                game.shipsList[i].Y += Math.sin(Math.atan2(this.Y - game.shipsList[i].Y, this.X - game.shipsList[i].X) - Math.PI) * 900 / (game.shipsList[i].size + (dist / 16000));
                            }
                        }
                        if (dist < 400)
                        {
                            game.shipsList[i].speed = Math.min(game.shipsList[i].speedMAX * 2, 390);
                        }
                    }
                }
            }
        }
        else if (this.type == "planet")
        {
            if (ifInScreenDraw(this.X, this.Y, this.size))
            {
                for (var i = 0; i < game.shipsList.length; i++)
                {
                    if (game.shipsList[i].player)
                    {
                        if (this.extra == "Aztlan")
                        {
                            if (distance(this, game.shipsList[i]) <= this.size)
                            {
                                this.flag = true;
                                //menu
                                if (game.eKey || game.ctrlKey && game.ctrlKey && game.scale >= 1.65)
                                {
                                    game.eKey = false;
                                    game.planetMenu = true;
                                    game.planetMenuList = ["shop", "shipyard", "docking"];
                                    game.userShipLocator = i;
                                    game.currentPlanetLocator = game.sceneryList.indexOf(this);
                                    this.pricing = {shop: [0.92, 1.06], shipyard: [0.4, 1.1], docking: 55};
                                    game.merch = this;

                                    //Resets the contents of the shop and shipyard every hour
                                    if (new Date().getTime() - this.resetContentsTime > 60 * (1000 * 60)) //the first number is a measurement of minutes
                                    {
                                        this.resetContentsTime = new Date().getTime();
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
                            if (distance(this, game.shipsList[i]) <= this.size)
                            {
                                this.flag = true;
                                //menu
                                if (game.eKey || game.ctrlKey && game.scale >= 1.65)
                                {
                                    game.eKey = false;
                                    game.planetMenu = true;
                                    game.planetMenuList = ["shipyard", "shop"];
                                    game.userShipLocator = i;
                                    game.currentPlanetLocator = game.sceneryList.indexOf(this);
                                    this.pricing = {shop: [0.92, 1.06], shipyard: [0.65, 1.19], docking: 55};
                                    game.merch = this;

                                    //Resets the contents of the shop and shipyard every hour
                                    if (new Date().getTime() - this.resetContentsTime > 62 * (1000 * 60)) //the first number is a measurement of minutes
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
                            if (distance(this, game.shipsList[i]) <= this.size)
                            {
                                this.flag = true;
                            }
                            else
                            {
                                this.flag = false;
                            }
                        }
                        else if (this.extra == "Haber")
                        {
                            if (distance(this, game.shipsList[i]) <= this.size)
                            {
                                this.flag = true;
                                //menu
                                if (game.eKey || game.ctrlKey && game.scale >= 1.65)
                                {
                                    game.eKey = false;
                                    game.planetMenu = true;
                                    game.planetMenuList = ["shipyard", "shop"];
                                    game.userShipLocator = i;
                                    game.currentPlanetLocator = game.sceneryList.indexOf(this);
                                    this.pricing = {shop: [0.92, 1.06], shipyard: [0.53, 1], docking: 55};
                                    game.merch = this;

                                    //Resets the contents of the shop and shipyard every hour
                                    if (new Date().getTime() - this.resetContentsTime > 15 * (1000 * 60)) //the first number is a measurement of minutes
                                    {
                                        this.resetContentsTime = new Date().getTime();
                                        this.shopContents.unshift(itemize("Capsid08-SolarCasterTransplant", 1), itemize("Capsid08-StickySolarBombTransplant", 2)); //for parts that are meant to be exclusive they can be added to the list aside from the rest of the economy.
                                        this.shipyardContents = [itemize("Capsid08", 1, false), itemize("Capsid08", 1, false), itemize("Capsid12B", 1, false), itemize("Capsid12B", 1, false)];
                                    }
                                }
                            }
                            else
                            {
                                this.flag = false;
                            }
                        }
                        else if (this.extra == "Safir")
                        {
                            if (distance(this, game.shipsList[i]) <= size)
                            {
                                if (game.shipsList[i].solar == true && game.shipsList[i].power < game.shipsList[i].powerMAX)
                                {
                                    game.shipsList[i].power += 0.55;
                                }
                                if (game.shipsList[i].solarOrganic == true && game.shipsList[i].integrity < game.shipsList[i].integrityMAX)
                                {
                                    game.shipsList[i].integrity += 0.05;
                                }

                                this.flag = true;
                            }
                            else
                            {
                                this.flag = false;
                            }

                        }
                        else if (this.extra == "Malakai")
                        {
                            if (distance(this, game.shipsList[i]) <= size)
                            {
                                if (game.shipsList[i].solar == true && game.shipsList[i].power < game.shipsList[i].powerMAX)
                                {
                                    game.shipsList[i].power += 0.80;
                                }
                                if (game.shipsList[i].solarOrganic == true && game.shipsList[i].integrity < game.shipsList[i].integrityMAX)
                                {
                                    game.shipsList[i].integrity += 0.08;
                                }

                                this.flag = true;
                            }
                            else
                            {
                                this.flag = false;
                            }

                        }
                        else if (this.extra == "Akigma")
                        {
                            if (distance(this, game.shipsList[i]) <= this.size)
                            {
                                this.flag = true;
                                //menu
                                if (game.eKey || game.ctrlKey && game.scale >= 1.65)
                                {
                                    game.eKey = false;
                                    game.planetMenu = true;
                                    game.planetMenuList = ["docking", "shop", "shipyard"];
                                    game.userShipLocator = i;
                                    game.currentPlanetLocator = game.sceneryList.indexOf(this);
                                    this.pricing = {shop: [0.92, 1.06], shipyard: [0.88, 1.31], docking: 228};
                                    game.merch = this;

                                    //Resets the contents of the shop and shipyard every hour
                                    if (new Date().getTime() - this.resetContentsTime > 88 * (1000 * 60)) //the first number is a measurement of minutes
                                    {
                                        this.resetContentsTime = new Date().getTime();
                                        this.shopContents.unshift(itemize("Harbinger88-FusionCompactionCannon", 1), itemize("Harbinger88-FusionCasters", 1), itemize("Harbinger88-FusionLaunchers", 1), itemize("Harbinger88-FusionLaunchers", 1)); //for parts that are meant to be exclusive they can be added to the list aside from the rest of the economy.
                                        this.shipyardContents = [itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Afid01", 1, false), itemize("Mantis09", 1, false), itemize("Mantis09", 1, false), itemize("Mantis09", 1, false), itemize("MinionC32", 1, false), itemize("MinionC32", 1, false), itemize("Harbinger88", 1, false), itemize("Disk01", 1, false), itemize("Disk01", 1, false), itemize("Disk01", 1, false), itemize("Disk01", 1, false), itemize("Disk01", 1, false), itemize("Disk01", 1, false)];
                                    }
                                }
                            }
                            else
                            {
                                this.flag = false;
                            }
                        }
                        else if (this.extra == "Kalishkya")
                        {
                            if (distance(this, game.shipsList[i]) <= this.size)
                            {
                                this.flag = true;
                                //menu
                                if (game.eKey || game.ctrlKey && game.scale >= 1.65)
                                {
                                    game.eKey = false;
                                    game.planetMenu = true;
                                    game.planetMenuList = ["shipyard", "shop"];
                                    game.userShipLocator = i;
                                    game.currentPlanetLocator = game.sceneryList.indexOf(this);
                                    this.pricing = {shop: [0.77, 1.19], shipyard: [0.19, 0.9], docking: 55};
                                    game.merch = this;

                                    //Resets the contents of the shop and shipyard every hour
                                    if (new Date().getTime() - this.resetContentsTime > 17 * (1000 * 60)) //the first number is a measurement of minutes
                                    {
                                        this.resetContentsTime = new Date().getTime();
                                        this.shopContents = [itemize("VorcadiumBomb", 3), itemize("VorcadiumBomb", 3), itemize("VorcadiumBomb", 3), itemize("Screecher-EtherSentryGuns", 1), itemize("StabilizingParticleFogShield", 1), itemize("StabilizingParticleFogShield", 1), itemize("Screecher-EtherBlasters", 1), itemize("Screecher-EtherBlasters", 1), itemize("Screecher-F3Lasers", 1), itemize("Screecher-F3Lasers", 1), itemize("Screecher-F3Lasers", 1), itemize("Screecher-F3Lasers", 1), itemize("Screecher-F3SentryGuns", 1), itemize("Screecher-F3SentryGuns", 1)]; //for parts that are meant to be exclusive they can be added to the list aside from the rest of the economy.
                                        this.shipyardContents = [itemize("Screecher", 1, false), itemize("Screecher", 1, false), itemize("Screecher", 1, false), itemize("Screecher", 1, false), itemize("Screecher", 1, false), itemize("Screecher", 1, false)];
                                    }
                                }
                            }
                            else
                            {
                                this.flag = false;
                            }
                        }
                        else if (this.extra == "Artemis")
                        {
                            if (distance(this, game.shipsList[i]) <= size)
                            {
                                if (game.shipsList[i].solar == true && game.shipsList[i].power < game.shipsList[i].powerMAX)
                                {
                                    game.shipsList[i].power += 0.60;
                                }
                                if (game.shipsList[i].solarOrganic == true && game.shipsList[i].integrity < game.shipsList[i].integrityMAX)
                                {
                                    game.shipsList[i].integrity += 0.06;
                                }

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