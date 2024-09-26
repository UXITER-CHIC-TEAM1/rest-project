document.querySelector(".title-logo").addEventListener("click", function () {
  window.location.href = "home.html";
});

// 페이지가 로드된 후 실행될 함수를 등록
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("jwt");

  // JWT 인증 확인
  if (!token) {
    alert("로그인이 필요합니다."); // 로그인 필요 메시지
    window.location.href = "login.html";
    return;
  }

  validateToken(); // JWT 유효성 검사

  function validateToken() {
    fetch("/api/validate-token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("인증 실패");
        return response.json();
      })
      .then((data) => {
        console.log("토큰 유효성 검사 결과:", data);
        // 토큰이 유효할 때 추가 로직

        // 이미지 슬라이드와 필터링 버튼에 수평 스크롤 기능 추가
        row_scroll();
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        window.location.href = "login.html"; // 인증 실패 시 리디렉션
      });
  }

  // 이미지 슬라이드와 필터링 버튼에 수평 스크롤 기능
  function row_scroll() {
    // .feel-filter와 .place-filter 요소에 대해 수평 스크롤 로직 적용
    document
      .querySelectorAll(".feel-filter, .place-filter")
      .forEach((filter) => {
        filter.addEventListener("wheel", (e) => {
          e.preventDefault();

          // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
          var scrollAmount = e.deltaY;

          // 현재 타겟 요소의 scrollLeft 값을 업데이트
          e.currentTarget.scrollLeft += scrollAmount;
        });
      });
  }

  // 모든 필터 버튼에 클릭 이벤트 추가
  const filterButtons = document.querySelectorAll(".fileter-botton");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 이미 선택된 경우 초기화
      if (this.style.backgroundColor === "rgb(56, 75, 96)") {
        this.style.backgroundColor = ""; // 기본 배경색으로 초기화
        this.style.color = ""; // 기본 글자색으로 초기화
      } else {
        // 선택되지 않은 경우 배경색과 글자색 변경
        this.style.backgroundColor = "#384B60";
        this.style.color = "white";
      }
    });
  });

  // 영업 상태에 따른 글씨색 변환
  const cardHours = document.querySelectorAll(".card-hours");

  cardHours.forEach(function (element) {
    const statusText = element.textContent.trim();

    if (statusText === "영업 중") {
      element.classList.add("open");
    } else if (statusText === "영업 종료") {
      element.classList.add("closed");
    } else if (statusText === "영업 준비 중") {
      element.classList.add("preparing");
    }
  });
});
