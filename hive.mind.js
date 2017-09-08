


// so, this script is my database that manages what things I control. Also supports the functions to find things using the database

/* first is to determine what actually needs to be tracked (by id?)
Run this periodically, clean out the memory and refresh using find()
1. Spawns I control
2. Creeps I control


*/

//FIND AND STORE ROOMS BY ID
var hiveMind = function(roomName) {
    //okay so i'm running this inside or outside of the room loop?
    // INSIDE!
    // run this for each room that is visable each loop. (AKA make sure it is not too heavy or it will eat my bucket!)
    
    // check if memory object exists?
    //if(Game.room[roomName].memory){
    if(!Memory.rooms.hasOwnProperty(roomName)){
        // generate empty object
        Game.rooms[roomName].memory = {
            RCL: Game.rooms[roomName].controller.level,
            owner: Game.rooms[roomName].controller.owner.username,
            resources: {
                sourceIds:  [],
                mineralIds: [],
            },
            structureIds:   {
                spawnIds:       [],
                towerIds:       [],
                extensionIds:   [],
                containerIds:   [],
                linkIds:        [],
                labIds:         [],
            },
            spawnNumber: 0
            
        }
        // populate the structure also? or just leave it and have a populate function later?
        for (var source of Game.rooms[roomName].find(FIND_SOURCES)) {
            console.log('found source', source,'in room', roomName);
            Game.rooms[roomName].memory.resources.sourceIds.push(source.id);
        }
        for (var mineral of Game.rooms[roomName].find(FIND_MINERALS)) {
            Game.rooms[roomName].memory.resources.mineralIds.push(mineral.id);
        }
    }
    else {
        // room found in memory!
        // maybe start updating structures? verify who owns the room? idk?
    }
    
    
};
module.exports = hiveMind;
/*
really this should be my room controler or my room memory manager (one and the same?)
*/



/*
Memory should store the following:
Rooms I own or am remote harvesting?
Room objects
    source(s)
        source.mineral
    structures in room
        spawn(s)
        tower(s)
        extension(s)
        container(s)
            additional flags? or maybe just fix logic in transport step
        
    Room Control level (to check if update happened)
Creep objects
    Home room
    Body type
    current role
    target
    job flags as needed



Additional option is when claiming a room to fully plan the room layout
- Determine optimal space for spawn(s)
- 60 extensions
        11x8 open space required (40 ext) 8*11 also acceptable, check for this.
- storage
- container(s)
    - source1 (RCL > 1)
    - source2 (RCL > 1)
    - mineral (RCL >= 6)
    - spawn? (or storage here and this one for remote harvest drop?)
    - room controller (RCL > 1)
- links eventually
- labs eventaully
- tower(s)
- walls / ramparts
*/
