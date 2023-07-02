import styles from "./Home.module.css"
import Section2 from "./Section2"
import Section3 from "./Section3"
import Section4 from "./Section4"
import HomePageLogin from "../../components/HomePageLogin"
function Home2() {
	return (
		<>
			<div className={styles["homePage-container"]}>				
				<div className={styles["homePage-section1-info-container"]}>
					<div className={styles["homePage-section1-overlay"]}></div>
					<div className={styles["homePage-section1-info"]}>
						<div className={styles["homePage-section1-textArea"]}>
							<h1>We Are BURN </h1>
							<h1>Artisanal Bakehouse</h1>
							<p>500 Terry Fancine Street</p>
							<p>San Francisco , CA 94158</p>
						</div>
					</div>
					<div className={styles["homePage-section1-textArea"]}>
						<HomePageLogin />
					</div>
				</div>
			</div>
			<Section2 />
			<Section3 />
			<Section4 />
		</>
	)
}
export default Home2
