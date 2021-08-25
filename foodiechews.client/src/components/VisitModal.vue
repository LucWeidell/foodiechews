<template>
  <div class="modal fade"
       id="staticBackdrop"
       data-backdrop="static"
       data-keyboard="false"
       tabindex="-1"
       aria-labelledby="staticBackdropLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="submitVisit">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Modal title
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="review">Review</label>
              <input type="text"
                     class="form-control"
                     id="review"
                     aria-describedby="review"
                     placeholder="Tell us about your visit..."
                     v-model="state.newVisit.review"
              >
              <div class="input-group-checkbox">
                Favorite:
                <input type="checkbox"
                       aria-label="Favorite"
                       v-model="state.newVisit.favorite"
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      newVisit: {
        review: '',
        favorite: false
      }
    })

    return {
      state,
      submitVisit() {
        console.log('modal logs', state.newVisit)
        // eslint-disable-next-line no-undef
        $('#staticBackdrop').modal('hide')
        // eslint-disable-next-line no-undef
        $('body').removeClass('modal-open')
        // eslint-disable-next-line no-undef
        $('.modal-backdrop').remove()
      }
    }
  }
}
</script>
