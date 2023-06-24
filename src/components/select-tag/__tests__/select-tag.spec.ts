import { mount } from "@vue/test-utils";
import SelectTag from '../select-tag.vue'

const optionsProps = [
  {
    label: '选项1',
    value: '选项1',
  },
  {
    label: '选项2',
    value: '选项2',
  },
  {
    label: '选项3',
    value: '选项3',
  },
]

const createSelectTag = () => {
  return mount(SelectTag as any, {
    props: { 
      options: optionsProps
     },
  });
}

describe('select-tag.vue', () => {
  
  test('show suggestion', () =>{
    const wrapper = createSelectTag()
    expect(wrapper.get('#suggestion-wrapper').isVisible()).toBe(true)
  })

  test('add single tag', async () => {
    const wrapper = createSelectTag()
    const option = wrapper.get('#suggestion-wrapper').find('li')
    await option.trigger('click')
    const tag = wrapper.find('.tag-item')
    expect(tag.text()).toBe(optionsProps[0].value)
  })

  test('add multi tags', async () => {
    const wrapper = createSelectTag()
    const options = wrapper.get('#suggestion-wrapper').findAll('li')  
    for (const option of options) {
      await option.trigger('click')
    }
    const tags = wrapper.findAll('.tag-item')
    expect(tags).toHaveLength(optionsProps.length)
  })

  test('add existed tag should fail', async () => {
    const wrapper = createSelectTag()
    const options = wrapper.get('#suggestion-wrapper').findAll('li')  
    const tagsLength = 2
    for (let index = 0; index < tagsLength; index++) {
      await options[index].trigger('click')
    }
    // add existed tag
    await options[1].trigger('click')
    const tags = wrapper.findAll('.tag-item')
    expect(tags).toHaveLength(tagsLength)
  })

  test('remove tag', async () => {
    const wrapper = createSelectTag()
    const option = wrapper.get('#suggestion-wrapper').find('li')
    await option.trigger('click')
    const close = wrapper.find('.icon-close')
    await close.trigger('click')
    const tags = wrapper.findAll('.tag-item')
    expect(tags).toHaveLength(0)
  })
})
