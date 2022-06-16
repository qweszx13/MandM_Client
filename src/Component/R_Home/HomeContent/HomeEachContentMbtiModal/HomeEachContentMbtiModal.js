import { Modal } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import { Avatar, List, message  } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useState,useEffect} from 'react';
import { commentList, postLike } from '../../../../apis/contents';
import { mbtiInfo } from '../../../../mbtiInfo';
import { Button, Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import "./HomeEachContent.css";
import EachContentCommentModal from './EachContentCommentModal/EachContentCommentModal';
import BigCommentModal from './BigCommentModal/BigCommentModal';




function HomeEachContentMbtiModal ({
  isEachModalVisible,
  setIsEachModalVisible,
  userInfo,
  isPostInfo,
  reRenderContentFlag,
  setReRenderFlage  
}){
  
  function imgSrc(mbti){
    const findOb = mbtiInfo.find(x => x.mbtiKinds === mbti.toUpperCase())
    return findOb.mbtiImage
  }

  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };
  

  const handleOk = () => {
    setIsEachModalVisible(false);
  };

  const like = async () => {
    try{
      const result = await postLike(userInfo.id,isPostInfo.id);
      if(Object.keys(result.data)[0]==="like_cancel"){
        message.success("좋아요취소");
        setReRenderFlage(!reRenderContentFlag);
      }else if(Object.keys(result.data)[0]==="like_press"){
        message.success("좋아요");
        setReRenderFlage(!reRenderContentFlag);
      }
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
    
  };

  const [data, setData] = useState([]);
  const [myPage,setMyPage] = useState(1);
  const ContainerHeight = 400;

  const appendData = async (page,id)=>{
    try{
      const result = await commentList(page,id);
      console.log(myPage);
      setMyPage(1+myPage);
      setData(data.concat(result.data.data));
      
      if(result.data.data.length === 0){
        message.warning("더이상 댓글이 존재하지 않아요!");
      }
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  const [modalRerender,setModalReRender] = useState(true);
  
  useEffect(() => {
    setData([]);
    setMyPage(1);
    appendData(myPage,isPostInfo.id);
  }, [modalRerender]);

  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      setMyPage(1+myPage);
      appendData(myPage,isPostInfo.id);
    }
  };

  
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const showModal = () => {
    setCommentModalVisible(true);
  };

  const [bigCommentShowModal,setBigCommentShowModal] = useState(false);
  const [item,setItem] = useState([]);
  const showBigModal = (item) =>{
    setItem(item);
    setBigCommentShowModal(true);
    setCommentModalVisible(false);
  }
  

  return (
    <>
      <Modal title={userInfo.mbti.toUpperCase()} 
      visible={isEachModalVisible}
      onCancel={handleOk} 
      footer={[
        <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            확인
          </Button>
      ]}
      closable={false}
      okText="닫기"
      cancelText= {<HeartOutlined />}
      >
        <div style={{border:"0.1px solid black",padding:"5px",borderRadius:"5px",marginBottom:"15px",height:"480px",backgroundColor:"#EFF2F5"}}>
          <p>Date for {displayCreatedAt(isPostInfo.created_at)}</p>
          <hr style={{}}></hr>
          <h3 style={{color:"#c0c8d1",margin:"0px "}}>{isPostInfo.account_id}님 의 게시글 </h3>
          <div style={{width:"100%",height:"85%",overflow:"scroll"}}>
            <div  dangerouslySetInnerHTML={ {__html: isPostInfo.description} }>
            </div>
          </div>
        </div>
        <div style={{marginBottom:"15px"}}>
          
          <Button type="primary" style={{borderRadius:"20px"}} onClick={showModal}>Comment</Button>
          <EachContentCommentModal 
            commentModalVisible={commentModalVisible} 
            setCommentModalVisible={setCommentModalVisible}
            userInfo = {userInfo}
            isPostInfo = {isPostInfo}
            setModalReRender = {setModalReRender}
            modalRerender = {modalRerender}
          ></EachContentCommentModal>

          <Tooltip title="Like">
            <Button type="primary" shape="circle" icon={<LikeOutlined />} onClick={like} style={{float:"right"}} />
          </Tooltip>
        </div>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <List>
            <VirtualList
              data={data}
              height={ContainerHeight}
              itemHeight={47}
              itemKey="email"
              onScroll={onScroll}
            >
              {(item) => (
                <List.Item key={item.id}>  
                  <List.Item.Meta
                    avatar={<Avatar src={imgSrc(item.mbti)} />}
                    title={<a href="https://ant.design">{item.account_id}</a>}
                    description={item.description}
                  />
                  <div style={{display:"flex",flexDirection:"column",height:"50px "}}>
                    <p style={{textAlign:"center"}}>{item.mbti.toUpperCase()}</p>
                    <Button style={{color:"#2894ed",padding:"0px 15px"}} type="link" onClick={()=>{
                      showBigModal(item);
                      
                    }}>더보기</Button>
                    

                  </div>
                </List.Item>
              )}
            </VirtualList>
          </List>
        </div>

      </Modal>
      {
        bigCommentShowModal 
        ?(
          <BigCommentModal
            key={item.id}
            bigCommentShowModal = {bigCommentShowModal}
            setBigCommentShowModal = {setBigCommentShowModal}
            userInfo = {userInfo}
            isPostInfo = {isPostInfo}
            item = {item}
          ></BigCommentModal>
          )
        :null
      }
      
     
    </>
  );


}

export default HomeEachContentMbtiModal;