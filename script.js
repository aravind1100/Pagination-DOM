function createTags(tag, id, content) {
  const tags = document.createElement(tag);
  tags.id = id;
  tags.innerText = content;
  return tags;
}

const h1 = createTags("h1", "title", "Pagination");
const p = createTags(
  "p",
  "description",
  "This Pagination is created using DOM"
);
const nav = createTags("nav", "nav", "");
const ul = createTags("ul", "pagination", "");
const header = createTags("header", "header", "");
const main = createTags("main", "main", "");
const buttonDiv = createTags("div", "buttons", "");
buttonDiv.className = "d-flex justify-content-center";

document.body.append(header);
header.append(h1, p);
document.body.append(main);
document.body.append(buttonDiv);
buttonDiv.appendChild(nav);
nav.appendChild(ul);

for (let i = -1; i <= 12; i++) {
  const li = createTags("li", "", "");
  const a = createTags("a", "", "");
  if (i === 0) {
    a.innerText = "Previous";
  } else if (i === -1) {
    a.innerText = "First";
  } else if (i === 11) {
    a.innerText = "Next";
  } else if (i === 12) {
    a.innerText = "Last";
  } else {
    a.innerText = i;
  }
  a.id = a.innerText;
  ul.append(li);
  li.append(a);
}

const div = createTags("div", "div", "");
div.className = "table-responsive";
div.innerHTML = `  
    <table id="table">
    <thead >
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="tbody"></tbody></table>`;
main.append(div);
const table = document.getElementById("table");
table.className = "table table-bordered";

var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  true
);
request.send();
request.onload = function () {
  var data = request.response;
  var res = JSON.parse(data);
  console.log(res);
  const itemsPerPage = 10;
  const totalPages = 10;

  displayPage(res.slice(0, itemsPerPage));

  function displayPage(items) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // Clear previous data

    for (let i = 0; i < items.length; i++) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${items[i].id}</td>
            <td>${items[i].name}</td>
            <td>${items[i].email}</td>
        `;
      document.getElementById("tbody").append(tr);
    }
  }

  let currentPage = 1;
  const next = document.getElementById("Next");
  const previous = document.getElementById("Previous");
  const first = document.getElementById("First");
  const last = document.getElementById("Last");

  next.addEventListener("click", function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      displayPage(res.slice(startIndex, endIndex));
    }
  });
  previous.addEventListener("click", function previousPage() {
    if (currentPage > 1) {
      currentPage--;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      displayPage(res.slice(startIndex, endIndex));
    }
  });

  first.addEventListener("click", () => {
    currentPage = 1;
    displayPage(res.slice(0, itemsPerPage));
  });

  last.addEventListener("click", () => {
    currentPage = totalPages;
    const startIndex = res.length - itemsPerPage;
    const endIndex = res.length;
    displayPage(res.slice(startIndex, endIndex));
  });

  for (let i = 1; i <= 10; i++) {
    let ele = document.getElementById(`${i}`);
    ele.addEventListener("click", () => {
      let startValue = 0;
      let endValue = itemsPerPage;
      for (let j = 1; j <= 10; j++) {
        if (i === j) {
          currentPage = j;
          displayPage(res.slice(startValue, endValue));
          break;
        }
        startValue += itemsPerPage;
        endValue += itemsPerPage;
      }
    });
  }
};
