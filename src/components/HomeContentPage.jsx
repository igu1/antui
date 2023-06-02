import React, { useState } from 'react'
import ContentBox from './ContentBox'
import { Button } from 'antd'
import {
  UserOutlined
} from '@ant-design/icons';
function HomeContentPage() {

  const [fun, setfun] = useState({ loading: false, fun: '' });


  const handlefunClick = async () => {
    setfun({ loading: true });
    const url = 'https://deez-nuts-jokes.p.rapidapi.com/jokes?max_results=1';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '66c21697f6mshb8c624d983eb822p10d6e7jsnd72ba434fb4c',
        'X-RapidAPI-Host': 'deez-nuts-jokes.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setfun({ loading: false, fun: result.data[0].prompt });

    } catch (error) {
      console.error(error);
    }
  }

  const handleFunReplay = () => {
    setfun({ fun: '' });
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <ContentBox height={'200px'} width={'20%'} heading={'Fun Box'}>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p>{fun.fun === '' ? fun.replay : fun.fun}</p>
            <Button style={{ marginTop: 24 }} loading={fun.loading} onClick={handlefunClick}> Get Replay</Button>
          </div>
        </ContentBox>
        <ContentBox height={'200px'} width={'80%'} heading={'Latest Uploads'}>

        </ContentBox>
      </div>
      <div style={{ display: 'flex' }}>
        <ContentBox height={'200px'} width={'80%'} heading={'User Analytics'}>

        </ContentBox>
        <ContentBox style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} height={'200px'} width={'20%'}>
          <h1 style={{ fontSize: '50px' }}>1000+</h1>
          <h3>Users</h3>
        </ContentBox>
      </div>
    </>
  )
}

export default HomeContentPage