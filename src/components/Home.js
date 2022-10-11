import {useNavigate} from 'react-router-dom';
import image from '../images/home-img.svg';

export default function Home () {
    const navigate = useNavigate();
    return (
        <div className='home-content'>
            <h1>Welcome to My Notes-App</h1>
            <p>This is a simple note-app that allows you to create, edit and delete notes.</p>
            <p>Let's get started, go to your notes</p>
            <br></br>
            <img src={image} alt="home-img" className='img-home'/>
            <button onClick={()=>navigate('notes')}>Go to Notes</button>
        </div>
    )
}