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

