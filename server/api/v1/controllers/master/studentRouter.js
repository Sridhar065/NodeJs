import * as express from "express";
import masterController from "./studentController";
export default express
  .Router()
  .get("/get-list",  masterController. personList)
  .get("/get-city",  masterController. cityList)
  .get("/get-list",  masterController. personList)
  .post("/get-createlist",  masterController. createList)
  .post("/get-updatelist",  masterController. updateList)
  .get("/get-countsumlist",  masterController. countList)
  .get("/get-felist",  masterController. feback)
  .get("/get-felistall",  masterController. febackall)
  .delete("/get-delete",  masterController. deleteList)
  .get("/get-login_in",  masterController. login_info)
  .get("/get-search",  masterController. search)

 

