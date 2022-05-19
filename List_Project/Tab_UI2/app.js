const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tabs = $$('.tab-item')
const line = $('.line')
const panes = $$('.tab-pane')

const tempt = $('.tab-item.active')
line.style.width = tempt.offsetWidth + 'px'

tabs.forEach((tab,index) => {
    const pane = panes[index] 
    tab.onclick = function(){
       $('.tab-pane.active').classList.remove('active')
       $('.tab-item.active').classList.remove('active')
       this.classList.add('active')
       pane.classList.add('active')
       line.style.left = this.offsetLeft + 'px'
       line.style.width = this.offsetWidth + 'px'
    }
})
