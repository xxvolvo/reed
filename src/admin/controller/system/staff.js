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
    let model=this.model("v_staff");

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
      // let csrf=await this.session("__CSRF__");
      // this.assign("csrf",csrf);
      let id=this.get("id");
      let model=this.model("staff");
      let data=await model.where({id:id}).find();

      let model_dept=this.model("department");
      let data_dept=model_dept.order("name").select();

      let model_ug=this.model('usergroup');
      let data_ug=model_ug.order("name").select();

      let category_model=this.model("pictures");
      let category_data=await category_model.query('select distinct category,category_code from pictures');

      this.assign("depts",data_dept);
      this.assign("usergroups",data_ug);
      this.assign("staff",data);
      this.assign("categorys",category_data);
      return this.display();
    }else{
      let name=this.post("name"),
          deleted=!!this.post("deleted"),
          id=this.post("id"),
          password=this.post("password"),
          dept_uuid=this.post("dept_uuid"),
          usergroup_uuid=this.post("usergroup_uuid"),
          avatar=this.post("avatar");


      let updatedat=new Date();
      let to_update={name:name,deleted:deleted,updatedat:updatedat.toLocaleString(),dept_uuid:dept_uuid,usergroup_uuid:usergroup_uuid}

      if(avatar&&avatar.length>0){
        to_update.avatar=avatar;
      }

      if(password&&password.length>0){
        let crypto=require('crypto');
        var md5sum = crypto.createHash('md5');
        md5sum.update(password);
        let pwd = md5sum.digest('hex');
        to_update.pwd_hash=pwd;
      }
      //插入数据
      let model=this.model("staff");

      await model.where({id:id}).update(to_update);
      return this.redirect("/system/staff/index");
    }
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async insertAction(){
    if(this.isGet()){
      let model=this.model("department");
      let data=model.order("name").select();

      let model_ug=this.model('usergroup');
      let data_ug=model_ug.order("name").select();

      let category_model=this.model("pictures");
      let category_data=await category_model.query('select distinct category,category_code from pictures');

      this.assign("depts",data);
      this.assign("usergroups",data_ug);
      this.assign("categorys",category_data);
      return this.display();
    }
    let name=this.post("name"),
        deleted=!!this.post("deleted"),
        password=this.post("password"),
        dept_uuid=this.post("dept_uuid"),
        usergroup_uuid=this.post("usergroup_uuid"),
        avatar=this.post("avatar");
    let crypto=require('crypto');
    var md5sum = crypto.createHash('md5');
    md5sum.update(password);
    let pwd = md5sum.digest('hex');
    let uuid=require('uuid');

    //插入数据
    let model=this.model("staff");
    let createdat=new Date();
    let updatedat=new Date();

    let return_id=await model.add({
      name:name,
      pwd_hash:pwd,
      dept_uuid:dept_uuid,
      avatar:avatar,
      usergroup_uuid:usergroup_uuid,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:updatedat.toLocaleString(),
      uuid:uuid.v4().toString()
    });
    return this.redirect("/system/staff/index");
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
    let model=this.model("staff");
    await model.where({id:id}).delete();
    return this.redirect("/system/staff/index");
  }

  async photobycodeAction(){
    let code=this.get("code");
    let model=this.model("pictures");
    let data=await model.where({category_code:code}).select();

    this.assign("photos",data);
    return this.display();
  }
}
