function init(){
$ui.alert({
    title: "Mod.demo",
    message: "init",
    actions: [
        {
            title: "OK",
            disabled: false, // Optional
            handler: function() {}
        }
    ]
});  
}

module.exports = {
    init
};