import { LightningElement, wire, track } from "lwc";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";
const ZOOM_LEVEL = 2;

export default class HotelsInGoogleMap extends LightningElement {
  @track mapMarkers = [];
  @track error;
  @track zoomLevel = ZOOM_LEVEL;
  @track mapVisible = false;
  listView = "visible";

  @wire(getAccounts)
  wiredAccounts({ error, data }) {
    if (data) {
      data.forEach((hotel) => {
        if (!hotel.BillingAddress) return;
        const marker = {
          location: {
            City: hotel.BillingAddress?.city,
            Country: hotel.BillingAddress?.country,
            PostalCode: hotel.BillingAddress?.postalCode,
            State: hotel.BillingAddress?.state,
            Street: hotel.BillingAddress?.street
          },
          title: hotel.Name,
          description: hotel.description ? hotel.description : "Hotel",
          icon: "standard:account"
        };
        const { location } = marker;
        if (location.Country || location.PostalCode)
          this.mapMarkers.push(marker);
      });
      this.mapVisible = true;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.mapMarkers = undefined;
    }
  }
}
