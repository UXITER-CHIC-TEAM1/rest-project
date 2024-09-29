window.onload = function () {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 3
    };

    var map = new kakao.maps.Map(container, options);

    const locationList = document.querySelectorAll('.location-list li');
    const totalCountText = document.querySelector('.total-count');

    function updateTotalCount() {
        const totalCount = locationList.length;
        totalCountText.textContent = `전체 ${totalCount}`;
    }

    updateTotalCount();

    let sheet = document.getElementById('bottomSheet');
    let handle = document.getElementById('handle');
    let sheetContent = document.querySelector('.sheet-content');  // sheet-content 선택
    let startY, startHeight;
    let isDragging = false;

    sheet.style.height = '100px';

    function dragStart(e) {
        e.preventDefault();
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        startHeight = parseInt(window.getComputedStyle(sheet).height, 10);
        isDragging = true;

        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', dragMove, { passive: true });
        document.addEventListener('touchend', dragEnd);
    }

    function dragMove(e) {
        if (!isDragging) return;
        let moveY = e.type === 'touchmove' ? e.touches[0].clientY - startY : e.clientY - startY;
        let newHeight = startHeight - moveY;

        if (newHeight < 100) {
            newHeight = 100;  // 최소 높이
        } else if (newHeight > window.innerHeight * 0.8) {
            newHeight = window.innerHeight * 0.8;  // 최대 높이
        }

        sheet.style.height = `${newHeight}px`;

        // sheet-content의 최대 높이를 설정하여 스크롤 가능하도록 함
        sheetContent.style.height = `${newHeight - handle.offsetHeight}px`;
    }

    function dragEnd() {
        isDragging = false;

        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('touchend', dragEnd);
    }

    handle.addEventListener('mousedown', dragStart);
    handle.addEventListener('touchstart', dragStart, { passive: true });

    // header-btn 클릭 시 이미지 토글
    const headerButtons = document.querySelectorAll('.header-btn');

    headerButtons.forEach((button) => {
        let isFilled = false; 

        button.addEventListener('click', () => {
            const img = button.querySelector('img'); 
            if (img) {
                if (isFilled) {
                    img.src = '/src/assets/empty_mark_icon.png'; // 원래 이미지로 변경
                } else {
                    img.src = '/src/assets/mark_icon.png'; // 새로운 이미지로 변경
                }
                isFilled = !isFilled; // 상태 토글
            }
        });
    });
};
