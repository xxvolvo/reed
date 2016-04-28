'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    let swiper_model=this.model("wechat_index_swiper");
    let swiper_data=swiper_model.where({deleted:false}).order({sort_num:"ASC"}).select();
    this.assign("swipers",swiper_data);

    let baokuan_model=this.model("wechat_index_baokuan");
    let baokuan_data=baokuan_model.where({deleted:false}).order({sort_num:"ASC"}).select();
    this.assign("baokuans",baokuan_data);

    let actvt_model=this.model("wechat_index_actvt");
    let actvt_data=actvt_model.where({deleted:false}).order({sort_num:"ASC"}).select();
    this.assign("actvts",actvt_data);

    let category_type_model=this.model("wechat_index_category_type");
    let category_type_data=category_type_model.where({deleted:false}).order({sort_num:"ASC"}).select();
    this.assign("cts",category_type_data);

    let category_model=this.model("wechat_index_category");
    let category_data=category_model.where({deleted:false}).order({sort_num:"ASC"}).select();
    this.assign("categorys",category_data);
    return this.display();
  }
}
