const Navbar = () => {
    return (
        <div className="hc-search">
            <div className="hc-search-c">
                <h2 className="heading hide-in-mobile">How can we help you today?</h2>
                <form className="hc-search-form print--remove" autocomplete="off" action="/support/search" id="hc-search-form" data-csrf-ignore="true">
                    <div className="hc-search-input">
                        <label for="support-search-input" className="hide">Enter your search term here...</label>
                        <input placeholder="Enter your search term here..." type="text" name="term" className="special ui-autocomplete-input" value="" rel="page-search" data-max-matches="10" id="support-search-input" autocomplete="off" />
                    </div>
                    <div className="hc-search-button">
                        <button className="btn btn-primary" aria-label="Search" type="submit" autocomplete="off">
                            {/* <i className="mobile-icon-search hide-tablet"></i> */}
                            <span>
                                Search
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Navbar;