const newBoardButton = document.querySelector(".NewBoard")
const gameDivall = document.querySelector(".gameDivall")
let gameboardNumber = 0

const BOX_SIZE = 63
const FREE_CELL = 0
const RABBIT_CELL = 1
const WOLF_CELL = 2
const HOME_CELL = 3
const BAN_CELL = 4

const gameImg = {
	[RABBIT_CELL] : {
		name: "rabbit",
		src: "img/rabbit.png",
	},

	[WOLF_CELL] : {
		name: "wolf",
		src: "img/gamewolf.png",
	},
	[BAN_CELL]:{
		name: "ban",
		src: "img/ban.png",
	},
	[HOME_CELL]:{
		name: "home",
		src: "img/home.png",
	}
}


const settings = () => {
	return {
		wolves : 0,
		bans : 0,
		rabbit : 1,
		home : 1
	}
}

const selectOpp = [5,7,10]
const controlerOpp = ["Down","Right","Up","Left"]

const createBoard = (gameNumber) => {
	const conteiner = document.querySelector(".conteiner")
	const ControlBoard = document.createElement("div")
	const buttonDiv = document.createElement("div")
	buttonDiv.classList.add(`divStyle`, `buttonDiv${gameNumber}` )
	ControlBoard.classList.add(`boardStyle`, `ControlBoard${gameNumber}`) 


	conteiner.appendChild(ControlBoard)
	ControlBoard.appendChild(buttonDiv)
	const strart = creatStartButton(buttonDiv)
	const selectOption = creatSelectButton(buttonDiv, selectOpp)
	createDeleteBoardButton(gameNumber,ControlBoard)
	const gameBoard = creatGameBoard(ControlBoard)
	const status = CreatStatusBoard(ControlBoard,gameboardNumber)	
	const controlers = creatControler(ControlBoard,gameNumber, controlerOpp)
	
}


const creatStartButton = (buttonDiv) => {
	const button = document.createElement("button")
	button.classList.add(`button_strat${gameboardNumber}`)
	const a = document.createElement("a")
	a.innerText = "Start"
	buttonDiv.appendChild(button)
	button.appendChild(a)
}

const creatSelectButton = (buttonDiv,arr) => {
	const select = document.createElement("select")
	select.classList.add(`play_select${gameboardNumber}`)
	buttonDiv.appendChild(select)
	arr.map((element, index) => {
		let option = document.createElement("option")
		option.innerText = `${element}X${element}`
		option.value = element
		select.appendChild(option)
	})
}

const creatControler = (ControlBoard,gameNumber,controlerOpp) => {
	const controlersDiv = document.createElement("div")
	controlersDiv.classList.add(`controlersDiv`, `controlersDiv${gameNumber}` )
	ControlBoard.appendChild(controlersDiv)
	controlerOpp.map((element) => {
		const controler = document.createElement("div")
		controler.classList.add(`controler${gameNumber}-${element}`, `controler${element}` )
		controlersDiv.appendChild(controler)
	})
}

const creatGameBoard = (ControlBoard) => {
	const mainBoard = document.createElement("div")
	const boardDiv = document.createElement("div")
	boardDiv.className = `boardDiv`
	mainBoard.classList.add(`board`, `boardNumber${gameboardNumber}` )
	ControlBoard.appendChild(boardDiv)
	boardDiv.appendChild(mainBoard)
}

const createDeleteBoardButton = (gameNumber,ControlBoard) => {
	const creatDeleteButton = document.createElement("button")
	creatDeleteButton.classList.add(`deleteButton`, `deleteButton${gameNumber}`)
	creatDeleteButton.innerHTML = "del"
	ControlBoard.appendChild(creatDeleteButton)
}

const returnButton = (gameNumber) => {
	const serch = document.querySelector(`.button_strat${gameNumber}`)
		serch.addEventListener("click", () => {
			startGame(gameNumber)
		})
}


newBoardButton.addEventListener("click", function(){
	gameboardNumber++
	createBoard(gameboardNumber)
	returnButton(gameboardNumber)
	deleteBoard(gameboardNumber)
})

const CreatStatusBoard = (ControlBoard,gameNumber) =>{
	const status = document.createElement("div")
	const statusBoard = document.createElement("div")
	const h2 = document.createElement("h2")
	
	status.classList.add(`status`, `status${gameNumber}` )
	h2.classList.add(`h2`, `h2-${gameNumber}` )
	statusBoard.className = `statusBoard`

	h2.innerHTML = "Game over"
	status.style.display = "none"

	ControlBoard.appendChild(status)
	status.appendChild(statusBoard)
	statusBoard.appendChild(h2)

}

const deleteBoard = (gameNumber) => {
	const ControlBoard = document.querySelector(`.ControlBoard${gameNumber}`)
	const deleteButton = document.querySelector(`.deleteButton${gameNumber}`)
	deleteButton.addEventListener("click", () => {
		ControlBoard.remove()
	})
}

const startGame = (gameNumber) => {
	const serchControler = document.querySelector(`.controlersDiv${gameNumber}`)
	const ControlBoard = document.querySelector(`.ControlBoard${gameNumber}`)
	const selectValue = document.querySelector(`.play_select${gameNumber}`).value
	const deleteButton = document.querySelector(`.deleteButton${gameNumber}`)

	const gameBoard = document.querySelector(`.boardNumber${gameNumber}`)
	const statusGame = document.querySelector(`.status${gameNumber}`)
	const gameSettings = settings()

	statusGame.style.display = "none"
	gameBoard.style.display = "flex"
	ControlBoard.removeChild(serchControler)
	const controlers = creatControler(ControlBoard,gameNumber,controlerOpp)

	const matrix = []
	const creatMatrix = getEmptyMatrix(matrix,selectValue)
	const boardWidth = setBoardSizeWidth(matrix.length,gameBoard)
	characterAmount(matrix.length, gameSettings)
	const setRabbit = placeCharacter(RABBIT_CELL, gameSettings.rabbit,matrix)
	const setHome = placeCharacter(HOME_CELL, gameSettings.home,matrix)
	const setwolvse = placeCharacter(WOLF_CELL, gameSettings.wolves,matrix)
	const setBan = placeCharacter(BAN_CELL,  gameSettings.bans,matrix)
	const creatDiv = createCell(matrix,gameNumber)

	const Move = characterMove(matrix,gameNumber,controlerOpp)
}

const getEmptyMatrix = (matrix, size) => {
	for(let i = 0; i < size; i++){
		matrix[i] = []
		for(let j = 0; j < size; j++){
			matrix[i][j] = FREE_CELL
		}
	}
}

const getRandomFreeCell = (length,matrix) => {
	const x = Math.floor(Math.random() * length)
	const y = Math.floor(Math.random() * length)
	if(matrix[y][x] === FREE_CELL){
		return [y,x]
	}else{
		return getRandomFreeCell(length,matrix)
	}
}

const placeCharacter = (character,amount,matrix) =>{
	for(let i = 0; i < amount; i++){
		const arr = getRandomFreeCell(matrix.length,matrix)
		const [x,y] = [arr[0], arr[1]]
		matrix[x][y] = character
	}
}

const setBoardSizeWidth = (length,board) => {
	const boxWidth = length * BOX_SIZE
	board.style.width = boxWidth + "px"
}


const characterAmount = (length, gameSettings) => {
	gameSettings.wolves = (length * 60) / 100
	gameSettings.bans = (length * 40) / 100
}

const findCharacterCoordinate = (character,matrix) => {
	const arrXY = []
	for(let i = 0; i < matrix.length; i++){
		for(let j =0; j < matrix.length; j++){
			if(matrix[i][j] === character){
				arrXY.push([i,j])
			}
		}
	}
	return arrXY
}


const characterMove = (matrix,gameNumber, controlerOpp) => {
	controlerOpp.map((element) => {
		srechControler = document.querySelector(`.controler${gameNumber}-${element}`)
		srechControler.addEventListener("click", function(){
			const RabbitCoordinate = findCharacterCoordinate(RABBIT_CELL,matrix)[0]
			const rabbitMove= searchPlaceRabbit(RabbitCoordinate, element,matrix)
			objectPlace(rabbitMove,RabbitCoordinate,RABBIT_CELL,WOLF_CELL,matrix,gameNumber)
			wolvesMove(matrix,gameNumber, RabbitCoordinate)
			createCell(matrix,gameNumber)
		})
	})

	}

function createCell(matrix,gameNumber){
	const board = document.querySelector(`.boardNumber${gameNumber}`)
	board.innerHTML = " "
	let boardNumber = 0
	for (let i = 0; i < matrix.length; i++){
		for(let j = 0; j < matrix.length; j++){
			const div = document.createElement("div")
			div.id = `${boardNumber}`
			board.appendChild(div)
			boardNumber++
			if(matrix[i][j] != 0){
				const img = document.createElement("img")
				img.src = gameImg[matrix[i][j]].src
				img.name = gameImg[matrix[i][j]].name
				div.appendChild(img)
			}
		}
	}
}


const searchPlaceRabbit = ([x, y],controler,matrix) => {	
	if(controler === `Up`){
		x -= 1
		if(x === -1){
			x = matrix.length - 1
		}
	}
	if(controler === `Right`){
		x += 1
		if(x > matrix.length -1){
			x = 0	
		}
	}
	if(controler === `Down`){
		y -= 1
		if(y === -1){
			y = matrix.length - 1
		}
	}
	if(controler === `Left`){
		y += 1
		if(y > matrix.length - 1){
			y = 0
		}
	}
	return [x,y]
}


const legitimCells = [FREE_CELL, RABBIT_CELL]

const isLegitimCellForWolf = ([x, y],matrix) => {
  if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length && legitimCells.includes(matrix[x][y])) {
    return [x,y]
  }
}


const calcDistance = ([x1, y1]) => ([x2, y2]) =>
    Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2



const findeH = (allDirections,matrix,[RabbitCoordX,RabbitCoordY], wolvesCoord) => {
	const legalDirections = allDirections.filter((element) => isLegitimCellForWolf(element,matrix))
	const distances = legalDirections.map((element) => calcDistance([RabbitCoordX, RabbitCoordY])(element))
	const minDistance = distances.reduce((element1, element2, i) =>  Math.min(element1,element2))
	const minDistanceIndex = distances.findIndex((element) => element === minDistance)
	return legalDirections[minDistanceIndex]
}


const direction = ([x,y]) => {
	return [
		[x + 1, y],
		[x - 1, y],
		[x, y + 1],
		[x, y  - 1]
	]
}





const objectPlace = ([x,y],[yBefore, xBefore],character,characterEqual,matrix,gameNumber) => {
	const gameBoard = document.querySelector(`.boardNumber${gameNumber}`)
	const statusGame = document.querySelector(`.status${gameNumber}`)
	const h2 = document.querySelector(`.h2-${gameNumber}`)
	if(matrix[x][y] === FREE_CELL){
		matrix[yBefore][xBefore] = FREE_CELL
		matrix[x][y] = character
	}
	if(matrix[yBefore][xBefore] === RABBIT_CELL){
		if(matrix[x][y] === HOME_CELL){
			gameBoard.style.display = "none"
			statusGame.style.display = "flex"
			h2.innerHTML = "YOU WON"
		}
	}

	if(matrix[x][y] === characterEqual){
		gameBoard.style.display = "none"
		statusGame.style.display = "flex"
		h2.innerHTML = "Game Over"
	}
}


const wolvesMove = (matrix,gameNumber,RabbitCoordinate) => {
		const wolvesCoordinate = findCharacterCoordinate(WOLF_CELL,matrix)
		wolvesCoordinate.map((element) => {
			const allDirection = direction(element, matrix.length)
			const h = findeH(allDirection,matrix,RabbitCoordinate, element)
			objectPlace(h, element,WOLF_CELL, RABBIT_CELL, matrix, gameNumber)
		})
}
