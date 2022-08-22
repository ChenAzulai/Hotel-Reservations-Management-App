import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";
const ZOOM_LEVEL = 10;

export default class HotelsInGoogleMap extends LightningElement {
  appMarkers = [];
  error;
  zoomLevel = ZOOM_LEVEL;
  listView = "visible";

  @wire(getAccounts)
  wiredAccounts({ error, data }) {
    if (data) {
      this.appMarkers = data;
      console.log("data:", data);
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.appMarkers = undefined;
    }
  }
}
