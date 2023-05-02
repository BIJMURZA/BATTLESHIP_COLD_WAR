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

window.onclick = function (event) {
    if (event.target === document.getElementById('modalRules')) {
        document.getElementById('modalRules').style.display = 'none';
    }
    if (event.target === document.getElementById('modalSettings')) {
        document.getElementById('modalSettings').style.display = 'none';
    }
}

function startNewBackground() {
    document.getElementById("videoTheme").src = "video/ColdWar_Theme.mp4";
    document.getElementById("videoTheme").play();
    document.getElementById("audioTheme").src = "ost/ColdWar%20-%20Comrades.mp3";
    document.getElementById("audioTheme").play();
}

function start() {
    document.getElementById("StartGame").style.display = "none";
    document.getElementById("buttonRules").style.display = "none";
    document.getElementById("buttonSettings").style.display = "none";
    startNewBackground();
}