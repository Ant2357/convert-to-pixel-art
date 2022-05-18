<template>
  <div>
    <label v-show="!appState.imgs[0]">
      画像を選択
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        @click="e => { e.target.value = '' }"
      />

    </label>
    <label v-show="!appState.imgs[0]">
      画像を選択(フォルダ参照版)
      <input
        type="file"
        accept="image/*"
        webkitdirectory
        multiple
        @change="onFileChange($event, true)"
        @click="e => { e.target.value = '' }"
      />
    </label>

    <div v-for="img in appState.imgs" :key="img.id">
      <img
        class="pixelitimg"
        v-show="!appState.isConvert"
        :src="img.data"
      />

      <canvas
        class="pixelitcanvas"
      ></canvas>

      <p>{{ img.name }}</p>
    </div>

    <div v-show="appState.imgs[0]">
      <button @click="convertToPixelArt">convert</button>
      <button @click="remove">close</button>
    </div>

  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import pixelit from '@/pixelit';

class Img {
  constructor(data, name, id) {
    this.data = data;
    this.name = name;
    this.id = id;
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    // HTML上のClassName(canvas要素)
    const CANVAS_CLASS_NAME = "pixelitcanvas";
    // HTML上のClassName(img要素)
    const IMG_CLASS_NAME = "pixelitimg";

    const appState = reactive({
      imgs: [],
      isConvert: false
    });

    const onFileChange = (e, isMultiple = false) => {
      const files = e.target.files || e.dataTransfer.files;

      // 単独ファイルの変換
      if (!isMultiple) {
        createImage(files[0], files[0].name, 0);
        return;
      }

      // 複数ファイルの変換
      const arrFiles = Object.entries(files).map(v =>{
        const [,...res] = v;
        return res;
      });
      arrFiles.forEach((file, index) => {
        createImage(file[0], file[0].name, index);
      });
    };

    const createImage = (file, fileName, index) => {
      const reader = new FileReader();
      reader.onload = e => {
        appState.imgs[index] = new Img(e.target.result, fileName, index);
      };
      reader.readAsDataURL(file);
    };

    const remove = () => {
      // canvasの初期化(Vueで生DOMを触りたくない)(心からの叫び)
      const canvasDoms = document.querySelectorAll(`.${CANVAS_CLASS_NAME}`);
      canvasDoms.forEach(canvasDom => {
        const ctx = canvasDom.getContext("2d");
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        canvasDom.width = 0;
        canvasDom.height = 0;
      });

      appState.imgs = [];
      appState.isConvert = false;
    };

    const convertToPixelArt = () => {
      const canvasDoms = document.querySelectorAll(`.${CANVAS_CLASS_NAME}`);
      const imgDoms = document.querySelectorAll(`.${IMG_CLASS_NAME}`);

      imgDoms.forEach((imgDom, index) => {
        const px = new pixelit.pixelit({
          to: canvasDoms[index],
          from: imgDoms[index], 
          scale: 18
        });
        px.draw().pixelate().convertPalette();

        // ライブラリに生DOMをいじられるので修正
        imgDoms[index].style = "";
      })

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
