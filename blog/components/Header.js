import react, { useState, useEffect } from 'react';
import '../public/style/components/header.css';
import { Row, Col, Menu, Icon } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import httpPath from '../config/http';

const Header = () => {
    const [navArr, setNavArr] = useState([]);
    useEffect(() => {
        let getAllType = async () => {
            let res = await axios(httpPath.getAllType);
            setNavArr(res.data.data)
        }
        getAllType();
    }, [])
    
    const routerPush = (e)=>{
        if(e.key == 0){
            Router.push('/index');
        }else{
            Router.push(`/list?type=${e.key}`)
        }
    }
    return (
        <div className='header'>
            <Row type='flex' justify='center'>
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className='header-logo'>林三心</span>
                    <span className='header-txt'>我是要成为全栈的男人啊</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode='horizontal' onClick={routerPush}>
                        <Menu.Item key='0'>
                            <Icon type='home' />首页
                        </Menu.Item>
                        <Menu.Item key='video'>
                            <Icon type='youtube' />视频
                         </Menu.Item>
                        {
                            navArr.map((item) => {
                                return (<Menu.Item key={item.type}>
                                    <Icon type='home' />{item.type}
                                </Menu.Item>)
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header;
