class PlayersTable {
    constructor() {
        this.playersList = [];
        this.log = [];
        this.registerLog = (playerId, actionType, log)=>{
            this.log.push(new Log(playerId, actionType, log));
        };
        this.addPlayer = (id, name, lifeTotal)=>{
            this.playersList.push(new Player(id, name, lifeTotal));
            this.registerLog(id, "add", `${name} has been added to the table`);
        };
        this.removePlayer = (id)=>{
            const name = this.playersList.find(player => player.id === id).name;
            this.playersList = this.playersList.filter(player => player.id !== id);
            this.registerLog(id, "remove", `${name} has been removed from the table`);
        };
        this.updatePlayerValues = (id,key,value)=>{
            const name = this.playersList.find(player => player.id === id).name;
            this.playersList.find(player => player.id === id)[key] = value;
            this.registerLog(id, "update", `${name} has been updated to the table`);
        };
        this.resetTable = ()=>{
            this.playersList = [];
        }
    }
    
}
class Player {
    constructor(id, name, lifeTotal) {
        this.id = id;
        this.name = name;
        this.lifeTotal = lifeTotal;
        this.damageCounter = 0;
        this.plusCount = 0;
        this.minusCount = 0;
    }
}
class Log {
    constructor(playerId, actionType, log) {
        this.playerId = playerId;
        this.actionType = actionType;
        this.log = log;
    }
    
}
export default PlayersTable;