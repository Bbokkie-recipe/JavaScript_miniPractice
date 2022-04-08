//게임로직 명세서
//랜덤번호(정답) 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다
//랜덤번호가 < 유저번호 Down!
//랜덤번호가 > 유저번호 Up!
//Reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다(더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.

let randNum = 0;
let playBtn = document.getElementById("playbtn");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playBtn.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});
function pickRandomNumber() {
  for (let i = 1; i <= 7; i++) {
    randNum = Math.floor(Math.random() * 101);
  }
}
function play() {
  let userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100 사이의 숫자만 허용합니다.";
    return;
  }
  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
    return;
  }
  chances--;
  chanceArea.textContent = `남은 기회 : ${chances} 번`;
  if (userValue < randNum) {
    resultArea.textContent = "Up!";
  } else if (userValue > randNum) {
    resultArea.textContent = "Down!";
  } else {
    resultArea.textContent = "정답!";
    gameOver = true;
  }
  history.push(userValue);
  if (chances < 1) gameOver = true;
  if (gameOver == true) {
    playBtn.disabled = true;
  }
}
function reset() {
  //user input 창이 깨끗하게 정리되고
  userInput.value = "";
  //새로운 번호가 생성되고
  pickRandomNumber();
  resultArea.textContent = "재도전!";
  //기회가 회복되고
  chances = 5;
  chanceArea.textContent = `남은 기회 : ${chances} 번`;
  //플레이 버튼이 활성화
  playBtn.disabled = false;
  //게임 오버 상태 복구
  gameOver = false;
}
pickRandomNumber();
