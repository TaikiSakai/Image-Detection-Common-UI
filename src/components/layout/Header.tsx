import reactLogo from '@/assets/react.svg';

export const Header = () => {
  return (
    <header className="mb-2 py-1 shadow-elevation rounded-lg bg-black-0">
      <div className="flex items-center gap-10 bg-white px-6 py-3">
        <div className="flex items-center gap-4">
          <img
            src={reactLogo}
            alt="React Logo"
            className="w-10 h-10 animate-spin-slow"
          />
          <h1 className="text-2xl m-0">画像認識共通UI</h1>
        </div>
        <button>仮置きのボタン</button>
      </div>
    </header>
  );
};
