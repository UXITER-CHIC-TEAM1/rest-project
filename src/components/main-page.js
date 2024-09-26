document.querySelector(".title-logo").addEventListener("click", function () {
  window.location.href = "home.html";
});

document.querySelector(".emoticon-item").addEventListener("click", function () {
  window.location.href = "log_record.html";
});

// 마이로그 및 커뮤니티 탭 전환 기능
const myLogTab = document.getElementById("myLogTab");
const communityTab = document.getElementById("communityTab");
const myLogContent = document.getElementById("myLogContent");
const communityContent = document.getElementById("communityContent");

// 마이로그 탭 클릭 시
myLogTab.addEventListener("click", () => {
  // 탭 활성화 상태 변경
  myLogTab.classList.add("active");
  communityTab.classList.remove("active");

  // 콘텐츠 활성화 상태 변경
  myLogContent.classList.add("active");
  communityContent.classList.remove("active");
});

// 커뮤니티 탭 클릭 시
communityTab.addEventListener("click", () => {
  // 탭 활성화 상태 변경
  communityTab.classList.add("active");
  myLogTab.classList.remove("active");

  // 콘텐츠 활성화 상태 변경
  communityContent.classList.add("active");
  myLogContent.classList.remove("active");
});
