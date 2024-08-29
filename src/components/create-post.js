// 이미지 업로드 및 미리보기
document.querySelectorAll('.image-upload').forEach((input, index) => {
  input.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const label = document.querySelectorAll('.image-label')[index];
              label.style.backgroundImage = `url(${e.target.result})`;
          };
          reader.readAsDataURL(file);
      }
  });
});

// 커뮤니티 게시글 이미지 슬라이드
function row_scroll() {
  document.querySelectorAll(".nav-tab__list").forEach((list) => {
      list.addEventListener("wheel", (e) => {
          e.preventDefault();

          // deltaY 값을 사용하여 가로 스크롤을 조정
          var scrollAmount = e.deltaY * 0.5; // 스크롤 속도 조정
          list.scrollLeft += scrollAmount;
      });
  });
}

row_scroll();
