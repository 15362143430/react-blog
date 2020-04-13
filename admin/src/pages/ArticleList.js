import React, { useState, useEffect } from 'react';
import { List, Col, Row, Modal, message, Button } from 'antd';

import axios from 'axios';
import httpPath from '../config/http';

import '../static/css/articleList.css';

const { confirm } = Modal;

export default function ArticleList(props) {
    const [list, setList] = useState([]);
    useEffect(() => {
        getArticleList();
    },[])

    const getArticleList = async () => {
        let res = await axios(httpPath.getArticleList);
        setList(res.data.data);
    }
    const deleteArticle = (id) => {
        confirm({
            title: '删除文章',
            content: '如果你点击Ok，文章将永远被删除，无法恢复',
            async onOk() {
                let res = await axios.delete(`${httpPath.deleteArticle}/${id}`);
                getArticleList();
                message.success('删除成功了呢');
            },
            onCancel() {
                message.success('您已取消删除');
            }
        })
    }
    const updateArticle = (id)=>{
        props.history.push(`/index/add/${id}`)
    }
    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.type}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                共<span>{item.type}</span>集
                            </Col>
                            <Col span={3}>
                                {item.type}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;
                                <Button type='danger' onClick={()=>{deleteArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}
