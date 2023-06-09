function removeSpecialCharacters(input) {
  const pattern = /[^a-zA-Z0-9]/g;
  const sanitisedInput = input.replace(pattern, '');
  return sanitisedInput;
}

function removeSpecialCharExApostrophe(input){
  const pattern = /[^a-zA-Z0-9\s']/g;
  const sanitisedInput = input.replace(pattern, '');
  return sanitisedInput;
}


function addProductHandler(idInput, nameInput) {
    let idSanitised = removeSpecialCharacters(idInput);
    let nameSanitised = removeSpecialCharExApostrophe(nameInput);
    $.ajax({
      type: 'POST',
      url: '/new',
      data: {
        id: idSanitised,
        productName: nameSanitised
      },
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

function deleteButtonHandler(event, id, prodName) {
    event.preventDefault();
    let currentURL = window.location.href;
    let slug = currentURL.substring(currentURL.lastIndexOf("/") + 1);

    if (confirm('Are you sure you want to delete this item?')) {
        $.ajax({
            type: 'DELETE',
            url: '/delete-product',
            data: { id: `${id}` },
            success: function () {
                alert(`${prodName} has been deleted`);
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
