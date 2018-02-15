import React from 'react';

const Numbers =(props) =>{
  const numberClassName = (number) =>{
    if(props.selectedNumbers.indexOf(number) >= 0){
      return 'selected';
    }
    if(props.usedNumbers.indexOf(number) >= 0){
      return 'used';
    }
  }

  return(
    <div className="card text-center">
    <div>
      {Numbers.arrayNumbers.map((number, i)=>
        <span key={i} className={numberClassName(number)}
          onClick={() => props.selectNumbers(number) }>{number}</span>
      )}
    </div>
    </div>
  );
}
Numbers.arrayNumbers = [];
for(var i = 0; i<9; i++){
  Numbers.arrayNumbers.push(i+1)
}
export default Numbers;
