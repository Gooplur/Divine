/**
 * Created by skyeguy on 4/13/17.
 */

function interlistItemTransferMenu(list1, list2, context) //context is what the interlist is used for.
{
    game.state = "DivinePaused";
    game.scale = 1;

    game.x.save();
    game.x.translate(-1/2 * game.c.width, -1/2 * game.c.height);

    //Main Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(50), yyy(100), xxx(650), yyy(800));
    game.x.fill();
    game.x.stroke();

    //Box Title
    if (context == "Upgrade")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        //Upgrades title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Upgrades", xxx(325 + 82.5), yyy(70));
    }
    else if (context == "Transfer")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        //Upgrades title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(325 + 82.5), yyy(70));
    }
    else if (context == "Ammunition")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        //Ammo title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Ammunition", xxx(325 + 82.5), yyy(70));
    }
    else if (context == "Shop")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Checks: " + Math.floor(game.checks), xxx(82.5), yyy(90));
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Merchandise", xxx(325 + 82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Buy ~ " + (100 * game.interBuyRate) + "%  Sell ~ " + (100 * game.interSellRate) + "%", xxx(325 + 82.5), yyy(90));
    }
    else if (context == "Inventory")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
    }
    else if (context == "Docking")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Fleet", xxx(82.5), yyy(70));
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Docked Ships", xxx(325 + 82.5), yyy(70));
    }
    else if (context == "Shipyard")
    {
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Fleet", xxx(82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Checks: " + Math.floor(game.checks), xxx(82.5), yyy(90));
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Shipyard", xxx(325 + 82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Buy ~ " + (100 * game.interBuyRate) + "%  Sell ~ " + (100 * game.interSellRate) + "%", xxx(325 + 82.5), yyy(90));
    }
    else if (context == "Repair")
    {
        var playerShipNum = -1;
        for (var i = 0; i < game.shipsList.length; i++)
        {
            if (game.shipsList[i].player)
            {
                playerShipNum = i;
                break;
            }
        }
        //Cargo Hold title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Cargo Hold", xxx(82.5), yyy(70));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        //Shop title
        game.x.textAlign = "left";
        game.x.font = fonter(30, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Maintenance", xxx(325 + 82.5), yyy(50));
        game.x.textAlign = "left";
        game.x.font = fonter(14, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("Power: " + Math.round(game.shipsList[playerShipNum].power) + " / " + Math.round(game.shipsList[playerShipNum].powerMAX) + "  Integrity: " + Math.round(game.shipsList[playerShipNum].integrity) +" / " + Math.round(game.shipsList[playerShipNum].integrityMAX), xxx(325 + 82.5), yyy(90));
    }

    //Dividing Line
    game.x.beginPath();
    game.x.moveTo(xxx(375), yyy(100));
    game.x.lineTo(xxx(375), yyy(900));
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 2;
    game.x.stroke();

    //Description Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(706), yyy(100), xxx(250), yyy(800));
    game.x.fill();
    game.x.stroke();

    //Draggable Item Boxes LIST1
    for (var i = 0; i < list1.length; i++)
    {
        //Item Main Box
        if (list1[i].dragged == false)
        {
            game.x.beginPath();
            game.x.fillStyle = "#18181A";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51), yyy(100 + 32 * i), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();

            //Item Name
            game.x.textAlign = "left";
            game.x.font = fonter(10, "Arial");
            if (list1[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText(list1[i].name, xxx(56), yyy(100 + 21 + 32 * i));

            //Item Quantity
            game.x.textAlign = "right";
            game.x.font = fonter(10, "Arial");
            if (list1[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText("x " + list1[i].quantity, xxx(370), yyy(100 + 21 + 32 * i));
        }
        else //if the item is being dragged original slot looks void.
        {
            game.x.beginPath();
            game.x.fillStyle = "lightGrey";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51), yyy(100 + 32 * i), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();
        }

        //Item Selecting
        if (game.shiftKey != true && game.unclick && game.mouseX > xxx(51) && game.mouseX < xxx(51 + 319) && game.mouseY > yyy(100) + yyy(32) * i && game.mouseY < yyy(100 + 32) + yyy(32) * i)
        {
            game.unclick = false;
            if (list1[i].selected == false)
            {
                for (var j = 0; j < list1.length; j++)
                {
                    if (list1[j].selected == true)
                    {
                        list1[j].selected = false;
                    }
                }
                for (var j = 0; j < list2.length; j++)
                {
                    if (list2[j].selected == true)
                    {
                        list2[j].selected = false;
                    }
                }
                list1[i].selected = true;
            }
            else
            {
                list1[i].selected = false;
            }
        }

        //Item Click-to-Drag
        if (game.shiftKey == true && game.mouseX > xxx(51) && game.mouseX < xxx(51 + 319) && game.mouseY > yyy(100) + yyy(32) * i && game.mouseY < yyy(100 + 32) + yyy(32) * i)
        {
            var isOneAlreadyDragged = false;
            for (j = 0; j < list1.length; j++)
            {
                if (list1[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }
            for (j = 0; j < list2.length; j++)
            {
                if (list2[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }

            if (!isOneAlreadyDragged)
            {
                list1[i].dragged = true;
                game.draggedItem = list1[i];
            }
        }
    }
    //Draggable Item Boxes LIST2
    for (var i = 0; i < list2.length; i++)
    {
        //Item Main Box
        if (list2[i].dragged == false)
        {
            game.x.beginPath();
            game.x.fillStyle = "#18181A";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51 + 324), yyy(100 + 32 * i), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();

            //Item Name
            game.x.textAlign = "left";
            game.x.font = fonter(10, "Arial");
            if (list2[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText(list2[i].name, xxx(56 + 324), yyy(100 + 21 + 32 * i));

            //Item Quantity
            game.x.textAlign = "right";
            game.x.font = fonter(10, "Arial");
            if (list2[i].selected == false)
            {
                game.x.fillStyle = "white";
            }
            else
            {
                game.x.fillStyle = "orange";
            }
            game.x.fillText("x " + list2[i].quantity, xxx(370 + 324), yyy(100 + 21 + 32 * i));
        }
        else //if the item is being dragged original slot looks void.
        {
            game.x.beginPath();
            game.x.fillStyle = "lightGrey";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51 + 324), yyy(100 + 32 * i), xxx(324), yyy(30));
            game.x.fill();
            game.x.stroke();
        }

        //Item Selecting
        if (game.shiftKey != true && game.unclick && game.mouseX > xxx(51 + 324) && game.mouseX < xxx(51 + 319 + 324) && game.mouseY > yyy(100) + yyy(32) * i && game.mouseY < yyy(100 + 32) + yyy(32) * i)
        {
            game.unclick = false;
            if (list2[i].selected == false)
            {
                for (var j = 0; j < list2.length; j++)
                {
                    if (list2[j].selected == true)
                    {
                        list2[j].selected = false;
                    }
                }
                for (var j = 0; j < list1.length; j++)
                {
                    if (list1[j].selected == true)
                    {
                        list1[j].selected = false;
                    }
                }
                list2[i].selected = true;
            }
            else
            {
                list2[i].selected = false;
            }
        }

        //Item Click-to-Drag
        if (game.shiftKey == true && game.mouseX > xxx(51 + 324) && game.mouseX < xxx(51 + 319 + 324) && game.mouseY > yyy(100) + yyy(32) * i && game.mouseY < yyy(100 + 32) + yyy(32) * i)
        {
            var isOneAlreadyDragged = false;
            for (j = 0; j < list2.length; j++)
            {
                if (list2[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }
            for (j = 0; j < list1.length; j++)
            {
                if (list1[j].dragged)
                {
                    isOneAlreadyDragged = true;
                }
            }

            if (!isOneAlreadyDragged)
            {
                list2[i].dragged = true;
                game.draggedItem = list2[i];
            }
        }
    }

    game.unclick = false;

    //The process of Drag and Drop
    if (game.draggedItem != false)
    {
        //THE DRAGGED ITEM GOES TO THE MOUSE AND FOLLOWS IT
        game.x.beginPath();
        game.x.fillStyle = "#18181A";
        game.x.strokeStyle = "lightGrey";
        game.x.lineWidth = 1;
        game.x.rect(game.mouseX - 1/2 * xxx(324), game.mouseY -1/2 * xxx(30), xxx(324), yyy(30));
        game.x.fill();
        game.x.stroke();

        //Item Name
        game.x.textAlign = "left";
        game.x.font = fonter(10, "Arial");
        if (game.draggedItem.selected == false)
        {
            game.x.fillStyle = "white";
        }
        else
        {
            game.x.fillStyle = "orange";
        }
        game.x.fillText(game.draggedItem.name, game.mouseX - 1/2 * xxx(324) + xxx(5), game.mouseY - yyy(6));

        //Item Quantity
        game.x.textAlign = "right";
        game.x.font = fonter(10, "Arial");
        if (game.draggedItem.selected == false)
        {
            game.x.fillStyle = "white";
        }
        else
        {
            game.x.fillStyle = "orange";
        }
        game.x.fillText("x " + game.draggedItem.quantity, game.mouseX - 1/2 * xxx(324) + xxx(319), game.mouseY - yyy(6));

        //ONCE THE SHIFT KEY IS RELEASED THE ITEM IS DROPPED
        if (game.shiftKey == false)
        {
            if (game.mouseX > xxx(50) && game.mouseX < xxx(50 + 324) && game.mouseY > yyy(100) && game.mouseY < yyy(900))
            {
                var allowed = true;
                var listNum = Math.round((game.mouseY - yyy(100)) / yyy(32));
                var listHost = list1;

                //Find out which list the item is from
                for (j = 0; j < list2.length; j++)
                {
                    if (list2[j] === game.draggedItem)
                    {
                        listHost = list2;
                    }
                }

                //The item when placed in an empty part of the list ahead of the rest will go to the end of the list.
                if (listNum > list1.length)
                {
                    listNum = list1.length;
                }

                //Specific Restrictions
                if (listHost == list2 && list1.length >= game.interInvCargoMAX1 && context != "Shipyard" && context != "Docking")
                {
                    allowed = false;
                }
                else if (listHost == list1 && context == "Shop" || listHost == list1 && context == "Shipyard" || game.draggedItem.price > game.checks && context == "Shop" || game.draggedItem.price > game.checks && context == "Shipyard")
                {
                    allowed = false;
                }
                else if (listHost == list2 && context == "Repair")
                {
                    allowed = false;
                }
                else if (game.draggedItem.utility == "core" && context == "Upgrade")
                {
                    allowed = false;
                }

                //Middleman Restrictions
                if (context == "Shop" && allowed || context == "Shipyard" && allowed)
                {
                    game.checks -= game.interSellRate * game.draggedItem.price;
                    if (game.draggedItem.quantity > 1)
                    {
                        game.draggedItem.quantity -= 1;
                        allowed = false;
                        if (listNum >= list1.length)
                        {
                            list1.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                        }
                        else if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + 1 <= list1[listNum].maxStack)
                        {
                            list1[listNum].quantity += 1;
                        }
                        else
                        {
                            list1.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                        }
                    }
                }

                if (allowed)
                {
                    listHost.splice(listHost.indexOf(game.draggedItem), 1);
                    if (listNum >= list1.length)
                    {
                        list1.splice(listNum, 0, game.draggedItem);
                    }
                    else if (list1[listNum].name == game.draggedItem.name && list1[listNum].quantity + game.draggedItem.quantity <= list1[listNum].maxStack)
                    {
                        list1[listNum].quantity += game.draggedItem.quantity;
                    }
                    else
                    {
                        list1.splice(listNum, 0, game.draggedItem);
                    }
                }

                game.draggedItem.dragged = false;
                game.draggedItem = false;
            }
            else if (game.mouseX > xxx(50 + 324) && game.mouseX < xxx(50 + 324 + 324) && game.mouseY > yyy(100) && game.mouseY < yyy(900))
            {
                var allowed = true;
                var listNum = Math.round((game.mouseY - yyy(100)) / yyy(32));
                var listHost = list2;

                //Find out which list the item is from
                for (j = 0; j < list1.length; j++)
                {
                    if (list1[j] === game.draggedItem)
                    {
                        listHost = list1;
                    }
                }

                //The item when placed in an empty part of the list ahead of the rest will go to the end of the list.
                if (listNum > list2.length)
                {
                    listNum = list2.length;
                }

                //Specific Restrictions
                if (listHost == list1 && game.draggedItem.utility != "part" && context == "Upgrade")
                {
                    allowed = false;
                }
                else if (listHost == list1 && game.draggedItem.utility != "ammunition" && context == "Ammunition")
                {
                    allowed = false;
                }
                else if (listHost == list1 && context == "Upgrade")
                {
                    for (var i = 0; i < list2.length; i++)
                    {
                        if (list2[i].part == game.draggedItem.part)
                        {
                            allowed = false;
                        }
                    }
                }
                else if (listHost == list1 && context == "Transfer" && list2.length >= game.interInvCargoMAX2)
                {
                    allowed = false;
                }
                else if (context == "Inventory")
                {
                    allowed = false;
                }
                else if (listHost == list2 && context == "Shop" || listHost == list2 && context == "Shipyard")
                {
                    allowed = false;
                }
                else if (context == "Repair" && game.draggedItem.utility != "maintenance")
                {
                    allowed = false;
                }
                else if (game.draggedItem.utility == "core" && context == "Upgrade")
                {
                    allowed = false;
                }

                //Middleman Restrictions
                if (context == "Shop" && allowed || context == "Shipyard" && allowed) //selling items
                {
                    game.checks += game.interBuyRate * game.draggedItem.price;
                    if (game.draggedItem.quantity > 1)
                    {
                        game.draggedItem.quantity -= 1;
                        allowed = false;
                        if (listNum >= list2.length)
                        {
                            list2.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                        }
                        else if (list2[listNum].name == game.draggedItem.name && list2[listNum].quantity + 1 <= list2[listNum].maxStack)
                        {
                            list2[listNum].quantity += 1;
                        }
                        else
                        {
                            list2.splice(listNum, 0, itemize(game.draggedItem.name, 1));
                        }
                    }
                }
                else if (context == "Repair" && allowed)
                {
                    var playerShipNum = -1;
                    for (var i = 0; i < game.shipsList.length; i++)
                    {
                        if (game.shipsList[i].player)
                        {
                            playerShipNum = i;
                            break;
                        }
                    }
                    if (playerShipNum > -1)
                    {
                        game.shipsList[playerShipNum].power = Math.max(0, Math.min(game.shipsList[playerShipNum].powerMAX, game.shipsList[playerShipNum].power + game.draggedItem.charge));
                        game.shipsList[playerShipNum].integrity = Math.max(0, Math.min(game.shipsList[playerShipNum].integrityMAX, game.shipsList[playerShipNum].integrity + game.draggedItem.repair));

                        if (game.draggedItem.quantity > 1)
                        {
                            game.draggedItem.quantity -= 1;
                            allowed = false;
                        }
                        else
                        {
                            listHost.splice(listHost.indexOf(game.draggedItem), 1);
                            allowed = false;
                        }
                    }
                }

                if (allowed)
                {
                    listHost.splice(listHost.indexOf(game.draggedItem), 1);
                    if (listNum >= list2.length)
                    {
                        list2.splice(listNum, 0, game.draggedItem);
                    }
                    else if (list2[listNum].name == game.draggedItem.name && list2[listNum].quantity + game.draggedItem.quantity <= list2[listNum].maxStack)
                    {
                        list2[listNum].quantity += game.draggedItem.quantity;
                    }
                    else
                    {
                        list2.splice(listNum, 0, game.draggedItem);
                    }
                }

                game.draggedItem.dragged = false;
                game.draggedItem = false;
            }
            else
            {
                game.draggedItem.dragged = false;
                game.draggedItem = false;
            }
        }
    }
    game.x.restore();

    if (game.eKey)
    {
        game.eKey = false;
        game.state = "Divine";
        game.interInventory = false;
        if (context == "Shipyard" || context == "Docking")
        {
            shipConverter(false);
        }
    }
}

//screen positioning out of 1000 as standard for width and height.
function xxx(inputX)
{
    return (inputX / 1000) * game.c.width;
}

function yyy(inputY)
{
    return (inputY / 1000) * game.c.height;
}

function fonter(size, font) //Go with arial font for this games menus.
{
    return (size * 1/1000 * game.c.width) + "px " + font;
}