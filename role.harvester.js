var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!Game.getObjectById(creep.memory.target)) {
            // if item in memory does not exist in vision, clear memory.
            creep.memory.target = false;
        }
        if (!creep.memory.target){ //if memory id is false, grab closest target.
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.target = sources[creep.memory.source].id; // creep.memory.source is redundant, should just give the id on creation.
        }
        if(creep.carry.energy > 0.9 * creep.carryCapacity){
            //console.log("looking for dump Target");
            //console.log("creep.carry.RESOURCE_ENERGY = ", creep.carry.RESOURCE_ENERGY );
            //console.log("creep.carry.energy = ", creep.carry.energy );
            //console.log("creep.carryCapacity = ",creep.carryCapacity );
            //full look for dump targets
            var dumpTarget;
            if(creep.memory.lastDropPoint) {
                // just drop here again, dont look again
                dumpTarget = Game.getObjectById(creep.memory.lastDropPoint);
            }
            else {
                // find new dump target
                // failed attempt to find nearby structures and filter
                //var closeStructures = creep.room.lookAtArea(LOOK_STRUCTURES,creep.pos.y - 3, creep.pos.x - 3, creep.pos.y + 3, creep.pos.x + 3);
                //_.forIn(closeStructures, s => s.structure.type = STRUCTURE_CONTAINER )
                var dumptargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)}});
                if(dumptargets.length > 0) {
                    dumpTarget = dumptargets[creep.memory.source]; // this is using an bad system that requires the container to be the n'th in the array!
                    creep.memory.lastDropPoint = dumpTarget.id;
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