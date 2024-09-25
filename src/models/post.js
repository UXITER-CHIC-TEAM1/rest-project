const mongoose = require('mongoose');

// 데이터베이스 스키마 및 모델 추가 (게시글)
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: { type: [String], default: [] },
    // 위치 정보 필드를 제거
});

const Post = mongoose.model('Post', postSchema);

// 내보내기
module.exports = Post;
