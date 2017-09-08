var roleBarbarian = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!Game.getObjectById(creep.memory.target)) {
            // if item in memory does not exist in vision, clear memory.
            creep.memory.target = false;
        }
        else if (!creep.memory.target){ //if memory id is false, grab closest target.
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
    }
};


module.exports = roleBarbarian;