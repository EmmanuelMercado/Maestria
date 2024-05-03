import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
 {path:"home",component: HomeComponent},
 {path:"products",component: ProductComponent},
 {path:"dashboard",component: DashboardComponent},
 {path:"login",component: LoginComponent},
 {path:"about",component: AboutComponent},
];
