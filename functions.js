import PlayersTable from './playersTable.js';

class TableController {
    constructor() {
        this.table = new PlayersTable();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Modal controls
        const modal = document.getElementById('addPlayerModal');
        const openModalBtn = document.getElementById('openModalBtn');
        const closeModalBtns = document.getElementsByClassName('close-modal');
        const addPlayerBtn = document.getElementById('addPlayerBtn');
        
        // Log drawer controls
        const logDrawer = document.getElementById('logDrawer');
        const toggleLogBtn = document.getElementById('toggleLogBtn');
        const closeDrawerBtn = document.querySelector('.close-drawer');

        // Open modal
        openModalBtn?.addEventListener('click', () => {
            modal.classList.add('show');
        });

        // Close modal
        Array.from(closeModalBtns).forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('show');
                this.clearForm();
            });
        });

        // Close modal when clicking outside
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                this.clearForm();
            }
        });

        // Add player button
        addPlayerBtn?.addEventListener('click', () => {
            this.handleAddPlayer();
            modal.classList.remove('show');
        });
        
        // Reset table button
        document.getElementById('resetTableBtn')?.addEventListener('click', () => this.handleResetTable());

        // Toggle log drawer
        toggleLogBtn?.addEventListener('click', () => {
            logDrawer.classList.toggle('show');
        });

        // Close log drawer
        closeDrawerBtn?.addEventListener('click', () => {
            logDrawer.classList.remove('show');
        });
    }

    clearForm() {
        const nameInput = document.getElementById('playerName');
        const lifeInput = document.getElementById('lifeTotal');
        if (nameInput) nameInput.value = '';
        if (lifeInput) lifeInput.value = '20';
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
                this.clearForm();
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
                <td class="action-buttons">
                    <div class="life-controls">
                        <div class="life-control-group">
                            <button onclick="tableController.handleUpdateLife('${player.id}', -5)">-5</button>
                            <button onclick="tableController.handleUpdateLife('${player.id}', -3)">-3</button>
                            <button onclick="tableController.handleUpdateLife('${player.id}', -1)">-1</button>
                            <button onclick="tableController.handleUpdateLife('${player.id}', 1)">+1</button>
                            <button onclick="tableController.handleUpdateLife('${player.id}', 3)">+3</button>
                            <button onclick="tableController.handleUpdateLife('${player.id}', 5)">+5</button>
                        </div>
                        <button class="remove-btn" onclick="tableController.handleRemovePlayer('${player.id}')">Remove</button>
                    </div>
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
