import React, { useState } from 'react';
import styles from'./HomePage.module.css';
import { Layout,Menu } from 'antd';
import { AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined, } from '@ant-design/icons';

import HomeHeader from '../../Component/R_Home/HomeHeader/HomeHeader';
import HomeContentMbti from '../../Component/R_Home/HomeContentMbti/HomeContentMbti';


const { Header, Footer, Sider, Content } = Layout;

function HomePage(){
  const [homeCategoryKey,setHomeCategoryKey] =  useState(20);
  const mbti = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"]

  const items = [UserOutlined,BarChartOutlined,CloudOutlined].map((icon, index) => {
    const key = String(index + 1);
    if(index === 0){
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `MBTI Community`,
        children: new Array(16).fill(null).map((_, j) => {
          const subKey = index * 16 + j + 1;
          return { 
            key: subKey,
            label: mbti[subKey-1],
          };
        }),
      };
    }else if(index === 1){
      return {
        key: 17,
        icon: React.createElement(icon),
        label: `MBTI 차트항목`,
      };
    }else if(index === 2){
      return {
        key: 18,
        icon: React.createElement(icon),
        label: `MBTI 추가기능`,
      };
    }
    
  });
  
  return(
    <Layout style={{width:"100%",height:"100vh"}}>
     <Sider width={250} className="site-layout-background" 
     style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        <div className={styles.logo}>
          <h1 style={{fontSize:"20px"}}>Every One's MBTI</h1>
        </div>
        <Menu
          mode="inline"
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={items}
          onClick={(e)=>{
            console.log(e.key);
            setHomeCategoryKey(e.key);
          }}
        />
      </Sider>

      <Layout style={{paddingLeft:"250px"}}>

        <Header style={{textAlign:"center",color:"white",padding:"0px",width:"100%",position:"fixed"}}>
         <HomeHeader></HomeHeader>
        </Header>

        <Content style={{paddingTop:"64px"}}>
          {//mbti 게시글
            16>=homeCategoryKey>=1
            ?<HomeContentMbti homeCategoryKey={homeCategoryKey}></HomeContentMbti>
            : homeCategoryKey==17
            ?<div>차트기능</div>//차트항목  17번
            : homeCategoryKey==18 
            ?<div>추가기능</div>//추가기능  18번
            :null
          }
        </Content>

        <Footer>Footer</Footer>

      </Layout>

    </Layout>
  )
}
export default HomePage;