import connectService from "../services/enable.service";
const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = connectService.connect();

export default class City extends Model { }
City.init(
    {
        id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement: true,
        },
         city: {
            type: Sequelize.STRING,
            allowNull: false
        },        
    },
    {
        sequelize,
        timestamps:false,
        tableName: "table_city_name"
      }
    
);
