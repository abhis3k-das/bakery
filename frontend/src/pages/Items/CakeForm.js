import styles from './CakeForm.module.css';
function CakeForm({selectedWeight,sampleCake,setSelectedWeight}) {
	return (
		<div className={styles['cake-area']}>
			<h1>Select Weight : </h1>
			<div className={styles["item-weight-selector"]}>
				{sampleCake.weights.map((each) => {
					return (
						<div
                            key={each.c}
							onClick={setSelectedWeight.bind(this, each.c)}
							className={[styles['weight-box'] , selectedWeight === each.c ? styles["selected-weight"] : ""].join(" ")}
						>
							{each.w}kg
						</div>
					)
				})}
			</div>
            <h1>Cake Message : </h1>   
            <input type='text' maxLength={20} placeholder='Happy ...'/>
		</div>
	)
}

export default CakeForm;