document.querySelector(".title-logo").addEventListener("click", function () {
  window.location.href = "home.html";
});

// 페이지가 로드된 후 실행될 함수를 등록
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("jwt");

  if (!token) {
    alert("로그인이 필요합니다."); // 로그인 필요 메시지
    window.location.href = "login.html"; // 로그인 토큰이 없을 경우 로그인 페이지로 리다이렉션
    return;
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
        return response.json();
      })
      .then((data) => {
        console.log("토큰 유효성 검사 결과:", data); // 유효성 검사 결과 콘솔 출력
        initializePage(); // 토큰이 유효할 경우 페이지 초기화 함수 호출
      })
      .catch((error) => {
        console.error("오류 발생:", error); // 오류 발생 시 콘솔 출력
        alert(`인증 실패: ${error.message}`);
        window.location.href = "login.html"; // 인증 실패 시 로그인 페이지로 리다이렉션
      });
  }

  // 페이지 초기화 함수 - 인증 후 호출
  function initializePage() {
    // 이미지 슬라이드와 필터링 버튼에 수평 스크롤 기능 추가
    function row_scroll() {
      document
        .querySelectorAll(".nav-tab__list, .filter-div")
        .forEach((element) => {
          element.addEventListener("wheel", (e) => {
            e.preventDefault();
            var scrollAmount = e.deltaY;
            e.currentTarget.scrollLeft += scrollAmount;
          });
        });
    }

    // 스크롤 기능 초기화
    row_scroll();

    // 모든 '좋아요' 버튼을 선택하여 likeButtons에 저장
    const likeButtons = document.querySelectorAll(".likes-button");

    // 각 '좋아요' 버튼에 대해 초기 상태 확인
    likeButtons.forEach((button) => {
      const postId = button.closest(".community-post").dataset.postId;

      // 현재 사용자가 좋아요를 눌렀는지 확인하는 API 호출
      fetch(`/api/posts/${postId}/likes/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("좋아요 상태 조회 실패");
          return response.json();
        })
        .then((data) => {
          if (data.liked) {
            button.classList.add("liked"); // 'liked' 클래스 추가
            button.querySelector("img").src = "/src/assets/filled-likes.png"; // 이미지 변경
          }
        })
        .catch((error) => console.error(error));
    });

    // 각 '좋아요' 버튼 클릭 이벤트 처리
    likeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.closest(".community-post").dataset.postId; // 게시글 ID 가져오기
        const imgElement = this.querySelector("img");
        const countElement = this.nextElementSibling;

        let likesCount = parseInt(countElement.textContent, 10);

        if (!button.classList.contains("liked")) {
          likesCount += 1;
          button.classList.add("liked");
          imgElement.src = "/filled-likes.png";

          // 좋아요 추가 API 호출
          fetch(`/api/posts/${postId}/likes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) throw new Error("좋아요 추가 실패");
              countElement.textContent = likesCount; // 좋아요 수 업데이트
            })
            .catch((error) => console.error(error));
        } else {
          likesCount -= 1;
          button.classList.remove("liked");
          imgElement.src = "/likes-button.png";

          // 좋아요 제거 API 호출
          fetch(`/api/posts/${postId}/likes`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) throw new Error("좋아요 제거 실패");
              countElement.textContent = likesCount; // 좋아요 수 업데이트
            })
            .catch((error) => console.error(error));
        }
      });
    });

    // 필터링 버튼 이벤트 js 코드
    const filterButtons = document.querySelectorAll(".fileter-botton");
    const modalFilterButtons = document.querySelectorAll(
      ".array-modal .button, .feel-modal .button"
    ); // 모달 내 버튼 선택

    const toggleButtonState = (button) => {
      if (button.style.backgroundColor === "rgb(56, 75, 96)") {
        button.style.backgroundColor = ""; // 기본 배경색으로 초기화
        button.style.color = ""; // 기본 글자색으로 초기화
      } else {
        button.style.backgroundColor = "#384B60";
        button.style.color = "white";
      }
    };

    // 필터링 버튼 클릭 이벤트
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        toggleButtonState(this);
      });
    });

    // 모달 필터링 버튼 클릭 이벤트 추가
    modalFilterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        toggleButtonState(this);
      });
    });

    // 모달 창 js 코드
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector("#overlay");
    const arrayButton = document.querySelector(".likes-toggle-button"); // 정렬 버튼
    const feelButton = document.querySelector(".fileter-toggle-botton"); // 분위기 버튼

    // 모달 표시 함수
    const showModal = (modalType) => {
      modal.style.display = "block";
      overlay.style.display = "block";
      document.querySelector(".array-modal").style.display =
        modalType === "array" ? "block" : "none";
      document.querySelector(".feel-modal").style.display =
        modalType === "feel" ? "block" : "none";
    };

    // 버튼 클릭 시 모달 표시
    arrayButton.addEventListener("click", () => {
      showModal("array");
    });

    feelButton.addEventListener("click", () => {
      showModal("feel");
    });

    // 모달 외부 클릭 시 모달 닫기
    overlay.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
    });

    // 결과 보기 버튼 클릭 이벤트 추가
    document.querySelectorAll(".result-button").forEach((button) => {
      button.addEventListener("click", function () {
        // 모달창 닫기
        modal.style.display = "none";
        overlay.style.display = "none";
      });
    });

    // 커뮤니티 데이터를 서버로 전송하는 함수
    const sendCommunityData = () => {
      const communityDataSendButton = document.querySelector(
        "#communityDataSendButton"
      );
      if (communityDataSendButton) {
        communityDataSendButton.addEventListener("click", () => {
          fetch("/api/community-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // 전송할 데이터의 타입 설정
              Authorization: `Bearer ${token}`, // Authorization 헤더에 JWT 토큰 추가
            },
            body: JSON.stringify({ key: "community-value" }), // 전송할 데이터 JSON 형태로 변환
          })
            .then((response) => {
              console.log("Response Status:", response.status); // 응답 상태 로그
              if (!response.ok)
                throw new Error("인증 실패: " + response.status); // 인증 실패 시 에러 처리
              return response.json();
            })
            .then((data) => {
              console.log("서버 응답:", data); // 서버 응답 결과 콘솔 출력
            })
            .catch((error) => {
              console.error("오류 발생:", error); // 오류 발생 시 콘솔 출력
              alert(`인증 실패: ${error.message}`);
              window.location.href = "login.html"; // 인증 실패 시 로그인 페이지로 리다이렉션
            });
        });
      }
    };

    sendCommunityData(); // 커뮤니티 데이터 전송 함수 호출
  }
});
