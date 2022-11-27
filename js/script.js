let control_btn = document.getElementsByClassName('list--buttons')[0].children;
let body__cover = document.getElementsByClassName('body__cover')[0].children;
let body__info = document.getElementsByClassName('body__info')[0].children;
body__cover[3].style.left = body__cover[2].offsetLeft + 'px';
body__cover[4].style.left = body__cover[2].offsetLeft + 'px';
body__cover[4].style.width = 0;
body__info[1].style.left = 0;
let abc, xx, Music, Music_index = 0, timeint = -1, song_int = -1, music_list = [], playlist = [], error_song = 6, error_music, flag = 0, temp_count = 0, repeat_status = 0;
let ele = document.getElementById('file');


ele.addEventListener('change', () => {
    load_song();
})

control_btn[1].addEventListener('click', () => {
    if (playlist.length == 0) {
        show_error('list is empty <span onclick="error_handle()" style="color: blue; cursor: pointer; ">click me</span> and Load songs');
        return;
    }
    if (Music.paused) {
        play_music();
    }
    else pause_music();
})


body__cover[2].addEventListener('click', (e) => {
    if (playlist.length == 0) {
        show_error('list is empty <span onclick="error_handle()" style="color: blue;cursor: pointer;">click me</span> and Load songs');
        return;
    }
    seek_music(e.clientX);
})


body__cover[4].addEventListener('click', (e) => {
    if (playlist.length == 0) {
        show_error('list is empty <span onclick="error_handle()" style="color: blue;cursor: pointer;">click me</span> and Load songs');
        return;
    }
    seek_music(e.clientX);
})



function load_song() {
    for (let i = 0; i < ele.files.length; i++) {
        music_list[i] = ele.files[i];
        playlist[i] = music_list[i];
        console.log(music_list[i]);
    }
    Music = new Audio('/songs/' + music_list[Music_index].name);
    let new_song_name = song_name(music_list[Music_index].name);
    document.getElementsByClassName('info__song')[0].innerHTML = `${new_song_name}`;
    load_song_complete();
}


function play_music() {
    if (playlist.length == 0) {
        show_error('list is empty <span onclick="error_handle()" style="color: blue;cursor: pointer;">click me</span> and Load songs');
        return;
    }
    load_song_complete();
    document.getElementById(Music_index).style.color = 'red';
    let new_song_name = song_name(music_list[Music_index].name);
    document.getElementsByClassName('info__song')[0].innerHTML = `${new_song_name}`;
    if (flag)
        run_song_name();
    if (Music.currentTime >= Music.duration) {
        Music = new Audio('/songs/' + music_list[Music_index].name);
        body__cover[3].style.left = body__cover[2].offsetLeft + 'px';
        body__cover[4].style.width = 0;
    }
    Music.play();
    control_btn[1].children[0].innerHTML = '<i class="fa fa-pause"></i>';
    xx = body__cover[2].clientWidth / Music.duration;
    xx /= 10;

    timeint = setInterval(() => {
        body__cover[3].setAttribute('title', parseInt(Music.currentTime));
        body__cover[3].style.left = (parseFloat(body__cover[3].style.left) + xx) + 'px';
        body__cover[4].style.width = (parseFloat(body__cover[4].style.width) + xx) + 'px';
    }, 100);

    Music.addEventListener('ended', () => {
        next_music();
    })
}



function pause_music() {
    Music.pause();
    control_btn[1].children[0].innerHTML = '<i class="fa fa-play"></i>';
    body__info[1].style.left = 0;
    clearInterval(song_int);
    clearInterval(timeint);
}


function next_music() {
    if (playlist.length == 0) {
        show_error('list is empty <span onclick="error_handle()" style="color: blue;cursor: pointer;">click me</span> and Load songs');
        return;
    }
    pause_music();
    body__cover[3].style.left = body__cover[2].offsetLeft + 'px';
    body__cover[4].style.width = 0;
    temp_count = 0;
    timeint = -1;
    Music_index++;
    if (songs_end()) {
        Music = new Audio('/songs/' + music_list[Music_index].name);
        setTimeout(() => {
            play_music();
        }, 100);
    }
}


function previous_music() {
    if (playlist.length == 0) {
        show_error('list is empty <span onclick="error_handle()" style="color: blue;cursor: pointer;">click me</span> and Load songs');
        return;
    }
    pause_music();
    body__cover[3].style.left = body__cover[2].offsetLeft + 'px';
    body__cover[4].style.width = 0;
    temp_count = 0;
    timeint = -1;
    Music_index--;
    Music = new Audio('/songs/' + music_list[Music_index].name);
    setTimeout(() => {
        play_music();
    }, 100);
}


function seek_music(point) {
    let yy = point - body__cover[3].getBoundingClientRect().left;
    let zz = point - body__cover[2].getBoundingClientRect().left;
    body__cover[3].style.left = (parseFloat(body__cover[3].style.left) + yy) + 'px';
    body__cover[4].style.width = (parseFloat(body__cover[4].style.width) + yy) + 'px';
    Music.currentTime = (Music.duration / body__cover[2].clientWidth) * zz;
    console.log((Music.duration / body__cover[2].clientWidth) * zz);
}


function play_musicNum(x) {
    pause_music();
    body__cover[3].style.left = body__cover[2].offsetLeft + 'px';
    body__cover[4].style.width = 0;
    timeint = -1;
    Music_index = x;
    Music = new Audio('/songs/' + music_list[Music_index].name);
    setTimeout(() => {
        play_music();
    }, 100);
}


function replay() {
    body__info[1].style.left = 0;
    Music.currentTime = 0;
    body__cover[3].style.left = body__cover[2].offsetLeft + 'px';
    body__cover[4].style.width = 0;
}


function songs_end() {
    body__info[1].style.left = 0;
    if (repeat_status == 1) {
        Music_index -= 1;
        return 1;
    }
    if (Music_index == playlist.length) {
        if (repeat_status == 2) {
            Music_index = 0;
            return 1;
        }
        Music_index = 0;
        show_error("Music list Ended");
        body__info[1].style.left = 0;
        body__info[1].classList.remove('info__song_run');
        Music = new Audio('/songs/' + music_list[Music_index].name);
        let new_song_name = song_name(music_list[Music_index].name);
        document.getElementsByClassName('info__song')[0].innerHTML = `${new_song_name}`;
        return 0;
    }
    return 1;
}