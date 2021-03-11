import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import MainAddressBook from '@/components/MainAddressBook.vue'

describe('MainAddressBook.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MainAddressBook, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
