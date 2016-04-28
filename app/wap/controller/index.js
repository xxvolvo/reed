'use strict';

exports.__esModule = true;

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

  _class.prototype.indexAction = function indexAction() {
    //auto render template file index_index.html
    var swiper_model = this.model("wechat_index_swiper");
    var swiper_data = swiper_model.where({ deleted: false }).order({ sort_num: "ASC" }).select();
    this.assign("swipers", swiper_data);

    var baokuan_model = this.model("wechat_index_baokuan");
    var baokuan_data = baokuan_model.where({ deleted: false }).order({ sort_num: "ASC" }).select();
    this.assign("baokuans", baokuan_data);

    var actvt_model = this.model("wechat_index_actvt");
    var actvt_data = actvt_model.where({ deleted: false }).order({ sort_num: "ASC" }).select();
    this.assign("actvts", actvt_data);

    var category_type_model = this.model("wechat_index_category_type");
    var category_type_data = category_type_model.where({ deleted: false }).order({ sort_num: "ASC" }).select();
    this.assign("cts", category_type_data);

    var category_model = this.model("wechat_index_category");
    var category_data = category_model.where({ deleted: false }).order({ sort_num: "ASC" }).select();
    this.assign("categorys", category_data);
    return this.display();
  };

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map