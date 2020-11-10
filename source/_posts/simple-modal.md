---
title: 【Vue.js】モーダルコンポーネントのサンプル
tags:
  - Vue
date: 2020-11-10
---

![](/images/ムーミン1.jpg)

Vue.js のモーダルコンポーネントのサンプルです。

### モーダルコンポーネント

MyModal.vue

```html
<template>
  <transition name="b2t">
    <div class="modal-wrapper" @click.self.stop="$emit('hide')" v-if="isOpened">
      <div id="modal" class="modal-container">
        <div class="hide" @click="$emit('hide')">
          <i class="far fa-times"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      isOpened: false,
    },
  }
</script>

<style scoped="" lang="scss">
  .modal {
    &-wrapper {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10000;
    }
    &-container {
      position: fixed;
      top: 20vh;
      left: 10vw;
      width: 80vw;
      background-color: white;
      border-radius: 15px 15px 0px 0px;
      padding: 15px;
      padding-top: 5vh;
      overflow: auto;
    }
  }

  .hide {
    position: absolute;
    top: 0;
    right: 2vw;
    font-size: 2.5rem;
  }

  .b2t-enter-active,
  .b2t-leave-active {
    transition: opacity 300ms;
  }
  .b2t-enter-active > .modal-container,
  .b2t-leave-active > .modal-container {
    transition: all 300ms;
  }
  .b2t-enter > .modal-container {
    transform: translateX(100vw);
  }
  .b2t-leave-to > .modal-container {
    transform: translateX(100vw);
  }
</style>
```

### モーダルコンポーネントを呼び出すコンポーネント

```html
<template>
  <MyModal
    :isOpened="isOpenModal"
    @hide="isOpenModal = false"
  />
</template>

<script>
import MyModal from '@/components/MyModal.vue';

export default {
  components: {
    MyModal,
  },
  data() {
    return {
      isOpenModal: false,
    };
  },
}
```
