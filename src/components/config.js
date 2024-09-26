require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt'); // 비밀번호 해시화 라이브러리
const User = require('../models/user'); // 사용자 모델 임포트
const Post = require('../models/post'); // 게시글 모델 임포트
const jwt = require('jsonwebtoken'); // JWT 패키지 추가
const session = require('express-session'); // 세션 관리 패키지 추가
const multer = require('multer');

const ObjectId = mongoose.Types.ObjectId;

const app = express();
const port = process.env.PORT || 3000; // 환경 변수에서 포트 번호 가져오기

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB 연결 성공'))
    .catch(err => console.error('MongoDB 연결 실패:', err));

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

// Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 업로드할 디렉토리 지정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 파일에 고유한 이름 부여
    }
});

const upload = multer({ storage: storage });
app.post('/create-post', upload.array('images', 5), async (req, res) => { // 최대 5개의 이미지 업로드
    const { title, content, selectedLocation, categories } = req.body; // categories 추가

    // selectedLocation이 undefined일 경우 에러 응답
    if (!selectedLocation) {
        return res.status(400).json({ success: false, message: '위치 정보가 필요합니다.' });
    }

    let location;

    // JSON 파싱 오류 처리
    try {
        location = JSON.parse(selectedLocation);
    } catch (error) {
        console.error('위치 정보 파싱 오류:', error);
        return res.status(400).json({ success: false, message: '위치 정보가 유효하지 않습니다.' });
    }

    console.log(req.body); // req.body에서 title과 content 확인
    console.log(req.files); // 업로드된 파일 확인

    // 이미지 경로가 없을 경우 빈 배열로 설정
    const images = req.files ? req.files.map(file => file.path) : [];

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // token을 이곳에서 정의

    if (!token) {
        return res.status(401).json({ success: false, message: '토큰이 필요합니다.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const authorId = decoded._id;

        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            throw new Error('유효하지 않은 사용자 ID');
        }
        console.log('Location before parsing:', location); // 추가한 콘솔 로그

        // categories가 정의되어 있는지 확인 후 JSON 파싱
        const parsedCategories = categories ? JSON.parse(categories) : []; // JSON 문자열 파싱

        const newPost = new Post({
            title,
            content,
            author: new mongoose.Types.ObjectId(authorId),
            images,
            location: {
                type: "Point",
                coordinates: [parseFloat(location.lng), parseFloat(location.lat)] // GeoJSON 형식: [경도, 위도]
            },
            categories: parsedCategories // 카테고리 추가
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
