function openForm() {
    document.getElementById("form").style.display = "block";
    var span = document.getElementsByClassName("close")[1];
    span.onclick = function() {
        document.getElementById("form").style.display = "none";
        location.reload();
    }
}

function other() {
    var number = document.getElementById("name").value;
    if (number !== "") {
        document.querySelector("#intro").style.display = "none";
        document.querySelector("#form").style.display = "none";
        let user = document.getElementById("name").value;
        document.getElementById("user").innerText = user;
        document.getElementById("level").style.display = "block";
        var span = document.getElementsByClassName("close")[2];
        span.onclick = function() {
            document.getElementById("form").style.display = "none";
            location.reload();
        }
    } else {
        alert("Please Enter The Name.");
    }
}

function easyGame() {
    document.querySelector("#level").style.display = "none";
    let level = 'easy';
    createTable(level);
}

function mediumGame() {
    document.querySelector("#level").style.display = "none";
    let level = 'medium';
    createTable(level);
}

function hardGame() {
    document.querySelector("#level").style.display = "none";
    let level = 'hard';
    createTable(level);
}

function leaderBoard() {
    let winners = JSON.parse(localStorage.getItem('winners'));
    var span = document.getElementsByClassName("close")[3];
    span.onclick = function() {
        document.getElementById("leadTable").style.display = "none";
        location.reload();
    }
    document.getElementById('leadTable').style.display = "block";
    let leadTable = document.querySelector('.lead');
    for (let i = 0; i < winners.length; i++) {
        let tr = document.createElement('tr');
        tr.className = "leadtr"
        let tdName = document.createElement('td');
        tdName.innerText = winners[i].name;
        tdName.className = "leadtd"
        tr.appendChild(tdName);
        let tdScore = document.createElement('td');
        tdScore.innerText = winners[i].score;
        tdScore.className = "leadtd"
        tr.appendChild(tdScore);
        leadTable.appendChild(tr);
    }
}

/*
Function : createTable
Type : Primary
Purpose : Generates a HTML Table Dynamically
*/
function createTable(level) {
    if (!localStorage.getItem('winners')) {
        localStorage.setItem('winners', JSON.stringify([]));
    }
    let tableData = cellData();
    document.querySelector("center").style.display = "block";
    document.querySelector(".leaderBoard").style.display = "block";
    let table = document.getElementById("myTable");
    table.style.display = "table";
    for (let i = 0; i < 10; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < 10; j++) {
            let td = document.createElement("td");
            td.id = tableData[i][j];
            td.innerText = tableData[i][j];
            tr.appendChild(td);
            td.addEventListener('click', (e) => {
                checkMultiple(e, tableData, level);
            });
        }
    }
}
/*
Function : checkMultiple
Purpose :Finds all the multiples of the given element
Return Value : 
*/
function checkMultiple(e, tableData, level) {
    // console.log(e.target.innerText);
    document.querySelector("center").style.display = "block";
    if (e.target.innerText) {
        let clickedElement = Number(e.target.innerText);
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
        var span = document.getElementsByClassName("close")[0];
        let score = document.getElementById("score").innerText;
        let user = document.getElementById('user').innerText;
        span.onclick = function() {
            modal.style.display = "none";
            location.reload(checkMultiple);
        }
        if (clickedElement === 1) {
            document.getElementById("winner").play();
            modal.style.display = "block";
            document.getElementById("score").innerText = ++score;
            document.querySelector(".win").innerHTML = "<h1>Hurray!!<br />You Won the Game.</h1>";
            document.querySelector(".win").style.display = "flex";
            document.querySelector(".modal-content").style.backgroundImage = "url(./assests/images/winner.jpg)";
            document.querySelector(".modal-content").style.backgroundSize = "cover";
            document.querySelector(".modal-content").style.backgroundPosition = "center";

            function compareScore(a, b) {
                return (a.score - b.score);
            }
            //Pushing the user into LocalStorage
            let winners = JSON.parse(localStorage.getItem('winners'));
            if (winners.length < 3) {
                winners.push({ name: user, score: score });
                winners = winners.sort(compareScore);
                localStorage.setItem('winners', JSON.stringify(winners));
            } else {
                for (let i = 0; i < winners.length; i++) {
                    if (winners[i].score > score) {
                        winners.pop();
                        winners.push({ name: user, score: score });
                        winners = winners.sort(compareScore);
                        localStorage.setItem('winners', JSON.stringify(winners));
                    } else if (winners[i].score === score) {
                        winners.pop();
                        winners.push({ name: user, score: score });
                        winners = winners.sort(compareScore);
                        localStorage.setItem('winners', JSON.stringify(winners));
                    }
                }
            }
        } else if (level === "easy") {
            const bugs = [2, 3, 5, 7];
            bugLevel(bugs);
        } else if (level === "medium") {
            const bugs = [2, 3, 5, 7, 11, 13, 17, 19];
            bugLevel(bugs);

        } else if (level === "hard") {
            const bugs = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
            bugLevel(bugs);

        }

        function bugLevel(bugs) {
            if (bugs.includes(clickedElement)) {
                document.getElementById("looser").play();
                modal.style.display = "block";
                document.querySelector(".win").innerHTML = "";
                document.querySelector(".win").style.display = "flex";
                document.querySelector(".modal-content").style.backgroundImage = "url(./assests/images/gameOver.jpg)";
                document.querySelector(".modal-content").style.backgroundSize = "cover";
                document.querySelector(".modal-content").style.backgroundPosition = "center";
            } else {
                document.getElementById("score").innerText = ++score;
                tableData.forEach(row => {
                    row.forEach(ele => {
                        if (ele % clickedElement === 0) {
                            document.getElementById(ele).style.backgroundImage = "url(./assests/images/image1.png)";
                            document.getElementById(ele).style.backgroundSize = "100%";
                            document.getElementById(ele).innerText = null;
                            document.getElementById("coin").play();
                        }
                    })
                })
            }
        }
    } else {
        document.getElementById("error").play();
    }
}


/*
    Function : cellData
    Purpose : Generates CellData(2D Array) with shuffled elements
    Return Value : Shuffled 2D Array
    */
function cellData() {
    //Create an Empty 2D Array
    const tableData = new Array(10);
    for (let i = 0; i < 10; i++) {
        tableData[i] = new Array(10);
    }
    //Assign values from 1-100 to the 2D Array
    let a = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            tableData[i][j] = ++a;
        }
    }
    // Shuffle the Row Array Elements
    tableData.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 10; i++) {
        tableData[i].sort(() => Math.random() - 0.5);
    }
    return tableData;
}