import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route , Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';

//import routers
import LoginPage from './Pages/loginPage';
import StudentProfilePage from './Pages/studentProfilePage';
import coursereviewPage from './Pages/courseReviewPage';
import PendingListPage from './Pages/pendingListPage';
import CourseEnrolmentPage from './Pages/courseEnrolmentPage';
// import NotFound from './Pages/notFound';    //TODO : 404 bug need to fix


//routers controller
const AppRouter = () => 
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {LoginPage} />
            <Route exact path="/studentprofile" component={StudentProfilePage} />
            <Route exact path="/pendinglist" component={PendingListPage} />
            <Route exact path="/coursereview" component={coursereviewPage} />
            <Route exact path="/courseenrolment" component={CourseEnrolmentPage}/>
            {/* <Route component= {NotFound} /> */}
        </Switch>
    </BrowserRouter>


ReactDOM.render(
    <AppRouter />, document.getElementById('root')
)

registerServiceWorker();
