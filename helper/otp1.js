class OTP {
  getOtp() {
    return Math.floor(Math.random() * 10000 + 1);
  }
}
module.exports = OTP;
