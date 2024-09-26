document.addEventListener("DOMContentLoaded", function () {
  const togglePasswordButtons = document.querySelectorAll(".toggle-password");

  // 비밀번호 보기/가리기 기능
  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const passwordField = this.previousElementSibling;
      if (passwordField.type === "password") {
        passwordField.type = "text";
        this.textContent = "비밀번호 가리기";
      } else {
        passwordField.type = "password";
        this.textContent = "비밀번호 보기";
      }
    });
  });
});

document.querySelector(".login-button").addEventListener("click", function () {
  const email = document.querySelector('.login-input[type="text"]').value;
  const password = document.querySelector(
    '.password-input[type="password"]').value;

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
        if (data.success) {
          localStorage.setItem("jwt", data.token);
          console.log("JWT saved to localStorage:", data.token);
          alert("로그인 성공!");
          window.location.href = "home.html";
        } else {
          alert("로그인 실패: " + data.message);
        }
      })
      .catch((error) => {
        console.error("로그인 요청 중 오류 발생:", error);
        alert("서버 오류");
      });
  }
});

document.querySelector(".signup-button").addEventListener("click", function () {
  window.location.href = "/signUp.html";
});
