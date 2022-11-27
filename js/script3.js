function repeat_action(number) {
    repeat_status = number;
    if (number == 0) {
        options.children[1].children[0].classList.add('selected_repeat');
        options.children[1].children[1].classList.remove('selected_repeat');
        options.children[0].children[0].innerHTML = 'No Repeat'
        options.children[1].children[2].classList.remove('selected_repeat');
    }
    else if (number == 1) {
        options.children[1].children[0].classList.remove('selected_repeat');
        options.children[1].children[1].classList.add('selected_repeat');
        options.children[1].children[2].classList.remove('selected_repeat');
        options.children[0].children[0].innerHTML = 'Repeat One'
    }
    else {
        options.children[1].children[0].classList.remove('selected_repeat');
        options.children[1].children[1].classList.remove('selected_repeat');
        options.children[1].children[2].classList.add('selected_repeat');
        options.children[0].children[0].innerHTML = 'Repeat All'
    }
}

function alarm_action(number) {
    error_song = number + 1;
    Array.from(options.children[1].children).forEach(tone => {
        tone.classList.remove('selected_repeat');
    })
    options.children[1].children[number].classList.add('selected_repeat');

}



function feed_option_content(number) {
    options.innerHTML = '';
    if (number == 0) {
        options.innerHTML =`<div class="header" style="background-color: #2196f3;">
                    <div class="name_com">Alarm</div>
                    <div class="cancel" onclick="close_option()"><svg class="w-6 h-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg></div>
                </div>
                <div class="songs" style="text-align: center;">
                    <div onclick="alarm_action(0)" class="song">Alarm-1</div>
                    <div onclick="alarm_action(1)" class="song">Alarm-2</div>
                    <div onclick="alarm_action(2)" class="song">Alarm-3</div>
                    <div onclick="alarm_action(3)" class="song">Alarm-4</div>
                    <div onclick="alarm_action(4)" class="song">Alarm-5</div>
                    <div onclick="alarm_action(5)" class="song selected_repeat">Alarm-6</div>
                    <div onclick="alarm_action(6)" class="song">Alarm-7</div>
                    <div onclick="alarm_action(7)" class="song">Alarm-8</div>
                    <div onclick="alarm_action(8)" class="song">Alarm-9</div>
                </div>`
    }
    else if (number == 1) {
        options.innerHTML =`<div class="header" style="background-color: #2196f3;">
                    <div class="name_com">Colors</div>
                    <div class="cancel" onclick="close_option()"><svg class="w-6 h-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg></div>
                </div>
                <div class="songs" style="text-align: center;">
                    <div onclick="alarm_action(0)" style="background-color: red;" class="song">Red</div>
                    <div onclick="alarm_action(1)" style="background-color: blue;" class="song">Blue</div>
                    <div onclick="alarm_action(2)" style="background-color: green;" class="song">Green</div>
                    <div onclick="alarm_action(3)" style="background-color: yellow;" class="song">Yellow</div>
                    <div onclick="alarm_action(4)" style="background-color: black;" class="song">Black</div>
                </div>`

    }
    else if (number == 2) {
        options.innerHTML = ` <div class="header" style="background-color: #2196f3;">
                    <div class="name_com">Choose</div>
                    <div class="cancel" onclick="close_option()"><svg class="w-6 h-6" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg></div>
                </div>
                <div class="songs" style="text-align: center;">
                    <div onclick="repeat_action(0)" class="song selected_repeat">No Reapet</div>
                    <div onclick="repeat_action(1)" class="song">Reapet One</div>
                    <div onclick="repeat_action(2)" class="song">Reapet All</div>
                </div>`
    }
}