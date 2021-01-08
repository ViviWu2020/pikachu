const string = `
/*开局第一步reset一下下~*/
.skin*{box-sizing: border-box;margin: 0;padding: 0;}
.skin*::before,.skin*::after{box-sizing: border-box;}

/*首先这只小精灵有黄黄的皮肤*/

.skin{
    background: #ffe600;
    min-height: 50vh;
    position: relative;   
}

/*接着是黑黑的小鼻子*/

.nose{
    border: 10px solid black;
    border-color:black transparent transparent;
    border-bottom: none;
    width: 0px;
    height: 0px;
    position: relative;
    left: 50%;
    top: 145px;
    margin-left: -10px;
    z-index: 10;
}

/*你要是碰它它还会动哦*/

@keyframes wave{
    0%{transform: rotate(0deg);}
    33%{transform: rotate(6deg);}
    66%{transform: rotate(-6deg);}
    100%{transform: rotate(0deg);}
}
.nose:hover{
    transform-origin: 50% 100%;
    animation: wave 200ms infinite;
}
/*然后是眼睛，首先画个圆*/
.yuan{
    position: absolute;
    width: 20px;
    height: 6px;
    top: -16px;
    margin-left: -10px;
    border-radius: 10px 10px 0 0;
    background:black;
}

.eye{
    border: 3.5px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background: #2e2e2e;
    border-radius: 50%;
}
/*加个小白点，变成炯炯有神的卡姿兰大眼睛*/
.eye::before{
    content: '';
    display: block;
    border: 3px solid black;
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    position:relative;
    left: 8px;
    top: 0px;
}
.eye.left{
    transform: translateX(-120px);
}
.eye.right{
    transform: translateX(120px);
}
/*倒数第二步就是嘴巴啦*/
.mouth{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 170px;
    margin-left: -100px;
}
/*来弄一个上嘴唇*/
.mouth .up{
    position: relative;
    top: -20px;
    z-index: 1;
}
.mouth .up .lip{
    border: 3.5px solid black;
    height: 30px;
    width: 80px;
    position: relative;
    left: 50%;
    margin-left: -50px;
    border-top-color: transparent;
    border-right-color: transparent;
    background: #ffe600;
}
.mouth .up .lip.left{
    border-radius: 0 0 0 50px;
    transform: rotate(-15deg) translateX(-32px);
}
.mouth .up .lip.right{
    border-radius: 0 0 50px 0px;
    transform: rotate(15deg) translateX(45px) translateY(-34px);
}
.mouth .up .lip::before{
    content: '';
    display: block;
    width: 7px;
    height: 30px;
    position: absolute;
    bottom: 0;
    background: #ffe600;
}
.mouth .up .lip.left::before{
    right: -6px;
}
.mouth .up .lip.right::before{
    left: -6px;
}
/*舌头也要搞一下*/
.mouth .down{
    width: 100%;
    height: 160px;
    position: absolute;
    top: 0px;
    overflow: hidden;
}
.mouth .down .yuan1{
    border: 3.5px solid black;
    width: 150px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background: #9b000a;
    overflow: hidden;
}
.mouth .down .yuan1 .yuan2{
    background: #ff485f;
    width: 200px;
    height: 300px;
    position: absolute;
    bottom: -180px;
    left: 50%;
    margin-left: -100px;
    border-radius: 100px;
}
.face{
    position: absolute;
    left: 50%;
    border: 3.5px solid black;
    width: 88px;
    height: 88px;
    top: 210px;
    margin-left: -44px;
    z-index: 3;
    border-radius: 50%;
    background: #ff0000;
}
/*最后是脸颊*/
.face > img{
    position: absolute;
    top: 50%;
    left: 50%;
}
.face.left{
    transform: translateX(-180px);
}
.face.left > img{
    transform: rotateY(180deg);
    transform-origin: 0 0;
}
.face.right{
    transform: translateX(180px);
}
/*猜猜我是谁···皮卡丘！*/
`
const demo = document.querySelector('#demo')
const demo2 = document.querySelector('#demo2')
let n = 1
let time = 100
let id
const player = {
    init: ()=> {
        demo.innerText = string.substr(0,n)
        demo2.innerHTML = string.substr(0,n)
        player.play()
        player.bindEvents()
    },
    events : {
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast' :'fast'
    },
    bindEvents: ()=> {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)){
                const value = player.events[key]
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run: ()=> {
        n +=1
        if (n > string.length){
            window.clearInterval(id)
        }
        demo2.innerHTML = string.substr(0,n)  
        demo.innerText = string.substr(0,n)
        demo.scrollTop = demo.scrollHeight
    },
    play: ()=> {
        id = setInterval(player.run,time)
    },
    pause: ()=> {
        window.clearInterval(id)
    },
    slow: ()=> {
        player.pause()
        time = 250
        player.play()
    },
    normal: ()=> {
        player.pause()
        time = 50
        player.play()
    },
    fast: ()=> {
        player.pause()
        time = 0
        player.play()
    }
}
player.init()
