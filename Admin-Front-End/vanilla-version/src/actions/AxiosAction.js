import axios from "axios";
import { env } from "../../config.js";

export default axios.create({
  baseURL: env.API_URL,
});
