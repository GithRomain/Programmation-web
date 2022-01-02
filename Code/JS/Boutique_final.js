//Sliders
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("produitSlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//Tableau

//afficher que le formualire
function selection()
{
    var selection = document.querySelector(".boutique")
    selection.style.display = "block";

    var panier = document.querySelector(".tab")
    panier.style.display = "none";
}

//afficher que la panier
function panier()
{
    var selection = document.querySelector(".boutique")
    selection.style.display = "none";

    var panier = document.querySelector(".tab")
    panier.style.display = "block";
}

//verifier si le formulaire est vide
function test_vide(infos)
{
    for(let i = 0; i < 7; i++)
        if(infos[i].value == "")
        {
            return true;
        }
}

//Constructeur d'une commande
function Commande(numero, produit, nom, adresse, num, quantite) {
    this.numero = numero;
    this.produit = produit;
    this.nom = nom;
    this.adresse = adresse;
    this.num = num;
    this.quantite = quantite;
}

//ajouter des valeurs au tab (data)
function add()
{
    let infos = document.forms.commande;

    if(test_vide(infos))
    {
        return "stop"
    }

    function handleForm(event) { event.preventDefault(); }

    infos.addEventListener('submit', handleForm);

    let name = document.getElementsByClassName("produit-name").item(slideIndex-1);

    cpt++;

    let numero = cpt;
    let produit = name.textContent;
    let nom = infos[0].value;
    let adresse = infos[1].value;
    let num = infos[2].value;
    let quantite = infos[8].value;

    let commande = new Commande(numero, produit, nom, adresse, num, quantite);

    let panier = document.querySelector(".panier");

    panier.textContent = "Panier (" + cpt + ")";

    data.push(commande);
    
    console.log(data);
}

//creer le tab dynamique
function create(j){
    let table = document.querySelector(".test");

    let tr = document.createElement('tr');
    tr.className = "trsec"

    let button = document.createElement('button');
    let span = document.createElement('span')
    button.appendChild(span);

    button.className = "buttonsuppr";
    span.innerText = "Supprimer";

    button.onclick = function () {suppr(j)}

    for (let i = 0; i < 7; i++){
        let td = document.createElement('td');
        switch (i)
        {
            case 0: 
                td.textContent = data[j].numero;
                break;
            case 1:
                td.textContent = data[j].produit;
                break;
            case 2:
                td.textContent = data[j].nom;
                break;
            case 3:
                td.textContent = data[j].adresse;
                break;
            case 4:
                td.textContent = data[j].num;
                break;
            case 5:
                td.textContent = data[j].quantite;
                break;
            case 6:
                td = button;
                break;    
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
    }

//initialiser le tab dyn
function create_init()
{
    let table = document.querySelector(".test");

    let tr = document.createElement('tr');

    let data = ["Numéro", "Produit", "Nom", "Adresse postale", "Numéro de téléphone", "Quantité commander", "Supprimer"]

    for (let i = 0; i < data.length; i++){
        let td = document.createElement('td');
        td.textContent = data[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

//remise à 0 du tab dyn
function removeAll()
{
    let table = document.querySelector(".test");
    console.log(table);
    while (document.querySelector(".test tr") != null)
    {
        let tr = document.querySelector(".test tr");
        table.removeChild(tr);
    }
    create_init()
}

//afficher tab dyn (pas plus de 5 données)
function getTab(d, f)
{
    for(let i = d; i < f; i++)
    {
        create(i)
    }
}

//page du tab dyn avant
function getPreviousPage()
{
    removeAll();
    d = d-5;
    if(d<0)
    {
        d = d + 5;
        f = f + 5;
    }
    f = f-5;
    getTab(d, f)
    console.log(d, f)
}

//page du tab dyn apres
function getNextPage()
{
    removeAll();
    d = d+5;
    f = f+5;
    if(f>=data.length + 5)
    {
        d = d - 5;
        f = f - 5;
    }
    getTab(d, f)
    console.log(d, f)
}

function suppr(j)
{
    cpt--;
    let panier = document.querySelector(".panier");
    panier.textContent = "Panier (" + cpt + ")";
    data.splice(j, 1);
    removeAll();
    getTab(d, f);
}

//initialisation du tableau
var data = new Array()

var cpt = 0;

var d = 0;
var f = 5;

console.log(selection())
