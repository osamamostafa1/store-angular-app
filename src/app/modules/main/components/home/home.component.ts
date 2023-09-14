import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/interfaces/Product.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page = 1;
  limit = 5;
  paginationConfig: any = {
    current_page: 1,
    per_page: 10,
    total_items: 100,
    total_pages: 15,
  };
  loader: boolean = true;
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  productSubscription: Subscription
  constructor(
    private _ProductService: ProductService,
    private _CategoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe()
  }

  getCategories() {
    return this._CategoryService.getCategories().subscribe((res: string[]) => {
      this.categories = res;
      this.selectedCategory = this.categories[0];
      this.getProductsByCategory();
    });
  }

  getProductsByCategory() {
    this.loader = true;
    this.productSubscription = this._ProductService.getProductsByCategory(this.selectedCategory).subscribe((res: Product[]) => {
      this.loader = false;
      this.products = res;
    });
  }

  onPageChange(pageNo: any) {
    this.page = pageNo;
  }

  selectCategory(event: any) {
    this.selectedCategory = event.target.value;
    this.getProductsByCategory();
  }
}
