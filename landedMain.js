/**
 * Created by skyeguy on 4/13/17.
 */
var landed;
function landedLoadGame()
{
    var landedA = new Image();
    landedA.src = ("images/landedA.png");
    window.landedA = landedA;

    landedA.onload = function()
    {
        startLanded();
    }
}

function startLanded()
{
    landed = new LandedGame();
    landed.landedGameLoop()
}

function LandedGame()
{
    this.cc = document.getElementById("divinity");
    this.cx = this.cc.getContext("2d");
    this.cc.width = window.innerWidth;
    this.cc.height = window.innerHeight;

    this.hairs = ["Black", "Brown", "Blonde", "Black-Curly", "Ginger", "Brown-Curly"];

    this.people = [];

    this.people.push(new Person(100, 100));

    this.bussle = function()
    {
        for (var i = 0; i < this.people.length; i++)
        {
            this.people[i].operation();
        }
    };

    this.drawAll = function()
    {
        for (var i = 0; i < this.people.length; i++)
        {
            this.people[i].drawSelf();
        }
    };

    var self = this;
    this.landedGameLoop = function()
    {
        self.cx.clearRect(0, 0, self.cc.width, self.cc.height);

        self.bussle();
        self.drawAll();

        requestAnimationFrame(self.landedGameLoop, self.c);
    }
}