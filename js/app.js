//Buscador de los que estan por defecto
function buscador() {
    $.getJSON("../json/hot.min.json", function (json) {
        let texto_buscar = document.getElementById("texto").value;
        if(!texto_buscar){
            $.ajax({
                type: "GET", 
                url: "../json/hot.min.json",
                success: function (data) {
                    let html = "";
                    let select = $("#select").val();
                    data.forEach(element => {
                        if (!select) {
                                    html = html + "<li class='cols'><a href=" + element.url + ">" + element.texto + "</a></li>";
                        }else{
                            if (element.Categoria  == select) {
                                    html = html + "<li class='cols'><a href=" + element.url + ">" + element.texto + "</a></li>";
                                
                            }
                        }
                    })
                    searchWrapper.classList.add('active2')
                    document.getElementById("autocom_box").innerHTML = html
                }
            });
        }else{
            $.ajax({
                type: "GET", 
                url: "../json/hot.min.json",
                success: function (data) {
                    let html = $("#autocom_box").html();
                    let select = $("#select").val();
                    data.forEach(element => {
                        if (!select) {
                                    html = html + "<li class='cols'><a href=" + element.url + ">" + element.texto + "</a></li>";
                        }else{
                            if (element.Categoria  == select) {
                                    html = html + "<li class='cols'><a href=" + element.url + ">" + element.texto + "</a></li>";
                                
                            }
                        }
                    })
                    searchWrapper.classList.add('active2')
                    document.getElementById("autocom_box").innerHTML = html

                }
            });
        }
    })
}
//Buscador para los que estan tecleando
function buscartext($event) {
    $("#lblselect").text($("#select").val()?$("#select").val():"Todos")
    //valida el select
    let select = $("#select").val();

    $.getJSON("../json/all.min.json", function (json) {
        let texto_buscar = document.getElementById("texto").value;
        if(texto_buscar){
        let limit = 25
        let init = 0
        let list = []
        $.ajax({
            type: "GET",
            url: "../json/all.min.json",
            success: function (data) {
                data.forEach(dato => {
                    let srt = String(dato.busca).toUpperCase()
                    if (select) {
                        if (srt.includes(texto_buscar.toUpperCase()) && dato.Categoria == select) {
                            exit = 1
                            if (init <= limit) {
                                list.push(dato)
                                init++
                            }else{
                                return false
                            }
                        }
                    }else{
                        if (srt.includes(texto_buscar.toUpperCase())) {
                            exit = 1
                            if (init <= limit) {
                                list.push(dato)
                                init++
                            }else{
                                return false
                            }
                        }
                    }

                })
                if(list.length > 0){
                    let html = "";

                    list.forEach(element => {
                         let bold = element.view.toLowerCase()
                         let text = bold.split(texto_buscar.toLowerCase());
                         let pa = ""

                         for (let it = 0; it < text.length; it++) {
                            if(it+1 == text.length){
                                pa = pa+""+text[it]
                            }else{
                                pa = pa+""+text[it]+"<b>"+texto_buscar.toLowerCase()+"</b>"
                            }
                         }
                        
                         html = html + "<a href=" + element.url + "><li>"+pa+"</li></a>";
                    });
                    document.getElementById("autocom_box").innerHTML = html
                }else{
					if(texto_buscar.length > 4){
						if(!select){
							select = "todos"
						}
	                    fnsendajax("/api/buscadorpalabras/guardar", {"palabraBuscada":texto_buscar,"categoriaBuscada":select}, (responses) => {
												
	                    })						
					}
                    document.getElementById("autocom_box").innerHTML = `<div class='camp_error'><img src="../images/img_error.webp"><div> No se encontraron resultados para "<b>${texto_buscar}</b>"<br><small>Quizás te interesen las siguientes busquedas</small></div></div><hr>`;
                    buscador()                    
                }
            }
        })
    }else{
        buscador()
    }
    })
}


function fnsendajax(url, data, fnok) {
$.ajax({
    async: true,
    crossDomain: true,
    method: "POST",
    url: url,
    headers: {
        "Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoiaWFuIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY1MDI5MTkwMCwiZXhwIjoxNjg2MjkxOTAwfQ.NxKP5rrciuZgeGlHVfiq0UVbbhMS1t6Momn44TekSAQUrNXoX9isTC8EbGCXwkwbJHPSSQ53ZAhb4CDLegrI1Q",
        "content-type": "application/json"
    },
    processData: false,
    data: JSON.stringify(data),
    success: function(data) {
        if (data.status) {
            if (data.codigo == 1) {
                if (data.datos) {
                    fnok(data.datos);
                } else {
                    fnok(data);
                }
            }
        } else {
			console.log("La palabra ya existe ")
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("errores pass");
    }
});
}

