export interface MenuItems {
    common:MenuItemsType[],
    admin:MenuItemsType[],
  }
  interface MenuItemsType {
      title: string;
      icon: JSX.Element;
      subItems:MenuSubItems[]
  }
  
  interface MenuSubItems {
      path: string;
      title: string;
      icon: JSX.Element;
}

export default MenuItems;