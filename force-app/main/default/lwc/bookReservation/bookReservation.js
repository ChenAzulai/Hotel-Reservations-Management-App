/* eslint-disable no-unused-vars */
import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CONTACT from "@salesforce/schema/Room_Reservation__c.Contact__c";
import NUM_OF_ROOMS from "@salesforce/schema/Room_Reservation__c.Number_Of_Rooms__c";
import RESERVATION_DATE from "@salesforce/schema/Room_Reservation__c.Reservation_Date__c";
import ROOM_TYPE from "@salesforce/schema/Room_Reservation__c.Room_Type__c";
import getRoomReservations from "@salesforce/apex/ReservationController.getRoomReservations";
import getRoomDetails from "@salesforce/apex/ReservationController.getRoomDetails";

export default class BookReservation extends LightningElement {
  reservations = [];
  roomDetails = {};
  fields = [CONTACT, NUM_OF_ROOMS, RESERVATION_DATE, ROOM_TYPE];
  objectApiName = "Room_Reservation__c";

  handleSuccess() {
    const toastEvent = new ShowToastEvent({
      title: "Rooms has been reserved successfully!",
      message: "Room Reserved",
      variant: "success"
    });
    this.dispatchEvent(toastEvent);
  }

  handleError(message) {
    const toastEvent = new ShowToastEvent({
      title: "Reservation Failed!",
      message: message,
      variant: "error"
    });
    this.dispatchEvent(toastEvent);
  }

  async fetchDetails(roomId) {
    this.roomDetails = await getRoomDetails(roomId);
    this.reservations = await getRoomReservations(roomId);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { fields } = event.detail;
    const { Room_Type__c, Reservation_Date__c: newReservationDate } = fields;
    console.log("fields:", JSON.stringify(fields));
    const roomId = { roomId: Room_Type__c };

    await this.fetchDetails(roomId);

    this.reservations = this.reservations.filter((res) => {
      return res.Reservation_Date__c === newReservationDate;
    });

    const ocupiedRooms = this.reservations[0]?.Number_Of_Rooms__c ?? 0;

    const roomLeft =
      this.roomDetails[0].Number_Of_Available_Rooms__c - ocupiedRooms;

    if (!roomLeft) {
      this.handleSuccess();
    } else {
      this.handleError("No rooms available!");
    }
  }
}
