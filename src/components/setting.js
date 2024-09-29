document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "main-page.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".settings-list li:nth-child(2) a"); // 로그아웃 버튼
  const deleteAccountBtn = document.querySelector(
    ".settings-list li:nth-child(3) a"
  ); // 회원탈퇴 버튼

  // 로그아웃 버튼 클릭 이벤트
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작 방지 (링크 이동 방지)

    // 로그아웃 확인 창
    const isLogoutConfirmed = confirm("로그아웃 하시겠습니까?");

    if (isLogoutConfirmed) {
      alert("로그아웃이 완료되었습니다.");
      window.location.href = "start.html"; // 로그아웃 후 start.html로 이동
    }
  });

  // 회원탈퇴 버튼 클릭 이벤트
  deleteAccountBtn.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작 방지 (링크 이동 방지)

    // 회원탈퇴 확인 창
    const isDeleteConfirmed = confirm("회원탈퇴 하시겠습니까?");

    if (isDeleteConfirmed) {
      alert("회원탈퇴가 완료되었습니다.");
      window.location.href = "start.html"; // 회원탈퇴 후 start.html로 이동
    }
  });
});
