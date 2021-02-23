$(function () {
    $('a[href^="#"]').click(function () {
        var speed = 400;
        var href = $(this).attr('href');
        var target = $(href == '#' || href == '' ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({
            scrollTop: position
        }, speed, 'swing');
        return false;
    });
});

$('input[name="accordion-toc"]').change(function () {
    if ($(this).prop('checked')) {
        $('[name="accordion-toclist"]').prop('checked', false);
    }
});
$('input[name="accordion-toclist"]').change(function () {
    if ($(this).prop('checked')) {
        $('[name="accordion-toc"]').prop('checked', false);
    }
});
