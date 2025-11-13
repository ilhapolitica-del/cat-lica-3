import React, { useState, useMemo } from 'react';
import { doctrineData } from './data';
import { Category, DoctrineEntry } from './types';
import { SearchIcon, BookOpenIcon, CrossIcon, ChevronRightIcon } from './components/Icons';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedEntry, setSelectedEntry] = useState<DoctrineEntry | null>(null);

  // Filter Logic
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return doctrineData.filter(entry => {
      const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
      const matchesSearch = query === '' || 
        entry.title.toLowerCase().includes(query) || 
        entry.content.toLowerCase().includes(query) ||
        entry.tags.some(tag => tag.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Object.values(Category);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
            setSelectedEntry(null);
            setSearchQuery('');
            setSelectedCategory('All');
          }}>
            <div className="bg-emerald-800 p-2 rounded-full">
              <CrossIcon className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight font-serif">A Fé Explicada</h1>
              <p className="text-xs text-emerald-200 hidden sm:block">Guia Doutrinal baseado na obra de Leo J. Trese</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        
        {selectedEntry ? (
          // Detail View
          <div className="animate-fadeIn">
            <button 
              onClick={() => setSelectedEntry(null)}
              className="flex items-center text-emerald-700 hover:text-emerald-900 mb-6 font-medium transition-colors"
            >
              <ChevronRightIcon className="w-4 h-4 rotate-180 mr-1" />
              Voltar à pesquisa
            </button>
            
            <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center flex-wrap gap-2">
                <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">
                  {selectedEntry.category}
                </span>
                {selectedEntry.pageRef && (
                  <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                    Ref: pág. {selectedEntry.pageRef}
                  </span>
                )}
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 font-serif leading-tight">
                  {selectedEntry.title}
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {selectedEntry.content}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        ) : (
          // Search & List View
          <div className="space-y-8">
            
            {/* Search Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="Pesquisar doutrina (ex: Batismo, Graça, Pecado...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-emerald-900 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Todos
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-emerald-600" />
                  {searchQuery ? 'Resultados da busca' : 'Tópicos Doutrinais'}
                </h3>
                <span className="text-sm text-slate-500">
                  {filteredData.length} {filteredData.length === 1 ? 'item' : 'itens'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((entry) => (
                  <div 
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className="group bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col"
                  >
                    <div className="mb-3">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wide">
                        {entry.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-800 font-serif">
                      {entry.title}
                    </h4>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
                      {entry.content}
                    </p>
                    <div className="flex items-center text-emerald-600 text-sm font-medium mt-auto">
                      Ler mais <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                  <p className="text-slate-500 text-lg">Nenhum resultado encontrado para "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-emerald-600 font-medium hover:underline"
                  >
                    Limpar pesquisa
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Baseado no livro <em>A Fé Explicada</em> de Leo J. Trese (Ed. Quadrante, 1990).
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Projeto para fins educacionais e de evangelização.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
