import { Avatar, Divider } from 'antd';
import '../public/style/components/author.css';

export default function Author() {
    return (
        <div className='author-div comm-box'>
            <div><Avatar size={100} src='http://blogimages.jspang.com/blogtouxiang1.jpg' /></div>
            <div className='author-introduction'>
                我是要成为全栈的男人啊
                <Divider>社交账号</Divider>
                <Avatar size={28} icon='github' className='account' />
                <Avatar size={28} icon='qq' className='account' />
                <Avatar size={28} icon='wechat' className='account' />
            </div>
        </div>
    )
}
