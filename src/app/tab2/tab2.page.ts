import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonIcon,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { pawOutline, bagCheckOutline, alertCircleOutline } from 'ionicons/icons';
import { PurchaseService } from '../services/purchase';
import { PRODUCTS_CATALOG, ProductItem } from '../data/products.data';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonSegment,
    IonSegmentButton
  ]
})
export class Tab2Page implements OnInit {
  purchaseForm!: FormGroup;
  currentCategory: 'perros' | 'gatos' = 'perros';
  filteredProducts: ProductItem[] = [];

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router: Router
  ) {
    addIcons({ pawOutline, bagCheckOutline, alertCircleOutline });
  }

  ngOnInit(): void {
    this.updateCategoryList();

    this.purchaseForm = this.fb.group({
      selectedProductId: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      quantity: [
        1, 
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]
      ],
      unitPrice: [
        null, 
        [Validators.required, Validators.min(0.01)]
      ]
    });
  }

  onCategoryChange(event: any): void {
    const selected = event.detail.value;
    if (selected === 'perros' || selected === 'gatos') {
      this.currentCategory = selected;
      this.updateCategoryList();
      // Limpiar selección de producto al cambiar de especie
      this.purchaseForm.patchValue({
        selectedProductId: '',
        productName: '',
        unitPrice: null
      });
    }
  }

  updateCategoryList(): void {
    this.filteredProducts = PRODUCTS_CATALOG.filter(
      (p) => p.category === this.currentCategory
    );
  }

  onProductSelected(productId: string): void {
    const item = PRODUCTS_CATALOG.find((p) => p.id === productId);
    if (item) {
      this.purchaseForm.patchValue({
        productName: item.name,
        unitPrice: item.price
      });
    }
  }

  onSubmit(): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    const { productName, quantity, unitPrice } = this.purchaseForm.value;
    const subtotal = Number((Number(quantity) * Number(unitPrice)).toFixed(2));

    this.purchaseService.setPurchase({
      productName: productName.trim(),
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      subtotal
    });

    this.router.navigate(['/tabs/tab3']);
  }
}