import React, { useState } from "react";
import dropIcon from "../images/dropIcon.svg";
import styles from "./dropdown.module.css";

const Dropdown = ({ data, getData }) => {
  const [Selected, setSelected] = useState("Select");
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  function handleClick(i) {
    getData(data[i])
    setSelected(data[i])
  }

  return (
    <div className={styles.dropdown} onClick={()=>{
        handleToggle()
    }}>
      <span>{Selected}</span>
      <img src={dropIcon} alt="dropIcon" />
      <div
        style={{ display: `${toggle ? "flex" : "none"}` }}
        className={styles.list}
      >
        {data.map((a, i) => (
          <span
            onClick={() => {
              handleClick(i);
            }}
            key={i}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
