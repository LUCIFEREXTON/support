import axios from "axios";
import Article from "./Article"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Folder = ({ id, name })=>{
  const [articleList, setArticleList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if(id) {
      (
        async () => {
          try {
            const res = await axios.get(`/solutions/folders/${id}/articles`)
            setArticleList([...res.data])
            dispatch({type:'UPDATE_ARTICLES', articles: [...res.data]});
          } catch (error) {
            console.log(error)
          }
        }
      )()
    }
  },[id])
  return(
    <div className="folder">
      <div className="foldertitle">
        <div className="title">{name}</div>
        <div className="count">({articleList?.length})</div>
      </div>
      <div className="articles">
        {
          articleList.map(article => (
            <Article
              key={article.id}
              id={article.id}
              article={article}
            /> 
          ))
        }
      </div>
    </div>
  )
}

export default Folder