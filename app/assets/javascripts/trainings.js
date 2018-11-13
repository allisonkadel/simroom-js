$(function() {

    $("a.new_training").on('click',function(e) {
        e.preventDefault();

        $.get(this.href).success(function(response) {
          //  $("div.training_form").html(response)
          console.log(response)
        });
    });

    $("#new_training").on('submit',function(e) {
        e.preventDefault();
        alert("this is working");
    });

    // $.ajax({
    //     method: 'GET',
    //     url: this.href,
    // }).done(function(response) {
    //     $("div.reports").html(response)
    // }).error(function(response) {
    //     alert("something went wrong :(");
    // });

});