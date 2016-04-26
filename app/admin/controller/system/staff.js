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
              model = this.model("v_staff");
              _context.next = 10;
              return model.page(page_index, page_count).where(search).countSelect();

            case 10:
              raw_data = _context.sent;


              this.assign("staffs", raw_data.data);
              this.assign("currentPage", raw_data.currentPage);
              this.assign("itemsCount", raw_data.count);
              this.assign("totalPages", raw_data.totalPages);
              this.assign("startPage", (page_index - 1) * page_count + 1);
              this.assign("endPage", Math.min(page_index * page_count, raw_data.count));
              return _context.abrupt('return', this.display());

            case 18:
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
  * 更新
  * @return {Promise} []
  */


  _class.prototype.updateAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var id, model, data, model_dept, data_dept, model_ug, data_ug, category_model, category_data, name, deleted, _id, password, dept_uuid, usergroup_uuid, avatar, updatedat, to_update, crypto, md5sum, pwd, _model;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isGet()) {
                _context2.next = 21;
                break;
              }

              // let csrf=await this.session("__CSRF__");
              // this.assign("csrf",csrf);
              id = this.get("id");
              model = this.model("staff");
              _context2.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context2.sent;
              model_dept = this.model("department");
              data_dept = model_dept.order("name").select();
              model_ug = this.model('usergroup');
              data_ug = model_ug.order("name").select();
              category_model = this.model("pictures");
              _context2.next = 13;
              return category_model.query('select distinct category,category_code from pictures');

            case 13:
              category_data = _context2.sent;


              this.assign("depts", data_dept);
              this.assign("usergroups", data_ug);
              this.assign("staff", data);
              this.assign("categorys", category_data);
              return _context2.abrupt('return', this.display());

            case 21:
              name = this.post("name"), deleted = !!this.post("deleted"), _id = this.post("id"), password = this.post("password"), dept_uuid = this.post("dept_uuid"), usergroup_uuid = this.post("usergroup_uuid"), avatar = this.post("avatar");
              updatedat = new Date();
              to_update = { name: name, deleted: deleted, updatedat: updatedat.toLocaleString(), dept_uuid: dept_uuid, usergroup_uuid: usergroup_uuid };


              if (avatar && avatar.length > 0) {
                to_update.avatar = avatar;
              }

              if (password && password.length > 0) {
                crypto = require('crypto');
                md5sum = crypto.createHash('md5');

                md5sum.update(password);
                pwd = md5sum.digest('hex');

                to_update.pwd_hash = pwd;
              }
              //插入数据
              _model = this.model("staff");
              _context2.next = 29;
              return _model.where({ id: _id }).update(to_update);

            case 29:
              return _context2.abrupt('return', this.redirect("/system/staff/index"));

            case 30:
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
      var _model2, data, model_ug, data_ug, category_model, category_data, name, deleted, password, dept_uuid, usergroup_uuid, avatar, crypto, md5sum, pwd, uuid, model, createdat, updatedat, return_id;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isGet()) {
                _context3.next = 13;
                break;
              }

              _model2 = this.model("department");
              data = _model2.order("name").select();
              model_ug = this.model('usergroup');
              data_ug = model_ug.order("name").select();
              category_model = this.model("pictures");
              _context3.next = 8;
              return category_model.query('select distinct category,category_code from pictures');

            case 8:
              category_data = _context3.sent;


              this.assign("depts", data);
              this.assign("usergroups", data_ug);
              this.assign("categorys", category_data);
              return _context3.abrupt('return', this.display());

            case 13:
              name = this.post("name"), deleted = !!this.post("deleted"), password = this.post("password"), dept_uuid = this.post("dept_uuid"), usergroup_uuid = this.post("usergroup_uuid"), avatar = this.post("avatar");
              crypto = require('crypto');
              md5sum = crypto.createHash('md5');

              md5sum.update(password);
              pwd = md5sum.digest('hex');
              uuid = require('uuid');

              //插入数据

              model = this.model("staff");
              createdat = new Date();
              updatedat = new Date();
              _context3.next = 24;
              return model.add({
                name: name,
                pwd_hash: pwd,
                dept_uuid: dept_uuid,
                avatar: avatar,
                usergroup_uuid: usergroup_uuid,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: updatedat.toLocaleString(),
                uuid: uuid.v4().toString()
              });

            case 24:
              return_id = _context3.sent;
              return _context3.abrupt('return', this.redirect("/system/staff/index"));

            case 26:
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

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */


  _class.prototype.deleteAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var id, model;
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
              model = this.model("staff");
              _context4.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              return _context4.abrupt('return', this.redirect("/system/staff/index"));

            case 8:
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

  _class.prototype.photobycodeAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var code, model, data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              code = this.get("code");
              model = this.model("pictures");
              _context5.next = 4;
              return model.where({ category_code: code }).select();

            case 4:
              data = _context5.sent;


              this.assign("photos", data);
              return _context5.abrupt('return', this.display());

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function photobycodeAction() {
      return ref.apply(this, arguments);
    }

    return photobycodeAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=staff.js.map