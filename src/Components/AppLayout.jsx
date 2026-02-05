import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from './Navbar';

function AppLayout({ children }) {
    return(
       <>
        <Header />
        {children}
        <Footer />
       </>
    );
}
export default AppLayout;