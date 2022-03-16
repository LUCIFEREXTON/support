import axios from "axios";
import Category from "./Category"
import Article from "./Article";
import FullArticle from "./FullArticle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
const Main = ()=>{
  const [categoryList, setCategoryList] = useState([]);
  let filterArticles = useSelector(state => state.filterArticles);
  useEffect(() => {
      (
        async () => {
          try {
            const res = await axios.get(`/solutions/categories`)
            setCategoryList([...res.data])
          } catch (error) {
            console.log(error)
          }
        }
      )()
  },[])
  return (
    <div className="main">
      <Routes>
        <Route path="article" element={<FullArticle/>}/>
          <Route path="search" element={
            <div>
              <div className="title">Knowledge base</div>
              <div className="content">
                {
                  filterArticles?.length 
                    ? filterArticles.map(article => (
                      <Article
                        key={article.id}
                        article={article}
                      />
                    ))
                  : <div className="search-note">No Articles Found. Please Create a new Ticket.</div>
                }
              </div>
            </div>
          }/>
          <Route path="" element={
            <div>
              <div className="title">Knowledge base</div>
              <div className="content">
                {
                  categoryList.map(category => (
                    <Category
                      key={category.id}
                      id={category.id}
                      name={category.name}
                    /> 
                  ))
                }
              </div>
            </div>
          }/>
      </Routes>
    </div>
  )
}

export default Main