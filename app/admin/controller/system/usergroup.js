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
              model = this.model("usergroup");
              _context.next = 10;
              return model.page(page_index, page_count).where(search).countSelect();

            case 10:
              raw_data = _context.sent;

              this.assign("usergroups", raw_data.data);
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
      var id, model, data, name, deleted, _id, updatedat, to_update, _model;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isGet()) {
                _context2.next = 10;
                break;
              }

              // let csrf=await this.session("__CSRF__");
              // this.assign("csrf",csrf);
              id = this.get("id");
              model = this.model("usergroup");
              _context2.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context2.sent;

              this.assign("usergroup", data);
              return _context2.abrupt('return', this.display());

            case 10:
              name = this.post("name"), deleted = !!this.post("deleted"), _id = this.post("id");
              updatedat = new Date();
              to_update = { name: name, deleted: deleted, updatedat: updatedat.toLocaleString() };

              //插入数据

              _model = this.model("usergroup");
              _context2.next = 16;
              return _model.where({ id: _id }).update(to_update);

            case 16:
              return _context2.abrupt('return', this.redirect("/system/usergroup/index"));

            case 17:
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
      var name, deleted, uuid, model, createdat, updatedat;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isGet()) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', this.display());

            case 2:
              name = this.post("name"), deleted = !!this.post("deleted");
              uuid = require('uuid');

              //插入数据

              model = this.model("usergroup");
              createdat = new Date();
              updatedat = new Date();
              _context3.next = 9;
              return model.add({
                name: name,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: updatedat.toLocaleString(),
                uuid: uuid.v4().toString()
              });

            case 9:
              return _context3.abrupt('return', this.redirect("/system/usergroup/index"));

            case 10:
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
              model = this.model("usergroup");
              _context4.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              return _context4.abrupt('return', this.redirect("/system_usergroup"));

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

  _class.prototype.menuAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var uuid, sql, model, data, selected_uuid, usergroup_uuid, _model2, to_add, _uuid, createdat, i;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.isGet()) {
                _context5.next = 10;
                break;
              }

              uuid = this.get("uuid");
              sql = 'select a.id,a.uuid,a."name",a.deleted,b.id as usergroup_menu_id,b.uuid as usergroup_menu_uuid from menu a\n\t\t\tleft join (select * from usergroup_menu where usergroup_uuid=\'' + uuid + '\') b on a.uuid=b.menu_uuid';
              model = this.model("menu");
              data = model.query(sql);

              this.assign("menus", data);
              this.assign("uuid", uuid);
              return _context5.abrupt('return', this.display());

            case 10:
              selected_uuid = this.post("selected_uuid");


              if (typeof selected_uuid === 'string' && selected_uuid.length > 0) {
                selected_uuid = [selected_uuid];
              }
              usergroup_uuid = this.post("uuid");
              _model2 = this.model("usergroup_menu");
              _context5.next = 16;
              return _model2.where({ usergroup_uuid: usergroup_uuid }).delete();

            case 16:
              to_add = [];
              _uuid = require('uuid');
              createdat = new Date();


              for (i = 0; i < selected_uuid.length; i++) {
                to_add.push({
                  uuid: _uuid.v4().toString(),
                  usergroup_uuid: usergroup_uuid,
                  menu_uuid: selected_uuid[i],
                  deleted: false,
                  createdat: createdat.toLocaleString(),
                  updatedat: createdat.toLocaleString()
                });
              }

              if (!(to_add.length > 0)) {
                _context5.next = 23;
                break;
              }

              _context5.next = 23;
              return _model2.addMany(to_add);

            case 23:
              return _context5.abrupt('return', this.redirect('/system/usergroup/index'));

            case 24:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function menuAction() {
      return ref.apply(this, arguments);
    }

    return menuAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=usergroup.js.map