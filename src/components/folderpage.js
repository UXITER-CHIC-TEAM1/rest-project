// 모달과 오버레이 요소
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('addfolder');
const overlay = document.getElementById('overlay');
const modalBar = document.getElementById('modal-bar');
const folderContainer = document.querySelector('.folder-container'); // 폴더 목록을 위한 컨테이너

// 모든 색상 옵션 선택
const colorOptions = document.querySelectorAll('.color-option');
const folderPreview = document.getElementById('folder-preview');
const folderPreviewName = document.getElementById('folder-preview-name');

// 모달 내 입력 필드와 버튼
const folderNameInput = document.getElementById('folderName');
const createFolderButton = document.getElementById('createFolderButton');

// 선택된 색상을 저장할 변수
let selectedColor = '#e08282'; // 기본 색상

// 각 색상 옵션에 클릭 이벤트 추가
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    selectedColor = option.getAttribute('data-color'); // 선택된 색상 업데이트
    folderPreview.style.borderTopColor = selectedColor; // 폴더 미리보기 색상 변경
  });
});

// 모달 열기
openModalBtn.addEventListener('click', () => {
    overlay.style.display = 'block'; 
    modal.style.display = 'block';
});

// 새로운 폴더를 생성하는 함수
function createNewFolder(name, color) {
  // 폴더를 위한 새로운 div 생성
  const newFolder = document.createElement('div');
  newFolder.classList.add('folder-item');
  
  // 폴더의 색상과 텍스트 설정
  newFolder.style.borderTop = `9px solid ${color}`;
  newFolder.textContent = name;

  // 새로운 폴더를 폴더 컨테이너에 추가
  folderContainer.appendChild(newFolder);
}

// "폴더 생성" 버튼에 이벤트 리스너 추가
createFolderButton.addEventListener('click', () => {
  const folderName = folderNameInput.value.trim(); // 입력된 폴더명 가져오기

  if (!folderName) {
    alert('폴더명을 입력해 주세요.'); // 폴더명이 비어 있을 경우 경고
    return;
  }

  // 폴더 생성 함수 호출
  createNewFolder(folderName, selectedColor);

  // 모달 입력 필드와 미리보기 초기화
  folderNameInput.value = '';
  folderPreview.style.borderTopColor = '#e08282'; // 미리보기 색상을 기본값으로 설정
  selectedColor = '#e08282'; // 선택된 색상도 기본값으로 초기화

  // 폴더 생성 후 모달 닫기
  overlay.style.display = 'none';
  modal.style.display = 'none';
});

// 모달 드래그하여 닫기 기능 (기존 코드 유지)
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

    if (moveY > 0) { // 모달이 아래로만 이동
        modal.style.transform = `translateY(${moveY}px)`;
    }
}

function endDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);

    // 화면의 절반 이상으로 드래그 모달 닫기
    if (parseInt(modal.style.transform.replace('translateY(', '')) > window.innerHeight / 4) {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        modal.style.transform = 'translateY(0)';
    } else {
        modal.style.transform = 'translateY(0)';
    }
}
