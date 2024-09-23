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
  const username = document.querySelector('.login-input[type="text"]').value;
  const password = document.querySelector(
    '.login-input[type="password"]'
  ).value;

  if (username === "" || password === "") {
    alert("아이디와 비밀번호를 입력해주세요.");
  } else {
    // 서버에 로그인 요청을 보냄
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 로그인 성공 시 처리
          alert("로그인 성공!");
          window.location.href = "home.html"; // 로그인 후 홈 페이지로 이동
        } else {
          // 로그인 실패 시 처리
          alert("로그인 실패: " + data.message);
        }
      })
      .catch((error) => {
        console.error("로그인 요청 중 오류 발생:", error);
        alert("서버 오류");
      });
  }
});
