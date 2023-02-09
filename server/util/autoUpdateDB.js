const { User } = require("../models/User");

module.exports.autoUpdateDB = () => {
  User.findOne({ name: "이진복" }, {}, (err, result) => {
    if (err) {
      return err;
    } else {
      return result;
    }
  });
};
