// 커뮤니티 게시글 이미지 슬라이드와 필터링 버튼 스크롤 적용
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