import React, { useState } from 'react';
import { Button, Card, Icon, Input, Spin, message } from 'antd';
import '../static/css/Login.css';

import httpPath from '../config/http';
import axios from 'axios';


export default function Login(props) {
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoanding, setIsLoanding] = useState(false);

    const check_login = async () => {
        if (!userName || !password) return message.error('请输入必要信息');
        setIsLoanding(true);
        let res = await axios.post(httpPath.Login, { email: userName, password: password });
        setIsLoanding(false);
        if (res.data.code === 200) {
            sessionStorage.setItem('openId', res.data.open);
            message.success(res.data.data);
            props.history.push('/index');
        } else {
            message.error(res.data.data);
        }
    }
    return (
        <div className='login-div'>
            <Spin tip='loading...' spinning={isLoanding}>
                <Card title='林三心 Blog Admin' bordered={true} style={{ width: 400 }}>
                    <Input id='userName'
                        autoComplete={true}
                        size='large'
                        placeholder='请输入你的用户名'
                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25' }} />}
                        onChange={(e) => { setuserName(e.target.value) }} /><br /><br />
                    <Input.Password id='password'
                        autoComplete={true}
                        size='large'
                        placeholder='请输入你的密码'
                        prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25' }} />}
                        onChange={(e) => { setPassword(e.target.value) }} /><br /><br />

                    <Button type='primary' size='large' block onClick={check_login}>Login</Button>
                </Card>
            </Spin>
        </div>
    )
}
