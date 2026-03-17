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
  FileText
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
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'Tümü'>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ id: string, message: string, itemId: string } | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [isGroupedByCategory, setIsGroupedByCategory] = useState(false);
  const [viewingItemsType, setViewingItemsType] = useState<'bought' | 'remaining' | null>(null);

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

  const filteredItems = useMemo(() => {
    let result = items;
    if (activeCategory !== 'Tümü') {
      result = result.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        (item.notes && item.notes.toLowerCase().includes(lowerQuery))
      );
    }
    return result;
  }, [items, activeCategory, searchQuery]);

  const groupedItems = useMemo(() => {
    if (!isGroupedByCategory) return null;
    const groups = {} as Record<Category, Item[]>;
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems, isGroupedByCategory]);

  const renderItem = (item: Item) => (
    <motion.li 
      key={item.id}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative flex flex-col p-4 hover:bg-stone-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${item.isBought ? 'bg-stone-50/50' : ''}`}
    >
      <div className="flex items-center gap-4 w-full">
        <button 
          onClick={() => toggleItemStatus(item.id)}
          className={`flex-shrink-0 transition-colors ${item.isBought ? 'text-emerald-500' : 'text-stone-300 hover:text-stone-400'}`}
        >
          {item.isBought ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-stone-200 flex-shrink-0" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0 text-stone-400">
            <ImageIcon size={20} />
          </div>
        )}
        
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setExpandedItemId(prev => prev === item.id ? null : item.id)}
        >
          <div className="flex items-center gap-2">
            <p className={`text-sm font-medium truncate ${item.isBought ? 'text-stone-500 line-through' : 'text-stone-900'}`}>
              {item.name}
            </p>
            {item.link && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                title="Ürün Linkine Git"
              >
                <LinkIcon size={14} />
              </a>
            )}
            {item.notes && (
              <Info size={14} className="text-stone-400" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-600">
              {React.cloneElement(getCategoryIcon(item.category) as React.ReactElement, { size: 12 })}
              {item.category}
            </span>
            <span className={`text-xs font-medium ${item.isBought ? 'text-stone-400' : 'text-stone-600'}`}>
              {formatCurrency(item.price)}
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-2 transition-opacity ${expandedItemId === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <button 
            onClick={() => setEditingItem(item)}
            className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDeleteItem(item.id)}
            className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={() => setExpandedItemId(prev => prev === item.id ? null : item.id)}
            className={`p-2 rounded-lg transition-colors ${expandedItemId === item.id ? 'text-stone-900 bg-stone-100' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'}`}
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
            <div className="pt-4 mt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-6 pl-[3.25rem]">
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info size={14} className="text-stone-400" />
                  Ürün Bilgisi
                </h4>
                <div className="space-y-3">
                  {item.link && (
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <LinkIcon size={14} />
                      Ürün Linkine Git
                    </a>
                  )}
                  <p className="text-sm text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    {item.notes || 'Bu ürün için henüz not eklenmemiş.'}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Search size={14} className="text-stone-400" />
                  Fiyat Araştır
                </h4>
                <div className="flex flex-wrap gap-2">
                  <a href={`https://www.trendyol.com/sr?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white border border-stone-200 text-stone-700 text-xs font-medium rounded-xl hover:border-[#F27A1A] hover:text-[#F27A1A] transition-colors flex items-center gap-1.5 shadow-sm">
                    Trendyol <ExternalLink size={12} />
                  </a>
                  <a href={`https://www.hepsiburada.com/ara?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white border border-stone-200 text-stone-700 text-xs font-medium rounded-xl hover:border-[#FF6000] hover:text-[#FF6000] transition-colors flex items-center gap-1.5 shadow-sm">
                    Hepsiburada <ExternalLink size={12} />
                  </a>
                  <a href={`https://www.amazon.com.tr/s?k=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white border border-stone-200 text-stone-700 text-xs font-medium rounded-xl hover:border-[#232F3E] hover:text-[#232F3E] transition-colors flex items-center gap-1.5 shadow-sm">
                    Amazon <ExternalLink size={12} />
                  </a>
                  <a href={`https://www.n11.com/arama?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white border border-stone-200 text-stone-700 text-xs font-medium rounded-xl hover:border-[#5C3EBC] hover:text-[#5C3EBC] transition-colors flex items-center gap-1.5 shadow-sm">
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

  const handleAddItem = (item: Omit<Item, 'id'>) => {
    const newItem = { ...item, id: crypto.randomUUID() };
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
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200">
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
              className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
            >
              Geri Al
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
              <ShoppingBag size={20} />
            </div>
            <h1 className="text-xl font-semibold text-stone-900 tracking-tight">Çeyiz Listem</h1>
          </div>
          <button 
            onClick={() => setIsBudgetModalOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors px-3 py-2 rounded-md hover:bg-stone-100"
          >
            <Settings size={18} />
            <span className="hidden sm:inline">Bütçe Ayarları</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dashboard Stats */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-stone-900 flex items-center gap-2">
              <PieChart size={20} className="text-rose-500" />
              Genel Bakış
            </h2>
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 rounded-lg transition-colors"
            >
              <FileText size={16} />
              Detaylı Rapor
            </button>
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
              valueColor="text-rose-600"
            />
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-stone-500">İlerleme</span>
              <span className="text-stone-900">{stats.completionRate}%</span>
            </div>
            <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.completionRate}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Filters and List */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-medium text-stone-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-rose-500" />
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
                  className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm w-full sm:w-auto whitespace-nowrap"
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
                      ? 'bg-rose-100 text-rose-700 shadow-sm ring-1 ring-rose-200' 
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {getCategoryIcon(category)}
                  {category}
                </button>
              ))}
              <button
                onClick={() => setIsManageCategoriesModalOpen(true)}
                className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                title="Kategorileri Yönet"
              >
                <Settings size={16} />
              </button>
            </div>
            
            <button
              onClick={() => setIsGroupedByCategory(!isGroupedByCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                isGroupedByCategory
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Layers size={16} />
              Kategorilere Göre Grupla
            </button>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-stone-500">
                <ShoppingBag size={48} className="mx-auto mb-4 text-stone-300" />
                <p>Bu kategoride henüz ürün yok.</p>
              </div>
            ) : isGroupedByCategory && groupedItems ? (
              <div className="p-4 sm:p-6 space-y-8">
                {categories.map(category => {
                  const items = groupedItems[category];
                  if (!items?.length) return null;
                  return (
                    <div key={category} className="space-y-3">
                      <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2 px-2">
                        {React.cloneElement(getCategoryIcon(category) as React.ReactElement, { size: 16 })}
                        {category}
                        <span className="text-stone-400 font-normal text-xs ml-1">({items.length})</span>
                      </h3>
                      <ul className="divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                        <AnimatePresence>
                          {items.map(item => renderItem(item))}
                        </AnimatePresence>
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <ul className="divide-y divide-stone-100">
                <AnimatePresence>
                  {filteredItems.map(item => renderItem(item))}
                </AnimatePresence>
              </ul>
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
        {isBudgetModalOpen && (
          <BudgetModal 
            currentBudget={budget}
            onClose={() => setIsBudgetModalOpen(false)}
            onSubmit={setBudget}
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
      </AnimatePresence>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <Settings size={20} className="text-stone-500" />
            Kategorileri Yönet
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleAddCategory} className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-1">Yeni Kategori Ekle</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newCategory}
                onChange={e => {
                  setNewCategory(e.target.value);
                  setError('');
                }}
                className="flex-1 px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                placeholder="Kategori adı..."
              />
              <button 
                type="submit"
                disabled={!newCategory.trim()}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ekle
              </button>
            </div>
            {error && <p className="text-rose-500 text-xs mt-1">{error}</p>}
          </form>

          <div>
            <h3 className="text-sm font-medium text-stone-700 mb-3">Mevcut Kategoriler</h3>
            <ul className="space-y-2">
              {categories.map(category => {
                const itemCount = items.filter(i => i.category === category).length;
                const isDefault = CATEGORIES.includes(category);
                
                return (
                  <li key={category} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                    {editingCategory === category ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={e => setEditCategoryName(e.target.value)}
                          className="flex-1 px-2 py-1 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm"
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') handleRenameCategory(category);
                            if (e.key === 'Escape') setEditingCategory(null);
                          }}
                        />
                        <button
                          onClick={() => handleRenameCategory(category)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Kaydet"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="p-1.5 text-stone-400 hover:bg-stone-100 rounded-lg transition-colors"
                          title="İptal"
                        >
                          <Plus size={16} className="rotate-45" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-stone-500">
                            {React.cloneElement(getCategoryIcon(category) as React.ReactElement, { size: 16 })}
                          </span>
                          <span className="text-sm font-medium text-stone-900">{category}</span>
                          <span className="text-xs text-stone-500 bg-stone-200/50 px-2 py-0.5 rounded-full">
                            {itemCount} ürün
                          </span>
                        </div>
                        {category !== 'Diğer' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEditing(category)}
                              className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Düzenle"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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

function StatCard({ title, value, subtitle, valueColor = "text-stone-900", onClick }: { title: string, value: string | number, subtitle?: string, valueColor?: string, onClick?: () => void }) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component 
      onClick={onClick}
      className={`bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between text-left ${onClick ? 'cursor-pointer hover:border-stone-300 hover:shadow-md transition-all' : ''}`}
    >
      <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">{title}</h3>
      <div>
        <div className={`text-2xl font-semibold tracking-tight ${valueColor}`}>{value}</div>
        {subtitle && <div className="text-xs text-stone-500 mt-1">{subtitle}</div>}
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <p className="text-stone-500 text-center py-8">Bu listede ürün bulunmuyor.</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {items.map(item => (
                <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <button 
                      onClick={() => toggleItemStatus(item.id)}
                      className={`flex-shrink-0 transition-colors ${item.isBought ? 'text-emerald-500' : 'text-stone-300 hover:text-stone-400'}`}
                    >
                      {item.isBought ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${item.isBought ? 'text-stone-500 line-through' : 'text-stone-900'}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-500">{item.category}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${item.isBought ? 'text-stone-400' : 'text-stone-600'}`}>
                    {formatCurrency(item.price)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ItemModal({ onClose, onSubmit, item, title, categories }: { onClose: () => void, onSubmit: (item: any) => void, item?: Item, title: string, categories: Category[] }) {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState<Category>(item?.category || categories[0] || CATEGORIES[0]);
  const [price, setPrice] = useState(item?.price.toString() || '');
  const [notes, setNotes] = useState(item?.notes || '');
  const [link, setLink] = useState(item?.link || '');
  const [image, setImage] = useState(item?.image || '');

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
      ...(item ? { id: item.id, isBought: item.isBought } : { isBought: false }),
      name: name.trim(),
      category,
      price: Number(price),
      notes: notes.trim() || undefined,
      link: link.trim() || undefined,
      image: image || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ürün Adı</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              placeholder="Örn: Yemek Takımı"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Kategori</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-white"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Tahmini/Gerçek Tutar (TL)</label>
            <input 
              type="number" 
              required
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ürün Linki (İsteğe Bağlı)</label>
            <input 
              type="url" 
              value={link}
              onChange={e => setLink(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Notlar (İsteğe Bağlı)</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
              placeholder="Marka, model, renk vb. detaylar..."
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ürün Görseli</label>
            <div className="flex items-center gap-4">
              {image && (
                <label className="cursor-pointer relative group block flex-shrink-0">
                  <img src={image} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-stone-200" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImagePlus size={16} className="text-white" />
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
              <label className="flex-1 flex items-center justify-center px-4 py-2 border border-dashed border-stone-300 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors">
                <span className="text-sm text-stone-600 flex items-center gap-2">
                  <ImagePlus size={18} />
                  {image ? 'Görseli Değiştir' : 'Görsel Ekle'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-stone-200 text-stone-600 rounded-xl font-medium hover:bg-stone-50 transition-colors"
            >
              İptal
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function BudgetModal({ onClose, onSubmit, currentBudget }: { onClose: () => void, onSubmit: (budget: number) => void, currentBudget: number }) {
  const [budget, setBudget] = useState(currentBudget.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;
    onSubmit(Number(budget));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <Wallet size={20} className="text-rose-500" />
            Bütçe Ayarları
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Toplam Bütçe (TL)</label>
            <input 
              type="number" 
              required
              min="0"
              step="100"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-lg font-medium"
              placeholder="0.00"
            />
            <p className="mt-2 text-xs text-stone-500">
              Çeyiz alışverişiniz için ayırdığınız toplam bütçeyi belirleyin. Bu tutar, ilerleme çubuğunda ve kalan bütçe hesaplamalarında kullanılacaktır.
            </p>
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-stone-200 text-stone-600 rounded-xl font-medium hover:bg-stone-50 transition-colors"
            >
              İptal
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <FileText size={20} className="text-rose-500" />
            Çeyiz Raporu
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* Overall Summary */}
          <section>
            <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Genel Özet</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                <p className="text-xs text-stone-500 mb-1">Toplam Bütçe</p>
                <p className="text-lg font-semibold text-stone-900">{formatCurrency(budget)}</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                <p className="text-xs text-rose-600 mb-1">Harcanan</p>
                <p className="text-lg font-semibold text-rose-700">{formatCurrency(stats.totalSpent)}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-600 mb-1">Kalan Bütçe</p>
                <p className="text-lg font-semibold text-emerald-700">{formatCurrency(stats.remainingBudget)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-600 mb-1">İlerleme</p>
                <p className="text-lg font-semibold text-blue-700">%{stats.completionRate}</p>
                <p className="text-[10px] text-blue-500 mt-0.5">{stats.boughtItems} / {stats.totalItems} ürün</p>
              </div>
            </div>
          </section>

          {/* Category Breakdown */}
          <section>
            <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Kategori Dağılımı</h3>
            {categoryStats.length === 0 ? (
              <p className="text-stone-500 text-sm text-center py-4">Henüz ürün eklenmemiş.</p>
            ) : (
              <div className="space-y-4">
                {categoryStats.map(stat => (
                  <div key={stat.category} className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">
                          {React.cloneElement(getCategoryIcon(stat.category) as React.ReactElement, { size: 18 })}
                        </span>
                        <h4 className="font-medium text-stone-900">{stat.category}</h4>
                      </div>
                      <span className="text-xs font-medium bg-stone-100 text-stone-600 px-2 py-1 rounded-md">
                        {stat.bought} / {stat.total} ürün
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-stone-500">Harcanan</p>
                        <p className="text-sm font-semibold text-stone-900">{formatCurrency(stat.spent)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500">Kalan Tahmini Maliyet</p>
                        <p className="text-sm font-semibold text-stone-900">{formatCurrency(stat.remainingCost)}</p>
                      </div>
                    </div>

                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-rose-400 rounded-full"
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
