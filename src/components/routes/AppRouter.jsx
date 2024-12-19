import Layout from "../Layout";
import MessageSent from "../MessageSent";
import NotFound from "../NotFound";
import Home from "../pages/Home";
import Inbox from "../pages/Inbox";
import Login from "../pages/Login";
import Message from "../pages/Message";
import Page404 from "../pages/Page404";
import Settings from "../pages/Settings";
import MidleWare from "./MidleWare";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";



import { Route, BrowserRouter as Router, Routes } from "react-router-dom";



export default function App() {
   
    
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/404" element={<Page404 />} />
                    
                  
                    
                    <Route path="/:username" element={<MidleWare />} />
                    <Route path="/:username/msg-sent" element={<MessageSent />} />
                    
                    {/* Private routes */}
                    <Route path="/" element={<PrivateRoute />} >
                        <Route path="/" element={<Home />} />
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="inbox/:id" element={<Message />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* User login || Public routes  */} 
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/" element={<PublicRoute />} >
                        
                    </Route>
                    
                           
                   
                   
                </Routes>
            </Layout>
        </Router>
    );

}