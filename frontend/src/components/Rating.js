import styles from './Rating.module.css';
function Rating({rating,style}){
    const defaultStyle = {
        fontSize:'1.1rem',
        margin:'0 1.2rem',
        padding:'0.4rem 0.8rem',
        ...style
    }
    return (
        <div className={styles['rating-container']} style={{...defaultStyle}}>
            <span>{rating}★</span>
        </div>
    )
}
export default Rating;