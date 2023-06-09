$(document).ready(function() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    const prodName = document.querySelector('#productCode');
    
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            deleteButtonHandler(event, button.id, prodName.innerHTML);
        });
    });

    let currentPage = window.location.pathname;
    let currentUrl = window.location.href;
    let slug = currentUrl.split('/').pop();
    let linkToKeepActive = $(`a[href='${currentPage}']`);

    if(currentPage.indexOf('view-product') !== -1){
        $('#currentProduct').text(`${slug}`);
        linkToKeepActive = $(`a[href='/all-products']`);
        $('.collapse').addClass('show');
    }else{
        $('.collapse').removeClass('show');
    }

    $('.nav-link').not(linkToKeepActive).removeClass('active');

    linkToKeepActive.addClass('active');

});
