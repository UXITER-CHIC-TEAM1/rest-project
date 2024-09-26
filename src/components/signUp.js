document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const signupButton = document.querySelector(".signup-button");
  const nicknameInput = document.querySelector(
    '.signup-input[type="text"]:nth-of-type(1)'
  );
  const emailInput = document.querySelector(
    '.signup-input[type="text"]:nth-of-type(2)'
  );
  const passwordInput = document.querySelector(".password-input");
  const passwordCheckInput = document.querySelector(".password-check-input");
  const termsCheckbox = document.querySelector(".terms-checkbox");
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

  signupButton.addEventListener("click", function () {
    const nickname = nicknameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();
    const isTermsChecked = termsCheckbox.checked;

    // 이메일 형식 검사 (간단한 검사)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 비밀번호 형식 검사 (영문, 숫자 포함 8자 이상)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // 모든 필드가 작성되었는지 확인
    if (
      nickname === "" ||
      email === "" ||
      password === "" ||
      passwordCheck === ""
    ) {
      alert("양식을 다 채워주세요.");
      return;
    }

    // 이메일 형식 확인
    if (!emailRegex.test(email)) {
      alert("잘못된 이메일 형식입니다.");
      return;
    }

    // 비밀번호 형식 확인
    if (!passwordRegex.test(password)) {
      alert("잘못된 비밀번호 형식입니다.");
      return;
    }

    // 비밀번호 확인
    if (password !== passwordCheck) {
      alert("입력한 비밀번호와 다릅니다.");
      return;
    }

    // 이용약관 동의 확인
    if (!isTermsChecked) {
      alert("이용약관에 동의해 주세요.");
      return;
    }

    // 서버로 데이터 전송
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, email, password }),
    })
      .then((response) => {
        return response.text().then((data) => ({
          data,
          ok: response.ok,
        }));
      })
      .then(({ data, ok }) => {
        alert(data);
        if (ok) {
          window.location.href = "login.html"; // 로그인 화면으로 이동
        }
      })
      .catch((error) => {
        alert("서버에 문제가 발생했습니다.");
        console.error("Error:", error);
      });
  });
});
