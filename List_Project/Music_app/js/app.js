const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY = 'PRO-PLAYER'


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
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandomSong: false,
    isRepeatSong: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
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
    setConfig: function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    render: function(){
        const htmls = this.songs.map((song,index) => {
            return `
            <div class="song ${index == this.currentIndex ? 'active':''}" data-index="${index}">
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
               console.log(audio.duration   )
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
            _this.render()
        }
        
        // Khi prev bài hát
        prevBtn.onclick = function(){
            if(_this.isRandomSong){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }

        // Khi nút random bài hát được chọn
        randomBtn.onclick = function(){
            _this.isRandomSong = !_this.isRandomSong
            _this.setConfig('isRandomSong',_this.isRandomSong)
            randomBtn.classList.toggle('active',_this.isRandomSong)
        }

        //Khi kết thúc bài hát
        audio.onended = function(){
            if(_this.isRepeatSong){
                audio.play()
            }else{
               nextBtn.click()
            }
        }

        // Lắng nghe hành vi click vào playList
        playList.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            // Xử lí khi click vào bài hát
            if(songNode || e.target.closest('.option')){
                //Xử lí khi click vào bài hát
               if(songNode){
                   
                    _this.currentIndex = Number(songNode.dataset.index)
                    console.log(_this.currentIndex)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
               }
            }
        }


        //Khi ấn nút repeat bài hát
        repeatBtn.onclick = function(){
            _this.isRepeatSong = !_this.isRepeatSong
            _this.setConfig('isRepeatSong',_this.isRepeatSong)
            repeatBtn.classList.toggle('active',_this.isRepeatSong)
        }


    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function(){
        this.isRandomSong = this.config.isRandomSong
        this.isRepeatSong = this.config.isRepeatSong
        //Object.assign(this,this.config) --> không an toàn
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
        // Gan cau hinh tu config vao ung dung
        this.loadConfig()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
        randomBtn.classList.toggle('active',this.isRandomSong)
        repeatBtn.classList.toggle('active',this.isRepeatSong)
        

    }
}
app.start();





