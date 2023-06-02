import React, { useState } from 'react';
import { Input, List, Tooltip, Avatar, Space } from 'antd';
import { FileSearchOutlined, InfoCircleOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import ContentBox from './ContentBox';

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const data = [
    {
        href: 'https://ant.design',
        title: 'Abode PhotoShop',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    },
    {
        href: 'https://ant.design',
        title: 'Descript',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    },
];

function DownloadContentPage({ setOpen, setmodelLoading, setmodelChildren }) {
    const [searchValue, setSearchValue] = useState({ value: '', error: false });
    const [filteredData, setFilteredData] = useState(data);

    const handleSearchSoft = (e) => {
        const value = e.target.value;
        if (value.includes('@')) {
            setSearchValue({ value: value, error: true });
        } else {
            setSearchValue({ value: value, error: false });
            const filtered = data.filter((item) =>
                item.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 style={{ marginBottom: '16px' }}>Softwares</h1>
                <Input
                    style={{ marginBottom: '16px', width: '20%', float: 'right' }}
                    placeholder="Search for your software"
                    prefix={<FileSearchOutlined className="site-form-item-icon" />}
                    onChange={handleSearchSoft}
                    value={searchValue.value}
                    suffix={
                        <Tooltip title="Extra information">
                            <InfoCircleOutlined
                                style={searchValue.error ? { color: 'red' } : { color: '#1890ff' }}
                            />
                        </Tooltip>
                    }
                />
            </div>
            <hr />
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={filteredData} // Use filteredData instead of data
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </>
    );
}

export default DownloadContentPage;
