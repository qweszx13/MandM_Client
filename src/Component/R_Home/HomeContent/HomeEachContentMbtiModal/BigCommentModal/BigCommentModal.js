import { Modal } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import { Avatar, List, message  } from 'antd';
import VirtualList from 'rc-virtual-list';
import { commentList } from '../../../../../apis/contents';
import { mbtiInfo } from '../../../../../mbtiInfo';
import { useState,useEffect, useRef} from 'react';
import { Button,Input } from 'antd';
import { bigCommentPost } from '../../../../../apis/contents';






function BigCommentModal ({
  bigCommentShowModal,
  setBigCommentShowModal,
  isPostInfo,
  userInfo,
  item
}){
  const postInfo = item;
  
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
    setBigCommentShowModal(false);
  };
  const [data, setData] = useState([]);
  const [myPage,setMyPage] = useState(1);
  const ContainerHeight = 400;

  const appendData = async (page,id)=>{
    try{
      const result = await commentList(page,id);
      setMyPage(1+myPage);
      const newData = result.data.data;
      const realData = newData.filter(x => x.parent_comment_id !== null)
      setData(data.concat(realData.filter(x => x.parent_comment_id === item.id)));
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

  const inputRef = useRef();

  const commentOK = async ()=>{
    const commentInfo = {
      post_id : isPostInfo.id,
      account_id : userInfo.id,
      description : inputRef.current.input.value,
      parent_comment_id : postInfo.id
    }
    try{
      const result = await bigCommentPost(commentInfo);
      console.log(result);
      message.success("댓글 작성완료");
      setModalReRender(!modalRerender);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  
  }
  

  return (
    <>
      <Modal title={userInfo.mbti.toUpperCase()} 
      visible={bigCommentShowModal}
      onCancel={handleOk} 
      mask={false}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
            확인
        </Button>
      ]}
      closable={false}
      okText="닫기"
      cancelText= {<HeartOutlined />}
      >
        <div style={{border:"0.1px solid black",padding:"5px",borderRadius:"5px",marginBottom:"15px",height:"auto",backgroundColor:"#effff1"}}>
          <p>Date for {displayCreatedAt(postInfo.created_at)}</p>
          <hr></hr>
          <h3 style={{color:"#c0c8d1",margin:"0px "}}>{postInfo.account_id}님 의 댓글 </h3>
          <div style={{width:"100%",height:"100%"}}>
            {postInfo.description}
          </div>
        </div>
        <div style={{marginBottom:"15px",display:"flex",flexDirection:"column"}}>
        <Input.Group compact>
          <Input
            ref={inputRef}
            style={{
              width: 'calc(100% - 57px)',
              borderRadius:"5px 0px 0px 5px"
            }}
            placeholder="댓글에 공감하는 글을 써볼까요?"
          />
          <Button type="primary" style={{borderRadius:"0px 5px 5px 0px"}} onClick={commentOK}>등록</Button>
        </Input.Group>
        </div>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            borderRadius:"5px"
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
                    title={<a href="##">{item.account_id}</a>}
                    description={item.description}
                  />
                  <p style={{textAlign:"center"}}>{item.mbti.toUpperCase()}</p>
                </List.Item>
              )}
            </VirtualList>
          </List>
        </div>

        

      </Modal>
    </>
  );


}

export default BigCommentModal;