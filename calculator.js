var eyes;            // Kills which spawn a special zealot (special zealots don't count for kills.)
var fails;           // Kills without eyes
var run;             // How many kills have been calculated

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

function convert(n) {
    return recalculated[short[n]];
};

function reset() {
    denominator = cache;
};