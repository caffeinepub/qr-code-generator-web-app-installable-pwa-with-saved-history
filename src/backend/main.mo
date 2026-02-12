import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type QRContentType = {
    #text;
    #url;
    #contactInfo;
    #phoneNumber;
    #email;
    #wifi;
    #geoLocation;
    #event;
    #sms;
  };

  public type QRCodeData = {
    content : Text;
    contentType : QRContentType;
    size : ?Nat;
    color : ?Text;
    backgroundColor : ?Text;
    createdAt : Time.Time;
    lastModified : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  let userQRCodeHistory = Map.empty<Principal, List.List<QRCodeData>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // QR code management
  public shared ({ caller }) func saveQRCode(qrData : QRCodeData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save QR codes");
    };

    let qrList = switch (userQRCodeHistory.get(caller)) {
      case (null) { List.empty<QRCodeData>() };
      case (?existingList) { existingList };
    };

    qrList.add(qrData);
    userQRCodeHistory.add(caller, qrList);
  };

  public query ({ caller }) func getUserQRCodeHistory() : async [QRCodeData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view QR code history");
    };

    switch (userQRCodeHistory.get(caller)) {
      case (null) { [] };
      case (?qrList) { qrList.toArray() };
    };
  };
};
