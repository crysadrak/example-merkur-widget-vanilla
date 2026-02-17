import {
  createPreviewConfig,
  createVanillaRenderer,
} from '@merkur/tool-storybook';
import widgetProperties from '../src/widget.js';
import View from '../src/views/View.js';
import HeadlineSlot from '../src/slots/HeadlineSlot.js';
import Counter from '../src/components/Counter.js';
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
    render: renderer.update,
  }),
  render: renderer.render,
};

export default preview;
