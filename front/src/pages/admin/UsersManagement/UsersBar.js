import React, { useState } from "react";
import "./UsersBar.css";
import { PeopleIcon } from "@primer/octicons-react";
import Table from "../Table/Table";
export default function UsersBar() {
  const data = [
    { id: 1, firstname: "Jill", lastname: "Smith", mail: "mail@mail.com" },
    { id: 2, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 3, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 4, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 5, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 6, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 7, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 8, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 9, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 10, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 11, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 12, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 13, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 14, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 15, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 16, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 17, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 18, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 19, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 20, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
    { id: 21, firstname: "Jill", lastname: "Smith", mail: "dada@đaa.fa" },
  ];

  return (
    <div>
      <div className="headerDash">
        <div className="peopleIcon">
          <PeopleIcon size={48} />
        </div>
        <p className="dashTitle">Gestion des utilisateurs</p>
      </div>
      <Table data={data} headers={["ID", "Prénom", "Nom", "Email"]} />
    </div>
  );
}
