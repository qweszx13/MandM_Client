import { Modal } from 'antd';
import { useState } from 'react';
import { post } from '../../../../apis/contents';
import { message } from 'antd';
import Editor from './custom-ckeditor5/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
  toolbar: {
      items: [
          'heading', '|',
          'fontfamily', 'fontsize', '|',
          'alignment', '|',
          'fontColor', 'fontBackgroundColor', '|',
          'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
          'link', '|',
          'outdent', 'indent', '|',
          'bulletedList', 'numberedList', 'todoList', '|',
          'code', 'codeBlock', '|',
          'insertTable', '|',
          'uploadImage', 'blockQuote', '|',
          'undo', 'redo'
      ],
  },
  simpleUpload: {
      //업로드될 url
      uploadUrl:'http://54.180.122.20:3000/upload/image',
      headers:{
          //jwt 토큰
          Authorization:`Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      }
  }
};

function HomePostModal({isModalVisible,setIsModalVisible,userInfo,reRenderContentFlag,setReRenderFlage}){ 
  const [text, setText] = useState("");
  const [textView,setTextView] = useState("<p>글을 작성해주세요</p>")
  const [postContent,setPostContent] = useState("");
  const [textSwitch,setTextSwitch] = useState(false);

  const handleOk = async () => {   
    const userId = userInfo.id;
    const userMbti = userInfo.mbti.toUpperCase();
    console.log(postContent,userId,userMbti);
    
    const postInfo = {
      board_name: userMbti,
      account_id: userId,
      description: text
    }
    try{
        const result = await post(postInfo);
        message.success("게시글 작성완료");
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
    setTextView("글을 작성해주세요!");
    setReRenderFlage(!reRenderContentFlag);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTextView("글을 작성해주세요!");
    setIsModalVisible(false);
  };

  

  return(
    <Modal title="글 작성" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <div className="Textarea">
            <CKEditor
                editor={ Editor }
                config={ editorConfiguration }
                data={textView}//기본 데이터 받는 파라미터 db에 저장된 desc 내용 삽입 필요
                onReady={ editor => {
                    //ekeditor mounted 됐을때 실행
                    console.log( editor );
                } }
                onChange={ ( event, editor ) => {
                    //에디터 내용 변경될때마다 실행
                    const data = editor.getData();
                    setText(data)
                    console.log(text);
                } }
            />
        </div>
    </Modal>
  )
}

export default HomePostModal;