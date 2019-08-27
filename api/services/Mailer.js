module.exports.sendWelcomeMail = function(obj, res) 
{
    sails.hooks.email.send( 
    {
        Name: obj.name
    },
    {
        to: obj.email,
        subject: "Welcome Email",
    },
    function(err) {console.log(err || res.send("OK"));
    })
}