class PlayersTable {
    constructor() {
        this.playersList = [];
        this.log = [];
        this.addPlayer = (id, name, lifeTotal)=>{
            this.playersList.push(new Player(id, name, lifeTotal));
        };
        this.removePlayer = (id)=>{
            this.playersList = this.playersList.filter(player => player.id !== id);
        };
        this.updatePlayerValues = (id,key,value)=>{
            this.playersList.find(player => player.id === id)[key] = value;
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