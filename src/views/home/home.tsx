import React from "react";
import s from './home.module.scss'
import Sign from "../../components/sign/sign";

import cloud_1 from '../../assets/clouds/cloud_1.png';
import cloud_2 from '../../assets/clouds/cloud_2.png';

function Home(): React.ReactElement {
  return (
    <div className={s.main}>
        {
          [...Array(5)].map((_, index) => (
            <img key={index} src={cloud_2} alt={`cloud_${index}`} className={s.cloud_2} style={{ left: `${index * 20}%`, top: `75%`}}/>
          ))
        }
        {
          [...Array(3)].map((_, index) => (
            <img key={index} src={cloud_2} alt={`cloud_${index}`} className={s.cloud_3} style={{ left: `${index * 30}%`, top: `75%`}}/>
          ))
        }
        <Sign/>
        <img src={cloud_1} alt="cloud_1" className={s.cloud_1}/>
    </div>
  )
}

export default Home;