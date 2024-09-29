/* cf. 고유 id는 기본 필드로 제공되니 페이지별 동적처리한다고 필드추가할 필요 x
      ---> (24.09.29 정정) 그대로 가져다 쓰기엔 너무 길어서 UX 악화됨. 그냥 shortId 생성
      ---> 이는 사용자 친화적인 url을 제공하기 위해서임
*/

const mongoose = require('mongoose');
const shortid = require('shortid');

// 데이터베이스 스키마 및 모델 추가 (게시글)
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: { type: [String], default: [] },
    location: {
        type: {
            type: String, // Point 타입 지정
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
       //  name: { type: String, required: true } // 장소명 추가
    },
     // 카테고리 추가
    categories: { type: [String], default: [] },

    // 장소 추가
    place: { type: String, default: null }, 

// 짧은 ID 추가  ---> 사용자 친화적 url 생성 목적
shortId: { 
    type: String, 
    required: true, 
    unique: true, // 고유한 값으로 설정
    default: shortid.generate // 기본값으로 shortid.generate() 사용
}

});

const Post = mongoose.model('Post', postSchema);

// 내보내기
module.exports = Post;
