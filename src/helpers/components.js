export default {
  getWidgetComponent(type) {
    type = type.replace(/^\w/, c => c.toUpperCase());
    return type === 'Widget' ? 'GenericWidget' : type.replace(' ', '');
  }
};
