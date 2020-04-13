import Head from 'next/head';
import Header from '../components/Header';
import { Col, Row, Icon, Breadcrumb, Affix } from 'antd';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../public/style/pages/detail.css';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import marked from 'marked';
import highLight from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '../components/tocify.tsx';

import axios from 'axios';
import httpPath from '../config/http';

const Detail = (props) => {


  const tocify = new Tocify();

  const renderer = new marked.Renderer();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return highLight.highlightAuto(code).value;
    }
  })
  let html = marked(props.content);
  return (
    <div className="container">
      <Head>
        <title>Detail</title>
        <meta name='referer' content='never'></meta>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href='/'>视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href='/'>XXX</a></Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className='detailed-title'>
                {props.title}
              </div>
              <div className='list-icon center'>
                <span><Icon type='calendar' /> {props.addtime}</span>
                <span><Icon type='folder' /> {props.type}</span>
                <span><Icon type='fire' /> 访问人数3923</span>
              </div>
              <div className='detailed-content' dangerouslySetInnerHTML={{ __html: html }}>

              </div>
            </div>
          </div>
        </Col>
        <Col className='comm-box' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className='detailed-nav comm-box'>
              <div className='nav-title'>文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detail.getInitialProps = async (context) => {
  let res = await axios(`${httpPath.getArticleById}/${context.query.id}`);
  return res.data.data[0];
}

export default Detail;