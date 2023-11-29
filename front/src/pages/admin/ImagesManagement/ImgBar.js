import React, { useState } from "react";
import "./ImgBar.css";
import { ImageIcon } from "@primer/octicons-react";
import ImgTable from "./ImgTable";
export default function ImgBar() {
  const data = [
    { id: 1, label: "img1" },
    { id: 2, label: "img2" },
    { id: 3, label: "img3" },
    { id: 4, label: "img4" },
    { id: 5, label: "img5" },
    { id: 6, label: "img6" },
  ];

  return (
    <div>
      <div className="headerDash">
        <div className="peopleIcon">
          <ImageIcon size={48} />
        </div>
        <p className="dashTitle">Gestion des images</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "40%",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher une image"
          className="searchBar"
        />
        <button className="btn btn-primary">Ajouter une image</button>
      </div>
      <ImgTable data={data} headers={["ID", "Label"]} />
    </div>
  );
}
