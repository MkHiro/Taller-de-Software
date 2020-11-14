const Usuarios = [
    {
        username: "Jaime",
        password: "1234"
    },
    {
        username: "Peter",
        password: "1234"
    }];

// console.log(Usuarios.length);
// for(i in Usuarios){
//     console.log( "Usuario: "+ Usuarios[i].username +"  Contra: "+ Usuarios[i].password );
// }

const form = document.getElementById("myForm");
const errorElement=document.getElementById("error");

form.addEventListener("submit",(e)=>{
    let messages = [];
    const name = document.getElementById("name");
    const password = document.getElementById("password");

    if( name.value === "" || name.value == null ){
        messages.push('Name is required');
    }

    if(password.value.length <= 2){
        messages.push('La contrasena debe tener mas de 2 caracteres');
    }
    if(password.value.length >= 10){
        messages.push('La contrasena debe tener menos de 10 caracteres');
    }

    if(messages.length > 0){
        e.preventDefault();
        errorElement.setAttribute('class','alert alert-danger');
        errorElement.setAttribute('role','alert');
        var p = document.createTextNode( messages.join(', ') );
        errorElement.append(p);
    }
    var loginsuccess = false;
    for(i in Usuarios){
        if(name.value === Usuarios[i].username && password.value === Usuarios[i].password){
            e.preventDefault();
            localStorage.setItem('user',Usuarios[i].username);
            location.replace("../main.html");
            loginsuccess = true;
        }
    }
    if(!loginsuccess){
        alert("invalid User/Password");
    }
    
});
