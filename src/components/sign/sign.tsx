import React from "react";
import s from './sign.module.scss'
import sign_img from '../../assets/sign/sign_background.png';
import sign_text from '../../assets/sign/sign_text.png';
import sign_light from '../../assets/sign/sign_light.png';


function Sign(): React.ReactElement {
  return (
    <div className={s.main}>
        <img src={sign_light} alt="sign_light" className={s.sign_light}/>
        <img src={sign_text} alt="sign_text" className={s.sign_text}/>
        <img src={sign_img} alt="sign_img" className={s.sign_img}/>
    </div>
  )
}

export default Sign;