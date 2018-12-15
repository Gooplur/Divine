/**
 * Created by skyelipson on 12/13/18.
 */

function Economy()
{
    this.traderGoods = [];
    this.bestDeals = [];
    this.prospectiveSales = [];
    this.econTime = new Date().getTime();
    this.bienes = [];
    this.particpantes = 0;
    this.numEach = 0;

    this.econ = function()
    {
        if (new Date().getTime() - this.econTime > 12 * 1000 * 60) //every 12 minutes... //12 * 1000 * 60
        {
            this.econTime = new Date().getTime();
            this.participantes = 0;

            for (var i = 0; i < game.sceneryList.length; i++)
            {
                if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
                {
                    this.participantes += 1;
                    //local entropy of parts
                    for (var j = game.sceneryList[i].shopContents.length - 1; j >= 0; j--)
                    {
                        if (game.sceneryList[i].shopContents[j].utility == "part")
                        {
                            game.sceneryList[i].shopContents.splice(j, 1);
                        }
                    }
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
            this.numEach = Math.round(this.traderGoods.length / this.participantes);
            for (var i = 0; i < game.sceneryList.length; i++)
            {
                if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
                {
                    //selling (redistributing)
                    this.doSelling(i);
                }
            }
            for (var i = 0; i < game.sceneryList.length; i++)
            {
                if (game.sceneryList[i].type == "planet" && game.sceneryList[i].econo == true)
                {
                    //local entropy of stock
                    if (game.sceneryList[i].shopContents.length > 60)
                    {
                        for (var j = game.sceneryList[i].shopContents.length - 1; j > 60; j--)
                        {
                            game.sceneryList[i].shopContents.splice(j, 1);
                        }
                    }

                }
            }
            this.traderGoods = [];
        }
    };
    //this.econ();

    this.testRun = function()
    {

    };

    this.doPurchasing = function(i)
    {
        //this.bestDeals = [];
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
                    var tmp = game.sceneryList[i].shopContents[k].quantity;
                    if (isNaN(tmp))
                        //console.log("HERE");
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
                    if (this.bestDeals[l].need < (cantidad / game.sceneryList[i].desiredStock[j][1]))
                    {
                        this.bestDeals[l].location = loc;
                        this.bestDeals[l].location2 = loc2;
                        this.bestDeals[l].need = (cantidad / game.sceneryList[i].desiredStock[j][1]);
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
                this.bestDeals.push({name: game.sceneryList[i].desiredStock[j][0], need: (cantidad / game.sceneryList[i].desiredStock[j][1]), location: loc, location2: loc2, amt: Math.max(1, randBuy)});
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

        var dudz = [];
        var cleanedGoods = [];

        //merge duplicates
        for (var j = 0; j < this.traderGoods.length; j++)
        {
            var isRepeat = false;
            for (var ll = 0; ll < dudz.length; ll++)
            {
                if (this.traderGoods[j][0] == dudz[ll][0])
                {
                    isRepeat = true;
                }
            }
            if (isRepeat == false)
            {
                var ammtt = this.traderGoods[j][1];
                for (var jj = 0; jj < this.traderGoods.length; jj++)
                {
                    if (dudz.length < 1)
                    {
                        if (this.traderGoods[j][0] == this.traderGoods[jj][0] && j != jj)
                        {
                            ammtt += this.traderGoods[jj][1];
                            dudz.push(this.traderGoods[jj]);
                        }
                    }
                    else
                    {
                        var  isADud = false;
                        for (var l = 0; l < dudz.length; l++)
                        {
                            if (this.traderGoods[jj][0] == dudz[l][0] && jj == dudz[l][1])
                            {
                                isADud = true;
                            }
                        }

                        if (this.traderGoods[j][0] == this.traderGoods[jj][0] && j != jj && isADud == false)
                        {
                            ammtt += this.traderGoods[jj][1];
                            dudz.push([this.traderGoods[jj][0], jj]);
                        }
                    }
                }
                cleanedGoods.unshift([this.traderGoods[j][0], ammtt]);
            }
        }
        this.traderGoods = cleanedGoods;
    };

    this.doSelling = function(i) //random redistribution of the goods that have been strategically purchased...
    {
        //turn goods into items
        this.bienes = [];
        for (var j = 0; j < this.traderGoods.length; j++)
        {
            var testItm = itemize(this.traderGoods[j][0], 1);

            if (this.traderGoods[j][1] != 0)
            {
                if (this.traderGoods[j][1] <= testItm.maxStack)
                {
                    this.bienes.push(itemize(this.traderGoods[j][0], this.traderGoods[j][1]));
                }
                else
                {
                    var stackNum = Math.floor(this.traderGoods[j][1] / testItm.maxStack);
                    var residualNum = Math.floor(this.traderGoods[j][1] % testItm.maxStack);

                    for (var l = 0; l < stackNum; l++)
                    {
                        this.bienes.push(itemize(this.traderGoods[j][0], testItm.maxStack));
                    }
                    if (residualNum > 0)
                    {
                        this.bienes.push(itemize(this.traderGoods[j][0], residualNum));
                    }
                }
            }
        }

        //randomize the list
        var hechoRandomizado = [];
        var hacerloRandom = [{name: "spoon7"}, {name: "spoon7"}, {name: "spoon7"}, {name: "spoon7"}, {name: "spoon7"}, {name: "spoon7"}, {name: "spoon7"}];

        for (var j = 0; j < this.bienes.length; j++)
        {
            hacerloRandom.splice(Math.floor(Math.random() * hacerloRandom.length), 0, this.bienes[j]);
        }
        for (var j = 0; j < hacerloRandom.length; j++)
        {
            if (hacerloRandom[j].name != "spoon7")
            {
                if (Math.random() > 0.5)
                {
                    hechoRandomizado.unshift(hacerloRandom[j]);
                }
                else
                {
                    hechoRandomizado.push(hacerloRandom[j]);
                }
            }
        }
        this.bienes = hechoRandomizado;

        //repartir a todos los participantes
        for (var jj = this.numEach - 1; jj >= 0; jj--)
        {
            if (jj >= 0 && jj < this.bienes.length)
            {
                if (Math.random() > 0.5)
                {
                    game.sceneryList[i].shopContents.unshift(this.bienes[jj]);
                }
                else
                {
                    game.sceneryList[i].shopContents.push(this.bienes[jj]);
                }
                this.bienes.splice(jj, 1);

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