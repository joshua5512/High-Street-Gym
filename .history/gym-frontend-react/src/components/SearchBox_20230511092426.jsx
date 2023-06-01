export const SearchBox = props =>{
  <input
 
  className="search-box"
  type='search'
  placeholder='search classes'
  onchange={props.onSearchQuery}
  />
}