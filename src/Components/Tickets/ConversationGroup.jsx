import ConversationItem from './ConversationItem'

const ConversationGroup = ({ user_id, conversationList })=>{
  
  return (
    <div className='row support-content-comment'>
        {conversationList.map(conversation=>(
            <ConversationItem 
              key={conversation.id}
              source = {user_id ===conversation.user_id || user_id === conversation.requester_id}
              conversation={conversation}
            />
        )).reverse()}    
    </div>
  )
}





export default ConversationGroup;