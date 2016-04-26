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
    let model=this.model("usergroup");

    let raw_data=await model.page(page_index,page_count).where(search).countSelect();
    this.assign("usergroups",raw_data.data);
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
      let model=this.model("usergroup");
      let data=await model.where({id:id}).find();
      this.assign("usergroup",data);
      return this.display();
    }else{
      let name=this.post("name"),deleted=!!this.post("deleted"),id=this.post("id");

      let updatedat=new Date();
      let to_update={name:name,deleted:deleted,updatedat:updatedat.toLocaleString()}

      //插入数据
      let model=this.model("usergroup");

      await model.where({id:id}).update(to_update);
      return this.redirect("/system/usergroup/index");
    }
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async insertAction(){
    if(this.isGet()){
      return this.display();
    }
    let name=this.post("name"),deleted=!!this.post("deleted");
    let uuid=require('uuid');

    //插入数据
    let model=this.model("usergroup");
    let createdat=new Date();
    let updatedat=new Date();

    await model.add({
      name:name,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:updatedat.toLocaleString(),
      uuid:uuid.v4().toString()
    });
    return this.redirect("/system/usergroup/index");
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
    let model=this.model("usergroup");
    await model.where({id:id}).delete();
    return this.redirect("/system_usergroup");
  }

  async menuAction(){
    if(this.isGet()){
      let uuid=this.get("uuid");
      let sql=`select a.id,a.uuid,a."name",a.deleted,b.id as usergroup_menu_id,b.uuid as usergroup_menu_uuid from menu a
			left join (select * from usergroup_menu where usergroup_uuid='`+uuid+`') b on a.uuid=b.menu_uuid`;
      let model=this.model("menu");
      let data=model.query(sql);
      this.assign("menus",data);
      this.assign("uuid",uuid);
      return this.display();
    }else{
      let selected_uuid=this.post("selected_uuid");

      if( typeof(selected_uuid)==='string'&&selected_uuid.length>0){
        selected_uuid=[selected_uuid];
      }
      let usergroup_uuid=this.post("uuid");
      let model=this.model("usergroup_menu");
      await model.where({usergroup_uuid:usergroup_uuid}).delete();
      let to_add=[];
      let uuid=require('uuid');
      let createdat=new Date();



      for(let i=0;i<selected_uuid.length;i++){
        to_add.push({
          uuid:uuid.v4().toString(),
          usergroup_uuid:usergroup_uuid,
          menu_uuid:selected_uuid[i],
          deleted:false,
          createdat:createdat.toLocaleString(),
          updatedat:createdat.toLocaleString()
        });
      }
      if(to_add.length>0){
        await model.addMany(to_add);
      }

      return this.redirect('/system/usergroup/index');
    }
  }
}
