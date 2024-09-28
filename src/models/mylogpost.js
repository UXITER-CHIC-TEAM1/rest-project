const mongoose = require('mongoose');

const myLogPostSchema = new mongoose.Schema({
    emotion: { type: String, required: false },   // 감정
    music: { type: String, default: '없음' },     // 음악
    place: { type: String, default: '없음' },     // 장소
    content: { type: String, required: true },    // 로그 내용
    photos: { type: [String], default: [] },      // 사진 (배열)
    createdAt: { type: Date, default: Date.now }  // 작성일
});

module.exports = mongoose.model('MyLogPost', myLogPostSchema); 