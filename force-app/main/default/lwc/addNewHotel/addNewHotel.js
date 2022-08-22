import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import BILLING_ADDRESS_FIELD from "@salesforce/schema/Account.BillingAddress";
import PICTURE from "@salesforce/schema/Account.Picture__c";

export default class AddNewHotel extends LightningElement {
  fields = [NAME_FIELD, BILLING_ADDRESS_FIELD, PICTURE];
  objectApiName = "Account";
  @track
  hotelRecord = {};

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Hotel has been created successfully!",
      message: "Hotel Created : " + event.details.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);
  }
}
