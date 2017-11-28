/**
 * Created by H_VK on 2017/2/20.
 */
$(document).on("click", "li", function(){
    $(this).toggleClass("completed");
});

$(document).on("click", "li span", function(){
    $(this).parent().fadeOut(function(){
        $(this).remove();
    });
})

$("input[type='text']").on("keypress", function(){
    if(event.which == 13){
        var newItem = "<li><span><i class='fa fa-trash-o'></i></span>" + $(this).val() + "</li>";
        $("ul").append(newItem);
        $(this).val("");
    }
});

$("h1 i").click(function(){
    $(".slide").slideToggle();
});

