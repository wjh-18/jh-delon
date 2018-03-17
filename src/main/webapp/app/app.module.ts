import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';
// import {AlainABCModule } from '@delon/abc';

import { DelonModule } from './delon/delon.module';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JhipsterSharedModule, UserRouteAccessService } from './shared';
import { JhipsterAppRoutingModule} from './app-routing.module';
import { JhipsterHomeModule } from './home/home.module';
import { JhipsterAdminModule } from './admin/admin.module';
import { JhipsterAccountModule } from './account/account.module';
import { JhipsterEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        DelonModule.forRoot(),
        JhipsterAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JhipsterSharedModule,
        JhipsterHomeModule,
        JhipsterAdminModule,
        JhipsterAccountModule,
        JhipsterEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        // NgZorroAntdModule,
        // NgZorroAntdExtraModule,
        // AlainABCModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        SidebarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JhipsterAppModule {}
