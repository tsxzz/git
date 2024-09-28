/* * @Author: 大剑师兰特（xiaozhuanlan），还是大剑师兰特（CSDN） *
@此源代码版权归大剑师兰特所有，可供学习或商业项目中借鉴，未经授权，不得重复地发表到博客、论坛，问答，git等公共空间或网站中。
* @Email: 2909222303@qq.com * @First published in xiaozhuanlan.com * @Second
published in CSDN * @First published time: 2023-03-18 */
<template>
  <div class="container">
    <h3>vue+cesium: 显示比例尺</h3>
    <p>大剑师兰特, 还是大剑师兰特</p>
    <div id="vue-cesium"></div>
    <div class="scale-container">
      <div class="scale-label">{{ distanceLabel || "超出范围" }}</div>
      <div
        v-if="barWidth"
        class="scale-bar"
        :style="{ width: barWidth + 'px' }"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      viewer: null,
      distanceLabel: undefined,
      barWidth: undefined,
    };
  },

  methods: {
    cesiumScale() {
      var geodesic = new Cesium.EllipsoidGeodesic();
      var distances = [
        1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000,
        10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000,
        2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000,
      ];
      // Find the distance between two pixels at the bottom center of the screen.
      let scene = this.viewer.scene;
      let width = scene.canvas.clientWidth;
      let height = scene.canvas.clientHeight;
      let left = scene.camera.getPickRay(
        new Cesium.Cartesian2((width / 2) | 0, height - 1)
      );
      let right = scene.camera.getPickRay(
        new Cesium.Cartesian2((1 + width / 2) | 0, height - 1)
      );
      let globe = scene.globe;
      let leftPosition = globe.pick(left, scene);
      let rightPosition = globe.pick(right, scene);
      if (!Cesium.defined(leftPosition) || !Cesium.defined(rightPosition)) {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
        return;
      }
      let leftCartographic =
        globe.ellipsoid.cartesianToCartographic(leftPosition);
      let rightCartographic =
        globe.ellipsoid.cartesianToCartographic(rightPosition);
      geodesic.setEndPoints(leftCartographic, rightCartographic);
      let pixelDistance = geodesic.surfaceDistance;
      let maxBarWidth = 100;
      let distance;
      for (
        let i = distances.length - 1;
        !Cesium.defined(distance) && i >= 0;
        --i
      ) {
        if (distances[i] / pixelDistance < maxBarWidth) {
          distance = distances[i];
        }
      }
      if (Cesium.defined(distance)) {
        var label =
          distance >= 1000
            ? (distance / 1000).toString() + " km"
            : distance.toString() + " m";
        this.barWidth = (distance / pixelDistance) | 0;
        this.distanceLabel = label;
      } else {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
      }
    },
  },
  mounted() {
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      90,
      -20,
      110,
      90
    );
    this.viewer = new Cesium.Viewer("vue-cesium", {
      vrButton: false,
      geocoder: false,
      homeButton: false,
      selectionIndicator: false,
      animation: false,
      timeline: false,
      navigationHelpButton: false,
      useDefaultRenderLoop: true,
      showRenderLoopErrors: true,
      fullscreenButton: false,
      infoBox: false,
    });
    let that = this;
    this.viewer.scene.postRender.addEventListener(function () {
      that.cesiumScale();
    });
  },
};
</script>
<style scoped>
.container {
  width: 1000px;
  height: 640px;
  margin: 50px auto;
  border: 2px solid rgb(219, 218, 111);
  position: relative;
}
#vue-cesium {
  width: 960px;
  height: 530px;
  margin: 0 auto;
  border: 1px solid #42b983;
  position: relative;
}
.scale-container {
  position: absolute;
  z-index: 1001;
  left: 30px;
  bottom: 80px;
  width: 120px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.scale-label {
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.scale-bar {
  position: relative;
  padding-top: 10px;
}
.scale-bar::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  border: 1px solid #fff;
  border-top: none;
  left: 0;
  bottom: 0;
}
</style>
