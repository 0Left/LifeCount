import PlayersTable from './playersTable.js';

class TableController {
    constructor() {
        this.table = new PlayersTable();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add player button listener
        document.getElementById('addPlayerBtn')?.addEventListener('click', () => this.handleAddPlayer());
        
        // Reset table button listener
        document.getElementById('resetTableBtn')?.addEventListener('click', () => this.handleResetTable());
    }

    handleAddPlayer() {
        const nameInput = document.getElementById('playerName');
        const lifeInput = document.getElementById('lifeTotal');
        
        if (nameInput && lifeInput) {
            const name = nameInput.value.trim();
            const lifeTotal = parseInt(lifeInput.value) || 20; // Default to 20 if invalid input
            
            if (name) {
                const playerId = Date.now().toString(); // Generate unique ID
                this.table.addPlayer(playerId, name, lifeTotal);
                this.updateTableDisplay();
                nameInput.value = '';
                lifeInput.value = '20';
            }
        }
    }

    handleRemovePlayer(playerId) {
        this.table.removePlayer(playerId);
        this.updateTableDisplay();
    }

    handleUpdateLife(playerId, amount) {
        const player = this.table.playersList.find(p => p.id === playerId);
        if (player) {
            const newLife = player.lifeTotal + amount;
            this.table.updatePlayerValues(playerId, 'lifeTotal', newLife);
            this.updateTableDisplay();
        }
    }

    handleResetTable() {
        this.table.resetTable();
        this.updateTableDisplay();
    }

    updateTableDisplay() {
        const tableBody = document.getElementById('playersTableBody');
        if (!tableBody) return;

        // Clear current table
        tableBody.innerHTML = '';

        // Add each player to the table
        this.table.playersList.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.name}</td>
                <td>${player.lifeTotal}</td>
                <td>
                    <button onclick="tableController.handleUpdateLife('${player.id}', -1)">-1</button>
                    <button onclick="tableController.handleUpdateLife('${player.id}', 1)">+1</button>
                    <button onclick="tableController.handleRemovePlayer('${player.id}')">Remove</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Update log display
        this.updateLogDisplay();
    }

    updateLogDisplay() {
        const logContainer = document.getElementById('logContainer');
        if (!logContainer) return;

        logContainer.innerHTML = this.table.log
            .map(log => `<div class="log-entry">${log.log}</div>`)
            .join('');
    }
}

// Create and export the controller instance
const tableController = new TableController();
export default tableController;
