import React, { useState, useEffect } from "react";
import styles from './Cell.module.css';

export default function Cell(props) {
	const [imgStyles] = useState([
		styles.disabled, styles.one, styles.two,
		styles.three, styles.four, styles.five,
		styles.six, styles.seven, styles.eight,
		styles.mine, styles.finishMine, styles.flag,
		styles.questionMark, styles.default]);
	const [className, setClassName] = useState(imgStyles[13]);

	useEffect(() => {
		if (props.children.isShow) {
			if (props.children.value === 100) {
				setClassName(imgStyles[9]);
			} else if (props.children.value === 1000) {
				setClassName(imgStyles[10]);
			} else {
				setClassName(imgStyles[props.children.value]);
			}
		} else {
			setClassName(imgStyles[13]);
		}
	}, [props.children.isShow, props.children.value, imgStyles]);

	useEffect(() => {
		if (props.children.class === 'default') {
			setClassName(imgStyles[13]);
		}
		if (props.children.class === 'flag') {
			setClassName(imgStyles[11]);
		}
		if (props.children.class === 'questionMark') {
			setClassName(imgStyles[12]);
		}
	}, [props.children.class, imgStyles]);

	return (
		<button
			onClick={props.onClick}
			onContextMenu={props.onContextMenu}
			onMouseDown={props.onMouseEvent}
			onMouseUp={props.onMouseEvent}
			className={styles.cell + ' ' + className}
			disabled={props.children.disabled}
		>

		</button>
	);
}