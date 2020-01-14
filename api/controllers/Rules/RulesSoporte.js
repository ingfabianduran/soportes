const joi = require('joi');

module.exports = {
    // Rule validate tipo servicio: 
    ruleTypeTipoServicio: function(data)
    {
        const dataValidate = joi.object().keys({
            tipoServicio: joi.string().valid("Soporte", "Mantenimiento").required(),
        });

        const result = joi.validate(data, dataValidate);
        return result;
    },
    // Rule validate info correo: 
    ruleInfoCorreo: function(data)
    {
        const dataValidate = joi.object().keys({
            servicio: joi.string().valid("Soporte", "Mantenimiento").required(),
            tecnico: joi.string().valid("John Jairo Agudelo", "Julian Camilo Lopez", "Orlando Garcia Zapata", "Fabian Esteban Duran", "Ivan Arturo Ortiz", "David Stiven Martinez", "Sebastian Torres", "Nelson Enrique Alvarez").required(),
            solicitante: joi.string(),
            perfil: joi.string().valid("Administrativo", "Docente", "Estudiante").required(),
            bloque: joi.string().valid("Bloque A", "Bloque B", "Bloque C", "Bloque E", "Bloque F", "Bloque G", "Bloque I", "Bloque J", "Bloque K", "Bloque L", "Bloque M", "Bloque N", "Bloque O", "Edificio HUB", "Centro de Lenguas", "Casa Fotografia").required(),
            salon: joi.string().required(),
            labor: joi.string().required(),
            solucionado: joi.string().valid("Si", "No", "No Aplica").required(),
            fecha: joi.string().required(),
        });

        const result = joi.validate(data, dataValidate);
        return result;
    },
    // Rule validate name tecnico:
    ruleNameTecnico: function(data)
    {
        const dataValidate = joi.object().keys({
            nombre: joi.string().valid("John Jairo Agudelo", "Julian Camilo Lopez", "Orlando Garcia Zapata", "Fabian Esteban Duran", "Ivan Arturo Ortiz", "David Stiven Martinez", "Sebastian Torres").required()            
        });

        const result = joi.validate(data, dataValidate);
        return result;
    },
    // Rule validate info correo: 
    ruleEmailAdicional: function(data)
    {
        const dataValidate = joi.object().keys({
            type: joi.string().valid("Audiovisuales", "Desarrollo Fisico", "Redes").required(),
            incidente: joi.string().required(),
            fecha: joi.string().required()
        });

        const result = joi.validate(data, dataValidate);
        return result;
    }
}