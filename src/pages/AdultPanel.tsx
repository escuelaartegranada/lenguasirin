import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { Card, Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { Download, Trash2, ArrowLeft } from 'lucide-react';

export const AdultPanel = () => {
  const { progress, resetProgress, getTotalCompleted } = useProgress();
  const navigate = useNavigate();

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "luna_progreso_lengua.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="py-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full w-12 h-12 p-0">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-3xl font-black text-slate-800">Zona Adulto</h2>
      </div>

      <Card className="mb-6">
        <h3 className="text-xl font-bold border-b pb-2 mb-4">Resumen General</h3>
        <ul className="space-y-3 font-medium text-slate-600">
          <li className="flex justify-between">
            <span>Ejercicios Totales Completados:</span>
            <span className="font-bold text-slate-800">{getTotalCompleted()}</span>
          </li>
          <li className="flex justify-between">
            <span>Estrellas Ganadas:</span>
            <span className="font-bold text-slate-800">{progress.stars} ⭐</span>
          </li>
          <li className="flex justify-between">
            <span>Medallas Desbloqueadas:</span>
            <span className="font-bold text-slate-800">{progress.medals.length} 🏆</span>
          </li>
        </ul>
      </Card>

      <Card className="mb-6">
        <h3 className="text-xl font-bold border-b pb-2 mb-4">Progreso por área</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex justify-between p-2 bg-slate-50 rounded">
            <span>Ficha de la Palabra:</span>
            <span className="font-bold">{progress.completedExercises['world_1'] || 0} resueltos</span>
          </li>
          <li className="flex justify-between p-2 bg-slate-50 rounded">
            <span>Nombres:</span>
            <span className="font-bold">{progress.completedExercises['world_2'] || 0} resueltos</span>
          </li>
          <li className="flex justify-between p-2 bg-slate-50 rounded">
            <span>Adjetivos:</span>
            <span className="font-bold">{progress.completedExercises['world_3'] || 0} resueltos</span>
          </li>
          <li className="flex justify-between p-2 bg-slate-50 rounded">
            <span>Verbos:</span>
            <span className="font-bold">{progress.completedExercises['world_4'] || 0} resueltos</span>
          </li>
          <li className="flex justify-between p-2 bg-slate-50 rounded">
            <span>Sinónimos y Contrarios:</span>
            <span className="font-bold">{progress.completedExercises['world_5'] || 0} resueltos</span>
          </li>
          <li className="flex justify-between p-2 bg-slate-50 rounded">
            <span>Sílabas:</span>
            <span className="font-bold">{progress.completedExercises['world_6'] || 0} resueltos</span>
          </li>
        </ul>
      </Card>

      <div className="flex flex-col gap-4">
        <Button variant="secondary" className="w-full flex justify-center gap-2" onClick={handleExport}>
          <Download className="w-5 h-5" /> Exportar Datos (JSON)
        </Button>
        <Button variant="danger" className="w-full flex justify-center gap-2 bg-rose-200 text-rose-800 hover:bg-rose-300 shadow-none border-2 border-rose-300" onClick={resetProgress}>
          <Trash2 className="w-5 h-5" /> Borrar todo el progreso
        </Button>
      </div>
    </div>
  );
};
