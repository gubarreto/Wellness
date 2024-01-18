import React from "react";
import translate from "./translation";
import {useGlobal} from '../hooks/useGlobal';

export const getTranslation = async(hash) => {
  const {globalProps} = useGlobal();
  const {language} = await globalProps;
  return await translate[hash][language] || translate["default"]["PT"];
};