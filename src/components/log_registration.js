document.addEventListener("DOMContentLoaded", function () {
  const bookmarkModal = document.getElementById("bookmarkModal");
  const folderCreationModal = document.getElementById("folderCreationModal");
  const bookmarkButton = document.querySelector(".bookmark-button");
  const addFolderButton = document.querySelector(".add-folder-button");
  const createFolderButton = document.querySelector(".create-folder-button");
  const colorRadios = document.querySelectorAll('input[name="folderColor"]');
  const folderNameInput = document.getElementById("folderName");
  const folderList = document.querySelector(".folder-list");
  const folderPreview = document.getElementById("folder-preview");
  const maxFolders = 9;
  let selectedColor = "";
  let isBookmarked = false;

  // 북마크 버튼 클릭 이벤트
  bookmarkButton.addEventListener("click", function () {
    const img = this.querySelector("img");

    if (isBookmarked) {
      img.src = "/bookmark.png";
      isBookmarked = false;
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.margin = "1px";
    } else {
      bookmarkModal.classList.remove("hidden");
    }
  });

  // 모달 바깥 클릭 시 닫기
  window.addEventListener("click", function (event) {
    if (event.target === bookmarkModal) {
      bookmarkModal.classList.add("hidden");
    } else if (event.target === folderCreationModal) {
      folderCreationModal.classList.add("hidden");
    }
  });

  // 폴더 추가 버튼 클릭 시 모달 열기
  addFolderButton.addEventListener("click", function () {
    folderCreationModal.classList.remove("hidden");
  });

  // 폴더 색상 선택 및 미리보기
  colorRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      selectedColor = this.value;
      folderPreview.style.borderTopColor = selectedColor;
    });
  });

  // 폴더 생성 버튼 클릭 시 폴더 추가
  createFolderButton.addEventListener("click", function () {
    const folderName = folderNameInput.value.trim();

    if (folderName && selectedColor) {
      const folderCount = folderList.children.length;

      if (folderCount < maxFolders) {
        const newFolder = document.createElement("li");
        const newFolderId = `folder${folderCount + 1}`;
        newFolder.innerHTML = `
          <div style="background-color: ${selectedColor}; width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 10px;"></div>
          <input type="radio" id="${newFolderId}" name="folder" />
          <label for="${newFolderId}">${folderName}</label>
        `;
        folderList.appendChild(newFolder);
        folderCreationModal.classList.add("hidden");
        folderNameInput.value = "";
        selectedColor = "";
        folderPreview.style.borderTopColor = "#e08282";
      } else {
        alert("폴더는 최대 9개까지 추가할 수 있습니다.");
      }
    } else {
      alert("폴더 이름과 색상을 선택하세요.");
    }
  });

  // 저장 버튼 클릭 시 북마크 상태 업데이트
  document.querySelector(".save-button").addEventListener("click", function () {
    const selectedFolder = document.querySelector("input[name='folder']:checked");

    if (!selectedFolder) {
      alert("폴더를 선택해주세요");
    } else {
      bookmarkModal.classList.add("hidden");
      const img = bookmarkButton.querySelector("img");
      img.src = "/add-bookmark.png";
      img.style.width = "38px";
      img.style.height = "46px";
      img.style.margin = "13px";
      isBookmarked = true;
    }
  });

  // 사진 추가 기능
  const addPhotoBtns = document.querySelectorAll('.add-photo-btn');

  addPhotoBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';

      fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100%';

            const photoBox = document.querySelectorAll('.photo-box')[index];
            photoBox.innerHTML = '';
            photoBox.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });

      fileInput.click();
    });
  });

  // 폼 제출 시 처리
  document.querySelector('.your-form-class').addEventListener('submit', function (event) {
    event.preventDefault();

    const content = document.querySelector('.your-content-input').value; // 글 내용
    const photoBoxes = document.querySelectorAll('.photo-box img'); // 추가한 사진들
    const formData = new FormData(); // FormData 객체 생성

    formData.append('content', content); // 글 내용 추가

    photoBoxes.forEach((img, index) => {
      if (img.src) {
        const base64Image = img.src.split(',')[1];
        if (base64Image) {
          const byteString = atob(base64Image);
          const mimeString = img.src.split(':')[1].split(';')[0];
          const arrayBuffer = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);
          }
          const file = new Blob([arrayBuffer], { type: mimeString });
          formData.append(`photos`, file, `photo-${index}.png`);
        } else {
          console.error('Base64 문자열이 유효하지 않습니다:', img.src);
        }
      }
    });

    // POST 요청 보내기
    fetch('/api/log', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // 필요시 토큰 추가
      },
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 응답이 정상적이지 않습니다.');
      }
      return response.json();
    })
    .then(data => {
      console.log('성공:', data);
      window.location.href = "main-page.html"; // 성공 시 main-page.html로 이동
    })
    .catch((error) => {
      console.error('오류:', error);
      // 사용자에게 오류 메시지 표시
    });
  });
});
