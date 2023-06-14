import {useEffect, useState} from "react"
import styles from "./About.module.css"
import {aboutData, imageList} from "./SampleData"
function About() {
	const [imgList, setImgList] = useState([imageList[0], imageList[1], imageList[2], imageList[3], imageList[4]])
	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - window.innerHeight * 1) {
			setImgList((prev) => {
				if (imageList.length > prev.length + 1) {
					return [...prev, imageList[prev.length + 1]]
				} else {
					return prev
				}
			})
		}
	}
	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])
	return (
		<div className={styles["about-container"]}>
			<div className={styles["about-us"]}>
				<div className={styles["about-us-bg"]}></div>
				<div className={styles["about-us-bg-overlay"]}></div>
				<h1>About Us</h1>
				<div className={styles["about-us-description"]}>
					{aboutData.description.split("\n").map((each, index) => {
						return <p>{each}</p>
					})}
				</div>
				<img
					src={require("../../images/homePage4/aboutUs.jpg")}
					alt="..."
				></img>
			</div>
			<div className={styles["reviews-section"]}>
				<div class={styles["h-divider"]}>
					<h1>&bull; reviews &bull;</h1>
					<div class={styles["shadow"]}></div>
				</div>
				<div className={styles["review-gallery"]}>
					{imgList.map((each, index) => {
						return (
							<>
								<div className={styles[each.stretch]}>
									<img
										src={each.link}
										alt="..."
									></img>
								</div>
							</>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default About
