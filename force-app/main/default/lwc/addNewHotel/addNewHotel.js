import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import BILLING_ADDRESS_FIELD from "@salesforce/schema/Account.BillingAddress";
import PICTURE from "@salesforce/schema/Account.Picture__c";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class AddNewHotel extends LightningElement {
  fields = [NAME_FIELD, BILLING_ADDRESS_FIELD, PICTURE];
  objectApiName = ACCOUNT_OBJECT;
  recordTypeId = "Hotel";

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Hotel has been created successfully!",
      message: "Hotel Created : " + event.detail.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);
  }
}
