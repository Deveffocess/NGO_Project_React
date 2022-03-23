var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const expressAsyncHandler = require("express-async-handler");
// const jwt = require('jsonwebtoken')
const generateToken = require("./jwtToken/generateToken");
const bcrypt = require("bcryptjs");

/* this is for mysql connection*/
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ngo",
});
db.connect((err) => {
  if (err) {
    console.warn("Error to connection, Check XAMPP server");
  } else {
    console.warn("MySql db connected");
  }
});

app.use(cors());
app.use(express.json()); //This allow grab data as json format without this throw error like 'ER_BAD_NULL_ERROR',
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup",expressAsyncHandler(async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const mobileNo = req.body.mobileNo;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const gender = req.body.gender;
    const dob = req.body.dob;

    const hash = bcrypt.hashSync(password, 10);

    if (
      !firstname ||
      !lastname ||
      !mobileNo ||
      !password ||
      !cpassword ||
      !gender ||
      !dob
    ) {
      return res.status(422).json({ error: "Plz fill the all fields!" });
    }
    try {
      if (password !== cpassword) {
        return res.status(423).json({ error: "Password Missmatch!" });
      }

      var exist = db.query(
        "SELECT COUNT(*) as count FROM `user_table` WHERE mobileNo  =" +mobileNo +"",
        (err, result) => {
          const Count = result[0].count;
          console.log("number of user", Count);

          if (Count !== 0) {
            return res.status(422).json({ message: "User Exist" });
          } else {
            const insert =
              "INSERT INTO user_table(firstname, lastname, mobileNo, password, cpassword, gender, dob) VALUE(?,?,?,?,?,?,?)";
            db.query(
              insert,
              [firstname, lastname, mobileNo, hash, hash, gender, dob],
              (err, result) => {
                console.log(err, hash, "this is inserted password");
              }
            );

            const currentUser = {
              firstname: firstname,
              lastname: lastname,
              mobileNo:mobileNo,
              gender: gender,
              dob: dob,
            
              token: generateToken(insert)
            }

            return res.status(201).json(currentUser);
          }
        });
    } catch (err) {
      console.log(err);
    }
  })
);

app.post("/login",expressAsyncHandler(async (req, res) => {
    const mobileNo = req.body.mobileNo;
    const userPassword = req.body.password;

    const login = `SELECT * FROM user_table WHERE mobileNo = ${db.escape(mobileNo)}`;
    db.query(login, (err, result) => {
      console.log(result.length,"checking the result.length")
      if (!result.length) {
        return res.status(400).send({ messgae: "MobileNo. incorrect !" });
      } 
      else {
        const storedPassword = result[0]["password"];
        const comparePassword = bcrypt.compare(
          userPassword,
          storedPassword,
          (bErr, bResult) => {

            if (bErr) {
              console.log(bErr);
            }
            if (bResult) {
              const currentUser = {
                id: result[0]["id"],
                firstname: result[0]["firstname"],
                lastname: result[0]["lastname"],
                mobileNo: result[0]["mobileNo"],
                gender: result[0]["gender"],
                dob: result[0]["dob"],
                isAdmin: result[0]["isAdmin"],
                isCoordinator: result[0]["isCoordinator"],

                token: generateToken(bResult),
              };
              return res.status(201).send(currentUser);
            }

            return res.status(400).send({
              message: " password incorrect !",
            });
          }
        );
      }
    });
  })
);

//For fetching all users on website on admin dashboard.
app.get("/getallusers",expressAsyncHandler(async (req, res) => {
    const users = "SELECT * FROM user_table";
    db.query(users, (err, result) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(201).send(result);
    });
  })
);

//For creating new project by admin.
app.post("/createproject", expressAsyncHandler(async (req, res) => {
    const projectName = req.body.projectName;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;
    const coordinatorName = req.body.coordinatorName;
    const budget = req.body.budget;
    const remaining = req.body.budget;
    const pic = req.body.pic;

    try {
      if (
        !projectName ||
        !startDate ||
        !endDate ||
        !coordinatorName ||
        !budget
      ) {
        return res.status(422).json({ error: "Plz fill the all fields!" });
      }

      const insert =
        "INSERT INTO project_table (projectName, startDate, endDate, description, coordinatorName, budget, remaining, pic) VALUE(?,?,?,?,?,?,?,?)";
      db.query(
        insert, [projectName, startDate, endDate, description, coordinatorName, budget, budget, pic], (err, result) => {
           console.log(err)
        }
      );

      return res
        .status(201)
        .json({
          message: "Project Created successfully",
          token: generateToken(insert),
        });
    } catch (err) {
      console.log(err);
    }
  })
);

//This For get all coordinators for assigning projects to them. 
app.get("/coordinators",expressAsyncHandler(async (req, res) => {
  const coordinators = "SELECT * FROM user_table WHERE isCoordinator = 1";
  db.query(coordinators, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(201).send(result);
  });
})
);

//For get all projects on admin dashboard.
app.get("/getallprojects",expressAsyncHandler(async (req, res) => {
  const projects = "SELECT project_table.id, projectName,budget, remaining, startDate, endDate, description, concat(user_table.firstname,' ',user_table.lastname) AS coordinatorName FROM project_table INNER JOIN user_table ON project_table.coordinatorName=user_table.id ORDER BY startDate DESC";
  db.query(projects, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(201).send(result);
  });
})
);

//For donors form donate through coordinator.
app.post("/donorsform", expressAsyncHandler(async (req, response) => {
  const name = req.body.name;
  const mobileNo = req.body.mobileNo;
  const amount = req.body.amount;
  const project = req.body.project;
  const donateDate = req.body.donateDate;

  try {
    if (
      !name ||
      !mobileNo ||
      !amount ||
      !project ||
      !donateDate
    ) {
      return response.status(422).json({ error: "Plz fill the all fields!" });
    }

    const checkRemaining_0 = `SELECT *  FROM project_table WHERE id= ${db.escape(project)}`
     db.query(checkRemaining_0, (CErr,Result)=>{

      if(!Result.length){
        response.status(404).send({message:"this not a valid project ID"});
      }
    else if(Result[0]['remaining'] <= 0){
      
        response.status(404).send({message:"No remaining amount to deduct"});
      }else{

        const insert =
          "INSERT INTO donor_table (name, mobileNo, amount, project, projectBudget, donateDate) VALUE(?,?,?,?,?,?)";
        db.query(
          insert, [name, mobileNo, amount, Result[0].id, Result[0].remaining, donateDate], (err, result) => {
             console.log(err)
          }
        );
    
            //**This query for UPDATE budget value after entering amount based on matching project and project Id by coordinator(subract amount from 'budget')
            db.query(`update project_table set remaining=remaining - ${db.escape(amount)} where id = ${db.escape(project)}`,(error,Nresult)=>{
            })

            const donor = {
              name: name,
              mobileNo:mobileNo,
              amount: amount,
              project: project,
              projectBudget: Result[0].remaining,
              donateDate: donateDate,
            
              token: generateToken(insert)
            }
            
        return response.status(201).send(donor);  
      }
    })
   
   
  } catch (err) {
    console.log(err);
  }
})
);

//For fetch only projects that coordinator assigned for that.
app.post("/coordinatorsProjects",expressAsyncHandler(async (req, res) => {

  const coordinatorId = req.body.coordinatorId

  //In this we getting projects based on coordinator ID if match its show this project that they has.
  const projects = `SELECT * FROM project_table WHERE exists (select * from user_table where coordinatorName = ${db.escape(coordinatorId)}) ORDER BY startDate DESC`
  db.query(projects, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(201).send(result);
  });
})
);
 
//For getting remaining below project column of project seletion.
app.post("/getProjectById",expressAsyncHandler(async (req, res) => {

  const projectData = req.body.projectData

  //In this we getting projects based on coordinator ID if match its show this project that they has.
  const projects = `SELECT * FROM project_table WHERE id= ${db.escape(projectData)}`
  db.query(projects, (err, result) => {
  
    if (err) {
      res.status(404).send(err);
    }
    res.status(201).send(result);
  });
})
);


//For fetch all donors data that donate on 1 particular project in coordinator dashboard.
app.post("/coordinatorsCollection",expressAsyncHandler(async (req, res) => {

  const projectID = req.body.projectID

  //In this we getting projects based on coordinator ID if match its show this project that they has.
  const donors = `SELECT * FROM donor_table WHERE exists (select * from project_table where project = ${db.escape(projectID)}) ORDER BY donateDate DESC`
  db.query(donors, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(201).send(result);
  });
})
);

app.listen(4000, () => console.log("Server is running"));
