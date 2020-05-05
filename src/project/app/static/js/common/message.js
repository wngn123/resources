/**
 * Created by wang on 2017-02-26.
 */
function showMessage(content,fast) {
    if(fast){
        $("#message").html(content);
        $("#message").fadeIn(200);
        setTimeout('$("#message").fadeOut(400);', 1000);
    }else{
        $("#message").html(content);
        $("#message").fadeIn(2000);
        setTimeout('$("#message").fadeOut(3000);', 5000);
    }

}