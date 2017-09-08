//      RCL     0=5k ,1 =10k, 2=50k, 3=200k, 4=750k, 5-=3.5M, 6=15M, 7=70M, 8=300M
var REPAIR_CAP = [5e3, 10e3, 50e3, 200e3, 750e3, 3.5e6, 15e6, 70e6, 300e6];
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }
    
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                   var targets = creep.room.find(FIND_STRUCTURES, {filter: function(structure){ return structure.hits < structure.hitsMax && structure.hits < REPAIR_CAP[creep.room.controller.level] }})
                    if(targets.length) {
                        var target = creep.pos.findClosestByRange(targets)
                        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
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

module.exports = roleBuilder;