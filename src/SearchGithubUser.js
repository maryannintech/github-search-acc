import './SearchGithubUser.css'

export default function SearchGithubUser() {
    return (
        <div className='container'>
            <div className='search-input'>
                <form>
                    <input type='text' placeholder='Search'></input>
                    <button type='submit'><i class="bi bi-search"></i></button>
                </form>
            </div>
            <div className='result'>
            </div>
        </div>
    )
}