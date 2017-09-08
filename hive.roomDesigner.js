var hiveRoomDesigner = {
    
var creepLimits { // default values? actually this is not run each loop, so idk what happens
    harvesters:         2,
    jack:               0,
    remoteHarvesters:   0,
    truckers:           1,
    remoteTruckers:     0,
    fighters            1, // always able to spawn fighters
    trebushets          0, // hopefully useful after ramparts for defence code.
    palidans            0,
};

    // i dont know what i am doing here, or why this is in this segment.
var bodyUnit {
    harvesters:         [WORK],
    jack:               [WORK, CARRY, MOVE],
    remoteHarvesters:   [WORK, MOVE],
    truckers:           [CARRY, CARRY, MOVE],
    remoteTruckers:     [CARRY, CARRY, MOVE],
    fighters            [MOVE, ATTACK],
    trebushets          [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
    palidans            [TOUGH, MOVE, HEAL],
}
var BodyMax {
    harvesters:         [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    jack:               [],
    remoteHarvesters:   [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    truckers:           [],
    remoteTruckers:     [WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE , MOVE],
    fighters            [],
    trebushets          [],
    palidans            [],
}

    /** @param {Creep} creep **/
    run: function(roomName) {
    var RCL = Game.room[roomName].controller.level;
    if (Game.room[roomName].controller.owner = 'Phillip2550') {
        // my room controller!
        switch (RCL) {
            case 0:
                // Unknown why this would be the case, should probally use whatever creeps available to build a spawn and a claim creep?

            case 1:
                // level 1 code
                // units
                creepLimits.harvesters = 4;
                creepLimits.jack = 4;
                creepLimits.truckers = 2;
                // structures
                // containers [source0, source1, controller] (harvesters take care of the source containers)
            break;
            
            case 2:
                // level 2 code
                creepLimits.harvesters = 4;
                creepLimits.jack = 4;
                creepLimits.trckers = 2;
                // structures
                // containers [source0, source1, controller, ext]
                // ext *5
                
            break;
            
            case 3:
                // level 3 code
                creepLimits.harvesters = 2;
                creepLimits.jack = 4;
                creepLimits.trckers = 2;
                // structures
                // containers [source0, source1, controller, ext]
                // ext *10
                // towers[1x]
                // walls/ramparts 10k
            break;
            
            case 4:
                // level 4 code
                creepLimits.harvesters = 2;
                creepLimits.remoteHarvesters = 2;
                creepLimits.trckers = 1;
                creepLimits.remoteTruckers = 2;
                creepLimits.jack = 2;

                // structures
                // containers [source0, source1, controller, ext]
                // ext *20
                // towers[1x]
                // walls/ramparts 100k
                // storage
            break;
            
            case 5:
                // level 5 code
                creepLimits.harvesters = 2;
                creepLimits.remoteHarvesters = 2;
                creepLimits.trckers = 1;
                creepLimits.remoteTruckers = 2;
                creepLimits.jack = 2;

                // structures
                // containers [source0, source1, controller, ext]
                // ext *30
                // towers[2x]
                // walls/ramparts 250k
                // storage
                // links [storage, controller? ext?]
            break;
            
            case 6:
                // level 6 code
                creepLimits.harvesters = 2;
                creepLimits.remoteHarvesters = 2; //tbd
                creepLimits.trckers = 1;
                creepLimits.remoteTruckers = 2;
                creepLimits.jack = 2;

                // structures
                // containers [source0, source1, controller, ext, mineral]
                // ext *40
                // towers[2x]
                // walls/ramparts 500k
                // storage
                // links [storage, controller, ext]
                // extractor
                // labs [3x]
                // terminal
                // observer
                // powerSpawn
            break;
            
            case 7:
                // level 7 code
                creepLimits.harvesters = 2;
                creepLimits.remoteHarvesters = 2; //tbd
                creepLimits.trckers = 1;
                creepLimits.remoteTruckers = 2;
                creepLimits.jack = 2;

                // structures
                // containers [source0, source1, controller, ext, mineral]
                // ext *50
                // towers[3x]
                // walls/ramparts 1M
                // storage
                // links [storage, controller, ext, source0]
                // extractor
                // labs [6x]
                // terminal
                // observer
                // powerSpawn
            break;
            
            case 8:
                // level 8 code
                creepLimits.harvesters = 2;
                creepLimits.remoteHarvesters = 2; //tbd
                creepLimits.trckers = 1;
                creepLimits.remoteTruckers = 2;
                creepLimits.jack = 2;

                // structures
                // containers [source0, source1, controller, ext, mineral] (code to move these after links are placed?)
                // ext *60
                // towers[6x]
                // walls/ramparts 300M?
                // storage
                // links [storage, controller, ext, source0, source1]
                // extractor
                // labs [10x]
                // terminal
                // observer
                // powerSpawn
            break;
            
            default:
                // not found?
            break;
        }
    }
    else {
        // room.controller not owned by me
    }
};


module.exports = hiveRoomDesigner;