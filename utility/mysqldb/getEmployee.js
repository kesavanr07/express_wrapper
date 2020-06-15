var mysql      = require('mysql');

var connectionConf = require("./dbconf");
var connection = mysql.createConnection(connectionConf);
connection.connect();

function getEmployee(req, res, flag){
    var empId=req.query.id;
    connection.query('SELECT * from employee where emp_id=?',[empId], function(err, rows, fields) {
        if (err) throw err;
        var htm="<html>";
        htm+="<head>";
        htm+="<title>Employee Details</title>";
        htm+="</head>";
        htm+="<body>";
        htm+="<h3>Employee Details:-</h3><br/>";
        htm += "<p>Edit the necessary details and update:</p>";
        if(rows){
            var empId=rows[0]['emp_id'];
            empId=new String(empId);

            htm+="<form action='/employee?id="+empId.trim()+"' method='get'>";
                htm += "<input type='hidden' name='id' value='" + empId + "'>";
                htm += "<h4>Name: </h4>" + "<input type='text' name='name' value='" + rows[0]['emp_name']  + "'><br/><h3></h3>";
                htm += "<h4>Designation: </h4>" + "<input type='text' name='designation' value='" + rows[0]['emp_designation']  + "'><br/><h3></h3>";
                htm += "<h4>Salary: </h4>" + "<input type='text' name='salary' value='" + rows[0]['emp_salary']  + "'><br/><h3></h3>";
                htm += "<h4>Last Modified: </h4>" +  rows[0]['last_modified'] +"<br/><h3></h3>";
                htm += "<input type='submit'>";
            htm+="</form>";
        }
        if(flag) {
            htm +="<h4>Employee details updated successfully. And details fetched back from the database!!!</h4>";
        }
        htm+="</body>";
        htm+="</html>";
        res.send(htm);
    });
}
exports=module.exports=getEmployee;