// 이미지 슬라이드 js 코드
function row_scroll() {
  // 모든 .nav-tab__list 요소를 선택
  document.querySelectorAll(".nav-tab__list").forEach((list) => {
    list.addEventListener("wheel", (e) => {
      e.preventDefault();

      // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
      var scrollAmount = e.deltaY;

      // 현재 타겟 요소의 scrollLeft 값을 업데이트
      e.currentTarget.scrollLeft += scrollAmount;
    });
  });

  // 필터링 슬라이드 js 코드
  document.querySelectorAll(".filter-div").forEach((filter) => {
    filter.addEventListener("wheel", (e) => {
      e.preventDefault();

      // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
      var scrollAmount = e.deltaY;

      // 현재 타겟 요소의 scrollLeft 값을 업데이트
      e.currentTarget.scrollLeft += scrollAmount;
    });
  });
}

// 스크롤 기능 초기화
row_scroll();

// 좋아요 버튼 js 코드
const likeButtons = document.querySelectorAll('.likes-button');

// 각 '좋아요' 버튼에 대해 반복 처리
likeButtons.forEach((button) => {
    // 각 버튼에 클릭 이벤트 리스너 추가
    button.addEventListener('click', function () {
        // 현재 버튼의 부모 요소에서 이미지와 좋아요 카운트 요소를 찾음
        const imgElement = this.querySelector('img');
        const countElement = this.nextElementSibling;

        // 디버깅용: 클릭 전 이미지 요소가 올바르게 선택되었는지 콘솔에 출력
        console.log("Image Element:", imgElement);
        console.log("Before click:", imgElement.src); // 클릭 전 이미지 소스 출력
        // 현재 좋아요 수를 가져와 정수로 변환
        let likesCount = parseInt(countElement.textContent, 10);

        // 버튼이 이미 'liked' 상태가 아니라면, 좋아요 수 증가 및 이미지 변경
        if (!button.classList.contains('liked')) {
            likesCount += 1; // 좋아요 수 1 증가
            button.classList.add('liked'); // 버튼에 'liked' 클래스 추가
            imgElement.src = '/src/assets/filled-likes.png'; // 채워진 하트 이미지로 변경
        } else {
            // 버튼이 이미 'liked' 상태라면, 좋아요 수 감소 및 이미지 원래대로 변경
            likesCount -= 1; // 좋아요 수 1 감소
            button.classList.remove('liked'); // 버튼에서 'liked' 클래스 제거
            imgElement.src = '/src/assets/likes-button.png'; // 비어 있는 하트 이미지로 변경
        }

        // 디버깅용: 클릭 후 이미지 소스가 변경되었는지 콘솔에 출력
        console.log("After click:", imgElement.src);

        // 업데이트된 좋아요 수를 화면에 반영
        countElement.textContent = likesCount;
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const bookmarkModal = document.getElementById("bookmarkModal");
  const folderCreationModal = document.getElementById("folderCreationModal");
  const bookmarkButton = document.querySelector(".bookmark-button"); // 북마크 버튼
  const addFolderButton = document.querySelector(".add-folder-button"); // 폴더 생성 모달 열기 버튼
  const createFolderButton = document.querySelector(".create-folder-button"); // 폴더 생성 버튼
  const colorRadios = document.querySelectorAll('input[name="folderColor"]'); // 색상 선택 라디오 버튼
  const folderNameInput = document.getElementById("folderName"); // 폴더 이름 입력 필드
  const folderList = document.querySelector(".folder-list"); // 폴더 리스트
  const folderPreview = document.getElementById("folder-preview"); // 폴더 미리보기 요소
  const maxFolders = 9; // 최대 폴더 수
  let selectedColor = ''; // 선택된 색상
  let isBookmarked = false; // 북마크 상태를 저장하는 변수

  // 북마크 버튼을 클릭하면 폴더 선택 모달 열기 (이미 북마크 되어 있으면 모달 뜨지 않고 이미지 변경)
  bookmarkButton.addEventListener("click", function() {
    const img = this.querySelector("img");
    
    if (isBookmarked) {
      // 북마크가 이미 되어 있으면, 다시 북마크 해제 이미지로 변경하고, 모달을 띄우지 않음
      img.src = "/src/assets/bookmark.png";
      isBookmarked = false;

      img.style.width = "60px";
      img.style.height = "60px";
      img.style.margin = "1px"; 
    } else {
      bookmarkModal.classList.remove("hidden");
    }
  });

  // 모달 바깥을 클릭했을 때 폴더 선택 모달 닫기
  window.addEventListener("click", function(event) {
    if (event.target === bookmarkModal) {
      bookmarkModal.classList.add("hidden");
    } else if (event.target === folderCreationModal) {
      folderCreationModal.classList.add("hidden");
    }
  });

  // 폴더 추가 버튼 클릭 시 폴더 생성 모달 열기
  addFolderButton.addEventListener("click", function() {
    folderCreationModal.classList.remove("hidden");
  });

  // 폴더 색상 선택 처리 및 folder-preview의 border-top 색상 변경
  colorRadios.forEach(radio => {
    radio.addEventListener("change", function() {
      selectedColor = this.value;
      
      // folder-preview의 border-top 색상 변경
      folderPreview.style.borderTopColor = selectedColor;
    });
  });

  // 폴더 생성 버튼 클릭 시 폴더 추가
  createFolderButton.addEventListener("click", function() {
    const folderName = folderNameInput.value.trim();

    if (folderName && selectedColor) {
      const folderCount = folderList.children.length;

      if (folderCount < maxFolders) {
        const newFolder = document.createElement("li");
        const newFolderId = `folder${folderCount + 1}`; // 유일한 폴더 ID 생성
        newFolder.innerHTML = `
          <div style="background-color: ${selectedColor}; width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 10px;"></div>
          <input type="radio" id="${newFolderId}" name="folder" />
          <label for="${newFolderId}">${folderName}</label>
        `;
        folderList.appendChild(newFolder); // 폴더 리스트에 새로운 폴더 추가

        // 폴더 생성 완료 후 폴더 생성 모달 닫기
        folderCreationModal.classList.add("hidden");

        // 입력 필드 초기화
        folderNameInput.value = '';
        selectedColor = ''; // 색상 선택 초기화
        folderPreview.style.borderTopColor = "#e08282"; // 초기 색상으로 되돌림
      } else {
        alert("폴더는 최대 9개까지 추가할 수 있습니다.");
      }
    } else {
      alert("폴더 이름과 색상을 선택하세요.");
    }
  });

  // 저장 버튼 클릭 시 북마크 버튼 이미지 변경 및 폴더 선택 모달 닫기
  document.querySelector(".save-button").addEventListener("click", function() {
    const selectedFolder = document.querySelector("input[name='folder']:checked");

    if (!selectedFolder) {
      alert("폴더를 선택해주세요");
    } else {
      // 폴더 선택 모달을 숨김
      bookmarkModal.classList.add("hidden");

      // 북마크 버튼의 이미지 요소 선택
      const img = bookmarkButton.querySelector('img');

      // 이미지 소스를 변경
      img.src = "/src/assets/add-bookmark.png";

      // 이미지 크기 조절
      img.style.width = "38px";  
      img.style.height = "46px";
      img.style.margin = "13px";

      // 북마크 상태 업데이트
      isBookmarked = true;
    }
  });
});
