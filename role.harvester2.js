var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!Game.getObjectById(creep.memory.target)) {
            // if item in memory does not exist in vision, clear memory.
            creep.memory.target = false;
        }
        if (!creep.memory.target){ //if memory id is false, grab closest target.
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.target = sources[creep.memory.source].id;
        }
        if(creep.memory.target) {
            // legal harvest target acquired!
            if(creep.harvest(creep.memory.target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var target = sources[creep.memory.source];
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER
                        //&&
                        //structure.store[RESOURCE_ENERGY] < structure.storeCapacity
                        )
                    //return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity)
                }
            });
            if(targets.length > 0) {
                var target = targets[creep.memory.source];
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;