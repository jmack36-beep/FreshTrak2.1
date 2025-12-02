export interface Shipment {
  id: string;
  loadNumber: string;
  poNumber: string;
  description: string;
  items: string[]; // New field for line items
  shipDate: string;
  dueDate: string;
  location: string;
  temperature: number; // Degrees Fahrenheit
  status: 'On Time' | 'Delayed' | 'Delivered' | 'Critical Temp';
  lat: number;
  lng: number;
  trackingUrl: string;
  memberId: string;
}

export interface FilterState {
  showOnTime: boolean;
  showDelayed: boolean;
  showDelivered: boolean;
  showCriticalTemp: boolean;
  tempRange: [number, number];
}

export interface InquiryRequest {
  shipmentId: string;
  loadNumber: string;
  message: string;
  priority: 'Normal' | 'Urgent';
}

export interface User {
  id: string;
  name: string;
  department: string;
}

// --- New Feature Types ---

export interface HotBuy {
  id: string;
  commodity: string;
  variety: string;
  price: number;
  unit: string;
  totalQty: number;
  remainingQty: number;
  postedBy: string;
  expiry: string;
  isSoldOut: boolean;
}

export interface Contract {
  id: string;
  commodity: string;
  supplier: string;
  buyer: string;
  startDate: string;
  endDate: string;
  priceTerm: string;
  status: 'Active' | 'Pending' | 'Expired';
}

export interface CalendarEvent {
  id: string;
  month: number; // 0-11
  title: string;
  description: string;
  category: 'Negotiation' | 'Program Start' | 'Harvest';
}

export interface MarketReport {
  id: string;
  title: string;
  date: string;
  summary: string;
  url: string;
  category: 'Weekly' | 'Special Alert';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'Executive' | 'Produce Buying' | 'Floral Buying' | 'Logistics' | 'Quality Control' | 'Accounting';
  email: string;
  phone: string;
  imageUrl?: string;
}

export interface OwnBrandItem {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  imageColor: string; // Placeholder for image aesthetics
  specs: {
    plu: string;
    caseDimensions: string;
    caseGrossWeight: string;
    caseNetWeight: string;
    caseCube: string;
    palletTiHi: string;
    ethanolSensitivity: 'Low' | 'Moderate' | 'High';
    ethanolProducer: boolean;
    idealTemp: string;
    idealHumidity: string;
    coo: string;
    seasonality: string;
  };
}