<template>
  <Row>
    <RecordingButton
      :onClick="toggleTest"
      :text="currentText"
    />
    <Modal
      v-model="testModalVisible"
      title="Is the audio OK?"
    >
      <span>Listen to the audio and confirm your microphone settings: <audio :src="testAudioUrl" controls></audio></span>
      <span slot="footer" class="dialog-footer">
        <Button type="warning" @click="testModalVisible = false">No, retry</Button>
        <Button type="success" @click="approveTest">Yes</Button>
      </span>
    </Modal>
  </Row>
</template>

<script>
import { Button, Modal, Row } from 'iview'
import RecordingButton from './RecordingButton'

export default {
  components: {
    Button, Modal, RecordingButton, Row
  },
  data () {
    return {
      currentText: 'Test before continuing',
      testAudioUrl: null,
      testModalVisible: false
    }
  },
  methods: {
    approveTest: function () {
      this.testModalVisible = false

      this.$store.commit('setTested', true)
    },
    toggleTest: function () {
      const mediaRecorder = this.$store.getters.getMediaRecorder

      if (!this.$store.getters.getIsRecording) {
        mediaRecorder.start()
      } else {
        mediaRecorder.stop()

        const self = this
        mediaRecorder.ondataavailable = function (e) {
          const blob = e.data

          self.testAudioUrl = window.URL.createObjectURL(blob)
          self.testModalVisible = true
        }
      }

      this.$store.commit('setIsRecording', !this.$store.getters.getIsRecording)
    }
  }
}
</script>
