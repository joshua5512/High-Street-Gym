import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    return (
        <div className="footer">
            <a onClick={() => navigate('/about')}>About</a>
            <a onClick={() => navigate('/contact')}>Contact</a>
            <a onClick={() => navigate('/privacy')}>Privacy</a>
        </div>
    );
}

export default Footer;
