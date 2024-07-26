import { useState } from 'react';
import { InputBox } from './components'; // Adjust the path if necessary
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);

    const options = Object.keys(currencyInfo);

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        setConvertedAmount(amount * currencyInfo[to]);
    };

    return (
        <div
            className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-photo/futuristic-moon-background_23-2150930692.jpg?size=626&ext=jpg&ga=GA1.1.950715311.1711867512&semt=ais_user')`,
            }}
        >
            <div className='flex flex-row space-x-4'>
                <div className='w-96 h-auto p-6 border border-gray-60 backdrop-blur-sm bg-white/30 rounded-lg shadow-lg'>
                    <h1 className='text-2xl font-bold text-blue-950 mb-4 text-center'>Currency Converter</h1>
                    <div className='flex justify-center'>
                    <img 
                        src='https://cdn.shopify.com/app-store/listing_images/b33f6d876accac12b91af70e42dabbdb/icon/CK-cufzoue8CEAE=.png' 
                        alt='Currency Converter' 
                        className='w-52 h-36 object-cover mb-4 rounded border shadow-lgr'
                    />
                    </div>
                    <p className='text-black'>
                        Easily convert currencies from one form to another with real-time exchange rates. 
                        Our currency converter provides accurate and up-to-date conversion values for over 150 currencies worldwide.
                    </p>
                </div>

                <div className="w-96 h-auto p-6 border border-gray-60 rounded-lg backdrop-blur-sm bg-white/30 shadow-lg">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1 pt-10">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
