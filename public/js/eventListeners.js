$(document).ready(function() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    const prodName = document.querySelector('#productCode');
    
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            if(prodName.value){
                deleteButtonHandler(event, button.id, prodName.value);
            }else{
                deleteButtonHandler(event, button.id, prodName.innerHTML);
            }
            
        });
    });

    let currentPage = window.location.pathname;
    let currentUrl = window.location.href;
    let slug = currentUrl.split('/').slice(4, 5).toString();
    let linkToKeepActive = $(`a[href='${currentPage}']`);

    if(currentPage.indexOf('view-product') !== -1){
        $('#currentProduct').text(`${slug}`);
        linkToKeepActive = $('#currentProductUL');
        $('.collapse').addClass('show');
    }else{
        $('.collapse').removeClass('show');
    }

    $('.nav-link').not(linkToKeepActive).removeClass('active');

    linkToKeepActive.addClass('active');

});
