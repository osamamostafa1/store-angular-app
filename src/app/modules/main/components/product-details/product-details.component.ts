import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/interfaces/Product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''

  };
  loader: boolean = true;
  productSubscription: Subscription
  constructor(private activatedRoute: ActivatedRoute,
    private _ProductService: ProductService) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.productId = params.id;
    });
  }

  ngOnInit() {
    this.getProduct();
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe()
  }

  getProduct() {
    this.loader = true;
    this.productSubscription = this._ProductService.getProductById(this.productId).subscribe((res: Product) => {
      this.loader = false;
      this.product = res;
    });
  }



}
