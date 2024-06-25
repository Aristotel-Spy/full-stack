const Notification = ({ notif }) => {

  if(notif) {
    return(
      <div className='notif'>
        {notif}
      </div>
    )
  }
}
export default Notification