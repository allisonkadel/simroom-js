$(function() {
    $("a.load_reports").on('click',function(e) {
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: this.href,
        }).done(function(data) {
            console.log(data);
        });
    });
});

