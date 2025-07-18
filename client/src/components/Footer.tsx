const Footer = () => {
  return (
    <footer className="bg-gray-200 w-full text-gray-700 py-4 mt-5">
      <div className="flex flex-wrap flex-col items-center md:flex-row md:justify-center md:space-x-6 space-y-2 md:space-y-0 text-sm px-2 text-center md:text-left">
        <a href="#" className="hover:underline">Как да добавя сметка &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">Всичко с един потребител (SSO) &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">Процес на регистрация &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">Електронен подпис &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">Такси и комисионни &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">Документи &gt;</a>
      </div>
      <div className="text-center text-sm mt-3">
        <p>&copy; Първа инвестиционна банка 2009-2015.</p>
      </div>
    </footer>
  );
};
export default Footer;