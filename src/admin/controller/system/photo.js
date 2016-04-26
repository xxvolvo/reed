'use strict';

import Base from '../base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let page_index=this.get("page");
    let name=this.get("name");
    let category_code=this.get("category_code");

    let search={};
    if(name&&name.length>0){
      search.name=['like','%'+name+'%'];
    }
    if(category_code&&category_code.length>0){
      search.category_code=category_code;
    }
    this.assign("name",name);
    this.assign("category_code",category_code);
    if(!page_index) page_index=1;
    let page_count=10;
    let model=this.model("pictures");
    let raw_data=await model.page(page_index,page_count).where(search).countSelect();

    let category_model=this.model("pictures");
    let category_data=await category_model.query('select distinct category,category_code from pictures');

    this.assign("photos",raw_data.data);
    this.assign("categorys",category_data);
    this.assign("currentPage",raw_data.currentPage);
    this.assign("itemsCount",raw_data.count);
    this.assign("totalPages",raw_data.totalPages);
    this.assign("startPage",(page_index-1)*page_count+1);
    this.assign("endPage",Math.min(page_index*page_count,raw_data.count));
    return this.display();
  }

  /**
  * update action
  * 插入
  * @return {Promise} []
  */
  async updateAction(){
    if(this.isGet()){
      let id=this.get("id");
      //查询图片分类 
      let category_model=this.model("pictures");
      let category_data=await category_model.query('select distinct category,category_code from pictures');
      //查询图片信息
      let model=this.model("pictures");
      let data=await model.where({id:id}).find();
      this.assign("photo",data);
      this.assign("categorys",category_data);
      return this.display();
    }

    let id=this.post("id"),
        description=this.post("description"),
        category_code=this.post("category_code"),
        new_category=this.post("new_category"),
        new_category_code=this.post("new_category_code"),
        deleted=!!this.post("deleted"),
        sort=this.post("sort");
    let real_category='',real_category_code='';
    if(new_category&&new_category.length>0){
      real_category=new_category.trim();
      real_category_code=new_category_code.trim();
    }else{
      let split=category_code.split("#@!");
      real_category=split[1];
      real_category_code=split[0];
    }
    //上传图片
    var uuid=require('uuid');
    var createdat=new Date();

    let to_update={
      uuid:uuid.v4().toString(),
      description:description,
      category:real_category,
      category_code:real_category_code,
      sort:sort,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:createdat.toLocaleString()
    };
    let file=this.file("file");
    if(file.size){
      let path=require('path');
      let extname=path.extname(file.originalFilename);
      let qiniu=require('../../../common/util/qiniu-yun.js');
      let imgname=uuid.v4().toString().replace(/-/g,'').substr(0,16)+extname;
      let pic_url='static/uimages/'+real_category_code+'/'+imgname;
      let upload_result=await qiniu.upload(file.path,pic_url);
      pic_url="/"+pic_url;

      to_update.name=imgname;
      to_update.url=pic_url;
      to_update.path='/static/uimages/'+real_category_code+'/';
    }
    //插入数据
    var model=this.model("pictures");

    await model.where({id:id}).update(to_update);
    return this.redirect("/system/photo/index");
  }

  /**
  * insert action
  * 插入
  * @return {Promise} []
  */
  async insertAction(){
    if(this.isGet()){
      //查询图片分类
      let category_model=this.model("pictures");
      let category_data=await category_model.query('select distinct category,category_code from pictures');

      this.assign("categorys",category_data);
      return this.display();
    }

    let description=this.post("description"),
        category_code=this.post("category_code"),
        new_category=this.post("new_category"),
        new_category_code=this.post("new_category_code"),
        deleted=!!this.post("deleted"),
        sort=this.post("sort");
    let real_category='',real_category_code='';
    if(new_category&&new_category.length>0){
      real_category=new_category.trim();
      real_category_code=new_category_code.trim();
    }else{
      let split=category_code.split("#@!");
      real_category=split[1];
      real_category_code=split[0];
    }
    //上传图片
    var uuid=require('uuid');
    let file=this.file("file");
    var path=require('path');
    var extname=path.extname(file.originalFilename);
    var qiniu=require('../../../common/util/qiniu-yun.js');
    var imgname=uuid.v4().toString().replace(/-/g,'').substr(0,16)+extname;
    var pic_url='static/uimages/'+real_category_code+'/'+imgname;
    var upload_result=await qiniu.upload(file.path,pic_url);
    pic_url="/"+pic_url;
    //插入数据
    var model=this.model("pictures");
    var createdat=new Date();

    let to_insert={
      uuid:uuid.v4().toString(),
      description:description,
      category:real_category,
      category_code:real_category_code,
      name:imgname,
      url:pic_url,
      path:'/static/uimages/'+real_category_code+'/',
      sort:sort,
      deleted:deleted,
      createdat:createdat.toLocaleString(),
      updatedat:createdat.toLocaleString()
    };
    await model.add(to_insert);
    return this.redirect("/system/photo/index");
  }

  async deleteAction(){
    if(this.isGet()){
      this.assign("id",this.get("id"));
      return this.display();
    }
    let id=this.post("id");
    let model=this.model("pictures");
    await model.where({id:id}).delete();
    let http=this.http;
    return http.redirect("/system/photo/index");
  }
}
