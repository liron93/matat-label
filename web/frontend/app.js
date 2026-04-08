// Label Manager App - Client-side JavaScript
// All label data is stored in browser localStorage

class LabelManager {
    constructor() {
        this.labels = [];
        this.selectedLabelId = null;
        this.STORAGE_KEY = 'shopify-labels';
        this.init();
    }

    init() {
        this.loadLabels();
        this.setupEventListeners();
        this.renderLabels();
        this.updateStats();
    }

    // Load labels from localStorage
    loadLabels() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        this.labels = stored ? JSON.parse(stored) : [];
    }

    // Save labels to localStorage
    saveLabels() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.labels));
        this.updateStats();
    }

    // Setup event listeners
    setupEventListeners() {
        // Form submission
        document.getElementById('labelForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createLabel();
        });

        // Position buttons
        document.querySelectorAll('.position-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.position-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                document.getElementById('labelPosition').value = btn.dataset.position;
            });
        });
    }

    // Create a new label
    createLabel() {
        const name = document.getElementById('labelName').value.trim();
        const text = document.getElementById('labelText').value.trim();
        const color = document.getElementById('labelColor').value;
        const position = document.getElementById('labelPosition').value;

        if (!name || !text) {
            this.showError('Please fill in all required fields');
            return;
        }

        const label = {
            id: Date.now(),
            name,
            text,
            color,
            position,
            createdAt: new Date().toISOString()
        };

        this.labels.push(label);
        this.saveLabels();
        this.renderLabels();
        this.resetForm();
        this.showSuccess(`Label "${name}" created successfully!`);
    }

    // Update an existing label
    updateLabel(id, updates) {
        const label = this.labels.find(l => l.id === id);
        if (label) {
            Object.assign(label, updates);
            this.saveLabels();
            this.renderLabels();
            this.showSuccess('Label updated successfully!');
        }
    }

    // Delete a label
    deleteLabel(id) {
        const label = this.labels.find(l => l.id === id);
        if (label && confirm(`Are you sure you want to delete "${label.name}"?`)) {
            this.labels = this.labels.filter(l => l.id !== id);
            this.saveLabels();
            this.renderLabels();
            this.showSuccess('Label deleted successfully!');
        }
    }

    // Select a label for editing
    selectLabel(id) {
        this.selectedLabelId = this.selectedLabelId === id ? null : id;
        this.renderLabels();
    }

    // Render all labels
    renderLabels() {
        const list = document.getElementById('labelsList');

        if (this.labels.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p>No labels created yet.</p>
                    <p>Create your first label to get started!</p>
                </div>
            `;
            return;
        }

        list.innerHTML = this.labels.map(label => {
            const isSelected = this.selectedLabelId === label.id;
            const createdDate = new Date(label.createdAt).toLocaleDateString();

            return `
                <div class="label-item ${isSelected ? 'selected' : ''}" data-id="${label.id}">
                    <div class="label-name">
                        <span class="label-color-preview" style="background-color: ${label.color}"></span>
                        ${label.name}
                    </div>
                    <div class="label-details">
                        <strong>Text:</strong> "${label.text}"
                    </div>
                    <div class="label-details">
                        <strong>Position:</strong> ${this.getPositionLabel(label.position)}
                    </div>
                    <div class="label-details">
                        <strong>Created:</strong> ${createdDate}
                    </div>
                    <div class="label-actions">
                        <button class="btn-small btn-edit" data-action="edit" data-id="${label.id}">Edit</button>
                        <button class="btn-small btn-delete" data-action="delete" data-id="${label.id}">Delete</button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach event listeners to action buttons
        list.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editLabel(parseInt(btn.dataset.id));
            });
        });

        list.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteLabel(parseInt(btn.dataset.id));
            });
        });

        // Click label item to select
        list.querySelectorAll('.label-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selectLabel(parseInt(item.dataset.id));
            });
        });
    }

    // Edit a label
    editLabel(id) {
        const label = this.labels.find(l => l.id === id);
        if (!label) return;

        // Populate form with label data
        document.getElementById('labelName').value = label.name;
        document.getElementById('labelText').value = label.text;
        document.getElementById('labelColor').value = label.color;
        document.getElementById('labelPosition').value = label.position;

        // Update position buttons
        document.querySelectorAll('.position-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.position === label.position) {
                btn.classList.add('active');
            }
        });

        // Update form button text
        const submitBtn = document.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = `Update "${label.name}"`;

        // Override form submission to update instead of create
        const form = document.getElementById('labelForm');
        const originalHandler = form.onsubmit;

        form.onsubmit = (e) => {
            e.preventDefault();

            const updates = {
                name: document.getElementById('labelName').value.trim(),
                text: document.getElementById('labelText').value.trim(),
                color: document.getElementById('labelColor').value,
                position: document.getElementById('labelPosition').value
            };

            this.updateLabel(id, updates);
            this.resetForm();
            submitBtn.textContent = originalText;
            form.onsubmit = originalHandler;
        };

        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }

    // Reset form to default state
    resetForm() {
        document.getElementById('labelForm').reset();
        document.getElementById('labelColor').value = '#667eea';
        document.getElementById('labelPosition').value = 'top-left';

        // Reset position buttons
        document.querySelectorAll('.position-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.position === 'top-left') {
                btn.classList.add('active');
            }
        });

        // Reset submit button
        const submitBtn = document.querySelector('.btn-primary');
        submitBtn.textContent = 'Create Label';

        // Reset form handler
        document.getElementById('labelForm').onsubmit = null;
    }

    // Show success message
    showSuccess(message) {
        const msgDiv = document.getElementById('successMessage');
        msgDiv.textContent = '✓ ' + message;
        msgDiv.classList.add('show');

        setTimeout(() => {
            msgDiv.classList.remove('show');
        }, 3000);
    }

    // Show error message
    showError(message) {
        const msgDiv = document.getElementById('errorMessage');
        msgDiv.textContent = '✗ ' + message;
        msgDiv.classList.add('show');

        setTimeout(() => {
            msgDiv.classList.remove('show');
        }, 3000);
    }

    // Update statistics
    updateStats() {
        document.getElementById('labelCount').textContent = this.labels.length;
        document.getElementById('status').textContent = 'Ready';
    }

    // Get human-readable position label
    getPositionLabel(position) {
        const labels = {
            'top-left': '↖ Top Left',
            'top-right': '↗ Top Right',
            'bottom-left': '↙ Bottom Left',
            'bottom-right': '↘ Bottom Right'
        };
        return labels[position] || position;
    }

    // Export labels as JSON
    exportLabels() {
        const dataStr = JSON.stringify(this.labels, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'labels-backup.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import labels from JSON
    importLabels(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                this.labels = [...this.labels, ...imported];
                this.saveLabels();
                this.renderLabels();
                this.showSuccess(`Imported ${imported.length} label(s) successfully!`);
            } else {
                this.showError('Invalid import format');
            }
        } catch (e) {
            this.showError('Failed to import labels: ' + e.message);
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.labelManager = new LabelManager();

    // Log app info
    console.log('Label Manager App Initialized');
    console.log('Storage location: localStorage');
    console.log('Storage key: shopify-labels');
});

// Handle page visibility - update stats when page becomes visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.labelManager) {
        window.labelManager.loadLabels();
        window.labelManager.renderLabels();
        window.labelManager.updateStats();
    }
});
