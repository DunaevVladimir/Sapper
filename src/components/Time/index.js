import React from "react";
import Number from "../Number";
import styles from './Time.module.css';

export default function Time(props) {
	return (
		<div className={styles.time}>
			<Number
				number={props.firstNumber}
			/>
			<Number
				number={props.secondNumber}
			/>
			<Number
				number={props.thirdNumber}
			/>
		</div>
	);
}