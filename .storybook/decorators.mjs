export const decorators = [
  (StoryFn, { loaded: { widget }, args, updateArgs }) => {
    if (widget && widget.$in) {
      // Store updateArgs and a live getter for args so the render callback can
      // sync widget state/props back to the Controls panel after interactions.
      widget.$in._storybookSync = { updateArgs, getArgs: () => args };
    }
    return StoryFn();
  },
];
