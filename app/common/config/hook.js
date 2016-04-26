'use strict';

/**
 * hook config
 * https://thinkjs.org/doc/middleware.html#toc-df6
 */

exports.__esModule = true;
exports.default = {
  route_parse: ["prepend", "subdomain"],
  logic_before: ["prepend", "icsrf"]
};
//# sourceMappingURL=hook.js.map