'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/default/articles', controller.default.home.articles);
  router.get('/default/article/:id', controller.default.home.article);
  router.get('/default/type', controller.default.home.type);
  router.get('/default/articlebytype/:type', controller.default.home.articleByType);
};
