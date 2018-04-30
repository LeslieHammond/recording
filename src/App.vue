<template>
  <div id="app">
    <h1>Recording</h1>
    <Row v-if="!supportsRecording">
      <p>Your browser does not support the recording feature.</p>
    </Row>
    <Row v-else>
      <Row v-if="allowsRecording == null">
        <Button type="primary" @click="askToAllowRecording()">Allow microphone capture</Button>
      </Row>
      <Row v-else-if="!allowsRecording">
        <p>You have denied microphone recording</p>
      </Row>
      <Row v-else>
        <Button icon="el-icon-service" @click="startRecording" circle></Button>
        <Button icon="el-icon-delete" @click="stopRecording" circle type="danger"></Button>
        <p>Success!</p>
      </Row>
    </Row>
  </div>
</template>

<script>
import { Button, Row } from 'element-ui'

export default {
  components: {
    Button, Row
  },
  computed: {
    allowsRecording: function () {
      return this.$store.getters.getAllowsRecording
    },
    supportsRecording: function () {
      return this.$store.getters.getSupportsRecording
    }
  },
  methods: {
    checkIfSupportsRecording: function () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.$store.commit('setSupportsRecording', true)
      } else {
        this.$store.commit('setSupportsRecording', false)
      }
    },
    askToAllowRecording: function () {
      const self = this
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(function (stream) {
          self.$store.commit('setAllowsRecording', true)
          self.$store.commit('setMediaRecorder', new MediaRecorder(stream))
        })
        .catch(function (e) {
          self.$store.commit('setAllowsRecording', false)
        })
    },
    startRecording: function () {
      const mediaRecorder = this.$store.getters.getMediaRecorder

      mediaRecorder.start()
    },
    stopRecording: function () {
      const mediaRecorder = this.$store.getters.getMediaRecorder

      mediaRecorder.stop()

      mediaRecorder.ondataavailable = function (e) {
        // self.$store.commit('addChunk', e.data)
        console.log('oda', e.data)
      }
    }
  },
  created () {
    this.checkIfSupportsRecording()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
