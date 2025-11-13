import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { doctrineData } from './data';
import { Category, DoctrineEntry } from './types';
import { SearchIcon, BookOpenIcon, CrossIcon, ChevronRightIcon, SparklesIcon } from './components/Icons';

// --- Types for AI Response ---
interface BibleVerse {
  reference: string;
  text: string;
  explanation: string;
}

const App: React.FC = () => {
  // Search State
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedEntry, setSelectedEntry] = useState<DoctrineEntry | null>(null);
  
  // AI State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [biblicalResults, setBiblicalResults] = useState<BibleVerse[]>([]);
  const [aiError, setAiError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>('');

  // --- AI Logic ---
  const fetchBiblicalPassages = async (entry: DoctrineEntry) => {
    setIsAiModalOpen(true);
    setAiLoading(true);
    setBiblicalResults([]);
    setAiError(null);
    setCurrentTopic(entry.title);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prompt includes both title and content to ensure coherence with the book
      const prompt = `Como um especialista em teologia católica, analise o seguinte ensino doutrinal do livro "A Fé Explicada":
      
      Título: "${entry.title}"
      Resumo do ensino: "${entry.content}"
      
      Se houver passagens bíblicas diretamente coerentes que fundamentem este ensino, forneça até 3 delas (usando uma tradução católica em português).
      Se não houver conexão bíblica direta e clara, retorne uma lista vazia.
      
      Retorne a resposta estritamente em formato JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                reference: { type: Type.STRING, description: "Referência bíblica (ex: João 3, 5)" },
                text: { type: Type.STRING, description: "O texto do versículo" },
                explanation: { type: Type.STRING, description: "Breve explicação teológica de como este versículo fundamenta o ensino acima." }
              },
              required: ["reference", "text", "explanation"]
            }
          }
        }
      });

      const jsonText = response.text;
      if (jsonText) {
        const data = JSON.parse(jsonText) as BibleVerse[];
        setBiblicalResults(data);
      } else {
        setAiError("Não foi possível gerar as passagens no momento.");
      }
    } catch (error) {
      console.error("Erro na IA:", error);
      setAiError("Ocorreu um erro ao consultar a IA. Verifique sua chave de API ou tente novamente.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setSelectedEntry(null); // Reset view to list when searching
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedCategory('All');
  };

  // Filter Logic (Search in Book)
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
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      {/* Header */}
      <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
            setSelectedEntry(null);
            clearSearch();
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
                <div className="prose prose-slate max-w-none mb-8">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {selectedEntry.content}
                  </p>
                </div>

                {/* AI Button Integration - Adds to the answer */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                   <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                         <div className="bg-white p-2 rounded-full border border-emerald-100 shadow-sm mt-1">
                            <SparklesIcon className="w-5 h-5 text-emerald-600" />
                         </div>
                         <div>
                            <h4 className="font-semibold text-emerald-900">Fundamentação Bíblica</h4>
                            <p className="text-sm text-emerald-700/80">Ver passagens bíblicas que fundamentam esta doutrina (IA)</p>
                         </div>
                      </div>
                      <button
                        onClick={() => fetchBiblicalPassages(selectedEntry)}
                        className="w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <BookOpenIcon className="w-4 h-4" />
                        Consultar Bíblia
                      </button>
                   </div>
                </div>
                
                <div className="mt-6">
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Pesquisar no Livro</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                    placeholder="Ex: Batismo, Graça, Mandamentos..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm flex items-center gap-2"
                >
                  <SearchIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Pesquisar</span>
                </button>
              </div>
              
              {searchQuery && (
                <div className="mt-3 flex items-center gap-2">
                   <span className="text-sm text-slate-500">Resultados para: <span className="font-semibold text-slate-700">"{searchQuery}"</span></span>
                   <button onClick={clearSearch} className="text-xs text-red-500 hover:text-red-700 hover:underline">Limpar</button>
                </div>
              )}

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
                      Ler explicação <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                  <p className="text-slate-500 text-lg">Nenhum resultado encontrado.</p>
                  <button onClick={clearSearch} className="mt-2 text-emerald-600 font-medium hover:underline">Ver todos os tópicos</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* AI Results Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-emerald-900 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif">Bíblia Sagrada</h3>
                  <p className="text-xs text-emerald-200">Passagens relacionadas à doutrina</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-emerald-200 hover:text-white transition-colors p-1 bg-emerald-800 hover:bg-emerald-700 rounded-full"
              >
                <CrossIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded border border-slate-200">
                Tema analisado: <strong className="text-slate-900">{currentTopic}</strong>
              </p>

              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-600 font-medium">Pesquisando nas Escrituras...</p>
                  <p className="text-slate-400 text-sm mt-1">Aguarde enquanto a IA encontra as melhores referências.</p>
                </div>
              ) : aiError ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-center">
                  <p>{aiError}</p>
                </div>
              ) : biblicalResults.length === 0 ? (
                 <div className="text-center py-8">
                   <p className="text-slate-600">Não foram encontradas passagens bíblicas diretamente relacionadas a este resumo doutrinal específico.</p>
                 </div>
              ) : (
                <div className="space-y-6">
                  {biblicalResults.map((verse, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors overflow-hidden">
                      <div className="bg-emerald-50/50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                        <h4 className="text-emerald-800 font-bold font-serif text-lg">{verse.reference}</h4>
                        <BookOpenIcon className="w-4 h-4 text-emerald-300" />
                      </div>
                      <div className="p-5">
                        <blockquote className="text-slate-800 text-lg font-serif leading-relaxed italic mb-4 relative pl-4">
                          <span className="absolute left-0 top-0 text-4xl text-emerald-200 leading-none -mt-2">"</span>
                          {verse.text}
                          <span className="absolute -bottom-4 text-4xl text-emerald-200 leading-none ml-1">"</span>
                        </blockquote>
                        <p className="text-sm text-slate-600 pt-3 border-t border-slate-100 flex gap-2">
                          <span className="font-semibold text-emerald-700 whitespace-nowrap">Nota Teológica:</span> 
                          {verse.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

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