document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "main-page.html";
});

// 모달 열기와 닫기
const emotionModal = document.getElementById("emotionModal");
const openEmotionModalBtn = document.getElementById("openEmotionModal");
const closeModalBtn = document.querySelector(".close");

// 감정을 보여줄 이미지 요소 선택
const emotionDisplayImg = document.getElementById("selectedEmotionImg"); // 감정 이미지를 보여줄 img 태그

// 감정별 이미지 매핑
const emotionImages = {
  calm: "/src/assets/icon_calm.png",
  shy: "/src/assets/icon_shy.png",
  happy: "/src/assets/icon_happy.png",
  sensitive: "/src/assets/icon_sensitive.png",
  annoy: "/src/assets/icon_annoy.png",
  sad: "/src/assets/icon_sad.png",
  love: "/src/assets/icon_love.png",
  electrifying: "/src/assets/icon_electrifying.png",
  surprise: "/src/assets/icon_surprise.png",
};

// 감정 아이콘 클릭 시 모달 열기
openEmotionModalBtn.onclick = function () {
  emotionModal.style.display = "flex";
};

// 모달창 닫기
closeModalBtn.onclick = function () {
  emotionModal.style.display = "none";
};

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  if (event.target == emotionModal) {
    emotionModal.style.display = "none";
  }
};

// 감정 선택 시 처리
const emotionItems = document.querySelectorAll(".emotion-item");
emotionItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedEmotion = item.dataset.emotion;
    console.log("선택된 감정:", selectedEmotion);

    // 감정에 맞는 이미지로 업데이트
    if (emotionImages[selectedEmotion]) {
      emotionDisplayImg.src = emotionImages[selectedEmotion];
    }

    // 모달을 닫음
    emotionModal.style.display = "none";
  });
});
