var nohay = false;
//Buscador de los que estan por defecto

function buscador() {
    let texto_buscar = document.getElementById("texto").value;
        let select = $("#select").val();
        let url = geturl()
    $.getJSON("../json/hot.min.json", function (json) {
        if (!texto_buscar) {
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    let html = "";
                    data.forEach(element => {
                        let mayus = element.view.charAt(0).toUpperCase() + element.view.slice(1);
                        if (!select) {
                            html = html + "<li class='cols'><a href=" + element.url + ">" + mayus + "</a></li>";
                        } else {
                            if (element.Categoria == select) {
                                html = html + "<li class='cols'><a href=" + element.url + ">" + mayus + "</a></li>";
                            }
                        }
                    })
                    searchWrapper.classList.add('active2')
                    document.getElementById("autocom_box").innerHTML = html
                }
            });
        } else {
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    let html = $("#autocom_box").html();
                    let select = $("#select").val();
                    if (nohay) {
                        data.forEach(element => {
                            let mayus = element.view.charAt(0).toUpperCase() + element.view.slice(1);
                            if (!select) {
                                html = html + "<li class='cols'><a href=" + element.url + ">" + mayus + "</a></li>";
                            } else {
                                if (element.Categoria == select) {
                                    html = html + "<li class='cols'><a href=" + element.url + ">" + mayus + "</a></li>";

                                }
                            }
                        })
                    }
                    searchWrapper.classList.add('active2')
                    document.getElementById("autocom_box").innerHTML = html

                }
            });
        }
    })
}
//Buscador para los que estan tecleando
function buscartext($event) {
    $("#lblselect").text($("#select").val() ? $("#select").val() : "Todos")
    //valida el select
    let select = $("#select").val();

    $.getJSON("../json/all.min.json", function (json) {
        let texto_buscar = document.getElementById("texto").value;
        if (texto_buscar) {
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
                                } else {
                                    return false
                                }
                            }
                        } else {
                            if (srt.includes(texto_buscar.toUpperCase())) {
                                exit = 1
                                if (init <= limit) {
                                    list.push(dato)
                                    init++
                                } else {
                                    return false
                                }
                            }
                        }

                    })
                    if (list.length > 0) {
                        let html = "";
                        nohay = false
                        list.forEach(element => {
                            let bold = element.view.toLowerCase()
                            let text = bold.split(texto_buscar.toLowerCase());
                            let pa = ""

                            for (let it = 0; it < text.length; it++) {
                                if (it + 1 == text.length) {
                                    pa = pa + "" + text[it]
                                } else {
                                    pa = pa + "" + text[it] + "<b>" + texto_buscar.toLowerCase() + "</b>"
                                }
                            }

                            let mayus = traelaprimera(pa)

                            html = html + "<a href=" + element.url + "><li>" + mayus + "</li></a>";
                        });
                        document.getElementById("autocom_box").innerHTML = html
                    } else {
                        nohay = true
                        if (texto_buscar.length > 4) {
                            if (!select) {
                                select = "todos"
                            }
                            //  
                            fnsendajax("/api/buscadorpalabras/guardar", { "palabraBuscada": texto_buscar, "categoriaBuscada": select }, (responses) => {

                            })
                        }
                        document.getElementById("autocom_box").innerHTML = `<div class='camp_error'><img src="../images/img_error.webp"><div> No se encontraron resultados para "<b>${texto_buscar}</b>"<br><small>Quizás te interesen las siguientes busquedas</small></div></div><hr>`;
                        buscador()
                    }
                }
            })
        } else {
            buscador()
        }
    })
}

function traelaprimera(cadena) {
    let bold = ""
    for (let i = 0; i < cadena.length; i++) {
        let ascii = cadena.toUpperCase().charCodeAt(i)
        if (ascii == 60) {
            if(i == 0 ){
                bold = "<b>"
            }
            i = i + 2
        } else {
            if (ascii > 64 && ascii < 91) {
                return bold+cadena.charAt(i).toUpperCase() + cadena.slice(i + 1);
            }
        }

    }
    //let mayus = element.texto.charAt(0).toUpperCase()+element.texto.slice(1);
}


function geturl(){
        let texto_buscar = document.getElementById("texto").value;
        let ulr  =""
        let select = $("#select").val();
        if (!texto_buscar) {
            if (!select) {
                ulr = '../json/hot.min.json'
            } else {
                ulr = '../json/all.min.json'
            }
        }else{
            if (!select) {
                ulr = '../json/hot.min.json'
            } else {
                ulr = '../json/all.min.json'
            }
        }
        return ulr;
}
function fnsendajax(url, data, fnok) {
    $.ajax({
        async: true,
        crossDomain: true,
        method: "POST",
        url: url,
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoiaWFuIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY1MDI5MTkwMCwiZXhwIjoxNjg2MjkxOTAwfQ.NxKP5rrciuZgeGlHVfiq0UVbbhMS1t6Momn44TekSAQUrNXoX9isTC8EbGCXwkwbJHPSSQ53ZAhb4CDLegrI1Q",
            "content-type": "application/json"
        },
        processData: false,
        data: JSON.stringify(data),
        success: function (data) {
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
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("errores pass");
        }
    });
}

