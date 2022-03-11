const ConversationItem = ({user, posted_at, body}) => {
  return(
    <div className='col-md-10'>
        <p>Posted by {user} on {posted_at}</p>
        {body}
        {/* <a href='#'><span className='fa fa-reply'></span> &nbsp;Post a reply</a> */}
    </div>
  );
}

export default ConversationItem;