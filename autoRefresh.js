var seconds = document.getElementById("sec");
var count = document.getElementById("counter");
var button = document.getElementById("start_button");

var refresh = 0;
var counter = 0;
var buttonState = false;

function button_clickHandler(e) {
    if(buttonState === false){
        refresh = parseInt(seconds.value);
        //counter = parseInt(count.value);

        if(refresh !== 0){
            button.style.backgroundImage = 'url("images/stop-button.png")';
            countdown(refresh);
        }
    }
}

function countdown(seconds) {
    var s = seconds;
    var x = setInterval((fucntion(){
        setInterval(function() {
            if(buttonState === true){
                browser.browserAction.setBadgeText({text:''+s});
                s--;

                if(s<0){
                    reload();
                    s = seconds;
                }
            }
            else {
                clearInterval(x);
                browser.browserAction.setBadgeText({text:''});
            }
        }, 1000);
    })(), 0);
}

document.addEventListener('DOMContentLoaded', function(){
    button.addEventListener('click', button_clickHandler);
});