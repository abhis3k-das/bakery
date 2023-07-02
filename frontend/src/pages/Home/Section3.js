import styles from "./Section3.module.css"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {useEffect, useRef, useState,useContext} from "react"
import {Pagination, Navigation} from "swiper"
import { StoreContext } from "../../Context/store-context"
function Section3() {

	const [data,setData] = useState({
		"dairy":[],
		"cake":[],
		"cookies":[],
		"bread":[],
	})
	const store = useContext(StoreContext);
	const [product, setProduct] = useState("cake")
    const header = useRef();
    const carousel = useRef();
	useEffect(()=>{
		console.log(store.products)
		store?.products.forEach((each)=>{
			if(each.category === "dairy"){
				setData((prev)=>{
					let temp = prev.dairy
					if(temp.length === 0){
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
					}else{
						temp.push(each)
					}
					return {
						...prev,
						"dairy":temp,
					}
				})
			}else if(each.category === 'cake'){
				setData((prev)=>{
					let temp = prev.cake
					if(temp.length === 0){
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
					}else{
						temp.push(each)
					}
					return {
						...prev,
						"cake":temp,
					}
				})
			}else if(each.category === 'cookie'){
				setData((prev)=>{
					let temp = prev.cookies
					if(temp.length === 0){
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
					}else{
						temp.push(each)
					}
					return {
						...prev,
						"cookies":temp,
					}
				})
			}else if(each.category === 'bread'){
				setData((prev)=>{
					let temp = prev.bread
					if(temp.length === 0){
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
						temp.push(each)
					}else{
						temp.push(each)
					}
					return {
						...prev,
						"bread":temp,
					}
				})
			}
		})
	},[store.products])
    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((each)=>{
                each.target.classList.toggle(styles['homePage-section3-show'],each.isIntersecting)
                if(each.isIntersecting){
                    observer.unobserve(each.target);
                }
            })
        },{threshold:0})
        observer.observe(header.current);
        observer.observe(carousel.current);
    },[])
	const switchItemHandler = (type) => {
		console.log(type)
		setProduct(type)
	}
    const addToCart = ()=>{
        console.log('clicked')
    }
	return (
		<div className={styles["homePage-section3-container"]}>
			<span className={styles["homePage-section3-overlay"]}></span>
			<div className={styles["homePage-section3-header"]} ref={header}>
				<div>
                    <p>Check All</p><br />
					<h1>
						Fresh Products
					</h1>
				</div>
				<div className={styles["homePage-section3-items"]}>
					<span onClick={switchItemHandler.bind(this, "dairy")} className={[product === "dairy" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						Dairy{" "}
					</span>
					<span onClick={switchItemHandler.bind(this, "bread")} className={[product === "bread" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						Bread{" "}
					</span>
					<span onClick={switchItemHandler.bind(this, "cookies")} className={[product === "cookies" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						Cookies{" "}
					</span>
					<span onClick={switchItemHandler.bind(this, "cake")} className={[product === "cake" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						Cakes{" "}
					</span>
				</div>
			</div>
			<div className={styles["homePage-section3-carousel-container"]} ref={carousel}>
				<Swiper
					slidesPerView={5}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					centeredSlides
					loop={data[product].length >= 5 * 2 ? true : false}
					navigation={true}
					modules={[Pagination, Navigation]}
					breakpoints={{
						0: {
							slidesPerView: 1,
						},
						600: {
							slidesPerView: 2,
						},
						800: {
							slidesPerView: 3,
						},
						1000: {
							slidesPerView: 4,
						},
						1200: {
							slidesPerView: 5,
						},
					}}
					style={{
						paddingLeft: "3rem",
						marginLeft: "3rem",
						marginRight: "3rem",
						overflow: "hidden",
					}}
				>
					{data[product].map((each, index) => {
						return (
							<SwiperSlide style={{margin: "50px"}} key={Math.random()*index}>
								<div className={styles["homePage-section3-carousel-item"]}>
									<img src={each.image[0].url} className={styles["homePage-section3-item-image"]} alt="..."></img>
									<span className={styles["homePage-section3-item-overlay"]}></span>
									<span className={styles["homePage-section3-item-title"]}>{each.item_name}</span>
									<button onClick={addToCart}>+</button>
								</div>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</div>
	)
}

export default Section3;
