const Footer = () => {
    return (
        <footer className='bg-gray-100 w-full text-gray-700 bottom-0 py-4 mt-5'>
            <div className='flex justify-center space-x-6 text-sm'>
                <a href="#" className='hover:underline'>Как да добавя сметка &gt;</a>
                <span className='text-gray-300'>|</span>
                <a href="#" className='hover:hover:underline'>Всичко с един потребител (SSO) &gt;</a>
                <span className='text-gray-300'>|</span>
                <a href="#" className='hover:underline'>Процес на регистрация &gt;</a>
                <span className='text-gray-300'>|</span>
                <a href="#" className='hover:underline'>Електронен подпис &gt;</a>
                <span className='text-gray-300'>|</span>
                <a href="#" className='hover:underline'>Такси и комисионни &gt;</a>
                <span className='text-gray-300'>|</span>
                <a href="#" className='hover:underline'>Документи &gt;</a>
                <span className='text-gray-300'>|</span>
            </div>
            <div className='text-center text-sm mt-3'>
                <p>&copy; Първа инвестиционна банка 2009-2015.</p>
            </div>
        </footer>
    )
}
export default Footer