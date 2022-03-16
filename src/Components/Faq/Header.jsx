import { Link } from 'react-router-dom'
const Header = () => {
  return(
    <div className="faqheader">
        <div className="question">How Can we help You Today?</div>
        <div className="search">
          <div className="searchbox">
            <input type="text" />
            <div className="inputbtn"><i className="fa fa-search" aria-hidden="true"></i></div>
          </div>
        </div>
        <div className="ticketbtns">
          <div className="ticketbtn">
            <div className="faqicon">
              <i class="fa fa-plus-square" aria-hidden="true"></i>
            </div>
            <Link to='/'>See Status</Link>
          </div>
          <div className="ticketbtn">
            <div className="faqicon">
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>
            <Link to='/ticket/new'>Create ticket</Link>
          </div>
        </div>
      </div>
  )
}

export default Header