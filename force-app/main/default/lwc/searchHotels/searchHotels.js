import { LightningElement, track } from "lwc";
import getSearchedHotels from "@salesforce/apex/accountController.getSearchedHotels";
export default class SearchHotels extends LightningElement {
  key;
  @track results;
  @track error;
  updateKey(event) {
    this.key = event.target.value;
  }

  handleSearch() {
    getSearchedHotels({ searchKey: this.key })
      .then((result) => {
        this.results = result;
        this.error = null;
      })
      .catch((error) => {
        this.error = error;
        this.results = null;
      });
  }
  cols = [
    { label: "Hotel name", fieldName: "Name", type: "text" },
    {
      label: "Hotel picture",
      type: "customImage",
      typeAttributes: {
        hotelImage: { fieldName: "Picture__c" }
      }
    }
  ];
}
