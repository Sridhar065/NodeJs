import MainService from "../../services/main.services";
import BaseController from "../base.controller";
import validator from "../../helpers/validation.helper";
const Settings = require("../../config/app.config");
export class personController extends BaseController {

  async calculateEmpAssessmentScore(req,res) {
    let result;
    let SP_Name;
    let params;
    try {
        SP_Name = "smps"
        result = await MainService.forProcedureCall(SP_Name);
        // console.log("result")
        // console.log(result)
        if (result.length != 0) {
          result = super.response(
            200,
            result,
            "Successfully retrieved list"
          );
        } else {
          result = super.response(400, "", "No records found");
        }
        super.respond(req, res, result);
  
        if (result.content == "Unable to get data") {
            result = { status: 400, Content: result.content, message: result.message };
        }
    }
    catch (ex) {
      result = super.response(500, ex.message, "Internal Server Error");
      super.respond(req, res, result);
    }
    
    // catch (error) {
    //     result = error;
    // }
    
}

// async calculateEmpAssessmentScore(req,res) {
//   let result;
//   let SP_Name;
//   let params;
//   try {
//       SP_Name = "smps"
//       result = await MainService.forProcedureCall(SP_Name,req.body.id);
//       // console.log("result")
//       // console.log(result)
//       if (result.length != 0) {
//         result = super.response(
//           200,
//           result,
//           "Successfully retrieved list"
//         );
//       } else {
//         result = super.response(400, "", "No records found");
//       }
//       super.respond(req, res, result);

//       if (result.content == "Unable to get data") {
//           result = { status: 400, Content: result.content, message: result.message };
//       }
//   }
//   catch (ex) {
//     result = super.response(500, ex.message, "Internal Server Error");
//     super.respond(req, res, result);
//   }
  
//   // catch (error) {
//   //     result = error;
//   // }
  
// }

    async personList(req, res) {
        let result;
        try {
          let data = await MainService.StudsList();
          if (data.length != 0) {
            result = super.response(
              200,
              data,
              "Successfully retrieved list"
            );
          } else {
            result = super.response(400, "", "No records found");
          }
          super.respond(req, res, result);
    
        } catch (ex) {
          result = super.response(500, ex.message, "Internal Server Error");
          super.respond(req, res, result);

}
 }

//Cityname get
 async cityList(req, res) {
  let result;
  try {
    let data = await MainService.cityListqury();
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully retrieved list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);

  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);

}
}



// async login_info(req, res) {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }
//       var authorities = [];
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].name.toUpperCase());
//         }
//         res.status(200).send({
//           id: user.id,
//           email: user.email,
//           password: user.password,
//         });
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };


// login


 async login_info(req, res) {
  try {
    console.log("sri")
    let result;
    let rules = {
      
      email: "required",
      password:"required",
    };
    let validate = await validator.validate(rules, req.body);
if (validate.status == 200) {
     // create 
    let query = {
      email:req.body.email,
      password:req.body.password
      
     };//condition 
     console.log("sri2")
    let data = await MainService.login_infoList(query);
    if (data.length != 0) {
      super.respond(req, res, data);
    } else {
      result = super.response(400, "", "No records found");
    }
  } else {
    result = super.response(
      validate.status,
      validate.error,
      "please fill required fields"
    );
    super.respond(req, res, result);
 
  }
 } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);
  }
}


 //create
//  async createList(req, res) {
// let result;
//   try {
//     // let result;
//     // let rules = {
//     //   firstname: "required",
//     //   middlename: "required",
//     //   lastname: "required",
//     //   dob: "required",
//     //   course: "required",
//     //   district: "required",
//     //   city: "required",
//     //   gender: "required",
//     //   phone: "required",
//     //   address: "required",
//     //   email: "required"
//     // };
//     let validate = await validator.validate(rules, req.body);
//     console.log(validate)
// if (validate.status == 200) {
  
//     let query = {firstname:req.body.firstname, middlename:req.body.middlename, lastname:req.body.lastname, dob:req.body.dob, course:req.body.course,
//       district:req.body.district, city:req.body.city, gender:req.body.gender, phone:req.body.phone, address:req.body.address, email:req.body.email}
//     let data = await MainService.newListstuds(query);
//     if (data.length != 0) {
//       super.respond(req, res, data);
//     } else {
//       super.respond(req, res, data);
//     }
//   } else {
//     super.respond(req, res, validate);
   
//   }

//   } catch (ex) {
//     result = super.response(500, ex.message, "Internal Server Error");
//     super.respond(req, res, result);

// }
//  }


 async createList(req, res) {
  let result;
  try {
    let query={firstname:req.body.firstname, middlename:req.body.middlename, lastname:req.body.lastname, dob:req.body.dob, course:req.body.course,
      district:req.body.district, city:req.body.city, gender:req.body.gender, phone:req.body.phone, address:req.body.address, email:req.body.email };// condition
      let data = await MainService.newListstuds(query);
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully retrieved list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);
 
  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);
 
}
}


 //update
 async updateList(req, res) {
  let result;
  try {
    let query = {firstname:req.body.firstname, middlename:req.body.middlename, lastname:req.body.lastname, dob:req.body.dob, course:req.body.course,
      district:req.body.district, city:req.body.city, gender:req.body.gender, phone:req.body.phone, address:req.body.address, email:req.body.email}
    let con = {firstname:"sridhar"}
  let data = await MainService.getupdateList(query,con);
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully retrieved list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);

  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);

}
 }

 async deleteList(req, res) {
  let result;
  try {

    let con = {firstname:req.body.firstname}
  let data = await MainService.getdeleteList(con);
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully deleted list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);

  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);

}
 }

//count, sum
async countList(req, res) {
  let result;
  try {
  let data = await MainService.getcountList();
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully retrieved list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);

  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);

}
 }


 async feback(req, res) {
  let result;
  try {
  let data = await MainService.feedbackSave();
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully retrieved list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);

  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);

}
 }

 async febackall(req, res) {
  let result;
  try {
  let data = await MainService.feedbackSaveall();
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully retrieved list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);

  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);

}
 }


 //serach
//  async search(req, res) {
//   let result;
//   try {
//     let query = {city:req.body.city}
//     let con = {city:req.body.city}
//     console.log("con")
//     let data = await MainService.searchlist(query,con);
//     if (data.length != 0) {
//       result = super.response(
//         200,
//         data,
//         " Search Successfully retrieved list"
//       );
//     } else {
//       result = super.response(400, "", "No records found");
//     }
//     super.respond(req, res, result);
 
//   } catch (ex) {
//     result = super.response(500, ex.message, "Internal Server Error");
//     super.respond(req, res, result);
 
// }
// }

async search(req, res) {
  let result;
  try {
    let data = await MainService.searchlist();
    if (data.length != 0) {
      result = super.response(
        200,
        data,
        "Successfully retrieved list"
      );
    } else {
      result = super.response(400, "", "No records found");
    }
    super.respond(req, res, result);
 
  } catch (ex) {
    result = super.response(500, ex.message, "Internal Server Error");
    super.respond(req, res, result);
 
}
}

}



export default new personController();
