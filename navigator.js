/**
 * Created by skyeguy on 8/28/16.
 */
//The navigator is the disembodied player when they are not driving a ship.

//Basic Navigator Controls
function navigator()
{
    if (game.mode == "navigator")
    {
        //Selecting Ships
        for (var i = 0; i < game.shipsList.length; i++)
        {
            //((((game.mouseX - 1/2 * game.c.width) / game.scale) + game.viewX))
            if (distance(game.worldMouse, game.shipsList[i]) <= game.shipsList[i].size)
            {
                if (game.shipsList[i].faction == "Player")
                {
                    console.log("pass");

                    if (game.dClick == true)
                    {
                        game.dClick = false;

                        for (var j = 0; j < game.shipsList; i++)
                        {
                            game.shipsList[j].player = false;
                        }
                        game.shipsList[i].player = true;
                    }
                }
            }
        }

        var playerShips = 0;
        for (var l = 0; l < game.shipsList.length; l++)
        {
            if (game.shipsList[l].faction == "Player")
            {
                playerShips += 1;
            }
        }

        if (playerShips > 0)
        {
            if (game.deleteKey)
            {
                game.deleteKey = false;
                remember(); //save the game
            }
        }
        else if (game.state == "Divine" && game.mainMenu == false && game.modeSelectorMenu == false)
        {
            game.checks -= 9000;
            game.shipConverterList = [itemize("MinionC32", 1)];
            game.viewX = game.interCoords[0];
            game.viewY = game.interCoords[1];
            shipConverter(false);
        }

        //communications
        if (game.rKey)
        {
            game.rKey = false;
            game.commsMenu = true;
        }

        //Controls for scrolling.
        if (game.wKey == true)
        {
            game.viewY -= game.scrollSpeed / game.scale;
        }
        else if (game.sKey == true)
        {
            game.viewY += game.scrollSpeed / game.scale;
        }

        if (game.aKey == true)
        {
            game.viewX -= game.scrollSpeed / game.scale;
        }
        else if (game.dKey == true)
        {
            game.viewX += game.scrollSpeed / game.scale;
        }

        if (game.ctrlKey == true)
        {
            game.scale = Math.min(10, game.scale + 0.02);
        }
        else if (game.altKey == true)
        {
            game.scale = Math.max(0.09, game.scale - 0.02);
        }

        if (game.tildKey) //quicksave button
        {
            game.tildKey = false;

            for (var j = 0; j < game.shipsList; i++)
            {
                game.shipsList[j].player = false;
            }
        }
    }
}

function shipToggle()
{
    if (game.plusKey || game.minusKey) //toggle forward through ships
    {
        var allyLocator = [];
        for (var i = 0; i < game.shipsList.length; i++)
        {
            game.shipsList[i].player = false;
            if (game.shipsList[i].faction == "Player")
            {
                allyLocator.push(i);
            }
        }


        if (game.navToggle >= allyLocator.length)
        {
            game.navToggle = 0;
        }
        if (game.navToggle < 0)
        {
            game.navToggle = allyLocator.length - 1;
        }


        if (allyLocator.length > 0)
        {
            game.shipsList[allyLocator[game.navToggle]].player = true;
            if (game.plusKey)
            {
                game.plusKey = false;
                game.navToggle += 1;
            }
            if (game.minusKey)
            {
                game.minusKey = false;
                game.navToggle -= 1;
            }
        }
    }
}