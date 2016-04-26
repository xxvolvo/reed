'use strict';
/**
 * middleware
 */

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$middleware$bas) {
  (0, _inherits3.default)(_class, _think$middleware$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$middleware$bas.apply(this, arguments));
  }

  /**
   * run
   * @return {Promise} []
   */

  _class.prototype.run = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var session, now_staff;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              think.session(this.http);
              session = this.http._session;
              _context.next = 4;
              return session.get("now_staff");

            case 4:
              now_staff = _context.sent;

              if (now_staff) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", think.statusAction(600, this.http));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function run() {
      return ref.apply(this, arguments);
    }

    return run;
  }();

  return _class;
}(think.middleware.base);

exports.default = _class;
//# sourceMappingURL=user_validate.js.map