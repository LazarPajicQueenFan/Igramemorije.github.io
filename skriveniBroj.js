var input = document.getElementById("unos");
    
    input.addEventListener("keypress", function(event) {

        if(event.key === "Enter") {
            event.preventDefault();
            document.getElementById("dugme").click();
        }
    })

let skriveniBroj = (Math.floor(Math.random() * 100) + 1)
let brojacSkrivenogBroja = 0;
let brojPreostalihPokusaja = 10;
let brojacPokusaja = 0;
console.log(skriveniBroj)
function provera() {
    
    brojacPokusaja ++;
    let x = document.getElementById("unos").value;

    let text, text2, text3, text4, text5

    console.log("skriveniBroj:", skriveniBroj);
    console.log("x:", x);
    console.log("brojPreostalihPokusaja:", brojPreostalihPokusaja);

    if (isNaN(x) || x < 1 || x > 100){
        text = "Molimo Vas da unesete broj u zadatom opsegu";
    }
    else if (x > skriveniBroj) {
        text = "Uneti broj je veci od skrivenog"
        brojPreostalihPokusaja --
    }
    else if (x < skriveniBroj) {
        text = "Uneti broj je manji od skrivenog"
        brojPreostalihPokusaja --
    }
    else {

    brojacSkrivenogBroja++
    brojPreostalihPokusaja = 10

    if(brojacPokusaja === 1)    text4 = "Za pronalazenje skrivenog broja Vam je bio potreban " + brojacPokusaja + " pokusaj!"
    else    text4 = "Za pronalazenje skrivenog broja Vam je bilo potrebno " + brojacPokusaja + " pokusaja!"

    text = "Cestitamo, pogodili ste skriveni broj!"
    text2 = "Pokusajte da pogodite novi skriveni broj!"
    if (brojacSkrivenogBroja % 2 == 0) {
    document.getElementById("vic").style.color = "red"
    document.getElementById("vic").style.backgroundColor = "pink"
    document.getElementById("main").style.backgroundColor = "lavender"
    document.getElementById("uspeh").style.color = "green"
    document.getElementById("uspeh").style.backgroundColor = "lightblue"
    document.getElementById("broj").style.color = "blue"
    document.getElementById("broj").style.backgroundColor = "lightred"
    document.getElementById("broj").style.color = "blue"
    document.getElementById("broj").style.backgroundColor = "lightred"
    document.getElementById("naslov").style.color = "pink"
    }

    else {
    document.getElementById("vic").style.color = "blue"
    document.getElementById("vic").style.backgroundColor = "lavender"
    document.getElementById("main").style.backgroundColor = "orange"
    document.getElementById("uspeh").style.color = "blue"
    document.getElementById("uspeh").style.backgroundColor = "lightgreen"
    document.getElementById("broj").style.color = "red"
    document.getElementById("broj").style.backgroundColor = "lightblue"
    document.getElementById("brojP").style.color = "red"
    document.getElementById("brojP").style.backgroundColor = "lightblue"
    document.getElementById("naslov").style.color = "purple"
    }

  
    
    if (brojacSkrivenogBroja === 1) {
        text3 = "Uspeno ste pronasli " + brojacSkrivenogBroja +  " skriveni broj!"
        
    } 
    else if (brojacSkrivenogBroja < 5){
        text3 = "Uspeno ste pronasli " + brojacSkrivenogBroja +  " skrivena broja!"

    }
    else {
        text3 = "Uspeno ste pronasli " + brojacSkrivenogBroja +  " skrivenih brojeva!"

    }
    skriveniBroj = (Math.floor(Math.random() * 100) + 1)
    console.log(skriveniBroj)
    document.getElementById("broj").innerHTML = text3;
    document.getElementById("brojP").innerHTML = text4;
    document.getElementById("uspeh").innerHTML = text2;
    brojacPokusaja = 0;
    }
    if (brojPreostalihPokusaja === 0 && x !== skriveniBroj) {
   
        console.log("Alert condition reached");
        alert("Niste uspeli da pronadjete skriveni broj! Pokusajte ponovo ispocetka");
    }

    text5 = "<br>" + "Broj preostalih pokusaja je: " + brojPreostalihPokusaja
    document.getElementById("vic").innerHTML = text + text5
}
