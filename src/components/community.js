// 페이지가 로드된 후 실행될 함수를 등록
document.addEventListener("DOMContentLoaded", function () {
  // 이미지 슬라이드와 필터링 버튼에 수평 스크롤 기능 추가
  function row_scroll() {
    document.querySelectorAll(".nav-tab__list, .filter-div").forEach((element) => {
      element.addEventListener("wheel", (e) => {
        e.preventDefault();
        var scrollAmount = e.deltaY;
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
    button.addEventListener('click', function () {
      const imgElement = this.querySelector('img');
      const countElement = this.nextElementSibling;

      console.log("Image Element:", imgElement);
      console.log("Before click:", imgElement.src);
      
      let likesCount = parseInt(countElement.textContent, 10);

      if (!button.classList.contains('liked')) {
        likesCount += 1;
        button.classList.add('liked');
        imgElement.src = '/src/assets/filled-likes.png';
      } else {
        likesCount -= 1;
        button.classList.remove('liked');
        imgElement.src = '/src/assets/likes-button.png';
      }

      console.log("After click:", imgElement.src);
      countElement.textContent = likesCount;
    });
  });

  // 필터링 버튼 이벤트 js 코드
  const filterButtons = document.querySelectorAll('.filter-button'); // 올바른 클래스 이름으로 수정
  const modalFilterButtons = document.querySelectorAll('.array-modal .button, .feel-modal .button'); // 모달 내 버튼 선택

  const toggleButtonState = (button) => {
    if (button.style.backgroundColor === 'rgb(56, 75, 96)') {
      button.style.backgroundColor = ''; // 기본 배경색으로 초기화
      button.style.color = ''; // 기본 글자색으로 초기화
    } else {
      button.style.backgroundColor = '#384B60';    
      button.style.color = 'white'; // 선택된 글자색
    }
  };

  // 정렬 모달의 버튼 클릭 시 하나만 선택되도록 하는 함수
  const selectSingleButton = (button, buttonGroup) => {
    // 같은 그룹의 모든 버튼의 선택 상태 초기화
    buttonGroup.forEach(btn => {
      btn.style.backgroundColor = ''; // 배경색 초기화
      btn.style.color = ''; // 글자색 초기화
    });
    
    // 클릭된 버튼만 선택된 상태로 변경
    button.style.backgroundColor = '#384B60';
    button.style.color = 'white';
  };

  // 필터링 버튼 클릭 이벤트
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      toggleButtonState(this);
    });
  });

  // 모달 필터링 버튼 클릭 이벤트 추가
  modalFilterButtons.forEach(button => {
    const modalType = button.closest('.array-modal') ? 'array' : 'feel'; // 모달 타입 구분
    if (modalType === 'array') {
      button.addEventListener('click', function() {
        const buttonsInGroup = document.querySelectorAll('.array-modal .button');
        selectSingleButton(this, buttonsInGroup); // 정렬 모달 내에서는 하나의 버튼만 선택
      });
    } else {
      button.addEventListener('click', function() {
        toggleButtonState(this); // 다른 모달(분위기)은 다중 선택 가능
      });
    }
  });

  // 모달 창 js 코드
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('#overlay');
  const arrayButton = document.querySelector('.likes-toggle-button'); // 정렬 버튼
  const feelButton = document.querySelector('.filter-toggle-button'); // 분위기 버튼

  // 모달 표시 함수
  const showModal = (modalType) => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.querySelector('.array-modal').style.display = modalType === 'array' ? 'block' : 'none';
    document.querySelector('.feel-modal').style.display = modalType === 'feel' ? 'block' : 'none';
  };

  // 버튼 클릭 시 모달 표시
  arrayButton.addEventListener('click', () => {
    showModal('array');
  });

  feelButton.addEventListener('click', () => {
    showModal('feel');
  });

  // 모달 외부 클릭 시 모달 닫기
  overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  // 결과 보기 버튼 클릭 이벤트 추가
  document.querySelectorAll('.result-button').forEach(button => {
    button.addEventListener('click', function() {
      // 모달창 닫기
      modal.style.display = 'none';
      overlay.style.display = 'none';
    });
  });

  // 검색 기능 구현
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  // 필터링 함수
  function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll('.community-post');

    posts.forEach(post => {
      // 장소명을 찾기
      const placename = post.querySelector('.post-placename').textContent.toLowerCase();

      if (placename.includes(searchTerm)) {
        post.style.display = ''; // 표시
      } else {
        post.style.display = 'none'; // 숨김
      }
    });
  }

  // 검색 버튼 클릭 이벤트
  searchButton.addEventListener('click', function() {
    filterPosts();
  });

  // 엔터 키 입력 이벤트
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      filterPosts();
    }
  });
});
