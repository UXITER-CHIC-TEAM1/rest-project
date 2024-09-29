// community.js

document.querySelector(".title-logo").addEventListener("click", function () {
  window.location.href = "home.html"; // 제목 로고 클릭 시 홈 페이지로 이동
});

// 페이지가 로드된 후 실행될 함수를 등록
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 토큰 가져오기

  if (!token) {
    alert("로그인이 필요합니다."); // 로그인 필요 메시지
    window.location.href = "login.html"; // 로그인 토큰이 없을 경우 로그인 페이지로 리다이렉션
    return; // 함수 종료
  }

  validateToken(); // JWT 유효성 검사 함수 호출

  // JWT 토큰 유효성 검사 함수
  function validateToken() {
    fetch("/api/validate-token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 JWT 토큰 추가
      },
    })
      .then((response) => {
        console.log("Response Status:", response.status); // 응답 상태 로그
        if (!response.ok) throw new Error("인증 실패: " + response.status); // 인증 실패 시 에러 처리
        return response.json(); // 응답을 JSON 형식으로 변환
      })
      .then((data) => {
        console.log("토큰 유효성 검사 결과:", data); // 유효성 검사 결과 콘솔 출력
        initializePage(); // 토큰이 유효할 경우 페이지 초기화 함수 호출
      })
      .catch((error) => {
        console.error("오류 발생:", error); // 오류 발생 시 콘솔 출력
        alert(`인증 실패: ${error.message}`); // 오류 메시지 출력
        window.location.href = "login.html"; // 인증 실패 시 로그인 페이지로 리다이렉션
      });
  }

  // 게시물 로드 함수
  const loadPosts = () => {
    fetch("/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("게시물 로드 실패"); // 게시물 로드 실패 시 에러 처리
        return response.json(); // 응답을 JSON 형식으로 변환
      })
      .then((posts) => {
        const postsContainer = document.getElementById("posts-container");
        postsContainer.innerHTML = ""; // 기존 게시물 초기화
        posts.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.classList.add("community-post");

          // 게시물 클릭 이벤트 추가
          postElement.addEventListener('click', () => {
            window.location.href = `/post.html?p=${post.shortId}`; // 클릭 시 세부 페이지로 이동
          });

          // 게시물 내용 설정
          postElement.innerHTML = `
              <h3>${post.title}</h3>
              <p>작성자: ${post.author.nickname}</p> <!-- 작성자 닉네임 출력 -->
              <p>장소명: ${post.place || '장소명 없음'}</p> <!-- 장소명 처리 -->
              ${post.images.length > 0 ? `<img src="${post.images[0]}" alt="${post.title}" class="post-image"/>` : ''} <!-- 첫 번째 이미지 표시 -->
          `;

          postsContainer.appendChild(postElement); // 게시물 추가
        });
      })
      .catch((error) => {
        console.error(error); // 오류 발생 시 콘솔 출력
        alert(`게시물 로드 중 오류 발생: ${error.message}`); // 오류 메시지 출력
      });
  }; // loadPosts 함수 닫기

  // 페이지 초기화 함수 - 인증 후 호출
  function initializePage() {
    loadPosts(); // 게시물 로드 함수 호출

    // 이미지 슬라이드와 필터링 버튼에 수평 스크롤 기능 추가
    function row_scroll() {
      document
        .querySelectorAll(".nav-tab__list, .filter-div")
        .forEach((element) => {
          element.addEventListener("wheel", (e) => {
            e.preventDefault(); // 기본 스크롤 동작 방지
            var scrollAmount = e.deltaY; // 스크롤 양
            e.currentTarget.scrollLeft += scrollAmount; // 수평 스크롤
          });
        });
    }

    // 스크롤 기능 초기화
    row_scroll();

    // 필터링 버튼 이벤트 js 코드
    const filterButtons = document.querySelectorAll(".filter-button");
    const modalFilterButtons = document.querySelectorAll(
      ".array-modal .button, .feel-modal .button"
    ); // 모달 내 버튼 선택

    // 버튼 상태 토글 함수
    const toggleButtonState = (button) => {
      if (button.style.backgroundColor === "rgb(56, 75, 96)") {
        button.style.backgroundColor = ""; // 기본 배경색으로 초기화
        button.style.color = ""; // 기본 글자색으로 초기화
      } else {
        button.style.backgroundColor = "#384B60"; // 배경색 변경
        button.style.color = "#ffffff"; // 글자색 변경
      }
    };

    // 필터링 버튼 클릭 이벤트
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        toggleButtonState(button); // 버튼 상태 토글
        loadPosts(); // 필터링 후 게시물 로드
      });
    });

    // 모달 필터링 버튼 클릭 이벤트
    modalFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        toggleButtonState(button); // 버튼 상태 토글
        loadPosts(); // 필터링 후 게시물 로드
      });
    });
  }
}); 
