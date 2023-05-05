import React, { useEffect, useState } from 'react';
import styles from './Info.module.css';
import MinCounter from '../MinCounter';
import Smiley from '../Smiley';
import Time from '../Time';

export default function Info(props) {
	const [firstNumber, setFirstNumber] = useState(0);
	const [secondNumber, setSecondNumber] = useState(0);
	const [thirdNumber, setThirdNumber] = useState(0);

	useEffect(() => {
		if (firstNumber === 10) {
			setFirstNumber(0);
		}
	}, [firstNumber]);

	useEffect(() => {
		if (secondNumber === 10) {
			setFirstNumber((prevValue) => prevValue + 1);
			setSecondNumber(0);
		}
	}, [secondNumber]);

	useEffect(() => {
		if (props.isTimerActive) {
			const timer = setTimeout(() => {
				const counter = thirdNumber + 1;
				if (thirdNumber === 9) {
					setSecondNumber((prevValue) => prevValue + 1);
					setThirdNumber(0);
				}
				else {
					setThirdNumber(counter);
				}
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [props.isTimerActive, thirdNumber]);

	function handleStartANewGame() {
		setFirstNumber(0);
		setSecondNumber(0);
		setThirdNumber(0);
		props.startANewGame();
	}

	return (
		<div className={styles.info} >
			<MinCounter
				className={styles.mincounter}
				currentNumberOfMines={props.currentNumberOfMines}
			/>
			<Smiley
				className={styles.smiley}
				smiley={props.smiley}
				onClick={handleStartANewGame}
			/>
			<Time
				className={styles.time}
				firstNumber={firstNumber}
				secondNumber={secondNumber}
				thirdNumber={thirdNumber}
			/>
		</div>
	);
}