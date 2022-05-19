const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const playList = $('.playlist')
const cd = $('.cd')

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const play = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandomSong: false,
    songs: [
        {
            name: 'Despacito',
            singer: 'NoName',
            path: '../Music_app/music/y2mate.com - Luis Fonsi  Despacito ft Daddy Yankee.mp3',
            image: '../Music_app/img/despacito.jpg'
        },
        {
            name: 'Havana',
            singer: 'NoName',
            path: '../Music_app/music/y2mate.com - Camila Cabello  Havana Audio ft Young Thug.mp3',
            image: '../Music_app/img/havana.jpg'
        },
        {
            name: 'Memories',
            singer: 'NoName',
            path: '../Music_app/music/y2mate.com - Maroon 5  Memories Official Video.mp3',
            image: '../Music_app/img/memories.jpg'
        },
        {
            name: 'On my way',
            singer: 'NoName',
            path: '../Music_app/music/y2mate.com - Alan Walker Sabrina Carpenter  Farruko   On My Way.mp3',
            image: '../Music_app/img/on_my_way.jpg'
        },
        
        
    ],
    render: function(){
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `  
        })
        playList.innerHTML = htmls.join('');
    },
    handleEvents: function(){
        const _this = this
        const cdWidth = cd.offsetWidth;

        //Xử lí cd quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform : "rotate(360deg)"}
        ],{
            duration: 10000, //10s
            iterations: Infinity // Quay vô hạn
        })

        cdThumbAnimate.pause()

        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newcdWidth = cdWidth-scrollTop
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px':0  
            cd.style.opacity = newcdWidth/cdWidth
        }

        playBtn.onclick = function(){
           if(_this.isPlaying){
               audio.pause()
           }else{
               audio.play()
           }
        }
        
        // Khi play bài hát
        audio.onplay = function(){
            play.classList.add('playing')
            _this.isPlaying = true
            cdThumbAnimate.play()
        }

        // khi pause bài hát
        audio.onpause = function(){
            play.classList.remove('playing')
            _this.isPlaying = false;
            cdThumbAnimate.pause()
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
           if(audio.duration){
               const progressPercent = Math.floor(audio.currentTime/audio.duration * 100)
               progress.value = progressPercent
           }
        }

        // Xử lí khi tua nhanh bài hát 
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Khi next bài hát
        nextBtn.onclick = function(){
            if(_this.isRandomSong){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
        }

        // Khi prev bài hát
        prevBtn.onclick = function(){
            if(_this.isRandomSong){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
        }

        // Khi nút random bài hát được chọn
        randomBtn.onclick = function(){
            _this.isRandomSong = !_this.isRandomSong
            randomBtn.classList.toggle('active',_this.isRandomSong)
        }

        audio.onended = function(){
            _this.nextSong()
            audio.play()
        }

    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    nextSong: function(){  
        if(this.isRandomSong){
            const start = 0
            const end = this.songs.length 
            this.currentIndex = Math.floor(Math.random() * end)
            console.log(this.currentIndex)
        }
        else{
            this.currentIndex++
            if(this.currentIndex >= this.songs.length){
                this.currentIndex = 0
            }
            console.log(this.currentIndex)
        }
        
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function(){
        this.defineProperties()
        this.render()
        this.loadCurrentSong()
        this.handleEvents()

    }
}
app.start();



