const liveStatus = false;
const apiUrl = liveStatus ? 'http://54.66.124.94/' : 'http://54.66.124.94/';

export default {
  live: liveStatus,
  baseURL: apiUrl,

  OTP: apiUrl + 'user/sendUserOTP',
  Enterotp: apiUrl + 'user/verifyUserOtp',
  addFavouriteLocation: apiUrl + 'user/addFavouriteLocation',
  addEmergencyContact: apiUrl + 'user/addEmergencyContact',
  calculateOrderCharges: apiUrl + 'user/calculateOrderCharges',
  getNearByDriverList: apiUrl + 'user/getNearByDriverList',
  getNearByDriverList: apiUrl + 'user/getNearByDriverList',
};
