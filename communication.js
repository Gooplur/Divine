/**
 * Created by skyelipson on 12/13/18.
 */
function commsArray()
{
    game.state = "DivinePaused";
    game.scale = 1;

    var commsTrash = [];

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

    //Title
    game.x.textAlign = "center";
    game.x.font = fonter(30, "Arial");
    game.x.fillStyle = "white";
    game.x.fillText("Communications Array", xxx(453), yyy(70));

    //Description Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(706), yyy(100), xxx(250), yyy(800));
    game.x.fill();
    game.x.stroke();

    //scrollUp
    if (game.mouseX > xxx(51) && game.mouseX < xxx(699) && game.mouseY > yyy(100) && game.mouseY < yyy(160))
    {
        game.x.beginPath();
        game.x.fillStyle = "white";
        game.x.strokeStyle = "#18181A";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(100), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();

        if (game.unclick)
        {
            game.unclick = false;
            if (game.commsScroll > 0)
            {
                game.commsScroll -= 1;
            }
        }
    }
    else
    {
        game.x.beginPath();
        game.x.fillStyle = "#18181A";
        game.x.strokeStyle = "lightGrey";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(100), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();
    }

    //scrollDown
    if (game.mouseX > xxx(51) && game.mouseX < xxx(699) && game.mouseY > yyy(840) && game.mouseY < yyy(900))
    {
        game.x.beginPath();
        game.x.fillStyle = "white";
        game.x.strokeStyle = "#18181A";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(840), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();

        if (game.unclick)
        {
            game.unclick = false;
            if (game.commsScroll < (game.aiList.length - 1))
            {
                game.commsScroll += 1;
            }
        }
    }
    else
    {
        game.x.beginPath();
        game.x.fillStyle = "#18181A";
        game.x.strokeStyle = "lightGrey";
        game.x.lineWidth = 1;
        game.x.rect(xxx(51), yyy(840), xxx(649), yyy(60));
        game.x.fill();
        game.x.stroke();
    }

    for (var i = game.commsScroll; i < game.commsList.length; i++)
    {
        if (game.commsList[i].active == false)
        {
            game.x.beginPath();
            game.x.fillStyle = "#18181A";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51), yyy(160 + (32 * (i - game.commsScroll))), xxx(649), yyy(30));
            game.x.fill();
            game.x.stroke();
        }
        else
        {
            game.x.beginPath();
            game.x.fillStyle = "navy";
            game.x.strokeStyle = "lightGrey";
            game.x.lineWidth = 1;
            game.x.rect(xxx(51), yyy(160 + (32 * (i - game.commsScroll))), xxx(649), yyy(30));
            game.x.fill();
            game.x.stroke();
        }


        if (game.mouseX > xxx(51) && game.mouseX < xxx(699) && game.mouseY > yyy(160 + (32 * (i - game.commsScroll))) && game.mouseY < yyy(160 + 30  + (32 * (i - game.commsScroll))) && game.unclick)
        {
            game.unclick = false;
            if (game.commsList[i].selected == false)
            {
                for (var j = 0; j < game.commsList.length; j++)
                {
                    game.commsList[j].selected = false;
                }
                game.commsList[i].selected = true;
                if (game.commsList[i].active == true)
                {
                    game.commsSelect = game.commsList[i].id;
                }
            }
            else
            {
                game.commsList[i].selected = false;
                game.commsSelect = "none";
            }
        }

        //Item Name
        game.x.textAlign = "left";
        if (game.commsList[i].active == false)
        {
            game.x.font = fonter(10, "Arial");
        }
        else
        {
            game.x.font = fonter(11, "Arial");
        }
        if (game.commsList[i].selected == false)
        {
            game.x.fillStyle = "white";
        }
        else
        {
            game.x.fillStyle = "orange";
        }
        game.x.fillText(game.commsList[i].sender, xxx(56), yyy(160 + 21 + 32 * (i - game.commsScroll)));

        if (game.commsList[i].selected == true)
        {
            //name
            if (game.commsList[i].active == false)
            {
                game.x.textAlign = "center";
                game.x.font = fonter(14, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText("Sub: " + game.commsList[i].subject, xxx(706 + 125), yyy(136));

                game.x.textAlign = "center";
                game.x.font = fonter(12, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText("Recieved Message", xxx(706 + 125), yyy(166));
            }
            else
            {
                game.x.textAlign = "center";
                game.x.font = fonter(14, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText(game.commsList[i].subject, xxx(706 + 125), yyy(136));

                game.x.textAlign = "center";
                game.x.font = fonter(12, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText("Communication Link", xxx(706 + 125), yyy(166));
            }

            //message or summary of potential communication
            var xPos = 0;
            var yPos = 0;
            var thisto = 0;
            for (var k = 0; k < game.commsList[i].summary.length; k++)
            {
                game.x.textAlign = "left";
                game.x.font = fonter(10, "Arial");
                game.x.fillStyle = "white";
                game.x.fillText(game.commsList[i].summary[k], xxx(706 + 8 + xPos), yyy(350 + yPos));
                thisto = game.commsList[i].summary[k];

                if (thisto == " " || thisto == "f" || thisto == "r")
                {
                    xPos += 4;
                }
                else if (thisto == "t")
                {
                    xPos += 3.5;
                }
                else if (thisto == "i")
                {
                    xPos += 3;
                }
                else if (thisto == "j" || thisto == "l" || thisto == "'" || thisto == "," || thisto == ".")
                {
                    xPos += 2.7;
                }
                else if (thisto == "s")
                {
                    xPos += 5;
                }
                else if (thisto == "m" || thisto == "w" || thisto == "A")
                {
                    xPos += 8;
                }
                else if (thisto == "o" || thisto == "a" || thisto == "t" || thisto == "n" || thisto == "e")
                {
                    xPos += 5.5
                }
                else
                {
                    xPos += 6;
                }

                if (xPos > 232)
                {
                    if (game.commsList[i].summary[k] != "-" && game.commsList[i].summary[k] != " " && game.commsList[i].summary[k + 1] != " " && game.commsList[i].summary[k + 1] != "." && game.commsList[i].summary[k + 1] != "!" && game.commsList[i].summary[k + 1] != "?" && game.commsList[i].summary[k + 1] != ")" && game.commsList[i].summary[k + 1] != "," && game.commsList[i].summary[k + 1] != ";" && game.commsList[i].summary[k + 1] != "'" && game.commsList[i].summary[k + 1] != "-")
                    {
                        game.x.textAlign = "left";
                        game.x.font = fonter(10, "Arial");
                        game.x.fillStyle = "white";
                        game.x.fillText("-", xxx(706 + 8 + xPos), yyy(350 + yPos));
                    }
                    xPos = 0;
                    yPos += 19;
                }
            }

            if (game.deleteKey)
            {
                game.deleteKey = false;
                if (game.commsList[i].id != "peter")
                {
                    game.commsList[i].selected = false;
                    game.commsSelect = "none";
                    commsTrash.push(game.commsList[i]);
                }
            }
        }
    }

    game.x.restore();

    if (game.eKey)
    {
        for (var i = 0; i < game.commsList.length; i++)
        {
            if (game.commsList[i].selected)
            {
                if (game.commsList[i].active == true)
                {
                    game.commsConfirm = true;
                }
                game.commsList[i].selected = false;
                break;
            }
        }
        game.eKey = false;
        if (game.commsConfirm == true)
        {
            game.activeCommunication = true;
            var com = -1;
            var spoot = 0;
            for (var j = 0; j < game.commsList.length; j++)
            {
                if (game.commsList[j].id == game.commsSelect)
                {
                    com = game.commsList[j];
                }
            }
            if (com != -1)
            {
                spoot = com.spot;
            }
            if (spoot == 0)
            {
                game.comvo = -1;
            }
            else
            {
                game.comvo = spoot;
            }
            game.comvoResponse = -1;
            game.commsConfirm = false;
        }
        else
        {
            game.state = "Divine";
            game.commsMenu = false;
        }
    }

    //delete item from comms list at player request
    for (var i = commsTrash.length - 1; i >= 0; i--)
    {
        for (var j = game.commsList.length - 1; j >= 0; j--)
        {
            if (commsTrash[i].id == game.commsList[j].id)
            {
                game.commsList.splice(j, 1);
            }
        }
    }

    //delete items from comms list if the solar system does not match specifications
    for (var j = game.commsList.length - 1; j >= 0; j--)
    {
        if (game.commsList[j].system != false)
        {
            if (game.commsList[j].system != game.system)
            {
                game.commsList.splice(j, 1);
            }
        }
    }
}

function communications() //TODO this is the dialogue system for the game
{
    game.state = "DivinePaused";
    game.scale = 1;

    var comvo = getComms(game.commsSelect);
    if (game.comvo != -1)
    {
        comvo = game.comvo;
    }

    game.x.save();
    game.x.translate(-1/2 * game.c.width, -1/2 * game.c.height);

    //Main Box
    game.x.beginPath();
    game.x.fillStyle = "#18181A";
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.rect(xxx(50), yyy(100), xxx(900), yyy(60));
    game.x.fill();
    game.x.stroke();

    //Title
    game.x.textAlign = "center";
    game.x.font = fonter(30, "Arial");
    game.x.fillStyle = "white";
    game.x.fillText("Active Transmission", xxx(503), yyy(70));

    //main circle
    game.x.beginPath();
    if (comvo == false)
    {
        game.x.fillStyle = "#18181A";
    }
    else
    {
        game.x.fillStyle = "navy";
    }
    game.x.strokeStyle = "lightGrey";
    game.x.lineWidth = 3;
    game.x.arc(xxx(500), yyy(535), 120, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
    game.x.fill();
    game.x.stroke();

    if (comvo == false)
    {
        //Title
        game.x.textAlign = "center";
        game.x.font = fonter(20, "Arial");
        game.x.fillStyle = "white";
        game.x.fillText("NO SIGNAL", xxx(503), yyy(550));
    }
    else
    {
        //subCircles (max 9)
        var circleSelected = -1;
        var circleHovered = -1;


        if (comvo.length == 1)
        {
            //sub circle 1
            if (((game.mouseX - xxx(500))*(game.mouseX - xxx(500)) + (game.mouseY - yyy(785))*(game.mouseY - yyy(785))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length == 2)
        {
            //sub circle 1
            if (((game.mouseX - xxx(450))*(game.mouseX - xxx(450)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 2
            if (((game.mouseX - xxx(550))*(game.mouseX - xxx(550)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 1;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length == 3)
        {
            //sub circle 1
            if (((game.mouseX - xxx(500))*(game.mouseX - xxx(500)) + (game.mouseY - yyy(785))*(game.mouseY - yyy(785))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            //sub circle 2
            if (((game.mouseX - xxx(400))*(game.mouseX - xxx(400)) + (game.mouseY - yyy(725))*(game.mouseY - yyy(725))) <= 50*50)
            {
                circleHovered = 1;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(400), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(400), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 3
            if (((game.mouseX - xxx(600))*(game.mouseX - xxx(600)) + (game.mouseY - yyy(725))*(game.mouseY - yyy(725))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 2;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(600), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(600), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length == 4)
        {
            //sub circle 1
            if (((game.mouseX - xxx(450))*(game.mouseX - xxx(450)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 2
            if (((game.mouseX - xxx(550))*(game.mouseX - xxx(550)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 3
            if (((game.mouseX - xxx(375))*(game.mouseX - xxx(375)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 2;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 4
            if (((game.mouseX - xxx(625))*(game.mouseX - xxx(625)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 3;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 3;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length == 5)
        {
            //sub circle 1
            if (((game.mouseX - xxx(500))*(game.mouseX - xxx(500)) + (game.mouseY - yyy(785))*(game.mouseY - yyy(785))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 2
            if (((game.mouseX - xxx(400))*(game.mouseX - xxx(400)) + (game.mouseY - yyy(725))*(game.mouseY - yyy(725))) <= 50*50)
            {
                circleHovered = 1;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(400), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(400), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 3
            if (((game.mouseX - xxx(600))*(game.mouseX - xxx(600)) + (game.mouseY - yyy(725))*(game.mouseY - yyy(725))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 2;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(600), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(600), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 4
            if (((game.mouseX - xxx(350))*(game.mouseX - xxx(350)) + (game.mouseY - yyy(600))*(game.mouseY - yyy(600))) <= 50*50)
            {
                circleHovered = 3;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 3;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(350), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(350), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 5
            if (((game.mouseX - xxx(650))*(game.mouseX - xxx(650)) + (game.mouseY - yyy(600))*(game.mouseY - yyy(600))) <= 50*50)
            {
                circleHovered = 4;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 4;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(650), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(650), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length == 6)
        {
            //sub circle 1
            if (((game.mouseX - xxx(450))*(game.mouseX - xxx(450)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 2
            if (((game.mouseX - xxx(550))*(game.mouseX - xxx(550)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 3
            if (((game.mouseX - xxx(375))*(game.mouseX - xxx(375)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 2;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 4
            if (((game.mouseX - xxx(625))*(game.mouseX - xxx(625)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 3;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 3;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 5
            if (((game.mouseX - xxx(365))*(game.mouseX - xxx(365)) + (game.mouseY - yyy(475))*(game.mouseY - yyy(475))) <= 50*50)
            {
                circleHovered = 4;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 4;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 6
            if (((game.mouseX - xxx(635))*(game.mouseX - xxx(635)) + (game.mouseY - yyy(475))*(game.mouseY - yyy(475))) <= 50*50)
            {
                circleHovered = 5;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 5;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length == 7)
        {
            //sub circle 1
            if (((game.mouseX - xxx(500))*(game.mouseX - xxx(500)) + (game.mouseY - yyy(785))*(game.mouseY - yyy(785))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(785), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 2
            if (((game.mouseX - xxx(400))*(game.mouseX - xxx(400)) + (game.mouseY - yyy(725))*(game.mouseY - yyy(725))) <= 50*50)
            {
                circleHovered = 1;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(400), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(400), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 3
            if (((game.mouseX - xxx(600))*(game.mouseX - xxx(600)) + (game.mouseY - yyy(725))*(game.mouseY - yyy(725))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 2;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(600), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(600), yyy(725), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 4
            if (((game.mouseX - xxx(350))*(game.mouseX - xxx(350)) + (game.mouseY - yyy(600))*(game.mouseY - yyy(600))) <= 50*50)
            {
                circleHovered = 3;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 3;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(350), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(350), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 5
            if (((game.mouseX - xxx(650))*(game.mouseX - xxx(650)) + (game.mouseY - yyy(600))*(game.mouseY - yyy(600))) <= 50*50)
            {
                circleHovered = 4;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 4;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(650), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(650), yyy(600), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 6
            if (((game.mouseX - xxx(365))*(game.mouseX - xxx(365)) + (game.mouseY - yyy(425))*(game.mouseY - yyy(425))) <= 50*50)
            {
                circleHovered = 5;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 5;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(425), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(425), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 7
            if (((game.mouseX - xxx(635))*(game.mouseX - xxx(635)) + (game.mouseY - yyy(425))*(game.mouseY - yyy(425))) <= 50*50)
            {
                circleHovered = 6;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 6;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(425), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(425), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length == 8)
        {
            //sub circle 1
            if (((game.mouseX - xxx(450))*(game.mouseX - xxx(450)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 2
            if (((game.mouseX - xxx(550))*(game.mouseX - xxx(550)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 3
            if (((game.mouseX - xxx(375))*(game.mouseX - xxx(375)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 2;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 4
            if (((game.mouseX - xxx(625))*(game.mouseX - xxx(625)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 3;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 3;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 5
            if (((game.mouseX - xxx(365))*(game.mouseX - xxx(365)) + (game.mouseY - yyy(475))*(game.mouseY - yyy(475))) <= 50*50)
            {
                circleHovered = 4;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 4;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 6
            if (((game.mouseX - xxx(635))*(game.mouseX - xxx(635)) + (game.mouseY - yyy(475))*(game.mouseY - yyy(475))) <= 50*50)
            {
                circleHovered = 5;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 5;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 7
            if (((game.mouseX - xxx(415))*(game.mouseX - xxx(415)) + (game.mouseY - yyy(315))*(game.mouseY - yyy(315))) <= 50*50)
            {
                circleHovered = 6;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 6;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(415), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(415), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 8
            if (((game.mouseX - xxx(585))*(game.mouseX - xxx(585)) + (game.mouseY - yyy(315))*(game.mouseY - yyy(315))) <= 50*50)
            {
                circleHovered = 7;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 7;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(585), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(585), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }
        else if (comvo.length >= 9)
        {
            //sub circle 1
            if (((game.mouseX - xxx(450))*(game.mouseX - xxx(450)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 0;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 0;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(450), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 2
            if (((game.mouseX - xxx(550))*(game.mouseX - xxx(550)) + (game.mouseY - yyy(775))*(game.mouseY - yyy(775))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 1;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(550), yyy(775), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 3
            if (((game.mouseX - xxx(375))*(game.mouseX - xxx(375)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 2;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 2;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(375), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 4
            if (((game.mouseX - xxx(625))*(game.mouseX - xxx(625)) + (game.mouseY - yyy(650))*(game.mouseY - yyy(650))) <= 50*50)
            {
                circleHovered = 3;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 3;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(625), yyy(650), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 5
            if (((game.mouseX - xxx(365))*(game.mouseX - xxx(365)) + (game.mouseY - yyy(475))*(game.mouseY - yyy(475))) <= 50*50)
            {
                circleHovered = 4;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 4;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(365), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 6
            if (((game.mouseX - xxx(635))*(game.mouseX - xxx(635)) + (game.mouseY - yyy(475))*(game.mouseY - yyy(475))) <= 50*50)
            {
                circleHovered = 5;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 5;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(635), yyy(475), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 7
            if (((game.mouseX - xxx(415))*(game.mouseX - xxx(415)) + (game.mouseY - yyy(315))*(game.mouseY - yyy(315))) <= 50*50)
            {
                circleHovered = 6;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 6;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(415), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(415), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 8
            if (((game.mouseX - xxx(585))*(game.mouseX - xxx(585)) + (game.mouseY - yyy(315))*(game.mouseY - yyy(315))) <= 50*50)
            {
                circleHovered = 7;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 7;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(585), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(585), yyy(315), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }

            //sub circle 9
            if (((game.mouseX - xxx(500))*(game.mouseX - xxx(500)) + (game.mouseY - yyy(265))*(game.mouseY - yyy(265))) <= 50*50)
            {
                circleHovered = 8;
                if (game.unclick)
                {
                    game.unclick = false;
                    circleSelected = 8;
                }
                game.x.beginPath();
                game.x.fillStyle = "navy";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(265), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
            else
            {
                game.x.beginPath();
                game.x.fillStyle = "#18181A";
                game.x.strokeStyle = "lightGrey";
                game.x.lineWidth = 3;
                game.x.arc(xxx(500), yyy(265), 50, 0, 2*Math.PI); //xxx(50), yyy(100), xxx(900), yyy(60)
                game.x.fill();
                game.x.stroke();
            }
        }

        var evento = -1;
        //DIALOGUE SYSTEM
        for (var i = 0; i < comvo.length; i++)
        {
            if (circleHovered == i)
            {
                game.x.textAlign = "center";
                game.x.font = fonter(10, "Arial");
                game.x.fillStyle = "orange";
                game.x.fillText(comvo[i].text, xxx(503), yyy(970));
            }
            if (circleSelected == i)
            {
                if (comvo[i].lock == true)
                {
                    for (var j = 0; j < game.commsList.length; j++)
                    {
                        if (game.commsList[j].id == game.commsSelect)
                        {
                            game.commsList[j].spot = comvo[i];
                        }
                    }
                }
                evento = comvo[i].event;
                game.comvoResponse = comvo[i].re;
                game.comvo = comvo[i].inside;
                break;
            }
        }
        if (game.comvoResponse != -1)
        {
            game.x.textAlign = "center";
            game.x.font = fonter(10, "Arial");
            game.x.fillStyle = "navy";
            game.x.fillText(game.comvoResponse, xxx(503), yyy(130));
        }

        if (evento != -1)
        {
            commEvent(evento);
        }
    }

    game.x.restore();
    if (game.eKey)
    {
        game.eKey = false;

        game.activeCommunication = false;
    }
}

function commEvent(eventID)
{
    if (eventID == "powerDown")
    {
        for (var i = 0; i < game.shipsList.length; i++)
        {
            game.shipsList[i].offline = true;
        }
    }
    else if (eventID == "powerUp")
    {
        for (var i = 0; i < game.shipsList.length; i++)
        {
            game.shipsList[i].offline = false;
        }
    }
    else
    {
        return false;
    }
}

function getComms(id) //{text: "", inside: [{}] , event: false, lock: false, re: ""}
{
    if (id == "none")
    {
        return false;
    }
    else if (id == "peter")
    {
        var convos =
            [
                {text: "I have a question.", event: false, lock: false, re: "I have an answer.", inside: [{text: "How do I navigate the menus?" , event: false, lock: false, re: "For item and shop menus you hover over the menu and press 'W' or 'S' to scroll up and down. Otherwise, click the botton on the top or bottom to scroll. The 'E' key is used to leave a menu.", inside: []}, {text: "Which keys do I click to access the menus?" , event: false, lock: false, re: "'R' is communications, 'Y' is ammunition, 'U is upgrades, 'I' is inventory, 'K' is maintenance, and the 'E' key can open menus found in the world.", inside: []}, {text: "How do I move?", event: false, lock: false, re: "If you are not in a ship 'W, A, S, D' will move you around, if you are piloting a ship 'W' accelerates, the mouse steers, 'S' decelerates, 'A, and D' strafe, and holding 'Shift + W' activates a higher energy cost speed boost.", inside: []}, {text: "How do I fight?", event: false, lock: false, re: "The 'Space' bar fires your ship's main guns, if it has any. 'Q' launches missiles if they are available. 'X' drops bombs, traps, etcetera... if your ship does not have any of the mentioned weapon capacities, the answer is, you don't.", inside: []}, {text: "How do I trade?", event: false, lock: false, re: "You must first go to a planet that has merchandise and enter its menu by pressing 'E'. Then you must drag the item you wish to buy or sell by holding 'Shift' over it and releasing it over the opposite area.", inside: []}, {text: "What do buy and sell rates do?", event: false, lock: false, re: "The BUY rate is the rate at which you can purchase items from the shop, the SELL rate is that at which you can sell them.", inside: []}  ]},
                {text: "I need you to take a direct action.", event: false, lock: false, re: "More information required...", inside: [{text: "Power off all of the ships in my fleet.", event: "powerDown", lock: false, re: "Affirmative, I mean yes.", inside: []}, {text: "Power on all of the ships in my fleet.", event: "powerUp", lock: false, re: "Affirmative, I mean yes.", inside: []}    ]}
            ];
        return convos;
    }
}