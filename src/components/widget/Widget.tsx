import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrencies, getMinAmount, getEstimatedAmount } from "services/Service";
import Input from "components/ui/Input";
import useUpdateEffect from "hooks/useUpdateEffect";
import { InputStyled, InputBase, ButtonStyled } from "components/ui/Styles";
import { ICurrencie } from "components/ui/Input";

import { ReactComponent as Icon } from "components/widget/icons/swap.svg";

const Widget = () => {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState<number | string>("");
  const [minfrom, setMinFrom] = useState<number | string>("");
  const [fromCurrency, setFromCurrency] = useState<ICurrencie>({
    ticker: "",
    name: "",
    image: "",
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: false,
    network: "",
    tokenContract: null,
    buy: false,
    sell: false,
    legacyTicker: "",
  });
  const [to, setTo] = useState<number | string>("");
  const [minTo, setMinTo] = useState<number | string>("");
  const [toCurrency, setToCurrency] = useState<ICurrencie>({
    ticker: "",
    name: "",
    image: "",
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: false,
    network: "",
    tokenContract: null,
    buy: false,
    sell: false,
    legacyTicker: "",
  });
  const [loaded, setLoaded] = useState(false);

  const [error, setError] = useState<null | string>(null);

  const [errorFull, setErrorFull] = useState<null | string>(null);
  useEffect(() => {
    getCurrencies()
      .then((result) => {
        getMinAmount({
          fromCurrency: result[0].ticker,
          toCurrency: result[1].ticker,
          fromNetwork: result[0].network,
          toNetwork: result[1].network,
        }).then((result2) => {
          setCurrencies(result);

          setFromCurrency((prev: ICurrencie) => ({ ...prev, ...result[0] }));
          setFrom(result2.minAmount);
          setMinFrom(result2.minAmount);
          setToCurrency((prev: ICurrencie) => ({ ...prev, ...result[1] }));

          getEstimatedAmount({
            fromCurrency: result[0].ticker,
            toCurrency: result[1].ticker,
            toAmount: "",
            fromAmount: result2.minAmount,
            fromNetwork: result[0].network,
            toNetwork: result[1].network,
            type: "direct",
          })
            .then((result3) => {
              setTo(result3.toAmount);
              setMinTo(result3.fromAmount);
              setCurrencies(result);
              setLoaded(true);
            })
            .catch((error) => {
              setErrorFull(error.response.data.error);
            });
        });
      })
      .catch((error) => {
        setErrorFull(error.response.data.error);
      });
  }, []);

  useUpdateEffect(() => {
    if (loaded) {
      if (from >= minfrom) {
        setError(null);
        getEstimatedAmount({
          fromCurrency: fromCurrency.ticker,
          toCurrency: toCurrency.ticker,
          toAmount: "",
          fromAmount: from,
          fromNetwork: fromCurrency.network,
          toNetwork: toCurrency.network,
          type: "direct",
        })
          .then((result) => {
            setTo(result.toAmount);
          })
          .catch((error) => {
            setTo("");
            setErrorFull(error.response.data.error);
          });
      } else {
        setTo("—");
        setError(`The amount cannot be less than ${minfrom}`);
      }
    }
  }, [from]);

  useUpdateEffect(() => {
    if (loaded) {
      getMinAmount({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        fromNetwork: fromCurrency.network,
        toNetwork: toCurrency.network,
      })
        .then((result) => {
          setErrorFull(null);
          setFrom(result.minAmount);
          setMinFrom(result.minAmount);
        })
        .catch((error) => {
          setTo("");
          setErrorFull(error.response.data.error);
        });
    }
  }, [fromCurrency]);

  useUpdateEffect(() => {
    if (loaded) {
      getMinAmount({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        fromNetwork: fromCurrency.network,
        toNetwork: toCurrency.network,
      })
        .then((result) => {
          setErrorFull(null);
          setTo(result.minAmount);
          setMinTo(result.minAmount);
        })
        .catch((error) => {
          setFrom("");
          setTo("");
          setErrorFull(error.response.data.error);
        });
    }
  }, [toCurrency]);

  return (
    <RowBaseStyled>
      {currencies.length ? (
        <ColumnStyled style={{ gap: "2px" }}>
          <RowStyled>
            <RowStyled>
              <Input
                data={currencies}
                type="left"
                value={from}
                updateValue={setFrom}
                currency={fromCurrency}
                updateCurrencie={setFromCurrency}
              />
            </RowStyled>
            <Icon />
            <RowStyled>
              <Input data={currencies} type="right" value={to} updateValue={setTo} currency={toCurrency} updateCurrencie={setToCurrency} />
            </RowStyled>
          </RowStyled>
          {error ? <ErrorLabel2>{error}</ErrorLabel2> : <div style={{ height: "4px" }} />}
        </ColumnStyled>
      ) : null}

      {currencies.length ? (
        <ColumnStyled>
          <InputLabel>Your Ethereum address</InputLabel>
          <RowStyled style={{ gap: "32px" }}>
            <InputBase>
              <InputStyled />
            </InputBase>
            <ButtonStyled disabled={error !== null || errorFull !== null}>Exchange</ButtonStyled>
          </RowStyled>
          {errorFull ? <ErrorLabel>{errorFull}</ErrorLabel> : null}
        </ColumnStyled>
      ) : null}
    </RowBaseStyled>
  );
};

const IconStyled = styled.div`
  width: 24px;
  height: 24px;
  background-color: red;
`;

const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  gap: 30px;
  justify-content: space-between;
  flex: 1 0 0;
`;

const RowBaseStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
`;
const ColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InputLabel = styled.div`
  color: #282828;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
`;
const ErrorLabel = styled.div`
  display: flex;
  flex-direction: column;
  color: #e03f3f;
  flex-direction: row-reverse;
`;
const ErrorLabel2 = styled.div`
  display: flex;
  flex-direction: column;
  color: #e03f3f;
  flex-direction: row;
`;

export default Widget;
