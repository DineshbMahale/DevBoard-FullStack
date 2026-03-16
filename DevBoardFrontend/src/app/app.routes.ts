import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import {Profile} from './features/profile/profile'
import { UserDashboard } from './features/dashboard/dashboard';
import { UserList } from './features/user-list/user-list';

export const routes: Routes = [
     {
        path: 'login',
        component: LoginComponent
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
        component:UserList
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }

];