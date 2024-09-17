// 리뷰 이미지 슬라이드
document.addEventListener("DOMContentLoaded", function () {
  
  // 수평 스크롤 기능을 적용할 함수
  function row_scroll(selector) {
    // 주어진 선택자를 사용하여 요소를 선택
    document.querySelectorAll(selector).forEach((element) => {
      element.addEventListener("wheel", (e) => {
        e.preventDefault();

        // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
        var scrollAmount = e.deltaY;

        // 현재 타겟 요소의 scrollLeft 값을 업데이트
        e.currentTarget.scrollLeft += scrollAmount;
      });
    });
  }

  // 스크롤 기능을 각각의 선택자에 대해 초기화
  row_scroll(".nav-tab__list");   // 이미지 슬라이드에 수평 스크롤 적용
  row_scroll(".filter-div");      // 필터링 버튼에 수평 스크롤 적용
});
