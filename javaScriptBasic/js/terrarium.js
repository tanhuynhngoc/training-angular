var plan = ["############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"
];

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.plus = function(other) {
    return new Point(this.x + other.x, this.y + other.y);
};

function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}

Grid.prototype.isInside = function(point) {
    return point.x >= 0 && point.x < this.width &&
        point.y >= 0 && point.y < this.height;
};

Grid.prototype.get = function(point) {
    return this.space[point.x + this.width * point.y];
};

Grid.prototype.set = function(point, value) {
    this.space[point.x + this.width * point.y] = value;
};

var directions = {
    "n": new Point(0, -1),
    "ne": new Point(1, -1),
    "e": new Point(1, 0),
    "se": new Point(1, 1),
    "s": new Point(0, 1),
    "sw": new Point(-1, 1),
    "w": new Point(-1, 0),
    "nw": new Point(-1, -1)
};

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return {
        type: "move",
        direction: this.direction
    };
};

function elementFromChar(legend, ch) {
    if (ch == " ")
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function Terrarium(map, legend) {

    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++)
            grid.set(new Point(x, y),
                elementFromChar(legend, line[x]));
    });
}

function charFromElement(element) {
    if (element == null)
        return " ";
    else
        return element.originChar;
}

Terrarium.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Point(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};

function Wall() {}

var terrarium = new Terrarium(plan, {
    "#": Wall,
    "o": BouncingCritter
});

Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.space[x + y * this.width];
            if (value != null)
                f.call(context, value, new Point(x, y));
        }
    }
};

Terrarium.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, point) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, point);
        }
    }, this);
};

Terrarium.prototype.letAct = function(critter, Point) {
    var action = critter.act(new View(this, point));
    if (action && action.type == "move") {
        var dest = this.checkDestination(action, point);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(point, null);
            this.grid.set(dest, critter);
        }
    }
};

Terrarium.prototype.checkDestination = function(action, point) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = point.plus(directions[action.direction]);
        if (this.grid.isInside(dest))
            return dest;
    }
};

function View(terrarium, point) {
    this.terrarium = terrarium;
    this.point = point;
}

View.prototype.look = function(dir) {
    var target = this.point.plus(directions[dir]);
    if (this.terrarium.grid.isInside(target))
        return charFromElement(this.terrarium.grid.get(target));
    else
        return "#";
};

View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions)
        if (this.look(dir) == ch)
            found.push(dir);
    return found;
};

View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length == 0) return null;
    return randomElement(found);
};

function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
    this.dir = "s";
}

WallFollower.prototype.act = function(view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != " ")
        start = this.dir = dirPlus(this.dir, -2);
    while (view.look(this.dir) != " ") {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir == start) break;
    }
    return {
        type: "move",
        direction: this.dir
    };
};

function LifelikeTerrarium(map, legend) {
    Terrarium.call(this, map, legend);
}

LifelikeTerrarium.prototype = Object.create(Terrarium.prototype);

var actionTypes = Object.create(null);

LifelikeTerrarium.prototype.letAct = function(critter, point) {
    var action = critter.act(new View(this, point));
    var handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, critter,
            point, action);
    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0)
            this.grid.set(point, null);
    }
};

actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};

actionTypes.move = function(critter, point, action) {
    var dest = this.checkDestination(action, point);
    if (dest == null ||
        critter.energy <= 1 ||
        this.grid.get(dest) != null)
        return false;
    critter.energy -= 1;
    this.grid.set(point, null);
    this.grid.set(dest, critter);
    return true;
};

actionTypes.eat = function(critter, point, action) {
    var dest = this.checkDestination(action, point);
    var atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null)
        return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};

actionTypes.reproduce = function(critter, point, action) {
    var baby = elementFromChar(this.legend,
        critter.originChar);
    var dest = this.checkDestination(action, point);
    if (dest == null ||
        critter.energy <= 2 * baby.energy ||
        this.grid.get(dest) != null)
        return false;
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};

function Plant() {
    this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function(context) {
    if (this.energy > 15) {
        var space = context.find(" ");
        if (space)
            return {
                type: "reproduce",
                direction: space
            };
    }
    if (this.energy < 20)
        return {
            type: "grow"
        };
};

function PlantEater() {
    this.energy = 20;
}

PlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    if (this.energy > 60 && space)
        return {
            type: "reproduce",
            direction: space
        };
    var plant = context.find("*");
    if (plant)
        return {
            type: "eat",
            direction: plant
        };
    if (space)
        return {
            type: "move",
            direction: space
        };
};

var Terrarium = new LifelikeTerrarium(
    ["############################",
        "#####                 ######",
        "##   ***                **##",
        "#   *##**         **  O  *##",
        "#    ***     O    ##**    *#",
        "#       O         ##***    #",
        "#                 ##**     #",
        "#   O       #*             #",
        "#*          #**       O    #",
        "#***        ##**    O    **#",
        "##****     ###***       *###",
        "############################"
    ], {
        "#": Wall,
        "O": PlantEater,
        "*": Plant
    }
);