import ArticleItem from "./ArticleItem";
const FolderItem = () => {
    return (
        <section className="cs-g article-list">
            <div className="list-lead">
                <a href="/support/solutions/folders/84000227190" title="FAQ"> FAQ <span className="item-count">1</span></a>
            </div>
            <ul>			
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>
            </ul>
        </section>
    )
}

export default FolderItem;