import Counter from '../Counter';

export default {
  title: 'Counter',
  args: {
    // Every Merkur story must have defined props property
    widget: {
      props: {},
    },
  },
};

const Template = (args, { loaded: { widget } }) => {
  const container = document.createElement('div');
  container.innerHTML = Counter(widget);
  return container;
};

export const DefaultCounter = Template.bind({});

export const TenCounter = Template.bind({});
TenCounter.args = {
  widget: {
    props: {},
    // change default widget state from 0 to 10
    state: {
      counter: 10,
    },
  },
};
