import Counter from '../Counter';

export default {
  title: 'Components/Counter',
  args: {
    // Every Merkur story must have defined props property
    widget: {
      props: {},
    },
    component: Counter,
  },
};

export const DefaultCounter = {};

export const TenCounter = {
  args: {
    widget: {
      props: {},
      // change default widget state from 0 to 10
      state: {
        counter: 10,
      },
    },
  },
};
