


// so, this script is my database that manages what things I control. Also supports the functions to find things using the database

/* first is to determine what actually needs to be tracked (by id?)
Run this periodically, clean out the memory and refresh using find()
1. Spawns I control
2. Creeps I control


*/

//FIND AND STORE ROOMS BY ID
var hiveMind = function() {
    // ok so need to decide what to update into memory
    // when to update memory
    if(Game.time % 27 == 0) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
    
    
};
module.exports = hiveMind;

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
