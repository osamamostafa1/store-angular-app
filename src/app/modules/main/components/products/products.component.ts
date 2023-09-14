import { Component, OnInit } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/Product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  limit = 5;
  page = 1;
  paginationConfig: any = {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0,
  }
  loader: boolean = true;
  isFilter: boolean = false
  products: Product[] = [];
  productSubscription: Subscription
  constructor(private dialog: MatDialog,
    private _ProductService: ProductService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.getProducts();
  }
  ngOnDestroy() {
    this.productSubscription.unsubscribe()
  }

  getProducts() {
    this.loader = true;
    this.productSubscription = this._ProductService.getProducts(this.limit).subscribe((res: Product[]) => {
      this.loader = false;
      this.products = res;
    });
  }

  openFilter() {
    this.isFilter = !this.isFilter
  }

  onPageChange(pageNo: any) {
    this.page = pageNo;
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '1000px',
      disableClose: false,
      data: {
        action: 'create'
      }
    })
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this._ProductService.addProduct(data).subscribe((res: any) => {
          this.toastr.success('Created successfully');
          this.getProducts();
        });
      }
    })
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '1000px',
      disableClose: false,
      data: { action: 'edit', product: product },
    })
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this._ProductService.editProduct(data, product.id).subscribe((res: any) => {
          this.toastr.success('Updated successfully');
          this.getProducts();
        });
      }
    })
  }

  deleteCategory(id: number) {
    this._ProductService.deleteProduct(id).subscribe((res: any) => {
      this.toastr.success('Deleted successfully');
      this.getProducts();
    });
  }


}
