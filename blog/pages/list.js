import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import { Col, Row, List, Icon, Breadcrumb } from 'antd';

import axios from 'axios';
import httpPath from '../config/http';


const MyList = (props) => {
  const [mylist, setMylist] = useState(props.data);
  useEffect(() => {
    setMylist(props.data);
  })
  return (
    <div className="container">
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.params.type}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout='vertical'
            dataSource={mylist}
            renderItem={(item) => {
              return (
                <List.Item>
                  <div className='list-title'>
                    <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span><Icon type='calendar' /> {item.addtime}</span>
                    <span><Icon type='folder' /> {item.type}</span>
                    <span><Icon type='fire' /> 访问人数</span>
                  </div>
                  <div className='list-context'>{item.body}</div>
                </List.Item>
              )
            }} />
        </Col>
        <Col className='comm-box' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
MyList.getInitialProps = async (context) => {
  let res = await axios(`${httpPath.getArticleByType}/${context.query.type}`);
  return { data: res.data.data, params: context.query };
}

export default MyList;