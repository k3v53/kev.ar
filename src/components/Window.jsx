import { nanoid } from "nanoid";
import { useEffect, useRef, useState, getDOMNode } from "react";

function Window(props) {
	const [id] = useState(nanoid());
	const [state, setState] = useState({
		pos: props.initialPos || { x: 0, y: 0 },
		dragging: false,
		rel: null, // position relative to the cursor
	}); 
	function onDrag({ movementX, movementY }) {
		let getStyle = window.getComputedStyle(wrapper);
		let leftVal = parseInt(getStyle.left);
		let topVal = parseInt(getStyle.top);
		wrapper.style.left = `${leftVal + movementX}px`;
		wrapper.style.top = `${topVal + movementY}px`;
	}
	const mounted = useRef();
	useEffect(function () {
		if (!mounted.current) {
			// do componentDidMount logic
			mounted.current = true;
		} else {
			// do componentDidUpdate logic
			// document.addEventListener("mousemove", this.onMouseMove);
			// document.addEventListener("mouseup", this.onMouseUp);
		}
	});
	return (
		<div
			className="wrapper"
			id={id}
			onMouseDown={function (e) {
				// only left mouse button
				if (e.button !== 0) return;
				console.log(e)
				// var pos = $(getDOMNode()).offset();
				setState({
					dragging: true,
					rel: {
						x: e.pageX - e.movementX,
						y: e.pageY - e.movementY,
					},
				});
				e.stopPropagation();
				e.preventDefault();
			}}
			onMouseUp={function (e) {
				setState({ dragging: false });
				e.stopPropagation();
				e.preventDefault();
			}}
			onMouseMove={function (e) {
				if (!state.dragging) return;
				setState({
					pos: {
						x: e.pageX - state.rel.x,
						y: e.pageY - state.rel.y,
					},
				});
				e.stopPropagation();
				e.preventDefault();
			}}
			style={{
				left: state.pos.x + "px",
				top: state.pos.y + "px",
			}}
		>
			<header>Draggable Div</header>
			<div className="content">
				<div className="icon">
					<i className="bx bx-move"></i>
				</div>
				<div className="title">Draggable Div</div>
				<p>
					This is a draggable div which is created using HTML CSS & JavaScript.
					You can move this div anywhere on the document or page.
				</p>
			</div>
		</div>
	);
}
export default Window;
