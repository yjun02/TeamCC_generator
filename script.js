// 색상 배열
const colors = [
  "#FFB6C1",
  "#FFD700",
  "#87CEFA",
  "#98FB98",
  "#FF69B4",
  "#FF6347",
  "#FFA500",
  "#B0E0E6",
  "#FFDEAD",
  "#9ACD32",
  "#FF8C00",
  "#E6E6FA",
  "#DDA0DD",
  "#FA8072",
  "#8A2BE2",
  "#7FFF00",
  "#40E0D0",
  "#FF4500",
  "#DA70D6",
  "#32CD32",
  "#DC143C",
  "#6495ED",
  "#FF1493",
  "#00CED1",
  "#F0E68C",
];

// 랜덤 색상 반환 함수
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// 이름 처리 함수
function processNames() {
  const maleNamesString = document.getElementById("maleNamesInput").value;
  const femaleNamesString = document.getElementById("femaleNamesInput").value;

  const maleNames = maleNamesString
    .split(/\s+/)
    .filter((name) => name.trim() !== "");
  const femaleNames = femaleNamesString
    .split(/\s+/)
    .filter((name) => name.trim() !== "");

  // 남자와 여자 이름 리스트가 설정된 경우에만 진행
  if (maleNames.length === 0 || femaleNames.length === 0) {
    alert("남자 이름과 여자 이름을 모두 입력해 주세요.");
    return;
  }

  // 입력 필드와 시작 버튼을 숨깁니다.
  document.getElementById("inputSection").style.display = "none";
  document.getElementById("startButton").style.display = "none";

  // 생성 버튼과 다시하기 버튼을 보이게 합니다.
  document.getElementById("generateButton").style.display = "block";
  document.getElementById("restartButton").style.display = "block";

  // 팀 생성 함수 호출
  generatePairs(maleNames, femaleNames);
}

// 팀 생성 함수
function generatePairs(maleNames, femaleNames) {
  const pairsContainer = document.getElementById("pairsContainer");
  pairsContainer.innerHTML = "";

  const pairs = [];
  const remainingNames = [];

  // 남성과 여성 이름으로 짝을 만듭니다.
  while (maleNames.length > 0 && femaleNames.length > 0) {
    const male = maleNames.splice(
      Math.floor(Math.random() * maleNames.length),
      1
    )[0];
    const female = femaleNames.splice(
      Math.floor(Math.random() * femaleNames.length),
      1
    )[0];
    pairs.push([male, female]);
  }

  // 남은 이름들을 추가합니다.
  remainingNames.push(...maleNames, ...femaleNames);

  // 블록을 생성하고 색상을 지정합니다.
  pairs.forEach((pair, index) => {
    const pairBlock = document.createElement("div");
    pairBlock.className = "pair-block";
    pairBlock.style.backgroundColor = getRandomColor();
    pairBlock.textContent = `${pair[0]} & ${pair[1]}`;

    // 랜덤 딜레이 설정 (최대 1초)
    const randomDelay = Math.random() * 2000;
    pairBlock.style.animationDelay = `${randomDelay}ms`; // 랜덤 딜레이 설정

    pairsContainer.appendChild(pairBlock);
  });

  // 남은 이름들이 두 개 이상일 경우 남은 사람들을 짝지어서 블록을 만듭니다.
  while (remainingNames.length > 1) {
    const name1 = remainingNames.splice(
      Math.floor(Math.random() * remainingNames.length),
      1
    )[0];
    const name2 = remainingNames.splice(
      Math.floor(Math.random() * remainingNames.length),
      1
    )[0];
    const pairBlock = document.createElement("div");
    pairBlock.className = "pair-block";
    pairBlock.style.backgroundColor = getRandomColor();
    pairBlock.textContent = `${name1} & ${name2}`;

    // 랜덤 딜레이 설정 (최대 1초)
    const randomDelay = Math.random() * 2000;
    pairBlock.style.animationDelay = `${randomDelay}ms`; // 랜덤 딜레이 설정

    pairsContainer.appendChild(pairBlock);
  }

  // 마지막 남은 사람이 있을 경우
  if (remainingNames.length === 1) {
    const lastName = remainingNames.pop();
    const pairBlock = document.createElement("div");
    pairBlock.className = "pair-block";
    pairBlock.style.backgroundColor = getRandomColor();
    pairBlock.textContent = lastName;

    // 랜덤 딜레이 설정 (최대 1초)
    const randomDelay = Math.random() * 2000;
    pairBlock.style.animationDelay = `${randomDelay}ms`; // 랜덤 딜레이 설정

    pairsContainer.appendChild(pairBlock);
  }

  // 생성 버튼을 숨깁니다.
  const generateButton = document.getElementById("generateButton");
  generateButton.style.display = "none";
}

// 다시하기 함수
function restart() {
  // 기존 블록을 숨깁니다.
  const pairsContainer = document.getElementById("pairsContainer");
  const pairBlocks = pairsContainer.getElementsByClassName("pair-block");
  Array.from(pairBlocks).forEach((block) => {
    block.style.display = "none"; // 블록 숨기기
  });

  // 입력 필드와 시작 버튼을 보이게 합니다.
  document.getElementById("inputSection").style.display = "inline";
  document.getElementById("startButton").style.display = "inline";

  // 생성 버튼과 다시하기 버튼을 숨깁니다.
  document.getElementById("generateButton").style.display = "none";
  document.getElementById("restartButton").style.display = "none";

  // 블록이 숨겨졌으니 이제 블록을 지웁니다.
  setTimeout(() => {
    pairsContainer.innerHTML = ""; // 블록 삭제
  }, 300); // 잠시 지연 후 블록을 완전히 제거 (애니메이션 효과를 고려)
}
