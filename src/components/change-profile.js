document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "main-page.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("edit-btn");
  const editContainer = document.getElementById("edit-container");
  const nicknameDisplay = document.getElementById("nickname-display");
  const profileImg = document.getElementById("profile-img");
  const saveBtn = document.getElementById("save-btn");
  const nicknameInput = document.getElementById("change-nickname");
  const imageInput = document.getElementById("change-img");

  // 수정 버튼 클릭 시 input 칸 표시 및 수정 버튼 숨기기
  editBtn.addEventListener("click", () => {
    editContainer.classList.remove("hidden"); // 수정 영역 표시
    editBtn.style.display = "none"; // 프로필 수정 버튼 숨기기
  });

  // 저장 버튼 클릭 시 닉네임과 이미지 업데이트 및 수정 영역 숨기기
  saveBtn.addEventListener("click", () => {
    const newNickname = nicknameInput.value;
    const newImage = imageInput.files[0];

    // 닉네임 변경
    if (newNickname) {
      nicknameDisplay.textContent = newNickname;
    }

    // 이미지 변경
    if (newImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImg.src = e.target.result;
      };
      reader.readAsDataURL(newImage);
    }

    // 수정 영역 숨기고, 프로필 수정 버튼 다시 보이기
    editContainer.classList.add("hidden");
    editBtn.style.display = "block";
  });
});
