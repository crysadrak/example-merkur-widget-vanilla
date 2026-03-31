import {
  createPreviewConfig,
  createVanillaRenderer,
} from '@merkur/tool-storybook';
import widgetProperties from '../src/widget.js';
import { createWidget } from '../src/entries/client.js';
import { decorators } from './decorators.mjs';
import '../src/style.css';

const { render, update } = createVanillaRenderer();

const preview = {
  ...createPreviewConfig({
    widgetProperties,
    createWidget,
    render(widget) {
      update(widget);
      // Sync widget state/props back to Storybook args so the Controls panel
      // stays up to date after widget-internal interactions (e.g. button clicks).
      const storybook = widget?.$external?.storybook;
      if (storybook) {
        const { updateArgs, getArgs } = storybook;
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
  render,
  decorators,
};

export default preview;
