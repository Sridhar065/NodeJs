import connectService from "../services/enable.service";
const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = connectService.connect();

export default class Login extends Model { }
Login.init(
    {
        // id: {
        // type: Sequelize.INTEGER,
        // primaryKey:true,
        // allowNull:false,
        // autoIncrement: true,
        // },
         email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },         
    },
    {
        sequelize,
        timestamps:false,
        tableName: "users_mail"
      }
    
);
