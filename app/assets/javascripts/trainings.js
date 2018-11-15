$(() => {
    bindTrainingClickEvents();
});


const bindTrainingClickEvents = () => {    

    $(".new_training").on("click", function(e) {
        e.preventDefault();

        $.get(this.href).success(function(response) {
            $("div.training_form").html(response)
        });
    });

    $("#new_training").on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: this.action,
            data: $(this).serialize(),
            // data: {
            //     'authenticity_token': $("input[name='authenticity_token']").val(),
            //     'training': {
            //         'name': $("#training_name").val(),
            //         'description': $("#training_description").val(),
            //         'simroom': $("#training_simroom").val(),
            //         'date': $("#training_date").val(),
            //         'equipment_id': $("#training_equipment_id").val(),
            //         'user_id': 25
            //     } 
            // },
            success: function(response) {
                $('ul').prepend(response)
                $('.back_to_trainings').remove()
            }
        });
    });

    $('.show_link').on('click', function(e) {
        e.preventDefault();
        fetch('/trainings.json')
    });

    function Training(training) {
        this.id = training.id
        this.name = training.name
        this.desription = training.description
        this.simroom = training.simroom
        this.date = training.date
        this.equipment_id = training.equipment_id
        this.user_id = training.user_id
    }


    // $.ajax({
    //     method: 'GET',
    //     url: this.href,
    // }).done(function(response) {
    //     $("div.reports").html(response)
    // }).error(function(response) {
    //     alert("something went wrong :(");
    // });