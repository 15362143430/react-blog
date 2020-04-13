'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const res = await this.app.mysql.query('SELECT * FROM article');
    this.ctx.body = { data: res };
  }
  async articles() {
    const res = await this.app.mysql.query('SELECT * FROM article');
    this.ctx.body = { data: res };
  }
  async article() {
    const res = await this.app.mysql.query(`SELECT * FROM article WHERE id=${this.ctx.params.id}`);
    this.ctx.body = { data: res };
  }
  async type() {
    const res = await this.app.mysql.query('SELECT type from article GROUP BY type');
    this.ctx.body = { data: res };
  }
  async articleByType() {
    const res = await this.app.mysql.query(`SELECT * from article WHERE type='${this.ctx.params.type}'`);
    this.ctx.body = { data: res };
  }
}

module.exports = HomeController;
