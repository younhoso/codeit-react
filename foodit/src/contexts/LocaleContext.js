import React, {createContext, useContext, useState} from 'react';
const LocaleContext = createContext();

/* 컴포넌트 중에서 범위를 지정 하여 Context 사용할수 있게하는 함수*/
export function LocaleProvider({ defaultValue = 'ko', children }){
  const [locale, setLocale] = useState(defaultValue);

  return(
    <LocaleContext.Provider value={{locale, setLocale}}>
      {children}
    </LocaleContext.Provider>
  );
}

/* 값을 전달하는 Hook */
export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다');
  }

  const { locale } = context;

  return locale;
}

/* 값을 변경할때 사용하는 Hook */
export function useSetLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다');
  }

  const { setLocale } = context;

  return setLocale;
}

