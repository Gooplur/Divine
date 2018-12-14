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

        //Controls for scrolling.
        if (game.upKey == true)
        {
            game.viewY -= game.scrollSpeed / game.scale;
        }
        else if (game.downKey == true)
        {
            game.viewY += game.scrollSpeed / game.scale;
        }

        if (game.leftKey == true)
        {
            game.viewX -= game.scrollSpeed / game.scale;
        }
        else if (game.rightKey == true)
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