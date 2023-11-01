import React, { useState } from "react";
import Room from "../assets/img/111.png";
import image from "../assets/img/222.png";
const App = () => {
	return (
		<div>
			<span>Reeeeacasdt2</span>
			<div className="room" style={{ backgroundImage: `url(${image})` }}></div>
			<img src={Room} alt="" />
		</div>
	);
};
export default App;
