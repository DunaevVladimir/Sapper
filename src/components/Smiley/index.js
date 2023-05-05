import React, { useState, useEffect } from "react";
import styles from './Smiley.module.css';

export default function Smiley(props) {
	const [smileyStatus] = useState([
		styles.default, styles.scared, styles.sad, styles.sunglasses,
	]);
	const [smiley, setSmiley] = useState(smileyStatus[0]);

	useEffect(() => {
		if (props.smiley === 'default') {
			setSmiley(smileyStatus[0]);
		}
		if (props.smiley === 'scared') {
			setSmiley(smileyStatus[1]);
		}
		if (props.smiley === 'sad') {
			setSmiley(smileyStatus[2]);
		}
		if (props.smiley === 'sunglasses') {
			setSmiley(smileyStatus[3]);
		}
	}, [props.smiley, smileyStatus]);

	return (
		<button onClick={props.onClick} className={styles.smiley + ' ' + smiley}>

		</button>
	);
}