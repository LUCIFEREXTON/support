import Category from "./Category"

const Main = ()=>{
  return (
    <div className="main">
        <div className="title">Knowledge base</div>
        <div className="content">
          <Category/>
          <Category/>
        </div>
      </div>
  )
}

export default Main