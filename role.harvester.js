var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!Game.getObjectById(creep.memory.target)) {
            // if target in memory does not exist in vision, clear memory.
            creep.memory.target = false;
        }
        if (!creep.memory.target){ //if memory id is false, grab closest target.
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.target = sources[creep.memory.source].id; // creep.memory.source is redundant, should just give the id on creation.
        }
        const source = Game.getObjectById(creep.memory.target);
        if(creep.carry.energy > 0.9 * creep.carryCapacity){
           // creep.say("🔋");
            //full look for dump targets
            creep.harvest(source); // attempt to harvest again!
            var dumpTarget= false;
            if(creep.memory.lastDropPoint) {
                // just drop here again, dont look again
                dumpTarget = Game.getObjectById(creep.memory.lastDropPoint); //potential problem of it being not visable. may be safer to store the pos if in another room?
            }
            else {
                // find new dump target
                var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK)}});
                if(containers.length > 0) {
                    // found at least 1 container, check to see how close it is!
                    for(var container of containers) {
                        if (Math.abs(container.pos.x - creep.pos.x ) < 3 && Math.abs(container.pos.y - creep.pos.y ) < 3) {
                            // found container within 2 squares!
                            dumpTarget = container;
                            break;
                        }
                    }
                    creep.memory.lastDropPoint = dumpTarget.id;
                }
                if (dumpTarget === false) { // not found above. should try to combine these , logic order is escaping me right now.
                    // risky section to place a build structure and build it yourself?
                    const constructionSiteSearch = creep.room.lookForAtArea(LOOK_CONSTRUCTION_SITES, creep.pos.y - 1, creep.pos.x - 1, creep.pos.y + 1, creep.pos.x + 1,true);
                    if (constructionSiteSearch.length > 0) {
                        creep.build(constructionSiteSearch[0].constructionSite); // first item from the search, constructionSite Object.... ugh.
                    }
                    else {
                        // nothing in range, nothing being built, place structure (link or container)
                        // container is placed directly opposite the source
                        const position1 = new RoomPosition( creep.pos.x + (creep.pos.x - source.pos.x),
                                                            creep.pos.y + (creep.pos.y - source.pos.y),
                                                            creep.room.name);
                        if(creep.room.createConstructionSite(position1,STRUCTURE_CONTAINER) == ERR_INVALID_TARGET) { /// for now hard coded to containers.
                        // should maybe have a backup position to drop the build site if it is an invalid placment.
                            creep.room.createConstructionSite(creep,STRUCTURE_CONTAINER);
                        }
                    }
                }
                
            }
            if(creep.transfer(dumpTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(dumpTarget, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        
        else if (creep.memory.target) {
            //creep.say("🔄");
            // legal harvest target acquired!
            if(creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleHarvester;