
const ErrorComp = ({er}) =>{

  if(er){
    return(
      <div className='error'>
        {er}
      </div>
    )
  }
}

export default ErrorComp