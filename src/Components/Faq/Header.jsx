import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
const Header = () => {
  const [search, changeSearch] = useState('');
  let articles = useSelector(state => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchHandler = () => {
    if(search !== '') {
      const searchTerms = search.toLowerCase().split(' ');
      let filterArticles = articles.filter(article => searchTerms.some(term => article.title.toLowerCase().includes(term)));
      dispatch({type: 'UPDATE_FILTER_ARTICLES', filterArticles});
      navigate('/faq/search');
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
              onKeyDown={(event) => { if (event.key === 'Enter') { searchHandler(); }}} 
            />
            <div className="inputbtn" onClick={searchHandler}><i className="fa fa-search" aria-hidden="true"></i></div>
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