/* #region  Prototype Modifications */
Array.prototype.shuffle = function () {
	return this.sort(() => Math.random() - 0.5);
};
/* #endregion */

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
	"Front-End Developer",
	"Back-End Developer",
	"Cross-Platform Developer (Flutter)",
	"Desktop Developer (Flutter)",
	"Mobile Developer (Flutter)",
	/* #endregion */
	/* #region  Language Roles */
	"PHP Developer",
	/* #endregion */
	/* #region Framework Specific Roles */
	"LAMP Developer\n(Linux, Apache, MySQL, PHP)",
	"MERN Developer\n(MongoDB, Express.js, React, Node.js)",
	"NodeJS Back-End Developer",
	"React Developer",
	"Svelte Developer",
	"Flutter Developer",
	"Express.js Developer",
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

const wordInterval = async (index) => {
	randomArray = writeStrings;
	const writeString = randomArray[index];
	// console.log("wordInterval",index, randomArray.length, writeString)
	cursor.classList.remove("blinkingCursor");
	await writeSomething(writeString);
	cursor.classList.add("blinkingCursor");
	await sleep(1000 * 2);
	cursor.classList.remove("blinkingCursor");
	await deleteWriteString(writeString);
	cursor.classList.add("blinkingCursor");
	await sleep(500);
	if (index >= randomArray.length - 1) {
		index = -1;
		randomArray.shuffle();
	}
	wordInterval(++index);
};
writeStrings.shuffle();
wordInterval(0);
