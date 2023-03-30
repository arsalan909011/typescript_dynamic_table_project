"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// selecting elements
const mainEl = document.querySelector("main");
const sectionTitleH1El = document.querySelector(".section-title h1");
// API URL
const API_URL = "https://api.github.com/users";
// *** Fetching Users *** //
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resp = yield fetch(API_URL);
            if (!resp.ok) {
                sectionTitleH1El.textContent = "something went wrong";
                throw new Error("Something wen wrong");
            }
            // Data Received Successfully
            const data = yield resp.json();
            const user = data.map((user) => ({
                id: user["id"],
                login: user["login"],
                html_url: user["html_url"],
            }));
            return user;
        }
        catch (e) {
            console.log(e);
        }
    });
}
// *** Creating users table class *** //
class UsersTable {
    constructor(_users) {
        this.users = _users;
    }
    generateTable() {
        // creating a table element
        const tableEl = document.createElement("table");
        // **** Thead Elements Creation *** //
        // creating a table head element
        const theadEl = document.createElement("thead");
        const theadRowEl = theadEl.insertRow();
        // creating header cells for the column
        const idHeaderEl = document.createElement("th");
        const usernameHeaderEl = document.createElement("th");
        const profileLinkHeader = document.createElement("th");
        // inserting data inside header cells
        idHeaderEl.textContent = "id";
        usernameHeaderEl.textContent = "username";
        profileLinkHeader.textContent = "profile link";
        // inserting header cell to the thead row element
        theadRowEl.appendChild(idHeaderEl);
        theadRowEl.appendChild(usernameHeaderEl);
        theadRowEl.appendChild(profileLinkHeader);
        // inserting table head element on table element
        tableEl.appendChild(theadEl);
        // *** Table Body Elements Creation *** //
        // creating table body element
        const tbodyEl = document.createElement("tbody");
        this.users.forEach((user) => {
            const tbodyRowEl = tbodyEl.insertRow();
            const tbodyIdEl = tbodyRowEl.insertCell();
            const tbodyUsernameEl = tbodyRowEl.insertCell();
            const tbodyProfileEl = tbodyRowEl.insertCell();
            const profileLinkAnchorEl = document.createElement("a");
            tbodyIdEl.textContent = user.id.toString();
            tbodyUsernameEl.textContent = user.login;
            profileLinkAnchorEl.href = user.html_url;
            profileLinkAnchorEl.target = "_blank";
            profileLinkAnchorEl.textContent = "Link";
            tbodyProfileEl.appendChild(profileLinkAnchorEl);
        });
        tableEl.appendChild(tbodyEl);
        return tableEl;
    }
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers();
        // if something went wrong
        if (!users) {
            sectionTitleH1El.textContent = "something went wrong";
            return;
        }
        // data is fetched successfully
        sectionTitleH1El.textContent = "github users";
        // creating instance of users table
        const userTable = new UsersTable(users);
        // invoking generate table method
        const generatedTableEl = userTable.generateTable();
        // now append generated table element on main element
        mainEl.appendChild(generatedTableEl);
    });
}
window.addEventListener("load", init);
//# sourceMappingURL=index.js.map