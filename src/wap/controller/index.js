'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    let picture_model=this.model("pictures");
    let picture_data=picture_model.where({category_code:"wechat_index_swipers"}).order({sort:"ASC"}).select();
    this.assign("pictures",picture_data);
    return this.display();
  }
}
