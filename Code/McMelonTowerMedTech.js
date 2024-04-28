

/*
    
    Location: 4000, 7400, y104
    Size: 48 stacks
    Harvest Time: 30 minutes
    NL: ZealFarm owned by Greltam
    Tool: E5U3ST Axe, Left click break
    tab-outable
    
*/




//Zeal River Savannah Melon script
/*
    !!! Script starts at 3987, 7374, 104 !!!
    Find 1.2 Player Configurables to adjust for script restarts

    Carpet Collection Script for Meenos on CivMC @ 2958, 5202, 67
    Written by Greltam 4/9/2024
    
    With a largely expanded tree farm, I need a script I won't have to baby every hour
    for 8+hours that it can run. The old script only ever chopped or replanted 1 layer
    at a time.
    
    The idea is: start at a lodestone. move west to chopping start. For each time
    down the row, toss wood into the collectors. At the end of the layer, jump up
    a lodestone to the next layer, and repeat until finishing the top of the farm.

    I can write a similar script for replanting after this is done the heavy lifting.
    
    New Tech being written to swap out tools near breaking to new ones so script can
    fully run
*/
/*------------------------
   0.1 Player Requirements to Start
------------------------*/
//Directions: Start script while standing on that layers lodestone
//Player must place axe in the rightmost hotbar(9)

/*-----------------------
   0.1 Player Requirements to Start End
-----------------------*/


/*------------------------
   1.1 Import Files Start
------------------------*/
const util = require("./McUtilityFile.js")
/*-----------------------
   1.1 Import Files End
-----------------------*/

/*------------------------
   1.2 Player Configurables Start
------------------------*/

//alter the default quitkey from j to whatever you want.
util.setQuitKey("key.keyboard.j") //default: util.setQuitKey("key.keyboard.j") 
//In case of needing to restart mid melon chop
//Always restart on a lodestone
//UNUSED //restarting = false //default: restarting = false
startingLayer = 1 //default: startingLayer = 1

//total layers in the tree farm
totalLayers = 54 //default: totalLayers = 54
melonsPerRow = 28 //default: treesPerRow = 28
rowsPerLayer = 6 //default: rowsPerLayer = 16
layerHeight = 3 //default: layerHeight = 12
rowWidth = 5 //default: rowWidth = 5 //space between start of a sides row and next row
endLengths = 5 //default: treeBridgeLength = 5


//UNUSED //usingST = true
/*-----------------------
   1.2 Player Configurables End
-----------------------*/

/*------------------------
   2 Global Variables Start
------------------------*/
//Player starts script at this location
xStartPosition = 3987 
zStartPosition = 7374
yStartPosition = 104


//Time it takes for e5 diamond axe to cross sides
//replace after doing hitech stuff
secondsToHarvest = 11

/*-----------------------
   2 Global Variables End
-----------------------*/

/*-------------------
   3 Functions Start
-------------------*/

function harvestDoubleStrip(){
    if(util.checkQuit()){
        return
    }
    util.simpleMove("key.keyboard.a",90,0,2*20)
    util.complexMove(["key.keyboard.w","key.mouse.left"],90,27,secondsToHarvest * 20)

    
    util.simpleMove("key.keyboard.d",-90,0,2*20)
    util.complexMove(["key.keyboard.w","key.mouse.left"],-90,27,secondsToHarvest * 20)
}

function harvestLayer(){
    if(util.checkQuit()){
        return
    }
    harvestDoubleStrip()
    harvestDoubleStrip()
    harvestDoubleStrip()
    util.simpleMove("key.keyboard.d",90,0,5*20)
    util.simpleMove("key.keyboard.s",90,0,2*20)
}

function moveToNextLayer(){
    util.simpleMove("key.keyboard.left.shift",90,0,20)
}

function tossMelons(){
    Chat.log("Tossing items")
    xLook = -90
    yLook = -30
    util.tossAllSpecificItems(
        ["minecraft:melon", "minecraft:melon_slice"],
        xLook, yLook)
}

//called at start of script to set position in tree farm
//especially for restarts
function setStartingLayer(){
    playerY = util.player.getY()
    //set layer
    startingLayer = ((yStartPosition - playerY) / layerHeight) + 1
    startingLayer = Math.floor(startingLayer)
    Chat.log("starting layer = " + startingLayer)
}

/*-------------------
   3 Functions End
-------------------*/

/*-------------------
   4 Program Start
-------------------*/

Chat.log("Zeal Melon Engines Revving Up")
Chat.log("Press: " + util.getQuitKey() + " to end script")

//set starting layer if restarting on another layer
setStartingLayer()

//chop all the layers
for(let i = startingLayer; i <= totalLayers; i++){
    if(util.checkQuit()){
        break
    }
    harvestLayer()
    tossMelons()
    moveToNextLayer()
}
    


//Reset keybinds to prevent phantom key holds.
KeyBind.key("key.keyboard.w", false)
KeyBind.key("key.keyboard.left.control", false)
KeyBind.key("key.keyboard.space", false)
KeyBind.key("key.mouse.right", false)
KeyBind.key("key.mouse.left", false)


Chat.log("Meloning Accomplished, we're going home Boys!")

/*-------------------
   4 Program End
-------------------*/