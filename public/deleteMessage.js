let deleteModal = document.getElementById('deleteModal');
let confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
let cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let currentMessageId = null;


document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        currentMessageId = this.getAttribute('data-message-id');
        deleteModal.style.display = 'block';
    });
});


cancelDeleteBtn.addEventListener('click', function() {
    deleteModal.style.display = 'none';
    currentMessageId = null;
});


confirmDeleteBtn.addEventListener('click', function() {
    if (currentMessageId) {

        window.location.href = `/messages/${currentMessageId}/delete`;
    }
});


window.addEventListener('click', function(event) {
    if (event.target === deleteModal) {
        deleteModal.style.display = 'none';
        currentMessageId = null;
    }
});
