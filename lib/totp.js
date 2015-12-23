// Copyright 2014-2015 the project authors as listed in the AUTHORS file.
// All rights reserved. Use of this source code is governed by the
// license that can be found in the LICENSE file.

function addPadding(value, length) {
    return (length <= value.length) ? value :  Array(length + 1 - value.length).join('0') + value;
}


function getOtp(secret) {
  // timekeeping, the otp is based on the number of intervals
  // since the epoch
  var intervalPeriod = 30
  var curTime = Math.round((new Date().getTime()) / 1000)
  var validTime = intervalPeriod - curTime % intervalPeriod 
  var elapsedIntervals = Math.floor(Math.round(curTime) / intervalPeriod);
  var elapsedIntervalsHex = addPadding(elapsedIntervals.toString(16), 16)

  // generate the otp which is the hmac of the number of
  // intervals since the epoch using th secret as the key 
  var jsSHAObj = new jsSHA('SHA-1', 'HEX')
  jsSHAObj.setHMACKey(base32tohex(secret), 'HEX')
  jsSHAObj.update(elapsedIntervalsHex)
  var rawToken = jsSHAObj.getHMAC('HEX')
  var offset = parseInt(rawToken.slice(rawToken.length - 1), 16)
  var otp = (parseInt(rawToken.substr(offset * 2, 8), 16) & 0x7FFFFFFF) + ''
  return {otp: (otp).slice(otp.length - 6), validTime: validTime}
}

