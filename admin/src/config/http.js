let prefix = 'http://localhost:7001/admin/';

let httpPath = {
    Login: prefix + 'login', //登录接口
    type: prefix + 'type', //获取类型
    addArticle: prefix + 'article', //添加文章接口
    getArticleList: prefix + 'articles', //获取文章列表
    deleteArticle: prefix + 'article', //删除文章
    articleDetail: prefix + 'articlebyid', //文章详情
    updateArticle: prefix + 'article', //修改文章
};

export default httpPath;