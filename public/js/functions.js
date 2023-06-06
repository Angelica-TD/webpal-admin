function addProductHandler(formData) {
    var formDataSerialized = formData.serialize();
    $.ajax({
      type: 'POST',
      url: '/new',
      data: formDataSerialized,
      success: function (response) {
        alert('Product successfully added');
        window.location.href = `/view-product/${response.id}`;
      },
      error: function (xhr, status, error) {
        if (xhr.status === 400) {
          alert("Product already exists");
        }
        else if (xhr.status === 404) {
          alert("Some information is missing");
        }

      }
    });
}

function deleteButtonHandler(event, id) {
    event.preventDefault();
    let currentURL = window.location.href;
    let slug = currentURL.substring(currentURL.lastIndexOf("/") + 1);

    if (confirm('Are you sure you want to delete this item?')) {
        $.ajax({
            type: 'DELETE',
            url: '/delete-product',
            data: { id: `${id}` },
            success: function (response) {
                alert(`${response.id} has been deleted`);
                if( slug != 'all-products'){
                    window.location.href = `/all-products`;
                }else{
                    location.reload();
                }
            },
            error: function (xhr, status, error) {
                if (xhr.status === 400) {
                    alert("err 400");
                }
                else if (xhr.status === 404) {
                    alert("err 404");
                }
    
            }
        });

    }
}
