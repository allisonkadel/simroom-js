// $(function() {

    // CLIENT SIDE LOGIC AJAX MODEL

    // $("a.load_reports").on('click',function(e) {
    //     e.preventDefault();

        // LOW LEVEL AJAX METHOD

        // $.ajax({
        //     method: 'GET',
        //     url: this.href,
        // }).done(function(response) {
        //     $("div.reports").html(response)
        // }).error(function(response) {
        //     alert("something went wrong :(");
        // });

        // HIGHER LEVEL JQUERY METHOD

            // SERVER RESPONDS WITH HTML

        // $.get(this.href).success(function(response) {
        //     $("div.reports").html(response)
        // });

            // SERVER RESPONDS WITH JSON

    //     $.get(this.href).success(function(json) {
    //         $("div.reports").html("")
    //         json.forEach(report => {
    //             $("div.reports").append(`<li> ${report.created_at}: ${report.content} </li>`)
    //         });
    //     });
    // });

    // SERVER SIDE LOGIC AJAX MODEL

    // $("a.load_reports").on('click',function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url: this.href,
    //         dataType: 'script'
    //     });
    // });

// });

$(() => {
    bindClickEvents();
});

const bindClickEvents = () => {
    $("a.load_reports").on('click',function(e){
        e.preventDefault();

        $.get(`${this.href}.json`)
        .success(reports => {

            $(`div.reports-${reports[0].equipment.id}`).html("")
            reports.forEach(report => {
                let newReport = new Report(report)
                let reportHtml = newReport.formatHtml()
                $(`div.reports-${reports[0].equipment.id}`).append(reportHtml);
            });
        });
    });
}

function Report(report) {
    this.id = report.id
    this.content = report.content
    this.created_at = report.created_at
    this.equipment = report.equipment
}

Report.prototype.formatHtml = function() {
    let reportHtml = 
        `<ul><fieldset>
            <legend> ${this.created_at} </legend>
            <p> ${this.content} </p>
        </fieldset></ul>`
    return reportHtml;
}

// class Report {
//     debugger
//     constructor(report) {
//         this.id = report.id;
//         this.content = report.content;
//         this.created_at = report.created_at;
//         this.equipment = report.equipment;
//     }
//   }

