const { mount } = require('@vue/test-utils');
const Home = require('@/components/Home.vue');

describe('Home', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Home);
    expect(wrapper.vm).toBeTruthy();
  });
});
