import parse from 'html-react-parser';
import { useSelector } from 'react-redux'
const FullArticle = ()=>{

  const article = useSelector( state => state.article)

  return(
    <div className="full-article">
      <div className="full-article-header">
        <div className="title">{article?.title}</div>
        <div className="by">{`Created by:`}</div>
        <div className="date">{`Modified on: ${article?.created_at}`}</div>
      </div>
      <div className="full-article-body">
        {parse(article?.body)}
      </div>
    </div>
  )
}
export default FullArticle