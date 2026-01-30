import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";


function DashNav({children}){
    return(
        <>
            <UserHeader/>
                {children}
            <UserFooter/>
        </>
    );  
}

export default DashNav;