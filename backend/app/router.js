'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/juejin/resource', controller.juejin.index);
  router.get('/github/resource', controller.github.index);
  router.get('/devto/resource', controller.devto.index);
  router.get('/segmentfault/resource', controller.segmentfault.index);
};
