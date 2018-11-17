$(() => {
    bindTrainingClickEvents();
    buildTrainingTemplates();
});

const bindTrainingClickEvents = () => {    

    $(".new_training").on("click", function(e) {
        e.preventDefault();
        $.get(this.href).success(function(response) {
            $("div.training_form").html(response)
        });
    });

    $(document).on('submit', '#new_training',function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: this.action,
            data: $(this).serialize(),
            dataType: 'json',
            success: function(training) {
                let newTraining = new Training(training)
                let indexTraining = newTraining.renderIndexTraining()
                $('ul').prepend(indexTraining)
                $('.back_to_trainings').remove()
            }
        });
    });

    $(document).on('click','.show_link', function(e) {
        e.preventDefault();
        $.get(`${this.href}`, null, null, 'json').success(function(training) {
            let newTraining = new Training(training)
            let TrainingHtml = newTraining.renderShowTraining()
            let buttonHtml = newTraining.formatShowButtons()
            $('body').html(TrainingHtml + buttonHtml)
        });
    });

    $(document).on('click','.next-training', function(e) {
        let id = $(this).attr('data-id')
        $.get(`/trainings/${id}/next`).success(function(training) {
            let nextTraining = new Training(training)
            let TrainingHtml = nextTraining.renderShowTraining()
            let buttonHtml = nextTraining.formatShowButtons()
            $('body').html(TrainingHtml + buttonHtml)
        });
    });

}

const buildTrainingTemplates = () => {

    Training.indexTemplateSource = $('#training-index-template').html();
    Training.indexTemplate = Handlebars.compile(Training.indexTemplateSource)

    Training.showTemplateSource = $('#training-show-template').html();
    Training.showTemplate = Handlebars.compile(Training.showTemplateSource)
}

class Training {
    constructor(training) {
        this.id = training.id
        this.name = training.name
        this.description = training.description
        this.simroom = training.simroom
        this.date = training.date
        this.equipment = training.equipment
        this.user = training.user
    }
    renderIndexTraining() {
        return Training.indexTemplate(this);
    }
    renderShowTraining() {
        return Training.showTemplate(this);
    }
    formatShowButtons() {
        var currentUserRoute = $("#current_user")[0].href
        var currentUser = /\d+$/.exec(currentUserRoute);
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
        return `${editButton}${cancelButton}`;
    }
}