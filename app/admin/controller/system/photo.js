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

var _base = require('../base.js');

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
      var page_index, name, category_code, search, page_count, model, raw_data, category_model, category_data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              page_index = this.get("page");
              name = this.get("name");
              category_code = this.get("category_code");
              search = {};

              if (name && name.length > 0) {
                search.name = ['like', '%' + name + '%'];
              }
              if (category_code && category_code.length > 0) {
                search.category_code = category_code;
              }
              this.assign("name", name);
              this.assign("category_code", category_code);
              if (!page_index) page_index = 1;
              page_count = 10;
              model = this.model("pictures");
              _context.next = 13;
              return model.page(page_index, page_count).where(search).countSelect();

            case 13:
              raw_data = _context.sent;
              category_model = this.model("pictures");
              _context.next = 17;
              return category_model.query('select distinct category,category_code from pictures');

            case 17:
              category_data = _context.sent;


              this.assign("photos", raw_data.data);
              this.assign("categorys", category_data);
              this.assign("currentPage", raw_data.currentPage);
              this.assign("itemsCount", raw_data.count);
              this.assign("totalPages", raw_data.totalPages);
              this.assign("startPage", (page_index - 1) * page_count + 1);
              this.assign("endPage", Math.min(page_index * page_count, raw_data.count));
              return _context.abrupt('return', this.display());

            case 26:
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

  /**
  * update action
  * 插入
  * @return {Promise} []
  */


  _class.prototype.updateAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _id, category_model, category_data, _model, data, id, description, category_code, new_category, new_category_code, deleted, sort, real_category, real_category_code, split, uuid, createdat, to_update, file, path, extname, qiniu, imgname, pic_url, upload_result, model;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isGet()) {
                _context2.next = 13;
                break;
              }

              _id = this.get("id");
              //查询图片分类

              category_model = this.model("pictures");
              _context2.next = 5;
              return category_model.query('select distinct category,category_code from pictures');

            case 5:
              category_data = _context2.sent;

              //查询图片信息
              _model = this.model("pictures");
              _context2.next = 9;
              return _model.where({ id: _id }).find();

            case 9:
              data = _context2.sent;

              this.assign("photo", data);
              this.assign("categorys", category_data);
              return _context2.abrupt('return', this.display());

            case 13:
              id = this.post("id"), description = this.post("description"), category_code = this.post("category_code"), new_category = this.post("new_category"), new_category_code = this.post("new_category_code"), deleted = !!this.post("deleted"), sort = this.post("sort");
              real_category = '', real_category_code = '';

              if (new_category && new_category.length > 0) {
                real_category = new_category.trim();
                real_category_code = new_category_code.trim();
              } else {
                split = category_code.split("#@!");

                real_category = split[1];
                real_category_code = split[0];
              }
              //上传图片
              uuid = require('uuid');
              createdat = new Date();
              to_update = {
                uuid: uuid.v4().toString(),
                description: description,
                category: real_category,
                category_code: real_category_code,
                sort: sort,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: createdat.toLocaleString()
              };
              file = this.file("file");

              if (!file.size) {
                _context2.next = 33;
                break;
              }

              path = require('path');
              extname = path.extname(file.originalFilename);
              qiniu = require('../../../common/util/qiniu-yun.js');
              imgname = uuid.v4().toString().replace(/-/g, '').substr(0, 16) + extname;
              pic_url = 'static/uimages/' + real_category_code + '/' + imgname;
              _context2.next = 28;
              return qiniu.upload(file.path, pic_url);

            case 28:
              upload_result = _context2.sent;

              pic_url = "/" + pic_url;

              to_update.name = imgname;
              to_update.url = pic_url;
              to_update.path = '/static/uimages/' + real_category_code + '/';

            case 33:
              //插入数据
              model = this.model("pictures");
              _context2.next = 36;
              return model.where({ id: id }).update(to_update);

            case 36:
              return _context2.abrupt('return', this.redirect("/system/photo/index"));

            case 37:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function updateAction() {
      return ref.apply(this, arguments);
    }

    return updateAction;
  }();

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */


  _class.prototype.insertAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var category_model, category_data, description, category_code, new_category, new_category_code, deleted, sort, real_category, real_category_code, split, uuid, file, path, extname, qiniu, imgname, pic_url, upload_result, model, createdat, to_insert;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isGet()) {
                _context3.next = 7;
                break;
              }

              //查询图片分类
              category_model = this.model("pictures");
              _context3.next = 4;
              return category_model.query('select distinct category,category_code from pictures');

            case 4:
              category_data = _context3.sent;


              this.assign("categorys", category_data);
              return _context3.abrupt('return', this.display());

            case 7:
              description = this.post("description"), category_code = this.post("category_code"), new_category = this.post("new_category"), new_category_code = this.post("new_category_code"), deleted = !!this.post("deleted"), sort = this.post("sort");
              real_category = '', real_category_code = '';

              if (new_category && new_category.length > 0) {
                real_category = new_category.trim();
                real_category_code = new_category_code.trim();
              } else {
                split = category_code.split("#@!");

                real_category = split[1];
                real_category_code = split[0];
              }
              //上传图片
              uuid = require('uuid');
              file = this.file("file");
              path = require('path');
              extname = path.extname(file.originalFilename);
              qiniu = require('../../../common/util/qiniu-yun.js');
              imgname = uuid.v4().toString().replace(/-/g, '').substr(0, 16) + extname;
              pic_url = 'static/uimages/' + real_category_code + '/' + imgname;
              _context3.next = 19;
              return qiniu.upload(file.path, pic_url);

            case 19:
              upload_result = _context3.sent;

              pic_url = "/" + pic_url;
              //插入数据
              model = this.model("pictures");
              createdat = new Date();
              to_insert = {
                uuid: uuid.v4().toString(),
                description: description,
                category: real_category,
                category_code: real_category_code,
                name: imgname,
                url: pic_url,
                path: '/static/uimages/' + real_category_code + '/',
                sort: sort,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: createdat.toLocaleString()
              };
              _context3.next = 26;
              return model.add(to_insert);

            case 26:
              return _context3.abrupt('return', this.redirect("/system/photo/index"));

            case 27:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function insertAction() {
      return ref.apply(this, arguments);
    }

    return insertAction;
  }();

  _class.prototype.deleteAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var id, model, http;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.isGet()) {
                _context4.next = 3;
                break;
              }

              this.assign("id", this.get("id"));
              return _context4.abrupt('return', this.display());

            case 3:
              id = this.post("id");
              model = this.model("pictures");
              _context4.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              http = this.http;
              return _context4.abrupt('return', http.redirect("/system/photo/index"));

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteAction() {
      return ref.apply(this, arguments);
    }

    return deleteAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=photo.js.map