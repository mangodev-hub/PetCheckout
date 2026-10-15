export interface ProductItem {
    id: string;
    name: string;
    category: 'perros'|'gatos';
    price: number;
}

export const PRODUCTS_CATALOG: ProductItem[] = [
 
  { id: 'p01', name: 'Pro Plan Adulto Razas Medianas 3kg', category: 'perros', price: 28.50 },
  { id: 'p02', name: 'Royal Canin Maxi Adult 15kg', category: 'perros', price: 89.00 },
  { id: 'p03', name: 'Hills Science Diet Puppy 2kg', category: 'perros', price: 24.00 },
  { id: 'p04', name: 'Pedigree Adulto Carne y Pollo 8kg', category: 'perros', price: 21.50 },
  { id: 'p05', name: 'Dog Chow Cachorros Minis 3kg', category: 'perros', price: 13.50 },
  { id: 'p06', name: 'Chunky Delidog Galletas 500g', category: 'perros', price: 4.80 },
  { id: 'p07', name: 'Lata Paté Pedigree Cordero 375g', category: 'perros', price: 2.75 },
  { id: 'p08', name: 'Sobre Pedigree Adulto Pollo 100g', category: 'perros', price: 1.25 },
  { id: 'p09', name: 'Dentalight Huesos Dentales Menta (x4)', category: 'perros', price: 6.20 },
  { id: 'p10', name: 'Hills Prescription Diet Gastro 1.5kg', category: 'perros', price: 32.00 },
  { id: 'p11', name: 'Brit Care Hypoallergenic Cordero 3kg', category: 'perros', price: 34.50 },
  { id: 'p12', name: 'Acana Wild Coast Pescado 2kg', category: 'perros', price: 36.00 },
  { id: 'p13', name: 'Orijen Original Whole Prey 2kg', category: 'perros', price: 42.00 },
  { id: 'p14', name: 'Premio Barkies Sticks Tocino 150g', category: 'perros', price: 3.90 },
  { id: 'p15', name: 'Lata Royal Canin Gastrointestinal 400g', category: 'perros', price: 5.50 },
  { id: 'p16', name: 'Chunky Cachorros Cordero 2kg', category: 'perros', price: 9.80 },
  { id: 'p17', name: 'Equilibrio Sensitive Razas Pequeñas 2.5kg', category: 'perros', price: 27.00 },
  { id: 'p18', name: 'Taste of the Wild High Prairie 2kg', category: 'perros', price: 29.50 },
  { id: 'p19', name: 'Nutra Nuggets Mantenimiento 15kg', category: 'perros', price: 48.00 },
  { id: 'p20', name: 'Sobre Hills Adulto Pollo en salsa 85g', category: 'perros', price: 1.95 },
  { id: 'p21', name: 'Biscuits Horneadas Vainilla Perros 200g', category: 'perros', price: 3.20 },
  { id: 'p22', name: 'Dentastix Cuidado Oral Diario x7', category: 'perros', price: 5.40 },

 
  { id: 'g01', name: 'Cat Chow Adulto Pescado 1.5kg', category: 'gatos', price: 8.90 },
  { id: 'g02', name: 'Pro Plan Cat Urinary Tract 1.5kg', category: 'gatos', price: 26.50 },
  { id: 'g03', name: 'Royal Canin Kitten Segunda Edad 2kg', category: 'gatos', price: 31.00 },
  { id: 'g04', name: 'Whiskas Pollo & Leche Gatitos 1kg', category: 'gatos', price: 6.50 },
  { id: 'g05', name: 'Inaba Churu Pollo Atún Tubos (x4)', category: 'gatos', price: 4.50 },
  { id: 'g06', name: 'Inaba Churu Salmón para Gato (x4)', category: 'gatos', price: 4.50 },
  { id: 'g07', name: 'Sobre Felix Paté Salmón 85g', category: 'gatos', price: 1.15 },
  { id: 'g08', name: 'Sobre Whiskas Trozos de Atún 85g', category: 'gatos', price: 1.10 },
  { id: 'g09', name: 'Lata Fancy Feast Mousse Pavo 85g', category: 'gatos', price: 2.10 },
  { id: 'g10', name: 'Hills Science Diet Indoor Gatos 1.6kg', category: 'gatos', price: 25.50 },
  { id: 'g11', name: 'Taste of the Wild Canyon River 2kg', category: 'gatos', price: 28.00 },
  { id: 'g12', name: 'Orijen Cat & Kitten Pollo Pescado 1.8kg', category: 'gatos', price: 39.00 },
  { id: 'g13', name: 'Acana Homestead Harvest Aves 1.8kg', category: 'gatos', price: 33.50 },
  { id: 'g14', name: 'Brit Care Cat Esterilizados 2kg', category: 'gatos', price: 29.00 },
  { id: 'g15', name: 'Lata Royal Canin Babycat Mousse 195g', category: 'gatos', price: 4.80 },
  { id: 'g16', name: 'GimCat Pasta Anti-Bolas de Pelo 50g', category: 'gatos', price: 7.90 },
  { id: 'g17', name: 'Temptations Treats Salmón Crujiente 85g', category: 'gatos', price: 3.25 },
  { id: 'g18', name: 'Cat Chow Delicias de Mar 3kg', category: 'gatos', price: 16.50 },
  { id: 'g19', name: 'NutraGold Finicky Adult Cat 3kg', category: 'gatos', price: 23.50 },
  { id: 'g20', name: 'Sobre Pro Plan Sterilized Pescado 85g', category: 'gatos', price: 2.30 },
  { id: 'g21', name: 'Felix Megamix Galletas Gato 150g', category: 'gatos', price: 3.10 },
  { id: 'g22', name: 'Lata Sheba Filetes en Salsa Pollo 80g', category: 'gatos', price: 2.60 }
];