const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'todowebapp',
    password: '@12345#777',
    database: 'todowebapp',
    port: 3306
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve,reject) => {
                const query = "SELECT * FROM todowebapp;";

                connection.query(query,(err,results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                } )
            });

            // console.log(response);
            return response;
        }
        catch(err){
            console.log(err);
        }
    }


    async insertNewName(name){
        try{
            const dateAdded = new Date();
            const insertId = await new Promise((resolve,reject) => {
                const query = "INSERT INTO todowebapp (task,date_added) VALUES (?,?);";

                connection.query(query, [name, dateAdded] ,(err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });

            return {
                id:insertId,
                name:name,
                dateAdded:dateAdded
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async deleteRowById(id){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve,reject) => {
                const query = "DELETE FROM todowebapp WHERE id = ?;";

                connection.query(query, [id] ,(err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        }
        catch(err){
            console.log(err);
            return false;  
        }

    }

    async completeById(id){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve,reject) => {
                const query = "UPDATE todowebapp SET status=1 WHERE id = ?;";

                connection.query(query, [id] ,(err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return(response);
        }
        catch(err){
            console.log(err);
            return false;  
        }

    }

    async editById(id,task){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve,reject) => {
                const query = "UPDATE todowebapp SET task=? WHERE id = ?;";

                connection.query(query, [task,id] ,(err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return(response);
        }
        catch(err){
            console.log(err);
            return false;  
        }

    }
}

module.exports = DbService;