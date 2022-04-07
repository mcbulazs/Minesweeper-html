var meret = document.getElementById("meret").value
var mines = document.getElementById("mines").value
var game = document.getElementById("tabla")
var mineok = []
var wastedtiles = []
var szamokRevealed= []
var jelolt = []
var asd = true
var jatekveg = true

function ujjatek() {
    game.innerHTML = ""
    mineok = []
    wastedtiles = []
    szamokRevealed = []
    jelolt = []
    jatekveg=true
    asd=true
    meret = document.getElementById("meret").value
    mines = document.getElementById("mines").value
    game.style.width = (meret * 25) + (meret * 2)
    game.style.height = (meret * 25) + (meret * 2)
    tabla()
    if (hulyebiztos()) {
        bombak()
    }
}

function hulyebiztos() {
    if (mines >= meret * meret || mines <= 0 || meret > 25 || meret < 5 || meret % 1 != 0 || mines % 1 != 0) {
        alert("Problema adodott ami okzhatta:\n -tul nagy a tabla(max 25)\n -tul kicsi a tabla(min 5)\n -tobb vagy annyi bomba van beallitva mint a palya\n -a bombak szama kevesebb mint 1\n -tort szamot adtal meg")
        mines.value = 10
        meret.value = 10
        document.getElementById("mines").value = 10
        document.getElementById("meret").value = 10
        ujjatek()
    }
    else {
        return true;
    }
}

function tabla() {
    for (let i = 0; i < meret; i++) {
        for (let j = 0; j < meret; j++) {
            game.innerHTML += '<div id="' + i + '-' + j + '" class="game-element tile"  oncontextmenu="rightclick(id); return false;" onclick="jatek(id)"></div>';
        }
    }
}

function bombak() {
    for (let i = 0; i < mines; i++) {
        var bomb = ((Math.floor(Math.random() * meret)) + '-' + (Math.floor
            (Math.random() * meret)))
        if (mineok.includes(bomb)) {
            i--
        }
        else {
            mineok.push(bomb)
        }
    }
}

function bombdisplay() {
    mineok.forEach(element => {
        document.getElementById(element).classList.add("bomba")
    });
}

function szamok(i, j) {
    let bombszama = 0
    i *= 1
    j *= 1
    if(!(i<0||j<0||i>meret-1||j>meret-1)){
        if (mineok.includes((i + 1) + "-" + j)) {
            bombszama++
        }
        if (mineok.includes(i + "-" + (j + 1))) {
            bombszama++
        }
        if (mineok.includes((i + 1) + "-" + (j + 1))) {
            bombszama++
        }
        if (mineok.includes((i + 1) + "-" + (j - 1))) {
            bombszama++
        }
        if (mineok.includes((i - 1) + "-" + (j + 1))) {
            bombszama++
        }
        if (mineok.includes((i - 1) + "-" + (j - 1))) {
            bombszama++
        }
        if (mineok.includes((i - 1) + "-" + j)) {
            bombszama++
        }
        if (mineok.includes(i + "-" + (j - 1))) {
            bombszama++
        }
        console.log(i + "-" + j)
        if (!wastedtiles.includes(i+"-"+j)) {
            wastedtiles.push(i + "-" + j)
        }
        szamkiosztas(bombszama, i, j)
        if(bombszama==0){
            nagyclear(i,j);
        }
        else{
            szamokRevealed.push(i + "-" + j)
        }
        bombszama = 0
    }
}
function szamkiosztas(a, i, j) {
    i *= 1
    j *= 1
    var szin = "white"
    if (a != 0) {
        switch (a) {
            case 1:
                szin = "blue"
                break;
            case 2:
                szin = "green"
                break;
            case 3:
                szin = "red"
                break;
            case 4:
                szin = "darblue"
                break;
            case 5:
                szin = "brown"
                break;
            case 6:
                szin = "yellow"
                break;
            case 7:
                szin = "purple"
                break;
            case 8:
                szin = "grey"
                break;
            default:
                break;
        }
        document.getElementById(i + "-" + j).innerHTML = "<h3 style='color:" + szin + "'>" + a + "</h3>"
    }

}

function nagyclear(i,j){
    if(i!=0&&!wastedtiles.includes((i-1)+"-"+j)){
        szamok(i-1,j)
        szamunlocked((i-1)+"-"+j)
    }
    if(i!=meret-1&&!wastedtiles.includes((i+1)+"-"+j)){
        szamok(i+1,j)
        szamunlocked((i+1)+"-"+j)
    }
    if(j!=0&&!wastedtiles.includes(i+"-"+(j-1))){
        szamok(i,j-1)
        szamunlocked(i+"-"+(j-1))
    }
    if(j!=meret-1&&!wastedtiles.includes(i+"-"+(j+1))){
        szamok(i,j+1)
        szamunlocked(i+"-"+(j+1))
    }
    //corner
    
    if(szamokRevealed.includes(i+"-"+(j+1))&&szamokRevealed.includes((i+1)+"-"+j)&&!wastedtiles.includes((i+1)+"-"+(j+1))){
        szamok(i+1,j+1)
        szamunlocked((i+1)+"-"+(j+1))
    }
    if(szamokRevealed.includes(i+"-"+(j+1))&&szamokRevealed.includes((i-1)+"-"+j)&&!wastedtiles.includes((i-1)+"-"+(j+1))){
        szamok(i-1,j+1)
        szamunlocked((i-1)+"-"+(j+1))
    }
    if(szamokRevealed.includes(i+"-"+(j-1))&&szamokRevealed.includes((i+1)+"-"+j)&&!wastedtiles.includes((i+1)+"-"+(j-1))){
        szamok(i+1,j-1)
        szamunlocked((i+1)+"-"+(j-1))
    }
    if(szamokRevealed.includes(i+"-"+(j-1))&&szamokRevealed.includes((i-1)+"-"+j)&&!wastedtiles.includes((i-1)+"-"+(j-1))){
        szamok(i-1,j-1)
        szamunlocked((i-1)+"-"+(j-1))
    }
}


function szamunlocked(a) {
    document.getElementById(a).classList.add("ures")
    document.getElementById(a).classList.add("szam")
    document.getElementById(a).classList.remove("tile")
}

function jatek(a) {
    console.log("katt")
    if (jatekveg) {
        let text = a;
        const kordinata = text.split("-");
        if (!jelolt.includes(a)&&!wastedtiles.includes(a)) {
            if (mineok.includes(a)) {                
                asd = false 
                jatekvege();
            }
            else {
                szamok(kordinata[0], kordinata[1])
                szamunlocked(a)
            }
        }
        if (wastedtiles.length == (meret * meret) - mines) {
            jatekvege()
        }
    }
}



function rightclick(a) {
    if (jatekveg) {

        if (!wastedtiles.includes(a)) {
            if (!jelolt.includes(a)) {
                document.getElementById(a).classList.remove("tile")
                document.getElementById(a).classList.add("jelolt")
                jelolt.push(a)
            }
            else {
                document.getElementById(a).classList.remove("jelolt")
                document.getElementById(a).classList.add("tile")
                jelolt.splice(jelolt.indexOf(a), 1)
            }
        }
    }
}


function jatekvege() {
    jatekveg = false
    bombdisplay()
    game.innerHTML += '<div id="veges" ></div>';
    if (asd) {
        document.getElementById('veges').innerHTML = '<h2>nyertel</h2>'                
    }
    else {
        document.getElementById('veges').innerHTML = '<h2>vesztettel</h2>'
    }
}