import addReadOnlyPropertiesToModel from "../../services/utilities/mixins/add_read_only_properties_to_model";

export default class ApiOrganization {
  constructor({
    id,
    firebaseId,
    city,
    country,
    addressLine1,
    addressLine2,
    state,
    zip,
    contactEmail,
    contactFirstName,
    contactLastName,
    contactPhoneNumber,
    name,
    notes,
    firebaseProjectIds
  }: Partial<ApiOrganization>) {
    addReadOnlyPropertiesToModel(this, { id, firebaseId });
    this.city = city;
    this.country = country;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.state = state;
    this.zip = zip;
    this.contactEmail = contactEmail;
    this.contactFirstName = contactFirstName;
    this.contactLastName = contactLastName;
    this.contactPhoneNumber = contactPhoneNumber;
    this.name = name;
    this.notes = notes;
    this.firebaseProjectIds = firebaseProjectIds || [];
  }

  readonly id: number;
  readonly firebaseId: string;
  city?: string | null = null;
  country?: string | null = null;
  addressLine1?: string | null = null;
  addressLine2?: string | null = null;
  state?: string | null = null;
  zip?: string | null = null;
  contactEmail?: string | null = null;
  contactFirstName?: string | null = null;
  contactLastName?: string | null = null;
  contactPhoneNumber?: string | null = null;
  name?: string | null = null;
  notes?: string | null = null;
  firebaseProjectIds: Array<string> = [];
}
