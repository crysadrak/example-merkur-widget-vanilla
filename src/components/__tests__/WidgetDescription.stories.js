import WidgetDescription from '../WidgetDescription';

export default {
  title: 'Components/WidgetDescription',
  args: {
    widget: {
      props: {},
    },
    component: WidgetDescription,
  },
};

export const Default = {};

export const CustomWidget = {
  render: (args, { loaded: { widget } }) => {
    const container = document.createElement('div');
    container.innerHTML = WidgetDescription({
      ...widget,
      name: args.name,
      version: args.version,
    });
    return container;
  },
  args: {
    name: 'my-custom-widget',
    version: '2.0.0',
  },
};
