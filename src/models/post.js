/* 
커뮤니티 -> 제목 작성자 장소명 장소사진 (좋아요 수)  title, author, images, 
포스트 -> 제목 작성자 장소명 장소사진 내용
*/

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
    },
    categories: { type: [String], default: [] }, // 카테고리 추가
    place: { type: String, default: null } // 장소 추가

});

const Post = mongoose.model('Post', postSchema);

// 내보내기
module.exports = Post;
