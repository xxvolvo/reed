'use strict';

import Base from '../../base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let page_count=10;
    /****start swiper******/
    let swiper_page_index=this.get("swiper_page")||1;
    let swiper_model=this.model("wechat_index_swiper");
    let swiper_raw_data=await swiper_model.page(swiper_page_index,page_count).countSelect();

    this.assign("swipers",swiper_raw_data.data);
    this.assign("swipers_currentPage",swiper_raw_data.currentPage);
    this.assign("swipers_itemsCount",swiper_raw_data.count);
    this.assign("swipers_totalPages",swiper_raw_data.totalPages);
    this.assign("swipers_startPage",(swiper_page_index-1)*page_count+1);
    this.assign("swipers_endPage",Math.min(swiper_page_index*page_count,swiper_raw_data.count));
    /****end swiper******/

    /****start baokuan******/
    let baokuan_page_index=this.get("baokuan_page")||1;
    let baokuan_model=this.model("wechat_index_baokuan");
    let baokuan_raw_data=await baokuan_model.page(baokuan_page_index,page_count).countSelect();

    this.assign("baokuans",baokuan_raw_data.data);
    this.assign("baokuans_currentPage",baokuan_raw_data.currentPage);
    this.assign("baokuans_itemsCount",baokuan_raw_data.count);
    this.assign("baokuans_totalPages",baokuan_raw_data.totalPages);
    this.assign("baokuans_startPage",(baokuan_page_index-1)*page_count+1);
    this.assign("baokuans_endPage",Math.min(baokuan_page_index*page_count,baokuan_raw_data.count));
    /****end baokuan******/

    /****start actvt******/
    let actvt_page_index=this.get("actvt_page")||1;
    let actvt_model=this.model("wechat_index_actvt");
    let actvt_raw_data=await actvt_model.page(actvt_page_index,page_count).countSelect();

    this.assign("actvts",actvt_raw_data.data);
    this.assign("actvts_currentPage",actvt_raw_data.currentPage);
    this.assign("actvts_itemsCount",actvt_raw_data.count);
    this.assign("actvts_totalPages",actvt_raw_data.totalPages);
    this.assign("actvts_startPage",(actvt_page_index-1)*page_count+1);
    this.assign("actvts_endPage",Math.min(actvt_page_index*page_count,actvt_raw_data.count));
    /****end actvt******/

    /****start category type******/
    let ct_page_index=this.get("ct_page")||1;
    let ct_model=this.model("wechat_index_category_type");
    let ct_raw_data=await ct_model.page(ct_page_index,page_count).countSelect();

    this.assign("cts",ct_raw_data.data);
    this.assign("cts_currentPage",ct_raw_data.currentPage);
    this.assign("cts_itemsCount",ct_raw_data.count);
    this.assign("cts_totalPages",ct_raw_data.totalPages);
    this.assign("cts_startPage",(ct_page_index-1)*page_count+1);
    this.assign("cts_endPage",Math.min(ct_page_index*page_count,ct_raw_data.count));
    /****end category type******/

    /****start category******/
    let category_page_index=this.get("category_page")||1;
    let category_model=this.model("wechat_index_category");
    let category_raw_data=await category_model.page(category_page_index,page_count).countSelect();

    this.assign("categorys",category_raw_data.data);
    this.assign("categorys_currentPage",category_raw_data.currentPage);
    this.assign("categorys_itemsCount",category_raw_data.count);
    this.assign("categorys_totalPages",category_raw_data.totalPages);
    this.assign("categorys_startPage",(category_page_index-1)*page_count+1);
    this.assign("categorys_endPage",Math.min(category_page_index*page_count,category_raw_data.count));
    /****end category ******/
    return this.display();
  }
  /**
  * update action
  * 更新
  * @return {Promise} []
  */
  async updateAction(){
    if(this.isGet()){
      // let csrf=await this.session("__CSRF__");
      // this.assign("csrf",csrf);
      let id=this.get("id");
      let model=this.model("wechat_index_swiper");
      let data=await model.where({id:id}).find();

      let model_pictures=this.model("pictures");
      let data_photo=await model_pictures.where({category_code:'wechat_index_swiper'}).select();

      this.assign("swiper",data);
      this.assign("photos",data_photo);
      return this.display();
    }else{
      let id=this.post("id"),
          description=this.post("description"),
          deleted=!!this.post("deleted"),
          url=this.post("url"),
          sort_num=this.post("sort_num"),
          pic_url=this.post("pic_url");


      let updatedat=new Date();
      let to_update={description:description,deleted:deleted,updatedat:updatedat.toLocaleString(),url:url,sort_num:sort_num}

      if(pic_url&&pic_url.length>0){
        to_update.pic_url=pic_url;
      }


      //更新数据
      let model=this.model("wechat_index_swiper");

      await model.where({id:id}).update(to_update);
      return this.redirect("/page/wechat/index/index");
    }
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async insertAction(){
    if(this.isGet()){
      let model=this.model("pictures");
      let data=await model.where({category_code:'wechat_index_swiper'}).select();

      this.assign("photos",data);
      return this.display();
    }
    let description=this.post("description"),
        deleted=!!this.post("deleted"),
        url=this.post("url"),
        sort_num=this.post("sort_num"),
        pic_url=this.post("pic_url");

    //插入数据
    let model=this.model("wechat_index_swiper");
    let createdat=new Date();
    let uuid=require('uuid');

    let return_id=await model.add({
      description:description,
      pic_url:pic_url,
      url:url,
      sort_num:sort_num,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:createdat.toLocaleString(),
      uuid:uuid.v4().toString()
    });
    return this.redirect("/page/wechat/index/index");
  }

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */
  async deleteAction(){
    if(this.isGet()){
      this.assign("id",this.get("id"));
      return this.display();
    }
    let id=this.post("id");
    let model=this.model("wechat_index_swiper");
    await model.where({id:id}).delete();
    return this.redirect("/page/wechat/index/index");
  }

  /**
  * update action
  * 更新
  * @return {Promise} []
  */
  async baokuanuAction(){
    if(this.isGet()){
      // let csrf=await this.session("__CSRF__");
      // this.assign("csrf",csrf);
      let id=this.get("id");
      let model=this.model("wechat_index_baokuan");
      let data=await model.where({id:id}).find();

      let model_pictures=this.model("pictures");
      let data_photo=await model_pictures.where({category_code:'wechat_index_baokuan'}).select();

      this.assign("baokuan",data);
      this.assign("photos",data_photo);
      return this.display();
    }else{
      let id=this.post("id"),
          description=this.post("description"),
          deleted=!!this.post("deleted"),
          url=this.post("url"),
          sort_num=this.post("sort_num"),
          pic_url=this.post("pic_url");


      let updatedat=new Date();
      let to_update={description:description,deleted:deleted,updatedat:updatedat.toLocaleString(),url:url,sort_num:sort_num}

      if(pic_url&&pic_url.length>0){
        to_update.pic_url=pic_url;
      }


      //更新数据
      let model=this.model("wechat_index_baokuan");

      await model.where({id:id}).update(to_update);
      return this.redirect("/page/wechat/index/index");
    }
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async baokuaniAction(){
    if(this.isGet()){
      let model=this.model("pictures");
      let data=await model.where({category_code:'wechat_index_baokuan'}).select();

      this.assign("photos",data);
      return this.display();
    }
    let description=this.post("description"),
        deleted=!!this.post("deleted"),
        url=this.post("url"),
        sort_num=this.post("sort_num"),
        pic_url=this.post("pic_url");

    //插入数据
    let model=this.model("wechat_index_baokuan");
    let createdat=new Date();
    let uuid=require('uuid');

    let return_id=await model.add({
      description:description,
      pic_url:pic_url,
      url:url,
      sort_num:sort_num,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:createdat.toLocaleString(),
      uuid:uuid.v4().toString()
    });
    return this.redirect("/page/wechat/index/index");
  }

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */
  async baokuandAction(){
    if(this.isGet()){
      this.assign("id",this.get("id"));
      return this.display();
    }
    let id=this.post("id");
    let model=this.model("wechat_index_baokuan");
    await model.where({id:id}).delete();
    return this.redirect("/page/wechat/index/index");
  }

  /**
  * update action
  * 更新
  * @return {Promise} []
  */
  async actvtuAction(){
    if(this.isGet()){
      // let csrf=await this.session("__CSRF__");
      // this.assign("csrf",csrf);
      let id=this.get("id");
      let model=this.model("wechat_index_actvt");
      let data=await model.where({id:id}).find();

      let model_pictures=this.model("pictures");
      let data_photo=await model_pictures.where({category_code:'wechat_index_actvt'}).select();

      this.assign("actvt",data);
      this.assign("photos",data_photo);
      return this.display();
    }else{
      let id=this.post("id"),
          description=this.post("description"),
          deleted=!!this.post("deleted"),
          url=this.post("url"),
          sort_num=this.post("sort_num"),
          pic_url=this.post("pic_url");


      let updatedat=new Date();
      let to_update={description:description,deleted:deleted,updatedat:updatedat.toLocaleString(),url:url,sort_num:sort_num}

      if(pic_url&&pic_url.length>0){
        to_update.pic_url=pic_url;
      }


      //更新数据
      let model=this.model("wechat_index_actvt");

      await model.where({id:id}).update(to_update);
      return this.redirect("/page/wechat/index/index");
    }
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async actvtiAction(){
    if(this.isGet()){
      let model=this.model("pictures");
      let data=await model.where({category_code:'wechat_index_actvt'}).select();

      this.assign("photos",data);
      return this.display();
    }
    let description=this.post("description"),
        deleted=!!this.post("deleted"),
        url=this.post("url"),
        sort_num=this.post("sort_num"),
        pic_url=this.post("pic_url");

    //插入数据
    let model=this.model("wechat_index_actvt");
    let createdat=new Date();
    let uuid=require('uuid');

    let return_id=await model.add({
      description:description,
      pic_url:pic_url,
      url:url,
      sort_num:sort_num,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:createdat.toLocaleString(),
      uuid:uuid.v4().toString()
    });
    return this.redirect("/page/wechat/index/index");
  }

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */
  async actvtdAction(){
    if(this.isGet()){
      this.assign("id",this.get("id"));
      return this.display();
    }
    let id=this.post("id");
    let model=this.model("wechat_index_actvt");
    await model.where({id:id}).delete();
    return this.redirect("/page/wechat/index/index");
  }

  /**
  * update action
  * 更新
  * @return {Promise} []
  */
  async ctuAction(){
    if(this.isGet()){
      // let csrf=await this.session("__CSRF__");
      // this.assign("csrf",csrf);
      let id=this.get("id");
      let model=this.model("wechat_index_category_type");
      let data=await model.where({id:id}).find();

      this.assign("ct",data);

      return this.display();
    }else{
      let id=this.post("id"),
          description=this.post("description"),
          deleted=!!this.post("deleted"),
          url=this.post("url"),
          sort_num=this.post("sort_num"),
          pic_url=this.post("pic_url");


      let updatedat=new Date();
      let to_update={description:description,deleted:deleted,updatedat:updatedat.toLocaleString(),url:url,sort_num:sort_num}

      if(pic_url&&pic_url.length>0){
        to_update.pic_url=pic_url;
      }


      //更新数据
      let model=this.model("wechat_index_category_type");

      await model.where({id:id}).update(to_update);
      return this.redirect("/page/wechat/index/index");
    }
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async ctiAction(){
    if(this.isGet()){
      return this.display();
    }
    let name=this.post("name"),
        deleted=!!this.post("deleted"),
        url=this.post("url"),
        sort_num=this.post("sort_num"),
        icon=this.post("icon"),
        color=this.post("color");

    //插入数据
    let model=this.model("wechat_index_category_type");
    let createdat=new Date();
    let uuid=require('uuid');

    let return_id=await model.add({
      name:name,
      icon:icon,
      url:url,
      sort_num:sort_num,
      color:color,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:createdat.toLocaleString(),
      uuid:uuid.v4().toString()
    });
    return this.redirect("/page/wechat/index/index");
  }

  /**
  * delete action
  * 删除
  * @return {Promise} []
  */
  async ctdAction(){
    if(this.isGet()){
      this.assign("id",this.get("id"));
      return this.display();
    }
    let id=this.post("id");
    let model=this.model("wechat_index_category_type");
    await model.where({id:id}).delete();
    return this.redirect("/page/wechat/index/index");
  }
}
