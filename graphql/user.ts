import { gql } from "graphql-request";

import { SERVICE_TYPE } from "@/app/types/types";

export interface User {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  service_type: SERVICE_TYPE;
}

export const UserMutationDocument = gql`
  mutation UserMutation(
    $name: String!
    $email: String!
    $mobile: String!
    $postcode: String!
    $service_type: SERVICE_TYPE
  ) {
    register(
      name: $name
      email: $email
      mobile: $mobile
      postcode: $postcode
      service_type: $service_type
    ) {
      id
      name
      email
      postcode
      service_type
    }
  }
`;

export const LeadQueryDocument = gql`
  query LeadQuery {
    lead {
      service_type
      totalNoOfInterests
    }
  }
`;

export const LeadsQueryDocument = gql`
  query LeadsQuery {
    leads {
      service_type
      totalNoOfInterests
    }
  }
`;
