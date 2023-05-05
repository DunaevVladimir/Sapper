import React from 'react';
import styles from './Board.module.css';
import Cells from '../Cells';
import Info from '../Info';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: [],
			currentNumberOfMines: 40,
			smiley: "default",
			firstClick: true,
			isTimerActive: false,
			openCells: 0,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleMouseEvent = this.handleMouseEvent.bind(this);
		this.handleContextMenu = this.handleContextMenu.bind(this);
		this.startANewGame = this.startANewGame.bind(this);
		this.renderNewField = this.renderNewField.bind(this);
		this.showNeighbors = this.showNeighbors.bind(this);
	}

	componentDidMount() {
		this.renderNewField();
	}

	renderNewField() {
		let NumberOfMines = 40;
		let newCells = Array(16).fill(Array(16).fill());
		newCells = newCells.map((line, x) => {
			return line.map((element, y) => {
				if ((Math.floor(Math.random() * (256 - (x * 16 + y))) < NumberOfMines) && (NumberOfMines >= 0)) {
					NumberOfMines = NumberOfMines - 1;
					return {
						value: 100,
						isShow: false,
						disabled: false,
						class: 'default',
					}
				}
				else {
					return {
						value: 0,
						isShow: false,
						disabled: false,
						class: 'default',
					}
				}
			});
		});

		newCells = this.addTheNumberOfMines(newCells);

		this.setState({
			cells: newCells,
			currentNumberOfMines: 40,
			smiley: "default",
			firstClick: true,
			isTimerActive: false,
			openCells: 0,
		});
	}

	addTheNumberOfMines(cells) {
		return cells.map((line, x) => {
			return line.map((element, y) => {
				let count = 0;
				if (!(element.value === 100)) {
					for (let i = (x - 1); i <= (x + 1); i++) {
						for (let j = (y - 1); j <= (y + 1); j++) {
							if (i >= 0 && j >= 0 && i < 16 && j < 16) {
								if (cells[i][j].value === 100) { count = count + 1 }
							}
						}
					}
					return {
						value: count,
						isShow: element.isShow,
						disabled: element.disabled,
						class: element.class,
					}
				} else {
					return element;
				}
			})
		})
	}

	handleClick(event, x, y) {
		let newCells = this.state.cells.slice();

		if (newCells[x][y].class === 'default') {
			if (this.state.firstClick) {
				this.setState({ isTimerActive: true, firstClick: false });
				if (newCells[x][y].value === 100) {
					newCells = this.changeMineLocation(x, y, newCells);
				}
			}

			if (newCells[x][y].value === 100) {
				this.finishTheGame(x, y);
			} else {
				if (newCells[x][y].value === 0) {
					this.setState({ openCells: this.state.openCells + this.showNeighbors(x, y, this.showNeighbors) },
						() => {
							this.isWinner();
						}
					);
				} else {
					this.setState({ openCells: this.state.openCells + 1 },
						() => {
							this.isWinner();
						}
					);
				}
				newCells[x][y].disabled = true;
				newCells[x][y].isShow = true;
				this.setState({ cells: newCells });
			}
		}
	}



	showNeighbors(x, y, show) {
		let count = 0;
		let arr = this.state.cells.slice();
		for (let i = (x - 1); i <= (x + 1); i++) {
			for (let j = (y - 1); j <= (y + 1); j++) {
				if (i >= 0 && j >= 0 && i < 16 && j < 16) {
					arr[i][j].disabled = true;
					if (!arr[i][j].isShow) {
						count = count + 1;
						arr[i][j].isShow = true;
						if (arr[i][j].value === 0) {
							count = count + show(i, j, show);
						}
					}
				}
			}
		}
		return count;
	}

	changeMineLocation(x, y, cells) {
		let newCells = cells;

		function countNumber(x, y) {
			let count = 0;
			for (let l = (x - 1); l <= (x + 1); l++) {
				for (let k = (y - 1); k <= (y + 1); k++) {
					if (l >= 0 && k >= 0 && l < 16 && k < 16) {
						if (newCells[l][k].value === 100) {
							count = count + 1;
						}
						else {
							newCells[l][k].value = newCells[l][k].value - 1;
						}
					}
				}
			}
			newCells[x][y].value = count;
		}

		function upNumbers(x, y) {
			for (let l = (x - 1); l <= (x + 1); l++) {
				for (let k = (y - 1); k <= (y + 1); k++) {
					if (l >= 0 && k >= 0 && l < 16 && k < 16) {
						if (!(newCells[l][k].value === 100)) {
							newCells[l][k].value = newCells[l][k].value + 1;
						}
					}
				}
			}
		}

		for (let i = 0; i < newCells.length; i++) {
			for (let j = 0; j < newCells.length; j++) {
				if (!(newCells[i][j].value === 100)) {
					[newCells[i][j].value, newCells[x][y].value] = [newCells[x][y].value, newCells[i][j].value];
					countNumber(x, y);
					upNumbers(i, j);
					return newCells;
				}
			}
		}
		return newCells;
	}

	isWinner() {
		let openCells = this.state.openCells;
		if (openCells === 216) {
			let lastCells = this.state.cells.slice();
			lastCells = lastCells.map((line, i) => {
				return line.map((element, j) => {
					return {
						value: element.value,
						isShow: element.isShow,
						disabled: true,
						class: element.class,
					};
				})
			})
			this.setState({ cells: lastCells, isTimerActive: false, smiley: 'sunglasses' });
		}
	}

	finishTheGame(x, y) {
		let lastCells = this.state.cells.slice();
		lastCells[x][y].value = 1000;
		lastCells[x][y].isShow = true;
		lastCells = lastCells.map((line, i) => {
			return line.map((element, j) => {
				return {
					value: element.value,
					isShow: element.value === 100 ? true : element.isShow,
					disabled: true,
					class: element.class,
				};
			})
		})
		this.setState({ cells: lastCells, isTimerActive: false, smiley: 'sad' });
	}

	handleContextMenu(event, x, y) {
		let newCells = this.state.cells.slice();

		event.preventDefault();
		if (!event.target.disabled) {
			if (newCells[x][y].class === 'default') {
				newCells[x][y].class = 'flag';
				if (this.state.currentNumberOfMines > 0) {
					this.setState({ currentNumberOfMines: this.state.currentNumberOfMines - 1 })
				}
			} else if (newCells[x][y].class === 'flag') {
				newCells[x][y].class = 'questionMark';
				if (this.state.currentNumberOfMines < 40) {
					this.setState({ currentNumberOfMines: this.state.currentNumberOfMines + 1 })
				}
			} else {
				newCells[x][y].class = 'default';
			}
		}
		this.setState({ cells: newCells });
	}

	handleMouseEvent(event, x, y) {
		if ((event.button === 0) && (this.state.cells[x][y].class === 'default')) {
			this.state.smiley === 'default' ?
				this.setState({ smiley: 'scared' }) :
				this.setState({ smiley: 'default' })
		}
	}

	startANewGame() {
		this.renderNewField();
	}

	render() {
		const currentCells = this.state.cells.slice();
		const currentSmiley = this.state.smiley;
		const currentNumberOfMines = this.state.currentNumberOfMines;
		const isTimerActive = this.state.isTimerActive;
		const isClear = this.state.clear;

		return (
			<div className={styles.container}>
				<Info
					className={styles.info}
					smiley={currentSmiley}
					currentNumberOfMines={currentNumberOfMines}
					isTimerActive={isTimerActive}
					startANewGame={this.startANewGame}
				/>
				<Cells
					cells={currentCells}
					onClick={this.handleClick}
					onContextMenu={this.handleContextMenu}
					onMouseEvent={this.handleMouseEvent}
					clear={isClear}
				/>
			</div>
		);
	}
}