import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface PurchaseData{
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

@Injectable({
    providedIn: 'root'
})
export class PurchaseService{
    private purchaseSource= new BehaviorSubject<PurchaseData | null>(null);
    currentPurchase$= this.purchaseSource.asObservable();

    setPurchase(data: PurchaseData): void{
        this.purchaseSource.next(data);
    }
    getPurchase(): PurchaseData | null{
        return this.purchaseSource.value;
    }

    clearPurchase(): void{
        this.purchaseSource.next(null);
    }
}
