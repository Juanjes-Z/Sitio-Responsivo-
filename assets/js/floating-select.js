function stateCheck($formcontrol){
    if($formcontrol.val().length > 0)
    {
        $formcontrol.addClass('valid');
    }
    else
    {
        $formcontrol.removeClass('valid');
    }}

$(function(){
    
    $('.control-from').on('focusout', function()
    {
        stateCheck($(this));;
    });
});