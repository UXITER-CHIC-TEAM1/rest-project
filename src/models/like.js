const mongoose = require('mongoose');

// 좋아요 스키마 정의
const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now }
});

// 좋아요 모델 생성 
const Like = mongoose.model('Like', likeSchema);

// 내보내기
module.exports = Like;
