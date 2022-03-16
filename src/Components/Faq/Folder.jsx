import Article from "./Article"

const Folder = ()=>{
  return(
    <div className="folder">
      <div className="foldertitle">
        <div className="title">Getting Started</div>
        <div className="count">(2)</div>
      </div>
      <div className="articles">
        <Article/>
        <Article/>
      </div>
    </div>
  )
}

export default Folder