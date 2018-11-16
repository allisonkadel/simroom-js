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

    $(document).on('submit', '#new_training',function(e) {
        alert("this worked")
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

            // how do I get the id of the training we just created?
            // we need this to insert a link on the training title

            // Do I want to make a Training instance for this?
            success: function(response) {
                $('ul').prepend(response)
                $('.back_to_trainings').remove()
            }
        });
    });

    $('.show_link').on('click', function(e) {
        e.preventDefault();
        $.get(`${this.href}.json`).success(function(training) {
            let newTraining = new Training(training)
            let TrainingHtml = newTraining.formatShow()
            $('body').html(TrainingHtml)
        });
    });

    $(document).on('click','.next-training', function(e) {
        debugger
        let id = $(this).attr('data-id')
        console.log(id)
        $.get(`/trainings/${id}/next`).success(function(response) {
            alert("it worked")
            console.log(response)
        });
    });

}

    function Training(training) {
        this.id = training.id
        this.name = training.name
        this.description = training.description
        this.simroom = training.simroom
        this.date = training.date
        this.equipment = training.equipment
        this.user = training.user
    }

    Training.prototype.formatShow = function() {
        let currentUserRoute = $("#current_user")[0].href
        let currentUser = /\d+$/.exec(currentUserRoute);
        let editButton = "";
        let cancelButton = "";
        // cancel button is broken - need to send authenticity token manually - is it safe?
        if(currentUser == this.user.id) {
            editButton = `<form class="button_to" method="get" action="/trainings/${this.id}/edit">
                                <input class="back_to_trainings" value="Edit Training" type="submit"></form>`
            cancelButton = `<form class="button_to" method="post" action="/trainings/${this.id}">
                                <input class="back_to_trainings" value="Cancel Training" type="submit">
                                <input name="_method" value="delete" type="hidden"></form>`
        }
        let TrainingHtml = `
        <fieldset>
        <legend> ${this.name} </legend>
        
        <p>
        Description: ${this.description}
        </p>
        <p>
        Room: ${this.simroom}
        </p>
        <p>
        Date: ${this.date}
        </p>
        <p>
        Equipment: <a href="/equipment/${this.equipment.id}/reports">${this.equipment.name}</a>
        </p>
        <p>
        Created by: ${this.user.email}
        </p>
        
        </fieldset>

        <a href="/trainings">Back To Trainings</a>
        
        ${editButton}
        ${cancelButton}

        <button class="next-training" id="data-id-${this.id}">Next Training</button>
       `
        return TrainingHtml;
    }


    // $.ajax({
    //     method: 'GET',
    //     url: this.href,
    // }).done(function(response) {
    //     $("div.reports").html(response)
    // }).error(function(response) {
    //     alert("something went wrong :(");
    // });