import { createContext, useContext, useEffect, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { useSymptomsContext } from "../../../contexts/useSymptomsContext";
import { ISymptom } from "../../../entities/ISymptom";
import { INITAL_OPTION, INITAL_SYMPTOM } from "../../../data/defaultValues";
import { IAddSymptomState } from "../../../entities/IAddSymptomState";
import { IAddSymptomStateKey } from "../../../entities/IAddSymptomStateKey";
import { IAddSymptomStateKeyValue } from "../../../entities/IAddSymptomStateKeyValue";
import { IOption } from "../../../entities/IOption";
import { filterSymptoms } from "../../../utils/filterSymptoms";

const AddSymptomContext = createContext({} as IAddSymptomContext);

const INITAL_STATE: IAddSymptomState = {
  selectedSymptom: INITAL_SYMPTOM,
  currentSeverity: INITAL_OPTION,
  targetSeverity: INITAL_OPTION,
  filteredSymptoms: [],
  targetDate: null,
  search: "",
  isLoading: false,
};

const DEBOUNCE_TIME = 250;

export const AddSymptomProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();
  const { data: symptoms, isFetching: isFetchingSymptoms } =
    useSymptomsContext();

  const [state, setState] = useState<IAddSymptomState>(INITAL_STATE);

  // STATE METHODS
  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredSymptoms = filterSymptoms(state?.search, symptoms);

      setState((prev) => ({ ...prev, filteredSymptoms: filteredSymptoms }));
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(debounce);
    };
  }, [state?.search]);

  const handleOnChange = (
    key: IAddSymptomStateKey,
    value: IAddSymptomStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleOnSelect = (item: ISymptom) => {
    if (state?.selectedSymptom?.id === item?.id)
      return setState((prev) => ({ ...prev, selectedSymptom: INITAL_SYMPTOM }));

    setState((prev) => ({ ...prev, selectedSymptom: item }));
  };

  const _handleSetLoading = (boolean: boolean) => {
    setState((prev) => ({ ...prev, isLoading: boolean }));
  };

  // ACTION METHODS
  const handleOnSubmit = async () => {
    try {
      _handleSetLoading(true);
    } catch (e: any) {
      toast.errorToast("Failed to add the symptom");
    } finally {
      _handleSetLoading(false);
    }
  };

  return (
    <AddSymptomContext.Provider
      value={{
        state: {
          symptomList: state?.filteredSymptoms,
          selectedSymptom: state?.selectedSymptom,
          currentSeverity: state?.currentSeverity,
          targetSeverity: state?.targetSeverity,
          search: state?.search,
          targetDate: state?.targetDate,
          isFetching: isFetchingSymptoms,
          isLoading: state?.isLoading,
        },
        methods: {
          handleOnChange: handleOnChange,
          handleOnSubmit: handleOnSubmit,
          handleOnSelect: handleOnSelect,
        },
      }}
    >
      {children}
    </AddSymptomContext.Provider>
  );
};

export const useAddSymptomContext = () => {
  return useContext(AddSymptomContext);
};

interface IAddSymptomContext {
  state: {
    symptomList: ISymptom[];
    selectedSymptom: ISymptom;
    currentSeverity: IOption;
    targetSeverity: IOption;
    search: string;
    targetDate: Date;
    isLoading: boolean;
    isFetching: boolean;
  };
  methods: {
    handleOnChange: (
      key: IAddSymptomStateKey,
      value: IAddSymptomStateKeyValue
    ) => void;
    handleOnSubmit: () => void;
    handleOnSelect: (item: ISymptom) => void;
  };
}
