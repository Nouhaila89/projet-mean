import { Routes } from '@angular/router';
import { AdminGuard } from './common/guard/admin.guard';
import { PaymentService } from './components/payment/service/payment.service';
import { inject } from '@angular/core';

export const routes: Routes = [  
    {
            path: "admin",
            loadComponent: ()=> import("./components/adminlayouts/adminlayouts.component").then(c=> c.AdminlayoutsComponent),canActivate: [AdminGuard],
            children:[
                {
                    path:"",
                    loadComponent: ()=> import("./components/admin-home/admin.component").then(c=> c.AdminComponent)
                },
                {
                    path:"admin-products",
                    loadComponent: ()=> import("./components/admin-products/admin-products.component").then(c=> c.AdminProductsComponent),
                },
                {
                    path:"admin-products/add",
                    loadComponent: ()=> import("./components/admin-products/product-add/product-add.component").then(c=> c.ProductAddComponent),
                },
                {
                    path:"admin-products/update/:value",
                    loadComponent: ()=> import("./components/admin-products/product-update/product-update.component").then(c=> c.ProductUpdateComponent),
                },
                {
                    path:"admin-category",
                    loadComponent: ()=> import("./components/admin-category/admin-category.component").then(c=> c.AdminCategoryComponent),
                },
                {
                    path:"admin-coupon",
                    loadComponent: ()=> import("./components/admin-coupon/admin-coupon/admin-coupon.component").then(c=> c.AdminCouponComponent),
                },
                {
                    path:"admin-contact",
                    loadComponent: ()=> import("./components/admin-contact/admin-contact.component").then(c=> c.AdminContactComponent),
                },
                {
                    path:"admin-orders",
                    loadComponent: ()=> import("./components/admin-orders/admin-orders.component").then(c=> c.AdminOrdersComponent),
                }
                
            ]
    },
    {
        path:"",
        loadComponent: ()=> import("./components/layouts/layouts.component").then(c=> c.LayoutsComponent),
        children:[
            {
                path: "",
                loadComponent: ()=> import("./components/home/home.component").then(c=> c.HomeComponent)
            },
            {
                path: "product",
                loadComponent: ()=> import("./components/product/product.component").then(c=> c.ProductComponent)
            },
            {
                path: "product-single/:value",
                loadComponent: ()=> import("./components/product-single/product-single.component").then(c=> c.ProductSingleComponent)
            },
            {
                path: "login",
                loadComponent: ()=> import("./components/auth/components/login/login.component").then(c=> c.LoginComponent)
            },
            {
                path: "about",
                loadComponent: ()=> import("./components/about/about.component").then(c=> c.AboutComponent)
            },
            {
                path: "baskets",
                loadComponent: ()=> import("./components/baskets/baskets.component").then(c=> c.BasketsComponent)
            },
            {
                path: "payment",
                loadComponent: ()=> import("./components/payment/payment.component").then(c=> c.PaymentComponent),
                canActivate: [()=> inject(PaymentService).control()]
            },
            {
                path: "orders",
                loadComponent: ()=> import("./components/orders/orders.component").then(c=> c.OrdersComponent),
                canActivate: [()=> inject(PaymentService).control()]
            },
            {
                path: "contact",
                loadComponent: ()=> import("./components/contact/contact.component").then(c=> c.ContactComponent)
            },
            
            {
                path: "register",
                loadComponent: ()=> import("./components/auth/components/register/register.component").then(c=> c.RegisterComponent)
            },
        ]
    }
];
