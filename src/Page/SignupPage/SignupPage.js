import styles from'./SignupPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Input,Button,Checkbox,Form,message} from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { accountLogin } from '../../apis/account';
import { test } from '../../apis/account';
import slogun from '../../mbtiImage/slogun.jpg'
import logo from '../../mbtiImage/MandM.png'


import SignupModal from '../../Component/R_Signup/SignupModal/SignupModal';
import { useState } from 'react';



function SignupPage() {
  
  console.log(localStorage.getItem("userToken"));

  const navigate = useNavigate();

  const onRememberMeClick = ()=>{

  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSignupClick = ()=>{
    setIsModalVisible(true);
  }


  const onLoginSucces = async (values)=>{
    try{
      const result = await accountLogin(values.username,values.password);
      localStorage.setItem('ACCESS_TOKEN',result.data.token);
      message.success("로그인 성공");
      const allInfo =  result.data;
      delete allInfo.token; 
      const userInfo = allInfo;
      navigate("/MandM",{ state: userInfo });
    }catch ({
      response: {
        data: { result },
      },
    }) {
      message.warn("로그인 실패");
    }
}

  const onLoginFailed = (errorInfo) => {
    message.error("입력란을 확인해주세요");
  };

  const test = ()=>{
    fetch('http://localhost:3000/api/kanji')
  .then((response) => response.json())
  .then((data) => console.log(data));
  } 


  return (
    <div className={styles.Wrap}>
      <Layout style={{display:"flex",flexDirection:"row",height:"100vh",width:"100%"}}>
        <div className={styles.image} style={{backgroundColor:"white"}}>
          <img style={{width:"100%",height:"100%"}} src={slogun} alt="이미지 ㅇㅇ"></img>
        </div>

        <div className={styles.contents}style={{backgroundColor:"black"}}>
          <div className={styles.subBox}>
            <img style={{width:"70px",height:"80px",marginTop:"10px"}} src={logo} alt="로고 2"></img>
            <h2 style={{color:"#C0C0C0",fontSize:"2rem"}}>M&M</h2>
            <h1 style={{color:"white",fontSize:"3rem" , marginBottom:"0px"}}>모두의 MBTI로 소통하기</h1>
            <Button className={styles.signupButton} type="primary" style={{backgroundColor:"#6495ED",borderColor:"#6495ED"}} onClick={ test
            } >테스트</Button>
            <p style={{fontSize:"1.5rem", marginTop:"5px"}}>MBTI communication</p>
            <div style={{display:"flex",flexDirection:"column",width:"40%"}}>

            <Form
              name="basic"
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onLoginSucces}
              onFinishFailed={onLoginFailed}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '아이디를 입력해주세요',
                  },
                ]}
              >
                <Input size="large" placeholder="ID" prefix={<UserOutlined />}/>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '비밀번호를 입력해주세요',
                  },
                ]}
              >
                <Input.Password size="large" placeholder="PW" prefix={<LockOutlined />}/>
              </Form.Item>

              

              <Form.Item
                style={{marginBottom:"0px"}}
                wrapperCol={{
                  span: 24
                }}
              >
                <Button className={styles.loginButton} type="primary" htmlType="submit" style={{width:"100%",backgroundColor:"#6495ED",borderColor:"#6495ED"}} >로그인</Button>
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Checkbox style={{color:"white"}}>Remember me</Checkbox>
              </Form.Item>
            </Form>
            
              <div style={{display:"flex",flexDirection:"row",marginBottom:"10px"}}>
                <hr style={{width:"40%",margin:"0px",marginTop:"13px",marginRight:"4%",backgroundColor:"#2F3336",borderColor:"#2F3336"}}></hr>
                <h4 style={{fontSize:"1rem",color:"#E6E9EA"}}>또는</h4>
                <hr style={{width:"40%",margin:"0px",marginTop:"13px",marginLeft:"4%",backgroundColor:"#2F3336",borderColor:"#2F3336"}}></hr>
              </div>
              
              
              <div style={{display:"flex",flexDirection:"row"}}>
                <h4 style={{fontSize:"1rem",color:"white",marginRight:"29px",paddingTop:"3px"}}>아직 회원이 아니신가요?</h4>
                <Button className={styles.signupButton} type="primary" style={{backgroundColor:"#6495ED",borderColor:"#6495ED"}} onClick={onSignupClick} >회원가입</Button>
                <SignupModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} ></SignupModal>
              </div>
              <h4 style={{fontSize:"0.4rem",color:"#71767A"}}>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</h4>

            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default SignupPage;