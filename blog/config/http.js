let prefix = 'http://localhost:7001/default/';

let httpPath = {
    getArticleList: prefix + 'articles', //首页文章列表接口
    getArticleById: prefix + 'article', //文章详情接口
    getAllType: prefix + 'type', //类型接口
    getArticleByType : prefix + 'articlebytype', //根据type获取文章列表
};

export default httpPath;