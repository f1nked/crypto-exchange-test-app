import { useState, useRef } from "react";
import styled from "styled-components";
import { InputStyled } from "components/ui/Styles";
import useOutsideClick from "hooks/useOutsideClick";

import { ReactComponent as IconArrow } from "components/widget/icons/arrow.svg";

interface ICurrencie {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  network: string;
  tokenContract: null | string;
  buy: boolean;
  sell: boolean;
  legacyTicker: string;
}

interface InputProps {
  data: ICurrencie[];
  type: "left" | "right";
  value: number | string;
  updateValue: (newValue: number | string) => void;
  currency: ICurrencie;
  updateCurrencie: (newCurrencie: ICurrencie) => void;
}

const Input = (props: InputProps) => {
  const { data, value, type, updateValue, currency, updateCurrencie } = props;
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef: any = useRef(null);

  const [searchExpand, setSearchExpand] = useState(false);

  const handleInputChange = () => {
    console.log(searchInputRef.current?.value);
    setSearchValue(searchInputRef.current?.value);
  };

  const filteredCurrencie = data.filter((item: any) => {
    const searchValue = searchInputRef.current?.value.toLowerCase();
    return !searchValue || item.name.toLowerCase().includes(searchValue) || item.ticker.toString().toLowerCase().includes(searchValue);
  });

  function handleS(item: any) {
    updateCurrencie(item);
    resetSearchInput();
  }

  const resetSearchInput = () => {
    setSearchExpand(false);
    setSearchValue("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };
  const outsideRef = useOutsideClick(() => {
    resetSearchInput();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      updateValue(parsedValue);
    }
  };

  return (
    <BaseContainerStyled condition={searchExpand}>
      {searchExpand ? (
        <div ref={outsideRef} style={{ width: "100%" }}>
          <InputStyled type="text" ref={searchInputRef} placeholder="Search" onChange={() => handleInputChange()} />
          <ListBaseStyled>
            {filteredCurrencie.map((item, index) => (
              <ListItemStyled key={`${item.ticker}-${index}`} onClick={() => handleS(item)} selected={true}>
                <IcoStyled src={item.image} alt={item.image} />
                <TickerStyled>{item.name}</TickerStyled>
                <NameStyled>{item.ticker}</NameStyled>
              </ListItemStyled>
            ))}
          </ListBaseStyled>
        </div>
      ) : (
        <>
          <InputStyled type="text" value={value} onChange={handleChange} readOnly={type === "right"} />
          <ButtonCryptoBase onClick={() => setSearchExpand((prev) => !prev)}>
            <VerticalLine />
            <IcoStyled src={currency.image} alt={"icon"} style={{ paddingLeft: "13px" }} />
            <ButtonCryptoTicker>{currency.ticker}</ButtonCryptoTicker>
            <IconArrow />
          </ButtonCryptoBase>
        </>
      )}
    </BaseContainerStyled>
  );
};

const ListBaseStyled = styled.div`
  height: 144px;
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid #e3ebef;
  position: relative;
`;
const ListItemStyled = styled.div<{ selected: boolean }>`
  padding-left: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  gap: 21px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #eaf1f7;
  }
`;

const NameStyled = styled.div`
  color: #80a2b6;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
`;
const TickerStyled = styled.div`
  color: #282828;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
`;
const IcoStyled = styled.img`
  width: 20px;
  height: 20px;
`;

const BaseContainerStyled = styled.div<{ condition: boolean }>`
  flex-direction: ${({ condition }) => (condition ? "column" : "row")};
  border-radius: 5px;
  border: 1px solid #e3ebef;
  flex: 1 0 0;
  background: #f6f7f8;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  top: ${({ condition }) => (condition ? "72px" : "0")};
`;

export const ButtonCryptoBase = styled.div`
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  padding-right: 8px;
  cursor: pointer;
  align-items: center;
`;
export const ButtonCryptoTicker = styled.div`
  padding-right: 18px;
`;

const VerticalLine = styled.div`
  height: 70%;
  width: 1px;
  background-color: #e3ebef;
`;
export default Input;
