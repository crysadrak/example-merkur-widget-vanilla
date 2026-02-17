import ErrorView from '../ErrorView';

export default {
  title: 'Views/ErrorView',
  args: {
    widget: {
      props: {},
    },
    component: ErrorView,
  },
};

export const NotFound = {
  args: {
    widget: {
      props: {},
      error: {
        status: 404,
        message: 'Not Found',
        stack: 'Error: Not Found\n    at someFunction (file.js:10:15)',
      },
    },
  },
};

export const ServerError = {
  args: {
    widget: {
      props: {},
      error: {
        status: 500,
        message: 'Internal Server Error',
        stack: 'Error: Internal Server Error\n    at handler (server.js:42:10)',
      },
    },
  },
};

export const BadRequest = {
  args: {
    widget: {
      props: {},
      error: {
        status: 400,
        message: 'Bad Request',
        stack: 'Error: Bad Request\n    at validateInput (validator.js:5:8)',
      },
    },
  },
};
