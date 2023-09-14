import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { adminGuard } from 'src/app/core/guard/admin.guard';

const routes: Routes = [
  {
    path: '', component: RootComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent, canActivate: [adminGuard] },
      { path: 'product-details/:id', component: ProductDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
