

$(document).ready(function(){
    traerInformacion()
});

function traerInformacion(){
    $.ajax({
        url: "https://129.151.103.87:8080/api/Cabin/all",
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
        myTable+="<td class='bt bti sty'> Identificación </td>";
        myTable+="<td class='bt sty'> Marca </td>";
        myTable+="<td class='bt sty'> Habitaciones </td>";
        myTable+="<td class='bt sty'> Categoría </td>";
        myTable+="<td class='bt btf sty'> Nombre </td>";
        myTable+="<td></td>";
        myTable+="</tr>";
    
    for(i=0;i<items.length;i++){
        myTable+="<tr class='animate__animated animate__slideInDown'>";
        myTable+="<td class='bt bti'>" +items[i].id+"</td>";
        myTable+="<td class='bt'>" +items[i].brand+"</td>";
        myTable+="<td class='bt'>" +items[i].rooms+"</td>";
        myTable+="<td class='bt'>" +items[i].category_id+"</td>";
        myTable+="<td class='bt btf'>" +items[i].name+"</td>";
        myTable+="<td></td>";
        myTable+="<td> <button class='borrar' onclick='borrarElemento("+items[i].id+")'>BORRAR</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarInformacion(){
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://129.151.103.87:8080/api/Cabin/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            traerInformacion();
            alert("El elemento fue guardado")
        }
    });
}


function editarInformacion(){
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://129.151.103.87:8080/api/Cabin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
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
        url: "https://129.151.103.87:8080/api/Cabin/{idCabin}",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("El elemento fue borrado")
        }
    });
}


