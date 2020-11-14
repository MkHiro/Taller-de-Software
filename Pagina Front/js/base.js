


function Post(fecha, input) {      //Objeto Post 
    this.fecha = fecha;
    this.input = input;
};
var listPost = []; //Lista de Post

//usuario-------------------------------------------------------------------------------------------------------------------
const usuario = document.getElementById('usuario');
var l = document.createTextNode(localStorage.getItem('user'));
usuario.appendChild(l);
 
//usuario-------------------------------------------------------------------------------------------------------------------

//Create POST-----------------------------------------------------------------------------------------------------------
document.getElementById('postit').addEventListener('click', function () {
    var input = document.getElementById("textbox").value;
    console.log("Escribiste " + input);
    var time = new Date();
    var tiempo=time.getHours()+"h:"+time.getMinutes()+"m  "+time.getDate()+"-"+time.getMonth()+"-"+time.getFullYear();
    console.log(tiempo);
    createaCard(input, tiempo);
    //Creo el post y lo anado a la lista 
    var mipost = new Post(tiempo, input);
    listPost.push(mipost);
    console.log(listPost);

    //Limpiar casilla
    if (input != "") {
        document.getElementById("textbox").value = "";
    }
});

function createaCard(input, tiempo) {

    var card = document.createElement('div');
    card.setAttribute('class', 'card text-white bg-dark mb-3'); //creo una carta 

    var body = document.createElement('div');                      //cuerpo de la carta
    body.setAttribute('class', 'card-body');

    fecha = document.createElement('p');               //Same energy         
    fecha.setAttribute('class', 'card-text');
    var p = document.createTextNode(tiempo); //Le damos la fecha actual

    fecha.append(p);                                   //Le pasamos la Fecha
                                                    

    var texto = document.createElement('h4');          //Same energy
    texto.setAttribute('class', 'card-title');

    p = document.createTextNode(input);                   //Le pasamos lo escrito
    texto.append(p);    //Juntamos todo
    body.append(texto);               //le anadimos el bloque texto al cuerpo
    body.append(fecha);             //le anadimos bloque fecha al cuerpo  
    card.append(body);
    console.log(card);
    document.getElementById("cards").appendChild(card); //utilizamos cards como root para que anada ahi las cartas

}
//CREATE POST ----------------------------------------------------------------------------------------------------------


 // SEARCH SYSTEM-------------------------------------------------------------------------------------------------------
const list =document.getElementById('list');

function setList(group){
    clearList();
    for(const post of group){
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        const text = document.createTextNode(post.input+"  "+post.fecha);
        item.appendChild(text);
        list.appendChild(item);
    }
    if(group.length === 0){
        setNoResults();
    }
}

function clearList(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

function setNoResults(){
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const text = document.createTextNode('No results found');
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value,searchTerm){
    if(value === searchTerm){
        return 2;
    }else if(value.startsWith(searchTerm)){
        return 1;
    }else if(value.includes(searchTerm)){
        return 0;
    }else{
        return -1;
    }
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    let value = event.target.value;             //capto lo que se escribe en el buscador
    if (value && value.trim().length > 0) {     //si tiene valor, sin espacios y no esta vacio
        value = value.trim().toLowerCase();     //le quitamos espacios y mayusculas (K E Y S E N S I T I V E)
        setList(listPost.filter(post => {
            return post.input.includes(value);
        }).sort((inputA, inputB) => {
            return getRelevancy(inputB.input, value) - getRelevancy(inputA.input, value);
        }));
    }else{ clearList(); }
});
//SEARCHSYSTEM --------------------------------------------------------------------------------------------------------------