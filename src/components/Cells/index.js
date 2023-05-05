import React from "react";
import styles from './Cells.module.css';
import Cell from "../Cell";

export default function Cells(props) {
	return (
		<div className={styles.cells}>
			{props.cells.map((line, x) => {
				return line.map((element, y) => {
					return <Cell
						key={x * 16 + y}
						onClick={(event) => props.onClick(event, x, y)}
						onContextMenu={(event) => props.onContextMenu(event, x, y)}
						onMouseEvent={(event) => props.onMouseEvent(event, x, y)}
						x={x}
						y={y}
						clear={props.clear}
					>
						{element}
					</Cell>
				})
			})}
		</div>
	);
}