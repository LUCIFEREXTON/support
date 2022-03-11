import { formatDate } from '../helperFunction'
const ConversationItem = ({user, posted_at, body}) => {
  return(
    <div className='col-md-10'>
        <p>Posted by {user} on {formatDate(new Date(posted_at))}</p>
        {body}
    </div>
  );
}

export default ConversationItem;