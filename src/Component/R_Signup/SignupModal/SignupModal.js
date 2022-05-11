import { Modal,Form, Input, Checkbox, Select, message } from 'antd';
import { useState,useRef } from 'react';

const { Option } = Select;


function SignupModal({isModalVisible,setIsModalVisible}){

    const signUpId = useRef();
    const signUpPw = useRef();
    const signUpAgree = useRef();
    const [signUpMbti,setSignUpMbti] = useState("INTJ");

    
    const postSignUp = () =>{

    }
    

    const handleOk = () => {
      console.log(signUpId.current.input.value);
      console.log(signUpPw.current.input.value);
      console.log(signUpAgree.current.input.checked);
      console.log(signUpMbti);
      const id = signUpId.current.input.value;
      const pw = signUpPw.current.input.value;
      const agree =  signUpAgree.current.input.checked;
      if(id.trim() !== '' && pw.trim() !== '' && agree === true){
        console.log("회원가입 포스트 ㄱ");
      }else{
        message.warn("양식을 채워주세요!");
      }
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const selectHandleChange = (value)=>{
      setSignUpMbti(`${value}`);
    }


    return (
      <>
        <Modal title="M&M 회원가입" 
        visible={isModalVisible} 
        onOk={handleOk}
        onCancel={handleCancel} 
        cancelText="취소"
        okText="회원가입"
        >
           <Form
            name="basic"
            wrapperCol={{
              offset:1,
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="UserName"
              name="username"
              wrapperCol={{
                offset: 1,
                span: 24,
              }}
              rules={[
                {
                  required: true,
                  message: '아이디를 입력해주세요!',
                },
              ]}
            >
              <Input ref={signUpId} />
            </Form.Item>

            <Form.Item
              label="PassWord"
              name="password"
              wrapperCol={{
                offset: 1,
                span: 24,
              }}
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력해주세요!',
                },
              ]}
            >
              <Input.Password ref={signUpPw}/>
            </Form.Item>

            <Form.Item 
            label="UserMBTI"
            name="requiredMarkValue"
            rules={[
              {
                required: true,
                message: 'MBTI 선택은 필수입니다!',
              },
            ]}
            wrapperCol={{
              offset: 1,
              span: 24,
            }}
            >
              <Select defaultValue="INTJ" style={{ width: 120 }} onChange={selectHandleChange} ref={signUpMbti}>
                <Option value="INTJ">INTJ</Option>
                <Option value="INTP">INTP</Option>
                <Option value="INFJ">INFJ</Option>
                <Option value="INFP">INFP</Option>
                <Option value="ISTJ">ISTJ</Option>
                <Option value="ISFJ">ISFJ</Option>
                <Option value="ISTP">ISTP</Option>
                <Option value="ISFP">ISFP</Option>
                <Option value="ENTJ">ENTJ</Option>
                <Option value="ENTP">ENTP</Option>
                <Option value="ENFJ">ENFJ</Option>
                <Option value="ENFP">ENFP</Option>
                <Option value="ESTJ">ESTJ</Option>
                <Option value="ESFJ">ESFJ</Option>
                <Option value="ESTP">ESTP</Option>
                <Option value="ESFP">ESFP</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="remember"
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Checkbox ref={signUpAgree}>개인정보 처리방침에 동의합니다.</Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  
}

export default SignupModal;