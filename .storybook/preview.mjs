import { createPreviewConfig } from '@merkur/tool-storybook';
import widgetProperties from '../src/widget.js';
import View from '../src/views/View.js';
import HeadlineSlot from '../src/slots/HeadlineSlot.js';

// Create preview configuration with Merkur widget support
const preview = {
    ...createPreviewConfig({
        widgetProperties,
    }),
    // Vanilla JS render function
    render: (args, context) => {
        const { loaded: { widget } } = context;
        if (!widget) {
            return document.createElement('div');
        }

        const container = document.createElement('div');
        const viewFunction = args.viewComponent === 'headline' ? HeadlineSlot : View;
        container.innerHTML = viewFunction(widget);
        
        return container;
    },
};

export default preview;
