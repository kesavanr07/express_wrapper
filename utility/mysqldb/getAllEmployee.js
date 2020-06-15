var mysql      = require('mysql');

var connectionConf = require("./dbconf");
var connection = mysql.createConnection(connectionConf);
connection.connect();

function getEmployee(req, res){
    var empId=req.query.id;
    connection.query('SELECT * from employee', function(err, rows, fields) {
        if (err) throw err;

        var htm="<html>";
            htm+="<head>";
                htm+="<title> All Employee Details</title>";
                htm+="<style>table, th, td {border: 1px solid black; }</style>";
            htm+="</head>";
        htm+="<body>";
            htm+="<h3>List of Employee:-</h3>";
        if(rows){
            htm+="<table style='width:100%'>";
            htm+="<thead>";
                htm+="<tr>";
                    htm+="<th>EmployeeId</th>";
                    htm+="<th>Name</th>";
                    htm+="<th>Designation</th>";
                    htm+="<th>Salary</th>";
                    htm+="<th>Last Modified Time</th>";
                htm+="</tr>";
            htm+="</thead>";
            htm+="<tbody>";

            for(var i=0; i<rows.length; i++){
                if(rows[i]) {
                    htm += "<tr>";
    //[{"emp_id":1,"emp_name":"joe","emp_designation":"programmer","emp_salary":1000,"last_modified":"2016-12-29T21:55:41.000Z"}]
                    var empId=rows[i]['emp_id'];
                    htm += "<td><a href='/employee?id="+empId+"' target='_blank'>" + empId + "</a></td>";
                    htm += "<td><a href='/employee?id="+empId+"' target='_blank'>" + rows[i]['emp_name'] + "</a></td>";
                    htm += "<td>" + rows[i]['emp_designation'] + "</td>";
                    htm += "<td>" + rows[i]['emp_salary'] + "</td>";
                    htm += "<td>" + rows[i]['last_modified'] + "</td>";
                    htm += "</tr>";
                }
            }
            htm+="</tbody>";
            htm+="</table>";
            htm+="<p>Click on the employee name to update the employee details.</p>";
        }
        htm+="</body>";
        htm+="</html>";
        res.send(htm);
    });
}
exports=module.exports=getEmployee;