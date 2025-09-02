
var eyes;            // Kills which spawn a special zealot (special zealots don't count for kills.)

var fails;           // Kills without eyes
var runs;            // How many kills have been calculated
var spawnRate;       // Chance for special zealots to spawn

document.getElementById("submit").onclick = function() {

    const kills = document.getElementById("kill").value; // To run
    const hits = document.getElementById("hits").value; // Hits
    const type = document.getElementById("type").value; // Type of zealot
    const pet = document.getElementById("pet").value; // If the user has a pet
    const lvl = document.getElementById("lvl").value; // Level of pet
    const slayer = document.getElementById("slayer").value; // If the user has slayer level 9
    const zealuck = document.getElementById("zealuck").value; // Zealuck tier

    console.log(kills)

    let recalculated = { // Check how many times the spawn rate was reset
        1 : false,
        2 : false,
        3 : false
    };

    /**/

    if (type = "1") { // Type of Zealot | 1 = Regular, 2 = Bruiser.
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

    console.log("Spawnrate congigured!")

    var cache = denominator;            // Keep original value of denominator to reset it.
    var spawnRate = (1 / denominator);  // Calculate Spawnrate

    function reset() { // Reset denominator to original value
        denominator = cache;
    };

    function check(n) { // Check if recalc should happen
        if (runs >= denominator * e && recalculated[n] == false) {
            return true;
        };
    };

    function recalc(d, n) { // Recalculate spawn rate after special zealot spawns
        reset();
        denominator /= d;
        spawnRate = (1 / denominator);
        recalculated[n] = true;
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

    console.log("Defined functions!");
    alert("Running with stats: \nRuns:" + kill + "\nSpawnrate: " + spawnRate);

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
    alert("Total kills: " + runs + "\nTotal eyes: " + eyes + "\nTotal fails:" + fails);

};