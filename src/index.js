const app = document.querySelector('.app')
const tap  = document.querySelector('.display_tap')
const coin = document.querySelector('#Wallet_coin')
const energy = document.querySelector('#energy_123')
const levelProgres = document.querySelector('.Level_progress')
const level123 = document.querySelector('#level')

const data = {
    coin:0,
    energy:1000,
    profit:1,
    level:1,
    level_progres:0,
    erne_per_tap:1
}










function handlGreeting(){
    let div = document.createElement('div');//создаём блок
    let img = document.createElement('img');
    div.classList.add('greating')
    img.src='../img/Hamster_poster.png'
    div.appendChild(img);           

    document.body.appendChild(div);

    setTimeout(function(){
        div.remove()
        app.style.display = 'flex'
    },6000)
}

function  handlTap(e){
    if(data.energy > 0){
        data.coin = data.coin + data.erne_per_tap;
        data.energy = data.energy - 1;
        coin.innerHTML = data.coin;
        energy.innerHTML = data.energy
        tap.classList.add('tap_mod');
        let timer = setTimeout(() =>{
            tap.classList.remove('tap_mod');
            clearTimeout(timer);
        },100)
        const money = document.createElement('img');
        money.src = '../img/hamstr_coin.png';
        money.classList.add('money');
         app.appendChild(money);
         money.style.left = e.clientX + 'px';
         money.style.top = e.clientY - 50 + 'px';
         setTimeout(()=>{
           money.remove();
         },1000)
    }
}
function errenOraSecond(){
    let profitInterval = setInterval(function(){
        data.coin = data.coin + data.level;
        coin.innerHTML = data.coin;
    },1000)
}
function energyRecovery(){
    let energyInterval = setInterval(function(){
       if(data.energy < 1000){
          data.energy = data.energy + 1;
          energy.innerHTML = data.energy;
       }
    },1000)
    }
function ubgrateLevel(){
    if(data.level_progres >= 100){
        data.erne_per_tap = data.erne_per_tap + data.level;
        data.level = data.level + 1;
        data.level_progres = 0;

        levelProgres.style.width = data.level_progres + '%';
        level.innerHTML = data.level;
}        
    data.level_progres = data.level_progres + 1;
levelProgres.style.width = data.level_progres + '%';
}

//вызовы функций

handlGreeting()

tap.addEventListener('click',handlTap)
errenOraSecond()
energyRecovery()
tap.addEventListener('click',ubgrateLevel)