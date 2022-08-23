public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return [SELECT Name, BillingAddress FROM Account];
  }

  @AuraEnabled(cacheable=true)
  public static List<Account> getSearchedHotels(string searchKey) {
    return [
      SELECT Name, BillingAddress, Picture__c
      FROM Account
      WHERE Name LIKE :'%' + searchKey + '%'
    ];
  }
}
