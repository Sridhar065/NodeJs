import connectService from "../services/enable.service";
const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = connectService.connect();

export default class Person extends Model { }
Person.init(
    {
        id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement: true,
        },
        firstname: {
        type: Sequelize.STRING,
        allowNull:false
         },
         middlename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: false
        }, 
        course: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        district: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },               
    },
    {
        sequelize,
        timestamps:false,
        tableName: "sridhar_student_form"
      }
    
);
