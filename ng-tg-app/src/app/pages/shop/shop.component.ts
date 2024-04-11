import { Component, inject } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductsService } from '../../services/products.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="skill"
      subtitle="skill subtitle"
      [products]="products.byGroup['skill']"
    />
    <app-product-list
      title="intensive"
      subtitle="intensive subtitle"
      [products]="products.byGroup['intensive']"
    />
    <app-product-list
      title="course"
      subtitle="course subtitle"
      [products]="products.byGroup['course']"
    />
  `,
})
export class ShopComponent {
  telegram = inject(TelegramService);
  products = inject(ProductsService);

  constructor() {
    this.telegram.BackButton.hide();
  }
}
