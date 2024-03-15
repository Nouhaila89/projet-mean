import { Routes } from '@angular/router';

export const routes: Routes = [  
    {
            path: "admin",
            loadComponent: ()=> import("./components/adminlayouts/adminlayouts.component").then(c=> c.AdminlayoutsComponent),
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
                    path:"admin-category",
                    loadComponent: ()=> import("./components/admin-category/admin-category.component").then(c=> c.AdminCategoryComponent),
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
                path: "product-single",
                loadComponent: ()=> import("./components/product-single/product-single.component").then(c=> c.ProductSingleComponent)
            },
            {
                path: "login",
                loadComponent: ()=> import("./components/login/login.component").then(c=> c.LoginComponent)
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
                path: "orders",
                loadComponent: ()=> import("./components/orders/orders.component").then(c=> c.OrdersComponent)
            },
            {
                path: "contact",
                loadComponent: ()=> import("./components/contact/contact.component").then(c=> c.ContactComponent)
            },
            
            {
                path: "register",
                loadComponent: ()=> import("./components/register/register.component").then(c=> c.RegisterComponent)
            },
        ]
    }
];
