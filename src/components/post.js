// 커뮤니티 게시글 이미지 슬라이드와 필터링 버튼 스크롤 적용
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

  // .filter-div 요소에 대해서도 동일한 스크롤 로직 적용
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

// 모든 '좋아요' 버튼을 선택하여 likeButtons에 저장
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
    const modal = document.getElementById("bookmarkModal");
    const bookmarkButton = document.querySelector(".bookmark-button");
    const saveButton = document.querySelector(".save-button");
    const addFolderButton = document.querySelector(".add-folder-button");
    const maxFolders = 9;
  
    // 북마크 버튼을 클릭하면 모달 열기
    bookmarkButton.addEventListener("click", function() {
      modal.classList.remove("hidden");
    });
  
    // 모달 바깥을 클릭했을 때 모달 닫기
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
  
    // 모달 내용 클릭 시 이벤트 중지
    document.querySelector(".modal-content").addEventListener("click", function(event) {
      event.stopPropagation();
    });
  
    // 폴더 추가 버튼 클릭 시 폴더 추가
    addFolderButton.addEventListener("click", function() {
      const folderList = document.querySelector(".folder-list");
      const folderCount = folderList.children.length;
  
      if (folderCount < maxFolders) {
        const newFolder = document.createElement("li");
        newFolder.innerHTML = `<input type="radio" name="folder"><label>새 폴더 ${folderCount + 1}</label>`;
        folderList.appendChild(newFolder);
      } else {
        alert("폴더는 최대 9개까지 추가할 수 있습니다.");
      }
    });
  
    // 저장 버튼 클릭 시 모달 닫기
    saveButton.addEventListener("click", function() {
      modal.classList.add("hidden");
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const bookmarkModal = document.getElementById("bookmarkModal");
    const folderCreationModal = document.getElementById("folderCreationModal");
    const bookmarkButton = document.querySelector(".bookmark-button");
    const addFolderButton = document.querySelector(".add-folder-button");
    const saveButton = document.querySelector(".save-button");
    const createFolderButton = document.querySelector(".create-folder-button");
    const colorRadios = document.querySelectorAll('input[name="folderColor"]');
    let selectedColor = '';
  
    const maxFolders = 9;
  
    // 북마크 버튼을 클릭하면 모달 열기
    bookmarkButton.addEventListener("click", function() {
      bookmarkModal.classList.remove("hidden");
    });
  
    // 모달 바깥을 클릭했을 때 모달 닫기
    window.addEventListener("click", function(event) {
      if (event.target === bookmarkModal) {
        bookmarkModal.classList.add("hidden");
      } else if (event.target === folderCreationModal) {
        folderCreationModal.classList.add("hidden");
      }
    });
  
    // 모달 내용 클릭 시 이벤트 전파 중지
    document.querySelector(".modal-content").addEventListener("click", function(event) {
      event.stopPropagation();
    });
  
    // 폴더 추가 버튼 클릭 시 폴더 생성 모달 열기
    addFolderButton.addEventListener("click", function() {
      folderCreationModal.classList.remove("hidden");
    });
  
    // 색상 선택 처리
    colorRadios.forEach(radio => {
      radio.addEventListener("change", function() {
        selectedColor = this.value;
      });
    });
  
    // 폴더 생성 버튼 클릭 시 폴더 생성
    createFolderButton.addEventListener("click", function() {
      const folderName = document.getElementById("folderName").value;
  
      if (folderName && selectedColor) {
        const folderList = document.querySelector(".folder-list");
        const newFolder = document.createElement("li");
        newFolder.innerHTML = `<input type="radio" name="folder" id="${folderName}"><label for="${folderName}" style="background-color:${selectedColor};">${folderName}</label>`;
        folderList.appendChild(newFolder);
        
        folderCreationModal.classList.add("hidden"); // 폴더 생성 후 폴더 생성 모달 닫기
      } else {
        alert("폴더 이름과 색상을 선택하세요.");
      }
    });
  
    // 저장 버튼 클릭 시 북마크 모달 닫기
    saveButton.addEventListener("click", function() {
      bookmarkModal.classList.add("hidden");
    });
  });
  

