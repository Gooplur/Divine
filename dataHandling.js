/**
 * Created by skyelipson on 1/5/19.
 */
function remember() //save game
{
    game.state = "DivinePaused";
    localStorage.removeItem("Divine");

    for (var i = 0; i < game.shipsList.length; i++)
    {
        if (game.shipsList[i].player == true)
        {
            game.shipsList[i].player = false;
        }
    }
    shipConverter(true);
    game.gameData.shipConverterList = game.shipConverterList;
    planetConverter(true);
    game.gameData.convertPlanets = game.convertPlanets;
    game.gameData.system = game.interSystem;
    game.gameData.checks = game.checks;
    game.gameData.commsList = game.commsList;
    game.gameData.interCoords = game.interCoords;

    var recordar = JSON.stringify(game.gameData);

    localStorage.setItem('Divine', recordar);

    window.location.reload();
}

function remind() //load game
{
    var recordar = JSON.parse(localStorage.getItem('Divine'));
    game.gameData = recordar;
    console.log(game.gameData);

    game.shipConverterList = game.gameData.shipConverterList;
    game.interCoords = game.gameData.interCoords;
    shipConverter(false);
    game.convertPlanets = game.gameData.convertPlanets;
    planetConverter(false);
    game.system = game.gameData.system;
    game.checks = game.gameData.checks;
    game.commsList = game.gameData.commsList;
    game.viewX = game.gameData.interCoords[0];
    game.viewY = game.gameData.interCoords[1];
}

function planetConverter(bool)
{
    if (bool)
    {
        game.convertPlanets = [];
        for (var i = game.sceneryList.length - 1; i >= 0 ; i--)
        {
            if (game.sceneryList[i].type == "planet")
            {
                game.convertPlanets.push({
                        type: game.sceneryList[i].type,
                        X: game.sceneryList[i].X,
                        Y: game.sceneryList[i].Y,
                        extra: game.sceneryList[i].extra,
                        pricing: game.sceneryList[i].pricing,
                        desiredStock: game.sceneryList[i].desiredStock,
                        production: game.sceneryList[i].production,
                        shopContents: game.sceneryList[i].shopContents,
                        shipyardContents: game.sceneryList[i].shipyardContents,
                        dockingContents: game.sceneryList[i].dockingContents,
                        econo: game.sceneryList[i].econo,
                        star: game.sceneryList[i].star,
                        faction: game.sceneryList[i].faction,
                        system: game.sceneryList[i].system,
                        barcode: game.sceneryList[i].barcode
                    });
            }
        }
    }
    else
    {
        for (var i = game.convertPlanets.length - 1; i >= 0 ; i--)
        {
            for (var j = 0; j < game.sceneryList.length; j++)
            {
                if (game.sceneryList[j].extra == game.convertPlanets[i].extra && game.sceneryList[j].type == game.convertPlanets[i].type)
                {
                    game.sceneryList[j].X = game.convertPlanets[i].X;
                    game.sceneryList[j].Y = game.convertPlanets[i].Y;
                    game.sceneryList[j].pricing = game.convertPlanets[i].pricing;
                    game.sceneryList[j].desiredStock = game.convertPlanets[i].desiredStock;
                    game.sceneryList[j].production = game.convertPlanets[i].production;
                    game.sceneryList[j].shopContents = game.convertPlanets[i].shopContents;
                    game.sceneryList[j].shipyardContents = game.convertPlanets[i].shipyardContents;
                    game.sceneryList[j].dockingContents = game.convertPlanets[i].dockingContents;
                    game.sceneryList[j].econo = game.convertPlanets[i].econo;
                    game.sceneryList[j].star = game.convertPlanets[i].star;
                    game.sceneryList[j].faction = game.convertPlanets[i].faction;
                    game.sceneryList[j].system = game.convertPlanets[i].system;
                    game.sceneryList[j].barcode = game.convertPlanets[i].barcode;

                }
            }
        }
        game.convertPlanets = [];
    }
}
//// Put the object into storage
//localStorage.setItem('testObject', JSON.stringify(testObject));
//
//// Retrieve the object from storage
//var retrievedObject = localStorage.getItem('testObject');
//
//console.log('retrievedObject: ', JSON.parse(retrievedObject));