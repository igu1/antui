import React, { useState, useEffect, Children } from 'react';
import { Modal, Progress, Upload } from 'antd'
import { storage, db } from './firebase'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownloadOutlined,
  HomeOutlined,
  UserOutlined,
  FileAddOutlined,
  LogoutOutlined,
  StarFilled,
  InboxOutlined
} from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import HomeContentPage from './components/HomeContentPage';
import DownloadContentPage from './components/DownloadContentPage';
import AboutMeContent from './components/AboutMeContent';
import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;
const { Dragger } = Upload;


const App = () => {
  const [Nav, setNav] = useState('1');
  const [collapsed, setCollapsed] = useState(false);

  const [modelTitle, setmodelTitle] = useState('Title');
  const [open, setOpen] = useState(false);
  const [modelLoading, setmodelLoading] = useState(false);
  const [modelChildren, setmodelChildren] = useState();


  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileList, setFileList] = useState([]);

  const handleUpload = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded files
    fileList = fileList.slice(-5);

    // Update the state with the new file list
    setFileList(fileList);

    // Upload the file to Firebase Storage
    const file = info.file;
    const storageRef = ref(storage, 'uploads/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track the upload progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress)
        setUploadProgress(progress);
      },
      (error) => {
        // Handle upload error
        console.error('File upload failed: ' + error.message);
      },
      () => {
        // Handle upload completion
        console.log('File uploaded successfully!');
      }
    );
  };

  const handleRemove = (file) => {
    // Remove the file from the file list
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const props = {
    name: 'file',
    multiple: true,
    fileList: fileList,
    beforeUpload: () => false, // Prevent immediate upload
    onChange: handleUpload,
    onRemove: handleRemove,
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuChange = (selectedItem) => {
    setNav(selectedItem.key);
  };


  const getComponentName = () => {
    let name;

    switch (Nav) {
      case '1':
        return 'Home'
      case '2':
        return 'Downloads'
      case '3':
        return "About Us"
    }

    return name
  }

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[Nav]}
            onClick={handleMenuChange}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Home',
              },
              {
                key: '2',
                icon: <DownloadOutlined />,
                label: 'Downloads',
              },
              {
                key: '3',
                icon: <StarFilled />,
                label: 'Favorites',
              },
              {
                key: '4',
                icon: <UserOutlined />,
                label: 'About Me',
              },
              {
                key: '5',
                icon: <LogoutOutlined />,
                label: 'Logout',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            {Nav === '2' && <Button
              type="text"
              icon={collapsed ? <FileAddOutlined /> : <FileAddOutlined />}
              onClick={() => {
                setmodelTitle("Upload You File")
                setmodelChildren(
                  <>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                    <Progress percent={uploadProgress}></Progress>
                  </>
                )
                setOpen(true)
              }}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />}
          </Header>
          <Breadcrumb style={{ marginLeft: '16px', marginTop: '16px' }}
            items={[
              {
                title: getComponentName(),
              },
              {
                title: <a href="">Application Center</a>,
              },
              {
                title: <a href="">Application List</a>,
              },

            ]}
          />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              height: '100%',
              background: colorBgContainer,
              overflow: 'scroll'
            }}
          >
            {Nav === '1' && <HomeContentPage />}
            {Nav === '2' && <DownloadContentPage style={{ padding: '16px' }} setOpen={setOpen} setmodelLoading={setmodelLoading} setmodelChildren={setmodelChildren} />}
            {Nav === '4' && <AboutMeContent />}
          </Content>
        </Layout>
      </Layout>
      <Modal
        title={modelTitle}
        open={open}
        onOk={() => setOpen(false)}
        confirmLoading={modelLoading}
        onCancel={() => setOpen(false)}
      >
        {modelChildren}
      </Modal>
    </>
  );
};

export default App;
