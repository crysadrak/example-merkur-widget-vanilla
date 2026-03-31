import widgetProperties from '@widget';

import { createMerkurWidget, createMerkur, isRegistered } from '@merkur/core';
import { mapViews } from '@merkur/plugin-component/helpers';

import { viewFactory } from '../views/View';

import '../style.css';

export function createWidget(widgetParams) {
  return createMerkurWidget({
    ...widgetProperties,
    ...widgetParams,
    $dependencies: {},
    bindEventListeners(widget, container) {
      const abortController = new AbortController();
      widget.$external.abortController = abortController;
      const { signal } = abortController;

      container
        .querySelector(`[data-merkur="on-increase"]`)
        ?.addEventListener('click', () => widget.onClick(), { signal });

      container
        .querySelector(`[data-merkur="on-reset"]`)
        ?.addEventListener('click', () => widget.onReset(), { signal });
    },
    async mount(widget) {
      mapViews(widget, viewFactory, ({ container, View }) => {
        if (!container) {
          return;
        }

        if (container.innerHTML.trim() === '' && View) {
          container.innerHTML = View(widget);
        }

        widget.bindEventListeners(container);
      });
    },
    async unmount(widget) {
      widget.$external.abortController?.abort();
      widget.$external.abortController = null;

      mapViews(widget, viewFactory, ({ container }) => {
        if (!container) {
          return;
        }

        container.innerHTML = '';
      });
    },
    async update(widget) {
      mapViews(widget, viewFactory, ({ container, View }) => {
        if (!container) {
          return;
        }

        container.innerHTML = View(widget);
        widget.bindEventListeners(container);
      });
    },
  });
}

if (!isRegistered(widgetProperties.name)) {
  createMerkur().register({
    ...widgetProperties,
    createWidget,
  });
}
