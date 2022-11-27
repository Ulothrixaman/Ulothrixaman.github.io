let menu = document.getElementsByClassName('menu')[0];
let options = document.getElementsByClassName('menu')[3];
let songs = document.getElementsByClassName('songs')[0];
let playlist_ele = menu.parentElement.children[2];
let settings_ele = menu.parentElement.children[3];
let semaphore = 1;


function load_song_complete() {
    menu.children[2].children[1].children[3].children[1].innerText = playlist.length;
    songs.innerHTML = '';
    for (let ii = 0; ii < playlist.length; ii++) {
        songs.innerHTML += `<div class="song" id="${ii}">${playlist[ii].name}</div>`
    }
    Array.from(songs.children).forEach(song_key => {
        song_key.addEventListener('click', () => {
            play_musicNum(parseInt(song_key.getAttribute('id')));
        })
    })
}


window.addEventListener('click', (e) => {
    if (semaphore && menu.classList.length > 1) {
        setTimeout(() => {
            if (playlist_ele.classList.length > 1) {
                if (e.clientX < (menu.offsetLeft) || e.clientX > (menu.offsetLeft + 2 * menu.offsetWidth)) {
                    menu.classList.remove('menu_show');
                    playlist_ele.classList.remove('my-playlist');
                    if (options.classList.length > 1) {
                        options.classList.remove('menu_show');
                    }
                }
            }
            else if (settings_ele.classList.length > 1) {
                if (e.clientX < (menu.offsetLeft) || e.clientX > (menu.offsetLeft + 2 * menu.offsetWidth)) {
                    menu.classList.remove('menu_show');
                    settings_ele.classList.remove('my-playlist');
                    if (options.classList.length > 1) {
                        options.classList.remove('menu_show');
                    }
                }
            }
            else {
                if (e.clientX < menu.offsetLeft || e.clientX > (menu.offsetLeft + menu.offsetWidth)) {
                    menu.classList.remove('menu_show');
                }
                if (e.clientX < menu.offsetLeft || e.clientX > (menu.offsetLeft + menu.offsetWidth)) {
                    if (options.classList.length > 1) {
                        options.classList.remove('menu_show');
                    }
                }
            }
        }, 200);
    }
})


function show_menu() {
    menu.classList.add('menu_show');
}


function show_playlist() {
    if (settings_ele.classList.length > 1)
        close_single_window();
    if (playlist_ele.classList.length > 1)
        playlist_ele.classList.remove('my-playlist');
    else {
        playlist_ele.classList.add('my-playlist');
    }
}


function show_settings() {
    if (playlist_ele.classList.length > 1)
        close_single_window();
    if (settings_ele.classList.length > 1)
        settings_ele.classList.remove('my-playlist');
    else
        settings_ele.classList.add('my-playlist');
}

function show_option() {
    if (options.classList.length == 1)
        options.classList.add('menu_show');
    else
        options.classList.remove('menu_show');
}

function close_option() {
    console.log('hello');
    if (options.classList.length > 1) {
        options.classList.remove('menu_show');
    }
}

function close_single_window() {
    semaphore = 0;
    if (playlist_ele.classList.length > 1)
        playlist_ele.classList.remove('my-playlist');
    else if (settings_ele.classList.length > 1)
        settings_ele.classList.remove('my-playlist');
    if (options.classList.length > 1) {
        options.classList.remove('menu_show');
    }
    setTimeout(() => {
        semaphore = 1;
    }, 500);
}




function close_double_window() {
    if (playlist_ele.classList.length > 1) {
        menu.classList.remove('menu_show');
        playlist_ele.classList.remove('my-playlist');
    }
    else if (settings_ele.classList.length > 1) {
        menu.classList.remove('menu_show');
        settings_ele.classList.remove('my-playlist');
    }
    else {
        menu.classList.remove('menu_show');
    }
}


let error_ele = document.getElementsByClassName('demo-preview')[0];
function show_error(mytext) {
    console.log(mytext)
    error_ele.style.zIndex = 5;
    error_ele.children[0].children[2].innerHTML = mytext;
    error_music = new Audio('/error_songs/Alarm0' + error_song + '.wav');
    error_music.play();
}


function hide_error() {
    error_ele.style.zIndex = -1;
    error_music.pause();
}


function song_name(song_name) {
    if (song_name.length > 25) {
        let new_song_name = (song_name + "____" + song_name + "____" + song_name + "____" + song_name + "____" + song_name);
        return new_song_name;
    }
    else {
        return song_name;
    }
}

function run_song_name() {
    console.log('hello');
    body__info[1].classList.add('info__song_run')
    let temp_count = 0, temp_w = -body__info[1].offsetWidth;
    console.log(temp_w);
   song_int =  setInterval(() => {
        temp_count -= 10;
        body__info[1].style.left = temp_count + 'px';
        if (temp_count <= temp_w) temp_count = 270;
    }, 200);
}