const settings = require("../config/app.config");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const dataURI = require("datauri");
const aws = require("aws-sdk");
const fs = require("fs");
const handlebars = require("handlebars");
const CryptoJS = require("crypto-js");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const path = require("path");
import mailService from "../services/mailTrigger.service";
let secretKey = "Code9SecretKey";
// const NodeRSA = require("node-rsa");
// const key = new NodeRSA({ b: 512 });
//key.setOptions('pkcs1-private-pem',{encryptionScheme: 'pkcs1'});
class GeneralHelper {
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract encrypt text
   */
  encryptText(text) {
    let encrypted = CryptoJS.AES.encrypt(text, secretKey).toString()
    return encrypted;

  }
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract encrypt text
   */
  decryptText(encryptedText) {
    let bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract Compare password
   */
  comparePassword(userpass, password) {
    return bcrypt.compareSync(password, userpass);

  }
  /**
   * @author Renuga S <v2e16344>
   * @version 1.0
   * @abstract encrypt password
   */
  encryptPassword(password) {
    return bcrypt.hashSync(password);
  }
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract Generate token for user authentication
   */
  tokenGenerate(data, expire) {
    return jwt.sign(data, settings.config.JWT_SECRET, {
      expiresIn: expire
    });
  }

  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract Decoded the Token
   */
  tokenDecoded(token) {
    let response;
    return jwt.verify(token, settings.config.JWT_SECRET, (err, decoded) => {
      if (err) {
        response = {
          status: 401
        };
        return response;
      } else {
        return decoded;
      }
    });
  }


  /**
   * @author Renuga <v2316344>
   * @abstract provides offset and limit to query based on params
   * @version 1.0.0
   * @param page integer
   * @param page_size integer
   */
  pagination(page, page_size) {
    let pagination = {
      offset:
        parseInt((page ? page : 1) - 1) * parseInt(page_size ? page_size : 10),
      limit: parseInt(page_size ? page_size : 10)
    };
    return pagination;
  }
  /**
    * @author sathishkumar s <v2e12612>
    * @abstract provides a number with leading zero. 
    * @version 1.0.0
    * @param num integer
    * @param size integer
    */
  pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  /**
     * @author sathishkumar s <v2e12612>
     * @abstract provides a qr code data url for given string 
     * @version 1.0.0
     * @param str string
     * @return string 
     */
  async convertQRCodeDataURL(str) {
    return await QRCode.toDataURL(str);
  }

  /**
    * @author sathishkumar s <v2e12612>
    * @abstract provides a files data url for given file path 
    * @version 1.0.0
    * @param file_path string
    * @return string 
    */
  async convertFileDataURL(file_path) {
    return await dataURI(file_path);
  }
  /**
   * @author sathishkumar s <v2e12612>
   * @abstract to send mail with dynamic content
   * @version 1.0.0
   * @param file_path string
   * @return string 
   */
  async sendDynamicMail(file_path, replacements, to, cc, subject) {
    let contents = fs.readFileSync(file_path, { encoding: 'utf-8' });
    let compied_contents = handlebars.compile(contents);
    let body_content = compied_contents(replacements);
    let config = {
      mailHost: settings.config.RESOURCE_MAIL_HOST,
      mailPort: settings.config.RESOURCE_MAIL_PORT,
      ssl: false,// true for 465, false for other ports
      username: settings.config.RESOURCE_MAIL_USERNAME,
      password: settings.config.RESOURCE_MAIL_PASSWORD,
      fromMail: settings.config.RESOURCE_MAIL_FROMMAIL
    }

    return await mailService.sendMails(to, body_content, subject, cc, config);
  }

  /**
   * @author sathishkumar s <v2e12612>
   * @abstract get object from s3 bucket
   * @version 1.0.0
   * @param file_path string
   * @return string 
   */
  async getObjectFromS3(key_name) {
    aws.config.update({
      accessKeyId: settings.config.Aws_Accesskey_id,
      secretAccessKey: settings.config.Aws_Secret_Access_key,
      region: settings.config.Aws_Region,
      s3BucketEndpoint: true,
      endpoint: "http://" + settings.config.Aws_Bucket + ".s3.amazonaws.com"
    });
    let bucket = new aws.S3({ params: { Bucket: settings.config.Aws_Bucket } });
    return new Promise(function (resolve, reject) {
      bucket.getObject({ Key: key_name }, function (err, file) {
        if (err) {
          reject(err);
        }
        else {
          //let result = mimeType + encode(file.Body);
          resolve(file)
        }
      });
    });
  }
  async getS3SignedURL(key_name) {
    aws.config.update({
      accessKeyId: settings.config.Aws_Accesskey_id,
      secretAccessKey: settings.config.Aws_Secret_Access_key,
      region: settings.config.Aws_Region,
      //s3BucketEndpoint: true,
      // endpoint: "http://" + settings.config.Aws_Bucket + ".s3.amazonaws.com"
    });
    const s3 = new aws.S3()
    const myBucket = settings.config.Aws_Bucket;
    const myKey = key_name;
    const signedUrlExpireSeconds = 60;

    let url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds,
    });
    return url;
  }


  /**
   * @author sathishkumar <v2e12612>
   * @abstract to convert excel file to json object from given path.
   * @version 1.0.0
   * @param filePath string
   */
  async convertExcelToJson(filePath) {
    let f_ext = path.extname(filePath);
    const xltojson = f_ext == ".xlsx" ? xlsxtojson : xlstojson;
    return new Promise((resolve, reject) => {
      xltojson({
        input: filePath,
        output: null
      }, function (err, result) {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }

  /**
    * @author sathishkumar <v2e12612>
    * @abstract to check the excel column with given template for header matching
    * @version 1.0.0
    * @param arr_temp array
    * @param excel_header array
    */
  async chkExcelColumns(arr_temp, excel_header) {
    let exist_count = 0;
    for (let c of excel_header) {
      if (arr_temp.includes(c)) {
        exist_count++;
      }
    }
    if (arr_temp.length == exist_count) {
      return true;
    }
    else {
      return false;
    }
  }

}
export default new GeneralHelper();
