import HeadlineSlot from '../HeadlineSlot';

export default {
  title: 'Slots/HeadlineSlot',
  args: {
    widget: {
      props: {},
    },
    component: HeadlineSlot,
  },
};

export const Default = {};

export const WithHighCounter = {
  args: {
    widget: {
      props: {},
      state: {
        counter: 42,
      },
    },
  },
};
