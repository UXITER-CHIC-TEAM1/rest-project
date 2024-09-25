// 모달
    const modal = document.getElementById('place-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const openTextBtns = document.querySelectorAll('.open-modal-text-btn'); // open-modal-text-btn 버튼들
  
    // 모달이 열릴 때 지도를 생성하는 함수
    const initializeMap = () => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985),
            level: 3
        };
  
        var map = new kakao.maps.Map(container, options);
    };
  
    // 모달 열기 및 지도 초기화 함수
    const openModal = () => {
        modal.style.display = 'block';
        initializeMap(); // 모달이 열릴 때 지도 초기화
    };
  
    // 이미지 버튼 클릭 시 모달 열기
    openBtn.addEventListener('click', openModal);
  
    // open-modal-text-btn 버튼 클릭 시 동일한 모달 열기 동작 추가
    openTextBtns.forEach(button => {
        button.addEventListener('click', openModal);
    });
  
    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

// 필터링 버튼 부분 js 코드
document.addEventListener('DOMContentLoaded', () => {
    const placeFilterButtons = document.querySelectorAll('.place-filter-category .filter-button');
    const fillFilterButtons = document.querySelectorAll('.fill-filter-category .filter-button');
        
    // 장소 필터 버튼 클릭 이벤트 (하나만 선택 가능)
    placeFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 클릭된 버튼이 이미 활성화된 경우 비활성화
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                // 다른 버튼들의 active 클래스 제거
                placeFilterButtons.forEach(btn => btn.classList.remove('active'));
                // 클릭된 버튼에 active 클래스 추가
                this.classList.add('active');
            }
        });
    });
    
    // 분위기 필터 버튼 클릭 이벤트 (다중 선택 가능)
    fillFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 클릭 시 active 클래스 토글
            this.classList.toggle('active');
        });
    });
});
    