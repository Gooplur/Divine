/**
 * Created by skyeguy on 8/30/16.
 */
function explosion(x, y, size, quantity, spread, colourList)
{
    var self = this;

    for (var i = 0; i < quantity; i++)
    {
        game.animationsList.push(new Xploder(x + Math.random() * spread - 1/2 * spread, y + Math.random() * spread - 1/2 * spread, size, colourList[Math.floor(Math.random() * colourList.length)]));
    }
}

function Xploder(xx, yy, size, colour)
{
    this.zindex = 1;
    this.animate = function(z)
    {
        if (z == this.zindex)
        {
            if (typeof(this.sz) == "undefined")
            {
                this.sz = 1;
            }

            if (this.sz < size)
            {
                this.sz += 0.25;

                if (size >= 1500)
                {
                    this.sz += 30;
                }
                else if (size >= 900)
                {
                    this.sz += 25;
                }
                else if (size >= 500)
                {
                    this.sz += 12;
                }
                else if (size >= 200)
                {
                    this.sz += 4.75;
                }
                else if (size >= 100)
                {
                    this.sz += 0.75;
                }
                circle(true, xx, yy, this.sz, 0, 2*Math.PI, colour, false, "none", false, 0, Math.min(1, (this.sz / 2)/size));
            }
            else
            {
                for (var i = 0; i < game.animationsList.length; i++)
                {
                    if (game.animationsList[i] === this)
                    {
                        game.animationsList.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
}