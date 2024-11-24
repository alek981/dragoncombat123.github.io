const app = document.querySelector('.app')
const tap  = document.querySelector('.display_tap')
const coin = document.querySelector('#Wallet_coin')
const energy = document.querySelector('#energy_123')
const levelProgres = document.querySelector('.Level_progress')
const level123 = document.querySelector('#level')
const main = document.querySelector('.display_footer_3')
const content = document.querySelector('.display_content')
const mine_content = document.querySelector('.mine_content')
const exhcange = document.querySelector('.display_footer_2')
const buyButtns = document.querySelectorAll('.boy_card')

const data = {
    coin: localStorage.getItem('coin') ? parseInt(localStorage.getItem('coin')) : 0,
    energy: 1000,
    profit: 1,
    level: 1,
    level_progres: 0,
    erne_per_tap: 1
}

function updateCoinDisplay() {
    coin.innerHTML = data.coin;
}                        

updateCoinDisplay();

const menuPages = {
    mine:`<div class="display_nav">
                    <div class="nav_item_1">
                        Earn per tap
                        <p>+1</p>
                    </div>
                    <div class="nav_item_2">
                        coins to level up
                        <p>100 K</p>
                    </div>
                    <div class="nav_item_3">
                        Profit per hour
                        <p>0 K</p>
                    </div>
                </div>
                <div class="display_wallet">
                    <img src="./img/hamstr_coin.png" alt="">
                    <span id="Wallet_coin">0</span>
                </div>
                <div class="display_progress">
                    <p>Level <span id="level">1</span>/1000000000</p>
                    <div class="Level_bar">
                        <div class="Level_progress"></div>
                    </div>
                </div>
                <div class="display_tap">
                    <img src="./img/Level1.png" alt="">
                </div>
                <div class="display_energy">
                    <img src="./img/Energi.png" alt=""> <span id="energy_123">1000</span>/1000
                 </div>
                 <div class="display_footer">
                    <div class="display_footer_1">
                        <img src="./img/jgkjdkdlf.png" alt="">
                        <p>frinds</p>
                    </div>
                    <div class="display_footer_2">
                        <img src="./img/benans.png" alt="">
                        <p>exange</p>
                    </div>
                    <div class="display_footer_3">
                        <img src="./img/mine.png" alt="">
                        <p>mine</p>
                    </div>
                 </div>
            </div>
        </div>`
}

buyButtns.forEach((value, index, array) => {
    value.addEventListener('click', function() {
        let price = value.dataset.price;
        if(price < data.coin) {
            data.coin = data.coin - price;
            data.profit = data.profit + 200;
            localStorage.setItem('coin', data.coin); // Сохраняем новое значение в localStorage
            updateCoinDisplay(); // Обновляем отображение
        }
    });
});

function changeToMnu() {
    mine_content.style.display = 'flex';
    content.style.display = 'none';
}

function changeToGame() {
    mine_content.style.display = 'none';
    content.style.display = 'flex';
}

function handlGreeting() {
    let div = document.createElement('div');
    let img = document.createElement('img');
    div.classList.add('greating');
    img.src = '../img/Hamster_poster.png';
    div.appendChild(img);           

    document.body.appendChild(div);
    setTimeout(function() {
        div.remove();
        app.style.display = 'flex';
    }, 6000);
}

function handlTap(e) {
    if(data.energy > 0) {
        data.coin = data.coin + data.erne_per_tap;
        data.energy = data.energy - 1;
        localStorage.setItem('coin', data.coin);
        updateCoinDisplay();
        energy.innerHTML = data.energy;
        tap.classList.add('tap_mod');
        let timer = setTimeout(() => {
            tap.classList.remove('tap_mod');
            clearTimeout(timer);
        }, 100);
        const money = document.createElement('img');
        money.src = '../img/hamstr_coin.png';
        money.classList.add('money');
        app.appendChild(money);
        money.style.left = e.clientX + 'px';
        money.style.top = e.clientY - 50 + 'px';
        setTimeout(() => {
            money.remove();
        }, 1000);
    }
}

function errenOraSecond() {
    let profitInterval = setInterval(function() {
        data.coin = data.coin + data.level;
        localStorage.setItem('coin', data.coin);
        updateCoinDisplay();
    }, 1000);
}

function energyRecovery() {
    let energyInterval = setInterval(function() {
        if(data.energy < 1000) {
            data.energy = data.energy + 1;
            energy.innerHTML = data.energy;
        }
    }, 1000);
}

function ubgrateLevel() {
    if(data.level_progres >= 100) {
        data.erne_per_tap = data.erne_per_tap + data.level;
        data.level = data.level + 1;
        data.level_progres = 0;

        levelProgres.style.width = data.level_progres + '%';
        level123.innerHTML = data.level;
    }        
    data.level_progres = data.level_progres + 1;
    levelProgres.style.width = data.level_progres + '%';
}

handlGreeting();
tap.addEventListener('click', handlTap);
errenOraSecond();
energyRecovery();
tap.addEventListener('click', ubgrateLevel);
main.addEventListener('click', changeToMnu);
exhcange.addEventListener('click', changeToGame);