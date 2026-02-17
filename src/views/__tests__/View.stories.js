import View from '../View';

export default {
  title: 'Views/View',
  args: {
    widget: {
      props: {},
    },
    component: View,
  },
};

export const Default = {};

export const WithHighCounter = {
  args: {
    widget: {
      props: {},
      state: {
        counter: 100,
      },
    },
  },
};

export const WithError = {
  args: {
    widget: {
      props: {},
      error: {
        status: 500,
        message: 'Something went wrong',
        stack: 'Error: Something went wrong\n    at View (view.js:15:20)',
      },
    },
  },
};
