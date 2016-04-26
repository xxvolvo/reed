'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   async __before(){
     if(this.http.url!=='/index/login'){
       let now_user=await this.session("now_user");
       //console.log(now_user);
       if(think.isEmpty(now_user)){
         return this.redirect("/index/login");
       }
     }
   }

}
