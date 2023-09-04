import EasySeeSo from "seeso/easy-seeso";

// SeeSo SDK instance
let seeSo = null;

// License key for the SDK
const licenseKey = "dev_pg69f3fpf1m2iduw8hlccugxw75x79ts1iqvmzui";

// default size for a laptop screen
let monitorSizeByInch = 16;
let faceDistanceByCm = 50;
let isCameraOnTop = true;

// initialize the SDK
export function initSDK() {
  // Create a new instance of the SDK
  seeSo = new EasySeeSo();

  // Initialize the SDK with the license key & calibration values
  seeSo.init(
    licenseKey,
    () => {
      // Set the default values for the SDK
      seeSo.setMonitorSize(monitorSizeByInch);
      seeSo.setFaceDistance(faceDistanceByCm);
      seeSo.setCameraPosition(window.outerWidth / 2, isCameraOnTop);
      console.log("SDK init success!");
    },
    () => {
      console.log("SDK init failed!");
    }
  );
}

// Calibrate the SDK by passing the monitor size, face distance and camera position values
export function calibrateSDK(
  newMonitorSize,
  newFaceDistance,
  newCameraPosition
) {
  monitorSizeByInch = newMonitorSize;
  faceDistanceByCm = newFaceDistance;
  isCameraOnTop = newCameraPosition;
}

// Start tracking the gaze
export function startTracking(onGaze) {
  console.log("start tracking...");
  seeSo.startTracking(onGaze);
}

// Stop tracking and draw the chart
export function stopTracking() {
  console.log("tracking stopped!");
  seeSo.stopTracking();
}
