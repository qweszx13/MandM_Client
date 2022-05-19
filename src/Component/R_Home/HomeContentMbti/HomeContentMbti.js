
import { useEffect,useState } from "react";
import {mbtiInfo} from "../../../mbtiInfo"
import { Layout,Avatar,Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

function HomeContentMbti({homeCategoryKey}){
  const useKey = homeCategoryKey-1;
  const [selectedMbti,setSelectedMbti] = useState("");
  const mbti = ["INTJ","INTP","INFJ","INFP","ISTJ","ISFJ","ISTP","ISFP","ENTJ","ENTP","ENFJ","ENFP","ESTJ","ESFJ","ESTP","ESFP"];
 
  useEffect(()=>{
    setSelectedMbti(mbti[homeCategoryKey]);
  },[homeCategoryKey])

  const headerStyle = {
    marginTop:"5px",
    height:"30%",
    borderRadius:"20px",
    display:"flex",
    padding:"10px",
    backgroundColor:mbtiInfo[useKey].color
  }

  
  
  return (
    <div>
       <Layout style={{width:"100%",height:"100%"}}>

        <Header style={headerStyle} >
          <img src={mbtiInfo[useKey].mbtiImage} style={{boxShadow: "5px 5px 5px #000",marginRight:"20px",width:"120px",height:"120px",borderRadius:"70%"}}/>
          <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"row"}}>
              <Title level={1}>{mbtiInfo[useKey].mbtiKinds}</Title>
              <Title style={{color:"#696969",marginTop:"10px",marginLeft:"20px"}} level={4}>{mbtiInfo[useKey].mbtiExplanation}</Title>
              <button style={{marginLeft:"auto"}}> 글작성 버튼 공간</button>
            </div>
            <Title level={4}>{mbtiInfo[useKey].mbtiCharacteristic}</Title>
          </div>
        </Header>

        <Content>Content</Content>

      </Layout>

      
    </div>
  )
}

export default HomeContentMbti;