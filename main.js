const cursor = document.getElementById("cursor");
const cursorWrite = document.getElementById("cursorWrite");
const writeStrings = [
	/* #region General Roles */
	"IT Student",
	"IoT Lover",
	"Linux Lover",
	"Freelancer",
	"Independent Developer",
	"Open Source Supporter",
	/* #endregion */
	/* #region Developer Roles */
	"Full-Stack Developer",
	"Full-Stack Web Developer",
	"Back-End Developer",
	/* #endregion */
	/* #region Framework Specific Roles */
	"LAMP Developer\n(Linux, Apache, MySQL, PHP)",
	"MERN Developer\n(MongoDB, Express.js, React, Node.js)",
	"NodeJS Back-End Developer",
	"Express.js Developer",
	"React Developer",
	"Svelte Developer",
	"Flutter Developer",
	/* #endregion */
];
cursorWrite.innerHTML = "";

const writeSomething = (writeString) =>
	new Promise((res) => {
		let counter = 0;
		let writeInterval = (timeout) =>
			setTimeout(() => {
				let newTimeout = (Math.random() * 125 + 50 + timeout) / 2;
				cursorWrite.innerHTML = writeString.slice(0, counter);
				counter++;
				if (counter <= writeString.length) {
					writeInterval(newTimeout);
				} else {
					res(true);
				}
			}, timeout);
		writeInterval(75);
	});
const deleteWriteString = (writeString) =>
	new Promise((res) => {
		let counter = parseInt(writeString.length);
		let deleteInterval = () =>
			setTimeout(() => {
				cursorWrite.innerHTML = writeString.slice(0, counter);
				counter--;
				if (counter >= 0) {
					deleteInterval();
				} else {
					res(true);
				}
			}, 75);
		deleteInterval();
	});

const sleep = (millis) =>
	new Promise((res) =>
		setTimeout(() => {
			res(true);
		}, millis)
	);

function shuffleArray(array) {
	let currentId = array.length;
	while (0 !== currentId) {
		let randId = Math.floor(Math.random() * currentId);
		currentId -= 1;
		// Swap it with the current element.
		[array[randId], array[currentId]] = [array[currentId], array[randId]];
	}
	return array;
}
const wordInterval = async (index) => {
	randomArray = writeStrings;
	const writeString = randomArray[index];
	cursor.classList.remove("blinkingCursor");
	await writeSomething(writeString);
	cursor.classList.add("blinkingCursor");
	await sleep(1000 * 2);
	cursor.classList.remove("blinkingCursor");
	await deleteWriteString(writeString);
	cursor.classList.add("blinkingCursor");
	await sleep(500);
	if (index > randomArray.length) {
		index = -1;
		shuffleArray(randomArray);
	}
	wordInterval(++index);
};
wordInterval(0);
