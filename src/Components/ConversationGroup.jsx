import ConversationItem from './ConversationItem'
import parse from 'html-react-parser';

const ConversationGroup = ({ user_id, conversationList })=>{
  
  return (
    <div className='row support-content-comment'>
        {conversationList.map(conversation=>(
            <ConversationItem 
            key={conversation.id} 
            user={conversation.user_id === user_id ? 'User' : 'Support Team'} 
            body={parse(conversation.body)} 
            posted_at={conversation.created_at} 
            />
        ))}    
    </div>
  )
}





export default ConversationGroup;