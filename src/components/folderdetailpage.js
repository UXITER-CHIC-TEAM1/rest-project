document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "folderpage.html";
});

// edit-icon을 클릭했을 때 체크박스를 보이게/숨기게
document.querySelector(".edit-icon").addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(".check-box");
  checkboxes.forEach((checkbox) => {
    if (
      checkbox.style.visibility === "hidden" ||
      checkbox.style.visibility === ""
    ) {
      checkbox.style.visibility = "visible"; // 체크박스를 보이게 설정
    } else {
      checkbox.style.visibility = "hidden"; // 체크박스를 숨김
      checkbox.checked = false; // 체크박스가 숨겨지면 선택도 해제
      const textarea = checkbox
        .closest(".folder-item")
        .querySelector("textarea");
      textarea.disabled = true; // 체크박스가 숨겨지면 코멘트도 비활성화
    }
  });
});

// 체크박스가 선택되었을 때만 코멘트 수정 가능
document.querySelectorAll(".check-box").forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    const textarea = checkbox.closest(".folder-item").querySelector("textarea");
    if (checkbox.checked) {
      textarea.disabled = false; // 체크박스가 체크되면 코멘트 활성화
    } else {
      textarea.disabled = true; // 체크 해제되면 코멘트 비활성화
    }
  });
});

// 삭제 버튼 클릭 시 체크된 항목 삭제
document.querySelector(".delete-button").addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(".check-box");

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const folderItem = checkbox.closest(".folder-item"); // 체크된 체크박스의 부모 요소인 folder-item 선택
      folderItem.remove(); // 해당 folder-item 삭제
    }
  });
});

// 폴더 항목의 갯수를 업데이트하는 함수
function updateFolderCount() {
  const folderItems = document.querySelectorAll(".folder-item");
  const totalCountElement = document.querySelector(".main-content h1");
  totalCountElement.textContent = `전체 ${folderItems.length}`; // 폴더 아이템 갯수로 숫자 업데이트
}

// 삭제 버튼 클릭 시 체크된 항목 삭제 및 숫자 업데이트
document.querySelector(".delete-button").addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(".check-box");

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const folderItem = checkbox.closest(".folder-item");
      folderItem.remove();
    }
  });

  updateFolderCount();
});
