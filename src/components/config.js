require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT 패키지 추가
const session = require('express-session'); // 세션 관리 패키지 추가

const ObjectId = mongoose.Types.ObjectId;

const app = express();
const port = process.env.PORT || 3000; // 환경 변수에서 포트 번호 가져오기

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
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

// 데이터베이스 스키마 및 모델 추가 (게시글)
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [String]
    // 위치 정보 필드를 제거
});

const Post = mongoose.model('Post', postSchema);


// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 세션 미들웨어 설정
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS를 사용하는 경우 true로 설정
}));

// 정적 파일 제공 디렉토리 설정
app.use(express.static(path.join(__dirname, '..', 'layout')));
app.use(express.static(path.join(__dirname, '..', 'components')));
app.use(express.static(path.join(__dirname, '..', 'assets')));

// 기본 라우트: start.html 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'layout', 'start.html'));
});

// JWT 검증 미들웨어 수정
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ success: false, message: '토큰이 필요합니다.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT 검증 오류:', err);
            return res.status(403).json({ success: false, message: '유효하지 않은 토큰입니다.' });
        }
        req.user = user;
        next();
    });
}

// 회원가입 요청 처리
app.post('/signup', async (req, res) => {
    const { nickname, email, password } = req.body;
    try {
        const newUser = new User({ nickname, email, password });
        await newUser.save();
        res.send('회원가입 성공!');
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).send('서버 오류');
    }
});

// 로그인 요청 처리 수정
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: '비밀번호가 잘못되었습니다.' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated JWT:', token);
        res.json({ success: true, token });
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ success: false, message: '토큰이 필요합니다.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: '유효하지 않은 토큰입니다.' });
        req.user = user;
        next();
    });
}

// 게시글 등록 요청 처리 수정
app.post('/create-post', async (req, res) => {
    const { title, content } = req.body;  // 위치 정보를 제거

    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ success: false, message: '토큰이 필요합니다.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const authorId = decoded._id;
  
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        throw new Error('유효하지 않은 사용자 ID');
      }
  
      const newPost = new Post({
        title,
        content,
        author:new mongoose.Types.ObjectId(authorId)
        // 위치 정보를 제거
      });
  
      await newPost.save();
      res.status(201).json({ success: true, message: '게시글 등록 성공' });
    } catch (error) {
      console.error('게시글 등록 중 오류:', error.message || error);
      res.status(500).json({ success: false, message: `게시글 등록 중 오류가 발생했습니다. 상세: ${error.message}` });
    }
});


// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error('서버 오류:', err);
    res.status(500).send('서버에서 오류가 발생했습니다.');
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
