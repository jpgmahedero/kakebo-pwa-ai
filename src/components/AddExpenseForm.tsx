import { useState, useEffect } from 'react';
import { X, MapPin, Store, User, Calendar, Tag, Plus, ChevronRight } from 'lucide-react';
import { useExpenseStore } from '../store/useExpenseStore';
import type { ExpenseType, Category, SubCategory } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (expenseData: any) => void;
}

export function AddExpenseForm({ isOpen, onClose, onSave }: Props) {
  const { categories, subCategories, addCategory, addSubCategory } = useExpenseStore();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [whoPaid, setWhoPaid] = useState('Jose');
  const [knownPlace, setKnownPlace] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<ExpenseType>('variable');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  
  // State for new category/subcategory creation
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingNewSubCategory, setIsAddingNewSubCategory] = useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');

  // Set default category if not set
  useEffect(() => {
    if (!categoryId && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  // Filter subcategories based on selected category
  const filteredSubCategories = subCategories.filter(sub => sub.categoryId === categoryId);

  // Set default subcategory when category changes
  useEffect(() => {
    if (categoryId) {
      const firstSub = subCategories.find(sub => sub.categoryId === categoryId);
      if (firstSub) {
        setSubCategoryId(firstSub.id);
      } else {
        setSubCategoryId('');
      }
    }
  }, [categoryId, subCategories]);

  if (!isOpen) return null;

  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCat: Category = {
      id: crypto.randomUUID(),
      name: newCategoryName.trim(),
      color: '#6366F1',
      icon: 'Tag'
    };
    
    addCategory(newCat);
    setCategoryId(newCat.id);
    setNewCategoryName('');
    setIsAddingNewCategory(false);
  };

  const handleAddNewSubCategory = () => {
    if (!newSubCategoryName.trim() || !categoryId) return;
    
    const newSub: SubCategory = {
      id: crypto.randomUUID(),
      categoryId,
      name: newSubCategoryName.trim()
    };
    
    addSubCategory(newSub);
    setSubCategoryId(newSub.id);
    setNewSubCategoryName('');
    setIsAddingNewSubCategory(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !categoryId) return;

    onSave({
      amount: parseFloat(amount),
      description,
      categoryId,
      subCategoryId,
      date: new Date(date).toISOString(),
      type,
      knownPlace,
      location,
      whoPaid,
      paymentMethod: 'Tarjeta',
    });

    // Reset form
    setAmount('');
    setDescription('');
    setWhoPaid('Jose');
    setKnownPlace('');
    setLocation('');
    setDate(new Date().toISOString().slice(0, 16));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200 my-auto">
        
        <div className="px-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 pt-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Nuevo Gasto</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-['Inter']">Cantidad</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-medium">€</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-2xl font-bold text-gray-900 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
                  autoFocus
                />
              </div>
            </div>
            <div className="w-32">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-['Inter']">Tipo</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value as ExpenseType)}
                className="w-full px-3 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold text-gray-700 focus:ring-4 focus:ring-indigo-600/10 transition-all appearance-none"
              >
                <option value="variable">Variables</option>
                <option value="fixed">Fijo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1 font-['Inter']">
                <Calendar className="w-3 h-3 text-indigo-500" /> Fecha y Hora
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1 font-['Inter']">
                <User className="w-3 h-3 text-indigo-500" /> Quién pagó
              </label>
              <input
                type="text"
                value={whoPaid}
                onChange={(e) => setWhoPaid(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-['Inter']">Descripción</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Cena en restaurante"
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1 font-['Inter']">
                <Store className="w-3 h-3 text-indigo-500" /> Sitio
              </label>
              <input
                type="text"
                value={knownPlace}
                onChange={(e) => setKnownPlace(e.target.value)}
                placeholder="Ej. Mercadona"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1 font-['Inter']">
                <MapPin className="w-3 h-3 text-indigo-500" /> Ubicación
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ciudad, Calle..."
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 font-['Inter']">
                <Tag className="w-3 h-3 text-indigo-500" /> Categoría Principal
              </label>
              
              <div className="flex bg-gray-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar gap-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategoryId(cat.id);
                      setIsAddingNewCategory(false);
                      setIsAddingNewSubCategory(false);
                    }}
                    className={`whitespace-nowrap py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                      categoryId === cat.id ? 'bg-white text-indigo-600 shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsAddingNewCategory(true)}
                  className="p-2 rounded-xl text-gray-400 hover:bg-gray-200/50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {isAddingNewCategory && (
                <div className="flex gap-2 animate-in slide-in-from-top-2 duration-200">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nueva categoría principal..."
                    className="flex-1 px-4 py-2 bg-indigo-50 border-0 rounded-xl text-sm font-medium text-indigo-900 placeholder:text-indigo-300 focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleAddNewCategory}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-200"
                  >
                    Crear
                  </button>
                </div>
              )}
            </div>

            {categoryId && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 font-['Inter']">
                  <ChevronRight className="w-3 h-3 text-indigo-500" /> Subcategoría
                </label>
                
                <div className="grid grid-cols-3 gap-2">
                  {filteredSubCategories.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSubCategoryId(sub.id)}
                      className={`py-3 px-2 rounded-xl text-[11px] font-bold transition-all border-2 ${
                        subCategoryId === sub.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-600 shadow-sm'
                          : 'bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-200 shadow-sm'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                  
                  {!isAddingNewSubCategory ? (
                    <button
                      type="button"
                      onClick={() => setIsAddingNewSubCategory(true)}
                      className="py-3 px-2 rounded-xl text-[11px] font-bold transition-all border-2 border-dashed border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-400 flex items-center justify-center gap-1 bg-white"
                    >
                      <Plus className="w-3 h-3" /> Nuevo
                    </button>
                  ) : (
                    <div className="col-span-3 flex gap-2 animate-in slide-in-from-top-2 duration-200">
                      <input
                        type="text"
                        value={newSubCategoryName}
                        onChange={(e) => setNewSubCategoryName(e.target.value)}
                        placeholder="Nombre subcategoría..."
                        className="flex-1 px-4 py-2 bg-gray-50 border-2 border-indigo-100 rounded-xl text-sm focus:ring-0 focus:border-indigo-600"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleAddNewSubCategory}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
                      >
                        Añadir
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewSubCategory(false)}
                        className="px-2 py-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 sticky bottom-0 bg-white/100 backdrop-blur-sm pb-2 z-20">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Guardar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
