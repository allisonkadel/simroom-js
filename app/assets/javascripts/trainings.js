$(function() {

    // $("a.new_training").on('click',function(e) {
    //     e.preventDefault();

    //     $.get(this.href).success(function(response) {
    //         $("div.training_form").html(response)
    //     });
    // });

    $("#new_training").on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: this.action,
            data: {
                'authenticity_token': $("input[name='authenticity_token']").val(),
                'training': {
                    'name': $("#training_name").val(),
                    'description': $("#training_description").val(),
                    'simroom': $("#training_simroom").val(),
                    'date': $("#training_date").val(),
                    'equipment_id': $("#training_equipment_id").val(),
                    'user_id': 25
                } 
            },
            success: function(response) {
                $('ul').prepend(response)
                $('.back_to_trainings').remove()
            }
        });
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