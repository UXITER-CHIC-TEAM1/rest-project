window.onload = function () {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 3
    };

    var map = new kakao.maps.Map(container, options);

    // DOM 요소가 로드된 후 sheet 및 handle 참조
    let sheet = document.getElementById('bottomSheet');
    let handle = document.getElementById('handle'); // 핸들 요소 참조
    let startY, startHeight;
    let isDragging = false;

    // 드래그 시작 시 이벤트 처리 (핸들에서만)
    function dragStart(e) {
        e.preventDefault(); // 기본 동작 방지 (터치 스크롤 등)
        
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        startHeight = parseInt(window.getComputedStyle(sheet).height, 10);
        isDragging = true;

        // 이벤트 리스너 추가 (마우스 및 터치)
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', dragMove, { passive: true });
        document.addEventListener('touchend', dragEnd);
    }

    // 드래그 중 시트의 높이 조정
    function dragMove(e) {
        if (!isDragging) return;

        let moveY = e.type === 'touchmove' ? e.touches[0].clientY - startY : e.clientY - startY;
        let newHeight = startHeight - moveY;

        // 시트 높이 조정 (최소 100px, 최대 화면의 90%)
        if (newHeight < 100) {
            newHeight = 100;
        } else if (newHeight > window.innerHeight * 0.7) {
            newHeight = window.innerHeight * 0.7;
        }

        sheet.style.height = `${newHeight}px`;
    }

    // 드래그가 끝나면 리스너 제거
    function dragEnd() {
        isDragging = false;

        // 드래그 종료 시 이벤트 리스너 제거
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('touchend', dragEnd);
    }

    // 핸들에서 드래그 시작 이벤트 등록
    handle.addEventListener('mousedown', dragStart);
    handle.addEventListener('touchstart', dragStart, { passive: true });
}
