
var eyes;            // Kills which spawn a special zealot (special zealots don't count for kills.)
var kill;            // Total kills to do 

var fails;           // Kills without eyes
var runs;            // How many kills have been calculated
var spawnRate;       // Chance for special zealots to spawn

let recalculated = { // Check how many times the spawn rate was reset
    "one" : false,
    "two" : false,
    "three" : false
};

let short = { // Used to convert 
    1 : "one",
    2 : "two",
    3 : "three"
};

/**/

if (type = "1") { // Type of Zealot
    denominator = 420;
} else {
    denominator = 380;
};

if (hits == 2) { // Hits to kill
    denominator *= 0.9;
};

if (pet = true) { // Has pet
    for (let x = 0; x <= lvl; x++) {
        denominator = (denominator / (1 + (25 / 100)));
    }
};

if (slayer = true) { // Slayer level nine
    denominator /= 1.15;
};

if (zealuck > 0) { // Zealuck tier
    for (let x = 0; x < zealuck; x++) {
        let perk = 0.2;
        denominator *= (1 - perk);
    };
};

var cache = denominator;            // Keep original value of denominator to reset it.
var spawnRate = (1 / denominator);  // Calculate Spawnrate

function convert(n) { // Convert number to string in dict recalculated
    return recalculated[short[n]];
};

function reset() { // Reset denominator to original value
    denominator = cache;
};

function check(n) { // Check if recalc should happen
    if (runs >= denominator * e && convert(n) == false) {
        return true;
    };
};

function recalc(d, n) { // Recalculate spawn rate after special zealot spawns
    reset();
    denominator /= d;
    spawnRate = (1 / denominator);
    recalculated[short[n]] = true;
};

function didExceed() { // Check if the runs exceeded the denominator and recalculate denominator
    if (check(1)) { // Check if we already recalculated
        recalc(2, 1); // Recalculate spawn rate
    } else if (check(2)) {
        recalc(3, 2);
    } else if (check(3)) {
        recalc(4, 3);
    };
};

for (let x = 0; x < kill; x++) {
    runs++;
    if (Math.random() < spawnRate) { // Special zealot spawned
        eyes++;
        console.log(runs + ": Eye spawned! Total eyes: " + eyes);
    } else { // Normal kill
        fails++;
        didExceed();
    };
};

console.log("Total kills: " + runs + ", Total eyes: " + eyes + ", Total fails: " + fails);