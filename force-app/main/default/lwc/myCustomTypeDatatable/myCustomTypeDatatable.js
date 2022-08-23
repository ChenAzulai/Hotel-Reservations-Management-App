import LightningDatatable from "lightning/datatable";
import customImageTemplate from "./customImage.html";

export default class MyCustomTypeDatatable extends LightningDatatable {
  static customTypes = {
    customImage: {
      template: customImageTemplate,
      standardCellLayout: false,
      typeAttributes: ["hotelImage"]
    }
  };
}
