$(function() {

    $("a.new_training").on('click',function(e) {
        e.preventDefault();

        $.get(this.href).success(function(response) {
            $("div.training_form").html(response)
        });
    });

});