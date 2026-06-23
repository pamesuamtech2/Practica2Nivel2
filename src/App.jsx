import { useState } from 'react'
export default function App() {
const [transactions, setTransactions]=useState([])
const [text, setText] = useState ("")
const [amount, setAmount] = useState ("")
console.log("Estado actual -> Concepto:", text, "| Monto:", amount);
const addTransaction = (e) => {
  e.preventDefault();
  if (text.trim() === "" || amount === "") return;
  const newTransaction = {
      id: Date.now(),        
      text: text,            
      amount: Number(amount) 
    };
    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };
  const income = transactions
    .filter(item => item.amount > 0)
    .reduce((acumulador, item) => acumulador + item.amount, 0);

  const expense = transactions
    .filter(item => item.amount < 0)
    .reduce((acumulador, item) => acumulador + item.amount, 0);

  const total = income + expense;
  const deleteTransaction = (idParaBorrar) => {
    const listaActualizada = transactions.filter(item => item.id !== idParaBorrar);
    setTransactions(listaActualizada);
  };
  
  return (
    <>
    <main className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-6 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <div className="max-w-4xl w-full bg-white dark:bg-card-dark rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-primary/10">
{/* Header Section */}
<header className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-primary/10">
<div className="flex items-center gap-3">
<div className="bg-primary p-2 rounded-lg text-white">
<span className="material-symbols-outlined block">account_balance_wallet</span>
</div>
<h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">React Wallet</h1>
</div>
<button className="p-2 hover:bg-slate-100 dark:hover:bg-primary/20 rounded-full transition-colors">
<span className="material-symbols-outlined text-slate-500 dark:text-slate-400">settings</span>
</button>
</header>
{/* Balance Hero */}
<div className="px-8 py-10 bg-slate-50/50 dark:bg-primary/5 flex flex-col items-center justify-center text-center">
<p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-primary/70 mb-2">Total Balance</p>
<h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">${total.toFixed(2)}</h2>
<div className="mt-6 flex gap-8">
<div className="text-center">
<p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold">Income</p>
<p className="text-emerald-500 font-bold text-lg">+${income.toFixed(2)}</p>
</div>
<div className="w-px bg-slate-200 dark:bg-primary/10"></div>
<div className="text-center">
<p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold">Expense</p>
<p className="text-rose-500 font-bold text-lg">-${Math.abs(expense).toFixed(2)}</p>
</div>
</div>
</div>
{/* Main Content Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-t border-slate-100 dark:border-primary/10 dark:divide-primary/10">
{/* Left Column: Transaction Form */}
<section className="p-8">
<h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl bg-red-700 rounded-2xl p-2 pt-1 dark:bg-amber-600 motion-safe:">➕</span>
                    Nueva Transacción</h3>
<form className="space-y-5" onSubmit={addTransaction}>
<div className="flex flex-col gap-1.5">
<label className="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Concepto</label>
<input className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-primary/20 bg-white dark:bg-input-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
placeholder="Ej. Alquiler" 
type="text"
value={text}
onChange={(e) => setText(e.target.value)}/>
</div>
<div className="flex flex-col gap-1.5">
<label className="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Monto</label>
<div className="relative">
<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">$</span>
<input className="w-full h-12 pl-8 pr-4 rounded-lg border border-slate-200 dark:border-primary/20 bg-white dark:bg-input-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
placeholder="0.00" 
type="number"
value={amount}
onChange={(e) => setAmount(e.target.value)}/>
</div>
<p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 italic">(Positivo = ingreso, negativo = gasto)</p>
</div>
<button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
<span className="material-symbols-outlined">add</span>
                        Agregar Transacción
                    </button>
</form>
</section>
{/* Right Column: History List */}
<section className="p-8">
<h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">⌛</span>
                        Historial
                    </div>
<span className="text-xs font-normal text-slate-400 dark:text-slate-500">Últimos movimientos</span>
</h3>
<div className="space-y-3">
{/* Item 1: Income */}
{transactions.map((transaccion) => (
<div key={transaccion.id} className={`group relative flex items-center justify-between p-4 bg-slate-50 dark:bg-primary/5 rounded-lg border-l-4 hover:bg-slate-100 dark:hover:bg-primary/10 transition-all ${transaccion.amount >= 0 ? 'border-emerald-500' : 'border-rose-500'}`}><div className="flex flex-col">
<span className="text-sm font-bold text-slate-800 dark:text-slate-200">{transaccion.text}</span>
<span className="text-[10px] text-slate-400 uppercase tracking-wider">Hoy, 09:00 AM</span>
</div>
<div className="flex items-center gap-4">
<span className={`font-black tracking-tight ${transaccion.amount >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
  ${transaccion.amount}
</span><button onClick={() => deleteTransaction(transaccion.id)} 
className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-sm">close</span>
</button>
</div>
</div>
))}
{/* Empty State Placeholder (Visual hint) */}
<div className="border-2 border-dashed border-slate-100 dark:border-primary/5 rounded-lg p-8 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700">
<span className="material-symbols-outlined text-3xl mb-1">🧾</span>
<p className="text-xs">No hay más transacciones</p>
</div>
</div>
</section>
</div>
{/* Footer / Stats */}
<footer className="px-8 py-4 bg-slate-50 dark:bg-primary/5 text-center">
<p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest">
                React Wallet • Desktop Edition • 2024
            </p>
</footer>
</div>
 {/* Theme Toggle (Bonus functionality visual) */}
<div className="fixed bottom-6 right-6 flex flex-col gap-3">
<button className="w-12 h-12 bg-white dark:bg-card-dark rounded-full shadow-lg flex items-center justify-center text-slate-500 dark:text-primary border border-slate-100 dark:border-primary/20 hover:scale-110 transition-transform" onClick={() => document.documentElement.classList.toggle('dark')}>
<span className="material-symbols-outlined">dark_mode</span>
</button>
</div>
</main>
    </>
  )
}

