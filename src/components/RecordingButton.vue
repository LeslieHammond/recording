<template>
  <Card>
    <div>
      <span class="fa-layers" :class="{ isRecording: isRecording }" @click="onClick">
        <FontAwesome icon="circle" transform="grow-16" class="outer background-primary" />
        <FontAwesome icon="circle" transform="grow-14" class="inner" />
        <FontAwesome icon="circle" transform="grow-10" class="outer background-primary" />
        <FontAwesome icon="microphone" transform="grow-2" class="inner" />
      </span>
      <p>{{ text }}</p>
    </div>
  </Card>
</template>

<script>
import { Card } from 'iview'

import FontAwesome from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-free-solid'

export default {
  components: {
    Card, FontAwesome
  },
  computed: {
    isRecording: function () {
      return this.$store.getters.getIsRecording
    }
  },
  props: ['onClick', 'text']
}
</script>

<style lang="scss" scoped="true">
p {
  margin-top: 8px;
}
.fa-layers {
  .inner {
    color: #fff;
  }

  .outer {
    color: rgb(45, 140, 240);
  }
}
.fa-layers.isRecording {
  .inner {
    color: #fff;
  }

  .outer {
    color: crimson;
  }
}
</style>
