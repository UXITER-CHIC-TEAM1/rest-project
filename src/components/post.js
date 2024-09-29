// // // 이미지 슬라이드 js 코드
// // function row_scroll() {
// //   // 모든 .nav-tab__list 요소를 선택
// //   document.querySelectorAll(".nav-tab__list").forEach((list) => {
// //     list.addEventListener("wheel", (e) => {
// //       e.preventDefault();

// //       // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
// //       var scrollAmount = e.deltaY;

// //       // 현재 타겟 요소의 scrollLeft 값을 업데이트
// //       e.currentTarget.scrollLeft += scrollAmount;
// //     });
// //   });

// //   // 필터링 슬라이드 js 코드
// //   document.querySelectorAll(".filter-div").forEach((filter) => {
// //     filter.addEventListener("wheel", (e) => {
// //       e.preventDefault();

// //       // deltaY를 사용하여 수직 휠 스크롤 값을 가져옴
// //       var scrollAmount = e.deltaY;

// //       // 현재 타겟 요소의 scrollLeft 값을 업데이트
// //       e.currentTarget.scrollLeft += scrollAmount;
// //     });
// //   });
// // }

// // // 스크롤 기능 초기화
// // row_scroll();

// // // 좋아요 버튼 js 코드
// // const likeButtons = document.querySelectorAll('.likes-button');

// // // 각 '좋아요' 버튼에 대해 반복 처리
// // likeButtons.forEach((button) => {
// //     // 각 버튼에 클릭 이벤트 리스너 추가
// //     button.addEventListener('click', function () {
// //         // 현재 버튼의 부모 요소에서 이미지와 좋아요 카운트 요소를 찾음
// //         const imgElement = this.querySelector('img');
// //         const countElement = this.nextElementSibling;

// //         // 디버깅용: 클릭 전 이미지 요소가 올바르게 선택되었는지 콘솔에 출력
// //         console.log("Image Element:", imgElement);
// //         console.log("Before click:", imgElement.src); // 클릭 전 이미지 소스 출력
// //         // 현재 좋아요 수를 가져와 정수로 변환
// //         let likesCount = parseInt(countElement.textContent, 10);

// //         // 버튼이 이미 'liked' 상태가 아니라면, 좋아요 수 증가 및 이미지 변경
// //         if (!button.classList.contains('liked')) {
// //             likesCount += 1; // 좋아요 수 1 증가
// //             button.classList.add('liked'); // 버튼에 'liked' 클래스 추가
// //             imgElement.src = '/filled-likes.png'; // 채워진 하트 이미지로 변경
// //         } else {
// //             // 버튼이 이미 'liked' 상태라면, 좋아요 수 감소 및 이미지 원래대로 변경
// //             likesCount -= 1; // 좋아요 수 1 감소
// //             button.classList.remove('liked'); // 버튼에서 'liked' 클래스 제거
// //             imgElement.src = '/likes-button.png'; // 비어 있는 하트 이미지로 변경
// //         }

// //         // 디버깅용: 클릭 후 이미지 소스가 변경되었는지 콘솔에 출력
// //         console.log("After click:", imgElement.src);

// //         // 업데이트된 좋아요 수를 화면에 반영
// //         countElement.textContent = likesCount;
// //     });
// // });

// // document.addEventListener("DOMContentLoaded", function() {
// //   const bookmarkModal = document.getElementById("bookmarkModal");
// //   const folderCreationModal = document.getElementById("folderCreationModal");
// //   const bookmarkButton = document.querySelector(".bookmark-button"); // 북마크 버튼
// //   const addFolderButton = document.querySelector(".add-folder-button"); // 폴더 생성 모달 열기 버튼
// //   const createFolderButton = document.querySelector(".create-folder-button"); // 폴더 생성 버튼
// //   const colorRadios = document.querySelectorAll('input[name="folderColor"]'); // 색상 선택 라디오 버튼
// //   const folderNameInput = document.getElementById("folderName"); // 폴더 이름 입력 필드
// //   const folderList = document.querySelector(".folder-list"); // 폴더 리스트
// //   const folderPreview = document.getElementById("folder-preview"); // 폴더 미리보기 요소
// //   const maxFolders = 9; // 최대 폴더 수
// //   let selectedColor = ''; // 선택된 색상
// //   let isBookmarked = false; // 북마크 상태를 저장하는 변수

// //   // 북마크 버튼을 클릭하면 폴더 선택 모달 열기 (이미 북마크 되어 있으면 모달 뜨지 않고 이미지 변경)
// //   bookmarkButton.addEventListener("click", function() {
// //     const img = this.querySelector("img");
    
// //     if (isBookmarked) {
// //       // 북마크가 이미 되어 있으면, 다시 북마크 해제 이미지로 변경하고, 모달을 띄우지 않음
// //       img.src = "/bookmark.png";
// //       isBookmarked = false;

// //       img.style.width = "60px";
// //       img.style.height = "60px";
// //       img.style.margin = "1px"; 
// //     } else {
// //       bookmarkModal.classList.remove("hidden");
// //     }
// //   });

// //   // 모달 바깥을 클릭했을 때 폴더 선택 모달 닫기
// //   window.addEventListener("click", function(event) {
// //     if (event.target === bookmarkModal) {
// //       bookmarkModal.classList.add("hidden");
// //     } else if (event.target === folderCreationModal) {
// //       folderCreationModal.classList.add("hidden");
// //     }
// //   });

// //   // 폴더 추가 버튼 클릭 시 폴더 생성 모달 열기
// //   addFolderButton.addEventListener("click", function() {
// //     folderCreationModal.classList.remove("hidden");
// //   });

// //   // 폴더 색상 선택 처리 및 folder-preview의 border-top 색상 변경
// //   colorRadios.forEach(radio => {
// //     radio.addEventListener("change", function() {
// //       selectedColor = this.value;
      
// //       // folder-preview의 border-top 색상 변경
// //       folderPreview.style.borderTopColor = selectedColor;
// //     });
// //   });

// //   // 폴더 생성 버튼 클릭 시 폴더 추가
// //   createFolderButton.addEventListener("click", function() {
// //     const folderName = folderNameInput.value.trim();

// //     if (folderName && selectedColor) {
// //       const folderCount = folderList.children.length;

// //       if (folderCount < maxFolders) {
// //         const newFolder = document.createElement("li");
// //         const newFolderId = `folder${folderCount + 1}`; // 유일한 폴더 ID 생성
// //         newFolder.innerHTML = `
// //           <div style="background-color: ${selectedColor}; width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 10px;"></div>
// //           <input type="radio" id="${newFolderId}" name="folder" />
// //           <label for="${newFolderId}">${folderName}</label>
// //         `;
// //         folderList.appendChild(newFolder); // 폴더 리스트에 새로운 폴더 추가

// //         // 폴더 생성 완료 후 폴더 생성 모달 닫기
// //         folderCreationModal.classList.add("hidden");

// //         // 입력 필드 초기화
// //         folderNameInput.value = '';
// //         selectedColor = ''; // 색상 선택 초기화
// //         folderPreview.style.borderTopColor = "#e08282"; // 초기 색상으로 되돌림
// //       } else {
// //         alert("폴더는 최대 9개까지 추가할 수 있습니다.");
// //       }
// //     } else {
// //       alert("폴더 이름과 색상을 선택하세요.");
// //     }
// //   });

// //   // 저장 버튼 클릭 시 북마크 버튼 이미지 변경 및 폴더 선택 모달 닫기
// //   document.querySelector(".save-button").addEventListener("click", function() {
// //     const selectedFolder = document.querySelector("input[name='folder']:checked");

// //     if (!selectedFolder) {
// //       alert("폴더를 선택해주세요");
// //     } else {
// //       // 폴더 선택 모달을 숨김
// //       bookmarkModal.classList.add("hidden");

// //       // 북마크 버튼의 이미지 요소 선택
// //       const img = bookmarkButton.querySelector('img');

// //       // 이미지 소스를 변경
// //       img.src = "/add-bookmark.png";

// //       // 이미지 크기 조절
// //       img.style.width = "38px";  
// //       img.style.height = "46px";
// //       img.style.margin = "13px";

// //       // 북마크 상태 업데이트
// //       isBookmarked = true;
// //     }
// //   });
// // });



// document.addEventListener("DOMContentLoaded", function () {
//   const token = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 토큰 가져오기

//   if (!token) {
//     alert("로그인이 필요합니다."); // 로그인 필요 메시지
//     window.location.href = "login.html"; // 로그인 페이지로 리다이렉션
//     return; // 함수 종료
//   }

//   validateToken(); // JWT 유효성 검사 함수 호출

//   // JWT 토큰 유효성 검사 함수
//   function validateToken() {
//     fetch("/api/validate-token", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`, // Authorization 헤더에 JWT 토큰 추가
//       },
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("인증 실패: " + response.status); // 인증 실패 시 에러 처리
//         return response.json(); // 응답을 JSON 형식으로 변환
//       })
//       .then((data) => {
//         console.log("토큰 유효성 검사 결과:", data); // 유효성 검사 결과 콘솔 출력
//         loadPost(); // 토큰이 유효할 경우 포스트 로드 함수 호출
//       })
//       .catch((error) => {
//         console.error("오류 발생:", error); // 오류 발생 시 콘솔 출력
//         alert(`인증 실패: ${error.message}`); // 오류 메시지 출력
//         window.location.href = "login.html"; // 인증 실패 시 로그인 페이지로 리다이렉션
//       });
//   }

//   // 특정 포스트 로드 함수
//   function loadPost() {
//     const urlParams = new URLSearchParams(window.location.search); // 쿼리스트링 파라미터 가져오기
//     const postId = urlParams.get('p'); // 쿼리스트링에서 포스트 ID 가져오기

//     fetch(`/api/posts/${postId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`, // JWT 토큰 추가
//       },
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("포스트 로드 실패"); // 포스트 로드 실패 시 에러 처리
//         return response.json(); // 응답을 JSON 형식으로 변환
//       })
//       .then((post) => {
//         // 포스트 내용을 동적으로 페이지에 반영
//         document.getElementById("post-title").textContent = post.title; // 제목 설정
//         document.getElementById("post-content").textContent = post.content; // 내용 설정
//         document.getElementById("post-location").textContent = post.selectedLocation.name; // 장소명 설정
//         document.getElementById("post-place").textContent = post.place; // 장소 설정
//         document.getElementById("post-categories").textContent = post.categories.join(", "); // 카테고리 설정
//         // 이미지 등 추가적인 동적 설정 필요시 여기서 처리
//       })
//       .catch((error) => {
//         console.error(error); // 오류 발생 시 콘솔 출력
//         alert(`포스트 로드 중 오류 발생: ${error.message}`); // 오류 메시지 출력
//       });
//   }

//   // 이미지 슬라이드 js 코드
//   function row_scroll() {
//     document.querySelectorAll(".nav-tab__list").forEach((list) => {
//       list.addEventListener("wheel", (e) => {
//         e.preventDefault();
//         var scrollAmount = e.deltaY;
//         e.currentTarget.scrollLeft += scrollAmount;
//       });
//     });

//     document.querySelectorAll(".filter-div").forEach((filter) => {
//       filter.addEventListener("wheel", (e) => {
//         e.preventDefault();
//         var scrollAmount = e.deltaY;
//         e.currentTarget.scrollLeft += scrollAmount;
//       });
//     });
//   }

//   // 스크롤 기능 초기화
//   row_scroll();

//   // 좋아요 버튼 js 코드
//   const likeButtons = document.querySelectorAll('.likes-button');

//   likeButtons.forEach((button) => {
//     button.addEventListener('click', function () {
//       const imgElement = this.querySelector('img');
//       const countElement = this.nextElementSibling;

//       console.log("Image Element:", imgElement);
//       console.log("Before click:", imgElement.src);
//       let likesCount = parseInt(countElement.textContent, 10);

//       if (!button.classList.contains('liked')) {
//         likesCount += 1;
//         button.classList.add('liked');
//         imgElement.src = '/filled-likes.png';
//       } else {
//         likesCount -= 1;
//         button.classList.remove('liked');
//         imgElement.src = '/likes-button.png';
//       }

//       console.log("After click:", imgElement.src);
//       countElement.textContent = likesCount;
//     });
//   });

//   // 북마크 및 폴더 기능 관련 코드
//   const bookmarkModal = document.getElementById("bookmarkModal");
//   const folderCreationModal = document.getElementById("folderCreationModal");
//   const bookmarkButton = document.querySelector(".bookmark-button"); // 북마크 버튼
//   const addFolderButton = document.querySelector(".add-folder-button"); // 폴더 생성 모달 열기 버튼
//   const createFolderButton = document.querySelector(".create-folder-button"); // 폴더 생성 버튼
//   const colorRadios = document.querySelectorAll('input[name="folderColor"]'); // 색상 선택 라디오 버튼
//   const folderNameInput = document.getElementById("folderName"); // 폴더 이름 입력 필드
//   const folderList = document.querySelector(".folder-list"); // 폴더 리스트
//   const folderPreview = document.getElementById("folder-preview"); // 폴더 미리보기 요소
//   const maxFolders = 9; // 최대 폴더 수
//   let selectedColor = ''; // 선택된 색상
//   let isBookmarked = false; // 북마크 상태를 저장하는 변수

//   // 북마크 버튼 클릭 처리
//   bookmarkButton.addEventListener("click", function() {
//     const img = this.querySelector("img");

//     if (isBookmarked) {
//       img.src = "/bookmark.png";
//       isBookmarked = false;
//       img.style.width = "60px";
//       img.style.height = "60px";
//       img.style.margin = "1px"; 
//     } else {
//       bookmarkModal.classList.remove("hidden");
//     }
//   });

//   // 모달 바깥 클릭 시 모달 닫기
//   window.addEventListener("click", function(event) {
//     if (event.target === bookmarkModal) {
//       bookmarkModal.classList.add("hidden");
//     } else if (event.target === folderCreationModal) {
//       folderCreationModal.classList.add("hidden");
//     }
//   });

//   // 폴더 추가 버튼 클릭 시 모달 열기
//   addFolderButton.addEventListener("click", function() {
//     folderCreationModal.classList.remove("hidden");
//   });

//   // 색상 선택 처리
//   colorRadios.forEach(radio => {
//     radio.addEventListener("change", function() {
//       selectedColor = this.value;
//       folderPreview.style.borderTopColor = selectedColor;
//     });
//   });

//   // 폴더 생성 버튼 클릭 시 폴더 추가
//   createFolderButton.addEventListener("click", function() {
//     const folderName = folderNameInput.value.trim();

//     if (folderName && selectedColor) {
//       const folderCount = folderList.children.length;

//       if (folderCount < maxFolders) {
//         const newFolder = document.createElement("li");
//         const newFolderId = `folder${folderCount + 1}`;
//         newFolder.innerHTML = `
//           <div style="background-color: ${selectedColor}; width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 10px;"></div>
//           <input type="radio" id="${newFolderId}" name="folder" />
//           <label for="${newFolderId}">${folderName}</label>
//         `;
//         folderList.appendChild(newFolder);

//         folderCreationModal.classList.add("hidden");
//         folderNameInput.value = '';
//         selectedColor = '';
//         folderPreview.style.borderTopColor = "#e08282";
//       } else {
//         alert("폴더는 최대 9개까지 추가할 수 있습니다.");
//       }
//     } else {
//       alert("폴더 이름과 색상을 선택하세요.");
//     }
//   });

//   // 저장 버튼 클릭 시 북마크 버튼 이미지 변경 및 모달 닫기
//   document.querySelector(".save-button").addEventListener("click", function() {
//     const selectedFolder = document.querySelector("input[name='folder']:checked");

//     if (!selectedFolder) {
//       alert("폴더를 선택해주세요");
//     } else {
//       bookmarkModal.classList.add("hidden");
//       const img = bookmarkButton.querySelector('img');
//       img.src = "/add-bookmark.png";
//       img.style.width = "38px";  
//       img.style.height = "46px";
//       img.style.margin = "13px";
//       isBookmarked = true;
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 토큰 가져오기

  if (!token) {
    alert("로그인이 필요합니다."); // 로그인 필요 메시지
    window.location.href = "login.html"; // 로그인 페이지로 리다이렉션
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
        if (!response.ok) throw new Error("인증 실패: " + response.status); // 인증 실패 시 에러 처리
        return response.json(); // 응답을 JSON 형식으로 변환
      })
      .then((data) => {
        console.log("토큰 유효성 검사 결과:", data); // 유효성 검사 결과 콘솔 출력
        loadPost(); // 토큰이 유효할 경우 포스트 로드 함수 호출
      })
      .catch((error) => {
        console.error("오류 발생:", error); // 오류 발생 시 콘솔 출력
        alert(`인증 실패: ${error.message}`); // 오류 메시지 출력
        window.location.href = "login.html"; // 인증 실패 시 로그인 페이지로 리다이렉션
      });
  }

  // 특정 포스트 로드 함수
  function loadPost() {
    const urlParams = new URLSearchParams(window.location.search); // 쿼리스트링 파라미터 가져오기
    const postId = urlParams.get('p'); // 쿼리스트링에서 포스트 ID 가져오기

    fetch(`/api/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("포스트 로드 실패"); // 포스트 로드 실패 시 에러 처리
        return response.json(); // 응답을 JSON 형식으로 변환
      })
      .then((post) => {
        // 포스트 내용을 동적으로 페이지에 반영
        const postTitle = document.getElementById("post-title");
        const postContent = document.getElementById("post-content");
        const postLocation = document.getElementById("post-location");
        const postPlace = document.getElementById("post-place");
        const postCategories = document.getElementById("post-categories");

        // null 체크
        if (!postTitle || !postContent || !postLocation || !postPlace || !postCategories) {
          console.error("필요한 DOM 요소를 찾을 수 없습니다.");
          return;
        }

        postTitle.textContent = post.title; // 제목 설정
        postContent.textContent = post.content; // 내용 설정
        postLocation.textContent = post.selectedLocation.name; // 장소명 설정
        postPlace.textContent = post.place; // 장소 설정
        postCategories.textContent = post.categories.join(", "); // 카테고리 설정
        // 이미지 등 추가적인 동적 설정 필요시 여기서 처리
      })
      .catch((error) => {
        console.error(error); // 오류 발생 시 콘솔 출력
        alert(`포스트 로드 중 오류 발생: ${error.message}`); // 오류 메시지 출력
      });
  }

  // 이미지 슬라이드 js 코드
  function row_scroll() {
    document.querySelectorAll(".nav-tab__list").forEach((list) => {
      list.addEventListener("wheel", (e) => {
        e.preventDefault();
        var scrollAmount = e.deltaY;
        e.currentTarget.scrollLeft += scrollAmount;
      });
    });

    document.querySelectorAll(".filter-div").forEach((filter) => {
      filter.addEventListener("wheel", (e) => {
        e.preventDefault();
        var scrollAmount = e.deltaY;
        e.currentTarget.scrollLeft += scrollAmount;
      });
    });
  }

  // 스크롤 기능 초기화
  row_scroll();

  // 좋아요 버튼 js 코드
  const likeButtons = document.querySelectorAll('.likes-button');

  likeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const imgElement = this.querySelector('img');
      const countElement = this.nextElementSibling;

      console.log("Image Element:", imgElement);
      console.log("Before click:", imgElement.src);
      let likesCount = parseInt(countElement.textContent, 10);

      if (!button.classList.contains('liked')) {
        likesCount += 1;
        button.classList.add('liked');
        imgElement.src = '/filled-likes.png';
      } else {
        likesCount -= 1;
        button.classList.remove('liked');
        imgElement.src = '/likes-button.png';
      }

      console.log("After click:", imgElement.src);
      countElement.textContent = likesCount;
    });
  });

  // 북마크 및 폴더 기능 관련 코드
  const bookmarkModal = document.getElementById("bookmarkModal");
  const folderCreationModal = document.getElementById("folderCreationModal");
  const bookmarkButton = document.querySelector(".bookmark-button"); // 북마크 버튼
  const addFolderButton = document.querySelector(".add-folder-button"); // 폴더 생성 모달 열기 버튼
  const createFolderButton = document.querySelector(".create-folder-button"); // 폴더 생성 버튼
  const colorRadios = document.querySelectorAll('input[name="folderColor"]'); // 색상 선택 라디오 버튼
  const folderNameInput = document.getElementById("folderName"); // 폴더 이름 입력 필드
  const folderList = document.querySelector(".folder-list"); // 폴더 리스트
  const folderPreview = document.getElementById("folder-preview"); // 폴더 미리보기 요소
  const maxFolders = 9; // 최대 폴더 수
  let selectedColor = ''; // 선택된 색상
  let isBookmarked = false; // 북마크 상태를 저장하는 변수

  // 북마크 버튼 클릭 처리
  bookmarkButton.addEventListener("click", function() {
    const img = this.querySelector("img");

    if (isBookmarked) {
      img.src = "/bookmark.png";
      isBookmarked = false;
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.margin = "1px"; 
    } else {
      bookmarkModal.classList.remove("hidden");
    }
  });

  // 모달 바깥 클릭 시 모달 닫기
  window.addEventListener("click", function(event) {
    if (event.target === bookmarkModal) {
      bookmarkModal.classList.add("hidden");
    } else if (event.target === folderCreationModal) {
      folderCreationModal.classList.add("hidden");
    }
  });

  // 폴더 추가 버튼 클릭 시 모달 열기
  addFolderButton.addEventListener("click", function() {
    folderCreationModal.classList.remove("hidden");
  });

  // 색상 선택 처리
  colorRadios.forEach(radio => {
    radio.addEventListener("change", function() {
      selectedColor = this.value;
      folderPreview.style.borderTopColor = selectedColor;
    });
  });

  // 폴더 생성 버튼 클릭 시 폴더 추가
  createFolderButton.addEventListener("click", function() {
    const folderName = folderNameInput.value.trim();

    if (folderName && selectedColor) {
      const folderCount = folderList.children.length;

      if (folderCount < maxFolders) {
        const newFolder = document.createElement("li");
        const newFolderId = `folder${folderCount + 1}`;
        newFolder.innerHTML = `
          <div style="background-color: ${selectedColor}; width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 10px;"></div>
          <input type="radio" id="${newFolderId}" name="folder" />
          <label for="${newFolderId}">${folderName}</label>
        `;
        folderList.appendChild(newFolder);

        folderCreationModal.classList.add("hidden");
        folderNameInput.value = '';
        selectedColor = '';
        folderPreview.style.borderTopColor = "#e08282";
      } else {
        alert("폴더는 최대 9개까지 추가할 수 있습니다.");
      }
    } else {
      alert("폴더 이름과 색상을 선택해 주세요.");
    }
  });
});
