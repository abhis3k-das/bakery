import {useEffect, useState, Suspense, lazy} from "react"
import styles from "./Blog.module.css"
import {blogData} from "./SampleData"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import {Navigation} from "swiper"
function Blog() {
	const [data, setData] = useState([blogData.length >= 1 && blogData[0], blogData.length >= 2 && blogData[1]])
	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - window.innerHeight * 0.7) {
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
					<div className={styles["blog"]}>
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
						<div className={styles["blog-description"]}>
							<div
								className={styles["blog-description-info"]}
								style={{
									order: `${index % 2 === 0 ? 0 : 1}`,
								}}
							>
								{each.description.split("\n").map((each, index) => {
									if (each === "" && index !== 0) {
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
								{each.images.map((img) => {
									return (
										<SwiperSlide>
											<div
												className={styles["blog-description-swiper-slide"]}
												style={{
													backgroundImage: `url(${img})`,
												}}
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

// const [text,setText] = useState('')
//     const [res,setRes] = useState('')
//     const onSumbitHandler = (e)=>{
//         e.preventDefault();
//         setRes(text)
//         setText('')
//         console.log(text)
//     }

{
	/* <form onSubmit={onSumbitHandler}>
                <textarea style={{height:'100px' , width:'600px'}} value={text} onChange={(e)=>{setText(e.target.value)}}></textarea>
                <button>Add</button>
            </form>
            <div>
                {res.split('\n').map((each)=>{
                    if(each === ''){
                        return <br></br>
                    } 
                    return <p>{each}</p>
                })}
            </div> */
}
