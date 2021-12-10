const artistBtn = document.querySelector('.main__artist--button');
const settingBtn = document.querySelector('.settings--button');
const pictiresBtn = document.querySelector('.main__picture--button');
const backToMain = document.querySelector('.settings__button--back');
const categories = document.querySelectorAll('.categories__cart--item');
const backToMainFromCategory = document.querySelector('.categories__settings--button');
const closeArtists = document.querySelector('.artists__header--close');
const categoriesContainer = document.querySelector('.categories__cart');
const toMainMenu = document.querySelector('.artists__header--close');
const closePopup = document.querySelector('.exit__button--close');
const toGame = document.querySelector('.exit__button--continue');
const closeGameMenu = document.querySelector('.exit__button--cancel');
const answerButton = document.querySelector('.answer__button');
const saveBtn = document.querySelector('.settings__button--save');
const defaultBtn = document.querySelector('.settings__button--default');
const closePictures = document.querySelector('.pictures__header--close');
const score = document.querySelectorAll('.categories__cart__score');
const categoriesHome = document.querySelector('.categories__header--home');

const settingPage = document.querySelector('.settings');
const mainPage = document.querySelector('.main');
const categoryPage = document.querySelector('.categories');
const footer = document.querySelector('.footer');
const artists = document.querySelector('.artists');
const picture = document.querySelector('.pictures');
const exit = document.querySelector('.exit');
const answer = document.querySelector('.answer');
const endGame = document.querySelector('.endgame');
const minus = document.querySelector('.settings__button--minus');
const plus = document.querySelector('.settings__button--plus');
const endGameBtn = document.querySelector('.endgame__continue');

settingBtn.addEventListener('click', () => toSettings());
artistBtn.addEventListener('click', () => toCategory());

backToMain.addEventListener('click', () => toMenu());
backToMainFromCategory.addEventListener('click', () => toSettingsFromCategory());
toMainMenu.addEventListener('click', () => closeGame());
closePopup.addEventListener('click', () => closePop());
toGame.addEventListener('click', () => closePop());
closeGameMenu.addEventListener('click', () => fromGameToMenu());
closePictures.addEventListener('click', () => closeGame());
categoriesHome.addEventListener('click', function(){
    categoryPage.classList.add('hide');
    mainPage.classList.remove('hide');
});
endGameBtn.addEventListener('click', function(){
    endGame.classList.add('hide');
    categoryPage.classList.remove('hide');
    answer.classList.add('hide');
    picture.classList.add('hide');
});

const artistAnswerImage = document.querySelector('.answwer__image');
const artistAnswerName = document.querySelector('.answwer__picture');
const artistAnswerText = document.querySelector('.answwer__text');

const artistImage = document.querySelector('.artists__image');
let inputTime = document.querySelector('.settings__input');
const timer = document.querySelector('.artists__header--timer');
const timerPictures = document.querySelector('.pictures__header--timer');
const answersItems = document.querySelectorAll('.artists__answers--item');
const answersPictureItems = document.querySelectorAll('.pictures__answers--item');
const answersPictureIndicator = document.querySelectorAll('.pictures__answers--indicator');
const checkedItem = document.querySelector('.artists__answers');
const checkedItemPicture = document.querySelector('.pictures__answers');
const artistIndicator = document.querySelector('.artists__indicator');
const result = document.querySelector('.endgame__text--result');
const artistItems = document.querySelectorAll('.artists__answers--item');
let isPlay = false;
const volumeLine = document.querySelector('.settings__volume--range');
const setGame = document.querySelector('.settings__game--check');
let audio = new Audio('./audio/Красивая Музыка Без Слов Для Отдыха. 15 минут (256  kbps).mp3');
const artistsDots = document.querySelectorAll('.artists__answers--dot');
const picturesDots = document.querySelectorAll('.pictures__answers--dot');


const artistsDotsItems = arrayFromOBlect(artistsDots);
const picturesDotsItems = arrayFromOBlect(picturesDots);


const questionsAutor = [];
const questionsName = [];
const answers = [];
const answersPictures = [];

window.onload = function () {
    isPlay = true;
    setTimeout(playAudio, 5000);
    getLocalStorage();
}
window.addEventListener("load", getLocalStorage);

let value = parseInt(inputTime.textContent);

minus.addEventListener('click', function () {
    inputTime.value = parseInt(inputTime.value) - 5;
    if (inputTime.value < 5) {
        inputTime.value = 5;
    }
    inputTime.setAttribute('value', inputTime.value);
})

plus.addEventListener('click', function () {
    inputTime.value = (parseInt(inputTime.value) + 5);
    if (inputTime.value > 30) {
        inputTime.value = 30;
    }
    inputTime.setAttribute('value', inputTime.value);
})

async function getQuotes() {
    const quotes = './data/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    return data;
};

const dataArr = await getQuotes();
console.log(dataArr)
function arrChange() {
    dataArr.forEach((item, index) => {
        if (index % 2 === 0) {
            questionsAutor.push(item);
        }
        if (index % 2 !== 0) {
            questionsName.push(item);
        }
    })
}
arrChange();

const splitArr = (arr, chunks) =>
    [...Array(chunks)]
        .map((_, c) => arr.filter((n, index) => index % chunks === c));

const autors = splitArr(questionsAutor, 12);
const pictures = splitArr(questionsName, 12);
const uniqeAytors = [...new Set(questionsAutor.map(item => item.author))];

function toSettingsFromCategory() {
    categoryPage.classList.add('hide');
    settingPage.classList.remove('hide');
    footer.classList.remove('hide');
}

function toSettings() {
    settingPage.classList.remove('hide');
    mainPage.classList.add('hide');
}

function toCategory() {
    categoryPage.classList.remove('hide');
    mainPage.classList.add('hide');
    footer.classList.add('hide');
}

function toMenu() {
    settingPage.classList.add('hide');
    mainPage.classList.remove('hide');
    footer.classList.remove('hide');
}

function closeGame() {
    exit.classList.remove('hide');
}

function toArtists() {
    artists.classList.remove('hide');
    categoryPage.classList.add('hide');
}

function toArtistQuestion() {
    categoryPage.classList.add('hide');
    artists.classList.remove('hide');
}
function toPictureQuestion() {
    categoryPage.classList.add('hide');
    picture.classList.remove('hide');
}

function closePop() {
    exit.classList.add('hide');
}

function fromGameToMenu() {
    exit.classList.add('hide');
    artists.classList.add('hide');
    mainPage.classList.remove('hide');
}

function arrayFromOBlect(arr) {
    return Array.from(arr);
}

const arrayItems = arrayFromOBlect(answersItems);

let node;
let num;
let numQues = 0;
let questions = 9;
let isTime;

let rightQuestion = 0;
let time = inputTime.value;
    let countTime = `${time}`;

artistBtn.addEventListener('click', () => {
    
    categoryPage.classList.remove('hide');
    mainPage.classList.add('hide');
    footer.classList.add('hide');

    categoriesContainer.onclick = function (event) {
        let target = event.target;
        node = target.parentNode;
        const arrayCat = arrayFromOBlect(categories);
        num = arrayCat.lastIndexOf(node);
        if (num >= 0) {

            toArtistQuestion();
            startGame(autors, num);
            createAnswers(num);
            setTimer();

            checkedItem.addEventListener('click', function (e) {
                stopTimer();
                let target = e.target;
                console.log(target.classList);
                if (target.textContent == autors[num][numQues].author) {
                    target.style.backgroundColor = 'green';
                    rightQuestion++;
                    createImage(num);
                    artistIndicator.classList.add('right');
                    console.log(artistsDotsItems[numQues])
                    artistsDotsItems[numQues].style.backgroundColor = 'green';
                } else {
                    target.style.backgroundColor = 'red'
                    createImage(num);
                    artistIndicator.classList.add('unright');
                    artistsDotsItems[numQues].style.backgroundColor = 'red';
                }
            })

        }
    }
});

pictiresBtn.addEventListener('click', () => {
    categoryPage.classList.remove('hide');
    mainPage.classList.add('hide');
    footer.classList.add('hide');

    categoriesContainer.onclick = function (event) {
        let target = event.target;
        node = target.parentNode;
        const arrayCat = arrayFromOBlect(categories);
        num = arrayCat.lastIndexOf(node);
        let unr = pictures[num][numQues].imageNum;

        if (num >= 0) {

            toPictureQuestion();
            startGamePicture(num);
            createAnswersPicture(num);
            setTimerPicture();

            checkedItemPicture.addEventListener('click', function (e) {
                stopTimerPicture();
                let target = e.target;
                let child = target.childNodes;
                console.log(child);
                console.log(child[1].textContent);
                if (child[1].textContent == pictures[num][numQues].imageNum) {
                    rightQuestion++;
                    createImagePicture(num);
                    artistIndicator.classList.add('right');
                    picturesDotsItems[numQues].style.backgroundColor = 'green';
                } else {
                    createImagePicture(num);
                    artistIndicator.classList.add('unright');
                    picturesDotsItems[numQues].style.backgroundColor = 'red';
                }
            })
        }
    }
})


function setTimer() {
    if (!isTime) {
        isTime = setInterval(updateTime, 1000);
    }
}

function setTimerPicture() {
    if (!isTime) {
        isTime = setInterval(updateTimePicture, 1000);
    }
}

function stopTimer() {
    timer.display = 'none';
    clearInterval(isTime);
    isTime = null;
    timer.innerHTML = `${time}`;
}

function stopTimerPicture() {
    timerPictures.display = 'none';
    clearInterval(isTime);
    isTime = null;
    timerPictures.innerHTML = `${time}`;
}

function startGame(arr) {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Isca7el/image-data/master/full/${autors[num][numQues].imageNum}full.jpg`;
    img.onload = () => {
        artistImage.style.backgroundImage = `url(${img.src})`;
    };
}

function startGamePicture() {
    let title = document.querySelector('.pictures__header--question');
    title.textContent = `Какую картину написал ${pictures[num][numQues].author}?`;
}

function updateTime() {
    timer.textContent = `${countTime}`;
    countTime--;
    if (countTime <= 0) {
        clearInterval(isTime);
        timer.style.display = 'none';
        createImage();
    }
}

function updateTimePicture() {
    timerPictures.textContent = `${countTime}`;
    countTime--;
    if (countTime <= 0) {
        clearInterval(isTime);
        timerPictures.style.display = 'none';
        createImagePicture();
    }
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createImage() {
    timer.style.display = 'none';
    answer.classList.remove('hide');
    const imgAnswer = new Image();
    imgAnswer.src = `https://raw.githubusercontent.com/Isca7el/image-data/master/full/${autors[num][numQues].imageNum}full.jpg`;
    imgAnswer.onload = () => {
        artistAnswerImage.style.backgroundImage = `url(${imgAnswer.src})`;
        artistAnswerName.innerHTML = `${autors[num][numQues].name}`
        artistAnswerText.innerHTML = `${autors[num][numQues].author}, ${autors[num][numQues].year}`;
    };
}

function createImagePicture() {
    timerPictures.style.display = 'none';
    answer.classList.remove('hide');
    const imgAnswer = new Image();
    imgAnswer.src = `https://raw.githubusercontent.com/Isca7el/image-data/master/full/${pictures[num][numQues].imageNum}full.jpg`;
    imgAnswer.onload = () => {
        artistAnswerImage.style.backgroundImage = `url(${imgAnswer.src})`;
        artistAnswerName.innerHTML = `${pictures[num][numQues].name}`
        artistAnswerText.innerHTML = `${pictures[num][numQues].author}, ${pictures[num][numQues].year}`;
    };
}

function createAnswers() {
    answers.push(autors[num][numQues].author);
    let a = 3;
    while (a > 0) {
        let pushItem = uniqeAytors[getRandomNum(0, 66)];
        console.log(pushItem)
        if (pushItem == autors[num][numQues].author) {
            pushItem = uniqeAytors[getRandomNum(0, 66)]
        } else {
            answers.push(pushItem);
        }
        a--;
    }
    shuffle(answers);

    arrayItems.forEach((item, index) => {
        item.innerHTML = answers[index];
    })
}

function createAnswersPicture() {
    answersPictures.push(pictures[num][numQues].imageNum);
    console.log(pictures[num][numQues].imageNum);
    let b = 3;
    while (b > 0) {
        let pushItem = dataArr[getRandomNum(0, 239)];
        console.log(pushItem)
        if (pushItem.author == pictures[num][numQues].author) {
            pushItem = dataArr[getRandomNum(0, 239)];
        } else {
            answersPictures.push(pushItem.imageNum);
        }
        b--;
    }
    shuffle(answersPictures);

    answersPictureIndicator.forEach((item, index) => {
        item.textContent = answersPictures[index];
    })
    console.log(answersPictures);
    answersPictureItems.forEach((item, index) => {
        item.classList.add(`'${parseInt(answersPictures[index])}'`);
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/Isca7el/image-data/master/full/${answersPictures[index]}full.jpg`;
        img.onload = () => {
            item.style.backgroundImage = `url(${img.src})`;
        };
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

answerButton.addEventListener('click', () => nextQuestion());

function nextQuestion() {
    timer.style.display = 'block';
    artistItems.forEach(item => {
        item.style.backgroundColor = 'transparent';
    })
    countTime = `${time}`;
    questions--;
    numQues++; 
    if (questions == 0) {
        endGame.classList.remove('hide');
        result.textContent = `${rightQuestion}/`
        categories[num].style.filter = 'grayscale(0)';
        score[num].textContent = `${rightQuestion}`;
        answer.classList.add('hide');

    }
    startGame(autors, num);
    setTimer();
    answer.classList.add('hide');
    createAnswers(num);
}

function nextQuestionPicture() {
    timer.style.display = 'block';
    countTime = `${time}`;
    questions--;
    numQues++;
    if (questions == 0) {
        endGame.classList.remove('hide');
        result.textContent = `${rightQuestion}`;
        categories[num].style.filter = 'grayscale(0)';
        score[num].textContent = `${rightQuestion}`;
        picture.classList.add('hide');
    }
    startGamePicture(num);
    setTimerPicture();
    answer.classList.add('hide');
    createAnswersPicture(num);
}



function playAudio() {
    if (isPlay) {
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
}

function simulateClick(){
    mainPage.click();
}

volumeLine.addEventListener('click', e =>{
    const volumeLineWidth = window.getComputedStyle(volumeLine).width;
    const newVolume = e.offsetX / parseInt(volumeLineWidth);
    audio.volume = newVolume;
    document.querySelector('.settings__volume--progress').style.width = newVolume *100 + '%';
})

function getLocalStorage() {
    if (localStorage.getItem('inputTime')){
        inputTime.value = localStorage.getItem('inputTime');
        inputTime.setAttribute('value', `${localStorage.getItem('inputTime')}`);
    } else {
        inputTime.value = localStorage.getItem('inputTimeDefault');
        inputTime.setAttribute('value', `${localStorage.getItem('inputTimeDefault')}`);
    }

    if (localStorage.getItem('setGame')){
        setGame.checked = localStorage.getItem('setGame');
        inputTime.setAttribute('value', `${localStorage.getItem('inputTime')}`);
    }else {
        setGame.checked = localStorage.getItem('setGameDefault');
        inputTime.setAttribute('value', `${localStorage.getItem('inputTimeDefault')}`);
    }
}

saveBtn.addEventListener('click', function (){
    localStorage.setItem('inputTime', inputTime.value);
    localStorage.setItem('setGame', setGame.checked);
})

localStorage.setItem('inputTimeDefault', 10);
localStorage.setItem('setGameDefault', true);

defaultBtn.addEventListener('click', function(){
    inputTime.setAttribute('value', `${localStorage.getItem('inputTimeDefault')}`);
    inputTime.value = localStorage.getItem('inputTimeDefault');
    setGame.checked = localStorage.getItem('setGameDefault')
})

function createScore(){

}



