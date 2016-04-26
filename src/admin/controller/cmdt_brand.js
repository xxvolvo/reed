'use strict';

import Base from './base.js';

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
    console.log(page_count);
    console.log(this.config.nums_per_page);
    let model=this.model("brand");

    let raw_data=await model.page(page_index,page_count).where(search).countSelect();
    this.assign("brands",raw_data.data);
    this.assign("currentPage",raw_data.currentPage);
    this.assign("itemsCount",raw_data.count);
    this.assign("totalPages",raw_data.totalPages);
    this.assign("startPage",(page_index-1)*page_count+1);
    this.assign("endPage",Math.min(page_index*page_count,raw_data.count));
    return this.display();
  }

  async selectAction(){
    let model=this.model("brand");
    let data=await model.select();
    return this.success(data);
  }
  async updateAction(){
    if(this.isGet()){
      // let csrf=await this.session("__CSRF__");
      // this.assign("csrf",csrf);
      var id=this.get("id");
      var model=this.model("brand");
      var data=await model.where({id:id}).find();
      this.assign("brand",data);
      return this.display();
    }else{
      let name=this.post("name"),desc=this.post("desc"),deleted=!!this.post("deleted"),id=this.post("id");

      var updatedat=new Date();
      var to_update={name:name,description:desc,deleted:deleted,updatedat:updatedat.toLocaleString()}
      let file=this.file("pic_url");

      if(file.size){
        //处理图片
        var fs=require('fs');
        var util=require('util');
        var imgname=Date.parse(new Date())+".jpg";
        var path=require('path');
        var full_img_name=path.join(__dirname,'../../../www/static/user_images/brand',imgname);
        var pic_url="/static/user_images/brand/"+imgname;

        var is=fs.createReadStream(file.path);
        var os=fs.createWriteStream(full_img_name);
        await util.pump(is,os);
        fs.unlinkSync(file.path);
        to_update.pic_url=pic_url;
      }

      //插入数据
      var model=this.model("brand");

      await model.where({id:id}).update(to_update);
      let http=this.http;
      return http.redirect("/cmdt_brand");
    }
  }

  async insertAction(){
    if(this.isGet()){
      return this.display();
    }
    let name=this.post("name"),desc=this.post("desc"),deleted=!!this.post("deleted");

    //上传图片
    var uuid=require('uuid');
    let file=this.file("pic_url");
    var path=require('path');
    var extname=path.extname(file.originalFilename);
    var qiniu=require('../../common/util/qiniu-yun.js');
    var imgname=uuid.v4().toString()+extname;
    var pic_url='static/user_images/brand/'+imgname;
    var upload_result=await qiniu.upload(file.path,pic_url);
    var config=think.config('app').qiniu;
    pic_url=config.domain+"/"+pic_url;
    //插入数据
    var model=this.model("brand");
    var createdat=new Date();
    var updatedat=new Date();


    await model.add({name:name,description:desc,deleted:deleted,createdat:createdat.toLocaleString(),updatedat:updatedat.toLocaleString(),pic_url:pic_url,uuid:uuid.v4().toString()});
    return this.redirect("/cmdt_brand");
  }

  async deleteAction(){
    if(this.isGet()){
      this.assign("id",this.get("id"));
      return this.display();
    }
    let id=this.post("id");
    let model=this.model("brand");
    await model.where({id:id}).delete();
    let http=this.http;
    return http.redirect("/cmdt_brand");
  }
}
