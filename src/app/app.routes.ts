import { Routes } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { StatusComponent } from './status/status.component';
import { GridComponent } from './grid/grid.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { BlankComponent } from './blank_without_matsidecontainer/blank.component';


export const routes: Routes = [

       {
        path: '',    
        pathMatch: "full",
        redirectTo: "status",       // always land here, if not another valid path
       }, 

    {
        path: 'status',
        component: StatusComponent,

        /* 
        used to setTitle of browser tab, unless other logic overwrites such as
        cf https://angular.dev/api/router/TitleStrategy

        see for multiple ways to change title as needed for diffrent cases

           https://medium.com/@Bilal.se/practical-techniques-for-setting-page-titles-in-angular-5c9a8ff15cba
        */

        title: 'Status',
        data: {},


    },

    {
        path: 'view1',
        loadComponent: () => import('./view1/view1.component').then(a => a.View1Component),
        title: 'view1',
    },

    {
        path: 'view2',
          loadComponent: () => import('./view2/view2.component').then(a => a.View2Component),
        title: 'view2',
    },

    {
        path: 'view3',
          loadComponent: () => import('./view3/view3.component').then(a => a.View3Component),
        title: 'view3',
    },

      {
        path: 'view4',
          loadComponent: () => import('./view4/view4.component').then(a => a.View4Component),
        title: 'view4',
    },

    {
        path: 'delivery',
        component: DeliveryComponent,
        title: 'delivery',
    },
 
    {
        path: 'grid',
        component: GridComponent,
        title: 'grid',
    },

    {
        path: 'blank',
        component: BlankComponent,
        title: 'blank',
    },




    {   // last 
         path: '**', component: PageNotFoundComponent  ,
         title: '404',
    }
];
