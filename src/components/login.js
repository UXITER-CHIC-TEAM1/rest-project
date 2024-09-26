
  // login.js

  document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordButtons = document.querySelectorAll(".toggle-password");
  
    // 비밀번호 보기/가리기 기능
    togglePasswordButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const passwordField = this.previousElementSibling; // 비밀번호 입력 필드
        if (passwordField.type === "password") {
          passwordField.type = "text"; // 비밀번호를 보여줌
          this.textContent = "비밀번호 가리기"; // 버튼 텍스트 변경
        } else {
          passwordField.type = "password"; // 비밀번호를 가림
          this.textContent = "비밀번호 보기"; // 버튼 텍스트 변경
        }
      });
    });
  
    document.querySelector(".login-button").addEventListener("click", function () {
      const email = document.querySelector('.login-input[type="text"]').value; // 이메일
      const password = document.querySelector('.login-input.password-input').value; // 비밀번호
  
      if (email === "" || password === "") {
        alert("이메일과 비밀번호를 입력해주세요.");
      } else {
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // 디버깅을 위한 출력
          if (data.success) {
            localStorage.setItem("jwt", data.token);
            console.log("JWT saved to localStorage:", data.token);
            alert("로그인 성공!");
            window.location.href = '/home.html'; // URL을 통해 리다이렉트
          } else {
            alert(data.message); // 로그인 실패 시 메시지 표시
          }
        })
        .catch((error) => {
          console.error("로그인 요청 중 오류 발생:", error);
          alert("서버 오류");
        });
      }
    });
  
    document.querySelector(".signup-button").addEventListener("click", function () {
      window.location.href = '/signUp.html'; // signup.html로 리다이렉션
    });
  });
  