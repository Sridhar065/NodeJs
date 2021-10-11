import Service from "./service";
import connectionService from "./connection.services";
import { Sequelize } from "sequelize";
const sequelize = require("sequelize");
const Op = sequelize.Op;

class MainService extends Service {
    async StudsList() {

        let Employee = connectionService.studs();
        return await Employee.findAll({
          tableHint: sequelize.TableHints.NOLOCK
        });
      }


      //Cityname Get
      async cityListqury() {

        let Employee = connectionService.Cty_in();
        return await Employee.findAll({
          tableHint: sequelize.TableHints.NOLOCK
        });
      }

      //login
      async login_infoList(query) {
 
        let Employee = connectionService.login_in();
        console.log(query)
        let datacreate= await Employee.findAll({where:query});
          if (datacreate) {
            return this.response(
              200,"",
             
              "Login successfully"
            );
       
          } else {
            return this.response(400, "", "Not inserted");
          }
        }



       // create
       async newListstuds(query) {

        let mang = connectionService.studs();
        let datacreate= await mang.create(query);
          tableHint: sequelize.TableHints.NOLOCK
          if (datacreate) {
            return this.response(
              200,"",
             
              "Added successfully"
            );
       
          } else {
            return this.response(400, "", "Not inserted");
          }
        }

        //update
        async getupdateList(query,con) {

          let mang = connectionService.studs();
          let datacreate= await mang.update(query,{where:con});
            tableHint: sequelize.TableHints.NOLOCK
            if (datacreate) {
              return this.response(
                200,"",
               
                "update successfully"
              );
         
            } else {
              return this.response(400, "", "Not inserted");
            }
          }

    

          // Count , group by
          async getcountList(){
            let mang = connectionService.studs();
            return await mang.findAll({
            attributes: ['marks', [sequelize.fn('count', sequelize.col('marks')), 'counts'],[sequelize.fn('sum', sequelize.col('marks')), 'sum']],
            tableHint: sequelize.TableHints.NOLOCK,
            group: ['marks'],
          });
          }

          async feedbackSave() {
            let Employee = connectionService.studs();
            return await Employee.findAll({
            tableHint: sequelize.TableHints.NOLOCK,
            raw: true,
            attributes: ["employeename", "marks"],
            where: {
              id: 2
                }
            });
          }

          async feedbackSaveall() {
            let Employee = connectionService.studs();
            return await Employee.findAll({
            tableHint: sequelize.TableHints.NOLOCK,
            raw: true,
            attributes: ["employeename", "marks"],
            });
          }

          async getdeleteList(con) {

            let mang = connectionService.studs();
            let datacreate= await mang.destroy({where:con});
              tableHint: sequelize.TableHints.NOLOCK
              if (datacreate) {
                return this.response(
                  200,"",
                 
                  "update successfully"
                );
           
              } else {
                return this.response(400, "", "Not inserted");
              }
            }

          //search
          // async searchlist() {
 
          //   let mang = connectionService.studs();
          //   let datacreate= await mang.findAll();
          //   if (datacreate) {
          //     return this.response(
          //       200,"",
               
          //       "Search successfully"
          //     );
         
          //   } else {
          //     return this.response(400, "", "Not inserted");
          //   }
          // }

          async searchlist() {
 
            let State = connectionService.studs();
            return await State.findAll({
              where:{
                city:"salem"         
              },
              tableHint: sequelize.TableHints.NOLOCK,
            });
          }

             // async forProcedureCall(SP_Name, params) {​​​​​​​​
      // letdataFromProcedure;
      // letqry = "CALL " + SP_Name;
      
      // if (params != null) {​​​​​​​​
      // qry = qry + " (" + params + ");";
      //     }​​​​​​​​
      // else {​​​​​​​​
      //     }​​​​​​​​
      // dataFromProcedure = SEQUELIZE.query(qry);
      // if (dataFromProcedure) {​​​​​​​​
      // returnthis.response(200, dataFromProcedure, "");
      //     }​​​​​​​​
      // else {​​​​​​​​
      // returnthis.response(400, "Unable to get data", dataFromProcedure);
      //     }​​​​​​​​
      //   }​​​​​​​​


        async forProcedureCall(SP_Name) {
          let dataFrom;
          let qry = "exec " + SP_Name;
          // console.log(params) 
          
        
          //  qry = qry + " " + SP_Name;
           console.log(qry)
         
        //  else{

        //  }
         dataFrom = await SEQUELIZE.query(qry);
         console.log("sri1")
         console.log(dataFrom)

         if(dataFrom){
           return this.response(200,dataFrom, "");
         }
         else{
          return this.response(400, "Unable to get data", dataFrom);
         }
        }


        // async forProcedureCall(SP_Name) {
        //   let dataFrom;
        //   let qry = "exec " + SP_Name;
        //   console.log(params) 
          
        //  if (SP_Name != null) {
        //    qry = qry + " " + SP_Name;
        //    console.log(qry)
        //  }
        //  else{

        //  }
        //  dataFrom = await SEQUELIZE.query(qry);
        //  console.log("sri1")
        //  console.log(dataFrom)

        //  if(dataFrom){
        //    return this.response(200,dataFrom, "");
        //  }
        //  else{
        //   return this.response(400, "Unable to get data", dataFrom);
        //  }
        // }

}

export default new MainService();
