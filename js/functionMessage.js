

$(document).ready(function(){
    traerInformacion()
});

function traerInformacion(){
    $.ajax({
        url: "https://129.151.103.87:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items)
        }
    });
}


function pintarRespuesta(items){
    let myTable="<table>";

    myTable+="<tr class='animate__animated animate__slideInDown'>";
    myTable+="<td class='bt bti sty'> Id </td>";
    myTable+="<td class='bt btf sty btm'> Mensaje </td>";
    myTable+="<td></td>";
    myTable+="</tr>";

    for(i=0;i<items.length;i++){
        myTable+="<tr class='animate__animated animate__slideInDown'>";
        myTable+="<td class='bt bti'>" +items[i].id+"</td>";
        myTable+="<td class='bt btf btm'>" +items[i].messagetext+"</td>";
        myTable+="<td></td>";
        myTable+="<td> <button class='borrar' onclick='borrarElemento("+items[i].id +")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarInformacion(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://129.151.103.87:8080/api/Message/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            traerInformacion();
            alert("El elemento fue guardado")
        }
    });
}


function editarInformacion(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://129.151.103.87:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            traerInformacion();
            alert("El elemento fue actualizado")
        }
    });
}


function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://129.151.103.87:8080/api/Message/{idCabin}",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("El elemnento fue borrado")
        }
    });
}
