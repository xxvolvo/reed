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

var _base = require('../../base.js');

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
      var page_count, swiper_page_index, swiper_model, swiper_raw_data, baokuan_page_index, baokuan_model, baokuan_raw_data, actvt_page_index, actvt_model, actvt_raw_data, ct_page_index, ct_model, ct_raw_data, category_page_index, category_model, category_raw_data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //auto render template file index_index.html
              page_count = 10;
              /****start swiper******/

              swiper_page_index = this.get("swiper_page") || 1;
              swiper_model = this.model("wechat_index_swiper");
              _context.next = 5;
              return swiper_model.page(swiper_page_index, page_count).countSelect();

            case 5:
              swiper_raw_data = _context.sent;


              this.assign("swipers", swiper_raw_data.data);
              this.assign("swipers_currentPage", swiper_raw_data.currentPage);
              this.assign("swipers_itemsCount", swiper_raw_data.count);
              this.assign("swipers_totalPages", swiper_raw_data.totalPages);
              this.assign("swipers_startPage", (swiper_page_index - 1) * page_count + 1);
              this.assign("swipers_endPage", Math.min(swiper_page_index * page_count, swiper_raw_data.count));
              /****end swiper******/

              /****start baokuan******/
              baokuan_page_index = this.get("baokuan_page") || 1;
              baokuan_model = this.model("wechat_index_baokuan");
              _context.next = 16;
              return baokuan_model.page(baokuan_page_index, page_count).countSelect();

            case 16:
              baokuan_raw_data = _context.sent;


              this.assign("baokuans", baokuan_raw_data.data);
              this.assign("baokuans_currentPage", baokuan_raw_data.currentPage);
              this.assign("baokuans_itemsCount", baokuan_raw_data.count);
              this.assign("baokuans_totalPages", baokuan_raw_data.totalPages);
              this.assign("baokuans_startPage", (baokuan_page_index - 1) * page_count + 1);
              this.assign("baokuans_endPage", Math.min(baokuan_page_index * page_count, baokuan_raw_data.count));
              /****end baokuan******/

              /****start actvt******/
              actvt_page_index = this.get("actvt_page") || 1;
              actvt_model = this.model("wechat_index_actvt");
              _context.next = 27;
              return actvt_model.page(actvt_page_index, page_count).countSelect();

            case 27:
              actvt_raw_data = _context.sent;


              this.assign("actvts", actvt_raw_data.data);
              this.assign("actvts_currentPage", actvt_raw_data.currentPage);
              this.assign("actvts_itemsCount", actvt_raw_data.count);
              this.assign("actvts_totalPages", actvt_raw_data.totalPages);
              this.assign("actvts_startPage", (actvt_page_index - 1) * page_count + 1);
              this.assign("actvts_endPage", Math.min(actvt_page_index * page_count, actvt_raw_data.count));
              /****end actvt******/

              /****start category type******/
              ct_page_index = this.get("ct_page") || 1;
              ct_model = this.model("wechat_index_category_type");
              _context.next = 38;
              return ct_model.page(ct_page_index, page_count).countSelect();

            case 38:
              ct_raw_data = _context.sent;


              this.assign("cts", ct_raw_data.data);
              this.assign("cts_currentPage", ct_raw_data.currentPage);
              this.assign("cts_itemsCount", ct_raw_data.count);
              this.assign("cts_totalPages", ct_raw_data.totalPages);
              this.assign("cts_startPage", (ct_page_index - 1) * page_count + 1);
              this.assign("cts_endPage", Math.min(ct_page_index * page_count, ct_raw_data.count));
              /****end category type******/

              /****start category******/
              category_page_index = this.get("category_page") || 1;
              category_model = this.model("wechat_index_category");
              _context.next = 49;
              return category_model.page(category_page_index, page_count).countSelect();

            case 49:
              category_raw_data = _context.sent;


              this.assign("categorys", category_raw_data.data);
              this.assign("categorys_currentPage", category_raw_data.currentPage);
              this.assign("categorys_itemsCount", category_raw_data.count);
              this.assign("categorys_totalPages", category_raw_data.totalPages);
              this.assign("categorys_startPage", (category_page_index - 1) * page_count + 1);
              this.assign("categorys_endPage", Math.min(category_page_index * page_count, category_raw_data.count));
              /****end category ******/
              return _context.abrupt('return', this.display());

            case 57:
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
      var id, model, data, model_pictures, data_photo, _id, description, deleted, url, sort_num, pic_url, updatedat, to_update, _model;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isGet()) {
                _context2.next = 15;
                break;
              }

              // let csrf=await this.session("__CSRF__");
              // this.assign("csrf",csrf);
              id = this.get("id");
              model = this.model("wechat_index_swiper");
              _context2.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context2.sent;
              model_pictures = this.model("pictures");
              _context2.next = 9;
              return model_pictures.where({ category_code: 'wechat_index_swiper' }).select();

            case 9:
              data_photo = _context2.sent;


              this.assign("swiper", data);
              this.assign("photos", data_photo);
              return _context2.abrupt('return', this.display());

            case 15:
              _id = this.post("id"), description = this.post("description"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), pic_url = this.post("pic_url");
              updatedat = new Date();
              to_update = { description: description, deleted: deleted, updatedat: updatedat.toLocaleString(), url: url, sort_num: sort_num };


              if (pic_url && pic_url.length > 0) {
                to_update.pic_url = pic_url;
              }

              //更新数据
              _model = this.model("wechat_index_swiper");
              _context2.next = 22;
              return _model.where({ id: _id }).update(to_update);

            case 22:
              return _context2.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 23:
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
      var _model2, data, description, deleted, url, sort_num, pic_url, model, createdat, uuid, return_id;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isGet()) {
                _context3.next = 7;
                break;
              }

              _model2 = this.model("pictures");
              _context3.next = 4;
              return _model2.where({ category_code: 'wechat_index_swiper' }).select();

            case 4:
              data = _context3.sent;


              this.assign("photos", data);
              return _context3.abrupt('return', this.display());

            case 7:
              description = this.post("description"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), pic_url = this.post("pic_url");

              //插入数据

              model = this.model("wechat_index_swiper");
              createdat = new Date();
              uuid = require('uuid');
              _context3.next = 13;
              return model.add({
                description: description,
                pic_url: pic_url,
                url: url,
                sort_num: sort_num,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: createdat.toLocaleString(),
                uuid: uuid.v4().toString()
              });

            case 13:
              return_id = _context3.sent;
              return _context3.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 15:
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
              model = this.model("wechat_index_swiper");
              _context4.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              return _context4.abrupt('return', this.redirect("/page/wechat/index/index"));

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

  /**
  * update action
  * 更新
  * @return {Promise} []
  */


  _class.prototype.baokuanuAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var id, model, data, model_pictures, data_photo, _id2, description, deleted, url, sort_num, pic_url, updatedat, to_update, _model3;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.isGet()) {
                _context5.next = 15;
                break;
              }

              // let csrf=await this.session("__CSRF__");
              // this.assign("csrf",csrf);
              id = this.get("id");
              model = this.model("wechat_index_baokuan");
              _context5.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context5.sent;
              model_pictures = this.model("pictures");
              _context5.next = 9;
              return model_pictures.where({ category_code: 'wechat_index_baokuan' }).select();

            case 9:
              data_photo = _context5.sent;


              this.assign("baokuan", data);
              this.assign("photos", data_photo);
              return _context5.abrupt('return', this.display());

            case 15:
              _id2 = this.post("id"), description = this.post("description"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), pic_url = this.post("pic_url");
              updatedat = new Date();
              to_update = { description: description, deleted: deleted, updatedat: updatedat.toLocaleString(), url: url, sort_num: sort_num };


              if (pic_url && pic_url.length > 0) {
                to_update.pic_url = pic_url;
              }

              //更新数据
              _model3 = this.model("wechat_index_baokuan");
              _context5.next = 22;
              return _model3.where({ id: _id2 }).update(to_update);

            case 22:
              return _context5.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 23:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function baokuanuAction() {
      return ref.apply(this, arguments);
    }

    return baokuanuAction;
  }();

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */


  _class.prototype.baokuaniAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var _model4, data, description, deleted, url, sort_num, pic_url, model, createdat, uuid, return_id;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.isGet()) {
                _context6.next = 7;
                break;
              }

              _model4 = this.model("pictures");
              _context6.next = 4;
              return _model4.where({ category_code: 'wechat_index_baokuan' }).select();

            case 4:
              data = _context6.sent;


              this.assign("photos", data);
              return _context6.abrupt('return', this.display());

            case 7:
              description = this.post("description"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), pic_url = this.post("pic_url");

              //插入数据

              model = this.model("wechat_index_baokuan");
              createdat = new Date();
              uuid = require('uuid');
              _context6.next = 13;
              return model.add({
                description: description,
                pic_url: pic_url,
                url: url,
                sort_num: sort_num,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: createdat.toLocaleString(),
                uuid: uuid.v4().toString()
              });

            case 13:
              return_id = _context6.sent;
              return _context6.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 15:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function baokuaniAction() {
      return ref.apply(this, arguments);
    }

    return baokuaniAction;
  }();

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */


  _class.prototype.baokuandAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var id, model;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!this.isGet()) {
                _context7.next = 3;
                break;
              }

              this.assign("id", this.get("id"));
              return _context7.abrupt('return', this.display());

            case 3:
              id = this.post("id");
              model = this.model("wechat_index_baokuan");
              _context7.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              return _context7.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 8:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function baokuandAction() {
      return ref.apply(this, arguments);
    }

    return baokuandAction;
  }();

  /**
  * update action
  * 更新
  * @return {Promise} []
  */


  _class.prototype.actvtuAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      var id, model, data, model_pictures, data_photo, _id3, description, deleted, url, sort_num, pic_url, updatedat, to_update, _model5;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!this.isGet()) {
                _context8.next = 15;
                break;
              }

              // let csrf=await this.session("__CSRF__");
              // this.assign("csrf",csrf);
              id = this.get("id");
              model = this.model("wechat_index_actvt");
              _context8.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context8.sent;
              model_pictures = this.model("pictures");
              _context8.next = 9;
              return model_pictures.where({ category_code: 'wechat_index_actvt' }).select();

            case 9:
              data_photo = _context8.sent;


              this.assign("actvt", data);
              this.assign("photos", data_photo);
              return _context8.abrupt('return', this.display());

            case 15:
              _id3 = this.post("id"), description = this.post("description"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), pic_url = this.post("pic_url");
              updatedat = new Date();
              to_update = { description: description, deleted: deleted, updatedat: updatedat.toLocaleString(), url: url, sort_num: sort_num };


              if (pic_url && pic_url.length > 0) {
                to_update.pic_url = pic_url;
              }

              //更新数据
              _model5 = this.model("wechat_index_actvt");
              _context8.next = 22;
              return _model5.where({ id: _id3 }).update(to_update);

            case 22:
              return _context8.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 23:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function actvtuAction() {
      return ref.apply(this, arguments);
    }

    return actvtuAction;
  }();

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */


  _class.prototype.actvtiAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
      var _model6, data, description, deleted, url, sort_num, pic_url, model, createdat, uuid, return_id;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!this.isGet()) {
                _context9.next = 7;
                break;
              }

              _model6 = this.model("pictures");
              _context9.next = 4;
              return _model6.where({ category_code: 'wechat_index_actvt' }).select();

            case 4:
              data = _context9.sent;


              this.assign("photos", data);
              return _context9.abrupt('return', this.display());

            case 7:
              description = this.post("description"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), pic_url = this.post("pic_url");

              //插入数据

              model = this.model("wechat_index_actvt");
              createdat = new Date();
              uuid = require('uuid');
              _context9.next = 13;
              return model.add({
                description: description,
                pic_url: pic_url,
                url: url,
                sort_num: sort_num,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: createdat.toLocaleString(),
                uuid: uuid.v4().toString()
              });

            case 13:
              return_id = _context9.sent;
              return _context9.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 15:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function actvtiAction() {
      return ref.apply(this, arguments);
    }

    return actvtiAction;
  }();

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */


  _class.prototype.actvtdAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
      var id, model;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!this.isGet()) {
                _context10.next = 3;
                break;
              }

              this.assign("id", this.get("id"));
              return _context10.abrupt('return', this.display());

            case 3:
              id = this.post("id");
              model = this.model("wechat_index_actvt");
              _context10.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              return _context10.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 8:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function actvtdAction() {
      return ref.apply(this, arguments);
    }

    return actvtdAction;
  }();

  /**
  * update action
  * 更新
  * @return {Promise} []
  */


  _class.prototype.ctuAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
      var id, model, data, _id4, description, deleted, url, sort_num, pic_url, updatedat, to_update, _model7;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!this.isGet()) {
                _context11.next = 10;
                break;
              }

              // let csrf=await this.session("__CSRF__");
              // this.assign("csrf",csrf);
              id = this.get("id");
              model = this.model("wechat_index_category_type");
              _context11.next = 5;
              return model.where({ id: id }).find();

            case 5:
              data = _context11.sent;


              this.assign("ct", data);

              return _context11.abrupt('return', this.display());

            case 10:
              _id4 = this.post("id"), description = this.post("description"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), pic_url = this.post("pic_url");
              updatedat = new Date();
              to_update = { description: description, deleted: deleted, updatedat: updatedat.toLocaleString(), url: url, sort_num: sort_num };


              if (pic_url && pic_url.length > 0) {
                to_update.pic_url = pic_url;
              }

              //更新数据
              _model7 = this.model("wechat_index_category_type");
              _context11.next = 17;
              return _model7.where({ id: _id4 }).update(to_update);

            case 17:
              return _context11.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 18:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function ctuAction() {
      return ref.apply(this, arguments);
    }

    return ctuAction;
  }();

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */


  _class.prototype.ctiAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
      var name, deleted, url, sort_num, icon, color, model, createdat, uuid, return_id;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!this.isGet()) {
                _context12.next = 2;
                break;
              }

              return _context12.abrupt('return', this.display());

            case 2:
              name = this.post("name"), deleted = !!this.post("deleted"), url = this.post("url"), sort_num = this.post("sort_num"), icon = this.post("icon"), color = this.post("color");

              //插入数据

              model = this.model("wechat_index_category_type");
              createdat = new Date();
              uuid = require('uuid');
              _context12.next = 8;
              return model.add({
                name: name,
                icon: icon,
                url: url,
                sort_num: sort_num,
                color: color,
                deleted: deleted,
                createdat: createdat.toLocaleString(),
                updatedat: createdat.toLocaleString(),
                uuid: uuid.v4().toString()
              });

            case 8:
              return_id = _context12.sent;
              return _context12.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 10:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function ctiAction() {
      return ref.apply(this, arguments);
    }

    return ctiAction;
  }();

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */


  _class.prototype.ctdAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
      var id, model;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (!this.isGet()) {
                _context13.next = 3;
                break;
              }

              this.assign("id", this.get("id"));
              return _context13.abrupt('return', this.display());

            case 3:
              id = this.post("id");
              model = this.model("wechat_index_category_type");
              _context13.next = 7;
              return model.where({ id: id }).delete();

            case 7:
              return _context13.abrupt('return', this.redirect("/page/wechat/index/index"));

            case 8:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function ctdAction() {
      return ref.apply(this, arguments);
    }

    return ctdAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map