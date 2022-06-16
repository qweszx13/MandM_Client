import { useState,useRef } from 'react';
import { Modal,Input } from 'antd';
import { commentPost } from '../../../../../apis/contents';
import { message } from 'antd';

const { TextArea } = Input;

function EachContentCommentModal({setCommentModalVisible,commentModalVisible,userInfo,isPostInfo,modalRerender,setModalReRender}){
  const [stateComment,setStateComment] = useState("");
  const refComment = useRef();

  const handleOk = () => {
    setCommentModalVisible(false);
    console.log(refComment.current.resizableTextArea.props.value);
    userPostComment(isPostInfo.id,userInfo.id)
    setStateComment("");
  };

  const handleCancel = () => {
    setCommentModalVisible(false);
  };

  const userPostComment = async (post_id,account_id)=>{
    const commentInfo = {
      post_id : post_id,
      account_id : account_id,
      description : refComment.current.resizableTextArea.props.value
    }
    try{
      const result = await commentPost(commentInfo);
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
      <Modal title="Comment" visible={commentModalVisible} onOk={handleOk} onCancel={handleCancel} okText="작성" cancelText="취소">
        <TextArea ref={refComment} value={stateComment} rows={4} placeholder="상대방을 비방하는 목적의 글은 제지당할수있습니다," maxLength={100} id="textArea" onChange={(e)=>{
          setStateComment(e.target.value);
        }}/>
      </Modal>
    </>
  );

}

export default EachContentCommentModal;