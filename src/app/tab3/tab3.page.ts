import { Component, OnInit, OnDestroy } from '@angular/core';
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
  ToastController,
  AlertController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cashOutline,
  pricetagOutline,
  walletOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  refreshOutline,
  cartOutline,
  checkmarkDoneOutline
} from 'ionicons/icons';

import { Subscription } from 'rxjs';
import { PurchaseService, PurchaseData } from '../services/purchase';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
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
    IonCardContent
  ]
})

export class Tab3Page implements OnInit, OnDestroy {
  paymentForm!: FormGroup;
  purchaseData: PurchaseData | null = null;
  private sub!: Subscription;

  discountAmount = 0;
  finalTotal = 0;
  changeOrPending = 0;
  isPaidFully = true;

  constructor(

    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ cashOutline, pricetagOutline, walletOutline, checkmarkCircleOutline, alertCircleOutline, refreshOutline, cartOutline, checkmarkDoneOutline });
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      discountPercent: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      amountPaid: [
        null,
        [Validators.required, Validators.min(0)],
      ],
    });

    this.sub = this.purchaseService.currentPurchase$.subscribe((data) => {
      this.purchaseData = data;
      this.calculatePayment();
    });

    this.paymentForm.valueChanges.subscribe(() => {
      this.calculatePayment();
    });
  }

  calculatePayment(): void {
    if (!this.purchaseData) {
      this.discountAmount = 0;
      this.finalTotal = 0;
      this.changeOrPending = 0;
      return;
    }

    const subtotal = this.purchaseData.subtotal;
    const discountVal = Number(this.paymentForm.get('discountPercent')?.value) || 0;
    const cashVal = Number(this.paymentForm.get('amountPaid')?.value) || 0;

    const validDiscount = Math.min(Math.max(discountVal, 0), 100);
    this.discountAmount = Number((subtotal * (validDiscount / 100)).toFixed(2));
    this.finalTotal = Number((subtotal - this.discountAmount).toFixed(2));

    const diff = Number((cashVal - this.finalTotal).toFixed(2));
    if (diff >= 0) {
      this.isPaidFully = true;
      this.changeOrPending = diff;
    } else {
      this.isPaidFully = false;
      this.changeOrPending = Math.abs(diff);
    }
  }

  async confirmPayment(): Promise<void> {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    if (!this.purchaseData) {
      const alert = await this.alertController.create({
        header: 'Saldo Pendiente',
        message: `Faltan $${this.changeOrPending.toFixed(2)} para completar el pago.`,
        buttons: ['Entendido'],
      });
      await alert.present();
      return;
    }

    const toast = await this.toastController.create({
      message: `¡Cobro registrado con éxito! Cambio: $${this.changeOrPending.toFixed(2)}`,
      duration: 3500,
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();

    this.purchaseService.clearPurchase();
    this.paymentForm.reset({ discountPercent: 0, amountPaid: null });
    this.router.navigate(['/tabs/tab2']);
  }

  goToNewPurchase(): void {
    this.purchaseService.clearPurchase();
    this.paymentForm.reset({ discountPercent: 0, amountPaid: null });
    this.router.navigate(['/tabs/tab2']);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
