$(function() {
    $("a.load_reports").on('click',function(e) {
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: this.href,
        }).done(function(response) {
            $("div.reports").html(response)
        }).error(function(response) {
            alert("something went wrong :(");
        });
    });
});

