document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.querySelector('.input-comment');
    const commentButton = document.querySelector('.comment-button');
    const commentSection = document.querySelector('.comment-section'); 
    let replyingTo = null; // 답글 대상 댓글

    // 댓글 추가 함수
    function addComment(text, isReply = false, parentComment = null) {
        const newComment = document.createElement('div');
        newComment.classList.add(isReply ? 'reply-comment' : 'comment');

        newComment.innerHTML = `
            <div class="user-icon"></div>
            <div class="post-details">
                <div class="post-meta">
                    <span class="username">닉네임</span>
                    <p class="content">${text}</p>
                </div>
                <div class="post-actions">
                    <span class="post-date">2024.07.28</span>
                    <span class="post-time">12:27</span>
                    ${!isReply ? '<button class="reply">답글달기</button>' : ''}
                    <div class="likes-info">
                        <button class="likes-button">
                            <img src="/likes-button.png" />
                        </button>
                        <p class="likes-amount">0</p>
                    </div>
                </div>
            </div>
        `;

        if (isReply && parentComment) {
            // 답글을 부모 댓글의 다음 요소로 추가
            parentComment.insertAdjacentElement('afterend', newComment);
        } else {
            commentSection.appendChild(newComment);
        }
    }

    // 댓글 작성 버튼 클릭 시
    commentButton.addEventListener('click', () => {
        let commentText = commentInput.value.trim();
        if (commentText === '') {
            alert('댓글을 입력하세요.');
            return;
        }

        // 답글일 경우 @username이 이미 추가된 경우 처리
        if (replyingTo) {
            const username = replyingTo.querySelector('.username').textContent;
            // @username이 이미 포함되어 있으면 중복으로 추가하지 않음
            if (!commentText.startsWith(`@${username}`)) {
                commentText = `@${username} ${commentText}`;
            }
            addComment(commentText, true, replyingTo);
            replyingTo = null; // 답글 대상 초기화
        } else {
            addComment(commentText); // 일반 댓글 추가
        }

        // 입력창 초기화
        commentInput.value = '';
        commentInput.placeholder = '댓글을 입력하세요.'; // 입력창 플레이스홀더 초기화
    });

    // 답글 달기 버튼 클릭 시
    commentSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('reply')) {
            replyingTo = event.target.closest('.comment');
            const username = replyingTo.querySelector('.username').textContent;
            commentInput.value = `@${username} `;
            commentInput.focus();
        }
    });

    // 이벤트 위임을 사용하여 '좋아요' 버튼 클릭 이벤트 처리
    commentSection.addEventListener('click', (event) => {
        if (event.target.closest('.likes-button')) {
            const button = event.target.closest('.likes-button');
            const imgElement = button.querySelector('img');
            const countElement = button.nextElementSibling;

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

            countElement.textContent = likesCount;
        }
    });
});
