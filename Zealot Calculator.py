import random
import os
import json

os.system('clear')

with open("usr.json", "r") as u:
    usr = json.load(u)

kills = int(input("Zealots killed -> "))

perkMultiplier = 0

eyes = 0
fails = 0
attempts = 0
no = ""

type = usr.get("type")
hits = usr.get("hits")
pet = usr.get("pet")
slayer = usr.get("slayer")
zealuck = usr.get("zealuck")
lvl = usr.get("lvl")

recalculated = {
    "one": False,
    "two": False,
    "three": False
}

while True:
    
    while True:
        if not usr.get("new", True):
            i = input("Configure? (y/n) -> ")
            if i in ["y", "Y"]:
                break
            elif i in ["n", "N"]:
                no = True
            else: 
                print("Invalid input")
        break

    if no:
        break

    print("1 > Regular Zealot")
    print("2 > Bruiser Zealot")
    type = input("> ")
    usr["type"] = type

    print("How many hits to kill?")
    print("1 > 1 hit")
    print("2 > 2+ hits")
    hits = int(input("> "))
    usr["hits"] = hits

    print("Is there a Legendary / Mythic Enderman pet?")
    print("True > Yes")
    print("False > No")
    pet = input("> ")
    usr["pet"] = pet

    print("What is the level of the Pet? (Answer 0 if no pet)")
    lvl = int(input("> "))

    print("Enderman Slayer is level 9?")
    print("True > Yes")
    print("False > No")
    slayer = input("> ")
    usr["slayer"] = slayer

    print("Tier of Zealuck?")
    print("0 > No Zealuck")
    print("1 > Tier 1")
    print("2 > Tier 2")
    print("3 > Tier 3")
    print("4 > Tier 4")
    print("5 > Tier 5")
    zealuck = int(input("> "))
    usr["zealuck"] = zealuck
    
    break

# Calculate the RNG based on the inputs
if type == "1": # Regular Zealot
    baseRate = 420
else: # Bruiser Zealot
    baseRate = 380

if hits == 2: # Increase spawn rate 
    baseRate * 0.9

if pet == "True": # Does the user have a pet
    for x in range(lvl):
        baseRate = (baseRate / (1 + (25 / 100)))

if slayer == "True": # Slayer level 9 bonus
    baseRate = baseRate / 1.15

if zealuck != 0: # Zealuck bonus
    
    for x in range(zealuck):
        perkMultiplier += .02
    baseRate = baseRate * (1 - perkMultiplier)

originalRate = baseRate # We need to keep the original rate to reset the spawn rate
spawnRate = (1 / baseRate) # Spawn rate
print()
print(f"Hits: {hits}")
print(f"Pet: {pet}")
print(f"Pet Level: {lvl}")
print(f"Slayer Level 9: {slayer}")
print(f"To kill: {kills}")
print(f"Type: {type}")
print(f"Zealuck Tier: {zealuck}")
print()
print(f"Spawn Rate: {spawnRate}")
print(f"Base Spawn Rate: {baseRate}")
print(f"True Base Spawn Rate: {originalRate}")
    
short = {
    1 : "one",
    2 : "two",
    3 : "three"
}

def reset(): # Reset rate for calculations
    global baseRate
    baseRate = originalRate

def damnImRunningOutOfNames(e, i): # I dont want to see long if
    if attempts >= baseRate * e and not recalculated[short[i]]:
        return True

def check(n): # Shorten argument lines in exceedBase()
    int(n) # Make sure we don't get a string
    if n == 1: # For step one
        damnImRunningOutOfNames(1, 1)
    elif n == 2: # For step two
        damnImRunningOutOfNames(1.50, 2)
    elif n == 3: # For step three
        damnImRunningOutOfNames(2, 3)
    else: # Stop n from exceding three
        raise ValueError(f"Argument for check() cannot exceed three: {n}")
    
def reassign(d, n): # Change spawn rates
    global baseRate, originalRate, spawnRate, recalculated
    reset() # Restore original value before dividing it.
    baseRate /= d # Change spawn rate
    spawnRate = 1 / baseRate # idk skyblock does this
    recalculated[short[n]] = True
    # Print debug info
    print()
    print(attempts)
    print(f"baseRate / {d}")
    print(f"baseRate is now: {baseRate}")

def exceedBase(): # Adjust spawn rate if attempts exceed certain thresholds
    if check(1): # Reduce spawn rate #2
        reassign(2, 1)
    
    elif check(2): #3
        reassign(3, 2)
    
    elif check(3):#4
        reassign(4, 3)

for x in range(kills): # Simulate
    rng = random.random() # Establish chance

    if rng <= spawnRate: # Get an eye
        eyes += 1
        attempts += 1
        print()
        print(f"{attempts} > Special Zealot")
        print(f"baseRate reset: {baseRate} = {originalRate}")
        reset() # Reset spawnRate
    else: # Fail to get an eye
        fails += 1
        attempts += 1
        exceedBase()

# Finish

print()
print(f"Total Eyes: {eyes}")
print(f"Total Fails: {fails}")
print(f"Total tries: {attempts}")
try:
    print(f"Eyes per 100 tries: {eyes / (attempts / 100):.2f}")
    print(f"Fails per 100 tries: {fails / (attempts / 100):.2f}")
except ZeroDivisionError:
    print("Eyes per 100 tries: 0.00")
    print(f"Fails per 100 tries: 1.00")

with open("usr.json", "w") as u:
    usr["new"] = False
    json.dump(usr, u, indent=4)