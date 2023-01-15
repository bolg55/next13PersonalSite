"use strict";

/**
 * `career-parser` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    (ctx.query.populate = {
      job: {
        populate: {
          logo: {
            fields: ["name", "formats"],
          },
        },
      },
      resume: {
        populate: {
          cv: {
            fields: ["name", "url"],
          },
        },
      },
    }),
      await next();
  };
};
