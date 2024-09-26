document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "setting.html";
});

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
