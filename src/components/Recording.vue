<template>
  <Row>
    <RecordingButton
      :onClick="toggleRecording"
      :text="currentText"
    />
    <RecordingsList />
    <Row class="backToTutorial">
      <Col span="4">
        <Button icon="chevron-left" @click="backToTutorial" type="ghost" long>
          <em>Back to the tutorial</em>
        </Button>
      </Col>
    </Row>
  </Row>
</template>

<script>
import { Button, Col, Row } from 'iview'
import RecordingsList from './RecordingsList'
import RecordingButton from './RecordingButton'

export default {
  components: {
    Button, Col, RecordingButton, RecordingsList, Row
  },
  created () {
    this.shiftCurrentText()
  },
  data () {
    return {
      currentText: '',
      texts: [
        'Buenos días',
        'Me llamo Eduardo',
        '¿Cómo estás?'
      ]
    }
  },
  methods: {
    backToTutorial: function () {
      this.$store.commit('setTested', false)
    },
    shiftCurrentText: function () {
      this.currentText = this.texts.shift()
    },
    toggleRecording: function () {
      const mediaRecorder = this.$store.getters.getMediaRecorder

      if (!this.$store.getters.getIsRecording) {
        mediaRecorder.start()
      } else {
        mediaRecorder.stop()

        const self = this
        mediaRecorder.ondataavailable = function (e) {
          const blob = e.data

          const audioUrl = window.URL.createObjectURL(blob)
          self.$store.commit('addRecording', {src: audioUrl, text: self.currentText})

          self.shiftCurrentText()
        }
      }

      this.$store.commit('setIsRecording', !this.$store.getters.getIsRecording)
    }
  }
}
</script>

<style scoped="true">
  .backToTutorial {
    margin-top: 4px;
  }
</style>
