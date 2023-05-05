import React from "react";
import styles from './Number.module.css';

export default function Number(props) {
	const timeNumbers = [
		styles.zero, styles.one, styles.two,
		styles.three, styles.four, styles.five,
		styles.six, styles.seven, styles.eight,
		styles.nine
	];

	return (
		<div className={styles.number + ' ' + timeNumbers[props.number]}>

		</div>
	);
}