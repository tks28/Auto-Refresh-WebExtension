// variables from the html
var seconds = document.getElementById("sec");
var count = document.getElementById("counter");
var button = document.getElementById("start_button");
var counting = document.getElementById("counting");

// local variables
var refresh = 0;
var counter = 0;
var buttonState = false;

// reload function which passes a message to background.js to execute
function reload() {
    browser.runtime.sendMessage({message: "reload"}); 
}

// reset fucntion that resets the extension
function reset() {
    seconds.innerHTML = 1;
    refresh = 0;
    buttonState = false;
    browser.browserAction.setBadgeText({text:""});
}

// function when the button is clicked
function button_clickHandler(e) {
    if(buttonState === false){
        // get the value of seconds and counter from the input
        refresh = parseInt(seconds.value);
        counter = parseInt(count.value);
        counting.innerText = counter + "";

        if(refresh !== 0) {
            // change the image of the button to stop
            button.style.backgroundImage = 'url("images/stop-button.png")';
            // start the countdown
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

// countdown function
function countdown(seconds) {
    var s = seconds;
    // run at a interval time
    var inter = setInterval((function() {
        setInterval(function() {
          if(buttonState === true && counter > 0) { 
            // display the seconds remaining on the badge of the extension
            browser.browserAction.setBadgeText({text:"" + s});
            s--;
            if(s < 0) {
              // if the timer reach 0 refresh the page
              reload();
              s = seconds;
              // update the remaining refresh left
              counter--
              counting.innerText = counter + "";
            }
          }
          else { 
            // if the counter reaches 0
            clearInterval(inter);
            browser.browserAction.setBadgeText({text:""});
            alert('The extension have already refresh ' + count.value + ' times');
          }
        }, 1000);  
      })(), 0);
}

// event listensers after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    reset();
    button.addEventListener('click', button_clickHandler);
});