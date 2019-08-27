//config/email.js

module.exports.email = {
    service: "Gmail",
    auth: {
        user: "ingfabianavellaneda@gmail.com", 
        pass: "lenovo1993"
        },
    templateDir: "views/emailTemplates",
    from: "ingfabianavellaneda@gmail.com",
    testMode: false,
    ssl: true
}