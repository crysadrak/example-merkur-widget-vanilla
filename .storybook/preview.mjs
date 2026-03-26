import {
  createPreviewConfig,
  createVanillaRenderer,
} from '@merkur/tool-storybook';
import widgetProperties from '../src/widget.js';
import View from '../src/views/View.js';
import HeadlineSlot from '../src/slots/HeadlineSlot.js';
import Counter from '../src/components/Counter.js';
import { decorators } from './decorators.mjs';
import '../src/style.css';

function bindEvents(container, widget) {
  container
    .querySelector(`[data-merkur="on-increase"]`)
    ?.addEventListener('click', () => widget.onClick(widget));

  container
    .querySelector(`[data-merkur="on-reset"]`)
    ?.addEventListener('click', () => widget.onReset(widget));
}

const renderer = createVanillaRenderer({
  ViewComponent: {
    default: View,
    headline: HeadlineSlot,
    Counter,
  },
  bindEvents,
});

const preview = {
  ...createPreviewConfig({
    widgetProperties,
    render(widget) {
      renderer.update(widget);
      // Sync widget state/props back to Storybook args so the Controls panel
      // stays up to date after widget-internal interactions (e.g. button clicks).
      const sync = widget?.$in?._storybookSync;
      if (sync) {
        const { updateArgs, getArgs } = sync;
        const currentArgs = getArgs();
        updateArgs({
          widget: {
            ...currentArgs.widget,
            state: widget.state,
            props: widget.props,
          },
        });
      }
    },
  }),
  render: renderer.render,
  decorators,
};

export default preview;
