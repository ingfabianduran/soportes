/**
 * SoporteController
 *
 * @description :: Server-side logic for managing Soportes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Soporte = require("../models/Soporte");
const rules = require("./Rules/RulesSoporte");
const data = require("./Data/data");

module.exports = {
    // Render view main.ejs:
    viewInfo: function(req, res) 
    {
        const info = data.dataForm();
        res.render("main", {info: info});
    },
    // Trae la lista de las posibles labores realizadas: 
    viewLabores: function(req, res) 
    {
        const servicio = {
            tipoServicio: req.params.tipoServicio,
        };

        const ruleValidate = rules.ruleTypeTipoServicio(servicio);

        if (ruleValidate.error != null)
        {
            res.send({status: false, message: "Ops!!! Algo raro paso por aca"});
        } 
        else
        {
            const labores = data.dataLaborRealizada(servicio.tipoServicio);
            res.send({status: true, labores: labores});
        }
    },
    // get email text:
    getEmail: function(req, res)
    {
        const tecnico = {
            nombre: req.params.nombre
        };

        const ruleValidate = rules.ruleNameTecnico(tecnico);

        if (ruleValidate.error == null)
        {
            const correo = data.dataEmailTecnicos(tecnico.nombre);
            res.send({status: true, correo: correo});
        }
        else
        {
            res.send({status: false, message: "Ops!!! Algo raro paso por aca"});
        }
    },
    // Render template mail plantilla.ejs:
    viewEmail: function(req, res) 
    {
        const soporte = data.dataEmail();
        res.render("plantilla", {soporte: soporte});    
    },
    // Render template mail plantillaAdicional.ejs:
    viewEmailAdicional: function(req, res)
    {
        const soporte = data.dataEmailAdicional();
        res.render("plantillaAdicional", {soporte: soporte});   
    },
    // Send email with template plantillaAdicional.ejs and info dinamic: 
    sendEmailAdicional: function(req, res)
    {
        const moment = require("moment-timezone");

        const soporte = {
            type: req.body.type,
            incidente: req.body.incidente,
            fecha:  moment().tz("America/Bogota").format("L") + " - " +  moment().tz("America/Bogota").format("LT")
        };

        const ruleValidate = rules.ruleEmailAdicional(soporte);

        if (ruleValidate.error != null)
        {
            res.send({status: false, message: "Datos Invalidos"});
        }
        else
        {   
            var correo = "";
            const nodemailer = require("nodemailer");
            const ejs = require("ejs");
            const path = require("path");
            const ruta = path.join(__dirname, "../", "../", "views", "plantillaAdicional.ejs");

            if (soporte.type == "Audiovisuales") correo = process.env.AUDIOVISUALES;
            if (soporte.type == "Desarrollo Fisico") correo = process.env.IT;
            if (soporte.type == "Redes") correo = process.env.MESA;

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD_EMAIL
                }
            });

            ejs.renderFile(ruta, {soporte: soporte}, function(err, data) 
            {
                if (err)
                {
                    res.send({status: false, message: "Error al preparar los datos"});
                }
                else
                {
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: correo,
                        subject: "Reporte Incidente",
                        html: data
                    };

                    transporter.sendMail(mailOptions, function(err, info) 
                    {
                        if (err) res.send({status: false, message: "Error al enviar los datos"});
                        else res.send({status: true, message: "Reporte enviado correctamente"});
                    });
                }    
            });
        }
    },
    // Send email with template plantilla.ejs and info dinamic: 
    sendEmail: function(req, res) 
    {   
        const moment = require("moment-timezone");
        const soporte = 
        {
            servicio: req.body.tipo,
            tecnico: req.body.tecnico,
            solicitante: req.body.solicitante,
            perfil: req.body.perfil,
            bloque: req.body.lugar,
            salon: req.body.salon,
            labor: req.body.labor,
            solucionado: req.body.solucionado,
            fecha: moment().tz("America/Bogota").format("YYYY/MM/DD"),
        };
        
        if (soporte.solucionado == null || soporte.solucionado == "") soporte.solucionado = "No Aplica";

        const ruleValidate = rules.ruleInfoCorreo(soporte);

        if (ruleValidate.error != null)
        {
            res.send({status: false, message: "Datos Invalidos"});
        }
        else 
        {
            const newSupport = new Soporte(soporte);
            newSupport.save((err) => {
                if (!err)
                {
                    const correo = process.env.MESA;
                    const nodemailer = require("nodemailer");
                    const ejs = require("ejs");
                    const path = require("path");
                    const ruta = path.join(__dirname, "../", "../", "views", "plantilla.ejs");
                    soporte.fecha = moment().tz("America/Bogota").format("L") + " - " +  moment().tz("America/Bogota").format("LT");

                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth:{
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD_EMAIL
                        }
                    });

                    ejs.renderFile(ruta, {soporte: soporte}, function(err, data) 
                    {
                        if (err)
                        {
                            res.send({status: false, message: "Error al preparar los datos"});
                        }
                        else
                        {
                            const mailOptions = {
                                from: process.env.EMAIL,
                                to: correo,
                                subject: "Soporte Realizado",
                                html: data
                            };

                            transporter.sendMail(mailOptions, function(err, info) 
                            {
                                if (err) res.send({status: false, message: "Error al enviar los datos"});
                                else res.send({status: true, message: "Reporte enviado correctamente"});
                            });
                        }    
                    });
                }
                else
                {
                    res.send({status: false, message: "Error con la BD"});
                }
            });
        }
    }
};