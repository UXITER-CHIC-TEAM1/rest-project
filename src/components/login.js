document.querySelector('.login-button').addEventListener('click', function() {
    const username = document.querySelector('.login-input[type="text"]').value;
    const password = document.querySelector('.login-input[type="password"]').value;
    
    if (username === "" || password === "") {
        alert("아이디와 비밀번호를 입력해주세요.");
    } else {
        // TODO: 실제 로그인 로직을 추가
        
    }
});
