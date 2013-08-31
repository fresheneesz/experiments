require('./newFrame/node_modules/utils');

exports.merge({
    nodejsDirectory: "C:\\Program Files\\nodejs\\",

    mysql: {
        readonly: {
            username: "monetizationRO",
            password: "_your_password_",
            database: "nodeTest"
        },
        writeable: {
            username: "monetization",
            password: "_your_password_",
            database: "nodeTest"
        },
        nodetest: {
            username: "monetization",
            password: "_your_password_",
            database: "nodeTest"
        }
    },

    port: 90
});