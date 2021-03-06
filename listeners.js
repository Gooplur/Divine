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
    if (key == 69)
    {
        game.eKey = true;
    }
    if (key == 73)
    {
        game.iKey = true;
    }
    if (key == 85)
    {
        game.uKey = true;
    }
    if (key == 89)
    {
        game.yKey = true;
    }
    if (key == 75)
    {
        game.kKey = true;
    }
    if (key == 74)
    {
        game.jKey = true;
    }
    if (key == 86)
    {
        game.vKey = true;
    }
    if (key == 88)
    {
        game.xKey = true;
    }
    if (key == 90)
    {
        game.zKey = true;
    }
    if (key == 84)
    {
        game.tKey = true;
    }
    if (key == 77)
    {
        game.mKey = true;
    }
    if (key == 16)
    {
        game.shiftKey = true;
    }
    if (key == 32)
    {
        game.spaceKey = true;
    }
    if (key == 9)
    {
        game.tabKey = true;
    }
    if (key == 8)
    {
        game.deleteKey = true;
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
    if (key == 69)
    {
        game.eKey = false;
    }
    if (key == 73)
    {
        game.iKey = false;
    }
    if (key == 85)
    {
        game.uKey = false;
    }
    if (key == 89)
    {
        game.yKey = false;
    }
    if (key == 75)
    {
        game.kKey = false;
    }
    if (key == 74)
    {
        game.jKey = false;
    }
    if (key == 86)
    {
        game.vKey = false;
    }
    if (key == 88)
    {
        game.xKey = false;
    }
    if (key == 90)
    {
        game.zKey = false;
    }
    if (key == 84)
    {
        game.tKey = false;
    }
    if (key == 77)
    {
        game.mKey = false; //this.solarMap
    }
    if (key == 16)
    {
        game.shiftKey = false;
    }
    if (key == 32)
    {
        game.spaceKey = false;
    }
    if (key == 9)
    {
        game.tabKey = false;
    }
    if (key == 8)
    {
        game.deleteKey = false;
    }
}

function mouseSensing(event)
{
    //console.log ("( " + game.mouseX + ", " + game.mouseY + " )");
    game.mouseX = event.offsetX; //this sets the mouse X coordinate.
    game.mouseY = event.offsetY; //this sets the mouse Y coordinate.
    game.MX = (((game.mouseX - 1/2 * game.c.width) / game.scale) + game.viewX);
    game.MY = (((game.mouseY - 1/2 * game.c.height) / game.scale) + game.viewY);
    game.worldMouse = {X: game.MX, Y: game.MY};
}

function mouseClick()
{
    game.click = true;
    //game.unclick = false; //this is still here as a warning... DO NOT SET UNCLICK TO FALSE ON CLICK!
}

function doubleClick()
{
    game.dClick = true;
}

function mouseRelease()
{
    game.unclick = true;
    game.click = false;
}