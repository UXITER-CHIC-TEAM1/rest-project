// 페이지가 로드된 후 실행될 함수를 등록
document.addEventListener("DOMContentLoaded", function () {

    // 이미지 슬라이드와 필터링 버튼에 수평 스크롤 기능 추가
    function row_scroll() {
      // .feel-filter와 .place-filter 요소에 대해 수평 스크롤 로직 적용
      document.querySelectorAll(".feel-filter, .place-filter").forEach((filter) => {
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
});
