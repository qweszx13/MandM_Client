
import { useEffect,useState } from "react";
import {mbtiInfo} from "../../../mbtiInfo"
import { Layout,Button,Typography,Tooltip } from 'antd';
import { post, postList, postView } from "../../../apis/contents";
import HomePostModal from "./HomePostModal/HomePostModal";
import { Pagination } from 'antd';
import { Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import HomeEachContentMbtiModal from "./HomeEachContentMbtiModal/HomeEachContentMbtiModal";


const { Header, Content } = Layout;
const { Title } = Typography;

function HomeContentMbti({homeCategoryKey,userInfo}){

  const userMbti = userInfo.mbti.toUpperCase();
  const useKey = homeCategoryKey-1;
  const [reRenderContentFlag,setReRenderFlage] = useState(false);
  const mbti = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"];
  const [mbtiPage,setMbtiPage] = useState(0);

  useEffect(()=>{//mbti 변경점
    userPostList(1,mbti[homeCategoryKey-1]);
  },[homeCategoryKey])

  useEffect(()=>{
    userPostList(1,mbti[homeCategoryKey-1]);
  },[reRenderContentFlag])

  const [resultPostList,setResultPostList]  = useState([])

  const columns = [
    {
      title: '닉네임',
      dataIndex: 'account_id',
    },
    {
      title: '내용',
      dataIndex: 'setDescription',
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 150,
            textOverflow: "ellipsis",
            overflow: "hidden"
          }
        }
      },
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
    },
    {
      title: 'Views',
      dataIndex: 'views',
    },
    {
      title: '게시글 보기',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <Tooltip title="게시글 보기">
                      <Button shape="circle" icon={<SearchOutlined />} onClick={()=>{}}/>
                    </Tooltip>
    }
  ];

  

  const userPostList = async (page,mbti)=>{
    try{
      const result = await postList(page,mbti);
      setMbtiPage(result.data.count);
      const postArray = result.data.data;
      postArray.map((i)=>{
        i.setDescription = i.description.replace(/(<([^>]+)>)/ig,"");
      })
      setResultPostList(result.data.data);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  const headerStyle = {
    marginTop:"5px",
    height:"30%",
    borderRadius:"20px",
    display:"flex",
    padding:"10px",
    backgroundColor:mbtiInfo[useKey].color,
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const [isEachModalVisible, setIsEachModalVisible] = useState(false);

  const [isPostInfo,setIsPostInfo] = useState([])
  
  const postViewSet = async (postId)=>{
    try{
      const result = await postView(postId);
      setReRenderFlage(!reRenderContentFlag);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  const showEachModal = (rowIndex) => {
    setIsPostInfo(resultPostList[rowIndex]);
    postViewSet(resultPostList[rowIndex].id)
    setIsEachModalVisible(true);
  };
  
  return (
    <div>
       <Layout style={{width:"100%",height:"100%"}}>

        <Header style={headerStyle} >
          <img src={mbtiInfo[useKey].mbtiImage} style={{boxShadow: "5px 5px 5px #000",marginRight:"20px",width:"120px",height:"120px",borderRadius:"70%"}}/>
          <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"row"}}>
              <Title level={1}>{mbtiInfo[useKey].mbtiKinds}</Title>
              <Title style={{color:"#696969",marginTop:"10px",marginLeft:"20px"}} level={4}>{mbtiInfo[useKey].mbtiExplanation}</Title>
              {
                mbtiInfo[useKey].mbtiKinds === userMbti
                ? <Button type="primary" onClick={showModal} style={{marginLeft:"auto",zIndex:"-0"}}>
                    글 작성
                  </Button>
                :null
              }
              <HomePostModal 
              isModalVisible={isModalVisible} 
              setIsModalVisible={setIsModalVisible} 
              userInfo={userInfo}
              setReRenderFlage={setReRenderFlage}
              reRenderContentFlag={reRenderContentFlag}
              ></HomePostModal>
              
              
            </div>
            <Title level={4}>{mbtiInfo[useKey].mbtiCharacteristic}</Title>
          </div>
        </Header>

        <Content style={{ height:"100%",marginBottom:"15px",marginTop:"10px" }}>
          <Table columns={columns} dataSource={resultPostList} size="middle" pagination={false} style={{textOverflow:"ellipsis"}}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  showEachModal(rowIndex);
                } // click row
              };
            }}
          />
          {//컴포넌트 해제위해 if문 작성
            isEachModalVisible === true
            ? <HomeEachContentMbtiModal 
            isEachModalVisible={isEachModalVisible} 
            setIsEachModalVisible={setIsEachModalVisible} 
            userInfo={userInfo}
            isPostInfo={isPostInfo}
            reRenderContentFlag={reRenderContentFlag}
            setReRenderFlage={setReRenderFlage}
            ></HomeEachContentMbtiModal>
            :null
          }
         
        </Content>
        <div style={{ width:"100%",textAlign:"center"}}>
            <Pagination
              defaultCurrent={1}
              total={mbtiPage}
              onChange={(e)=>{userPostList(e,mbti[homeCategoryKey-1]);}}
            />
        </div>

      </Layout>

      
    </div>
  )
}

export default HomeContentMbti;