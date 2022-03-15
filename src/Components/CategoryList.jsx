import CategoryItem from "./CategoryItem";
const CategoryList = () => {
    return (
        <section className="main content rounded-6 min-height-on-desktop fc-portal-solution-home" id="solutions-index-home">
            <h2 className="heading">Knowledge base</h2>
            <CategoryItem/>
            <CategoryItem/>
            <CategoryItem/>
        </section>
    )
}

export default CategoryList;