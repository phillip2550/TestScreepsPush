var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTrucker = require('role.trucker');
var roleBarbarian = require('role.barbarian');
var hiveQueen = require('hive.queen');
var hiveMind = require('hive.mind');

module.exports.loop = function () {
    console.log('Tick',Game.time);

// Okay so this is an issue hard coded tower ID(s)...
    const towers = ['59a316b49c967103349eec6b','598eac51e448e2290ebfe86f'];
    for (var i = 0; i < towers.length; i++) {
        var tower = Game.getObjectById(towers[i]);
       // console.log(tower)
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits <= 100000
                });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'trucker') {
            roleTrucker.run(creep);
        }
        if(creep.memory.role == 'defender') {
           roleBarbarian.run(creep);
        }
    }
    if(Game.time % 10 == 0) {
        for(var name in Game.spawns) {
            hiveQueen.run(name);
        }

    }
    
    for(var roomName in Game.rooms){
        hiveMind(roomName);
    }
    if(Game.time % 27 == 0) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
}
console.log("tick executed");
