import {useEffect, useState} from "react"
import styles from "./Blog.module.css"
import {blogData} from "./SampleData"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import {Navigation} from "swiper"
function Blog() {
	const [width,setWindowWidth] = useState(window.innerWidth);	
	const handleWindowResize = () => {
		setWindowWidth(window.innerWidth);
	  };
	
	  useEffect(() => {
		window.addEventListener('resize', handleWindowResize);	
		return () => {
		  window.removeEventListener('resize', handleWindowResize);
		};
	  }, []);
	const [data, setData] = useState([blogData.length >= 1 && blogData[0], blogData.length >= 2 && blogData[1]])
	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - (document.documentElement.scrollHeight * 0.5)) {
			setData((prev) => {
				if (blogData.length > prev.length + 1) {
					return [...prev, blogData[prev.length + 1]]
				} else {
					return prev
				}
			})
		}
	}
	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
	}, [])
	return (
		<div className={styles["blog-container"]}>
			{data.map((each, index) => {
				return (
					<div className={styles["blog"]} key={each.id}>
						<div className={styles["blog-header"]}>
							<p
								style={{
									order: `${index % 2 === 0 ? 0 : 1}`,
									marginRight: `${index % 2 === 0 ? "1rem" : "0"}`,
								}}
							>
								25th June 2023
							</p>
							<span
								style={{
									marginLeft: `${index % 2 === 0 ? "0" : "1rem"}`,
								}}
							></span>
						</div>
						<h1>{each.title}</h1>
						<div className={styles["blog-description"]} >
							<div
								className={styles["blog-description-info"]}
								style={{
									order: `${width>=640 && index % 2 === 0 ? 0 : 1}`,
								}}
							>
								{each.description.split("\n").map((each, ind) => {
									if (each === "" && ind !== 0) {
										return <br></br>
									}
									return <p>{each}</p>
								})}
							</div>
							<Swiper
								navigation={true}
								modules={[Navigation]}
								className={styles["blog-description-swiper"]}
							>
								{each.images.map((img,ind) => {
									return (
										<SwiperSlide>
											<div
												className={styles["blog-description-swiper-slide"]}
												style={{
													backgroundImage: `url(${img})`,
												}}
												key={each.id+ind}
											></div>
										</SwiperSlide>
									)
								})}
							</Swiper>
						</div>
					</div>
				)
			})}
		</div>
	)
}
export default Blog
