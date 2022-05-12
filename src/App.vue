<template>
  <div>
    <label v-show="!appState.uploadedImage">
      画像を選択
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        @click="e => { e.target.value = '' }"
      />
    </label>
    <div>
      <img
        id="pixelitimg"
        v-show="!appState.isConvert"
        :src="appState.uploadedImage"
      />

      <canvas
        id="pixelitcanvas"
      ></canvas>

      <div v-show="appState.uploadedImage">
        <p>{{ appState.imgName }}</p>
        <button @click="convertToPixelArt">convert</button>
        <button @click="remove">close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import pixelit from '@/pixelit';

export default defineComponent({
  name: 'App',
  setup() {
    const appState = reactive({
      uploadedImage: "",
      imgName: "",
      isConvert: false
    });

    const onFileChange = e => {
      const files = e.target.files || e.dataTransfer.files;
      createImage(files[0]);
      appState.imgName = files[0].name;
    };

    const createImage = file => {
      const reader = new FileReader();
      reader.onload = e => {
        appState.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const remove = () => {
      // canvasの初期化(Vueで生DOMを触りたくない)(心からの叫び)
      const canvasDom = document.getElementById("pixelitcanvas");
      const ctx = canvasDom.getContext("2d");
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

      canvasDom.width = 0;
      canvasDom.height = 0;

      appState.uploadedImage = "";
      appState.isConvert = false;
    };

    const convertToPixelArt = () => {
      const px = new pixelit.pixelit({ scale: 18 });
      px.draw().pixelate().convertPalette();

      // ライブラリに生DOMをいじられるので修正
      const imgDom = document.getElementById("pixelitimg")
      imgDom.style = "";

      appState.isConvert = true;
    };

    return {
      appState,
      onFileChange,
      createImage,
      remove,
      convertToPixelArt
    }
  }
});
</script>
