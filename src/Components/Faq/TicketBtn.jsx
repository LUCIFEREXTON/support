import { Link } from 'react-router-dom'
const TicketBtn = ({to, link_text, icon}) => {
  return(
    <div className="ticketbtn">
      <div className="faqicon">
        <i className={`fa fa-${icon}`} aria-hidden="true"></i>
      </div>
      <Link to={to}>{link_text}</Link>
    </div>
  )
}
export default TicketBtn