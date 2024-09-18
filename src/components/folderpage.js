document.addEventListener("DOMContentLoaded", function() {
  const folderCreationModal = document.getElementById("folderCreationModal");
  const bookmarkButton = document.querySelector(".bookmark-button");
  const saveButton = document.querySelector(".save-button");
  const colorRadios = document.querySelectorAll('input[name="folderColor"]');
  let selectedColor = '';

  const maxFolders = 9;

  // 폴더 추가 버튼 클릭 시 폴더 생성 모달 열기
  bookmarkButton.addEventListener("click", function() {
      folderCreationModal.classList.remove("hidden");
  });

  // 모달 바깥을 클릭했을 때 모달 닫기
  window.addEventListener("click", function(event) {
      if (event.target === folderCreationModal) {
          folderCreationModal.classList.add("hidden");
      }
  });

  // 모달 내용 클릭 시 이벤트 전파 중지
  document.querySelector(".modal-content").addEventListener("click", function(event) {
      event.stopPropagation();
  });

  // 색상 선택 처리
  colorRadios.forEach(radio => {
      radio.addEventListener("change", function() {
          selectedColor = this.value;
      });
  });

  // 폴더 생성 버튼 클릭 시 폴더 생성
  saveButton.addEventListener("click", function() {
      const folderName = document.getElementById("folderName").value;

      if (folderName && selectedColor) {
          const folderContainer = document.querySelector(".folder-container");
          const folderCount = folderContainer.children.length;

          if (folderCount < maxFolders) {
              const newFolder = document.createElement("div");
              newFolder.classList.add("folder-item");
              newFolder.style.borderTop = `9px solid ${selectedColor}`; // 선택된 색상으로 border-top 설정
              newFolder.textContent = folderName;
              folderContainer.appendChild(newFolder);

              // 폴더 생성 후 폴더 생성 모달 닫기
              folderCreationModal.classList.add("hidden");
              document.getElementById("folderName").value = ''; // 입력 필드 비우기
              selectedColor = ''; // 선택된 색상 초기화
              colorRadios.forEach(radio => radio.checked = false); // 라디오 버튼 초기화
          } else {
              alert("폴더는 최대 9개까지 추가할 수 있습니다.");
          }
      } else {
          alert("폴더 이름과 색상을 선택하세요.");
      }
  });
});
