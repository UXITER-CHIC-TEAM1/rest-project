document.querySelector(".title-logo").addEventListener("click", function () {
  window.location.href = "home.html";
});

const createFolderButton = document.querySelector(".create-folder-button"); // 폴더 생성 버튼
const colorRadios = document.querySelectorAll('input[name="folderColor"]'); // 색상 선택 라디오 버튼
const folderNameInput = document.getElementById("folderName"); // 폴더 이름 입력 필드
const folderList = document.querySelector(".folder-list"); // 폴더 리스트
const folderPreview = document.getElementById("folder-preview"); // 폴더 미리보기 요소
const maxFolders = 9; // 최대 폴더 수
const addFolderButton = document.getElementById("addfolder"); // 쉼터 폴더 추가하기
const overlay = document.getElementById("overlay"); // 모달 오버레이
const folderCreationModal = document.getElementById("folderCreationModal"); // 폴더 생성 모달
let selectedColor = ''; // 선택된 색상
const folderContainer = document.querySelector(".folder-container"); // 폴더 목록을 위한 컨테이너

// 모달창의 폴더 미리보기 부분 색상 바꾸는 이벤트
colorRadios.forEach(radio => {
  radio.addEventListener("change", function() {
    selectedColor = this.value;
    
    // folder-preview의 border-top 색상 변경
    folderPreview.style.borderTopColor = selectedColor;
  });
});

// 폴더 추가 버튼 클릭 시 폴더 생성 모달 열기
addFolderButton.addEventListener("click", function() {
  folderCreationModal.classList.remove("hidden");
});

// 새로운 폴더를 생성하는 함수
function createNewFolder(name, color) {
  // 폴더를 위한 새로운 div 생성
  const newFolder = document.createElement("div");
  newFolder.classList.add("folder-item");

  // 폴더의 색상과 텍스트 설정
  newFolder.style.borderTop = `9px solid ${color}`;
  newFolder.textContent = name;

  // 새로운 폴더를 폴더 컨테이너에 추가
  folderContainer.appendChild(newFolder);
}

// "폴더 생성" 버튼에 이벤트 리스너 추가
createFolderButton.addEventListener("click", () => {
  const folderName = folderNameInput.value.trim(); // 입력된 폴더명 가져오기

  // 폴더 이름과 색상 선택 확인
  if (folderName && selectedColor) {
    const folderCount = folderContainer.children.length; // 실제 폴더 개수 확인

    if (folderCount < maxFolders) {
      // 폴더 생성 함수 호출
      createNewFolder(folderName, selectedColor);

      // 폴더 생성 완료 후 폴더 생성 모달 닫기
      folderCreationModal.classList.add("hidden");
      
      // 모달 입력 필드와 미리보기 초기화
      folderNameInput.value = "";
      folderPreview.style.borderTopColor = "#e08282"; // 미리보기 색상을 기본값으로 설정
      selectedColor = "#e08282"; // 선택된 색상도 기본값으로 초기화

    } else {
      alert("폴더는 최대 9개까지 추가할 수 있습니다.");
    }
  } else {
    alert("폴더 이름과 색상을 선택하세요.");
  }
});

// 모달 바깥을 클릭했을 때 폴더 선택 모달 닫기
  window.addEventListener("click", function(event) {
    if (event.target === folderCreationModal) {
      folderCreationModal.classList.add("hidden");
    }
  });