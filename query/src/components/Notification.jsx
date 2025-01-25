const Notification = ({message, errorMessage}) => {

    if (message === null) {
        return null
        }
    

      return (
        <div className = {errorMessage ? 'error' : 'success'}>
          {message}
        </div>    
    )
  }
  
  export default Notification