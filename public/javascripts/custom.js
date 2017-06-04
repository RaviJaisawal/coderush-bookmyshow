  function leaveChange() {
    alert('nitin');
    // document.getElementById("btnsubmit").style.display='block';
      document.getElementById("btnsubmit").style.visibility = "visible";
}

$(function () {
    $('document').on('change', '.qty', function() {
        console.log('DIPRAJ');
        alert('Dipraj');
        // $.ajax({
        //     url: '/delete-brand-by-id',
        //     type: 'POST',
        //     dataType: 'json',
        //     data: JSON.stringify(data),
        //     contentType: 'application/json',
        //     cache: false,
        //     timeout: 5000,
        //     complete: function() {
        //         //called when complete
        //     },
        //     success: function() {
        //         $row.parent().parent().remove();
        //         $('.base-modal').modal('hide');
        //     },
        //     error: function() {
        //         //called when error occurs
        //     }
        // });
    });
});
  
