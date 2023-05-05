import React from "react";
import Number from "../Number";
import styles from './MinCounter.module.css';

export default function MinCounter(props) {
	return (
		<div className={styles.mincounter}>
			<Number
				number={0}
			/>
			<Number
				number={Math.floor(props.currentNumberOfMines / 10)}
			/>
			<Number
				number={props.currentNumberOfMines % 10}
			/>
		</div>
	);
}