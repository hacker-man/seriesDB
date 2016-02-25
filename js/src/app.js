$(document).ready(function(){//Cuando la página se ha cargado por completo.
    //Ponemos el foco en el primer input
    $(".auto-focus").focus();
    $("form").on("submit",function(){//Cuando se intenta enviar el formulario.
        //Validación del título
        var title = $.trim($("#title").val()); //Elimina espacios por delante y por detrás.
       if(title == "") {
           alert("El título no puede ser vacío");
           return false;//Cancela el envío del formulario.
       }
        //Validación de la url
        var url = $.trim($("#cover_url").val());
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;
        if(url != "" && false == pattern.test(url)){
            alert("La url de la carátula no es valida");
            return false;
        }
        //Validación de categorías
        var selectedCategories = $("input[name = 'category']:checked");
        if(selectedCategories.length==0){
            alert("Selecciona al menos una categoría");
            return false;
        }
        //Se ejecuta de maner asíncorna
        $.ajax({
            url: "/api/series/",
            data:JSON.stringify({
                title: title,
                url: url,
            }),
            contentType:'application/json',
            method: 'post',
            success: function(){ //Cuando devuelve un código 2XX
                alert("Guardado con éxito");
            },
            error: function(){//Cuando se devuelve un código 4XX ó 5XX
                alert("Se ha producido un error");
            }
        });
        return false; 
        
    });
   
    function reloadSeries(){
        console.log("Cargando series");
        $.ajax({ //Petición de los datos
            url: "/api/series/",
            success: function(data){
                console.log("Series recuperadas",data)
                var html = "";
                for(var i in data){
                    var id = data[i].id;
                    var title = data[i].title;
                    var url = data[i].url || ""; //data[i].url || "", sino esta definido -> devuelve undefined
                    html += "<li>";
                    html += title;
                    if(url != "") 
                        html += " ("+url+")";
                    html += '<button data-serieid ="'+id+'">Eliminar</button>'
                    html += "</li>";
                }
            $("#seriesList").html(html); //innerHTML = html
            }
        });
    }
     $("#reloadSeriesButton").on("click",reloadSeries);
     reloadSeries();
     $("#seriesList").on("click","button",function(){
        console.log("Elimino la serie");
         var id = $(this).data("serieid");//cojo el valor del atributo data-serieid del botón
         var self = this;
         $.ajax({
             url: "/api/series/"+id,
             method: "delete",
             success: function(){
                 $(self).parent().remove();
             }
         });
        
    });
});















