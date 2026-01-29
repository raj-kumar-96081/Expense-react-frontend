import {Link} from 'react-router-dom';

function Header(){
    return(
        <div className="Container">   
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
        </div>
    );
}
export default Header;