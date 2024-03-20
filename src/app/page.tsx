"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { getClientToken } from "@/lib/firebaseInit";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {

  const clientPermission = () => {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {alert('푸시 거부됨');}
      else {alert('푸시 승인됨');}
    });
  };

  async function msgTest(){
    const token = await getClientToken();
    console.log(token)

    const message = {
      data: {
        title:'fcm test',
        body:'fcm.......',
        icon:'https://cdn-icons-png.flaticon.com/512/4788/4788733.png',
        image: 'https://i.namu.wiki/i/sYSJY7DwDYvqCrRvxzAgqpbm7EQzxE6jKPBhRBJGLwRzWvA-uj3YEQjgAVfR1snu3tian_0NYAtv2b06664WkA.webp',
        click_action:'https://www.naver.com',
      },
      token
    };

    axios({
      method: 'POST',
      url:'/api',
      data: { message },
    });


  }

  useEffect(()=>{
    if('navigator' in window){
      navigator.serviceWorker.register('/firebase-messaging-sw.js',{scope:'/firebase-cloud-messaging-push-scope'})
    }
  },[])


  return (
    <div>
      <h2>FCM TEST</h2>
      <button onClick={clientPermission}>권한허용</button>
      <button onClick={msgTest}>토큰발행</button>
    </div>
  );
}
