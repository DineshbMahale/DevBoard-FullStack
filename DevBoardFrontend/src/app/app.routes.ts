import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';
import {Profile} from './components/profile/profile'
import { UserDashboard } from './components/dashboard/dashboard';
import { UserListComponent } from './components/user-list/user-list';
import { Signin } from './components/signin/signin';
import { Signup } from './components/signup/signup';

export const routes: Routes = [
     {
        path: 'signin',
        component: Signin
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'dashboard',
        component: UserDashboard,
        canActivate: [authGuard],
        data:{roles:['Admin','User']}
    },

    {
        path: 'profile',
        component: Profile
    },
    {
        path:'userList',
        component:UserListComponent
    },
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    }

];