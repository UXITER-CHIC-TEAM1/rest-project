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
  