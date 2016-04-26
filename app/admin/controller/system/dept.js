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
              model = this.model("v_department");
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
      var id, model, data, p_depts, name, deleted, _id, puuid, updatedat, to_update, _model;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isGet()) {
                _context2.next = 14;
                break;
              }

              id = this.get("id");
              model = this.model("department");
              _context2.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context2.sent;
              _context2.next = 8;
              return model.order("name").select();

            case 8:
              p_depts = _context2.sent;

              this.assign("dept", data);
              this.assign("p_depts", p_depts);
              return _context2.abrupt('return', this.display());

            case 14:
              name = this.post("name"), deleted = !!this.post("deleted"), _id = this.post("id"), puuid = this.post("puuid");
              updatedat = new Date();
              to_update = { name: name, deleted: deleted, updatedat: updatedat.toLocaleString(), puuid: puuid && puuid.length > 0 ? puuid : null };

              //插入数据

              _model = this.model("department");
              _context2.next = 20;
              return _model.where({ id: _id }).update(to_update);

            case 20:
              return _context2.abrupt('return', this.redirect("/system/dept/index"));

            case 21:
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
      var _model2, data, name, deleted, puuid, uuid, model, createdat, updatedat;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isGet()) {
                _context3.next = 5;
                break;
              }

              _model2 = this.model('department');
              data = _model2.order("name").select();

              this.assign("p_depts", data);
              return _context3.abrupt('return', this.display());

            case 5:
              name = this.post("name"), deleted = !!this.post("deleted"), puuid = this.post("puuid");
              uuid = require('uuid');

              //插入数据

              model = this.model("department");
              createdat = new Date();
              updatedat = new Date();
              _context3.next = 12;
              return model.add({
                name: name,
                puuid: puuid && puuid.length > 0 ? puuid : null,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: updatedat.toLocaleString(),
                uuid: uuid.v4().toString()
              });

            case 12:
              return _context3.abrupt('return', this.redirect("/system/dept/index"));

            case 13:
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
              model = this.model("department");
              _context4.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              return _context4.abrupt('return', this.redirect("/system/dept/index"));

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

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=dept.js.map