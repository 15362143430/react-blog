import React, { useState, useEffect } from 'react';
import '../static/css/addArticle.css';
import marked from 'marked';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import axios from 'axios';
import httpPath from '../config/http';


const { Option } = Select;
const { TextArea } = Input;


export default function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('JavaScript') //选择的文章类别

    useEffect(() => {
        getType();
        articleDetail(props.match.params.id);
    }, []);

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
    }
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
    }
    const getType = async () => {
        let res = await axios(httpPath.type);
        setTypeInfo(res.data.data);
    }
    const selectType = (value) => {
        console.log(value);
        setSelectType(value);
        console.log(selectedType)
    }
    const saveArticle = async () => {
        // console.log(`${articleTitle}-${showDate}-${selectedType}--`);
        if (!articleTitle || !articleContent || !selectedType || !introducemd) {
            message.error('请填写对应的信息');
            return;
        }
        // message.success('成功');
        let article = {
            title: articleTitle,
            body: articleContent,
            addtime: showDate,
            type: selectedType,
            content: introducemd
        }
        let res;
        if(articleId){
            article.id = articleId;
            res = await axios.put(httpPath.updateArticle, article);
        }else{
            res = await axios.post(httpPath.addArticle, article);
        }
        if (res.data.code === 200) {
            message.success(res.data.data);
        } else {
            message.error(res.data.data);
        }
    }

    const articleDetail = async (id) => {
        let res = await axios(`${httpPath.articleDetail}/${id}`);
        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].content)
        let html = marked(res.data.data[0].content)
        setMarkdownContent(html)
        setIntroducemd(res.data.data[0].body)
        let tmpInt = marked(res.data.data[0].body)
        setIntroducehtml(tmpInt)
        setShowDate(res.data.data[0].addTime)
        setSelectType(res.data.data[0].type)
        setArticleId(res.data.data[0].id);
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input value={articleTitle} placeholder='博客标题' size='large' onChange={(e) => setArticleTitle(e.target.value)} />
                        </Col>
                        <Col span={4}>
                            <Select value={selectedType} defaultValue={selectedType} size='large' onChange={selectType}>
                                {typeInfo.map((item, index) => <Option key={index} value={item.type}>{item.type}</Option>)}
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className='markdown-content'
                                value={articleContent}
                                rows={35} placeholder='文章内容'
                                onChange={changeContent} />
                        </Col>
                        <Col span={12}>
                            <div className='show-html' dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size='large'>暂存文章</Button>
                            <Button size='large' type='primary' onClick={saveArticle}>保存文章</Button>
                        </Col>
                        <Col span={24}>
                            <TextArea value={introducemd} onChange={changeIntroduce} rows={4} placeholder='文章简介'>

                            </TextArea>
                            <div className='introduce-html' dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
                        </Col>
                        <Col span={12}>
                            <div className='date-select'>
                                <DatePicker placeholder='发布日期' size='large' onChange={(date, dateString) => setShowDate(dateString)} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
