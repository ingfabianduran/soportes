/**
 * Soporte.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const Soporte = new Schema({
    servicio: String,
    tecnico: String,
    solicitante: String,
    perfil: String,
    bloque: String,
    salon: String,
    labor: String,
    solucionado: String,
    fecha: Date
});

module.exports = mongoose.model("Soporte", Soporte);