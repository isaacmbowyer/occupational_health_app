import {
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { ICONS } from "../../../data/icons";
import { Button } from "../../atoms/Button";

interface IDeleteModalProps {
  symptomName: string;
  isOpen: boolean;
  isLoading: boolean;
  handleOnClose: () => void;
  handleOnDelete: () => void;
}

export const DeleteModal = ({
  symptomName,
  isOpen,
  isLoading,
  handleOnClose,
  handleOnDelete,
}: IDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Text.SubHeader textAlign="center">{symptomName}</Text.SubHeader>
          <ModalCloseButton>
            <Icon as={ICONS.CLOSE} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text.Regular textAlign="center">
            Are you sure you would like to delete this symptom?
          </Text.Regular>
          <Text.Small textAlign="center">
            You will not be able to undo this action.
          </Text.Small>
        </ModalBody>
        <ModalFooter>
          <VStack w="$full" space="xl">
            <Button.Outline text="Cancel" onPress={handleOnClose} />
            <Button.Solid
              text="Delete"
              onPress={handleOnDelete}
              isLoading={isLoading}
            />
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
