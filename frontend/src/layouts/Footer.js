import logo from '../images/bakerylogo2.svg'; 
import styles from './Footer.module.css';
import {ImFacebook, ImInstagram, ImPinterest, ImTwitter} from 'react-icons/im'
function Footer(){
    const feedsUrl = [
        "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg",
        "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg",
        "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg",
        "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg",
        "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg",
        "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg",
    ];
    return <>
        <div className={styles['footer-container']}>
            <div className={styles['footer-body']}>
                <div className={styles['footer-body-left']}>
                    <div className={styles['footer-logo-container']}>
                        <img src={logo} className={styles['footer-logo']} alt="logo"  />
                    </div>
                    <p>Donec et nunc in eros rhoncus sodales. Quisque dui id porttitor iaculis, nisi tortor lobortis massa. Ut ut magna ante. Donec gravida enim eget finibus accumsan. Vivamus facilisis.</p>
                    <p>Follow us : &nbsp;&nbsp;&nbsp; 
                        <a href='#'><ImFacebook style={{color:'white' , height:'1rem' ,width:'1rem'}}/></a>
                        &nbsp;&nbsp;&nbsp;
                        <a href='#'><ImTwitter style={{color:'white' , height:'1rem' ,width:'1rem'}}/></a>
                        &nbsp;&nbsp;&nbsp;
                        <a href='#'><ImInstagram style={{color:'white' , height:'1rem' ,width:'1rem'}}/></a>
                        &nbsp;&nbsp;&nbsp;
                        <a href='#'><ImPinterest style={{color:'white' , height:'1rem' ,width:'1rem'}}/></a>
                    </p>
                </div>
                <div className={styles['footer-body-middle']}>
                    <h1>Instagram Feed</h1>
                    <div className={styles['feeds-container']}>
                        {feedsUrl.map((each,index)=>{
                            return (
                                <div key={index} className={styles['feeds-img']}>
                                    <img src={each} style={{height:'100%',width:'100%',objectFit:'cover'}}></img>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles['footer-body-right']}>
                    <h1>Join the club</h1>
                    <div className={styles['letterhead-container']}>
                        <div>
                            <form>
                                <input type='email' placeholder='Email Address' style={{
                                    width:'60%',
                                    padding:'0.8rem'
                                }}/><button type='submit' style={{
                                    padding:'0.9rem 2rem',
                                    backgroundColor:'rgb(255, 157, 11)',
                                    boxSizing:'border-box',
                                    border:'none',
                                    textTransform:'uppercase',
                                    letterSpacing:'1px',
                                    color:'rgb(245, 245, 245)',
                                    fontWeight:'bold',
                                    cursor:'pointer'
                                }}>Join</button>
                            </form>
                        </div>
                        <div>
                            <p>Sign me up to receive emails on new product arrivals special offers.</p>
                        </div>
                        <p>Contact us: <span style={{backgroundColor:'rgb(255, 157, 11)' ,color:'white'}}>00 34 938 60 24 24</span></p>
                    </div>
                </div>
            </div>
            <div className={styles['footer-copyRight']}>
                <p>&copy; 2023 All Rights Reserved</p>
            </div>
        </div>
    </>
}

export default Footer;