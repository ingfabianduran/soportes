NProgress.start();
// Init page events:
$(document).ready(function () 
{
    $(".ui.dropdown").dropdown({});
    NProgress.done();
    validateFormCorreo();
});
// Peticion AJAX que captura los datos del formulario y realiza el envio del correo: 
function enviarCorreo()
{
    const data = 
    {
        tipo: $("#tipo").val(),
        tecnico: $("#tecnico").val(),
        solicitante: $("#solicitante").val(),
        perfil: $("#perfil").val(),
        lugar: $("#lugar").val(),
        salon: $("#salon").val(),
        labor: $("#labor").val(),
        solucionado: $("#fallo").val(),
    };

    $.ajax({
        type: "POST",
        url: "/send",
        data: JSON.stringify(data),
        contentType : "application/json",
        dataType: "json",
        beforeSend: function() 
        {
            $("#formSoporte").addClass("loading");
        },
        success: function (res) 
        {
            if (res.status)
            {
                Swal.fire("Good!!!", res.message, "success").then(function(){
                    location.href = "/main";
                });
            }
            else
            {
                Swal.fire("Ops!!!", res.message, "error");
            }
        },
        complete: function() 
        {
            $("#formSoporte").removeClass("loading");
        },
    });
}
// Validate form before send information: 
function validateFormCorreo()
{
    // Add rules perzonalizadas: Si es soporte el campo es requerido incidente es requerido:  
    $.fn.form.settings.rules.resIncidente = function(value, adminLevel) 
    {
        const servicio = $("#tipo").val();
        
        if (servicio == "Soporte") {
            if (value == "Si" || value == "No") return true;
            else return false;
        }
        if (servicio == "Mantenimiento") {
            return true;
        }
    };
    
    $("#formSoporte").form({
        fields: {
            tipo: {
                identifier: "tipo",
                rules: [
                    {type: "empty", prompt: "Seleccioné un tipo"}
                ]
            },
            tecnico: {
                identifier: "tecnico",
                rules: [
                    {type: "empty", prompt: "Seleccioné un tecnico"}
                ]
            },
            solicitante: {
                identifier: "solicitante",
                rules: [
                    {type: "empty", prompt: "Digite un correo"}
                ]
            },
            perfil: {
                identifier: "perfil",
                rules: [
                    {type: "empty", prompt: "Seleccioné un perfil"}
                ]
            },
            lugar: {
                identifier: "lugar",
                rules: [
                    {type: "empty", prompt: "Seleccioné un bloque"}
                ]
            },
            salon: {
                identifier: "salon",
                rules: [
                    {type: "empty", prompt: "Digite un salon"},
                    {type: "minLength[3]", prompt: "Minimo 3 caracteres"},
                    {type: "maxLength[4]", prompt: "Maximo 4 caracteres"},
                ]
            },
            labores: {
                identifier: "labor",
                rules: [
                    {type: "empty", prompt: "Seleccioné una labor"}
                ]
            },
            fallo: {
                identifier: "fallo",
                rules: [
                    {type: "resIncidente", prompt: "Seleccioné una respuesta"}
                ]
            },
        },        
        inline: true, 
        on: 'blur',
        onSuccess: function(event)
        {
            event.preventDefault(); 
            enviarCorreo();
        }
    });
}
// Alert view where select Audiovisuales, Desarrollo Fisico or Redes: 
async function viewAlertOtherReport(type)
{
    const { value: text } = await Swal.fire({
        title: type,
        type: 'warning',
        input: 'textarea',
        inputPlaceholder: 'Por favor indique el incidente',
        inputAttributes: {
          'aria-label': 'Por favor indique el incidente'
        },
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        confirmButtonColor: '#ff9800',
        cancelButtonColor: '#212121',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((resolve) => {
              setTimeout(function () {
                resolve()
              }, 3000)
            })
        },
    });

    if (text) 
    {
        const data = {
            type: type,
            incidente: text,
        };

        $.ajax({
            type: "POST",
            url: "/sendAdicional",
            data: JSON.stringify(data),
            contentType : "application/json",
            dataType: "json",
            success: function (response) {
                if (response.status)
                {
                    Swal.fire("Good!!!", response.message, "success").then(function() {
                        location.href = "/main";
                    });
                }
                else 
                {
                    Swal.fire("Ops!!!", res.message, "error");
                }
            },
        });
    } 
    else 
    {
        location.href = "/main";
    }
}
// Peticion AJAX que captura el tipo de servicio y llena el select labor realizada:
$("#tipo").change(function (e) 
{ 
    const tipo = $(this).val();

    if (tipo == "Audiovisuales" || tipo == "Desarrollo Fisico" || tipo == "Redes")
    {
        viewAlertOtherReport(tipo);
    }
    else
    {
        e.preventDefault();
        
        $.ajax({
            type: "GET",
            url: "/labores/" + tipo,
            beforeSend: function()
            {
                $(".ui.fluid.search.dropdown.labor").addClass("loading disabled");
            },
            success: function(res) 
            {
                if (res.status)
                {
                    $("#labor").children('option').remove();
                    $.each(res.labores, function (i, value) 
                    { 
                        $("#labor").append($("<option></option>").attr("value", value.value).text(value.text));
                    });
                }
                else
                {
                    Swal.fire("Ops!!!", res.message, "error");
                }
            },
            complete: function()
            {
                setInterval(function()
                { 
                    $(".ui.fluid.search.dropdown.labor").removeClass("loading disabled");
                }, 2000);

                if (tipo == "Soporte") $(".ui.fluid.search.dropdown.fallo").removeClass("disabled");
                if (tipo == "Mantenimiento") $(".ui.fluid.search.dropdown.fallo").addClass("disabled"); 
                $("#fallo").dropdown("clear");
                $("#labor").dropdown("clear");
            }
        });
    }
});
// Peticion que captura el nombre del tecnico y trae el correo asociado a el: 
$("#tecnico").change(function (e) 
{ 
    e.preventDefault();
    const tecnico = $("#tecnico").val();

    $.ajax({
        type: "GET",
        url: "/tecnico/" + tecnico,
        beforeSend: function() {
            $("#divSolicitante").addClass("disabled");
            $(".search.icon.d-none").removeClass("d-none");
        },
        success: function (response) {
            if (response.status) {
                $("#solicitante").val(response.correo);
            }
        },
        complete: function() {
            setInterval(function(){
                $("#divSolicitante").removeClass("disabled");
                $(".search.icon").addClass("d-none");
            }, 3000);
        }
    });
});