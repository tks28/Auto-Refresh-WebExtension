var seconds = document.getElementById("sec");
var count = document.getElementById("counter");
var button = document.getElementById("start_button");
var counting = document.getElementById("counting");

var refresh = 0;
var counter = 0;
var buttonState = false;

function reload() {
    browser.runtime.sendMessage({message: "reload"}); 
}

function reset() {
    seconds.innerHTML = 1;
    refresh = 0;
    buttonState = false;
    browser.browserAction.setBadgeText({text:""});
}

function button_clickHandler(e) {
    if(buttonState === false){
        refresh = parseInt(seconds.value);
        counter = parseInt(count.value);
        counting.innerText = counter + "";

        if(refresh !== 0) {
            button.style.backgroundImage = 'url("images/stop-button.png")';
            countdown(refresh);
            buttonState = true;
        }
    }
    else {
        browser.runtime.sendMessage({message: "stopped"});
        button.style.backgroundImage = 'url("images/go-button.png")';
        browser.browserAction.setBadgeText({text:""});
        window.location.reload(true);
    }
}

function countdown(seconds) {
    var s = seconds;
    var x = setInterval((function() {
        setInterval(function() {
          if(buttonState === true && counter > 0) { 
            browser.browserAction.setBadgeText({text:"" + s});
            s--;
            if(s < 0) {
              reload();
              s = seconds;
              counter--
              counting.innerText = counter + "";
            }
          }
          else { 
            clearInterval(x);
            browser.browserAction.setBadgeText({text:""});
            alert('The extension have already refresh ' + count.value + ' times');
          }
        }, 1000);  
      })(), 0);
}

document.addEventListener('DOMContentLoaded', function() {
    reset();
    button.addEventListener('click', button_clickHandler);
});