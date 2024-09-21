// 페이지가 로드된 후 실행될 함수를 등록
document.addEventListener("DOMContentLoaded", function () {

  // 이미지 슬라이드와 필터링 버튼에 수평 스크롤 기능 추가
  function row_scroll() {
    // 모든 .nav-tab__list 요소를 선택
    document.querySelectorAll(".nav-tab__list").forEach((list) => {
      list.addEventListener("wheel", (e) => {
        e.preventDefault();

        // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
        var scrollAmount = e.deltaY;

        // 현재 타겟 요소의 scrollLeft 값을 업데이트
        e.currentTarget.scrollLeft += scrollAmount;
      });
    });

    // .filter-div 요소에 대해서도 동일한 스크롤 로직 적용
    document.querySelectorAll(".filter-div").forEach((filter) => {
      filter.addEventListener("wheel", (e) => {
        e.preventDefault();

        // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
        var scrollAmount = e.deltaY;

        // 현재 타겟 요소의 scrollLeft 값을 업데이트
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
      // 각 버튼에 클릭 이벤트 리스너 추가
      button.addEventListener('click', function () {
          // 현재 버튼의 부모 요소에서 이미지와 좋아요 카운트 요소를 찾음
          const imgElement = this.querySelector('img');
          const countElement = this.nextElementSibling;

          // 디버깅용: 클릭 전 이미지 요소가 올바르게 선택되었는지 콘솔에 출력
          console.log("Image Element:", imgElement);
          console.log("Before click:", imgElement.src); // 클릭 전 이미지 소스 출력
          // 현재 좋아요 수를 가져와 정수로 변환
          let likesCount = parseInt(countElement.textContent, 10);

          // 버튼이 이미 'liked' 상태가 아니라면, 좋아요 수 증가 및 이미지 변경
          if (!button.classList.contains('liked')) {
              likesCount += 1; // 좋아요 수 1 증가
              button.classList.add('liked'); // 버튼에 'liked' 클래스 추가
              imgElement.src = '/src/assets/filled-likes.png'; // 채워진 하트 이미지로 변경
          } else {
              // 버튼이 이미 'liked' 상태라면, 좋아요 수 감소 및 이미지 원래대로 변경
              likesCount -= 1; // 좋아요 수 1 감소
              button.classList.remove('liked'); // 버튼에서 'liked' 클래스 제거
              imgElement.src = '/src/assets/likes-button.png'; // 비어 있는 하트 이미지로 변경
          }

          // 디버깅용: 클릭 후 이미지 소스가 변경되었는지 콘솔에 출력
          console.log("After click:", imgElement.src);

          // 업데이트된 좋아요 수를 화면에 반영
          countElement.textContent = likesCount;
      });
  });

});

// 모든 필터 버튼에 클릭 이벤트 추가
const filterButtons = document.querySelectorAll('.fileter-botton');

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