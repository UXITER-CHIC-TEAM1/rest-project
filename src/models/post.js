const mongoose = require('mongoose');

// 데이터베이스 스키마 및 모델 추가 (게시글)
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: { type: [String], default: [] },
    location: {
        type: {
            type: String, // 'Point' 타입 지정
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const Post = mongoose.model('Post', postSchema);

// 내보내기
module.exports = Post;
