import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubjektivNewsSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HomeExtendedModule } from 'app/ng_custom/home-extended/home-extended.module';

@NgModule({
  imports: [SubjektivNewsSharedModule, RouterModule.forChild([HOME_ROUTE]), HomeExtendedModule],
  declarations: [HomeComponent]
})
export class SubjektivNewsHomeModule {}
