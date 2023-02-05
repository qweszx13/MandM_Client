import React, { useEffect, useState } from 'react';
import styles from'./HomePage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout,Menu } from 'antd';
import { BarChartOutlined, CloudOutlined, UserOutlined } from '@ant-design/icons';
import HomeHeader from '../../Component/R_Home/HomeHeader/HomeHeader';
import HomeContentMbti from '../../Component/R_Home/HomeContent/HomeContentMbti';
import HomeImg from "../../mbtiImage/HomeImg.png";
import { FrownTwoTone, SmileTwoTone } from '@ant-design/icons';
import tokenInstance from '../../apis/tokenInstance';

const { Header, Sider, Content } = Layout;

function HomePage(){
  const { state } = useLocation();
  const userInfo = state;
  const navigate = useNavigate();
  
  useEffect(()=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    tokenInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (!localStorage.getItem("ACCESS_TOKEN")) {
      alert("로그인이 필요한 기능입니다!");
      navigate("/")
    }
  },[])

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
          if(userInfo.mbti.toUpperCase()===mbti[subKey-1]){
            return { 
              key: subKey,
              label:mbti[subKey-1]+"  ✡ MY MBTI ✡",
            };
          }else{
            return { 
              key: subKey,
              label: mbti[subKey-1],
              
            };
          }
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
          <h1 style={{fontSize:"20px"}}><span style={{color:"#ea827e"}}>{userInfo.id}</span> One's MBTI</h1>
          <h4>My MBTI Is <span style={{color:"#3573a5"}}>{userInfo.mbti.toUpperCase()}</span></h4>
        </div>
        <div>
          
        </div>
        <Menu
          mode="inline"
          defaultOpenKeys={[1]}
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

        <Header style={{textAlign:"center",color:"white",padding:"0px",width:"100%",position:"fixed",zIndex:"10"}}>
         <HomeHeader></HomeHeader>
        </Header>

        <Content style={{paddingTop:"64px"}}>
          {//mbti 게시글
            16>=homeCategoryKey>=1
            ?<HomeContentMbti homeCategoryKey={homeCategoryKey} userInfo={userInfo}></HomeContentMbti>
            : homeCategoryKey===17
            ?<div>
              <div style={{display:"flex",justifyContent:"center",fontSize:"50px",textAlign:"center"}} >
                  <FrownTwoTone style={{marginTop:"15px",marginRight:"10px"}} twoToneColor="#545CCB"/>
                  차트기능은 추후 추가 될 예정입니다
                  
              </div>
            </div>//차트항목  17번
            : homeCategoryKey===18 
            ?<div>
              <div style={{display:"flex",justifyContent:"center",fontSize:"50px",textAlign:"center"}} >
                  <FrownTwoTone style={{marginTop:"15px",marginRight:"10px"}} twoToneColor="#545CCB"/>
                  추가기능은 추후 추가 될 예정입니다
                </div>
            </div>//추가기능  18번
            : <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{display:"flex",justifyContent:"center",fontSize:"50px",textAlign:"center"}} >
                  <FrownTwoTone style={{marginTop:"15px",marginRight:"10px"}} twoToneColor="#545CCB"/>
                  웃고 울고 떠들고 MandM과 함께
                  <SmileTwoTone style={{marginTop:"15px",marginLeft:"10px"}} twoToneColor="#545CCB"/>
                </div>
                
                <img style={{width:"75%",height:"75%",marginTop:"10px",borderRadius:"20px"}} src={HomeImg}></img>
              </div>
          }
        </Content>
      </Layout>
      
    </Layout>
  )
}
export default HomePage;