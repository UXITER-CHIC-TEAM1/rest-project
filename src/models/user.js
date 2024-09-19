const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 사용자 스키마 정의
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

// 사용자 모델 생성
const User = mongoose.model('User', userSchema);

// 내보내기
module.exports = User;
