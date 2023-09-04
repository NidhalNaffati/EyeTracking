<template>
  <div class="pt-5">
    <!-- start & stop tracking button -->
    <div class="row mb-5">
      <div class="col text-center" v-if="isTracking">
        <button
          @click="toggleTracking"
          class="btn btn-warning shadow"
          data-bs-target="#modal-1"
          data-bs-toggle="modal"
        >
          STOP RECORDING
        </button>
      </div>
      <div class="col text-center" v-else>
        <button @click="toggleTracking" class="btn btn-primary shadow">
          START RECORDING
        </button>
      </div>
    </div>
    <!-- start & stop tracking button -->

    <!-- Gaze Info -->
    <canvas id="output" style="position: fixed"></canvas>
    <p id="gazeInfo" style="text-align: center; z-index: -1"></p>
    <!-- Gaze Info-->

    <!-- start paragraph-->
    <div class="row mb-2">
      <div class="col">
        <div id="mainText" class="mx-5">
          <p id="paragraph" class="text-start ps-lg-5 ms-5">
            When you are reading this paragraph you are using your eyes to scan
            the text. Your eyes are moving
          </p>
        </div>
      </div>
    </div>
    <!-- end paragraph-->

    <!--Start Chart Modal-->
    <div class="modal fade" role="dialog" tabindex="-1" id="modal-1">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">recorded eyes movements</h5>
          </div>
          <div class="modal-body" id="modal-body">
            <div class="row d-flex justify-content-center">
              <div class="col-md-4 col-xl-10">
                <canvas id="GazeChart"></canvas>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="deleteChart"
              class="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Chart Modal-->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { drawChart, deleteChart } from "@/utils/ChartDrawer";
import { showGaze } from "@/utils/ShowGaze";
import { initSDK, startTracking, stopTracking } from "@/utils/SessoSDK";

// flag to check if tracking is on or off
const isTracking = ref(false);
// Array to store gaze data such as x, y, timestamp, etc.
const gazeData = ref([]);

// taggle function to start and stop tracking
function toggleTracking() {
  isTracking.value = !isTracking.value;
  if (isTracking.value) {
    gazeData.value = []; // Clear the gaze data array
    startTracking(onGaze);
  } else {
    stopTracking();
    console.log(gazeData.value);
    drawChart(gazeData.value);
  }
}

// gaze callback.
function onGaze(gazeInfo) {
  showGaze(gazeInfo);
  gazeData.value.push(gazeInfo); // Add new gaze data to the array
}

// Initialize SeeSo SDK on component mount
onMounted(() => {
  initSDK();
});
</script>

<style scoped>
#mainText {
  background-color: #fff;
  background-image: linear-gradient(
      90deg,
      transparent 79px,
      #abced4 79px,
      #abced4 81px,
      transparent 81px
    ),
    linear-gradient(rgb(153, 187, 238) 0.1em, transparent 0.1em);
  background-size: 100% 2em;
  padding: 10px;
}

#paragraph {
  color: black;
  font-size: 16pt;
  margin-left: 5%;
  line-height: 1.5em;
}

.modal-header {
  background-color: #00b4c9;
  color: #fff;
  justify-content: center;
}
</style>
