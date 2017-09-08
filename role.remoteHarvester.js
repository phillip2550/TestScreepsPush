var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.lastAction == 'harvesting'){
            // is actively harvesting, continue until state change
            if (creep.memory.targetContainer){
                // assuming that i know what i am doing, and only turn on this flag if they are stationary remote harvesting
                if(creep.carry.energy = creep.carryCapacity){
                    // dump energy in container
                    if(creep.transfer(creep.memory.targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.memory.targetContainer, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    else {
                        // return to home room to dump
                        creep.memory.lastAction = 'moveing to home'
                    }
                }
                // also attempt harvest in same action
                if(creep.harvest(creep.memory.target)== ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
        else if (creepp.memory.lastAction == 'moving to target room') {
            creep.moveTo(creep.room.exit(creep.memory.exit));
            if (creep.pos.x = 0 || creep.pos.x = 49 || creep.pos.y == 0 || creep.pos.y ==49) {
                // creep is at exit
                creep.memory.lastAction = 'at exit';
            }
        }
        else if (creep.memory.lastAction == 'moving to home'){
            creep.moveTo(Game.room[creep.memory.homeRoom].storage)
        }
        else if (creep.memory.lastAction == 'at exit') {
            // move creep into room
            var direction;
            if(creep.pos.x = 0 || creep.pos.y = 0) {
                direction = BOTTOM_RIGHT; // southeast
            }
            else {
                direction = TOP_LEFT; // northwest
            }
            creep.move(direction);
            if (creep.room.name = creep.memory.targetRoomName) {
                // in the correct room start harvesting loop
                creep.memory.lastAction = 'harvesting';
            }
            else {
                
            }
        }
        if (!Game.getObjectById(creep.memory.target)) {
            // if item in memory does not exist in vision, clear memory.
            creep.memory.target = false;
        }
        if (!creep.memory.target){ //if memory id is false, grab closest target.
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            creep.memory.target = closestHostile.id;
        }
        else { // item in memory is legit, go kill it.
        // TO DO! add logic to go hide inside ramparts if they are available
            var target = Game.getObjectById(creep.memory.target);
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
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
                
            }
        }
    }
};

module.exports = roleRemoteHarvester;