import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import TicketBtn from './TicketBtn';
const Header = () => {
  const [search, changeSearch] = useState('');
  let articles = useSelector(state => state.articles);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const searchHandler = async() => {
    dispatch({type: 'EMPTY_FILTER_ARTICLES'})
    if(search !== '') {
      try{
        const { data } = await axios.post(`search/solutions?term=${search}`)
        dispatch({type: 'UPDATE_FILTER_ARTICLES', filterArticles: [...data]})
        navigate('/faq/search')
      }catch(e){
        console.log(e)
      }
    } else{
      navigate('/faq')
    }
  }
  useEffect(() => {
    if( [...articles].length <=0 ){
      navigate('/faq')
    }else if(pathname!=='/faq/search'){
      dispatch({type: 'EMPTY_FILTER_ARTICLES'})
      changeSearch('')
    }
  },[pathname])
  return(
    <div className="faqheader">
        <div className="question">How Can we help You Today?</div>
        <div className="search">
          <div className="searchbox">
            <input 
              type="text"
              value={search} 
              onChange={(event) => {changeSearch(event.target.value)}}
              onKeyDown={(event) =>  (event.key === 'Enter' && searchHandler())} 
            />
            <div className="inputbtn" onClick={searchHandler}><i className="fa fa-search" aria-hidden="true"></i></div>
          </div>
        </div>
        <div className="ticketbtns">
          <TicketBtn to='/' link_text='All Issues' icon='info'/>
          <TicketBtn to='/ticket/new' link_text='Create Ticket' icon='plus'/>
          {pathname!=='/faq' &&<TicketBtn to='/faq' link_text='To FAQs' icon='backward'/>}
        </div>
      </div>
  )
}

export default Header