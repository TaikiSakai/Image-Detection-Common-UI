import { Routes, Route } from 'react-router-dom';
import { AnalysisPage } from '@/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/" element={<AnalysisPage />} />
    </Routes>
  );
};
