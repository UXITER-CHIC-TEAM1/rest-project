document.addEventListener("DOMContentLoaded", function () {
    // 모든 '좋아요' 버튼을 선택하여 likeButtons에 저장
    const likeButtons = document.querySelectorAll('.likes-button');

    // 각 '좋아요' 버튼에 대해 반복 처리
    likeButtons.forEach((button) => {
        // 각 버튼에 클릭 이벤트 리스너 추가
        button.addEventListener('click', function () {
            // 현재 버튼의 부모 요소에서 이미지와 좋아요 카운트 요소를 찾음
            const imgElement = this.querySelector('img');
            const countElement = this.nextElementSibling;

            // 디버깅용: 클릭 전 이미지 요소가 올바르게 선택되었는지 콘솔에 출력
            console.log("Image Element:", imgElement);
            console.log("Before click:", imgElement.src); // 클릭 전 이미지 소스 출력
            // 현재 좋아요 수를 가져와 정수로 변환
            let likesCount = parseInt(countElement.textContent, 10);

            // 버튼이 이미 'liked' 상태가 아니라면, 좋아요 수 증가 및 이미지 변경
            if (!button.classList.contains('liked')) {
                likesCount += 1; // 좋아요 수 1 증가
                button.classList.add('liked'); // 버튼에 'liked' 클래스 추가
                imgElement.src = '/src/assets/filled-likes.png'; // 채워진 하트 이미지로 변경
            } else {
                // 버튼이 이미 'liked' 상태라면, 좋아요 수 감소 및 이미지 원래대로 변경
                likesCount -= 1; // 좋아요 수 1 감소
                button.classList.remove('liked'); // 버튼에서 'liked' 클래스 제거
                imgElement.src = '/src/assets/likes-button.png'; // 비어 있는 하트 이미지로 변경
            }

            // 디버깅용: 클릭 후 이미지 소스가 변경되었는지 콘솔에 출력
            console.log("After click:", imgElement.src);

            // 업데이트된 좋아요 수를 화면에 반영
            countElement.textContent = likesCount;
        });
    });
});

// 댓글 & 달기 기능 (수정필요)
document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.querySelector('.input-comment');
    const commentButton = document.querySelector('.comment-button');
    const commentSection = document.querySelector('.div'); // 댓글이 추가될 부모 요소

    // 기본 placeholder 설정
    commentInput.placeholder = '댓글을 입력하세요...';

    commentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        
        if (commentText === '') {
            alert('댓글을 입력하세요.');
            return;
        }

        // 댓글 생성
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        
        newComment.innerHTML = `
            <div class="user-icon"></div>
            <div class="post-details">
                <div class="post-meta">
                    <span class="username">닉네임</span>
                    <p class="content">${commentText}</p>
                </div>
                <div class="post-actions">
                    <span class="post-date">2024.07.28</span>
                    <span class="post-time">12:27</span>
                    <button class="reply">답글달기</button>
                    <div class="likes-info">
                        <button class="likes-button" id="like-btn-1">
                            <img src="/src/assets/likes-button.png" id="like-img-1" />
                        </button>
                        <p class="likes-amount" id="like-count-1">0</p>
                    </div>
                </div>
            </div>
        `;

        // 새로운 댓글을 댓글 섹션에 추가
        commentSection.appendChild(newComment);
        
        // 입력창 비우기 및 기본 placeholder로 설정
        commentInput.value = '';
        commentInput.placeholder = '댓글을 입력하세요...';
    });

    // 답글 달기 버튼 클릭 시
    commentSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('reply')) {
            const username = event.target.closest('.comment').querySelector('.username').textContent;
            commentInput.placeholder = `${username}님에게 답글달기: `;
            commentInput.focus();
        }
    });
});

// 최신순 / 등록순 필터링 버튼 (현재는 버튼 클릭하면 배경색 변하는 이벤트만 구현 됨.)
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼의 스타일 초기화
            filterButtons.forEach(btn => {
                btn.style.backgroundColor = 'white';
                btn.style.color = 'black'; // 원래 글자색으로 복원
            });

            // 클릭된 버튼의 스타일 변경
            button.style.backgroundColor = '#384b60';
            button.style.color = 'white';
        });
    });
});
