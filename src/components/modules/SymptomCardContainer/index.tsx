import { useState } from "react";
import { DeleteModal } from "../../organisms/DeleteModal";
import { SymptomCard } from "../SymptomCard";
import { ISeverityType } from "../../../entities/ISeverityType";

interface ISymptomCardContainerProps {
  name: string;
  isLoading: boolean;
  severityType: ISeverityType;
  currentSeverity: number;
  targetSeverity: number;
  imageUri: string;
  targetDate: Date;
  handleOnDelete: () => void;
  handleOnView: () => void;
}

export const SymptomCardContainer = ({
  name,
  isLoading,
  severityType,
  imageUri,
  targetDate,
  targetSeverity,
  currentSeverity,
  handleOnDelete,
  handleOnView,
}: ISymptomCardContainerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleOnOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <DeleteModal
        symptomName={name}
        isLoading={isLoading}
        isOpen={isOpen}
        handleOnClose={handleOnClose}
        handleOnDelete={handleOnDelete}
      />

      <SymptomCard
        label={name}
        severityType={severityType}
        imageUri={imageUri}
        targetDate={targetDate}
        currentSeverity={currentSeverity}
        targetSeverity={targetSeverity}
        handleOnOpen={handleOnOpen}
        handleOnView={handleOnView}
      />
    </>
  );
};
