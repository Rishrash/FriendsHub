import "./Search.css"
const SearchResult = (props) => {
    return (
        <div className="user-suggest">
            <div>
                {props.data.firstName}&nbsp;
                {props.data.lastName}
            </div>
            <div>
                <a href={"/displayUserProfile/" + props.data.username}>View</a>
            </div>
        </div>
    )
}
export default SearchResult;