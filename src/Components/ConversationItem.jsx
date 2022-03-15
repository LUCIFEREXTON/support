import { formatDate } from '../helperFunction'
import parse from 'html-react-parser';
import Attachment from './Attachment'
import { useSelector } from 'react-redux'
const ConversationItem = ({source, conversation}) => {
	const name = useSelector( state => state.user.name)
	const {to_emails, from_email, cc_emails, bcc_emails} = conversation
  return(
    <div className={`conversation ${source==='You Replied'?'user':'support'}`}>
			<div className="conv-header">
				<div className="iconbg">
					<div className="icon">
						{source==='You Replied'?name[0]:'BV'}
					</div>
				</div>
				<div className="sender">
					<div className="responder">{source}</div>
					<div className="date">{formatDate(conversation?.created_at)}</div>
				</div>
			</div>
			<div className="conv-mail">
				<div className='mail-icon'>
					<i className="fa fa-envelope-o" aria-hidden="true"></i>
				</div>
				<div className="mail-body">
					<div className="mail-text">
						{parse(conversation?.body)}
					</div>
					{conversation?.attachments?.length > 0  &&
						<div className="all-attachments">
							{conversation?.attachments?.map( attachment => <Attachment key={attachment.id} file={attachment}/>)}
						</div>
					}
				</div>
			</div>
    </div>
  );
}

export default ConversationItem;
