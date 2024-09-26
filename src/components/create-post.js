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

      
    // 새로 추가된 이미지 업로드 섹션에도 이벤트 추가
  const newInputId = `file-input-${document.querySelectorAll('.image-upload').length + 1}`;
  newItem.innerHTML = `
      <input type="file" id="${newInputId}" class="image-upload" accept="image/*">
      <label for="${newInputId}" class="image-label"></label>
  `;

  list.insertBefore(newItem, list.querySelector('.add-image-button').parentNode);
  const newInput = newItem.querySelector('.image-upload');
  setupImageUpload(newInput, document.querySelectorAll('.image-upload').length - 1);
});

// 게시글 등록 버튼 클릭 시 서버로 데이터를 전송
document.querySelector('.create').addEventListener('click', async function() {
  const title = document.querySelector('.title').value;
  const content = document.querySelector('.post-content').value;
  const token = localStorage.getItem('jwt');

  // selectedLocation을 가져옵니다
  const selectedLocation = localStorage.getItem('selectedLocation'); // 로컬 스토리지에서 가져오기

  let locationData;
  try {
      locationData = selectedLocation ? JSON.parse(selectedLocation) : null;
  } catch (error) {
      console.error('위치 정보 파싱 오류:', error);
      alert('위치 정보를 불러오는 중 문제가 발생했습니다.');
      return;
  }

  // FormData 객체 생성
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);

  // selectedLocation이 있는 경우 FormData에 추가
  if (locationData) {
      formData.append('selectedLocation', JSON.stringify(locationData)); // 위치 정보를 추가
  } else {
      alert('위치 정보가 필요합니다.'); // 위치 정보가 없을 경우 알림
      return; // 위치 정보가 없으면 요청을 보내지 않음
  }

  // 선택된 카테고리를 가져옵니다
  const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
  if (selectedCategories && selectedCategories.length > 0) {
      formData.append('categories', JSON.stringify(selectedCategories)); // 카테고리 배열을 추가
  } else {
      alert('하나 이상의 카테고리를 선택해주세요.'); // 카테고리가 선택되지 않았을 경우 알림
      return;
  }

  // 선택된 장소 정보를 가져옵니다 (place)
  const selectedPlace = localStorage.getItem('selectedPlace'); // 선택된 장소를 가져옴
  if (selectedPlace) {
      formData.append('place', selectedPlace); // 선택된 장소 정보를 추가
  } else {
      alert('장소를 선택해주세요.'); // 장소가 선택되지 않았을 경우 알림
      return;
  }

  // 이미지 파일들을 FormData에 추가
  const imageInputs = document.querySelectorAll('.image-upload');
  imageInputs.forEach(input => {
      const files = input.files;
      if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
              formData.append('images', files[i]); // 'images'는 서버에서 처리하는 필드명
          }
      }
  });

  try {
      const response = await fetch('/create-post', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}` // JWT 토큰 추가
          },
          body: formData
      });

      const result = await response.json();
      if (result.success) {
          alert('게시글이 성공적으로 등록되었습니다!');
          localStorage.removeItem('selectedLocation'); // 게시글 등록 후 로컬 스토리지에서 정보 삭제
          localStorage.removeItem('selectedCategories'); // 선택된 카테고리도 삭제
          localStorage.removeItem('selectedPlace'); // 선택된 장소도 삭제
      } else {
          alert('게시글 등록에 실패했습니다: ' + result.message); // 에러 메시지 표시
      }
  } catch (error) {
      console.error('게시글 등록 오류:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
  }
});



// 커뮤니티 게시글 이미지 슬라이드
function row_scroll() {
  document.querySelectorAll(".nav-tab__list").forEach((list) => {
      list.addEventListener("wheel", (e) => {
          e.preventDefault();
          var scrollAmount = e.deltaY * 0.5;
          list.scrollLeft += scrollAmount;
      });
  });
}

row_scroll();
