var roleTrucker = {
    
    run: function(creep) {

        if(creep.memory.trucking && creep.carry.energy == 0) {
            // acquire target to harvest from
            // var targets = creep.room.find(FIND_MY_STRUCTURES, {filter: function(structure) {return structure.memory.harvestTarget}})
            creep.memory.trucking = false;
            creep.say('🔄');
        }
        if(!creep.memory.trucking && creep.carry.energy == creep.carryCapacity) {
            // accquire target to deliver to. Using a find only once seems okay, but how to prioritize the locations?
            // var targets = creep.room.find(FIND_MY_STRUCTURES, {filter: function(structure){return structure.memory.truckTarget == true && structure.store[RESOURCE_ENERGY] < structure.storeCapacity}})
            creep.memory.trucking = true;
            creep.say('🚚');
        }
    
        if(creep.memory.trucking) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                (structure.structureType == STRUCTURE_TOWER &&  structure.energyCapacity - structure.energy >= creep.carry.energy)) // only go to tower if you can dump a full load
                                &&  structure.energy < structure.energyCapacity)
                            //return ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity);
                        }
                });
            if(targets.length) {
                //if(creep.transfer(targets[0], RESOURCE_ENERGY, _.sum(creep.carry)) == ERR_NOT_IN_RANGE) {
                var target = creep.pos.findClosestByPath(targets);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < 750) ||
                            structure.structureType == STRUCTURE_STORAGE)
                    }});
                if (targets.length){
                    targets.sort(function(a,b) {
                        return a.store[RESOURCE_ENERGY]-b.store[RESOURCE_ENERGY];
                    });
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                //move from full containers to empty containers, or if all containers are full to storage
                
            }
        }
        else {
            var sources  = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return( structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >750);
                            }
            });
            if (sources.length == 0){ //if no containers are above 250, pull from storage? (and put it back?)
                creep.say('!');
                sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.structureType == STRUCTURE_STORAGE)
                    }
                })
            } 
            if (sources.length == 0){
                creep.say('🚫');
            }
            else {
                sources.sort(function(a,b) {
                    return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY];
                });
                if(creep.withdraw(sources[0],RESOURCE_ENERGY/*,creep.carryCapacity*/) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        
    }
};

module.exports = roleTrucker;