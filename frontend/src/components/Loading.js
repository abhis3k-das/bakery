import styles from "./Loading.module.css"
export function Loading() {
	return (
		<>
			<div className={styles["loading"]} style={{opacity:"0.5",backgroundColor:'black'}}></div>
			<div className={styles["loading"]}>
				<div className={styles["letter-holder"]}>
					<div className={[styles[`l-1`], styles["letter"]].join(" ")}>L</div>
					<div className={[styles["l-2"], styles["letter"]].join(" ")}>o</div>
					<div className={[styles["l-3"], styles["letter"]].join(" ")}>a</div>
					<div className={[styles["l-4"], styles["letter"]].join(" ")}>d</div>
					<div className={[styles["l-5"], styles["letter"]].join(" ")}>i</div>
					<div className={[styles["l-6"], styles["letter"]].join(" ")}>n</div>
					<div className={[styles["l-7"], styles["letter"]].join(" ")}>g</div>
					<div className={[styles["l-8"], styles["letter"]].join(" ")}>.</div>
					<div className={[styles["l-9"], styles["letter"]].join(" ")}>.</div>
					<div className={[styles["l-10"], styles["letter"]].join(" ")}>.</div>
				</div>
			</div>
		</>
	)
}
export function Updating() {
	return (
		<>
			<div className={styles["loading"]} style={{opacity:"0.5",backgroundColor:'black'}}></div>
			<div className={styles["loading"]}>
				<div className={styles["letter-holder"]}>
					<div className={[styles[`l-1`], styles["letter"]].join(" ")}>U</div>
					<div className={[styles["l-2"], styles["letter"]].join(" ")}>p</div>
					<div className={[styles["l-3"], styles["letter"]].join(" ")}>d</div>
					<div className={[styles["l-4"], styles["letter"]].join(" ")}>a</div>
					<div className={[styles["l-5"], styles["letter"]].join(" ")}>t</div>
					<div className={[styles["l-6"], styles["letter"]].join(" ")}>i</div>
					<div className={[styles["l-7"], styles["letter"]].join(" ")}>n</div>
					<div className={[styles["l-8"], styles["letter"]].join(" ")}>g</div>
					<div className={[styles["l-9"], styles["letter"]].join(" ")}>.</div>
					<div className={[styles["l-10"], styles["letter"]].join(" ")}>.</div>
					<div className={[styles["l-11"], styles["letter"]].join(" ")}>.</div>
				</div>
			</div>
		</>
	)
}


