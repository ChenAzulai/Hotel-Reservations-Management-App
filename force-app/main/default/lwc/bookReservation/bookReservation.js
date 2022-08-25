/* eslint-disable no-unused-vars */
import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ROOM_RES_OBJECT from "@salesforce/schema/Room_Reservation__c";
import CONTACT from "@salesforce/schema/Room_Reservation__c.Contact__c";
import NUM_OF_ROOMS from "@salesforce/schema/Room_Reservation__c.Number_Of_Rooms__c";
import RESERVATION_DATE from "@salesforce/schema/Room_Reservation__c.Reservation_Date__c";
import ROOM_TYPE from "@salesforce/schema/Room_Reservation__c.Room_Type__c";
import getRoomReservations from "@salesforce/apex/ReservationController.getRoomReservations";
import getRoomDetails from "@salesforce/apex/ReservationController.getRoomDetails";

export default class BookReservation extends LightningElement {
  reservations = [];
  roomDetails = {};

  fields = [CONTACT, NUM_OF_ROOMS, RESERVATION_DATE, ROOM_TYPE]; //assume that room choosed by type and not by hotel
  objectApiName = ROOM_RES_OBJECT;

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
    // console.log("fields:", JSON.stringify(fields));
    const {
      Room_Type__c,
      Reservation_Date__c: newReservationDate,
      Contact__c: newReservationContact,
      Number_Of_Rooms__c: newReservationNOR
    } = fields;

    try {
      await this.fetchDetails({ roomId: Room_Type__c });

      let occupiedRooms = 0;

      this.reservations = this.reservations.forEach((res) => {
        if (res.Reservation_Date__c === newReservationDate) {
          //check for reservation for the same date
          occupiedRooms += res.Number_Of_Rooms__c;
          if (res.Contact__c === newReservationContact) {
            throw new Error("Contact can't book two rooms on the same date!"); //for each hotel
          }
        }
      });

      // const occupiedRooms = this.reservations[0]?.Number_Of_Rooms__c ?? 0;

      const roomLeft =
        this.roomDetails[0].Number_Of_Available_Rooms__c - occupiedRooms >
        newReservationNOR;

      if (!roomLeft) {
        throw new Error("No rooms left!");
      } else {
        this.template.querySelector("lightning-record-form").submit(fields);
      }
    } catch (error) {
      this.handleError(error.message);
    }
  }
}
