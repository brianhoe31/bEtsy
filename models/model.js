const connection    = require("../config/database")

class Model {

    executeQuery(query, values) {
        return new Promise ((resolve, reject) => {
            connection.query(query, values, function (err, result){
                if(err) {
                    reject (err);
                }else {
                    resolve (result);
                }
            })
        })
    }

}

module.exports = Model;