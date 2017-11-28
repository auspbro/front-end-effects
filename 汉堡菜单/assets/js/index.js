/**
 * Created by H_VK on 2017/3/6.
 */
$(document).ready(function() {
    $(".container").click(function() {
        $(".stick").toggleClass(function () {
            return $(this).is('.open, .close') ? 'open close' : 'open';
        });
    });
});