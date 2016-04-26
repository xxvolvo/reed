'use strict';

import Base from '../base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let page_index=this.get("page");
    let name=this.get("name");
    let search={};
    if(name&&name.length>0){
      search.name=['like','%'+name+'%'];
    }
    this.assign("name",name);
    if(!page_index) page_index=1;
    let page_count=10;
    let model=this.model("v_department");

    let raw_data=await model.page(page_index,page_count).where(search).countSelect();
    this.assign("staffs",raw_data.data);
    this.assign("currentPage",raw_data.currentPage);
    this.assign("itemsCount",raw_data.count);
    this.assign("totalPages",raw_data.totalPages);
    this.assign("startPage",(page_index-1)*page_count+1);
    this.assign("endPage",Math.min(page_index*page_count,raw_data.count));
    return this.display();
  }
  /**
  * update action
  * 更新
  * @return {Promise} []
  */
  async updateAction(){
    if(this.isGet()){
      let id=this.get("id");
      let model=this.model("department");
      let data=await model.where({id:id}).find();
      let p_depts=await model.order("name").select();
      this.assign("dept",data);
      this.assign("p_depts",p_depts);
      return this.display();
    }else{
      let name=this.post("name"),deleted=!!this.post("deleted"),id=this.post("id"),puuid=this.post("puuid");

      let updatedat=new Date();
      let to_update={name:name,deleted:deleted,updatedat:updatedat.toLocaleString(),puuid:puuid&&puuid.length>0?puuid:null}

      //插入数据
      let model=this.model("department");

      await model.where({id:id}).update(to_update);
      return this.redirect("/system/dept/index");
    }
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async insertAction(){
    if(this.isGet()){
      let model=this.model('department');
      let data=model.order("name").select();
      this.assign("p_depts",data);
      return this.display();
    }
    let name=this.post("name"),deleted=!!this.post("deleted"),puuid=this.post("puuid");
    let uuid=require('uuid');

    //插入数据
    let model=this.model("department");
    let createdat=new Date();
    let updatedat=new Date();

    await model.add({
      name:name,
      puuid:puuid&&puuid.length>0?puuid:null,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:updatedat.toLocaleString(),
      uuid:uuid.v4().toString()
    });
    return this.redirect("/system/dept/index");
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
    let model=this.model("department");
    await model.where({id:id}).delete();
    return this.redirect("/system/dept/index");
  }
}
