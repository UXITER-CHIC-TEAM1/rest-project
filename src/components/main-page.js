const log = document.getElementById('log');
const community = document.getElementById('community');
const contentArea = document.getElementById('content-area');

log.addEventListener('click', () => {
    contentArea.innerHTML = `
        <div id="log-content">
            <p id="date-display">
                <span id="selected-date" style="cursor: pointer;"><2024년 7월></span>
            </p>

            <div id="edit-fields" style="display: none;">
                <label for="year">년도:</label>
                <input type="number" id="year" value="2024" min="2000" max="2099">
                <label for="month">월:</label>
                <input type="number" id="month" value="7" min="1" max="12">
                <button id="save-button">저장</button>
            </div>

            <div id="log-details">
                <div class="emoticon-item">
                    <img src="/src/assets/icon_happy.png" alt="이모티콘" class="emoticon-img">
                    <p class="location">카페꼼마 합정점</p>
                    <p class="date">7.24</p>
                </div>
                <div class="emoticon-item">
                    <img src="/src/assets/icon_happy.png" alt="이모티콘" class="emoticon-img">
                    <p class="location">카페꼼마 합정점</p>
                    <p class="date">7.24</p>
                </div>
                <div class="emoticon-item">
                    <img src="/src/assets/icon_happy.png" alt="이모티콘" class="emoticon-img">
                    <p class="location">카페꼼마 합정점</p>
                    <p class="date">7.24</p>
                </div>
                <div class="emoticon-item">
                    <img src="/src/assets/icon_happy.png" alt="이모티콘" class="emoticon-img">
                    <p class="location">카페꼼마 합정점</p>
                    <p class="date">7.24</p>
                </div>
                <div class="emoticon-item">
                    <img src="/src/assets/icon_happy.png" alt="이모티콘" class="emoticon-img">
                    <p class="location">카페꼼마 합정점</p>
                    <p class="date">7.24</p>
                </div>
                <div class="emoticon-item">
                    <img src="/src/assets/icon_happy.png" alt="이모티콘" class="emoticon-img">
                    <p class="location">카페꼼마 합정점</p>
                    <p class="date">7.24</p>
                </div>
            </div>
            <div id="add-button-container">
                <img src="/src/assets/plus_button.png" alt="Add Button" id="add-button">
            </div>
        </div>
    `;

    const selectedDate = document.getElementById('selected-date');
    const editFields = document.getElementById('edit-fields');
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const saveButton = document.getElementById('save-button');

    selectedDate.addEventListener('click', () => {
        editFields.style.display = 'block';  // 입력 필드 표시
    });

    saveButton.addEventListener('click', () => {
        const year = yearInput.value;
        const month = monthInput.value;
        selectedDate.textContent = `${year}년 ${month}월`;  // 선택한 날짜 업데이트
        editFields.style.display = 'none';  // 입력 필드 숨김
    });
});

community.addEventListener('click', () => {
    contentArea.innerHTML = `
      <!-- 게시물 1 -->
      <div class="community-post">
        <a href="/src/layout/post.html" class="post-title">
          <p>인테리어가 예쁜 합정 카페 추천</p>
          <p class="post-placename">티노마드</p>
        </a>
        <!-- 사용자 프로필 / 닉네임 / 좋아요 버튼 / 좋아요 개수 -->
        <div class="user-likes-div">
          <div class="user-info-community">
            <i class="fa-solid fa-circle-user"></i>
            <p class="nickname">닉네임</p>
          </div>
          <!-- 좋아요 버튼 -->
          <div class="likes-info">
            <button class="likes-button" id="like-btn-1">
              <img src="/src/assets/likes-button.png" id="like-img-1" />
            </button>
            <p class="likes-amount" id="like-count-1">0</p>
          </div>
        </div>

        <!-- 이미지 슬라이드 -->
        <div class="nav-tab__inner">
          <div class="nav-tab__scroller">
            <ul class="nav-tab__list">
              <li class="nav-tab__item on">
                <a href="/src/layout/post.html">
                  <img src="/src/assets/post-img.jpg" alt="post-img" />
                </a>
              </li>
              <li class="nav-tab__item">
                <a href="/src/layout/post.html">
                  <img src="/src/assets/post-img.jpg" alt="post-img" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 게시물 2 -->
      <div class="community-post">
        <a href="/src/layout/post.html" class="post-title">
          <p>인테리어가 예쁜 합정 카페 추천</p>
          <p class="post-placename">티노마드</p>
        </a>
        <!-- 사용자 프로필 / 닉네임 / 좋아요 버튼 / 좋아요 개수 -->
        <div class="user-likes-div">
          <div class="user-info-community">
            <i class="fa-solid fa-circle-user"></i>
            <p class="nickname">닉네임</p>
          </div>
          <!-- 좋아요 버튼 -->
          <div class="likes-info">
            <button class="likes-button" id="like-btn-2">
              <img src="/src/assets/likes-button.png" id="like-img-2" />
            </button>
            <p class="likes-amount" id="like-count-2">0</p>
          </div>
        </div>

        <!-- 이미지 슬라이드 -->
        <div class="nav-tab__inner">
          <div class="nav-tab__scroller">
            <ul class="nav-tab__list">
              <li class="nav-tab__item on">
                <a href="/src/layout/post.html">
                  <img src="/src/assets/post-img.jpg" alt="post-img" />
                </a>
              </li>
              <li class="nav-tab__item">
                <a href="/src/layout/post.html">
                  <img src="/src/assets/post-img.jpg" alt="post-img" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;

    // 좋아요 버튼 기능 추가
    const likeButtons = document.querySelectorAll('.likes-button');
    likeButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const imgElement = this.querySelector('img');
            const countElement = this.nextElementSibling;
            let likesCount = parseInt(countElement.textContent, 10);

            if (!button.classList.contains('liked')) {
                likesCount += 1;
                button.classList.add('liked');
                imgElement.src = '/src/assets/filled-likes.png'; // 채워진 하트 이미지로 변경
            } else {
                likesCount -= 1;
                button.classList.remove('liked');
                imgElement.src = '/src/assets/likes-button.png'; // 비어 있는 하트 이미지로 변경
            }

            countElement.textContent = likesCount;
        });
    });
});
