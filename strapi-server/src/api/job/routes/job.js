"use strict";

/**
 * job router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::job.job", {
  config: {
    find: {
      middlewares: ["api::job.career-parser"],
    },
  },
});
