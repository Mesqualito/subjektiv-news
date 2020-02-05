import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeExtendedComponent } from './home-extended.component';

@NgModule({
  declarations: [HomeExtendedComponent],
  exports: [HomeExtendedComponent],
  imports: [CommonModule]
})
export class HomeExtendedModule {}
