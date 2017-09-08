var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources  = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return( structure.structureType == STRUCTURE_CONTAINER &&
                                        structure.store[RESOURCE_ENERGY] > creep.carryCapacity);
                            }
            });
            if (sources.length == 0){
                creep.say('🚫');
            } else {
                var target = creep.pos.findClosestByRange(sources)
                if(creep.withdraw(target,RESOURCE_ENERGY,creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};
// Need somehow to place a controller container / link


module.exports = roleUpgrader;