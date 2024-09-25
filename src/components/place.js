// 리뷰 이미지 슬라이드
document.addEventListener("DOMContentLoaded", function () {
  
  // 수평 스크롤 기능을 적용할 함수
  function row_scroll(selector) {
    // 주어진 선택자를 사용하여 요소를 선택
    document.querySelectorAll(selector).forEach((element) => {
      element.addEventListener("wheel", (e) => {
        e.preventDefault();

        // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
        var scrollAmount = e.deltaY;

        // 현재 타겟 요소의 scrollLeft 값을 업데이트
        e.currentTarget.scrollLeft += scrollAmount;
      });
    });
  }

  // 스크롤 기능을 각각의 선택자에 대해 초기화
  row_scroll(".nav-tab__list");   // 이미지 슬라이드에 수평 스크롤 적용
  row_scroll(".filter-div");      // 필터링 버튼에 수평 스크롤 적용
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

// 복사하기 버튼 js 코드
// 버튼 요소 가져오기
const copyButton = document.getElementById('copyButton');

// 버튼에 클릭 이벤트 리스너 추가
copyButton.addEventListener('click', function() {
    // 복사할 텍스트를 가져오기
    const textToCopy = document.getElementById('textToCopy').innerText;

    // 클립보드에 복사
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // 복사 완료 메시지
            alert('쉬엄 장소 복사 완료! : ' + textToCopy);
        })
        .catch(err => {
            // 복사 실패 시 에러 메시지
            console.error('쉬엄 장소 복사 실패..: ', err);
        });
});
