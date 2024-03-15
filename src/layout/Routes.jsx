import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";

const routeItems = [
    {
        id: 1,
        title: "HomePage",
        path: "/",
        element:
            <div className="grid grid-cols-4">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-3">
                    <Home />
                </div>
            </div>
        ,
        exact: true
    }
]

export default routeItems;
