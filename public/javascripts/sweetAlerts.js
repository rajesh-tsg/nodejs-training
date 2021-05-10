// Swal.fire({
//   title: 'Error!',
//   text: 'Do you want to continue',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// });

function success() {

}


function confirmAlertWithReason(api, token, postData) {
  console.log('API: ', api);
  Swal.fire({
    title: 'Are you sure? If yes, please type in your feedback.',
    input: 'textarea',
    inputLabel: 'Feedback/Reason',
    inputPlaceholder: 'Type your feedback/reason here...',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      if (result.value === '') {
        errorNotification('Please enter a Feedback/Reason');
      } else {
        Swal.showLoading();
        postData.reason = result.value;
        console.log('AJAX Call here');
        $.ajax({
          type: "PUT",
          url: api,
          dataType: 'JSON',
          data: postData,
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function success(result) {
            console.log(result);
            successNotification(result.message);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          },
          error: function error(error) {
            console.log(error);
            // $('.custom-container').noty({text: error.responseText.message});
            errorNotification(error.responseJSON.message);
          }
        })
      }
    }
  })
}