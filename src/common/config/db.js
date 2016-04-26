'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'postgresql',
  adapter: {
    postgresql: {
      host: '127.0.0.1',
      port: '5432',
      database: 'reed_v1',
      user: 'postgres',
      password: 'rgwdyn',
      prefix: '',
      encoding: 'utf8'
    }
  }
};
