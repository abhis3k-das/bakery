import styles from "./Section3.module.css"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {useEffect, useMemo, useRef, useState} from "react"
import {Pagination, Navigation} from "swiper"

function Section3() {
	const data = useMemo(
		() => ({
			pastry: ["P", "Q", "R", "S", "T", "V", "P", "Q", "R", "S", "T", "V"],
			pancakes: ["P", "Q", "R", "S", "T", "V", "P", "Q", "R", "S", "T", "V"],
			cookies: ["P", "Q", "R", "S", "T", "V", "P", "Q", "R", "S", "T", "V"],
			cakes: ["P", "Q", "R", "S", "T", "V", "P", "Q", "R", "S", "T", "V"],
		}),
		[]
	)
	const [product, setProduct] = useState("pastry")
    const header = useRef();
    const carousel = useRef();
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
    })
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
					<span onClick={switchItemHandler.bind(this, "pastry")} className={[product === "pastry" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						Pastry{" "}
					</span>
					<span onClick={switchItemHandler.bind(this, "pancakes")} className={[product === "pancakes" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						Pancakes{" "}
					</span>
					<span onClick={switchItemHandler.bind(this, "cookies")} className={[product === "cookies" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
						{" "}
						Cookies{" "}
					</span>
					<span onClick={switchItemHandler.bind(this, "cakes")} className={[product === "cakes" ? styles["homePage-section3-activeItem"] : "", styles["homePage-section3-item"]].join(" ")}>
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
						let imgg = require("../../images/homePage3/cookieE.jpg")
						return (
							<SwiperSlide style={{margin: "50px"}} key={Math.random()*index}>
								<div className={styles["homePage-section3-carousel-item"]}>
									<img src={imgg} className={styles["homePage-section3-item-image"]} alt="..."></img>
									<span className={styles["homePage-section3-item-overlay"]}></span>
									<span className={styles["homePage-section3-item-title"]}>Cookie</span>
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
