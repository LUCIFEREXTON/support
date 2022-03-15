import { formatDate } from '../helperFunction'
import parse from 'html-react-parser';
const ConversationItem = ({source, conversation}) => {
	console.log(conversation.body)
	console.log(conversation.body_text)
	const {to_emails, from_email, cc_emails, bcc_emails} = conversation
  console.log(conversation.id);
  return(
    <div className={`conversation ${source==='You Replied'?'user':'support'}`}>
			<div className='row'>
				<div className='col-xs 1 col-md-1 icon'>
					{conversation.from_email[0]}
				</div>
				<div className='col-sm-11 col-md-11'>
					<div className='row responder'>
					{source}
					</div>
					<div className='row date'>
						{formatDate(conversation.created_at)}
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm-1 col-md-1 align-self-baseline'>
					<i className="fa fa-envelope-o" aria-hidden="true"></i>
				</div>
				<div>
					{parse(conversation.body)}
				</div>	
			</div>
    </div>
  );
}

export default ConversationItem;
//<div className='col-md-10'>
//      <p>Posted by {user} on {formatDate(new Date(posted_at))}</p>
//      {body}
//  </div>