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
      var now_user, user_uuid, model_user, data_user, model_usergroup_menu, data_usergroup_menu, model_menu, menu_uuids, key, data_menu, parent_before_str, parent_after_str, alone_str, tohtml, final_html, i;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.session("now_user");

            case 2:
              now_user = _context.sent;

              if (!think.isEmpty(now_user)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', this.redirect("/index/login"));

            case 5:
              //auto render template file index_index.html
              user_uuid = now_user.uuid;
              //查找员工

              model_user = this.model("staff");
              _context.next = 9;
              return model_user.where({ uuid: user_uuid }).find();

            case 9:
              data_user = _context.sent;

              //查找用户组中记录的菜单
              model_usergroup_menu = this.model("usergroup_menu");
              _context.next = 13;
              return model_usergroup_menu.where({ usergroup_uuid: data_user.usergroup_uuid }).select();

            case 13:
              data_usergroup_menu = _context.sent;

              //查找菜单
              model_menu = this.model("menu");
              menu_uuids = [];

              for (key in data_usergroup_menu) {
                menu_uuids.push(data_usergroup_menu[key].menu_uuid);
              }
              _context.next = 19;
              return model_menu.where({ uuid: ["in", menu_uuids] }).order("sort_num").select();

            case 19:
              data_menu = _context.sent;
              parent_before_str = '<li class="treeview">\n      <a href="#"><i class="fa fa-{{icon}}"></i><span>{{name}}</span> <i class="fa fa-angle-left pull-right"></i></a>\n      <ul class="treeview-menu">';
              parent_after_str = '</ul>\n  </li>';
              alone_str = '<li><a href="javascript:$.Reed.router.link(\'{{href}}\',\'{{controller}}\',\'{{name}}\')" ><i class="fa fa-{{icon}}"></i><span>{{name}}</span></a></li>';

              tohtml = function tohtml(one, list) {
                var html = '';
                //判断有无子元素
                var has_child = false;
                for (var j = 0; j < list.length; j++) {
                  if (list[j].puuid == one.uuid) {
                    has_child = true;
                    break;
                  }
                }
                if (has_child) {
                  html += parent_before_str.replace("{{icon}}", one.icon).replace("{{name}}", one.name);
                  for (var i = 0; i < list.length; i++) {
                    if (list[i].puuid == one.uuid) {
                      html += tohtml(list[i], list);
                    }
                  }
                  html += parent_after_str;
                } else {
                  html += alone_str.replace("{{href}}", one.href).replace("{{controller}}", one.controller).replace("{{name}}", one.name).replace("{{name}}", one.name).replace("{{icon}}", one.icon);
                }
                return html;
              };

              final_html = '';

              for (i = 0; i < data_menu.length; i++) {
                if (data_menu[i].puuid == null) {
                  final_html += tohtml(data_menu[i], data_menu);
                }
              }
              this.assign('menu', final_html);
              this.assign("user", now_user);
              return _context.abrupt('return', this.display());

            case 29:
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

  _class.prototype.loginAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var name, password, csrf, value, model, crypto, md5sum, pwd, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isPost()) {
                _context2.next = 26;
                break;
              }

              name = this.post("name").trim(), password = this.post("pwd").trim();
              csrf = this.config('icsrf');
              _context2.next = 5;
              return this.session(csrf.session_name);

            case 5:
              value = _context2.sent;

              this.assign("csrf", value);

              if (!(!name || name.length == 0 || !password || password.length == 0)) {
                _context2.next = 10;
                break;
              }

              this.assign("message", '请输入用户名和密码');
              return _context2.abrupt('return', this.display());

            case 10:
              model = this.model("staff");
              crypto = require('crypto');
              md5sum = crypto.createHash('md5');

              md5sum.update(password);
              pwd = md5sum.digest('hex');
              _context2.next = 17;
              return model.where({ name: name, pwd_hash: pwd }).find();

            case 17:
              data = _context2.sent;

              console.log(data);

              if (!(!data || think.isEmpty(data))) {
                _context2.next = 22;
                break;
              }

              this.assign("message", '用户名密码不正确');
              return _context2.abrupt('return', this.display());

            case 22:
              this.session("now_user", data);
              return _context2.abrupt('return', this.redirect("/"));

            case 26:
              this.assign("message", '');
              return _context2.abrupt('return', this.display());

            case 28:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function loginAction() {
      return ref.apply(this, arguments);
    }

    return loginAction;
  }();

  _class.prototype.logoutAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.session();
              return _context3.abrupt('return', this.redirect("/index/login"));

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function logoutAction() {
      return ref.apply(this, arguments);
    }

    return logoutAction;
  }();

  _class.prototype.testAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var model, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              model = this.model("menu");
              _context4.next = 3;
              return model.select();

            case 3:
              data = _context4.sent;


              this.success(data);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function testAction() {
      return ref.apply(this, arguments);
    }

    return testAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map