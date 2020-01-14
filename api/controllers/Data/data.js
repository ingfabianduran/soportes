module.exports = {
    // Data inicial al cargar la pagina:
    dataForm: function()
    {
        const servicios = ["Soporte", "Mantenimiento", "Audiovisuales", "Desarrollo Fisico", "Redes"];
        const tecnicos = ["Elige", "John Jairo Agudelo", "Fabian Esteban Duran", "Ivan Arturo Ortiz", "David Stiven Martinez", "Sebastian Torres", "Nelson Enrique Alvarez"];
        const perfiles = ["Administrativo", "Docente", "Estudiante"];
        const bloques = ["Bloque A", "Bloque B", "Bloque C", "Bloque E", "Bloque F", "Bloque G", "Bloque I", "Bloque J", "Bloque K", "Bloque L", "Bloque M", "Bloque N", "Bloque O", "Edificio HUB", "Centro de Lenguas", "Casa Fotografia"];
        const soluciones = ["Si", "No"];

        const info = {servicios: servicios, tecnicos: tecnicos, perfiles: perfiles, bloques: bloques, soluciones: soluciones};
        return info;
    },
    // Dependiendo el tipo de servicio se retorna las labores especificas: 
    dataLaborRealizada: function(tipoServicio)
    {
        var labores = [];

        switch (tipoServicio) 
        {
            case "Soporte":
                labores = [{value: "", text:"Elige"},
                    {value: "Asignación Provisional de portatil", text: "Asignación Provisional de portatil"}, 
                    {value: "Configuración Vídeo Beam - TV", text:"Configuración Vídeo Beam - TV"}, 
                    {value: "Daño en Tomas de Conectividad", text: "Daño en Tomas de Conectividad"}, 
                    {value: "Duplicado de Pantallas", text: "Duplicado de Pantallas"}, 
                    {value: "Encender Equipo de Cómputo", text: "Encender Equipo de Cómputo"}, 
                    {value: "Encender Vídeo Beam - TV", text: "Encender Vídeo Beam - TV"}, 
                    {value: "Reiniciar Sistema", text: "Reiniciar Sistema"}, 
                    {value: "Revisión o Cambio de Periféricos", text: "Revisión o Cambio de Periféricos"}, 
                    {value: "Soporte No Necesario", text: "Soporte No Necesario"}, 
                    {value: "Usuario o Clave de Ingreso", text: "Usuario o Clave de Ingreso"}, 
                    {value: "Verificar Conectividad a Internet", text: "Verificar Conectividad a Internet"}];
                break;
            case "Mantenimiento":
                labores = [{value: "", text: "Elige"},
                    {value: "Adecuación Mesa de Docentes", text: "Adecuación Mesa de Docentes"}, 
                    {value: "Adecuación Tomas de Conectividad y Cableado", text: "Adecuación Tomas de Conectividad y Cableado"}, 
                    {value: "Instalación de Software", text: "Instalación de Software"},
                    {value: "Mantenimiento Correctivo Equipo de Cómputo", text: "Mantenimiento Correctivo Equipo de Cómputo"},
                    {value: "Mantenimiento Preventivo - Limpieza", text: "Mantenimiento Preventivo - Limpieza"},
                    {value: "Préstamo Aula Móvil", text: "Préstamo Aula Móvil"},
                    {value: "Préstamo Portatil", text: "Préstamo Portatil"},
                    {value: "Renovación Equipos de Cómputo", text: "Renovación Equipos de Cómputo"},
                    {value: "Traslado Equipos de Cómputo", text: "Traslado Equipos de Cómputo"}];
                break;
        }

        return labores;
    }, 
    // Elementos que van en el template del correo: 
    dataEmail: function()
    {
        const moment = require("moment-timezone");

        const soporte = {
            servicio: "Mantenimiento",
            tecnico: "Fabian Duran",
            solicitante: "lopezdiana",
            perfil: "Docente",
            bloque: "Bloque A",
            salon: "402",
            labor: "Instalación de software",
            solucionado: "No Registra",
            fecha: moment().tz("America/Bogota").format("YYYY/MM/DD"),
        };

        return soporte;
    },
    // Elementos que van en el correo adicional: 
    dataEmailAdicional: function()
    {
        const moment = require("moment-timezone");

        const soporte = {
            fecha: moment().tz("America/Bogota").format("YYYY/MM/DD"),
            tipo: "Audiovisuales",
            incidente: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        };

        return soporte;
    },
    // Compare name and return email:
    dataEmailTecnicos: function(nombre)
    {
        const tecnicos = [
                    {nombre: "John Jairo Agudelo", correo: "agudelojohn@unbosque.edu.co"}, 
                    {nombre: "Julian Camilo Lopez", correo: "lopezjulian@unbosque.edu.co"}, 
                    {nombre: "Orlando Garcia Zapata", correo: "garciazorlando@unbosque.edu.co"}, 
                    {nombre: "Fabian Esteban Duran", correo: "duranfabian@unbosque.edu.co"}, 
                    {nombre: "Ivan Arturo Ortiz", correo: "ortizivan@unbosque.edu.co"}, 
                    {nombre: "David Stiven Martinez", correo: "martinezdavid@unbosque.edu.co"}, 
                    {nombre: "Sebastian Torres", correo: "torressebastian@unbosque.edu.co"}];
        
        var correo = "";
        
        for (let index = 0; index < tecnicos.length; index++) 
        {
            if (tecnicos[index].nombre == nombre)
            {
                correo = tecnicos[index].correo;
                break;
            }
        }

        return correo;
    }
}