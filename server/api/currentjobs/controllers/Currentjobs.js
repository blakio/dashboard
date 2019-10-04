'use strict';

/**
 * Currentjobs.js controller
 *
 * @description: A set of functions called "actions" for managing `Currentjobs`.
 */

module.exports = {

  /**
   * Retrieve currentjobs records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.currentjobs.search(ctx.query);
    } else {
      return strapi.services.currentjobs.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a currentjobs record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.currentjobs.fetch(ctx.params);
  },

  /**
   * Count currentjobs records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.currentjobs.count(ctx.query);
  },

  /**
   * Create a/an currentjobs record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.currentjobs.add(ctx.request.body);
  },

  /**
   * Update a/an currentjobs record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.currentjobs.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an currentjobs record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.currentjobs.remove(ctx.params);
  }
};
