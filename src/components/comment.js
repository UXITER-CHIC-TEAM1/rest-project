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

// 댓글 입력 창
function openCommentInput() {
    document.querySelector('.overlay').style.display = 'block'; /* 어두운 배경 표시 */
    document.querySelector('.comment-input-container').style.display = 'block'; /* 댓글 입력창 표시 */
    document.querySelector('.comment-write-btn').style.display = 'none'; /* 댓글 작성 버튼 숨김 */
  }
  
  function closeCommentInput() {
    document.querySelector('.overlay').style.display = 'none'; /* 어두운 배경 숨김 */
    document.querySelector('.comment-input-container').style.display = 'none'; /* 댓글 입력창 숨김 */
    document.querySelector('.comment-write-btn').style.display = 'flex'; /* 댓글 작성 버튼 표시 */
  }
  
  