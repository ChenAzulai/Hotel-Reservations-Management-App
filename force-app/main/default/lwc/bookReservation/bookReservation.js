/* eslint-disable no-unused-vars */
import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CONTACT from "@salesforce/schema/Room_Reservation__c.Contact__c";
import NUM_OF_ROOMS from "@salesforce/schema/Room_Reservation__c.Number_Of_Rooms__c";
import RESERVATION_DATE from "@salesforce/schema/Room_Reservation__c.Reservation_Date__c";
import ROOM_TYPE from "@salesforce/schema/Room_Reservation__c.Room_Type__c";

export default class BookReservation extends LightningElement {
  fields = [CONTACT, NUM_OF_ROOMS, RESERVATION_DATE, ROOM_TYPE];
  objectApiName = "Room_Reservation__c";

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Rooms has been created successfully!",
      message: "Room Created : " + event.detail.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);
  }

  //   handleSubmit(event) {
  //TODO
  //   }
}
