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
                shipBuild.brain = "follower";
            }
            game.shipsList.push(shipBuild);
        }
        game.shipConverterList = [];
    }
}

function mapBuilder()
{
    if (game.system == "Safir")
    {
        //Instantaneous
        if (game.change != "Safir")
        {
            game.change = "Safir";

            //Scenery

            //Ships

            //game.shipsList.push(new Ship(25000, -25000, "Afid01", "Player", "basic", false, "Advanced", "Stocked"));
            //game.shipsList.push(new Ship(25000, -25000, "Disk01", "Player", "basic", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(25000, -25000, "Mantis09", "Player", "follower", false, "Advanced", "Stocked"));
            //game.shipsList.push(new Ship(25000, -25000, "Mantis09", "Player", "swooper-missile", false, "Standard", "Scarce"));
            game.shipsList.push(new Ship(25000, -25000, "Screecher", "Player", "follower", false, "Standard", "Doom"));
            game.shipsList.push(new Ship(25000, -25000, "Screecher", "Player", "follower", false, "Advanced", "Doom"));
            //game.shipsList.push(new Ship(25000, -25000, "Majestad", "Player", "simple", false, "Standard", "Stocked"));
            game.shipsList.push(new Ship(25000, -25000, "Majestad", "Player", "follower", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(25000, -25000, "Harbinger88", "Player", "follower", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(25000, -25000, "MinionC32", "Player", "follower", false, "Standard", "Stocked"));
            game.shipsList.push(new Ship(23000, -25000, "Capsid08", "Player", "follower", false, "Standard", "Stocked"));
            game.shipsList.push(new Ship(25000, -25000, "Capsid08", "Player", "follower", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(25000, -25000, "Capsid12B", "Player", "follower", true, "Standard", "Stocked"));

            game.shipsList.push(new Ship(-16000, 16000, "Majestad", "Boofeln Widget Corporation", "tank", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(-9000, 9000, "Majestad", "Boofeln Widget Corporation", "tank", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(-1300, -500, "Disk01", "Boofeln Widget Corporation", "basic", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(7560, -250, "Mantis09", "Boofeln Widget Corporation", "simple", false, "Advanced", "Doom"));
            game.shipsList.push(new Ship(-1000, 500, "Disk01", "Boofeln Widget Corporation", "basic", false, "Advanced", "Stocked"));
            game.shipsList.push(new Ship(500, 100, "Afid01", "Boofeln Widget Corporation", "simple", false, "Advanced", "Good"));
            game.shipsList.push(new Ship(300, -200, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(100, 1500, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(-250, -500, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(900, -900, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(9000, -1000, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(7750, 1700, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(1400, 1100, "Afid01", "Boofeln Widget Corporation", "basic", false, "Standard", "Good"));
            game.shipsList.push(new Ship(8200, 2000, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(4750, 1700, "Afid01", "Boofeln Widget Corporation", "simple", false, "Standard", "Good"));
            game.shipsList.push(new Ship(6000, -3000, "Afid01", "Boofeln Widget Corporation", "basic", false, "Standard", "Good"));
            game.shipsList.push(new Ship(10000, -9000, "Capsid08", "Boofeln Widget Corporation", "basic", false, "Standard", "Stocked"));
            game.shipsList.push(new Ship(-8200, 8400, "Capsid08", "Player", "basic", false, "Advanced", "Stocked"));

            game.shipsList.push(new Ship(4783, -58269, "Afid01", "Korlax Toothpick Agency", "swooper", false, "Advanced", "Good"));
            game.shipsList.push(new Ship(4783, -58269, "Afid01", "Korlax Toothpick Agency", "swooper", false, "Standard", "Good"));
            game.shipsList.push(new Ship(4783, -58269, "Afid01", "Korlax Toothpick Agency", "swooper", false, "Standard", "Good"));
        }
        //Continuous
        game.worldEconomy.testRun();


    }
}

