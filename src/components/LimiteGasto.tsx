'use client';

import { useTarefas } from '../contexts/TarefaContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faSave, faPencil } from '@fortawesome/free-solid-svg-icons';

export default function LimiteGasto() {
  const { limite, atualizarLimite } = useTarefas();
  const [inputValue, setInputValue] = useState(limite.toString());
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    setInputValue(limite.toString());
  }, [limite]);

  const handleSalvar = () => {
    const valor = parseFloat(inputValue);
    if (!isNaN(valor)) {
      atualizarLimite(valor);
      setEditando(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mx-auto mt-4 p-5 rounded-xl bg-white shadow-lg border border-gray-200 max-w-6xl"
    >
      <div className="flex items-center justify-between mb-3">
        <motion.h2 
          whileHover={{ scale: 1.02 }}
          className="text-lg font-semibold text-gray-800 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faChartColumn} className="text-emerald-600" />
          Limite de Gasto
        </motion.h2>

        {editando ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSalvar}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <FontAwesomeIcon icon={faSave} />
            Salvar
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditando(true)}
            className="text-emerald-500 hover:text-emerald-700 font-medium transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPencil} />
            Editar
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editando ? (
          <motion.div
            key="edit-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3"
          >
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite o limite de gasto"
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSalvar()}
              autoFocus
            />
          </motion.div>
        ) : (
          <motion.div
            key="view-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-medium text-gray-700">
              Limite definido: <span className="font-bold text-emerald-600">R$ {limite.toFixed(2)}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}