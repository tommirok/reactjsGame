import React from 'react';

import '../App.css';

 const Stars = (props) =>{
   
   let stars = [];
   for(var i = 0; i<props.numberOfStars; i++){
     stars.push(<i key={i} className='fa fa-star-o'></i>)
   }
  return(
    <div className='col-5'>

    {stars}

    </div>
  );
}
export default Stars;
