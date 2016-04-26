'use strict';
/**
 * middleware
 */
export default class extends think.middleware.base {
  /**
   * run
   * @return {Promise} []
   */
  async run() {

    think.session(this.http);
    let session = this.http._session;
    let now_staff=await session.get("now_staff");
    if(!now_staff){
      return think.statusAction(600, this.http);
    }
  }
}
