import { Register } from "../controllers/auth.controller.js"

const routes = (route)=>{
    route.get("/get-users",Register);
}

export default routes;