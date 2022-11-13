import _ from "lodash";

const Pagination = ({ items, currentPage, pageSize, handlePageChange }) => {
    const pageCount = Math.ceil(items.length / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => <li key={page} className={page === currentPage ? "page-item active" : "page-item"}><a className="page-link" href="#" onClick={()=>{handlePageChange(page)}}>{page}</a></li>)}
            </ul>
        </nav>
    );
}

export default Pagination;