import Person from "../repositories/student.model";
import Login from '../repositories/login.model';
import City from '../repositories/city.model'

class connectionService {
  studs() {
    return Person;
  }
  login_in() {
    return Login;
  }
  Cty_in() {
    return City;
  }
}
  export default new connectionService();