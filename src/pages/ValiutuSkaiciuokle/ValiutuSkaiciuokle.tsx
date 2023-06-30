import { useState } from 'react';
import { StyledValiutuSkaiciuokle } from './style';
import Input from '../../components/Input';
import {
  StyledBox,
  StyledBoxRight,
  StyledSectionContainer,
} from '../../styles/UtilityStyles';
import useCurrencyConversion from './useCurrencyConversion';
import CurrencySelect from './CurrencySelect';
import FullScreenLoader from '../../components/FullScreenLoader';

const ValiutuSkaiciuokle = () => {
  // const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

  const conversion = useCurrencyConversion();

  const [activeInput, setActiveInput] = useState({
    id: '',
    value: 0,
    rawValue: '',
  });

  const formatValue = (value: number) => {
    const fixedValue = value.toFixed(5);
    return fixedValue.includes('.')
      ? parseFloat(fixedValue).toString()
      : fixedValue;
  };

  const getFlagURL = (currency: string) => {
    return `https://wise.com/public-resources/assets/flags/rectangle/${currency.toLowerCase()}.png`;
  };

  // const addCurrencyToList = (currency) => {
  //   if (!selectedCurrencies.includes(currency)) {
  //     setSelectedCurrencies([...selectedCurrencies, currency]);
  //   }
  // };
  // const removeCurrencyFromList = (currency) => {
  //   setSelectedCurrencies((prevCurrencies) =>
  //     prevCurrencies.filter((selectedCurrency) => selectedCurrency !== currency)
  //   );

  //   if (activeInput.id === currency) {
  //     setActiveInput({
  //       id: '',
  //       value: 0,
  //       rawValue: '',
  //     });
  //   }
  // };

  return (
    <StyledValiutuSkaiciuokle>
      <StyledSectionContainer>
        <h1>Valiutų Skaičiuoklė</h1>

        <StyledBox>
          <StyledBoxRight>
            <CurrencySelect />
          </StyledBoxRight>
          <StyledBoxRight>
            {conversion && conversion.data ? (
              <ul>
                {Object.entries(conversion.data).map(([currency, value]) => {
                  const flagURL = getFlagURL(currency);
                  return (
                    <li key={currency}>
                      <Input
                        id={currency}
                        type='text'
                        label
                        labelText={currency}
                        value={
                          currency === activeInput.id
                            ? activeInput.rawValue
                            : formatValue(activeInput.value * value)
                        }
                        onChange={(e) =>
                          setActiveInput({
                            id: currency,
                            value: e.target.value
                              ? parseFloat(e.target.value)
                              : 0,
                            rawValue: e.target.value,
                          })
                        }
                      />
                      <div>
                        <img src={flagURL} alt={`${currency} flag`} />
                      </div>
                      <button onClick={() => removeCurrencyFromList(currency)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <FullScreenLoader />
            )}
          </StyledBoxRight>
        </StyledBox>
        <p>
          Ši aplikacija naudoja naujausią valiutos kursą. <br />
          Įveskite norimą sumą į laukelį ir ji bus konvertuojama. <br />
          Jei norimos valiutos nėra pradiniame sąraše, pridėkite pasirinkdami iš
          išsiskleidžiančio sąrašo.
        </p>
      </StyledSectionContainer>
    </StyledValiutuSkaiciuokle>
  );
};

export default ValiutuSkaiciuokle;
