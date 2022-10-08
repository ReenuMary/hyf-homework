import { useState } from "react";
import { useEffect } from "react";
import "./css/list-header.css";

function ListHeader() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="header-font">
        You have used {timeElapsed} seconds on this page
      </p>
      <h1 className="header-font">To Do List</h1>
    </>
  );
}
export default ListHeader;
