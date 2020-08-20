import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const dotenv = require("dotenv");
// dotenv.config({ path: "../../server/.env" });
require("dotenv").config();

configure({ adapter: new Adapter() });
