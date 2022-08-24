public with sharing class ReservationController {
  @AuraEnabled(cacheable=true)
  public static List<Room_Reservation__c> getRoomReservations(string roomId) {
    // List<Room_Reservation__c> result = new List<Room_Reservation__c>();
    return [
      SELECT
        Name,
        Room_Type__c,
        Contact__c,
        Number_Of_Rooms__c,
        Reservation_Date__c
      FROM Room_Reservation__c
      WHERE Room_Type__c = :roomId
    ];
    // return result;
  }

  @AuraEnabled(cacheable=true)
  public static List<Room_Type__c> getRoomDetails(string roomId) {
    // List<Room_Type__c> result = new List<Room_Type__c>();
    return [
      SELECT Id, Number_Of_Available_Rooms__c
      FROM Room_Type__c
      WHERE Id = :roomId
    ];
    // return result[0].Number_Of_Available_Rooms__c;
  }
}
