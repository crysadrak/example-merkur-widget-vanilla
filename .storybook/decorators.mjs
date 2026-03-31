import { useArgs } from 'storybook/preview-api';

export const decorators = [
  (StoryFn, { loaded: { widget }, args }) => {
    const [, updateArgs] = useArgs();

    if (widget && widget.$external) {
      // Store updateArgs and a live getter for args so the render callback can
      // sync widget state/props back to the Controls panel after interactions.
      widget.$external.storybook = { updateArgs, getArgs: () => args };
    }
    return StoryFn();
  },
];
