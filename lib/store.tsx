"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  MenuCategory, 
  RestaurantTable, 
  Order, 
  RawMaterial, 
  CashDrawerEntry, 
  Expense, 
  Customer, 
  Employee, 
  NotificationItem,
  OrderType,
  PaymentMethod
} from '@/types';

// Initial state
const INITIAL_CATEGORIES: MenuCategory[] = [
  { id: 'cat-1', name: 'FRIED RICE', sort_order: 1, menu_card: 'Main Menu' },
  { id: 'cat-2', name: 'NOODLES', sort_order: 2, menu_card: 'Main Menu' },
  { id: 'cat-3', name: 'CHINESE VEG', sort_order: 3, menu_card: 'Main Menu' },
  { id: 'cat-4', name: 'CHINESE NON VEG', sort_order: 4, menu_card: 'Main Menu' },
  { id: 'cat-5', name: 'BAGARA AND COMBOS', sort_order: 5, menu_card: 'Main Menu' },
  { id: 'cat-6', name: 'CHICKEN BIRYANI', sort_order: 6, menu_card: 'Main Menu' },
  { id: 'cat-7', name: 'BEVERAGES', sort_order: 7, menu_card: 'Beverages Menu' },
];

const INITIAL_MENU: MenuItem[] = [
  // FRIED RICE
  { id: 'm-1', category_id: 'cat-1', menu_card: 'Main Menu', name: 'Chicken Fried Rice', price: 240, half_price: 130, is_available: true, stock: 50 },
  { id: 'm-2', category_id: 'cat-1', menu_card: 'Main Menu', name: 'Egg Fried Rice', price: 200, half_price: 110, is_available: true, stock: 50 },
  { id: 'm-3', category_id: 'cat-1', menu_card: 'Main Menu', name: 'Veg Fried Rice', price: 180, half_price: 100, is_available: true, stock: 50 },
  { id: 'm-4', category_id: 'cat-1', menu_card: 'Main Menu', name: 'Schezwan Chicken Fried Rice', price: 260, half_price: 140, is_available: true, stock: 50 },
  { id: 'm-5', category_id: 'cat-1', menu_card: 'Main Menu', name: 'Paneer Fried Rice', price: 220, half_price: 120, is_available: true, stock: 50 },

  // NOODLES
  { id: 'm-6', category_id: 'cat-2', menu_card: 'Main Menu', name: 'Chicken Soft Noodles', price: 230, half_price: 125, is_available: true, stock: 50 },
  { id: 'm-7', category_id: 'cat-2', menu_card: 'Main Menu', name: 'Veg Hakka Noodles', price: 170, half_price: 95, is_available: true, stock: 50 },
  { id: 'm-8', category_id: 'cat-2', menu_card: 'Main Menu', name: 'Egg Noodles', price: 190, half_price: 105, is_available: true, stock: 50 },
  { id: 'm-9', category_id: 'cat-2', menu_card: 'Main Menu', name: 'Schezwan Chicken Noodles', price: 250, half_price: 135, is_available: true, stock: 50 },

  // CHINESE NON VEG
  { id: 'm-10', category_id: 'cat-4', menu_card: 'Main Menu', name: 'Chilli Chicken (Dry/Gravy)', price: 280, half_price: 150, is_available: true, stock: 50 },
  { id: 'm-11', category_id: 'cat-4', menu_card: 'Main Menu', name: 'Chicken 65', price: 290, half_price: 160, is_available: true, stock: 50 },
  { id: 'm-12', category_id: 'cat-4', menu_card: 'Main Menu', name: 'Chicken Manchurian', price: 270, half_price: 145, is_available: true, stock: 50 },
  { id: 'm-13', category_id: 'cat-4', menu_card: 'Main Menu', name: 'Pepper Chicken', price: 300, half_price: 165, is_available: true, stock: 50 },

  // CHICKEN BIRYANI & BAGARA
  { id: 'm-14', category_id: 'cat-6', menu_card: 'Main Menu', name: 'Special Chicken Dum Biryani', price: 290, half_price: 160, is_available: true, stock: 50 },
  { id: 'm-15', category_id: 'cat-6', menu_card: 'Main Menu', name: 'Single Chicken Biryani', price: 170, half_price: null, is_available: true, stock: 50 },
  { id: 'm-16', category_id: 'cat-5', menu_card: 'Main Menu', name: 'Bagara Rice with Chicken Curry Combo', price: 250, half_price: 135, is_available: true, stock: 50 },
  { id: 'm-17', category_id: 'cat-5', menu_card: 'Main Menu', name: 'Unlimited Bagara Rice Combo', price: 220, half_price: null, is_available: true, stock: 50 },

  // BEVERAGES
  { id: 'm-18', category_id: 'cat-7', menu_card: 'Beverages Menu', name: 'Thums Up (750ml)', price: 50, half_price: null, is_available: true, stock: 100 },
  { id: 'm-19', category_id: 'cat-7', menu_card: 'Beverages Menu', name: 'Sprite (750ml)', price: 50, half_price: null, is_available: true, stock: 100 },
  { id: 'm-20', category_id: 'cat-7', menu_card: 'Beverages Menu', name: 'Fresh Lime Soda', price: 60, half_price: null, is_available: true, stock: 100 },
];

const INITIAL_TABLES: RestaurantTable[] = Array.from({ length: 10 }, (_, i) => ({
  id: `tbl-${i + 1}`,
  table_number: i + 1,
  qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HFC_TABLE_${i + 1}`,
  is_occupied: false,
}));

const INITIAL_ORDERS: Order[] = [];
const INITIAL_RAW_MATERIALS: RawMaterial[] = [
  { id: 'rm-1', name: 'Basmati Biryani Rice', unit: 'kg', quantity: 85, min_threshold: 20 },
  { id: 'rm-2', name: 'Fresh Chicken', unit: 'kg', quantity: 18, min_threshold: 25 },
  { id: 'rm-3', name: 'Sunflower Cooking Oil', unit: 'liters', quantity: 40, min_threshold: 15 },
  { id: 'rm-4', name: 'Garam Masala & Spices', unit: 'kg', quantity: 6.5, min_threshold: 2 },
  { id: 'rm-5', name: 'Amul Butter & Cream', unit: 'kg', quantity: 12, min_threshold: 5 },
];

const INITIAL_CASH_DRAWER: CashDrawerEntry[] = [
  { id: 'cd-1', type: 'in', amount: 3000, note: 'Morning Float Opening', date: '2026-09-15T09:00:00.000Z' },
];

const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp-1', title: 'Commercial Gas Cylinder Refill', amount: 1850, category: 'Utilities', date: '2026-09-15T10:00:00.000Z' },
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'cust-1', name: 'Suresh Menon', phone: '+91 97654 32109', total_due: 0 },
];

const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'emp-1', name: 'Master Chef Rahmatullah', role: 'Head Biryani Chef', phone: '+91 98711 00112', salary: 35000, joined_at: '2023-04-15' },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'Low Inventory Alert', message: 'Fresh Chicken stock is below 25 kg threshold (Current: 18 kg)', time: '10 mins ago', read: false, type: 'inventory' },
];

interface AppStateContextType {
  menus: string[];
  activeMenu: string;
  categories: MenuCategory[];
  menuItems: MenuItem[];
  tables: RestaurantTable[];
  orders: Order[];
  rawMaterials: RawMaterial[];
  cashDrawer: CashDrawerEntry[];
  expenses: Expense[];
  customers: Customer[];
  employees: Employee[];
  notifications: NotificationItem[];
  cart: { item: MenuItem; qty: number; variant: 'full' | 'half'; variantLabel?: string }[];
  cartOrderType: OrderType;
  cartTableId: string | null;
  cartCustomerName: string;
  cartCustomerPhone: string;
  cartDiscount: number;
  cartTaxPercent: number;

  setActiveMenu: (menuName: string) => void;
  addMenuCard: (menuName: string) => void;
  addToCart: (item: MenuItem, variant?: 'full' | 'half', variantLabel?: string) => void;
  updateCartQty: (itemId: string, variant: 'full' | 'half', delta: number) => void;
  removeFromCart: (itemId: string, variant: 'full' | 'half') => void;
  clearCart: () => void;
  setCartOrderType: (type: OrderType) => void;
  setCartTableId: (tableId: string | null) => void;
  setCartCustomerName: (name: string) => void;
  setCartCustomerPhone: (phone: string) => void;
  setCartDiscount: (amount: number) => void;
  placeCurrentOrder: (paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
  bulkSaveExtractedItems: (
    extractedCategories: { name: string; items: { name: string; price: number; half_price?: number | null; full_price?: number | null }[] }[],
    mode?: 'append' | 'replace'
  ) => void;
  toggleTableOccupancy: (tableId: string) => void;
  addRawMaterial: (material: Omit<RawMaterial, 'id'>) => void;
  updateRawMaterialQty: (id: string, qty: number) => void;
  addCashEntry: (entry: Omit<CashDrawerEntry, 'id' | 'date'>) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  settleCustomerDue: (customerId: string, amount: number) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  markNotificationsAsRead: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menus, setMenus] = useState<string[]>(['Main Menu', 'Combos Menu', 'Beverages Menu']);
  const [activeMenu, setActiveMenu] = useState<string>('Main Menu');

  const [categories, setCategories] = useState<MenuCategory[]>(INITIAL_CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [tables, setTables] = useState<RestaurantTable[]>(INITIAL_TABLES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>(INITIAL_RAW_MATERIALS);
  const [cashDrawer, setCashDrawer] = useState<CashDrawerEntry[]>(INITIAL_CASH_DRAWER);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [cart, setCart] = useState<{ item: MenuItem; qty: number; variant: 'full' | 'half'; variantLabel?: string }[]>([]);
  const [cartOrderType, setCartOrderType] = useState<OrderType>('dine-in');
  const [cartTableId, setCartTableId] = useState<string | null>('tbl-1');
  const [cartCustomerName, setCartCustomerName] = useState('');
  const [cartCustomerPhone, setCartCustomerPhone] = useState('');
  const [cartDiscount, setCartDiscount] = useState(0);
  const cartTaxPercent = 5;

  const [isHydrated, setIsHydrated] = useState(false);

  // Load state from localStorage on mount (SSR safe)
  useEffect(() => {
    try {
      const savedMenus = localStorage.getItem('hfc_menus');
      if (savedMenus) {
        const parsed = JSON.parse(savedMenus);
        if (Array.isArray(parsed) && parsed.length > 0) setMenus(parsed);
      }

      const savedActiveMenu = localStorage.getItem('hfc_active_menu');
      if (savedActiveMenu) setActiveMenu(JSON.parse(savedActiveMenu));

      const savedCategories = localStorage.getItem('hfc_categories');
      if (savedCategories) {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed) && parsed.length > 0) setCategories(parsed);
      }

      const savedMenuItems = localStorage.getItem('hfc_menu_items');
      if (savedMenuItems) {
        const parsed = JSON.parse(savedMenuItems);
        if (Array.isArray(parsed) && parsed.length > 0) setMenuItems(parsed);
      }

      const savedTables = localStorage.getItem('hfc_tables');
      if (savedTables) setTables(JSON.parse(savedTables));

      const savedOrders = localStorage.getItem('hfc_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedRawMaterials = localStorage.getItem('hfc_raw_materials');
      if (savedRawMaterials) setRawMaterials(JSON.parse(savedRawMaterials));

      const savedCashDrawer = localStorage.getItem('hfc_cash_drawer');
      if (savedCashDrawer) setCashDrawer(JSON.parse(savedCashDrawer));

      const savedExpenses = localStorage.getItem('hfc_expenses');
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

      const savedCustomers = localStorage.getItem('hfc_customers');
      if (savedCustomers) setCustomers(JSON.parse(savedCustomers));

      const savedEmployees = localStorage.getItem('hfc_employees');
      if (savedEmployees) setEmployees(JSON.parse(savedEmployees));

      const savedNotifications = localStorage.getItem('hfc_notifications');
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('hfc_menus', JSON.stringify(menus));
      localStorage.setItem('hfc_active_menu', JSON.stringify(activeMenu));
      localStorage.setItem('hfc_categories', JSON.stringify(categories));
      localStorage.setItem('hfc_menu_items', JSON.stringify(menuItems));
      localStorage.setItem('hfc_tables', JSON.stringify(tables));
      localStorage.setItem('hfc_orders', JSON.stringify(orders));
      localStorage.setItem('hfc_raw_materials', JSON.stringify(rawMaterials));
      localStorage.setItem('hfc_cash_drawer', JSON.stringify(cashDrawer));
      localStorage.setItem('hfc_expenses', JSON.stringify(expenses));
      localStorage.setItem('hfc_customers', JSON.stringify(customers));
      localStorage.setItem('hfc_employees', JSON.stringify(employees));
      localStorage.setItem('hfc_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [
    isHydrated,
    menus,
    activeMenu,
    categories,
    menuItems,
    tables,
    orders,
    rawMaterials,
    cashDrawer,
    expenses,
    customers,
    employees,
    notifications,
  ]);

  const addMenuCard = (menuName: string) => {
    const formatted = menuName.trim();
    if (formatted && !menus.includes(formatted)) {
      setMenus((prev) => [...prev, formatted]);
      setActiveMenu(formatted);
    }
  };

  const addToCart = (item: MenuItem, variant: 'full' | 'half' = 'full', variantLabel?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.item.id === item.id && i.variant === variant);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].qty += 1;
        return next;
      }
      return [...prev, { item, qty: 1, variant, variantLabel }];
    });
  };

  const updateCartQty = (itemId: string, variant: 'full' | 'half', delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === itemId && c.variant === variant) {
            const newQty = c.qty + delta;
            return newQty > 0 ? { ...c, qty: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as { item: MenuItem; qty: number; variant: 'full' | 'half'; variantLabel?: string }[];
    });
  };

  const removeFromCart = (itemId: string, variant: 'full' | 'half') => {
    setCart((prev) => prev.filter((c) => !(c.item.id === itemId && c.variant === variant)));
  };

  const clearCart = () => {
    setCart([]);
    setCartCustomerName('');
    setCartCustomerPhone('');
    setCartDiscount(0);
  };

  const placeCurrentOrder = (paymentMethod: PaymentMethod): Order => {
    const subtotal = cart.reduce((sum, c) => {
      const unitPrice = c.variant === 'half' && c.item.half_price ? c.item.half_price : c.item.price;
      return sum + unitPrice * c.qty;
    }, 0);
    const tax = Math.round((subtotal * cartTaxPercent) / 100);
    const total = Math.max(0, subtotal + tax - cartDiscount);

    const selectedTable = tables.find((t) => t.id === cartTableId);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      table_id: cartOrderType === 'dine-in' ? cartTableId : null,
      table_number: cartOrderType === 'dine-in' && selectedTable ? selectedTable.table_number : null,
      order_number: `HFC-${Math.floor(2000 + Math.random() * 8000)}`,
      type: cartOrderType,
      status: 'pending',
      payment_method: paymentMethod,
      total,
      tax,
      discount: cartDiscount,
      customer_name: cartCustomerName || 'Walk-in Guest',
      customer_phone: cartCustomerPhone || 'N/A',
      created_at: new Date().toISOString(),
      items: cart.map((c, idx) => ({
        id: `oi-${Date.now()}-${idx}`,
        menu_item_id: c.item.id,
        item_name: `${c.item.name} ${c.variantLabel ? `(${c.variantLabel})` : ''}`,
        qty: c.qty,
        price: c.variant === 'half' && c.item.half_price ? c.item.half_price : c.item.price,
        variant: c.variant,
      }))
    };

    setOrders((prev) => [newOrder, ...prev]);

    if (paymentMethod === 'cash') {
      setCashDrawer((prev) => [
        {
          id: `cd-${Date.now()}`,
          type: 'in',
          amount: total,
          note: `Order #${newOrder.order_number} (Cash)`,
          date: new Date().toISOString(),
        },
        ...prev
      ]);
    }

    if (cartOrderType === 'dine-in' && cartTableId) {
      setTables((prev) => prev.map((t) => t.id === cartTableId ? { ...t, is_occupied: true } : t));
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    setMenuItems((prev) => [...prev, { ...item, id: `m-${Date.now()}`, menu_card: item.menu_card || activeMenu }]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) => prev.map((item) => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addCategory = (name: string) => {
    const formattedName = name.toUpperCase();
    setCategories((prev) => [...prev, { id: `cat-${Date.now()}`, name: formattedName, sort_order: prev.length + 1, menu_card: activeMenu }]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setMenuItems((prev) => prev.filter((item) => item.category_id !== id));
  };

  const bulkSaveExtractedItems = (
    extractedCategories: { name: string; items: { name: string; price: number; half_price?: number | null; full_price?: number | null }[] }[],
    mode: 'append' | 'replace' = 'append'
  ) => {
    let updatedCategories = mode === 'replace' ? [] : [...categories];
    let newItemsList: MenuItem[] = mode === 'replace' ? [] : [];

    extractedCategories.forEach((cat) => {
      const upperCatName = cat.name.toUpperCase();
      let existingCat = updatedCategories.find((c) => c.name.toUpperCase() === upperCatName);

      if (!existingCat) {
        existingCat = {
          id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: upperCatName,
          sort_order: updatedCategories.length + 1,
          menu_card: activeMenu,
        };
        updatedCategories.push(existingCat);
      }

      cat.items.forEach((item) => {
        const fullPrice = item.full_price || item.price;
        const halfPrice = item.half_price && item.half_price !== fullPrice ? item.half_price : null;

        newItemsList.push({
          id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          category_id: existingCat!.id,
          menu_card: activeMenu,
          name: item.name,
          price: fullPrice,
          half_price: halfPrice,
          image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
          is_available: true,
          stock: 50,
        });
      });
    });

    setCategories(updatedCategories);
    setMenuItems((prev) => mode === 'replace' ? newItemsList : [...prev, ...newItemsList]);
  };

  const toggleTableOccupancy = (tableId: string) => {
    setTables((prev) => prev.map((t) => t.id === tableId ? { ...t, is_occupied: !t.is_occupied } : t));
  };

  const addRawMaterial = (material: Omit<RawMaterial, 'id'>) => {
    setRawMaterials((prev) => [...prev, { ...material, id: `rm-${Date.now()}` }]);
  };

  const updateRawMaterialQty = (id: string, qty: number) => {
    setRawMaterials((prev) => prev.map((rm) => rm.id === id ? { ...rm, quantity: qty } : rm));
  };

  const addCashEntry = (entry: Omit<CashDrawerEntry, 'id' | 'date'>) => {
    setCashDrawer((prev) => [{ ...entry, id: `cd-${Date.now()}`, date: new Date().toISOString() }, ...prev]);
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    setExpenses((prev) => [{ ...expense, id: `exp-${Date.now()}`, date: new Date().toISOString() }, ...prev]);
  };

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    setCustomers((prev) => [...prev, { ...customer, id: `cust-${Date.now()}` }]);
  };

  const settleCustomerDue = (customerId: string, amount: number) => {
    setCustomers((prev) => prev.map((c) => c.id === customerId ? { ...c, total_due: Math.max(0, c.total_due - amount) } : c));
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    setEmployees((prev) => [...prev, { ...employee, id: `emp-${Date.now()}` }]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppStateContext.Provider
      value={{
        menus,
        activeMenu,
        categories,
        menuItems,
        tables,
        orders,
        rawMaterials,
        cashDrawer,
        expenses,
        customers,
        employees,
        notifications,
        cart,
        cartOrderType,
        cartTableId,
        cartCustomerName,
        cartCustomerPhone,
        cartDiscount,
        cartTaxPercent,
        setActiveMenu,
        addMenuCard,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        setCartOrderType,
        setCartTableId,
        setCartCustomerName,
        setCartCustomerPhone,
        setCartDiscount,
        placeCurrentOrder,
        updateOrderStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addCategory,
        deleteCategory,
        bulkSaveExtractedItems,
        toggleTableOccupancy,
        addRawMaterial,
        updateRawMaterialQty,
        addCashEntry,
        addExpense,
        addCustomer,
        settleCustomerDue,
        addEmployee,
        markNotificationsAsRead,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
