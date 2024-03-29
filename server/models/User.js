const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
dayjs.locale("ko");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  marketing: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: { type: Array, default: [] },
  history: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: dayjs().add(9, "hour").format(),
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//before save to mongoDb
userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    // prevent multiple bcrypt (ex. change email also change password)
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  let user = this;

  // compare plainPassword with bcryptPassword
  bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = async function (cb) {
  let user = this;

  // generate web token with jwt
  let token = jwt.sign({ userId: user._id.toHexString() }, "secret", {
    expiresIn: "2h",
  });

  let twoHour = dayjs().add(2, "hour").valueOf();

  user.token = token;

  user.tokenExp = twoHour;

  try {
    await user.save().then((user) => cb(null, user));
  } catch (error) {
    return cb(err);
  }
};

userSchema.statics.findByToken = function (token, cb) {
  // methods에서는 this가 호출한 주체를 가리킨다.
  // 예를들어, abc.findByToken 이렇게 호출했다면 this = abc가 된다

  // statics는 this가 모델 그 자체를 가리킨다.
  // 즉, statics에서 this는 mongoose 모델을 가리킨다
  // findByToken에서 statics으로 해야 하는 이유는
  // findOne은 mongoose 모델에서 작동하는 함수이기 때문이다.

  let user = this;

  jwt.verify(token, "secret", async function (err, decoded) {
    if (!decoded) {
      // 만료시간이 다되어 폐기된 쿠키일경우
      return cb(err);

      // logout 실행
      // navbar 로그인상태 초기화 등..
    } else {
      try {
        await user
          .findOne({ _id: decoded.userId, token: token })
          .then((user) => {
            return cb(null, user);
          });
      } catch (error) {
        return cb(err);
      }
    }
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
