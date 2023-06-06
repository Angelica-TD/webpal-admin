document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-button');
    const prodName = document.querySelector('.prod-name');
    
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            deleteButtonHandler(event, button.id, prodName.innerHTML);
        });
    });
});