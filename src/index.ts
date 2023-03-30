// selecting elements
const mainEl: HTMLElement = document.querySelector("main")!;
const sectionTitleH1El: HTMLHeadingElement =
  document.querySelector(".section-title h1")!;

// API URL
const API_URL = "https://api.github.com/users";

type User = {
  id: number;
  login: string;
  html_url: string;
};

// *** Fetching Users *** //
async function fetchUsers() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) {
      sectionTitleH1El.textContent = "something went wrong";
      throw new Error("Something wen wrong");
    }

    // Data Received Successfully
    const data = await resp.json();
    const user: User[] = data.map(
      (user: any): User => ({
        id: user["id"],
        login: user["login"],
        html_url: user["html_url"],
      })
    );

    return user;
  } catch (e) {
    console.log(e);
  }
}

// *** Creating users table class *** //
class UsersTable {
  private readonly users: User[];
  constructor(_users: User[]) {
    this.users = _users;
  }

  public generateTable(): HTMLTableElement {
    // creating a table element
    const tableEl: HTMLTableElement = document.createElement("table");

    // **** Thead Elements Creation *** //

    // creating a table head element
    const theadEl: HTMLTableSectionElement = document.createElement("thead");
    const theadRowEl: HTMLTableRowElement = theadEl.insertRow();

    // creating header cells for the column
    const idHeaderEl: HTMLTableCellElement = document.createElement("th");
    const usernameHeaderEl: HTMLTableCellElement = document.createElement("th");
    const profileLinkHeader: HTMLTableCellElement =
      document.createElement("th");

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
    const tbodyEl: HTMLTableSectionElement = document.createElement("tbody");
    this.users.forEach((user: User) => {
      const tbodyRowEl: HTMLTableRowElement = tbodyEl.insertRow();
      const tbodyIdEl: HTMLTableCellElement = tbodyRowEl.insertCell();
      const tbodyUsernameEl: HTMLTableCellElement = tbodyRowEl.insertCell();
      const tbodyProfileEl: HTMLTableCellElement = tbodyRowEl.insertCell();
      const profileLinkAnchorEl: HTMLAnchorElement =
        document.createElement("a");
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

async function init() {
  const users: User[] | undefined = await fetchUsers();

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
  const generatedTableEl: HTMLTableElement = userTable.generateTable();

  // now append generated table element on main element
  mainEl.appendChild(generatedTableEl);
}

window.addEventListener("load", init);
