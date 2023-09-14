import { TranslateService } from '@ngx-translate/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  actionName: string = 'create'
  reactiveForm: FormGroup;
  categories: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _CategoryService: CategoryService,
    public translate: TranslateService
  ) {
    this.reactiveForm = this.createForm();
  }

  ngOnInit() {
    this.getCategories();
    if (this.data.action == 'edit') {
      this.actionName = 'edit';
      this.reactiveForm.patchValue({
        title: this.data.product.title,
        price: this.data.product.price,
        description: this.data.product.description,
        category: this.data.product.category,
        image: this.data.product.image,
      });
    }
  }


  getCategories() {
    return this._CategoryService.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  createForm() {
    return this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      category: ['', Validators.required],
    });
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.dialogRef.close(this.reactiveForm.value);
    }
  }

}
