let menu = document.getElementsByClassName('menu')[0];
let songs = document.getElementsByClassName('songs')[0];
let playlist_ele = menu.parentElement.children[2];
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
                if (e.clientX <( menu.offsetLeft) || e.clientX > (menu.offsetLeft + 2 * menu.offsetWidth)) {
                    menu.classList.remove('menu_show');
                    playlist_ele.classList.remove('my-playlist');
                }
            }
            else {
                if (e.clientX < menu.offsetLeft || e.clientX > (menu.offsetLeft + menu.offsetWidth)) {
                    menu.classList.remove('menu_show');
                }
            }
        }, 200);
    }
})

function show_menu() {
    menu.classList.add('menu_show');
}

function show_playlist() {
    if (playlist_ele.classList.length > 1)
        playlist_ele.classList.remove('my-playlist');
    else {
        playlist_ele.classList.add('my-playlist');
    }
}


function close_single_window() {
    semaphore = 0;
    playlist_ele.classList.remove('my-playlist');
    setTimeout(() => {
        semaphore = 1;
    }, 500);
}


function close_double_window() {
    if (playlist_ele.classList.length > 1) {
        menu.classList.remove('menu_show');
        playlist_ele.classList.remove('my-playlist');
    }
    else {
        menu.classList.remove('menu_show');
    }
}