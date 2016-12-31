/**
 * Created by skyeguy on 8/28/16.
 */
function keyPressSensing(event)
{
    var key = event.keyCode || event.which;
    //console.log(event);

    if (key == 38)
    {
        game.upKey = true;
    }
    if (key == 40)
    {
        game.downKey = true;
    }
    if (key == 37)
    {
        game.leftKey = true;
    }
    if (key == 39)
    {
        game.rightKey = true;
    }
    if (key == 17)
    {
        game.ctrlKey = true;
    }
    if (key == 18)
    {
        game.altKey = true;
    }
    if (key == 87)
    {
        game.wKey = true;
    }
    if (key == 83)
    {
        game.sKey = true;
    }
    if (key == 68)
    {
        game.dKey = true;
    }
    if (key == 65)
    {
        game.aKey = true;
    }
    if (key == 189)
    {
        game.minusKey = true;
    }
    if (key == 187)
    {
        game.plusKey = true;
    }
    if (key == 80)
    {
        game.pKey = true;
    }
    if (key == 79)
    {
        game.oKey = true;
    }
    if (key == 67)
    {
        game.cKey = true;
    }
    if (key == 76)
    {
        game.lKey = true;
    }
    if (key == 192)
    {
        game.tildKey = true;
    }
    if (key == 81)
    {
        game.qKey = true;
    }
    if (key == 72)
    {
        game.hKey = true;
    }
    if (key == 82)
    {
        game.rKey = true;
    }
    if (key == 16)
    {
        game.shiftKey = true;
    }
    if (key == 32)
    {
        game.spaceKey = true;
    }
}

function keyReleaseSensing(event)
{
    var key = event.keyCode || event.which;

    if (key == 38)
    {
        game.upKey = false;
    }
    if (key == 40)
    {
        game.downKey = false;
    }
    if (key == 37)
    {
        game.leftKey = false;
    }
    if (key == 39)
    {
        game.rightKey = false;
    }
    if (key == 17)
    {
        game.ctrlKey = false;
    }
    if (key == 18)
    {
        game.altKey = false;
    }
    if (key == 87)
    {
        game.wKey = false;
    }
    if (key == 83)
    {
        game.sKey = false;
    }
    if (key == 68)
    {
        game.dKey = false;
    }
    if (key == 65)
    {
        game.aKey = false;
    }
    if (key == 189)
    {
        game.minusKey = false;
    }
    if (key == 187)
    {
        game.plusKey = false;
    }
    if (key == 80)
    {
        game.pKey = false;
    }
    if (key == 79)
    {
        game.oKey = false;
    }
    if (key == 67)
    {
        game.cKey = false;
    }
    if (key == 76)
    {
        game.lKey = false;
    }
    if (key == 192)
    {
        game.tildKey = false;
    }
    if (key == 81)
    {
        game.qKey = false;
    }
    if (key == 72)
    {
        game.hKey = false;
    }
    if (key == 82)
    {
        game.rKey = false;
    }
    if (key == 16)
    {
        game.shiftKey = false;
    }
    if (key == 32)
    {
        game.spaceKey = false;
    }
}

function mouseSensing(event)
{
    //console.log ("( " + game.mouseX + ", " + game.mouseY + " )");
    game.mouseX = event.offsetX; //this sets the mouse X coordinate.
    game.mouseY = event.offsetY; //this sets the mouse Y coordinate.
    game.MX = game.viewX + game.mouseX - 1/2 * game.c.width;
    game.MY = game.viewY + game.mouseY - 1/2 * game.c.height;
}