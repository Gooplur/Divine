/**
 * Created by skyeguy on 8/28/16.
 */

function background()
{
    var self = this;

    rectangle(true, 1/2 * game.c.width, 1/2 * game.c.height, game.c.width / game.scale, game.c.height / game.scale, "black", false, false, "centered");
    for (var i = 0; i < game.starsList.length; i++)
    {
        if (ifInScreenDraw(game.starsList[i][0], game.starsList[i][1], game.starsList[i][2]))
        {
            circle(true, game.starsList[i][0], game.starsList[i][1], game.starsList[i][2], 0, 2 * Math.PI, "white", false, false, false, 0, game.starsList[i][3]);
        }
    }
}

function alterGame()
{
    //zoom in and out
    if (game.mode != "navigator")
    {
        if (game.altKey == true)
        {
            game.scale = Math.max(0.09, game.scale -= 0.01);
        }
        if (game.ctrlKey == true)
        {
            game.scale = Math.min(10, game.scale + 0.01);
        }
    }

    //game volume +/-
    if (game.plusKey == true)
    {
        game.masterVolume = Math.min(1, game.masterVolume + 0.005);
    }
    if (game.minusKey == true)
    {
        game.masterVolume = Math.max(0, game.masterVolume - 0.005);
    }
}

function shipConverter(bool)
{
    if (bool) //turns ships into items.
    {
        var toBeConverted = [];
        for (var i = 0; i < game.shipsList.length; i++)
        {
            if (game.shipsList[i].faction == "Player" && !game.shipsList[i].player)
            {
                toBeConverted.push(i);
            }
        }

        for (var i = 0; i < toBeConverted.length; i++)
        {
            var shippy = game.shipsList[toBeConverted[i]];
            game.shipConverterList.push(itemize(shippy.type, 1, [shippy.power, shippy.shields, shippy.integrity, shippy.upgrades, shippy.cargoBay, shippy.ammunition, shippy.brain]));
        }
        for (var i = toBeConverted.length - 1; i > -1; i--)
        {
            game.shipsList.splice(toBeConverted[i], 1);
        }
    }
    else //turns shipItems into ships
    {
        for (var i = 0; i < game.shipConverterList.length; i++)
        {
            var shipply = game.shipConverterList[i];
            var shipBuild;

            if (game.shipConverterList[i].extra != false)
            {
                shipBuild = new Ship(game.interCoords[0], game.interCoords[1], shipply.name, "Player", shipply.AI, false, false, false, false);
                //[shippy.power, shippy.shields, shippy.integrity, shippy.upgrades, shippy.cargoBay, shippy.ammunition];
                shipBuild.power = shipply.extra[0];
                shipBuild.shields = shipply.extra[1];
                shipBuild.integrity = shipply.extra[2];
                shipBuild.upgrades = shipply.extra[3];
                shipBuild.cargoBay = shipply.extra[4];
                shipBuild.ammunition = shipply.extra[5];
                shipBuild.brain = shipply.extra[6];
            }
            else
            {
                shipBuild = new Ship(game.interCoords[0], game.interCoords[1], shipply.name, "Player", shipply.AI, false, false, false, false);
                var upgrd = [itemize("CORE", 1)];
                shipBuild.upgrades = upgrd;
            }
            game.shipsList.push(shipBuild);
        }
        game.shipConverterList = [];
    }
}

