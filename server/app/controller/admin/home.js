'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const res = await this.app.mysql.query('SELECT * FROM article');
    this.ctx.body = { data: res };
  }

  async Login() {
    const params = this.ctx.request.body;
    console.log(params);
    const res = await this.app.mysql.query(`SELECT COUNT(*) as count FROM user WHERE email='${params.email}' AND password='${params.password}'`);
    console.log(res[0].count);
    if (res[0].count) {
      const openId = `${params.email}_${new Date().getTime()}`;
      this.ctx.session.openId = { open: openId };
      this.ctx.body = { data: '登录成功', open: openId, code: 200 };
    } else {
      this.ctx.body = { data: '密码错误或用户名错误', code: 404 };
    }
  }

  async type() {
    const res = await this.app.mysql.query('SELECT type from article GROUP BY type');
    this.ctx.body = { data: res };
  }

  async addArticle() {
    const res = await this.app.mysql.insert('article', this.ctx.request.body);
    if (res.affectedRows) {
      this.ctx.body = { data: '添加成功', code: 200 };
    } else {
      this.ctx.body = { data: '添加失败', code: 404 };
    }
  }
  async articles() {
    const res = await this.app.mysql.query('SELECT * FROM article');
    this.ctx.body = { data: res };
  }
  async deleteArticle() {
    const res = await this.app.mysql.delete('article', { id: this.ctx.params.id });
    this.ctx.body = { data: res };
  }
  async articleDetail() {
    const res = await this.app.mysql.query(`SELECT * FROM article WHERE id=${this.ctx.params.id}`);
    this.ctx.body = { data: res };
  }
  async updateArticle() {
    // console.log(this.ctx.request.body);
    const res = await this.app.mysql.update('article', this.ctx.request.body);
    if (res.affectedRows) {
      this.ctx.body = { data: '修改成功', code: 200 };
    } else {
      this.ctx.body = { data: '修改失败', code: 404 };
    }
  }
}

module.exports = HomeController;
