"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function upload(srcPath, destPath) {
  var qiniu = require("qiniu");
  var config = think.config('app').qiniu;

  //需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = config.ak;
  qiniu.conf.SECRET_KEY = config.sk;

  //要上传的空间
  var bucket = config.bucket;

  //上传到七牛后保存的文件名
  var key = destPath;

  //构建上传策略函数
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
  }

  //生成上传 Token
  var token = uptoken(bucket, key);

  //要上传文件的本地路径
  var filePath = srcPath;

  //构造上传函数
  // function uploadFile(uptoken, key, localFile) {
  //   var extra = new qiniu.io.PutExtra();
  //     qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
  //       if(!err) {
  //         // 上传成功， 处理返回值
  //         console.log(ret.hash, ret.key, ret.persistentId);
  //       } else {
  //         // 上传失败， 处理返回代码
  //         console.log(err);
  //       }
  //   });
  // }
  //
  // //调用uploadFile上传
  // uploadFile(token, key, filePath);
  return new _promise2.default(function (resolve, reject) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, filePath, extra, function (err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        resolve(ret);
      } else {
        // 上传失败， 处理返回代码
        reject(err);
      }
    });
  });
}

exports.upload = upload;
//# sourceMappingURL=qiniu-yun.js.map