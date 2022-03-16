const Article = ({ article }) =>{
  return(
    <div className="article">
      <div className="liicon"><i class="fa fa-book" aria-hidden="true"></i></div>
      <div className="articletitle">{article?.title}</div>
    </div>
  )
}

export default Article