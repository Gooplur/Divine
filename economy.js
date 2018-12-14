/**
 * Created by skyelipson on 12/13/18.
 */

function Economy()
{
    this.traderGoods = [];
    this.bestDeals = [];
    this.prospectiveSales = [];
    this.econTime = new Date().getTime();

    this.econ = function()
    {
        if (new Date().getTime() - this.econTime > 12 * 1000 * 60) //every 12 minutes...
        {
            for (var i = 0; i < game.sceneryList.length; i++)
            {
                if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
                {
                    //local entropy of parts

                }
            }
            for (var i = 0; i < game.sceneryList.length; i++)
            {
                if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
                {
                    //production
                    this.bestDeals = [];
                    this.doProduction(i);
                }
            }
            for (var i = 0; i < game.sceneryList.length; i++)
            {
                if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
                {
                    //purchasing
                    this.doPurchasing(i);
                }
            }
            for (var i = 0; i < game.sceneryList.length; i++)
            {
                if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
                {
                    //selling (redistributing)
                    this.doSelling(i);
                    this.traderGoods = [];
                }
            }
        }
    };
    //this.econ();

    this.testRun = function()
    {
        for (var i = 0; i < game.sceneryList.length; i++)
        {
            if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
            {
                //production
                this.bestDeals = [];
                this.doProduction(i);
            }
        }
        for (var i = 0; i < game.sceneryList.length; i++)
        {
            if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
            {
                //purchasing
                this.doPurchasing(i);
            }
        }
        for (var i = 0; i < game.sceneryList.length; i++)
        {
            if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
            {
                //selling (redistributing)
                this.doSelling(i);
                this.traderGoods = [];
            }
        }
    };

    this.doPurchasing = function(i)
    {
        //browsing
        for (var j = 0; j < game.sceneryList[i].desiredStock.length; j++)
        {
            var cantidad = 0;
            var loc = i;
            var loc2 = [];

            for (var k = 0; k < game.sceneryList[i].shopContents.length; k++)
            {
                if (game.sceneryList[i].desiredStock[j][0] == game.sceneryList[i].shopContents[k].name)
                {
                    cantidad += game.sceneryList[i].shopContents[k].quantity;
                    loc2.push(k);
                }
            }

            var randBuy = Math.round(cantidad * 2/3 * Math.random());

            var hasIt = false;
            for (var l = 0; l < this.bestDeals.length; l++)
            {
                if (this.bestDeals[l].name == game.sceneryList[i].desiredStock[j][0])
                {
                    hasIt = true;
                    if (this.bestDeals[l].need < (cantidad - game.sceneryList[i].desiredStock[j][1]))
                    {
                        this.bestDeals[l].location = loc;
                        this.bestDeals[l].location2 = loc2;
                        this.bestDeals[l].need = (cantidad - game.sceneryList[i].desiredStock[j][1]);
                        if (randBuy > 0)
                        {
                            this.bestDeals[l].amt = this.bestDeals[l].need;
                        }
                        else
                        {
                            this.bestDeals[l].amt = 1;
                        }
                    }
                }
            }
            if (hasIt == false)
            {
                this.bestDeals.push({name: game.sceneryList[i].desiredStock[j][0], need: (cantidad - game.sceneryList[i].desiredStock[j][1]), location: loc, location2: loc2, amt: Math.max(1, randBuy)});
            }
        }
        var notConsidered = [];
        var unknownItmName = -1;
        var hitzz = 0;

        for (var k = 0; k < game.sceneryList[i].shopContents.length; k++)
        {
            for (var jj = 0; jj < game.sceneryList[i].desiredStock.length; jj++)
            {
                if (game.sceneryList[i].shopContents[k].name != game.sceneryList[i].desiredStock[jj][0])
                {
                    hitzz += 1;
                }
            }

            if (hitzz >= game.sceneryList[i].desiredStock.length)
            {
                var adddToList = true;
                if (notConsidered.length > 0)
                {
                    for (var kk = 0; kk < notConsidered.length; kk++)
                    {
                        if (game.sceneryList[i].shopContents[k].name == notConsidered[kk].name)
                        {
                            adddToList = false;
                        }
                    }
                }
                else
                {
                    adddToList = true;
                }

                if (adddToList == true)
                {
                    notConsidered.push(game.sceneryList[i].shopContents[k]);
                }
            }
        }


        for (var kk = 0; kk < notConsidered.length; kk++)
        {
            var numbah = 0;
            var locc2 = [];
            unknownItmName = notConsidered[kk].name;
            for (var k = 0; k < game.sceneryList[i].shopContents.length; k++)
            {
                if (unknownItmName == game.sceneryList[i].shopContents[k].name)
                {
                    numbah += game.sceneryList[i].shopContents[k].quantity;
                    loc2.push(k);
                }
            }

            if (numbah > 0)
            {
                var hasIt = false;
                var buyRand = Math.round(numbah * 2/3 * Math.random());

                if (buyRand > 0)
                {
                    for (var l = 0; l < this.bestDeals.length; l++)
                    {
                        if (this.bestDeals[l].name == unknownItmName)
                        {

                            if (this.bestDeals[l].need <= -1)
                            {
                                this.bestDeals[l].location = i;
                                this.bestDeals[l].location2 = locc2;
                                this.bestDeals[l].need = 0;
                                this.bestDeals[l].amt = buyRand;
                            }
                        }
                    }
                    if (hasIt == false)
                    {
                        this.bestDeals.push({name: unknownItmName, need: 0, location: i, location2: locc2, amt: buyRand});
                    }
                }
            }
        }

        //shopping cart

        var purchaseAMT = Math.floor((1/3 * this.bestDeals.length) + (2/3 * this.bestDeals.length * Math.random())); //how much will actually be purchased

        var orderingList = [];

        for (var j = 0; j < this.bestDeals.length; j++)
        {
            var needz = -1000;
            var needzNum = -1;

            for (var l = 0; l < this.bestDeals.length; l++)
            {
                var wasHit = false;
                for (var ll = 0; ll < this.bestDeals.length; ll++)
                {
                    if (this.bestDeals.indexOf(orderingList[ll]) == l)
                    {
                        wasHit = true;
                        break;
                    }
                }
                if (this.bestDeals[l].need > needz && wasHit == false)
                {
                    needz = this.bestDeals[l].need;
                    needzNum = l;
                }
            }
            orderingList.push(this.bestDeals[needzNum]);
        }
        this.bestDeals = orderingList;

        //console.log(this.bestDeals[0]);
        for (var j = 0; j < purchaseAMT; j++)
        {
            this.traderGoods.push([this.bestDeals[j].name, this.bestDeals[j].amt]);
            //console.log(this.traderGoods);

            var numToBuy = this.bestDeals[j].amt;

            for (var jj = this.bestDeals[j].location2.length -1; jj >= 0; jj--)
            {
                var prodToBuy = game.sceneryList[this.bestDeals[j].location].shopContents[this.bestDeals[j].location2[jj]];

                if ((prodToBuy.quantity - numToBuy) > 0)
                {
                    prodToBuy.quantity -= numToBuy;
                    break;
                }
                else if (prodToBuy.quantity != 0)
                {
                    numToBuy -= prodToBuy.quantity;
                    prodToBuy.quantity = 0;

                }
            }
        }
        this.bestDeals = [];
        for (var jj = game.sceneryList[i].shopContents.length -1; jj >= 0; jj--)
        {
            if (game.sceneryList[i].shopContents[jj].quantity <= 0)
            {
                game.sceneryList[i].shopContents.splice(jj, 1);
            }
        }
    };

    this.doSelling = function(i)
    {
        var goodsSold = 0;
        var soldOff = [];


        this.prospectiveSales = [];
        //plan sales that would earn the most money
        for (var jk = 0; jk < this.traderGoods.length; jk++)
        {
            for (var l = 0; l < game.sceneryList[i].desiredStock.length; l++)
            {
                if (game.sceneryList[i].desiredStock[l][0] == this.traderGoods[jk][0])
                {
                    var cantidad = 0;
                    for (var k = 0; k < game.sceneryList[i].shopContents.length; k++)
                    {
                        cantidad += game.sceneryList[i].shopContents[k].quantity;
                    }
                    var need = game.sceneryList[i].desiredStock[l][1] - cantidad;

                    this.prospectiveSales.push({name: this.traderGoods[jk][0], need: need, location: i, amt: Math.max(need, 1)});
                    break;
                }
            }
        }

        //sort potential sales by highest potential gain

        var orderingList = [];

        for (var jl = 0; jl < this.prospectiveSales.length; jl++)
        {
            var needz = -1000;
            var needzNum = -1;

            for (var l = 0; l < this.prospectiveSales.length; l++)
            {
                var wasHit = false;
                for (var ll = 0; ll < this.prospectiveSales.length; ll++)
                {
                    if (this.prospectiveSales.indexOf(orderingList[ll]) == l)
                    {
                        wasHit = true;
                        break;
                    }
                }
                if (this.prospectiveSales[l].need > needz && wasHit == false)
                {
                    needz = this.prospectiveSales[l].need;
                    needzNum = l;
                }
            }
            orderingList.push(this.prospectiveSales[needzNum]);
        }
        this.prospectiveSales = orderingList;

        //make the sales (the top 1/3 of the sales)
        var topSales = Math.round(this.prospectiveSales.length / 3);

        for (var jl = 0; jl < topSales; jl++)
        {
            for (var j = 0; j < game.sceneryList[this.prospectiveSales[jl].location].shopContents.length; j++)
            {
                for (var jk = 0; jk < this.traderGoods.length; jk++)
                {
                    if (this.traderGoods[jk][0] == this.prospectiveSales[jl].name && game.sceneryList[this.prospectiveSales[jl].location].shopContents[j].name == this.prospectiveSales[jl].name)
                    {

                    }
                }
            }
        }


    };

    this.doProduction = function(i)
    {
        for (var j = 0; j < game.sceneryList[i].production.length; j++)
        {
            var prodNum = Math.round(game.sceneryList[i].production[j][1] * Math.random());
            var testItm = itemize(game.sceneryList[i].production[j][0], 1);
            var itmStakz = 1;
            var newProd = 0;
            if (testItm.maxStack <= prodNum)
            {
                if (prodNum > 0)
                {

                    for (var l = 0; l < game.sceneryList[i].shopContents.length; l++)
                    {
                        if (game.sceneryList[i].shopContents[l].name == testItm.name && game.sceneryList[i].shopContents[l].quantity < testItm.maxStack)
                        {
                            var amountToFill = game.sceneryList[i].shopContents[l].maxStack - game.sceneryList[i].shopContents[l].quantity;

                            if (amountToFill > prodNum)
                            {
                                prodNum = 0;
                                game.sceneryList[i].shopContents[l].quantity += prodNum;
                            }
                            else
                            {
                                prodNum -= amountToFill;
                                game.sceneryList[i].shopContents[l].quantity = game.sceneryList[i].shopContents[l].maxStack;
                            }
                        }
                    }
                    if (prodNum > 0)
                    {
                        game.sceneryList[i].shopContents.push(itemize(game.sceneryList[i].production[j][0], game.sceneryList[i].production[j][1]));
                    }
                }
            }
            else
            {
                for (var l = 0; l < game.sceneryList[i].shopContents.length; l++)
                {
                    if (game.sceneryList[i].shopContents[l].name == testItm.name && game.sceneryList[i].shopContents[l].quantity < testItm.maxStack)
                    {
                        var amountToFill = game.sceneryList[i].shopContents[l].maxStack - game.sceneryList[i].shopContents[l].quantity;

                        if (amountToFill > prodNum)
                        {
                            prodNum = 0;
                            game.sceneryList[i].shopContents[l].quantity += prodNum;
                        }
                        else
                        {
                            prodNum -= amountToFill;
                            game.sceneryList[i].shopContents[l].quantity = game.sceneryList[i].shopContents[l].maxStack;
                        }
                    }
                }
                if (prodNum > 0)
                {
                    itmStakz = Math.floor(prodNum / testItm.maxStack);
                    newProd = prodNum % testItm.maxStack;

                    for (var k = 0; k < itmStakz; k++)
                    {
                        game.sceneryList[i].shopContents.push(itemize(game.sceneryList[i].production[j][0], testItm.maxStack));
                    }
                    if (newProd > 0)
                    {
                        game.sceneryList[i].shopContents.push(itemize(game.sceneryList[i].production[j][0], newProd));
                    }
                }
            }
        }
    };
}