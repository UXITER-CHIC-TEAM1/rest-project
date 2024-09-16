// 모달과 버튼 요소를 가져오기
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('addfolder');
const overlay = document.getElementById('overlay');
const modalBar = document.getElementById('modal-bar');


// 모달 열기
openModalBtn.addEventListener('click', () => {
    overlay.style.display = 'block'; 
    modal.style.display = 'block';
});


// 드래그로 모달 닫기 추가
let isDragging = false;
let startY = 0;

modalBar.addEventListener('mousedown', startDrag);
modalBar.addEventListener('touchstart', startDrag);

function startDrag(e) {
    isDragging = true;
    startY = e.clientY || e.touches[0].clientY;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
    if (!isDragging) return;

    const currentY = e.clientY || e.touches[0].clientY;
    const moveY = currentY - startY;

    if (moveY > 0) { // 아래로 드래그할 때만 이동
        modal.style.transform = `translateY(${moveY}px)`;
    }
}

function endDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);

    // 모달이 화면의 절반 이상 드래그되었을 경우 모달을 닫음
    if (parseInt(modal.style.transform.replace('translateY(', '')) > window.innerHeight / 4) {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        modal.style.transform = 'translateY(0)';
    } else {
        modal.style.transform = 'translateY(0)';
    }
}
