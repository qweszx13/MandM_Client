import styles from "./HomeHeader.module.css";
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

function HomeHeader(){

  return (
    <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center"}}>
      <h1 style={{color:"white",paddingLeft:"10px",paddingTop:"8px",overflow:"hidden"}}>MBTI 성격 유형</h1>
      <ArrowRightOutlined />
      <div style={{height:"80%",backgroundColor:"#E7DFEA",marginLeft:"5px",borderRadius:"10px",display:"flex",alignItems:"center"}}>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj')}}>INTJ</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp')}}>INTP</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj')}}>ENTJ</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp')}}>ENTP</Button>
        
      </div>
      <div style={{height:"80%",backgroundColor:"#D6EBE2",marginLeft:"5px",borderRadius:"10px",display:"flex",alignItems:"center"}}>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj')}}>INFJ</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp')}}>INFP</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfj')}}>ENFJ</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp')}}>ENFP</Button>
      </div>
      <div style={{height:"80%",backgroundColor:"#D9E9F0",marginLeft:"5px",borderRadius:"10px",display:"flex",alignItems:"center"}}>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istj')}}>ISTJ</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj')}}>ISFJ</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj')}}>ESTJ</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj')}}>ESFJ</Button>
      </div>
      <div style={{height:"80%",backgroundColor:"#F9EDD6",marginLeft:"5px",borderRadius:"10px",display:"flex",alignItems:"center"}}>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp')}}>ISTP</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp')}}>ISFP</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estp')}}>ESTP</Button>
        <Button type="link" onClick={()=>{window.open('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp')}}>ESFP</Button>
      </div>
     
    </div>
  )
}

export default HomeHeader;