import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Settings, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit2, 
  Wallet, 
  ShoppingBag, 
  PieChart, 
  TrendingUp,
  Filter,
  Search,
  Utensils,
  Bed,
  Bath,
  Tv,
  Sofa,
  Lamp,
  Package,
  Info,
  ChevronDown,
  ExternalLink,
  Image as ImageIcon,
  ImagePlus,
  Layers,
  Folder,
  Tag,
  Link as LinkIcon,
  FileText,
  ArrowUpDown,
  Clock,
  Sparkles,
  Download,
  Upload,
  FileJson,
  FileSpreadsheet,
  LayoutGrid,
  List,
  Palette
} from 'lucide-react';
import { Item, Category, CATEGORIES, INITIAL_ITEMS } from './types';

const getCategoryIcon = (category: string) => {
  const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'Tümü': <ShoppingBag size={16} />,
    'Mutfak': <Utensils size={16} />,
    'Yatak Odası': <Bed size={16} />,
    'Banyo': <Bath size={16} />,
    'Elektronik': <Tv size={16} />,
    'Salon': <Sofa size={16} />,
    'Dekorasyon': <Lamp size={16} />,
    'Diğer': <Package size={16} />,
  };
  return CATEGORY_ICONS[category] || <Folder size={16} />;
};

const getCategoryColor = (category: string) => {
  const COLORS: Record<string, string> = {
    'Mutfak': 'text-accent-500',
    'Yatak Odası': 'text-blue-500',
    'Banyo': 'text-cyan-500',
    'Elektronik': 'text-amber-500',
    'Salon': 'text-emerald-500',
    'Dekorasyon': 'text-purple-500',
    'Diğer': 'text-stone-500',
  };
  return COLORS[category] || 'text-indigo-500';
};

const getCategoryBgColorSolid = (category: string) => {
  const COLORS: Record<string, string> = {
    'Mutfak': 'bg-accent-500',
    'Yatak Odası': 'bg-blue-500',
    'Banyo': 'bg-cyan-500',
    'Elektronik': 'bg-amber-500',
    'Salon': 'bg-emerald-500',
    'Dekorasyon': 'bg-purple-500',
    'Diğer': 'bg-stone-500',
  };
  return COLORS[category] || 'bg-indigo-500';
};

const getCategoryBgColor = (category: string) => {
  const BG_COLORS: Record<string, string> = {
    'Mutfak': 'bg-accent-50 dark:bg-accent-900/20 border-accent-100 dark:border-accent-900/30 text-accent-700 dark:text-accent-300',
    'Yatak Odası': 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-300',
    'Banyo': 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    'Elektronik': 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-300',
    'Salon': 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    'Dekorasyon': 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-300',
    'Diğer': 'bg-stone-50 dark:bg-stone-900/20 border-stone-100 dark:border-stone-900/30 text-stone-700 dark:text-stone-300',
  };
  return BG_COLORS[category] || 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-300';
};

export default function App() {
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('ceyiz_items_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ITEMS;
      }
    }
    return INITIAL_ITEMS;
  });

  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem('ceyiz_budget_v2');
    return saved ? Number(saved) : 200000; // Default 200,000 TL
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('ceyiz_categories_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return CATEGORIES;
      }
    }
    return CATEGORIES;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isManageCategoriesModalOpen, setIsManageCategoriesModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBudgetAnalysisModalOpen, setIsBudgetAnalysisModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isProgressReportModalOpen, setIsProgressReportModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'Tümü'>(() => {
    const saved = localStorage.getItem('ceyiz_active_category');
    return (saved as Category | 'Tümü') || 'Tümü';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ id: string, message: string, itemId: string } | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [selectedItemDetail, setSelectedItemDetail] = useState<Item | null>(null);
  const [isGroupedByCategory, setIsGroupedByCategory] = useState(() => {
    const saved = localStorage.getItem('ceyiz_grouped');
    return saved === 'true';
  });
  const [sortBy, setSortBy] = useState<'date-newest' | 'date-oldest' | 'price-asc' | 'price-desc'>('date-newest');
  const [filterStatus, setFilterStatus] = useState<'all' | 'bought' | 'remaining'>('all');
  const [viewingItemsType, setViewingItemsType] = useState<'bought' | 'remaining' | null>(null);
  const [colorTheme, setColorTheme] = useState<'rose' | 'emerald' | 'indigo' | 'amber' | 'violet' | 'slate'>(() => {
    const saved = localStorage.getItem('ceyiz_color_theme');
    return (saved as any) || 'rose';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-color-theme', colorTheme);
    localStorage.setItem('ceyiz_color_theme', colorTheme);
  }, [colorTheme]);

  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    const saved = localStorage.getItem('ceyiz_view_mode');
    return (saved as 'list' | 'grid') || 'list';
  });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    localStorage.setItem('ceyiz_items_v2', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('ceyiz_budget_v2', budget.toString());
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('ceyiz_categories_v2', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ceyiz_active_category', activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    localStorage.setItem('ceyiz_grouped', isGroupedByCategory.toString());
  }, [isGroupedByCategory]);

  useEffect(() => {
    localStorage.setItem('ceyiz_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    const needsMigration = items.some(item => !item.createdAt);
    if (needsMigration) {
      setItems(prev => prev.map(item => ({
        ...item,
        createdAt: item.createdAt || Date.now()
      })));
    }
  }, []);

  const handleImportData = (data: { items: Item[], budget: number, categories: Category[] }) => {
    if (data.items) setItems(data.items);
    if (data.budget) setBudget(data.budget);
    if (data.categories) setCategories(data.categories);
    setToast({ id: Date.now().toString(), message: 'Veriler başarıyla içe aktarıldı!', itemId: '' });
  };

  const handleClearBoughtItems = () => {
    setItems(prev => prev.map(item => ({ ...item, isBought: false })));
    setToast({ id: Date.now().toString(), message: 'Tüm işaretli ürünler temizlendi!', itemId: '' });
  };

  const handleResetAll = () => {
    localStorage.clear();
    setItems(INITIAL_ITEMS);
    setBudget(200000);
    setCategories(CATEGORIES);
    setActiveCategory('Tümü');
    setIsGroupedByCategory(false);
  };

  const stats = useMemo(() => {
    const totalItems = items.length;
    const boughtItems = items.filter(i => i.isBought).length;
    const remainingItems = totalItems - boughtItems;
    
    const totalSpent = items.filter(i => i.isBought).reduce((sum, item) => sum + item.price, 0);
    const estimatedRemaining = items.filter(i => !i.isBought).reduce((sum, item) => sum + item.price, 0);
    
    const remainingBudget = budget - totalSpent;
    const completionRate = totalItems === 0 ? 0 : Math.round((boughtItems / totalItems) * 100);

    return { totalItems, boughtItems, remainingItems, totalSpent, estimatedRemaining, remainingBudget, completionRate };
  }, [items, budget]);

  const categoryStats = useMemo(() => {
    return categories.map(category => {
      const categoryItems = items.filter(item => item.category === category);
      const total = categoryItems.length;
      const bought = categoryItems.filter(item => item.isBought).length;
      const percentage = total === 0 ? 0 : Math.round((bought / total) * 100);
      const spent = categoryItems.filter(item => item.isBought).reduce((sum, item) => sum + item.price, 0);
      const estimatedTotal = categoryItems.reduce((sum, item) => sum + item.price, 0);
      return { category, total, bought, percentage, spent, estimatedTotal };
    });
  }, [items, categories]);

  const filteredItems = useMemo(() => {
    let result = [...items];
    
    if (activeCategory !== 'Tümü') {
      result = result.filter(item => item.category === activeCategory);
    }

    if (filterStatus === 'bought') {
      result = result.filter(item => item.isBought);
    } else if (filterStatus === 'remaining') {
      result = result.filter(item => !item.isBought);
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        (item.notes && item.notes.toLowerCase().includes(lowerQuery))
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'date-newest':
          return (b.createdAt || 0) - (a.createdAt || 0);
        case 'date-oldest':
          return (a.createdAt || 0) - (b.createdAt || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [items, activeCategory, searchQuery, sortBy, filterStatus]);

  const groupedItems = useMemo(() => {
    if (!isGroupedByCategory) return null;
    const groups = {} as Record<Category, Item[]>;
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems, isGroupedByCategory]);

  const renderItem = (item: Item) => {
    if (viewMode === 'grid') {
      return (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`group relative bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-md transition-all ${item.isBought ? 'opacity-75' : ''}`}
        >
          <div 
            className="p-4 cursor-pointer"
            onClick={() => setSelectedItemDetail(item)}
          >
            <div className="aspect-square relative overflow-hidden bg-stone-100 dark:bg-stone-800 rounded-xl mb-3">
              {item.image ? (
                <img src={item.image} alt={item.imageAlt || item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-700">
                  <ImageIcon size={48} />
                </div>
              )}
            </div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className={`text-sm font-semibold line-clamp-2 ${item.isBought ? 'text-stone-500 line-through' : 'text-stone-900 dark:text-stone-100'}`}>
                {item.name}
              </h3>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className={`text-xs font-bold ${item.isBought ? 'text-stone-400' : 'text-accent-600 dark:text-accent-400'}`}>
                {formatCurrency(item.price)}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getCategoryBgColor(item.category)}`}>
                {item.category}
              </span>
            </div>
          </div>
          <div className="absolute top-3 left-3 z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleItemStatus(item.id); }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                item.isBought 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white/80 dark:bg-stone-900/80 text-stone-400 hover:text-emerald-500 shadow-sm'
              }`}
            >
              {item.isBought ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
          </div>
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); setEditingItem(item); }}
              className="w-8 h-8 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-blue-500 shadow-sm"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
              className="w-8 h-8 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-accent-500 shadow-sm"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.li 
        key={item.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`group relative flex flex-col p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${item.isBought ? 'bg-stone-50/50 dark:bg-stone-800/30' : ''}`}
      >
        <div className="flex items-center gap-4 w-full">
          <button 
            onClick={() => toggleItemStatus(item.id)}
            className={`flex-shrink-0 transition-colors ${item.isBought ? 'text-emerald-500' : 'text-stone-300 dark:text-stone-700 hover:text-stone-400 dark:hover:text-stone-600'}`}
          >
            {item.isBought ? <CheckCircle2 size={24} /> : <Circle size={24} />}
          </button>
          
          {item.image ? (
            <img src={item.image} alt={item.imageAlt || item.name} className="w-12 h-12 rounded-lg object-cover border border-stone-200 dark:border-stone-800 flex-shrink-0" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 flex items-center justify-center flex-shrink-0 text-stone-400 dark:text-stone-600">
              <ImageIcon size={20} />
            </div>
          )}
          
          <div 
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => setSelectedItemDetail(item)}
          >
            <div className="flex items-center gap-2">
              <p className={`text-sm font-medium truncate ${item.isBought ? 'text-stone-500 dark:text-stone-500 line-through' : 'text-stone-900 dark:text-stone-100'}`}>
                {item.name}
              </p>
              {item.link && (
                <span className="text-blue-500 dark:text-blue-400">
                  <LinkIcon size={14} />
                </span>
              )}
              {item.notes && (
                <Info size={14} className="text-stone-400 dark:text-stone-600" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${getCategoryBgColor(item.category)}`}>
                {React.cloneElement(getCategoryIcon(item.category) as React.ReactElement, { size: 12 })}
                {item.category}
              </span>
              <span className={`text-xs font-medium ${item.isBought ? 'text-stone-400 dark:text-stone-600' : 'text-stone-600 dark:text-stone-400'}`}>
                {formatCurrency(item.price)}
              </span>
            </div>
          </div>

          <div className={`flex items-center gap-2 transition-opacity ${expandedItemId === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <button 
              onClick={() => setEditingItem(item)}
              className="p-2 text-stone-400 dark:text-stone-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => handleDeleteItem(item.id)}
              className="p-2 text-stone-400 dark:text-stone-600 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/30 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
            <button 
              onClick={() => setExpandedItemId(prev => prev === item.id ? null : item.id)}
              className={`p-2 rounded-lg transition-colors ${expandedItemId === item.id ? 'text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800' : 'text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
            >
              <ChevronDown size={16} className={`transition-transform ${expandedItemId === item.id ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expandedItemId === item.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden w-full"
            >
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-6 pl-[3.25rem]">
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Info size={14} className="text-stone-400 dark:text-stone-600" />
                    Ürün Bilgisi
                  </h4>
                  <div className="space-y-3">
                    {item.link && (
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      >
                        <LinkIcon size={14} />
                        Ürün Linkine Git
                      </a>
                    )}
                    <p className="text-sm text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl border border-stone-100 dark:border-stone-800">
                      {item.notes || 'Bu ürün için henüz not eklenmemiş.'}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Search size={14} className="text-stone-400 dark:text-stone-600" />
                    Fiyat Araştır
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <a href={`https://www.trendyol.com/sr?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-xl hover:border-[#F27A1A] hover:text-[#F27A1A] transition-colors flex items-center gap-1.5 shadow-sm">
                      Trendyol <ExternalLink size={12} />
                    </a>
                    <a href={`https://www.hepsiburada.com/ara?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-xl hover:border-[#FF6000] hover:text-[#FF6000] transition-colors flex items-center gap-1.5 shadow-sm">
                      Hepsiburada <ExternalLink size={12} />
                    </a>
                    <a href={`https://www.amazon.com.tr/s?k=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-xl hover:border-[#232F3E] hover:text-[#232F3E] transition-colors flex items-center gap-1.5 shadow-sm">
                      Amazon <ExternalLink size={12} />
                    </a>
                    <a href={`https://www.n11.com/arama?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-xl hover:border-[#5C3EBC] hover:text-[#5C3EBC] transition-colors flex items-center gap-1.5 shadow-sm">
                      N11 <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    );
  };

  const handleAddItem = (item: Omit<Item, 'id' | 'createdAt'>) => {
    const newItem = { ...item, id: crypto.randomUUID(), createdAt: Date.now() };
    setItems(prev => [...prev, newItem]);
    setIsAddModalOpen(false);
  };

  const handleEditItem = (updatedItem: Item) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleItemStatus = (id: string, skipToast = false) => {
    setItems(prev => {
      const newItems = prev.map(item => 
        item.id === id ? { ...item, isBought: !item.isBought } : item
      );
      
      if (!skipToast) {
        const toggledItem = newItems.find(i => i.id === id);
        if (toggledItem && toggledItem.isBought) {
          setToast({
            id: Date.now().toString(),
            message: `${toggledItem.name} alındı olarak işaretlendi.`,
            itemId: id
          });
        }
      }
      
      return newItems;
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200 font-sans selection:bg-accent-200 transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl"
          >
            <CheckCircle2 size={20} className="text-emerald-400" />
            <span className="text-sm font-medium">{toast.message}</span>
            <div className="w-px h-4 bg-stone-700 mx-1" />
            <button
              onClick={() => {
                toggleItemStatus(toast.itemId, true);
                setToast(null);
              }}
              className="text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors"
            >
              Geri Al
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-10 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center text-accent-600 dark:text-accent-400">
              <ShoppingBag size={20} />
            </div>
            <h1 className="text-xl font-semibold text-stone-900 dark:text-white tracking-tight">Çeyiz Listem</h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsBudgetAnalysisModalOpen(true)}
              className="relative p-2 w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 transition-colors border border-emerald-100 dark:border-emerald-900/30 shadow-sm"
              title="Bütçe Analizi"
            >
              <Wallet size={20} />
            </motion.button>
            <button 
              onClick={() => setIsThemeModalOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors px-3 py-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <Palette size={18} />
              <span className="hidden sm:inline">Tema</span>
            </button>
            <button 
              onClick={() => setIsBudgetModalOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors px-3 py-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Ayarlar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {isProgressReportModalOpen && (
          <ProgressReportModal 
            onClose={() => setIsProgressReportModalOpen(false)}
            stats={stats}
            categoryStats={categoryStats}
          />
        )}

        {isBudgetAnalysisModalOpen && (
          <BudgetAnalysisModal 
            onClose={() => setIsBudgetAnalysisModalOpen(false)}
            stats={stats}
            budget={budget}
            categoryStats={categoryStats}
            formatCurrency={formatCurrency}
          />
        )}

        {/* Dashboard Stats */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <PieChart size={20} className="text-accent-500" />
              Genel Bakış
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsReportModalOpen(true)}
                className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 dark:bg-accent-900/20 rounded-lg transition-colors"
              >
                <FileText size={16} />
                Detaylı Rapor
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Toplam Ürün" value={stats.totalItems} subtitle={`${stats.completionRate}% Tamamlandı`} />
            <StatCard 
              title="Alınan" 
              value={stats.boughtItems} 
              valueColor="text-emerald-600" 
              onClick={() => setViewingItemsType('bought')}
            />
            <StatCard 
              title="Kalan" 
              value={stats.remainingItems} 
              valueColor="text-amber-600" 
              onClick={() => setViewingItemsType('remaining')}
            />
            <StatCard 
              title="Harcanan Tutar" 
              value={formatCurrency(stats.totalSpent)} 
              subtitle={`Kalan Bütçe: ${formatCurrency(stats.remainingBudget)}`}
              valueColor="text-accent-600"
            />
          </div>
          
          {/* Progress Bar */}
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsProgressReportModalOpen(true)}
            className="mt-6 w-full text-left bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm hover:border-accent-300 dark:hover:border-accent-900/50 transition-all group"
          >
            <div className="flex justify-between text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 dark:text-stone-400">İlerleme</span>
                <span className="text-[10px] bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Detayları Gör</span>
              </div>
              <span className="text-stone-900 dark:text-stone-100">{stats.completionRate}%</span>
            </div>
            <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.completionRate}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full"
              />
            </div>
          </motion.button>
        </section>

        {/* Filters and List */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <TrendingUp size={20} className="text-accent-500" />
              Alışveriş Listesi
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Ürün ara..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all"
                />
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-2 rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors shadow-sm w-full sm:w-auto whitespace-nowrap"
              >
                <Plus size={18} />
                Yeni Ürün
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex overflow-x-auto pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 scrollbar-hide w-full sm:w-auto">
              {(['Tümü', ...categories] as (Category | 'Tümü')[]).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category 
                      ? `${getCategoryBgColor(category)} shadow-sm ring-1 ring-stone-200 dark:ring-stone-800` 
                      : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span className={activeCategory === category ? '' : getCategoryColor(category)}>
                    {getCategoryIcon(category)}
                  </span>
                  {category}
                </button>
              ))}
              <button
                onClick={() => setIsManageCategoriesModalOpen(true)}
                className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
                title="Kategorileri Yönet"
              >
                <Settings size={16} />
              </button>
            </div>
            
            <button
              onClick={() => setIsGroupedByCategory(!isGroupedByCategory)}
              className={`flex items-center justify-center p-2 rounded-full transition-all ${
                isGroupedByCategory
                  ? 'bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
              title="Kategorilere Göre Grupla"
            >
              <Layers size={16} />
            </button>

            <div className="flex items-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full p-1 shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-stone-100 dark:bg-stone-800 text-accent-500' : 'text-stone-400 hover:text-stone-600'}`}
                title="Liste Görünümü"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-stone-100 dark:bg-stone-800 text-accent-500' : 'text-stone-400 hover:text-stone-600'}`}
                title="Izgara Görünümü"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {/* Sorting and Filtering Controls */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-1.5 shadow-sm">
              <Filter size={14} className="text-stone-400" />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-transparent text-xs font-medium text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="bought">Alınanlar</option>
                <option value="remaining">Alınacaklar</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-1.5 shadow-sm">
              <ArrowUpDown size={14} className="text-stone-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-medium text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="date-newest">En Yeni (Eklenme)</option>
                <option value="date-oldest">En Eski (Eklenme)</option>
                <option value="price-asc">Fiyat (Artan)</option>
                <option value="price-desc">Fiyat (Azalan)</option>
              </select>
            </div>
            
            <div className="text-[10px] text-stone-400 dark:text-stone-500 ml-auto">
              {filteredItems.length} ürün listeleniyor
            </div>
          </div>

          {/* Items List */}
          <div className={viewMode === 'list' ? "bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm" : ""}>
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                <ShoppingBag size={48} className="mx-auto mb-4 text-stone-300 dark:text-stone-700" />
                <p>Bu kategoride henüz ürün yok.</p>
              </div>
            ) : isGroupedByCategory && groupedItems ? (
              <div className={`p-4 sm:p-6 space-y-8 ${viewMode === 'grid' ? 'bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm' : ''}`}>
                {categories.map(category => {
                  const items = groupedItems[category];
                  if (!items?.length) return null;
                  return (
                    <div key={category} className="space-y-3">
                      <h3 className={`text-sm font-semibold flex items-center gap-2 px-3 py-1.5 rounded-lg ${getCategoryBgColor(category)}`}>
                        {React.cloneElement(getCategoryIcon(category) as React.ReactElement, { size: 16 })}
                        {category}
                        <span className="opacity-60 font-normal text-xs ml-1">({items.length})</span>
                      </h3>
                      <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" : "divide-y divide-stone-100 dark:divide-stone-800 border border-stone-100 dark:border-stone-800 rounded-2xl overflow-hidden bg-white dark:bg-stone-900 shadow-sm"}>
                        <AnimatePresence>
                          {items.map(item => renderItem(item))}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" : "divide-y divide-stone-100 dark:divide-stone-800"}>
                <AnimatePresence>
                  {filteredItems.map(item => renderItem(item))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {isAddModalOpen && (
          <ItemModal 
            onClose={() => setIsAddModalOpen(false)} 
            onSubmit={handleAddItem} 
            title="Yeni Ürün Ekle"
            categories={categories}
          />
        )}
        {editingItem && (
          <ItemModal 
            item={editingItem}
            onClose={() => setEditingItem(null)} 
            onSubmit={handleEditItem}
            title="Ürünü Düzenle"
            categories={categories}
          />
        )}
        {isThemeModalOpen && (
          <ThemeModal
            currentTheme={colorTheme}
            onThemeChange={(theme) => {
              setColorTheme(theme);
              setIsThemeModalOpen(false);
            }}
            onClose={() => setIsThemeModalOpen(false)}
          />
        )}
        {isBudgetModalOpen && (
          <BudgetModal 
            currentBudget={budget}
            items={items}
            categories={categories}
            onClose={() => setIsBudgetModalOpen(false)}
            onSubmit={setBudget}
            onReset={handleResetAll}
            onImport={handleImportData}
            onClearBought={handleClearBoughtItems}
          />
        )}
        {isManageCategoriesModalOpen && (
          <ManageCategoriesModal
            categories={categories}
            setCategories={setCategories}
            onClose={() => setIsManageCategoriesModalOpen(false)}
            items={items}
            setItems={setItems}
          />
        )}
        {viewingItemsType && (
          <ItemListModal
            title={viewingItemsType === 'bought' ? 'Alınan Ürünler' : 'Kalan Ürünler'}
            items={items.filter(i => viewingItemsType === 'bought' ? i.isBought : !i.isBought)}
            onClose={() => setViewingItemsType(null)}
            toggleItemStatus={toggleItemStatus}
            formatCurrency={formatCurrency}
          />
        )}
        {isReportModalOpen && (
          <ReportModal
            items={items}
            budget={budget}
            stats={stats}
            categories={categories}
            onClose={() => setIsReportModalOpen(false)}
            formatCurrency={formatCurrency}
          />
        )}
        {selectedItemDetail && (
          <ItemDetailModal
            item={selectedItemDetail}
            onClose={() => setSelectedItemDetail(null)}
            onEdit={(item) => {
              setSelectedItemDetail(null);
              setEditingItem(item);
            }}
            onToggleStatus={toggleItemStatus}
            formatCurrency={formatCurrency}
          />
        )}
      </AnimatePresence>
    </div>
  );
}



function ItemDetailModal({ 
  item, 
  onClose, 
  onEdit, 
  onToggleStatus,
  formatCurrency 
}: { 
  item: Item, 
  onClose: () => void, 
  onEdit: (item: Item) => void,
  onToggleStatus: (id: string) => void,
  formatCurrency: (val: number) => string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-stone-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border dark:border-stone-800"
      >
        <div className="relative h-64 bg-stone-100 dark:bg-stone-800">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.imageAlt || item.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-700">
              <ImageIcon size={64} />
            </div>
          )}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Plus size={24} className="rotate-45" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${getCategoryBgColor(item.category)}`}>
              {item.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <h2 className={`text-2xl font-bold mb-1 ${item.isBought ? 'text-stone-500 line-through' : 'text-stone-900 dark:text-stone-100'}`}>
                {item.name}
              </h2>
              <p className="text-xl font-bold text-accent-600 dark:text-accent-400">
                {formatCurrency(item.price)}
              </p>
            </div>
            <button 
              onClick={() => onToggleStatus(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                item.isBought 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600'
              }`}
            >
              {item.isBought ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              {item.isBought ? 'Alındı' : 'Alınmadı'}
            </button>
          </div>

          <div className="space-y-6">
            {item.notes && (
              <div>
                <h4 className="text-xs font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FileText size={14} />
                  Notlar
                </h4>
                <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                  {item.notes}
                </div>
              </div>
            )}

            {item.link && (
              <div>
                <h4 className="text-xs font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <LinkIcon size={14} />
                  Ürün Linki
                </h4>
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all group"
                >
                  <span className="text-sm font-medium truncate flex-1 mr-4">{item.link}</span>
                  <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => onEdit(item)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-2xl font-bold hover:opacity-90 transition-opacity"
              >
                <Edit2 size={18} />
                Düzenle
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 rounded-2xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ManageCategoriesModal({ 
  categories, 
  setCategories, 
  onClose,
  items,
  setItems
}: { 
  categories: Category[], 
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>, 
  onClose: () => void,
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}) {
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    
    if (categories.includes(trimmed)) {
      setError('Bu kategori zaten mevcut.');
      return;
    }
    
    setCategories(prev => [...prev, trimmed]);
    setNewCategory('');
    setError('');
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    if (categoryToDelete === 'Diğer') {
      alert('"Diğer" kategorisi silinemez.');
      return;
    }

    const hasItems = items.some(item => item.category === categoryToDelete);
    if (hasItems) {
      if (!window.confirm(`Bu kategoride ürünler var. Kategoriyi silerseniz ürünler "Diğer" kategorisine taşınacaktır. Onaylıyor musunuz?`)) {
        return;
      }
      setItems(prev => prev.map(item => item.category === categoryToDelete ? { ...item, category: 'Diğer' } : item));
    }

    setCategories(prev => prev.filter(c => c !== categoryToDelete));
  };

  const startEditing = (category: string) => {
    if (category === 'Diğer') {
      alert('"Diğer" kategorisi yeniden adlandırılamaz.');
      return;
    }
    setEditingCategory(category);
    setEditCategoryName(category);
  };

  const handleRenameCategory = (oldName: string) => {
    const trimmed = editCategoryName.trim();
    if (!trimmed || trimmed === oldName) {
      setEditingCategory(null);
      return;
    }
    
    if (categories.includes(trimmed)) {
      alert('Bu kategori zaten mevcut.');
      return;
    }

    setCategories(prev => prev.map(c => c === oldName ? trimmed : c));
    setItems(prev => prev.map(item => item.category === oldName ? { ...item, category: trimmed } : item));
    
    setEditingCategory(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] border dark:border-stone-800"
      >
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Settings size={20} className="text-stone-500 dark:text-stone-400" />
            Kategorileri Yönet
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleAddCategory} className="mb-6">
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Yeni Kategori Ekle</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newCategory}
                onChange={e => {
                  setNewCategory(e.target.value);
                  setError('');
                }}
                className="flex-1 px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all"
                placeholder="Kategori adı..."
              />
              <button 
                type="submit"
                disabled={!newCategory.trim()}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ekle
              </button>
            </div>
            {error && <p className="text-accent-500 text-xs mt-1">{error}</p>}
          </form>

          <div>
            <h3 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">Mevcut Kategoriler</h3>
            <ul className="space-y-2">
              {categories.map(category => {
                const itemCount = items.filter(i => i.category === category).length;
                const isDefault = CATEGORIES.includes(category);
                
                return (
                  <li key={category} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800">
                    {editingCategory === category ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={e => setEditCategoryName(e.target.value)}
                          className="flex-1 px-2 py-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all text-sm dark:text-stone-200"
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') handleRenameCategory(category);
                            if (e.key === 'Escape') setEditingCategory(null);
                          }}
                        />
                        <button
                          onClick={() => handleRenameCategory(category)}
                          className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                          title="Kaydet"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="p-1.5 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                          title="İptal"
                        >
                          <Plus size={16} className="rotate-45" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className={getCategoryColor(category)}>
                            {React.cloneElement(getCategoryIcon(category) as React.ReactElement, { size: 16 })}
                          </span>
                          <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{category}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryBgColor(category)}`}>
                            {itemCount} ürün
                          </span>
                        </div>
                        {category !== 'Diğer' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEditing(category)}
                              className="p-1.5 text-stone-400 dark:text-stone-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="Düzenle"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="p-1.5 text-stone-400 dark:text-stone-500 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/30 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BudgetAnalysisModal({ 
  onClose, 
  stats, 
  budget, 
  categoryStats, 
  formatCurrency 
}: { 
  onClose: () => void, 
  stats: any, 
  budget: number, 
  categoryStats: any[], 
  formatCurrency: (val: number) => string 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-stone-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border dark:border-stone-800 flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <Wallet className="text-emerald-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">Bütçe Analizi</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">Harcamalarınızın detaylı bütçe görünümü</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
              <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest font-bold mb-1">Toplam Bütçe</p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{formatCurrency(budget)}</p>
            </div>
            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
              <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest font-bold mb-1">Harcanan Tutar</p>
              <p className="text-xl font-bold text-accent-600 dark:text-accent-400">{formatCurrency(stats.totalSpent)}</p>
            </div>
          </div>

          {/* Total Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Genel Bütçe Kullanımı</h3>
              <span className={`text-sm font-bold ${stats.totalSpent > budget ? 'text-accent-500' : 'text-emerald-500'}`}>
                %{budget > 0 ? Math.round((stats.totalSpent / budget) * 100) : 0}
              </span>
            </div>
            <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden border border-stone-200 dark:border-stone-700">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, budget > 0 ? (stats.totalSpent / budget) * 100 : 0)}%` }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className={`h-full rounded-full ${stats.totalSpent > budget ? 'bg-accent-500' : 'bg-emerald-500'}`}
              />
            </div>
            {stats.totalSpent > budget && (
              <div className="p-3 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-100 dark:border-accent-900/30 flex items-center gap-2 text-accent-600 dark:text-accent-400 text-xs font-medium">
                <Info size={14} />
                Bütçenizi {formatCurrency(stats.totalSpent - budget)} tutarında aştınız.
              </div>
            )}
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              Kategori Bazlı Harcama
            </h3>
            <div className="space-y-6">
              {categoryStats.filter(s => s.estimatedTotal > 0).map(stat => (
                <div key={stat.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${getCategoryBgColor(stat.category)}`}>
                        {React.cloneElement(getCategoryIcon(stat.category) as React.ReactElement, { size: 14 })}
                      </div>
                      <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{stat.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{formatCurrency(stat.spent)}</p>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500">Tahmini Toplam: {formatCurrency(stat.estimatedTotal)}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, budget > 0 ? (stat.spent / budget) * 100 : 0)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${getCategoryBgColorSolid(stat.category)}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-stone-100 dark:border-stone-800 shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-2xl font-bold hover:opacity-90 transition-opacity"
          >
            Anladım
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ProgressReportModal({ 
  onClose, 
  stats,
  categoryStats
}: { 
  onClose: () => void, 
  stats: any,
  categoryStats: any[]
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-50 dark:bg-accent-900/20 rounded-xl">
              <PieChart className="text-accent-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">Detaylı İlerleme Raporu</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">Çeyiz hazırlığındaki güncel durumunuz</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Overall Progress */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-accent-500 rounded-full" />
              Genel Durum
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-accent-50/50 dark:bg-accent-900/10 rounded-2xl border border-accent-100/50 dark:border-accent-900/20">
                <div className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-1">Tamamlanma Oranı</div>
                <div className="text-3xl font-bold text-accent-700 dark:text-accent-300">%{stats.completionRate}</div>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-1">Alınan Ürünler</div>
                <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">{stats.boughtItems} <span className="text-sm font-normal text-stone-400">/ {stats.totalItems}</span></div>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-1">Kalan Ürünler</div>
                <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">{stats.remainingItems}</div>
              </div>
            </div>
          </div>

          {/* Category Progress */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full" />
              Kategori Bazlı İlerleme
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {categoryStats.map((cat) => (
                <div key={cat.category} className="p-4 bg-white dark:bg-stone-800/30 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryBgColor(cat.category)}`}>
                        {getCategoryIcon(cat.category)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">{cat.category}</div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400">{cat.bought} / {cat.total} Ürün Alındı</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-stone-900 dark:text-stone-100">%{cat.percentage}</div>
                    </div>
                  </div>
                  <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        cat.percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-stone-50 dark:bg-stone-800/30 border-t border-stone-100 dark:border-stone-800 shrink-0">
          <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400">
            <Info size={16} />
            <p className="text-xs leading-relaxed">
              Bu rapor, çeyiz listenizdeki her kategorinin tamamlanma durumunu gösterir. %100'e ulaşan kategoriler yeşil ile işaretlenir.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, subtitle, valueColor = "text-stone-900", onClick }: { title: string, value: string | number, subtitle?: string, valueColor?: string, onClick?: () => void }) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component 
      onClick={onClick}
      className={`bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between text-left transition-all ${onClick ? 'cursor-pointer hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md' : ''}`}
    >
      <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">{title}</h3>
      <div>
        <div className={`text-2xl font-semibold tracking-tight ${valueColor.includes('text-stone-900') ? 'text-stone-900 dark:text-stone-100' : valueColor}`}>{value}</div>
        {subtitle && <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">{subtitle}</div>}
      </div>
    </Component>
  );
}

function ItemListModal({ 
  title, 
  items, 
  onClose,
  toggleItemStatus,
  formatCurrency
}: { 
  title: string, 
  items: Item[], 
  onClose: () => void,
  toggleItemStatus: (id: string) => void,
  formatCurrency: (amount: number) => string
}) {
  const groupedItems = useMemo(() => {
    const groups: Record<string, Item[]> = {};
    items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [items]);

  const categoriesInList = Object.keys(groupedItems).sort();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] border dark:border-stone-800"
      >
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center flex-shrink-0 bg-stone-50/50 dark:bg-stone-800/50">
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{title}</h2>
            <p className="text-[10px] text-stone-500 dark:text-stone-400">{items.length} ürün listeleniyor</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto mb-4 text-stone-200 dark:text-stone-800" />
              <p className="text-stone-500 dark:text-stone-400">Bu listede ürün bulunmuyor.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {categoriesInList.map(category => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2 px-2">
                    <div className={`w-1.5 h-4 rounded-full ${getCategoryColor(category).replace('text-', 'bg-')}`} />
                    <h3 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                      {category}
                      <span className="ml-2 text-[10px] font-normal opacity-60">({groupedItems[category].length})</span>
                    </h3>
                  </div>
                  <ul className="divide-y divide-stone-100 dark:divide-stone-800 bg-stone-50/50 dark:bg-stone-800/30 rounded-2xl border border-stone-100 dark:border-stone-800 overflow-hidden">
                    {groupedItems[category].map(item => (
                      <li key={item.id} className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-white dark:hover:bg-stone-800 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <button 
                            onClick={() => toggleItemStatus(item.id)}
                            className={`flex-shrink-0 transition-colors ${item.isBought ? 'text-emerald-500' : 'text-stone-300 dark:text-stone-700 hover:text-stone-400 dark:hover:text-stone-600'}`}
                          >
                            {item.isBought ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                          </button>
                          <div className="min-w-0">
                            <p className={`text-sm font-medium truncate ${item.isBought ? 'text-stone-500 dark:text-stone-500 line-through' : 'text-stone-900 dark:text-stone-100'}`}>
                              {item.name}
                            </p>
                            {item.notes && <p className="text-[10px] text-stone-400 dark:text-stone-500 truncate">{item.notes}</p>}
                          </div>
                        </div>
                        <span className={`text-sm font-bold whitespace-nowrap ${item.isBought ? 'text-stone-400 dark:text-stone-600' : 'text-stone-900 dark:text-stone-100'}`}>
                          {formatCurrency(item.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ItemModal({ 
  onClose, 
  onSubmit, 
  item, 
  title, 
  categories
}: { 
  onClose: () => void, 
  onSubmit: (item: any) => void, 
  item?: Item, 
  title: string, 
  categories: Category[]
}) {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState<Category>(item?.category || categories[0] || CATEGORIES[0]);
  const [price, setPrice] = useState(item?.price.toString() || '');
  const [notes, setNotes] = useState(item?.notes || '');
  const [link, setLink] = useState(item?.link || '');
  const [image, setImage] = useState(item?.image || '');
  const [imageAlt, setImageAlt] = useState(item?.imageAlt || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;
    
    onSubmit({
      ...(item ? { id: item.id, isBought: item.isBought, createdAt: item.createdAt } : { isBought: false }),
      name: name.trim(),
      category,
      price: Number(price),
      notes: notes.trim() || undefined,
      link: link.trim() || undefined,
      image: image || undefined,
      imageAlt: imageAlt.trim() || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border dark:border-stone-800"
      >
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{title}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Ürün Adı</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all"
              placeholder="Örn: Yemek Takımı"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Kategori</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Tahmini/Gerçek Tutar (TL)</label>
            <input 
              type="number" 
              required
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Ürün Linki (İsteğe Bağlı)</label>
            <input 
              type="url" 
              value={link}
              onChange={e => setLink(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Notlar (İsteğe Bağlı)</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all resize-none"
              placeholder="Marka, model, renk vb. detaylar..."
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Ürün Görseli</label>
            <div className="flex items-center gap-4">
              {image && (
                <label className="cursor-pointer relative group block flex-shrink-0">
                  <img src={image} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-stone-200 dark:border-stone-800" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImagePlus size={16} className="text-white" />
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
              <label className="flex-1 flex items-center justify-center px-4 py-2 border border-dashed border-stone-300 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer transition-colors">
                <span className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-2">
                  <ImagePlus size={18} />
                  {image ? 'Görseli Değiştir' : 'Görsel Ekle'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
          {image && (
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Görsel Alternatif Metni (Erişilebilirlik)</label>
              <input 
                type="text" 
                value={imageAlt}
                onChange={e => setImageAlt(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:text-stone-200 transition-all"
                placeholder="Görseli betimleyin (örn: Beyaz porselen yemek takımı)"
              />
            </div>
          )}
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 rounded-xl font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              İptal
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ThemeModal({
  onClose,
  currentTheme,
  onThemeChange
}: {
  onClose: () => void,
  currentTheme: string,
  onThemeChange: (theme: 'rose' | 'emerald' | 'indigo' | 'amber' | 'violet' | 'slate') => void
}) {
  const themes = [
    { id: 'rose', name: 'Gül (Varsayılan)', color: 'bg-rose-500' },
    { id: 'emerald', name: 'Zümrüt', color: 'bg-emerald-500' },
    { id: 'indigo', name: 'Çivit', color: 'bg-indigo-500' },
    { id: 'amber', name: 'Kehribar', color: 'bg-amber-500' },
    { id: 'violet', name: 'Menekşe', color: 'bg-violet-500' },
    { id: 'slate', name: 'Arduvaz', color: 'bg-slate-500' },
  ];

  return (
    <div className="fixed inset-0 bg-stone-900/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-800/50">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-white flex items-center gap-2">
            <Palette size={20} className="text-accent-500" />
            Tema Ayarları
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
          >
            <Plus className="rotate-45" size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme.id as any)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  currentTheme === theme.id 
                    ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300' 
                    : 'border-stone-200 dark:border-stone-700 hover:border-accent-200 dark:hover:border-accent-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${theme.color} shadow-sm flex items-center justify-center`}>
                  {currentTheme === theme.id && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <span className="font-medium text-sm">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BudgetModal({ 
  onClose, 
  onSubmit, 
  currentBudget,
  onReset,
  items,
  categories,
  onImport,
  onClearBought
}: { 
  onClose: () => void, 
  onSubmit: (budget: number) => void, 
  currentBudget: number,
  onReset: () => void,
  items: Item[],
  categories: Category[],
  onImport: (data: any) => void,
  onClearBought: () => void
}) {
  const [budget, setBudget] = useState(currentBudget.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;
    onSubmit(Number(budget));
    onClose();
  };

  const exportToJSON = () => {
    const data = {
      items,
      budget: currentBudget,
      categories,
      exportDate: new Date().toISOString(),
      version: '2.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ceyiz_listem_yedek_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const headers = ['Ürün Adı', 'Kategori', 'Fiyat (TL)', 'Durum', 'Notlar', 'Link', 'Eklenme Tarihi'];
    const rows = items.map(item => [
      item.name,
      item.category,
      item.price,
      item.isBought ? 'Alındı' : 'Alınacak',
      item.notes || '',
      item.link || '',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString('tr-TR') : ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ceyiz_listem_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (window.confirm('Mevcut verileriniz üzerine yazılacak. Devam etmek istiyor musunuz?')) {
          onImport(data);
          onClose();
        }
      } catch (error) {
        alert('Geçersiz dosya formatı. Lütfen geçerli bir JSON yedeği seçin.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border dark:border-stone-800"
      >
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Wallet size={20} className="text-accent-500" />
            Ayarlar & Bütçe
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Toplam Bütçe (TL)</label>
              <input 
                type="number" 
                required
                min="0"
                step="100"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all text-lg font-medium dark:text-stone-100"
                placeholder="0.00"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors"
            >
              Bütçeyi Güncelle
            </button>
          </form>

          <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-3">Veri Aktar / Yedekle</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={exportToJSON}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                <FileJson size={16} className="text-indigo-500" />
                JSON İndir
              </button>
              <button 
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                <FileSpreadsheet size={16} className="text-emerald-500" />
                CSV İndir
              </button>
              <label className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 rounded-xl text-xs font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                <Upload size={16} className="text-amber-500" />
                Yedek Yükle (JSON)
                <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-3">Tehlikeli Bölge</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  if (window.confirm('Tüm ürünlerin "Alındı" işaretleri kaldırılacaktır. Onaylıyor musunuz?')) {
                    onClearBought();
                    onClose();
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl font-medium hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors text-sm"
              >
                <Circle size={16} />
                İşaretli Ürünleri Temizle
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Tüm verileriniz (ürünler, bütçe ve kategoriler) silinecek ve varsayılan ayarlara dönülecektir. Bu işlem geri alınamaz. Onaylıyor musunuz?')) {
                    onReset();
                    onClose();
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-accent-200 dark:border-accent-900/30 text-accent-600 dark:text-accent-400 rounded-xl font-medium hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors text-sm"
              >
                <Trash2 size={16} />
                Tüm Verileri Sıfırla
              </button>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 text-center flex items-center justify-center gap-1">
                <CheckCircle2 size={10} className="text-emerald-500" />
                Tüm değişiklikler otomatik olarak tarayıcınıza kaydedilir.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ReportModal({
  items,
  budget,
  stats,
  categories,
  onClose,
  formatCurrency
}: {
  items: Item[],
  budget: number,
  stats: any,
  categories: Category[],
  onClose: () => void,
  formatCurrency: (amount: number) => string
}) {
  const categoryStats = useMemo(() => {
    return categories.map(category => {
      const categoryItems = items.filter(i => i.category === category);
      const total = categoryItems.length;
      const bought = categoryItems.filter(i => i.isBought).length;
      const spent = categoryItems.filter(i => i.isBought).reduce((sum, item) => sum + item.price, 0);
      const remainingCost = categoryItems.filter(i => !i.isBought).reduce((sum, item) => sum + item.price, 0);
      const completionRate = total === 0 ? 0 : Math.round((bought / total) * 100);

      return {
        category,
        total,
        bought,
        spent,
        remainingCost,
        completionRate
      };
    }).filter(stat => stat.total > 0).sort((a, b) => b.spent - a.spent);
  }, [items, categories]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border dark:border-stone-800"
      >
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <FileText size={20} className="text-accent-500" />
            Çeyiz Raporu
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* Overall Summary */}
          <section>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">Genel Özet</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-800">
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Toplam Bütçe</p>
                <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">{formatCurrency(budget)}</p>
              </div>
              <div className="bg-accent-50 dark:bg-accent-900/20 p-4 rounded-xl border border-accent-100 dark:border-accent-900/30">
                <p className="text-xs text-accent-600 dark:text-accent-400 mb-1">Harcanan</p>
                <p className="text-lg font-semibold text-accent-700 dark:text-accent-300">{formatCurrency(stats.totalSpent)}</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">Kalan Bütçe</p>
                <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{formatCurrency(stats.remainingBudget)}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">İlerleme</p>
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">%{stats.completionRate}</p>
                <p className="text-[10px] text-blue-500 dark:text-blue-400 mt-0.5">{stats.boughtItems} / {stats.totalItems} ürün</p>
              </div>
            </div>
          </section>

          {/* Category Breakdown */}
          <section>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">Kategori Dağılımı</h3>
            {categoryStats.length === 0 ? (
              <p className="text-stone-500 dark:text-stone-400 text-sm text-center py-4">Henüz ürün eklenmemiş.</p>
            ) : (
              <div className="space-y-4">
                {categoryStats.map(stat => (
                  <div key={stat.category} className="bg-white dark:bg-stone-800/30 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className={getCategoryColor(stat.category)}>
                          {React.cloneElement(getCategoryIcon(stat.category) as React.ReactElement, { size: 18 })}
                        </span>
                        <h4 className="font-medium text-stone-900 dark:text-stone-100">{stat.category}</h4>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${getCategoryBgColor(stat.category)}`}>
                        {stat.bought} / {stat.total} ürün
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Harcanan</p>
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{formatCurrency(stat.spent)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Kalan Tahmini Maliyet</p>
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{formatCurrency(stat.remainingCost)}</p>
                      </div>
                    </div>

                    <div className="h-2 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getCategoryColor(stat.category).replace('text-', 'bg-')}`}
                        style={{ width: `${stat.completionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  );
}
