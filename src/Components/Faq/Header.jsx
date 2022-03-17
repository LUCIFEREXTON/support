import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TicketBtn from './TicketBtn';
const Header = () => {
  const [search, changeSearch] = useState('');
  let articles = useSelector(state => state.articles);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const searchHandler = () => {
    if(search !== '') {
      const searchTerms = search.toLowerCase().split(' ');
      let filterArticles = articles.filter(article => searchTerms.some(term => article.title.toLowerCase().includes(term)));
      dispatch({type: 'UPDATE_FILTER_ARTICLES', filterArticles});
      navigate('/faq/search');
    } else{
      navigate('/faq')
    }

  }
  return(
    <div className="faqheader">
        <div className="question">How Can we help You Today?</div>
        <div className="search">
          <div className="searchbox">
            <input 
              type="text"
              value={search} 
              onChange={(event) => {changeSearch(event.target.value)}}
              onKeyDown={(event) =>  event.key === 'Enter' && searchHandler()} 
            />
            <div className="inputbtn" onClick={searchHandler}><i className="fa fa-search" aria-hidden="true"></i></div>
          </div>
        </div>
        <div className="ticketbtns">
          <TicketBtn to='/' link_text='See Status' icon='plus'/>
          <TicketBtn to='/ticket/new' link_text='Create Ticket' icon='info'/>
          {pathname!=='/faq' &&<TicketBtn to='/faq' link_text='To FAQs' icon='backward'/>}
        </div>
      </div>
  )
}

export default Header