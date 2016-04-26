'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let now_user=await this.session("now_user");
    //console.log(now_user);
    if(think.isEmpty(now_user)){
      return this.redirect("/index/login");
    }
    //auto render template file index_index.html
    let user_uuid=now_user.uuid;
    //查找员工
    let model_user=this.model("staff");
    let data_user=await model_user.where({uuid:user_uuid}).find();
    //查找用户组中记录的菜单
    let model_usergroup_menu=this.model("usergroup_menu");
    let data_usergroup_menu=await model_usergroup_menu.where({usergroup_uuid:data_user.usergroup_uuid}).select();
    //查找菜单
    let model_menu=this.model("menu");
    let menu_uuids=[];
    for(let key in data_usergroup_menu){
      menu_uuids.push(data_usergroup_menu[key].menu_uuid);
    }
    let data_menu=await model_menu.where({uuid:["in",menu_uuids]}).order("sort_num").select();

    let parent_before_str=`<li class="treeview">
      <a href="#"><i class="fa fa-{{icon}}"></i><span>{{name}}</span> <i class="fa fa-angle-left pull-right"></i></a>
      <ul class="treeview-menu">`;
    let parent_after_str=`</ul>
  </li>`;
    let alone_str=`<li><a href="javascript:$.Reed.router.link('{{href}}','{{controller}}','{{name}}')" ><i class="fa fa-{{icon}}"></i><span>{{name}}</span></a></li>`;

    let tohtml=function(one,list){
      var html='';
      //判断有无子元素
      let has_child=false;
      for(let j=0;j<list.length;j++){
        if(list[j].puuid==one.uuid){
          has_child=true;
          break;
        }
      }
      if(has_child){
        html+=parent_before_str.replace("{{icon}}",one.icon).replace("{{name}}",one.name);
        for(let i=0;i<list.length;i++){
          if(list[i].puuid==one.uuid){
            html+=tohtml(list[i],list);
          }
        }
        html+=parent_after_str;
      }else{
        html+=alone_str.replace("{{href}}",one.href).replace("{{controller}}",one.controller).replace("{{name}}",one.name).replace("{{name}}",one.name).replace("{{icon}}",one.icon);
      }
      return html;
    };

    let final_html='';
    for(let i=0;i<data_menu.length;i++){
      if(data_menu[i].puuid==null){
        final_html+=tohtml(data_menu[i],data_menu);
      }
    }
    this.assign('menu',final_html);
    this.assign("user",now_user);
    return this.display();
  }

  async loginAction(){
    if(this.isPost()){
      let name=this.post("name").trim(),
          password=this.post("pwd").trim();
      let csrf = this.config('icsrf');
      let value = await this.session(csrf.session_name);
      this.assign("csrf",value);
      if(!name||name.length==0||!password||password.length==0){
        this.assign("message",'请输入用户名和密码');
        return this.display();
      }
      let model=this.model("staff");
      let crypto=require('crypto');
      var md5sum = crypto.createHash('md5');
      md5sum.update(password);
      let pwd = md5sum.digest('hex');

      let data=await model.where({name:name,pwd_hash:pwd}).find();
      console.log(data);
      if(!data||think.isEmpty(data)){
        this.assign("message",'用户名密码不正确');
        return this.display();
      }
      this.session("now_user",data);
      return this.redirect("/");
    }else{
      this.assign("message",'');
      return this.display();
    }
  }
  async logoutAction(){
    this.session();
    return this.redirect("/index/login");
  }
  async testAction(){
    let model=this.model("menu");
    let data=await model.select();

    this.success(data);
  }
}
