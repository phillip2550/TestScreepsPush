var hiveQueen = {
    run: function(name) {
        // Run a check to see if you are already spawning, if so exit.
        const energy = Game.spawns[name].room.energyAvailable;
        if (!Game.spawns[name].spawning && energy >= 300) {
            var builders    = _.filter(Game.creeps, (creep)=> creep.memory.role == 'builder');
            var harvesters  = _.filter(Game.creeps, (creep)=> creep.memory.role == 'harvester');
            var upgraders   = _.filter(Game.creeps, (creep)=> creep.memory.role == 'upgrader');
            var truckers    = _.filter(Game.creeps, (creep)=> creep.memory.role == 'trucker');
            var defenders   = _.filter(Game.creeps, (creep)=> creep.memory.role == 'defender');
            var hostiles    = Game.spawns[name].room.find(FIND_HOSTILE_CREEPS);
            var newCreep = false;
            const baseBody  = [WORK, CARRY, MOVE];
            
            if(energy < 750) { // create emergency versions!
                if(harvesters.length < 1) { // crappy way of making a 300 cost harvester if reset happens
                    newCreep = Game.spawns[name].createCreep([WORK,WORK, CARRY, MOVE], undefined, {role: 'harvester', source: 0 })
                }
                else if(truckers.length < 2){ //300 cost trucker, same reason
                    newCreep = Game.spawns[name].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'trucker'})
                }
            }
            else {
                if(harvesters.length < 2 && energy >= 750){ //5-work miners for emptying a 3000 unit source by themselves (actually need 6 because my code is crappy)
                    newCreep = Game.spawns[name].createCreep([WORK,WORK,WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], undefined, {role: 'harvester', source: Memory.rooms.spawnNumber++ %2})
                }
                else if(truckers.length < 1 && energy >= 750){ // big trucker
                    newCreep = Game.spawns[name].createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY,CARRY,MOVE,MOVE,MOVE, MOVE, MOVE], undefined, {role: 'trucker'})
                }
                else if(builders.length < 1 && harvesters.length >= 2){
                    //newCreep = Game.spawns[name].createCreep([WORK,WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder'})
                    var body = [];
                    for (var i=0;i<Math.floor(energy / 200); i++ ) {
                        //body.push(baseBody); // apparently push works with a single element, not an array.
                        body = body.concat(baseBody);
                    }
                    //console.log("body is currently " + body);
                    newCreep = Game.spawns[name].createCreep(body, undefined, {role: 'builder'});
                    //console.log(newCreep)
                }
                else if(upgraders.length < 1 && harvesters.length >= 2 ){
                    //newCreep = Game.spawns[name].createCreep([WORK,WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'})
                                        var body = [];
                    for (var i=0;i<Math.floor(energy / 200); i++ ) {
                        //body.push(baseBody); // apparently push works with a single element, not an array.
                        body = body.concat(baseBody);
                    }
                    //console.log("body is currently " + body);
                    newCreep = Game.spawns[name].createCreep(body, undefined, {role: 'upgrader'});
                    //console.log(newCreep)
                }
            }
            

            
            if (hostiles.length > 1 && defenders.length < 2){
                newCreep = Game.spawns[name].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK] , undefined, {role: 'defender'})
            }
    
        }
    }

};

module.exports = hiveQueen;