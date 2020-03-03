export default {
  getWidgetComponent(type) {
    switch (type) {
      case 'promo':
        return 'Promo';
      case 'widget':
        return 'GenericWidget';
    }
  }
};
