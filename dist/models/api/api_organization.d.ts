export default class ApiOrganization {
    constructor({ id, firebaseId, city, country, addressLine1, addressLine2, state, zip, contactEmail, contactFirstName, contactLastName, contactPhoneNumber, name, notes, firebaseProjectIds }: Partial<ApiOrganization>);
    readonly id: number;
    readonly firebaseId: string;
    city?: string | null;
    country?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    state?: string | null;
    zip?: string | null;
    contactEmail?: string | null;
    contactFirstName?: string | null;
    contactLastName?: string | null;
    contactPhoneNumber?: string | null;
    name?: string | null;
    notes?: string | null;
    firebaseProjectIds: Array<string>;
}
