'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/articles', controller.admin.home.index);
  router.post('/admin/login', controller.admin.home.Login);
  router.get('/admin/type', controller.admin.home.type);
  router.post('/admin/article', controller.admin.home.addArticle);
  router.get('/admin/articles', controller.admin.home.articles);
  router.delete('/admin/article/:id', controller.admin.home.deleteArticle);
  router.get('/admin/articlebyid/:id', controller.admin.home.articleDetail);
  router.put('/admin/article', controller.admin.home.updateArticle);
};
