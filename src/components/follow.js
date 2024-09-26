document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "main-page.html";
});

// 탭 전환 기능
const followerTab = document.getElementById("followerTab");
const followingTab = document.getElementById("followingTab");
const followerList = document.getElementById("followerList");
const followingList = document.getElementById("followingList");

// 팔로워 탭 클릭 시
followerTab.addEventListener("click", () => {
  followerTab.classList.add("active");
  followingTab.classList.remove("active");
  followerList.classList.add("active");
  followingList.classList.remove("active");
});

// 팔로잉 탭 클릭 시
followingTab.addEventListener("click", () => {
  followingTab.classList.add("active");
  followerTab.classList.remove("active");
  followingList.classList.add("active");
  followerList.classList.remove("active");
});

// 팔로우 상태에 따른 버튼 텍스트 업데이트 (팔로워 목록)
document.querySelectorAll("#followerList .follow-btn").forEach((button) => {
  const isFollowing = button.getAttribute("data-following") === "true";

  if (isFollowing) {
    button.textContent = "팔로잉";
  } else {
    button.textContent = "맞팔로우";
  }

  // 클릭 시 팔로잉 상태 토글
  button.addEventListener("click", () => {
    const currentlyFollowing = button.getAttribute("data-following") === "true";

    if (currentlyFollowing) {
      button.textContent = "맞팔로우";
      button.setAttribute("data-following", "false");
    } else {
      button.textContent = "팔로잉";
      button.setAttribute("data-following", "true");
    }
  });
});

// 팔로잉 목록에서 팔로우 해제 시 항목 삭제
document.querySelectorAll("#followingList .follow-btn").forEach((button) => {
  button.textContent = "팔로잉"; // 기본적으로 팔로잉 텍스트 설정

  button.addEventListener("click", () => {
    // 해당 팔로잉 항목을 삭제
    const listItem = button.closest(".user-item");
    listItem.remove();
  });
});

// 초기 값 설정
let followerCount = document.querySelectorAll(
  "#followerList .user-item"
).length; // 팔로워 수
let followingCount = document.querySelectorAll(
  "#followingList .user-item"
).length; // 팔로잉 수

// 수 업데이트 함수
function updateCounts() {
  document.getElementById("followerCount").textContent = followerCount;
  document.getElementById("followingCount").textContent = followingCount;
}

// 초기 수 업데이트
updateCounts();

// 탭 클릭 이벤트
document.getElementById("followerTab").addEventListener("click", function () {
  document.getElementById("followerList").classList.add("active");
  document.getElementById("followingList").classList.remove("active");
  this.classList.add("active");
  document.getElementById("followingTab").classList.remove("active");
});

document.getElementById("followingTab").addEventListener("click", function () {
  document.getElementById("followerList").classList.remove("active");
  document.getElementById("followingList").classList.add("active");
  this.classList.add("active");
  document.getElementById("followerTab").classList.remove("active");
});

// 페이지 로드 시 초기 상태 업데이트
updateCounts();
