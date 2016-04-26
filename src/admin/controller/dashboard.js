'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  async testAction(){
    let model=this.model("menu");
    let data=await model.select();

    this.success(data);
  }
}
