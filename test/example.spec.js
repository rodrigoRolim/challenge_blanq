import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('Counter.vue', () => {
    it('increments count when button is clicked', () => {
      const wrapper = shallowMount(App)
      expect(wrapper.teste()).to.be('boo')
    })
  })