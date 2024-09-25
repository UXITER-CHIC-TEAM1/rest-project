// 필터링 버튼 클릭 이벤트 js 코드
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // 이미 선택된 경우 초기화
        if (this.style.backgroundColor === 'rgb(56, 75, 96)') {
          this.style.backgroundColor = ''; // 기본 배경색으로 초기화
          this.style.color = ''; // 기본 글자색으로 초기화
        } else {
          // 선택되지 않은 경우 배경색과 글자색 변경
          this.style.backgroundColor = '#384B60';
          this.style.color = 'white';
        }
      });
    });
  });
  
  //모달
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('place-modal');
    const openBtn = document.getElementById('open-modal-btn');
  
    // 모달이 열릴 때 지도를 생성하는 함수
    const initializeMap = () => {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 3
      };
  
      var map = new kakao.maps.Map(container, options);
    };
  
    // 이미지 버튼 클릭 시 모달 열기 및 지도 초기화
    openBtn.addEventListener('click', () => {
      modal.style.display = 'block';
      initializeMap(); // 모달이 열릴 때 지도 초기화
    });
  
    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });