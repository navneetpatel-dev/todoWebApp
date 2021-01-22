const dbService = require('./dbservices');
const db = dbService.getDbServiceInstance();


/* #### CREATE ####*/
module.exports.post_data = (request,response) => {
    const result = db.insertNewName(request.body.name);

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));

};


/* #### READ ####*/
module.exports.get_data = (request,response) => {
    const result = db.getAllData();

    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
}


/* #### DELETE ####*/
module.exports.delete_data = (request,response) => {
    const { id } = request.params;

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
}

/* #### COMPLETED #### */
module.exports.mark_complete = (request,response) => {
    const { id } = request.params;

    const result = db.completeById(id);
    
    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
}

/* #### EDIT #### */

module.exports.edit_data = (request,response) => {
    const { id } = request.params;
    const {name} = request.body;

    const result = db.editById(id,name);
    
    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
}