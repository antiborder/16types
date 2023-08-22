import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <>
    <h2>お探しのページは存在しません。</h2>
    <Link to="/16types" >
      HOME
      </Link>
    </>
  )
}

export default NoMatch;