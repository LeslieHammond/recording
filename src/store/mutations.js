export const mutations = {
  setAllowsRecording: (state, boolean) => {
    state.allowsRecording = boolean
  },
  addChunk: (state, chunk) => {
    state.chunks.push(chunk)
  },
  setMediaRecorder: (state, mediaRecorder) => {
    state.mediaRecorder = mediaRecorder
  },
  setSupportsRecording: (state, boolean) => {
    state.supportsRecording = boolean
  }
}
