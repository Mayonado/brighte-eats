export const enum SERVICE_TYPE {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
  PAYMENT = "PAYMENT",
}

export interface Lead {
  service_type: SERVICE_TYPE;
  totalNoOfInterests: string;
}

export interface Error {
  title: string;
  message: string;
  isError: boolean;
}
