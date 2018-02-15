import React from 'react';

const Timer = (props) =>{


  if(props.time>=60){
  return (<p>
     times up!
  </p>);
}else{
  return (<p>
    {props.time}
  </p>);
}


}
export default Timer;
