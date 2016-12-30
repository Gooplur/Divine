/**
 * Created by skyeguy on 8/28/16.
 */
//The navigator is the disembodied player when they are not driving a ship.

//Basic Navigator Controls
function navigator()
{
    if (game.mode == "navigator")
    {
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
    }
}