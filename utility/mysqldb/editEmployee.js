var mysql      = require('mysql');
var dateFormat = require('dateformat');

var connectionConf = require("./dbconf");
var connection = mysql.createConnection(connectionConf);
connection.connect();

function editEmployee(req, res, callback){
    var empId=req.query.id;
    var name=req.query.name;
    var designation=req.query.designation;
    var salary=req.query.salary;
    try{
        salary = parseInt(salary, 10)
    }catch (e){
        salary =0;
    }
    if(empId && name && designation && salary ) {
        var now = new Date();
        now = dateFormat(now, "yyyy-mm-dd h:MM:ss");
        connection.query('UPDATE employee SET  emp_name=?, emp_designation=?, emp_salary=?, last_modified=? WHERE emp_id=? ',
                            [name, designation, salary, now, empId], function (err, rows, fields) {
            if (err) throw err;
            //console.log('The solution is: ', rows, fields);
            callback(true);
        });
    }else{
        callback(false);
    }
}

exports=module.exports=editEmployee;