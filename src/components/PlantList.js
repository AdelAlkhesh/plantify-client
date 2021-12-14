import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

export default function PlantList(props) {
  const { userPlants } = props;

  return (
    <div>
      <div>
        {userPlants.map((ele) => {
          return (
            <div>
              <Link to={`plantFamily/${ele._id}`}>{ele.nickname}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
