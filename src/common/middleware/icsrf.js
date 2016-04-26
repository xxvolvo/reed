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
    let csrf = this.config('icsrf');
    think.session(this.http);
    let session = this.http._session;
    let isGet = this.http.isGet();
    let isPost = this.http.isPost();
    let isAjax = this.http.isAjax();
    let isJsonp = this.http.isJsonp();

    if (isGet  && !isJsonp) {
      let value = await session.get(csrf.session_name);
      if (!value) {
        value = think.uuid(32);
        await session.set(csrf.session_name, value);
      }
      this.http.view().assign(csrf.form_name, value);

    } else if (isPost  || isJsonp) {
      let value = await session.get(csrf.session_name);
      let formValue = this.http[isPost ? 'post' : 'param'](csrf.form_name);
      if (!value || formValue !== value) {
        return this.http.fail(csrf.errno, csrf.errmsg);
      }
    }
  }
}
