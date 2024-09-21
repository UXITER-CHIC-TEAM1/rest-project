// 이미지 업로드 및 미리보기
function setupImageUpload(input, index) {
    input.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const label = document.querySelectorAll('.image-label')[index];
          // 이미지 미리보기 설정
          label.style.backgroundImage = `url(${e.target.result})`;
  
          // 기본 문구와 아이콘 숨기기 위한 클래스 추가
          label.classList.add('image-uploaded');
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // 초기 이미지 업로드 섹션 설정
  document.querySelectorAll('.image-upload').forEach((input, index) => {
    setupImageUpload(input, index);
  });
  
  // 이미지 추가 버튼 클릭 시 새로운 이미지 입력 섹션 추가
  document.querySelector('.add-image-button').addEventListener('click', function() {
    const list = document.querySelector('.nav-tab__list');
    
    // 이미지 업로드 섹션이 5개 초과하지 않도록 제한
    if (list.querySelectorAll('.nav-tab__item').length >= 5) {
      alert('사진은 최대 5장까지 업로드할 수 있습니다.');
      return;
    }
  
    // 새로운 이미지 입력 섹션 생성
    const newItem = document.createElement('li');
    newItem.classList.add('nav-tab__item');
    
    const newInputId = `file-input-${document.querySelectorAll('.image-upload').length + 1}`;
    
    newItem.innerHTML = `
      <input type="file" id="${newInputId}" class="image-upload" accept="image/*">
      <label for="${newInputId}" class="image-label"></label>
    `;
    
    list.insertBefore(newItem, list.querySelector('.add-image-button').parentNode);
    
    // 새로 추가된 이미지 업로드 섹션에도 이벤트 추가
    const newInput = newItem.querySelector('.image-upload');
    setupImageUpload(newInput, document.querySelectorAll('.image-upload').length - 1);
  });
  
  // 커뮤니티 게시글 이미지 슬라이드
  function row_scroll() {
    document.querySelectorAll(".nav-tab__list").forEach((list) => {
      list.addEventListener("wheel", (e) => {
        e.preventDefault();
  
        // deltaY 값을 사용하여 가로 스크롤을 조정
        var scrollAmount = e.deltaY * 0.5; // 스크롤 속도 조정
        list.scrollLeft += scrollAmount;
      });
    });
  }
  
  row_scroll();
  