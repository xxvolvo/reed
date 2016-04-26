'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
  * index action
  * @return {Promise} []
  */

  _class.prototype.indexAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var page_index, name, search, page_count, model, raw_data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //auto render template file index_index.html
              page_index = this.get("page");
              name = this.get("name");
              search = {};

              if (name && name.length > 0) {
                search.name = ['like', '%' + name + '%'];
              }
              this.assign("name", name);
              if (!page_index) page_index = 1;
              page_count = 10;

              console.log(page_count);
              console.log(this.config.nums_per_page);
              model = this.model("brand");
              _context.next = 12;
              return model.page(page_index, page_count).where(search).countSelect();

            case 12:
              raw_data = _context.sent;

              this.assign("brands", raw_data.data);
              this.assign("currentPage", raw_data.currentPage);
              this.assign("itemsCount", raw_data.count);
              this.assign("totalPages", raw_data.totalPages);
              this.assign("startPage", (page_index - 1) * page_count + 1);
              this.assign("endPage", Math.min(page_index * page_count, raw_data.count));
              return _context.abrupt('return', this.display());

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return ref.apply(this, arguments);
    }

    return indexAction;
  }();

  _class.prototype.selectAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var model, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              model = this.model("brand");
              _context2.next = 3;
              return model.select();

            case 3:
              data = _context2.sent;
              return _context2.abrupt('return', this.success(data));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function selectAction() {
      return ref.apply(this, arguments);
    }

    return selectAction;
  }();

  _class.prototype.updateAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var id, model, data, name, desc, deleted, _id, updatedat, to_update, file, fs, util, imgname, path, full_img_name, pic_url, is, os, http;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isGet()) {
                _context3.next = 10;
                break;
              }

              // let csrf=await this.session("__CSRF__");
              // this.assign("csrf",csrf);
              id = this.get("id");
              model = this.model("brand");
              _context3.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context3.sent;

              this.assign("brand", data);
              return _context3.abrupt('return', this.display());

            case 10:
              name = this.post("name"), desc = this.post("desc"), deleted = !!this.post("deleted"), _id = this.post("id");
              updatedat = new Date();
              to_update = { name: name, description: desc, deleted: deleted, updatedat: updatedat.toLocaleString() };
              file = this.file("pic_url");

              if (!file.size) {
                _context3.next = 27;
                break;
              }

              //处理图片
              fs = require('fs');
              util = require('util');
              imgname = Date.parse(new Date()) + ".jpg";
              path = require('path');
              full_img_name = path.join(__dirname, '../../../www/static/user_images/brand', imgname);
              pic_url = "/static/user_images/brand/" + imgname;
              is = fs.createReadStream(file.path);
              os = fs.createWriteStream(full_img_name);
              _context3.next = 25;
              return util.pump(is, os);

            case 25:
              fs.unlinkSync(file.path);
              to_update.pic_url = pic_url;

            case 27:

              //插入数据
              model = this.model("brand");
              _context3.next = 30;
              return model.where({ id: _id }).update(to_update);

            case 30:
              http = this.http;
              return _context3.abrupt('return', http.redirect("/cmdt_brand"));

            case 32:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function updateAction() {
      return ref.apply(this, arguments);
    }

    return updateAction;
  }();

  _class.prototype.insertAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var name, desc, deleted, uuid, file, path, extname, qiniu, imgname, pic_url, upload_result, config, model, createdat, updatedat;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.isGet()) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', this.display());

            case 2:
              name = this.post("name"), desc = this.post("desc"), deleted = !!this.post("deleted");

              //上传图片

              uuid = require('uuid');
              file = this.file("pic_url");
              path = require('path');
              extname = path.extname(file.originalFilename);
              qiniu = require('../../common/util/qiniu-yun.js');
              imgname = uuid.v4().toString() + extname;
              pic_url = 'static/user_images/brand/' + imgname;
              _context4.next = 12;
              return qiniu.upload(file.path, pic_url);

            case 12:
              upload_result = _context4.sent;
              config = think.config('app').qiniu;

              pic_url = config.domain + "/" + pic_url;
              //插入数据
              model = this.model("brand");
              createdat = new Date();
              updatedat = new Date();
              _context4.next = 20;
              return model.add({ name: name, description: desc, deleted: deleted, createdat: createdat.toLocaleString(), updatedat: updatedat.toLocaleString(), pic_url: pic_url, uuid: uuid.v4().toString() });

            case 20:
              return _context4.abrupt('return', this.redirect("/cmdt_brand"));

            case 21:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function insertAction() {
      return ref.apply(this, arguments);
    }

    return insertAction;
  }();

  _class.prototype.deleteAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var id, model, http;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.isGet()) {
                _context5.next = 3;
                break;
              }

              this.assign("id", this.get("id"));
              return _context5.abrupt('return', this.display());

            case 3:
              id = this.post("id");
              model = this.model("brand");
              _context5.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              http = this.http;
              return _context5.abrupt('return', http.redirect("/cmdt_brand"));

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function deleteAction() {
      return ref.apply(this, arguments);
    }

    return deleteAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=cmdt_brand.js.map