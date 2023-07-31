import styles from "./Section3.module.css"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {useEffect, useRef, useState,useContext} from "react"
import {Pagination, Navigation} from "swiper"
import { StoreContext } from "../../Context/store-context"
import { useNavigate } from 'react-router-dom';
import Item from "../../components/Item"
function Section3() {

	const [data,setData] = useState({
		"all":[],
		"cake":[],
		"cookies":[],
		"bread":[],
	})
	const store = useContext(StoreContext);
	const [product, setProduct] = useState("cake")
    const header = useRef();
    const carousel = useRef();
	const navigate = useNavigate();
	useEffect(()=>{
		let cakeCount = 0;
		let cookieCount = 0;
		let breadCount = 0;
		store?.products.forEach((each)=>{
			if(each.category === "cake"){
				cakeCount += 1
			}else if(each.category === "cookie"){
				cookieCount += 1
			}else{
				breadCount += 1
			}
		})
		setData((prev)=>{
			return {...prev,
			"all":store?.products
			}
		})
		store?.products.forEach((each)=>{
			if(each.category === 'cake'){
				setData((prev)=>{
					let temp = prev.cake
					if(temp.length === 0 && cakeCount < 10){
						while(cakeCount < 10){
							temp.push(each)
							cakeCount += 1
						}
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
					if(temp.length === 0 && cookieCount < 10){
						while(cookieCount < 10){
							temp.push(each)
							cookieCount += 1
						}
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
					if(temp.length === 0 && breadCount < 10){
						while(breadCount < 10){
							temp.push(each)
							breadCount += 1
						}
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
		setProduct(type)
	}
    const addToCart = (item)=>{
		localStorage.setItem('selectedItemFromHomePage', JSON.stringify(item));
		navigate('/items', { state: {item} });
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
					<span onClick={switchItemHandler.bind(this, "all")} className={[product === "all" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						All{" "}
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
								<Item key={each._id} data={each} onClick={()=>{addToCart(each)}} style={
									{
										"height":"400px",
										"borderRadius":"5px",
										"boxShadow":"none"
									}
								}/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</div>
	)
}

export default Section3;
