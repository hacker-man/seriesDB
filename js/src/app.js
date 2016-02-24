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
        $.ajax({
            url: "/api/series/",
            data:JSON.stringify({
                title: title,
                url: url,
            }),
            contentType:'application/json',
            method: 'post',
            success: function(){
                alert("Guardado con éxito");
            },
            error: function(){
                alert("Se ha producido un error");
            }
        });
        return false; 
        
    });
});