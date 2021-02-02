const connection    = require("../config/database")

class Model {

    executeQuery(query) {
        return new Promise ((resolve, reject) => {
            connection.query(query, function (err, result){
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