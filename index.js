let enemyShip = 4; // общее количество вражеских кораблей
let ships = 4; // общее количество кораблей союзника
let fships = 4; // количество клеток для Линкора (4-х палубный корабль)
let thships = 6; // количество клеток для Крейсера (3-х палубный корабль)
let twships = 6; // количество клеток для Эсминцев (2-х палубный корабль)
let shlupki = 4; // количество клеток для Шлюпки (1 палубный корабль)
let begin = null;
let left = null;
let right = null;
let up = null;
let down = null;
let direction = null; // направление клеток
let array = [];
const lot = Math.floor(Math.random() * 2) + 1; // 1 - Первый ход за союзниками || 2 - Первый ход за Капиталистами
let move = true; //true - ваш ход, false - ход противника

let allaybattlefield = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false]
]; // поле союзника

let enemybattlefield = [
    [true, false, false, false, true, false, true, false, false, false],
    [true, false, false, false, true, false, true, false, false, false],
    [true, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [true, true, true, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [true, true, true, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [true, false, true, false, true, false, true, false, false, false]
] // поле врага



document.getElementById("buttonRules").onclick = function () {
    document.getElementById("modalRules").style.display = "block";
}

document.getElementById("buttonSettings").onclick = function () {
    document.getElementById("modalSettings").style.display = "block";
}

document.getElementById("saveSettings").addEventListener("click", function(){
    if (document.getElementById('volumeSwitch').checked === true) {
        document.getElementById("audioTheme").play();
    } else {
        document.getElementById("audioTheme").pause();
    }
    document.getElementById('modalSettings').style.display = 'none';
})

window.onclick = function(event) {
    if (event.target === document.getElementById('modalRules')) {
        document.getElementById('modalRules').style.display = 'none';
    }
}

function startNewBackground() {
    document.getElementById("videoTheme").src = "video/ColdWar_Theme.mp4";
    document.getElementById("videoTheme").play();
    document.getElementById("audioTheme").src = "ost/ColdWar%20-%20Comrades.mp3";
    document.getElementById("audioTheme").play();
    newTableAlbattlefield();
}

function fill (array) {
    for (let i = 0; i < array.length - 1; i += 2) {
        let x = array[i];
        let y = array[i+1];

        if (getCell(x, y) !== undefined) {
            allaybattlefield[x][y] = true;
        }
    }
    return array.length = 0;
}

function dir (id) {
    if (direction === null) {
        if (id === left - 1 || id === right + 1) {
            direction = "hor";
        }
        if (id === up - 10 || id === down + 10) {
            direction = "ver";
        }
    }

    if (direction === "hor"){
        if (id === left - 1) {
            left = id;
            return true;
        } else if (id === right + 1) {
            right = id;
            return true;
        } else {return false;}
    } else if (direction === "ver") {
        if (id === up - 10) {
            up = id;
            return true;
        } else if (id === down + 10) {
            down = id;
            return true;
        } else {return false;}
    } else {return false;}
}

function getCell(x, y) {
    if (x < 0 || x >= allaybattlefield.length || y < 0 ||y >= allaybattlefield[x].length) {
        return undefined;
    }
    return allaybattlefield[x][y];
}

function check (x, y) {
    if ((getCell(x, y) !== true) &&
        (getCell(x, y-1) !== true) && (getCell(x, y+1) !== true) &&
        (getCell(x-1, y) !== true) && (getCell(x+1, y) !== true) &&
        (getCell(x-1, y-1) !== true) && (getCell(x-1, y+1) !== true) &&
        (getCell(x+1, y-1) !== true) && (getCell(x+1, y+1) !== true))
    {
        console.log("true");
        return true;
    }
    else
    {
        console.log("false")
        return false;
    }
}

function linkor (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (fships > 0) {
        if (begin == null) {
            begin = parseInt(event.target.id);
            left = begin;
            right = begin;
            up = begin;
            down = begin;
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = true;
            console.log(allaybattlefield);
            fships--;
            return;
        }
        if (dir(parseInt(event.target.id)) === true) {
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = true;
            fships --;
        } else { return; }

        if (fships === 0) {
            ships--;
            begin = null;
            left = null;
            right = null;
            up = null;
            down = null;
            direction = null;
        }
    }
    locate_albattlefield();
}

function craser (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (thships > 0) {
        if (check(x, y) === true) {
            if (begin === null) {
                begin = parseInt(event.target.id);
                left = begin;
                right = begin;
                up = begin;
                down = begin;
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                thships--;
                return;
            }
            if (dir(parseInt(event.target.id)) === true) {
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                thships--;
            } else {
                return;
            }
            if (thships === 3) {
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            } else if (thships === 0) {
                ships--;
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            }
        }
    }
    locate_albattlefield();
}

function esminec (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (twships > 0) {
        if (check(x, y) === true) {
            if (begin === null) {
                begin = parseInt(event.target.id);
                left = begin;
                right = begin;
                up = begin;
                down = begin;
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                twships--;
                return;
            }
            if (dir(parseInt(event.target.id)) === true) {
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                twships--;
            } else {
                return;
            }

            if (twships === 4) {
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            } else if (twships === 2) {
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            } else if (twships === 0) {
                console.log("twships = 0: " + array)
                fill(array);
                ships--;
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            }
        }
    }
    locate_albattlefield();
}

function shlupka (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (shlupki >= 1) {
        if (check(x,y) === true) {
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = true;
            shlupki --;
            if (shlupki === 1) {
                ships --;
            }
        }
    }
    locate_albattlefield();
}

function startShoot() {
    newTable();
}

function locate_albattlefield() {
    switch (ships) {
        case 4:
            document.getElementById("albattlefield").addEventListener("click", linkor);
            break;
        case 3:
            document.getElementById("albattlefield").addEventListener("click", craser);
            break;
        case 2:
            document.getElementById("albattlefield").addEventListener("click", esminec);
            break;
        case 1:
            document.getElementById("albattlefield").addEventListener("click", shlupka);
            break;
    }
    if (ships === 0) {
        startShoot();
    }
}

function newTableAlbattlefield() {
    document.getElementById("albattlefield").classList.remove("hidden");
    document.getElementById("USSR").style.display ="block";
    locate_albattlefield ();
}

function start() {
    document.getElementById("StartGame").style.display = "none";
    document.getElementById("buttonRules").style.display = "none";
    document.getElementById("buttonSettings").style.display = "none";
    startNewBackground();
}