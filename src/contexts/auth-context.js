import { createContext } from "react";
import AuthModel from "../data/models/auth-model";

const AuthContext = createContext(AuthModel.fromJson());

export default AuthContext;
