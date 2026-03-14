import React from "react";
import "./Sidebar.css";

const Sidebar = ({ subjects = [], selectedSubject, onSelect }) => {
	return (
		<aside className="sidebar">
			<h2 className="sidebar-title">Subjects</h2>

			{subjects.map((subject, index) => (
				<div
					key={index}
					className={`sidebar-item ${selectedSubject === subject ? "active" : ""}`}
					onClick={() => onSelect(subject)}
				>
					{subject}
				</div>
			))}
		</aside>
	);
};

export default Sidebar;
