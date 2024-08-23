const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt'); // 비밀번호 해시화 라이브러리

const app = express();
const port = 3000;  // 필요시 5000으로 변경 가능

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/signupDB')
    .then(() => console.log('MongoDB 연결 성공'))
    .catch(err => console.error('MongoDB 연결 실패:', err));

// 데이터베이스 스키마 및 모델
const userSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// 비밀번호를 저장하기 전에 해시화
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

// 미들웨어 설정
app.use(bodyParser.json());

// 정적 파일 제공 디렉토리 설정
app.use(express.static(path.join(__dirname, '..', 'layout')));
app.use(express.static(path.join(__dirname, '..', 'components')));
app.use(express.static(path.join(__dirname, '..', 'assets')));

// 기본 라우트: start.html 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'layout', 'start.html'));
});

// 회원가입 요청 처리
app.post('/signup', async (req, res) => {
    console.log(req.body)
    const { nickname, email, password } = req.body; // → JS 문법 中 '구조 분해 할당' 구문
    try {
        const newUser = new User({ nickname, email, password });
        await newUser.save();
        res.send('회원가입 성공!');
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).send('서버 오류');
    }
});

// 로그인 요청 처리
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // 사용자를 찾음
        const user = await User.findOne({ email: username }); // User.findOne(): DB에서 조건에 맞는 하나의 문서 탐색. 사용자가 입력한 username에 해당하는 이메일이 있는지 확인
        if (!user) {
            return res.json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: '비밀번호가 잘못되었습니다.' });
        }

        // 로그인 성공
        res.json({ success: true });
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
