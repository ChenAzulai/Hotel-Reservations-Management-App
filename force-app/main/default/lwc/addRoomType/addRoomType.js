import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import NUM_OF_ROOMS from "@salesforce/schema/Room_Type__c.Number_Of_Available_Rooms__c";
import ROOM_TYPE from "@salesforce/schema/Room_Type__c.Name";
import HOTEL from "@salesforce/schema/Room_Type__c.Hotel__c";

export default class AddRoomType extends LightningElement {
  fields = [ROOM_TYPE, NUM_OF_ROOMS, HOTEL];
  objectApiName = "Room_Type__c";

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Rooms has been created successfully!",
      message: "Room Created : " + event.detail.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);
  }
}
